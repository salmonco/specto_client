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
    <SpecScreenStack.Navigator screenOptions={{ headerShown: false }}>
      <SpecScreenStack.Screen name="Spec" component={Spec} />
      <SpecScreenStack.Screen name="SpecDetail" component={SpecDetail} />
      <SpecScreenStack.Screen
        name="ContestAddScreen"
        component={ContestAddScreen}
      />
      <SpecScreenStack.Screen
        name="CertificateAddScreen"
        component={CertificateAddScreen}
      />
    </SpecScreenStack.Navigator>
  );
}

export default SpecScreen;
