import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "@stackNav/Auth";
import * as SecureStore from "expo-secure-store";
import { RootStackParamList } from "AppInner";
import { CompositeScreenProps } from "@react-navigation/native";
import axios from "axios";
import axiosInstance from "src/api/axiosInstance";

type AuthProps = NativeStackScreenProps<AuthStackParamList, "LoginKakao">;
type RootProps = NativeStackScreenProps<RootStackParamList>;
type Props = CompositeScreenProps<AuthProps, RootProps>;

export default function LoginKakao({ navigation, route }: Readonly<Props>) {
  const { url, social } = route.params;
  const [redirectedUrl, setRedirectedUrl] = useState<string | null>(null);

  useEffect(() => {
    if (redirectedUrl) {
      // 새로운 URL에서 서버로부터 데이터를 요청하고 받는 작업 수행
      fetchDataFromServer(redirectedUrl);
    }
  }, [redirectedUrl]);

  const fetchDataFromServer = async (url: string) => {
    try {
      // 서버로부터 데이터를 요청하고 받는 작업 수행
      const res = await axiosInstance.post("/login", {
        id_token: url,
        social: social,
      });
      // console.log(res.data);
      const { accessToken, refreshToken } = res.data;

      // 액세스 토큰을 AsyncStorage에 저장
      await SecureStore.setItemAsync("accessToken", accessToken);
      await SecureStore.setItemAsync("refreshToken", refreshToken);

      // 홈 화면으로 이동
      navigation.navigate("Main");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onShouldStartLoadWithRequest = (event: any) => {
    // Extracting the id_token from the redirected URL and adding it as a query parameter
    const newUrl = new URL(event.url);
    const idToken = newUrl.searchParams.get("id_token");
    if (idToken) {
      setRedirectedUrl(idToken);
    } else {
      setRedirectedUrl(event.url);
    }
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
