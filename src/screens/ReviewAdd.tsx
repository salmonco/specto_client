import React, { useState } from "react";
import { Pressable, ScrollView, TextInput, View } from "react-native";
import { CustomText as Text } from "@components/CustomText";
import Button from "@components/Button";
import { CATEGORY_LABEL, renderIcon } from "./Spec";
import HorizontalSlider from "@components/HorizontalSlider";

function ReviewAdd() {
  const completed = false;
  const [progress, setProgress] = useState(0);
  const [impressiveScene, setImpressiveScene] = useState("");
  const [memorableExperience, setMemorableExperience] = useState("");

  return (
    <ScrollView className="flex-1 py-[23]">
      <View className="px-[35] pt-[24] pb-[29]">
        <View className="flex-row justify-between items-center mb-[11]">
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
          className="border border-[#D9D9D9] py-[10] px-[16]"
          style={{ borderRadius: 12 }}
        >
          <View className="mb-[30]">
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
              <Text className="text-[#373737]" size={13}>
                공모 분야
              </Text>
              <Text className="text-[#373737]" size={13}>
                건축
              </Text>
            </View>
            <View className="flex-row gap-x-[33]">
              <Text className="text-[#373737]" size={13}>
                주최 기관
              </Text>
              <Text className="text-[#373737]" size={13}>
                대한토목학회
              </Text>
            </View>
            <View className="flex-row gap-x-[33]">
              <Text className="text-[#373737]]" size={13}>
                마감 기한
              </Text>
              <Text className="text-[#373737]" size={13}>
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

      <View className="pt-[30] pb-[50] px-[29]">
        <View>
          <Text className="font-[Inter-SemiBold] text-[#373737] mb-[13]">
            오늘의 만족도는 어떠한가요?
          </Text>
          <View className="flex-row">
            <Pressable className="items-center mr-[24]">
              <View className="justify-center items-center bg-[#F5F5F5] rounded-full w-[58] h-[58] border border-[#D9D9D9] mb-[4]">
                <Text className="font-[Inter-Medium]" size={26}>
                  🙆🏻‍♀️
                </Text>
              </View>
              <Text className="text-[#373737]" size={11}>
                매우만족
              </Text>
            </Pressable>
            <Pressable className="items-center mr-[24]">
              <View className="justify-center items-center bg-[#F5F5F5] rounded-full w-[58] h-[58] border border-[#D9D9D9] mb-[4]">
                <Text className="font-[Inter-Medium]" size={26}>
                  🙎🏻‍♀️
                </Text>
              </View>
              <Text className="text-[#373737]" size={11}>
                보통
              </Text>
            </Pressable>
            <Pressable className="items-center">
              <View className="justify-center items-center bg-[#F5F5F5] rounded-full w-[58] h-[58] border border-[#D9D9D9] mb-[4]">
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

      <View className="pb-[47] px-[29]">
        <Text className="font-[Inter-SemiBold] text-[#373737] mb-[8]">
          오늘의 진행상황을 체크해주세요!
        </Text>
        <Text className="text-[#9F9F9F] mb-[40]" size={12}>
          캐릭터를 진행상황에 맞게 끌어주세요!
        </Text>
        <HorizontalSlider progress={progress} setProgress={setProgress} />
      </View>

      <View className="pb-[50] px-[29]">
        <Text className="font-[Inter-SemiBold] text-[#373737] mb-[15]">
          오늘 과정 중 가장 인상 깊었던 한 장면을 작성해봐요
        </Text>
        <TextInput
          className="border border-[#D9D9D9] py-[10] px-[16] h-[150]"
          style={{ borderRadius: 12 }}
          multiline={true}
          // numberOfLines={4}
          onChangeText={(text) => setImpressiveScene(text)}
          value={impressiveScene}
          placeholder="ex- 공모전 기획안이 완전히 다 뒤집혀서 팀원 모두가 멘붕이 된 것.."
        />
      </View>

      <View className="pb-[27] px-[29]">
        <Text className="font-[Inter-SemiBold] text-[#373737] mb-[15]">
          오늘 경험 중 이것만은 꼭 기억하자! 하는게 있다면?
        </Text>
        <TextInput
          className="border border-[#D9D9D9] py-[10] px-[16] h-[150]"
          style={{ borderRadius: 12 }}
          multiline={true}
          // numberOfLines={4}
          onChangeText={(text) => setMemorableExperience(text)}
          value={memorableExperience}
          placeholder="ex- 공모전 기획안이 완전히 다 뒤집혀서 팀원 모두가 멘붕이 된 것.."
        />
      </View>

      <View className="px-[14] pb-[100]">
        <Button
          label="저장하기"
          callbackFn={() => console.log("회고 저장 버튼을 눌렀습니다.")}
        />
      </View>
    </ScrollView>
  );
}

export default ReviewAdd;
