import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "@stackNav/Auth";

type AuthProps = NativeStackScreenProps<AuthStackParamList, "LoginKakao">;

export default function LoginKakao({ navigation, route }: Readonly<AuthProps>) {
  const { url } = route.params;
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
      const response = await fetch(url);
      const data = await response.json();

      // 받은 데이터를 로컬 저장소에 저장
      console.log(data);

      navigation.navigate("Login");
    } catch (error) {
      console.error("Error fetching data:", error);
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
