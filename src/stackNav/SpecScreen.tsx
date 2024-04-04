import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Spec from "../screens/Spec";
import SpecDetail from "../screens/SpecDetail";
import ContestAddScreen from "./ContestAddScreen";
import CertificateAddScreen from "./CertificateAddScreen";
import SpecCategorySelect from "./CertificateAddScreen";

export type SpecScreenStackParamList = {
  Spec: undefined;
  SpecDetail: { id: number; category: string }; // id와 category 매개변수 추가
  ContestAddScreen: undefined;
  CertificateAddScreen: undefined;
  SpecCategorySelect: undefined;
};

const SpecScreenStack = createNativeStackNavigator<SpecScreenStackParamList>();

function SpecScreen() {
  return (
    <SpecScreenStack.Navigator screenOptions={{ title: "내 스펙" }}>
      <SpecScreenStack.Screen name="Spec" component={Spec} />
      <SpecScreenStack.Screen name="SpecDetail" component={SpecDetail} />
      <SpecScreenStack.Screen
        name="SpecCategorySelect"
        component={SpecCategorySelect}
      />
      <SpecScreenStack.Screen
        name="ContestAddScreen"
        component={ContestAddScreen}
        options={{ headerShown: false }}
      />
      <SpecScreenStack.Screen
        name="CertificateAddScreen"
        component={CertificateAddScreen}
        options={{ headerShown: false }}
      />
    </SpecScreenStack.Navigator>
  );
}

export default SpecScreen;
