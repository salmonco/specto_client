import React, { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { CustomText as Text } from "@components/CustomText";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ReviewCalendarScreenStackParamList } from "@stackNav/ReviewCalendarScreen";
import ChevronBottom from "@assets/images/chevron-bottom-black.svg";
import ChevronRight from "@assets/images/chevron-right-white.svg";
import useCalendar from "src/hooks/useCalendar";

type ReviewCalendarScreenProps = NativeStackScreenProps<
  ReviewCalendarScreenStackParamList,
  "ReviewCalendar"
>;

function ReviewCalendar({ navigation }: Readonly<ReviewCalendarScreenProps>) {
  const reviewData = [
    {
      reviewId: 1,
      specId: 1,
      specName: "정보처리기사",
      category: "certificate",
      date: "2024-03-06",
      dPlusDay: "16",
    },
    {
      reviewId: 2,
      specId: 1,
      specName: "정보처리기사",
      category: "certificate",
      date: "2024-03-06",
      dPlusDay: "16",
    },
    {
      reviewId: 1,
      specId: 2,
      specName: "SolidIT 현장실습",
      category: "intern",
      date: "2024-03-06",
      dPlusDay: "16",
    },
  ];
  const [reviewList, setReviewList] = useState(reviewData);
  const { weeks, currentDate, setPreviousMonth, setNextMonth, DAY_LIST } =
    useCalendar();
  const [clickedDate, setClickedDate] = useState(currentDate.getDate());

  return (
    <View className="flex-1">
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
            {DAY_LIST.map((v) => (
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
            {weeks.map((item) => (
              <View
                className="flex-row justify-between w-full"
                key={Math.random()}
              >
                {item.map((day) => (
                  <Pressable
                    onPress={() => day && setClickedDate(day)}
                    className={`w-[29] h-[29] justify-center items-center ${
                      clickedDate === day ? " bg-[#0094FF] rounded-full" : ""
                    }
                  `}
                    key={Math.random()}
                  >
                    <Text
                      className={`${
                        clickedDate === day
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
        <View className="flex-1 gap-[14] pb-[50]">
          {reviewList.map((v) => (
            <View
              key={`${v.specId}-${v.reviewId}`}
              className="justify-between gap-[7] border border-[#DEDEDE] py-[8] px-[16]"
              style={{ borderRadius: 10 }}
            >
              <View>
                <View className="flex-row items-center justify-between border-b border-[#EFEFEF] pb-[7]">
                  <Text className="text-[#636366]" size={12.3}>
                    {v.date}
                  </Text>
                  <Pressable
                    className="justify-center items-center w-[69] h-[22] bg-[#0094FF]"
                    style={{ borderRadius: 4 }}
                    onPress={() => console.log("회고 기록을 클릭했습니다.")}
                  >
                    <View className="flex-row justify-center items-center gap-[10]">
                      <Text
                        className="text-white font-[Inter-SemiBold]"
                        size={11}
                      >
                        회고 기록
                      </Text>
                      <ChevronRight />
                    </View>
                  </Pressable>
                </View>
                <View className="flex-row justify-between pt-[13]">
                  <Text className="font-[Inter-SemiBold]" size={18}>
                    {v.specName}
                  </Text>
                  <Text
                    className="font-[Inter-Medium] text-[#0094FF]"
                    size={18}
                  >
                    D+{v.dPlusDay}
                  </Text>
                </View>
              </View>
              <Pressable
                className="flex-row items-center justify-center gap-[12]"
                onPress={() => console.log("회고 펼쳐보기를 클릭했당께")}
              >
                <Text className="font-[Inter-Medium] text-[#373737]" size={12}>
                  회고 펼쳐보기
                </Text>
                <ChevronBottom />
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default ReviewCalendar;
