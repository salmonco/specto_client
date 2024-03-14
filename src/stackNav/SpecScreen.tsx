import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Spec from "../screens/Spec";
import SpecDetail from "../screens/SpecDetail";
import ContestAddScreen from "./ContestAddScreen";
import CertificateAddScreen from "./CertificateAddScreen";

export type SpecScreenStackParamList = {
  Spec: undefined;
  SpecDetail: undefined;
  ContestAddScreen: undefined;
  CertificateAddScreen: undefined;
};

const SpecScreenStack = createNativeStackNavigator<SpecScreenStackParamList>();

function SpecScreen() {
  return (
    <SpecScreenStack.Navigator screenOptions={{ title: "내 스펙" }}>
      <SpecScreenStack.Screen name="Spec" component={Spec} />
      <SpecScreenStack.Screen name="SpecDetail" component={SpecDetail} />
      <SpecScreenStack.Screen
        options={{ headerShown: false }}
        name="ContestAddScreen"
        component={ContestAddScreen}
      />
      <SpecScreenStack.Screen
        options={{ headerShown: false }}
        name="CertificateAddScreen"
        component={CertificateAddScreen}
      />
    </SpecScreenStack.Navigator>
  );
}

export default SpecScreen;
