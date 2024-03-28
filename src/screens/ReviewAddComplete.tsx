import React from "react";
import { SafeAreaView, View } from "react-native";
import { CustomText as Text } from "@components/CustomText";
import Tack from "@assets/images/tack.svg";
import Button from "@components/Button";

function ReviewAddComplete() {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 justify-between py-[26] pb-[44] px-[20]">
        <Text
          className="font-[Inter-Medium] text-[#373737] text-center"
          size={13}
        >
          2024.03.28
        </Text>
        <View className="items-center">
          <Tack />
          <Text className="font-[Inter-Medium] text-[#373737] text-center mt-[40]">
            회고가 저장되었어요.{"\n"}오늘도 수고 많으셨습니다 :{")"}
          </Text>
        </View>
        <Button
          label="홈으로"
          callbackFn={() => console.log("홈으로 이동 버튼을 눌렀습니다.")}
        />
      </View>
    </SafeAreaView>
  );
}

export default ReviewAddComplete;
