import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RetrospectList from "../screens/RetrospectList";
import RetrospectListUp from "../screens/RetrospectListUp";
import RetrospectAdd from "../screens/RetrospectAdd";
import RetrospectAddComplete from "../screens/RetrospectAddComplete";

export type RetrospectListScreenStackParamList = {
  RetrospectList: undefined;
  RetrospectListUp: undefined;
  RetrospectAdd: undefined;
  RetrospectAddComplete: undefined;
};

const RetrospectListScreenStack =
  createNativeStackNavigator<RetrospectListScreenStackParamList>();

function RetrospectListScreen() {
  return (
    <RetrospectListScreenStack.Navigator screenOptions={{ headerShown: false }}>
      <RetrospectListScreenStack.Screen
        name="RetrospectList"
        component={RetrospectList}
      />
      <RetrospectListScreenStack.Screen
        name="RetrospectListUp"
        component={RetrospectListUp}
      />
      <RetrospectListScreenStack.Screen
        name="RetrospectAdd"
        component={RetrospectAdd}
      />
      <RetrospectListScreenStack.Screen
        name="RetrospectAddComplete"
        component={RetrospectAddComplete}
      />
    </RetrospectListScreenStack.Navigator>
  );
}

export default RetrospectListScreen;
