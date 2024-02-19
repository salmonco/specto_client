import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RetrospectCalendar from "../screens/RetrospectCalendar";
import RetrospectListUp from "../screens/RetrospectListUp";

export type RetrospectCalendarScreenStackParamList = {
  RetrospectCalendar: undefined;
  RetrospectListUp: undefined;
};

const RetrospectCalendarScreenStack =
  createNativeStackNavigator<RetrospectCalendarScreenStackParamList>();

function RetrospectCalendarScreen() {
  return (
    <RetrospectCalendarScreenStack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <RetrospectCalendarScreenStack.Screen
        name="RetrospectCalendar"
        component={RetrospectCalendar}
      />
      <RetrospectCalendarScreenStack.Screen
        name="RetrospectListUp"
        component={RetrospectListUp}
      />
    </RetrospectCalendarScreenStack.Navigator>
  );
}

export default RetrospectCalendarScreen;
