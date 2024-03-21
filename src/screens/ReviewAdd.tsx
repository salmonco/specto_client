import React from "react";
import { Pressable, View } from "react-native";
import { CustomText as Text } from "@components/CustomText";
import Button from "@components/Button";
import { CATEGORY_LABEL, renderIcon } from "./Spec";

function ReviewAdd() {
  const completed = false;

  return (
    <View className="flex-1 gap-y-[37] py-[23]">
      <View className="gap-y-[11] px-[35] mt-[24] mb-[29]">
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center gap-x-[6]">
            {renderIcon("contest")}
            <Text className="font-[Inter-SemiBold] text-[#0094FF]">
              {CATEGORY_LABEL["contest"]}
            </Text>
          </View>
          <View
            className={`justify-center items-center w-[55] h-[22] ${
              completed ? "bg-[#EAF4FF]" : "bg-[#EFEFEF]"
            }`}
            style={{ borderRadius: 4 }}
          >
            <Text
              className={`font-[Inter-SemiBold] ${
                completed ? "text-[#0069CF]" : "text-[#9F9F9F]"
              }`}
              size={12}
            >
              {completed ? "완료" : "진행중"}
            </Text>
          </View>
        </View>
        <View
          className="border border-[#D9D9D9] py-[10] px-[16] gap-y-[30]"
          style={{ borderRadius: 12 }}
        >
          <View>
            <Text className="text-[#9F9F9F] mb-[5]" size={10}>
              상세 소개
            </Text>
            <Text
              className="font-[Inter-SemiBold] text-[#373737] mb-[8]"
              size={18}
            >
              올해의 토목 구조물 공모전
            </Text>
            <Text className="text-[#373737] mb-[8]" size={15}>
              2024.01.02 ~ 진행 중
            </Text>
          </View>
          <View className="gap-y-[8]">
            <View className="flex-row gap-x-[33]">
              <Text className="text-[#373737] mb-[8]" size={13}>
                공모 분야
              </Text>
              <Text className="text-[#373737] mb-[8]" size={13}>
                건축
              </Text>
            </View>
            <View className="flex-row gap-x-[33]">
              <Text className="text-[#373737] mb-[8]" size={13}>
                주최 기관
              </Text>
              <Text className="text-[#373737] mb-[8]" size={13}>
                대한토목학회
              </Text>
            </View>
            <View className="flex-row gap-x-[33]">
              <Text className="text-[#373737] mb-[8]" size={13}>
                마감 기한
              </Text>
              <Text className="text-[#373737] mb-[8]" size={13}>
                2024.02.22
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View className="justify-center items-center py-[8] border-t border-t-[#ECEBEB] border-b border-b-[#ECEBEB]">
        <Text className="font-[Inter-SemiBold] text-[#0094FF]" size={18}>
          오늘의 회고를 시작해볼까요?
        </Text>
      </View>

      <View className="py-[30] px-[35]">
        <View className="gap-y-[13]">
          <Text className="font-[Inter-SemiBold] text-[#373737]">
            오늘의 만족도는 어떠한가요?
          </Text>
          <View className="flex-row gap-x-[24]">
            <Pressable className="gap-y-[4] items-center">
              <View className="justify-center items-center bg-[#F5F5F5] rounded-full w-[58] h-[58] border border-[#D9D9D9]">
                <Text className="font-[Inter-Medium]" size={26}>
                  🙆🏻‍♀️
                </Text>
              </View>
              <Text className="text-[#373737]" size={11}>
                매우만족
              </Text>
            </Pressable>
            <Pressable className="gap-y-[4] items-center">
              <View className="justify-center items-center bg-[#F5F5F5] rounded-full w-[58] h-[58] border border-[#D9D9D9]">
                <Text className="font-[Inter-Medium]" size={26}>
                  🙎🏻‍♀️
                </Text>
              </View>
              <Text className="text-[#373737]" size={11}>
                보통
              </Text>
            </Pressable>
            <Pressable className="gap-y-[4] items-center">
              <View className="justify-center items-center bg-[#F5F5F5] rounded-full w-[58] h-[58] border border-[#D9D9D9]">
                <Text className="font-[Inter-Medium]" size={26}>
                  🤦🏻‍♀️
                </Text>
              </View>
              <Text className="text-[#373737]" size={11}>
                불만족
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View className="gap-y-[8]">
        <Text className="font-[Inter-SemiBold] text-[#373737]">
          오늘의 진행상황을 체크해주세요!
        </Text>
        <Text className="text-[#9F9F9F]" size={12}>
          캐릭터를 진행상황에 맞게 끌어주세요!
        </Text>
        <View
          className="h-[5] relative"
          style={{
            backgroundColor:
              "linear-gradient(90deg, rgba(0,148,255,0.45) 0%, rgba(0,148,255,1) 100%)",
          }}
        >
          <Text className="absolute" size={25}>
            👩🏻‍💻
          </Text>
        </View>
      </View>

      <Button
        label="저장하기"
        callbackFn={() => console.log("회고 저장 버튼을 눌렀습니다.")}
      />
    </View>
  );
}

export default ReviewAdd;
