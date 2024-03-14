import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomText as Text } from "@components/CustomText";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ReviewCalendarScreenStackParamList } from "@stackNav/ReviewCalendarScreen";

type ReviewCalendarScreenProps = NativeStackScreenProps<
  ReviewCalendarScreenStackParamList,
  "ReviewCalendar"
>;

function ReviewCalendar({ navigation }: Readonly<ReviewCalendarScreenProps>) {
  return <SafeAreaView edges={["top"]} className="flex-1"></SafeAreaView>;
}

export default ReviewCalendar;
