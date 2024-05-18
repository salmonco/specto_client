import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "@stackNav/Auth";
import * as SecureStore from "expo-secure-store";
import { RootStackParamList } from "AppInner";
import { CompositeScreenProps } from "@react-navigation/native";
import axiosInstance from "src/api/axiosInstance";

type AuthProps = NativeStackScreenProps<AuthStackParamList, "LoginGoogle">;
type RootProps = NativeStackScreenProps<RootStackParamList>;
type Props = CompositeScreenProps<AuthProps, RootProps>;

export default function LoginGoogle({ navigation, route }: Readonly<Props>) {
  const { url, social } = route.params;
  const [redirectedUrl, setRedirectedUrl] = useState<string | null>(null);

  useEffect(() => {
    if (redirectedUrl) {
      fetchDataFromServer(redirectedUrl);
    }
  }, [redirectedUrl]);

  const fetchDataFromServer = async (url: string) => {
    try {
      // Extracting the id_token from the redirected URL and adding it as a query parameter
      const newUrl = new URL(url);
      const idToken = newUrl.searchParams.get("id_token");
      if (idToken) {
        const res = await axiosInstance.post("/login", {
          id_token: idToken,
          social: social,
        });
        const { accessToken, refreshToken } = res.data;

        await SecureStore.setItemAsync("accessToken", accessToken);
        await SecureStore.setItemAsync("refreshToken", refreshToken);

        navigation.navigate("Main");
      }
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
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
      />
    </View>
  );
}
