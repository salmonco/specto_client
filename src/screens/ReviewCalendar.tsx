import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { CustomText as Text } from "@components/CustomText";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ReviewCalendarScreenStackParamList } from "@stackNav/ReviewCalendarScreen";
import useCalendar from "src/hooks/useCalendar";
import ReviewListItem, { REVIEW_DATA } from "@components/ReviewListItem";
import axiosInstance from "src/api/axiosInstance";
import getDateString from "src/utils/getDateString";
import { useNavigation } from "@react-navigation/native";
import ReviewDetail from "@components/ReviewDetail";

export type ReviewCalendarScreenProps = NativeStackNavigationProp<
  ReviewCalendarScreenStackParamList,
  "ReviewCalendar"
>;

function ReviewCalendar() {
  const navigation = useNavigation<ReviewCalendarScreenProps>();
  const [reviewList, setReviewList] = useState(REVIEW_DATA);
  const {
    currentMonthCalendar,
    currentDate,
    setPreviousMonth,
    setNextMonth,
    DAY_LABEL,
    isEqualDate,
  } = useCalendar();
  const [clickedDate, setClickedDate] = useState(currentDate);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(0);

  useEffect(() => {
    const getReviewList = async () => {
      try {
        const dateStr = getDateString(clickedDate);
        const res = await axiosInstance.get(
          `/api/v1/review/calendar?date=${dateStr}`
        );
        console.log(`/review/calendar?date=${dateStr}`, res);
        setReviewList(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getReviewList();
  }, [clickedDate]);

  return (
    <View className="flex-1 relative">
      <ScrollView className="py-[26] px-[19] gap-y-[13]">
        <View className="p-[23] bg-[#F1F8FF]" style={{ borderRadius: 12 }}>
          <View className="flex-row justify-between">
            <View className="flex-row gap-[20]">
              <Pressable onPress={() => setPreviousMonth()}>
                <Text>{`<`}</Text>
              </Pressable>
              <Text
                className="font-[Inter-SemiBold] text-[#373737]"
                size={18}
              >{`${currentDate.getFullYear()}년 ${
                currentDate.getMonth() + 1
              }월`}</Text>
              <Pressable onPress={() => setNextMonth()}>
                <Text>{`>`}</Text>
              </Pressable>
            </View>
            <Pressable
              className="justify-center items-center w-[56] h-[22] border border-[#0094FF]"
              style={{ borderRadius: 4 }}
              onPress={() => console.log("진행별을 클릭했습니다.")}
            >
              <View className="flex-row justify-center items-center gap-[10]">
                <Text
                  className="text-[#0094FF] font-[Inter-SemiBold]"
                  size={11}
                >
                  진행별
                </Text>
              </View>
            </Pressable>
          </View>
          <View className="flex-row justify-between my-[9]">
            {DAY_LABEL.map((v) => (
              <View
                key={v}
                className="w-[29] h-[29] justify-center items-center"
              >
                <Text className="font-[Inter-Medium] text-[#7B7B7B]" size={12}>
                  {v}
                </Text>
              </View>
            ))}
          </View>
          <View className="gap-y-[10]">
            {currentMonthCalendar.map((item) => (
              <View
                className="flex-row justify-between w-full"
                key={Math.random()}
              >
                {item.map(({ date, day }) => (
                  <Pressable
                    onPress={() => date && setClickedDate(date)}
                    className={`w-[29] h-[29] justify-center items-center ${
                      date && isEqualDate(date, clickedDate)
                        ? " bg-[#0094FF] rounded-full"
                        : ""
                    }
                  `}
                    key={Math.random()}
                  >
                    <Text
                      className={`${
                        date && isEqualDate(date, clickedDate)
                          ? "font-[Inter-SemiBold] text-white"
                          : "text-[#0094FF]"
                      } ${day === 0 ? "text-[#F1F8FF]" : ""}`}
                      size={18}
                    >{`${day}`}</Text>
                  </Pressable>
                ))}
              </View>
            ))}
          </View>
        </View>
        <View className="flex-1 pb-[50]">
          {reviewList.map((item) => (
            <ReviewListItem
              key={`${item.specId}-${item.reviewId}`}
              item={item}
              navigation={navigation}
              setIsDetailOpen={setIsDetailOpen}
              setSelectedReviewId={setSelectedReviewId}
            />
          ))}
        </View>
      </ScrollView>

      <Pressable
        className={`absolute top-0 left-0 w-full h-full z-20 bg-black/30 ${
          isDetailOpen || "hidden"
        }`}
      >
        <ReviewDetail
          setIsDetailOpen={setIsDetailOpen}
          reviewId={selectedReviewId}
        />
      </Pressable>
    </View>
  );
}

export default ReviewCalendar;
