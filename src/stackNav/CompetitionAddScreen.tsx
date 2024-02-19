import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CompetitionAdd1 from "../screens/CompetitionAdd1";
import CompetitionAdd2 from "../screens/CompetitionAdd2";
import CompetitionAdd3 from "../screens/CompetitionAdd3";
import SpecAddComplete from "../screens/SpecAddComplete";

export type CompetitionAddScreenStackParamList = {
  CompetitionAdd1: undefined;
  CompetitionAdd2: undefined;
  CompetitionAdd3: undefined;
  SpecAddComplete: undefined;
};

const CompetitionAddScreenStack =
  createNativeStackNavigator<CompetitionAddScreenStackParamList>();

function CompetitionAddScreen() {
  return (
    <CompetitionAddScreenStack.Navigator screenOptions={{ headerShown: false }}>
      <CompetitionAddScreenStack.Screen
        name="CompetitionAdd1"
        component={CompetitionAdd1}
      />
      <CompetitionAddScreenStack.Screen
        name="CompetitionAdd2"
        component={CompetitionAdd2}
      />
      <CompetitionAddScreenStack.Screen
        name="CompetitionAdd3"
        component={CompetitionAdd3}
      />
      <CompetitionAddScreenStack.Screen
        name="SpecAddComplete"
        component={SpecAddComplete}
      />
    </CompetitionAddScreenStack.Navigator>
  );
}

export default CompetitionAddScreen;
