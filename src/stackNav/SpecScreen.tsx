import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Spec from "../screens/Spec";
import SpecDetail from "../screens/SpecDetail";
import CompetitionAddScreen from "./CompetitionAddScreen";
import CertificateAddScreen from "./CertificateAddScreen";

export type SpecScreenStackParamList = {
  Spec: undefined;
  SpecDetail: undefined;
  CompetitionAddScreen: undefined;
  CertificateAddScreen: undefined;
};

const SpecScreenStack = createNativeStackNavigator<SpecScreenStackParamList>();

function SpecScreen() {
  return (
    <SpecScreenStack.Navigator screenOptions={{ headerShown: false }}>
      <SpecScreenStack.Screen name="Spec" component={Spec} />
      <SpecScreenStack.Screen name="SpecDetail" component={SpecDetail} />
      <SpecScreenStack.Screen
        name="CompetitionAddScreen"
        component={CompetitionAddScreen}
      />
      <SpecScreenStack.Screen
        name="CertificateAddScreen"
        component={CertificateAddScreen}
      />
    </SpecScreenStack.Navigator>
  );
}

export default SpecScreen;
