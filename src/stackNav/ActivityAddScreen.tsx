import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ActivityAdd1 from "../screens/ActivityAdd1";
import ActivityAdd2 from "../screens/ActivityAdd2";
import ActivityAdd3 from "../screens/ActivityAdd3";
import SpecAddComplete from "../screens/SpecAddComplete";

export type ActivityAddScreenStackParamList = {
  ActivityAdd1: undefined;
  ActivityAdd2: { name: string };
  ActivityAdd3: {
    name: string;
    host: string;
    startDate: Date | null;
    endDate: Date | null;
    field: string;
    contents: string | null;
    proofFile: string | null;
  };
  SpecAddComplete: { name: string };
};

const ActivityAddScreenStack =
  createNativeStackNavigator<ActivityAddScreenStackParamList>();

function ActivityAddScreen() {
  return (
    <ActivityAddScreenStack.Navigator screenOptions={{ title: "대외활동" }}>
      <ActivityAddScreenStack.Screen
        name="ActivityAdd1"
        component={ActivityAdd1}
      />
      <ActivityAddScreenStack.Screen
        name="ActivityAdd2"
        component={ActivityAdd2}
      />
      <ActivityAddScreenStack.Screen
        name="ActivityAdd3"
        component={ActivityAdd3}
      />
      <ActivityAddScreenStack.Screen
        name="SpecAddComplete"
        component={SpecAddComplete}
      />
    </ActivityAddScreenStack.Navigator>
  );
}

export default ActivityAddScreen;
