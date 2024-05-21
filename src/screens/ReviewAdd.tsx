import React, { useState } from "react";
import { Pressable, ScrollView, TextInput, View } from "react-native";
import { CustomText as Text } from "@components/CustomText";
import Button from "@components/Button";
import HorizontalSlider from "@components/HorizontalSlider";
import { CATEGORY_LABEL, renderSpecIcon } from "./Spec";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ReviewListScreenStackParamList } from "@stackNav/ReviewListScreen";
import { SATISFACTION_MENU } from "@components/ReviewDetail";
import axiosInstance from "src/api/axiosInstance";

type ReviewListScreenProps = NativeStackScreenProps<
  ReviewListScreenStackParamList,
  "ReviewAdd"
>;
function ReviewAdd({ route, navigation }: Readonly<ReviewListScreenProps>) {
  const { specItem } = route.params;
  const [progress, setProgress] = useState(0);
  const [satisfaction, setSatisfaction] = useState("");
  const [impression, setImpression] = useState("");
  const [bearInMind, setBearInMind] = useState("");

  const saveReview = async () => {
    try {
      const body = {
        specId: specItem.specId,
        satisfaction,
        progress: Math.round(progress * 100),
        impression,
        bearInMind,
        date: new Date(),
      };
      console.log("body", body);
      const res = await axiosInstance.post(`/api/v1/review`, body);
      console.log(`/api/v1/review`, res);
      navigation.navigate("ReviewAddComplete");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView className="flex-1 py-[23]">
      <View className="px-[35] pt-[24] pb-[29]">
        <View className="flex-row justify-between items-center mb-[11]">
          <View className="flex-row items-center gap-x-[6]">
            {renderSpecIcon(specItem?.category)}
            <Text className="font-[Inter-SemiBold] text-[#0094FF]">
              {CATEGORY_LABEL[specItem?.category]}
            </Text>
          </View>
          <View
            className={`justify-center items-center w-[55] h-[22] ${
              specItem?.completed ? "bg-[#EAF4FF]" : "bg-[#EFEFEF]"
            }`}
            style={{ borderRadius: 4 }}
          >
            <Text
              className={`font-[Inter-SemiBold] ${
                specItem?.completed ? "text-[#0069CF]" : "text-[#9F9F9F]"
              }`}
              size={12}
            >
              {specItem?.completed ? "완료" : "진행중"}
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
              {specItem?.name}
            </Text>
            <Text className="text-[#373737] mb-[8]" size={15}>
              {specItem?.startDate} ~ {specItem?.endDate}
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
                {specItem?.endDate}
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
            {SATISFACTION_MENU.map((v) => (
              <Pressable
                key={v.value}
                className="items-center mr-[24]"
                onPress={() => setSatisfaction(v.value)}
              >
                <View
                  className={`justify-center items-center rounded-full w-[58] h-[58] border mb-[4] ${
                    satisfaction === v.value
                      ? "bg-[#5BB2F2] border-[#0094FF]"
                      : "bg-[#F5F5F5] border-[#D9D9D9]"
                  }`}
                >
                  <Text className="font-[Inter-Medium]" size={26}>
                    {v.emoji}
                  </Text>
                </View>
                <Text className="text-[#373737]" size={11}>
                  {v.label}
                </Text>
              </Pressable>
            ))}
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
          onChangeText={(text) => setImpression(text)}
          value={impression}
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
          onChangeText={(text) => setBearInMind(text)}
          value={bearInMind}
          placeholder="ex- 공모전 기획안이 완전히 다 뒤집혀서 팀원 모두가 멘붕이 된 것.."
        />
      </View>

      <View className="px-[14] pb-[100]">
        <Button label="저장하기" callbackFn={saveReview} />
      </View>
    </ScrollView>
  );
}

export default ReviewAdd;
