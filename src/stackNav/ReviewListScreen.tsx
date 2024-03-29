import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ReviewList from "../screens/ReviewList";
import ReviewListUp from "../screens/ReviewListUp";
import ReviewAdd from "../screens/ReviewAdd";
import ReviewAddComplete from "../screens/ReviewAddComplete";

export type ReviewListScreenStackParamList = {
  ReviewList: undefined;
  ReviewListUp: { id: number };
  ReviewAdd: undefined;
  ReviewAddComplete: undefined;
};

const ReviewListScreenStack =
  createNativeStackNavigator<ReviewListScreenStackParamList>();

function ReviewListScreen() {
  return (
    <ReviewListScreenStack.Navigator screenOptions={{ headerShown: false }}>
      <ReviewListScreenStack.Screen name="ReviewList" component={ReviewList} />
      <ReviewListScreenStack.Screen
        name="ReviewListUp"
        component={ReviewListUp}
      />
      <ReviewListScreenStack.Screen name="ReviewAdd" component={ReviewAdd} />
      <ReviewListScreenStack.Screen
        name="ReviewAddComplete"
        component={ReviewAddComplete}
      />
    </ReviewListScreenStack.Navigator>
  );
}

export default ReviewListScreen;
