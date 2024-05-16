import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "AppInner";
import getEnvVars from "environment";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { Alert } from "react-native";
import axiosInstance from "src/api/axiosInstance";

type RootProps = NativeStackNavigationProp<RootStackParamList>;

export const useAxiosInterceptor = () => {
  const navigation = useNavigation<RootProps>();

  useEffect(() => {
    const requestHandler = async (config: InternalAxiosRequestConfig<any>) => {
      const accessToken = await SecureStore.getItemAsync("accessToken");
      console.log("accessToken in interceptor", accessToken);
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    };

    // Request interceptor for API calls
    const requestInterceptor = axiosInstance.interceptors.request.use(
      requestHandler,
      (error: AxiosError) => {
        Promise.reject(error);
      }
    );

    const errorHandler = async (error: any) => {
      const originalRequest = error.config;
      if (
        (error as AxiosError).response?.status === 403 &&
        !originalRequest._retry
      ) {
        const refreshToken = await SecureStore.getItemAsync("refreshToken");
        if (!refreshToken) {
          await SecureStore.deleteItemAsync("accessToken");
          Alert.alert("로그인이 필요한 페이지입니다.");
          navigation.navigate("Auth");
          return;
        }
        originalRequest._retry = true;
        const accessToken = await refreshAccessToken();
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      }
      return Promise.reject(error);
    };

    // Response interceptor for API calls
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      errorHandler
    );

    async function refreshAccessToken() {
      try {
        const res = await axios.get(`${getEnvVars()?.apiUrl}/login/refresh`, {
          headers: {
            Authorization: `Bearer ${await SecureStore.getItemAsync(
              "refreshToken"
            )}`,
          },
        });
        console.log("refresh-token", res);
        const { accessToken, refreshToken } = res.data;
        await SecureStore.setItemAsync("accessToken", accessToken);
        await SecureStore.setItemAsync("refreshToken", refreshToken);
        return accessToken;
      } catch (error) {
        if ((error as AxiosError).response?.status === 403) {
          await SecureStore.deleteItemAsync("accessToken");
          await SecureStore.deleteItemAsync("refreshToken");
          Alert.alert("세션이 만료되어 로그인 페이지로 이동합니다.");
          navigation.navigate("Auth");
          return;
        }
      }
    }

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, []);
};
