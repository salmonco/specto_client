import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ReviewCalendar from "../screens/ReviewCalendar";
import ReviewListUp from "../screens/ReviewListUp";
import { SpecBase } from "@screens/Spec";

export type ReviewCalendarScreenStackParamList = {
  ReviewCalendar: undefined;
  ReviewListUp: { specItem: SpecBase };
};

const ReviewCalendarScreenStack =
  createNativeStackNavigator<ReviewCalendarScreenStackParamList>();

function ReviewCalendarScreen() {
  return (
    <ReviewCalendarScreenStack.Navigator screenOptions={{ headerShown: false }}>
      <ReviewCalendarScreenStack.Screen
        name="ReviewCalendar"
        component={ReviewCalendar}
      />
      <ReviewCalendarScreenStack.Screen
        name="ReviewListUp"
        component={ReviewListUp}
      />
    </ReviewCalendarScreenStack.Navigator>
  );
}

export default ReviewCalendarScreen;
