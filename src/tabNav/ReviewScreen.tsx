import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ReviewCalendarScreen from "../stackNav/ReviewCalendarScreen";
import ReviewListScreen from "../stackNav/ReviewListScreen";

export type ReviewScreenParamList = {
  ReviewCalendarScreen: undefined;
  ReviewListScreen: undefined;
};

const ReviewScreenTab = createMaterialTopTabNavigator<ReviewScreenParamList>();

function ReviewScreen() {
  return (
    <ReviewScreenTab.Navigator>
      <ReviewScreenTab.Screen
        name="ReviewCalendarScreen"
        component={ReviewCalendarScreen}
      />
      <ReviewScreenTab.Screen
        name="ReviewListScreen"
        component={ReviewListScreen}
      />
    </ReviewScreenTab.Navigator>
  );
}

export default ReviewScreen;
