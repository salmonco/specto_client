import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Spec from "../screens/Spec";
import SpecDetail from "../screens/SpecDetail";
import ContestAddScreen from "./ContestAddScreen";
import CertificateAddScreen from "./CertificateAddScreen";
import SpecContest from "../screens/SpecContest";
import SpecCertificate from "../screens/SpecCertificate";
import SpecIntern from "../screens/SpecIntern";
import SpecActivity from "../screens/SpecActivity";
import SpecProject from "../screens/SpecProject";

export type SpecScreenStackParamList = {
  Spec: undefined;
  SpecDetail: { id: number }; // id 매개변수 추가
  ContestAddScreen: undefined;
  CertificateAddScreen: undefined;
  SpecContest: { id: number }; // id 매개변수 추가
  SpecCertificate: { id: number }; // id 매개변수 추가
  SpecIntern: { id: number }; // id 매개변수 추가
  SpecActivity: { id: number }; // id 매개변수 추가
  SpecProject: { id: number }; // id 매개변수 추가
};

const SpecScreenStack = createNativeStackNavigator<SpecScreenStackParamList>();

function SpecScreen() {
  return (
    <SpecScreenStack.Navigator screenOptions={{ title: "내 스펙" }}>
      <SpecScreenStack.Screen name="Spec" component={Spec} />
      <SpecScreenStack.Screen name="SpecDetail" component={SpecDetail} />
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
      <SpecScreenStack.Screen name="SpecContest" component={SpecContest} />
      <SpecScreenStack.Screen
        name="SpecCertificate"
        component={SpecCertificate}
      />
      <SpecScreenStack.Screen name="SpecIntern" component={SpecIntern} />
      <SpecScreenStack.Screen name="SpecActivity" component={SpecActivity} />
      <SpecScreenStack.Screen name="SpecProject" component={SpecProject} />
    </SpecScreenStack.Navigator>
  );
}

export default SpecScreen;
