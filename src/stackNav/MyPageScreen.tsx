import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyPage from "../screens/MyPage";
import ProfileChange from "../screens/ProfileChange";

export type MyPageScreenStackParamList = {
  MyPage: undefined;
  ProfileChange: undefined;
};

const MyPageScreenStack =
  createNativeStackNavigator<MyPageScreenStackParamList>();

function MyPageScreen() {
  return (
    <MyPageScreenStack.Navigator screenOptions={{ headerShown: false }}>
      <MyPageScreenStack.Screen name="MyPage" component={MyPage} />
      <MyPageScreenStack.Screen
        name="ProfileChange"
        component={ProfileChange}
      />
    </MyPageScreenStack.Navigator>
  );
}

export default MyPageScreen;
