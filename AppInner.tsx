import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { RootState } from "./src/store/reducer";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import userSlice from "./src/slices/user";
import { useAppDispatch } from "./src/store";
import Config from "react-native-config";
import Splash from "./src/screens/Splash";
import Auth from "./src/stackNav/Auth";
import Main from "./src/tabNav/Main";
import SpecDetail from "./src/screens/SpecDetail";

export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Main: undefined;
  // SpecDetail: { id: number }; // id 매개변수 추가
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppInner() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector((state: RootState) => !!state.user.name);

  // 앱 실행 시 refreshToken 있으면 자동 로그인
  useEffect(() => {
    const getTokenAndRefresh = async () => {
      try {
        const token = await SecureStore.getItemAsync("refreshToken");
        if (!token) {
          return;
        }
        const response = await axios.post(
          `${Config.API_URL}/refreshToken`,
          {},
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        // redux state 업데이트하면 컴포넌트는 자동으로 리렌더링됨
        dispatch(
          userSlice.actions.setUser({
            id: response.data.data.id,
            email: response.data.data.email,
            name: response.data.data.name,
            accessToken: response.data.data.accessToken,
          })
        );
      } catch (error) {
        console.error(error);
      } finally {
        // TODO: 스플래시 스크린 없애기
      }
    };
    // getTokenAndRefresh();
  }, [dispatch]);

  // axios interceptor 설정
  useEffect(() => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const {
          config,
          response: { status },
        } = error;
        if (status === 419) {
          if (error.response.data.code === "expired") {
            const originalRequest = config;
            const refreshToken = await SecureStore.getItemAsync("refreshToken");
            // refreshToken이 유효하다면, accessToken 갱신 요청 후 실패했던 api 재요청
            const { data } = await axios.post(
              `${Config.API_URL}/refreshToken`,
              {},
              { headers: { authorization: `Bearer ${refreshToken}` } }
            );
            dispatch(userSlice.actions.setAccessToken(data.data.accessToken));
            originalRequest.headers.authorization = `Bearer ${data.data.accessToken}`;
            return axios(originalRequest);
          }
        }
        return Promise.reject(error);
      }
    );
  }, [dispatch]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isLoggedIn ? (
        <Stack.Screen name="Main" component={Main} />
      ) : (
        <Stack.Group>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="Main" component={Main} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}

export default AppInner;
