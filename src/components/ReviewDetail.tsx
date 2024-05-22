import React, { useEffect, useState } from "react";
import { CustomText as Text } from "@components/CustomText";
import { Pressable, SafeAreaView, View } from "react-native";
import Close from "@assets/images/close.svg";
import HorizontalSlider from "./HorizontalSlider";
import axiosInstance from "src/api/axiosInstance";
import { CATEGORY_LABEL } from "@screens/Spec";

export const SATISFACTION_OPTION: {
  [key: string]: { label: string; emoji: string };
} = {
  VERYSATISFACTION: { label: "매우 만족", emoji: "🙆🏻‍♀️" },
  SOSO: { label: "보통", emoji: "🙎🏻‍♀️" },
  DISSATISFACTION: { label: "불만족", emoji: "🤦🏻‍♀️" },
};
export const SATISFACTION_MENU = Object.entries(SATISFACTION_OPTION).map(
  ([k, v]) => {
    return { value: k, label: v.label, emoji: v.emoji };
  }
);
interface ReviewDetailBase {
  specName: string;
  category: string;
  dPlusDay: number;
  satisfaction: string;
  progress: number;
  impression: string;
  bearInMind: string;
  date: string;
}
type ReviewDetailProps = {
  setIsDetailOpen: React.Dispatch<React.SetStateAction<boolean>>;
  reviewId: number;
};
export default function ReviewDetail({
  setIsDetailOpen,
  reviewId,
}: Readonly<ReviewDetailProps>) {
  const [item, setItem] = useState<ReviewDetailBase | null>(null);

  useEffect(() => {
    const getItem = async () => {
      try {
        const res = await axiosInstance.get(`/api/v1/review/${reviewId}`);
        console.log(`/review/${reviewId}`, res);
        setItem(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getItem();
  }, [reviewId]);

  return (
    <SafeAreaView>
      <View className="pt-[20] pb-[37] px-[34] bg-white">
        <View className="flex-row justify-between items-center pb-[10] border-b border-b-[#EFEFEF]">
          <Text className="text-[#636366]" size={13}>
            {item?.date ?? "2024.03.28"}
          </Text>
          <View className="flex-row items-center">
            <Pressable
              className="justify-center items-center w-[53] h-[22] bg-[#0094FF] mr-[16]"
              style={{ borderRadius: 4 }}
              onPress={() => console.log("수정 버튼을 클릭했습니다.")}
            >
              <View className="flex-row justify-center items-center gap-[10]">
                <Text className="text-white font-[Inter-SemiBold]" size={11}>
                  수정
                </Text>
              </View>
            </Pressable>
            <Pressable onPress={() => setIsDetailOpen(false)}>
              <Close />
            </Pressable>
          </View>
        </View>

        <View className="flex-row justify-between py-[24] pb-[30]">
          <View className="flex-row items-center">
            <Text
              className="font-[Inter-SemiBold] text-[#1C1C1E] mr-[10]"
              size={18}
            >
              {item?.specName ?? "정보처리기사"}
            </Text>
            <Text className="text-[#AEAEB2]" size={10}>
              {CATEGORY_LABEL[item?.category ?? "CERTIFICATION"]}
            </Text>
          </View>
          <Text className="font-[Inter-Medium] text-[#0094FF]" size={18}>
            D+{`${item?.dPlusDay ?? 0}`}
          </Text>
        </View>

        <View className="flex-row items-center pb-[24] border-b border-b-[#EFEFEF]">
          <Text className="text-[#9F9F9F] mr-[165]" size={12}>
            만족도
          </Text>
          <Text className="font-[Inter-SemiBold] text-[#0094FF]" size={15}>
            {
              SATISFACTION_OPTION[item?.satisfaction ?? "VERYSATISFACTION"]
                .label
            }
          </Text>
        </View>

        <View className="pt-[10] pb-[26] border-b border-b-[#EFEFEF]">
          <Text className="text-[#9F9F9F] pb-[40]" size={12}>
            진행상황
          </Text>
          <HorizontalSlider progress={(item?.progress ?? 0.7) / 100} />
        </View>

        <View className="pt-[10] pb-[37]">
          <Text className="text-[#9F9F9F] pb-[10]" size={12}>
            회고 내용
          </Text>
          <View
            className="bg-[#F1F1F1] h-[242] py-[12] px-[19]"
            style={{ borderRadius: 7 }}
          >
            <Text
              className="font-[Inter-Medium] text-[#373737] leading-6"
              size={13}
            >
              {item?.impression ??
                `오늘 공부에서 가장 인상 깊었던 부분은 바로 0000가 00000했다는 점이다. 0000한 부분이 되게 신기했고, 0000한 부분을 집중적으로 공부해 보아야 겠다고 생각했다.`}
            </Text>
            <View className="bg-[#E0DDDD] h-[1] my-[13]" />
            <Text
              className="font-[Inter-Medium] text-[#373737] leading-6"
              size={13}
            >
              {item?.bearInMind ??
                `오늘 공부에서 가장 인상 깊었던 부분은 바로 0000가 00000했다는 점이다. 0000한 부분이 되게 신기했고, 0000한 부분을 집중적으로 공부해 보아야 겠다고 생각했다.`}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
