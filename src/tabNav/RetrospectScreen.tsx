import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import RetrospectCalendarScreen from "../stackNav/RetrospectCalendarScreen";
import RetrospectListScreen from "../stackNav/RetrospectListScreen";

export type RetrospectScreenParamList = {
  RetrospectCalendarScreen: undefined;
  RetrospectListScreen: undefined;
};

const RetrospectScreenTab =
  createMaterialTopTabNavigator<RetrospectScreenParamList>();

function RetrospectScreen() {
  return (
    <RetrospectScreenTab.Navigator>
      <RetrospectScreenTab.Screen
        name="RetrospectCalendarScreen"
        component={RetrospectCalendarScreen}
      />
      <RetrospectScreenTab.Screen
        name="RetrospectListScreen"
        component={RetrospectListScreen}
      />
    </RetrospectScreenTab.Navigator>
  );
}

export default RetrospectScreen;
