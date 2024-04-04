import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CertificateAdd1 from "../screens/CertificateAdd1";
import CertificateAdd2 from "../screens/CertificateAdd2";
import CertificateAdd3 from "../screens/CertificateAdd3";
import SpecAddComplete from "../screens/SpecAddComplete";

export type CertificateAddScreenStackParamList = {
  CertificateAdd1: undefined;
  CertificateAdd2: undefined;
  CertificateAdd3: undefined;
  SpecAddComplete: undefined;
};

const CertificateAddScreenStack =
  createNativeStackNavigator<CertificateAddScreenStackParamList>();

function CertificateAddScreen() {
  return (
    <CertificateAddScreenStack.Navigator screenOptions={{ title: "자격증" }}>
      <CertificateAddScreenStack.Screen
        name="CertificateAdd1"
        component={CertificateAdd1}
      />
      <CertificateAddScreenStack.Screen
        name="CertificateAdd2"
        component={CertificateAdd2}
      />
      <CertificateAddScreenStack.Screen
        name="CertificateAdd3"
        component={CertificateAdd3}
      />
      <CertificateAddScreenStack.Screen
        name="SpecAddComplete"
        component={SpecAddComplete}
      />
    </CertificateAddScreenStack.Navigator>
  );
}

export default CertificateAddScreen;
