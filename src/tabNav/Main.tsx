import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MyPageScreen from "../stackNav/MyPageScreen";
import HomeScreen from "../stackNav/HomeScreen";
import SpecScreen from "../stackNav/SpecScreen";
import RetrospectScreen from "./RetrospectScreen";
import MyPageIcon from "../../assets/images/myPage.svg";
import MyPageFocusedIcon from "../../assets/images/myPage.svg";
import HomeIcon from "../../assets/images/home.svg";
import HomeFocusedIcon from "../../assets/images/home.svg";
import SpecIcon from "../../assets/images/spec.svg";
import SpecFocusedIcon from "../../assets/images/specFocused.svg";
import RetrospectIcon from "../../assets/images/retrospect.svg";
import RetrospectFocusedIcon from "../../assets/images/retrospectFocused.svg";

export type MainParamList = {
  MyPageScreen: undefined;
  HomeScreen: undefined;
  SpecScreen: undefined;
  RetrospectScreen: undefined;
};

const Tab = createBottomTabNavigator();

function Main() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="MyPageScreen"
        component={MyPageScreen}
        options={{
          tabBarLabel: "마이페이지",
          tabBarIcon: ({ focused }) =>
            focused ? <MyPageFocusedIcon /> : <MyPageIcon />,
        }}
      />
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: "홈",
          tabBarIcon: ({ focused }) =>
            focused ? <HomeFocusedIcon /> : <HomeIcon />,
        }}
      />
      <Tab.Screen
        name="SpecScreen"
        component={SpecScreen}
        options={{
          tabBarLabel: "내 스펙",
          tabBarIcon: ({ focused }) =>
            focused ? <SpecFocusedIcon /> : <SpecIcon />,
        }}
      />
      <Tab.Screen
        name="RetrospectScreen"
        component={RetrospectScreen}
        options={{
          tabBarLabel: "내 회고",
          tabBarIcon: ({ focused }) =>
            focused ? <RetrospectFocusedIcon /> : <RetrospectIcon />,
        }}
      />
    </Tab.Navigator>
  );
}

export default Main;
