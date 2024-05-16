import React from "react";
import { Pressable, ScrollView, View } from "react-native";
import { CustomText as Text } from "@components/CustomText";
import Button from "@components/Button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ReviewListScreenStackParamList } from "@stackNav/ReviewListScreen";
import { REVIEW_DATA } from "@components/ReviewListItem";
import ChevronBottom from "@assets/images/chevron-bottom-black.svg";
import AddIcon from "@assets/images/add-blue.svg";
import { CATEGORY_LABEL } from "./Spec";

type ReviewListScreenProps = NativeStackScreenProps<
  ReviewListScreenStackParamList,
  "ReviewListUp"
>;

function ReviewListUp({ route, navigation }: Readonly<ReviewListScreenProps>) {
  const { id } = route.params;

  const data = {
    id: 1,
    name: "정보처리기사",
    category: "certificate",
    startDate: "2024-03-06",
    endDate: "2024-04-10",
    completed: false,
  };

  return (
    <View className="flex-1 relative">
      <View className="py-[28] px-[19]">
        <Button
          label="회고 추가하기"
          callbackFn={() =>
            console.log(`${id}번 스펙의 회고 추가하기 버튼을 눌렀습니다.`)
          }
        />
      </View>

      <View className="py-[19] px-[19] border-y border-y-[#ECEBEB]">
        <View className="flex-row justify-between items-center">
          <View>
            <View className="flex-row items-center">
              <View className="flex-col justify-between">
                <View className="flex-row justify-start items-center mb-[6.5]">
                  <Text
                    className="font-[Inter-SemiBold] h-full mr-[6]"
                    size={18}
                  >
                    {data.name}
                  </Text>
                  <Text className="text-[#AEAEB2]" size={10}>
                    {CATEGORY_LABEL[data.category]}
                  </Text>
                </View>
                <Text className="text-[#636366]" size={12}>
                  {data.startDate} ~ {data.endDate}
                </Text>
              </View>
            </View>
          </View>
          <View
            className={`justify-center items-center w-[55] h-[22] ${
              data.completed ? "bg-[#EAF4FF]" : "bg-[#EFEFEF]"
            }`}
            style={{ borderRadius: 4 }}
          >
            <Text
              className={`font-[Inter-SemiBold] ${
                data.completed ? "text-[#0069CF]" : "text-[#9F9F9F]"
              }`}
              size={12}
            >
              {data.completed ? "완료" : "진행중"}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView>
        <View className="pt-[23] pb-[50] px-[19]">
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <Text
                className="font-[Inter-SemiBold] text-[#373737] mr-[9]"
                size={20}
              >
                나의 회고 기록
              </Text>
              <Text className="text-[#979797]" size={18}>
                4
              </Text>
            </View>
            <View className="flex-row items-center justify-end">
              <Text
                className="text-[#1C1C1E] font-[Inter-Medium] mr-[5]"
                size={12}
              >
                오래된 순
              </Text>
              <View className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-4 border-b-[#1C1C1E] rotate-180" />
            </View>
          </View>

          <View className="py-[23]">
            {REVIEW_DATA.map((item) => (
              <View
                key={`${item.specId}-${item.reviewId}`}
                className="justify-between border border-[#DEDEDE] pt-[17] pb-[13] px-[16] mb-[23]"
                style={{ borderRadius: 10 }}
              >
                <View className="mb-[7]">
                  <View className="flex-row items-center justify-between border-b border-[#EFEFEF] pb-[7]">
                    <Text className="text-[#636366]" size={12.3}>
                      {item.date}
                    </Text>
                    <Text
                      className="font-[Inter-Medium] text-[#0094FF]"
                      size={18}
                    >
                      D+{item.dPlusDay}
                    </Text>
                  </View>
                </View>

                <Pressable
                  className="flex-row items-center justify-center"
                  onPress={() => console.log("회고 펼쳐보기를 클릭했당께")}
                >
                  <Text
                    className="font-[Inter-Medium] text-[#373737] mr-[12]"
                    size={12}
                  >
                    회고 펼쳐보기
                  </Text>
                  <ChevronBottom />
                </Pressable>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <Pressable
        className="absolute right-[22] bottom-[22]"
        onPress={() => console.log("회고 추가 버튼을 눌렀습니다.")}
      >
        <AddIcon />
      </Pressable>
    </View>
  );
}

export default ReviewListUp;
