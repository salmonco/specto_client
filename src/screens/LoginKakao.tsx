import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "@stackNav/Auth";
import { useAppDispatch } from "src/store";
import userSlice from "src/slices/user";
import * as SecureStore from "expo-secure-store";
import axios, { AxiosError } from "axios";
import { RootStackParamList } from "AppInner";
import { CompositeScreenProps } from "@react-navigation/native";

type AuthProps = NativeStackScreenProps<AuthStackParamList, "LoginKakao">;
type RootProps = NativeStackScreenProps<RootStackParamList>;
type Props = CompositeScreenProps<AuthProps, RootProps>;

export default function LoginKakao({ navigation, route }: Readonly<Props>) {
  const { url } = route.params;
  const [redirectedUrl, setRedirectedUrl] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (redirectedUrl) {
      // 새로운 URL에서 서버로부터 데이터를 요청하고 받는 작업 수행
      fetchDataFromServer(redirectedUrl);
    }
  }, [redirectedUrl]);

  const fetchDataFromServer = async (url: string) => {
    try {
      // 서버로부터 데이터를 요청하고 받는 작업 수행
      const res = await axios.get(url);
      console.log(res.data);
      const { accessToken, refreshToken } = res.data;
      dispatch(userSlice.actions.setAccessToken({ accessToken }));
      await SecureStore.setItemAsync("refreshToken", refreshToken);
      navigation.navigate("Main");
    } catch (error) {
      console.error("Error fetching data:", error);
      if ((error as AxiosError).response?.status === 403) {
        navigation.navigate("Main");
      }
    }
  };

  const onShouldStartLoadWithRequest = (event: any) => {
    setRedirectedUrl(event.url);
    return true; // 페이지 로드 허용
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        originWhitelist={["*"]}
        source={{ uri: redirectedUrl || url }}
        javaScriptEnabled={true}
        onMessage={(event) => {
          //   alert(event.nativeEvent);
        }}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest} // 요청을 필터링하고 수정하는 함수 지정
      />
    </View>
  );
}
