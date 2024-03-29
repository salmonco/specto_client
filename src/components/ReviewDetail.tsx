import React from "react";
import { CustomText as Text } from "@components/CustomText";
import { Pressable, SafeAreaView, View } from "react-native";
import Close from "@assets/images/close.svg";
import HorizontalSlider from "./HorizontalSlider";

export default function ReviewDetail() {
  const progress = 0.7;

  return (
    <SafeAreaView>
      <View className="pt-[20] pb-[37] px-[34]">
        <View className="flex-row justify-between items-center pb-[10] border-b border-b-[#EFEFEF]">
          <Text className="text-[#636366]" size={13}>
            2024.03.28
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
            <Close />
          </View>
        </View>

        <View className="flex-row justify-between py-[24] pb-[30]">
          <View className="flex-row items-center">
            <Text
              className="font-[Inter-SemiBold] text-[#1C1C1E] mr-[10]"
              size={18}
            >
              정보처리기사
            </Text>
            <Text className="text-[#AEAEB2]" size={10}>
              자격증
            </Text>
          </View>
          <Text className="font-[Inter-Medium] text-[#0094FF]" size={18}>
            D+{"16"}
          </Text>
        </View>

        <View className="flex-row items-center pb-[24] border-b border-b-[#EFEFEF]">
          <Text className="text-[#9F9F9F] mr-[165]" size={12}>
            만족도
          </Text>
          <Text className="font-[Inter-SemiBold] text-[#0094FF]" size={15}>
            매우만족
          </Text>
        </View>

        <View className="pt-[10] pb-[26] border-b border-b-[#EFEFEF]">
          <Text className="text-[#9F9F9F] pb-[40]" size={12}>
            진행상황
          </Text>
          <HorizontalSlider progress={progress} />
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
              오늘 공부에서 가장 인상 깊었던 부분은 바로 0000가 00000했다는
              점이다. 0000한 부분이 되게 신기했고, 0000한 부분을 집중적으로
              공부해 보아야 겠다고 생각했다.
            </Text>
            <View className="bg-[#E0DDDD] h-[1] my-[13]" />
            <Text
              className="font-[Inter-Medium] text-[#373737] leading-6"
              size={13}
            >
              오늘 공부에서 가장 인상 깊었던 부분은 바로 0000가 00000했다는
              점이다. 0000한 부분이 되게 신기했고, 0000한 부분을 집중적으로
              공부해 보아야 겠다고 생각했다.
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
