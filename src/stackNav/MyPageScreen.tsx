import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyPage from "../screens/MyPage";

export type MyPageScreenStackParamList = {
  MyPage: undefined;
};

const MyPageScreenStack =
  createNativeStackNavigator<MyPageScreenStackParamList>();

function MyPageScreen() {
  return (
    <MyPageScreenStack.Navigator screenOptions={{ headerShown: false }}>
      <MyPageScreenStack.Screen name="MyPage" component={MyPage} />
    </MyPageScreenStack.Navigator>
  );
}

export default MyPageScreen;
