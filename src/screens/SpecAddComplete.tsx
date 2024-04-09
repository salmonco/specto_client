import React, { useState } from "react";
import { SafeAreaView, View, TextInput } from "react-native";
import { CustomText as Text } from "@components/CustomText";
import Tack from "@assets/images/tack.svg";
import Button from "@components/Button";

function SpecAddComplete() {
  const [name, setName] = useState(""); // name 변수 선언 및 초기화

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 justify-between py-[26] pb-[44] px-[20]">
        <Text
          className="font-[Inter-Medium] text-[#373737] text-center"
          size={13}
        >
          {" "}
        </Text>
        <View className="items-center">
          <Tack />
          <Text className="font-[Inter-Medium] text-[#373737] text-center mt-[40]">
            {name ? `${name}\n` : ""}등록이 완료되었습니다!{" "}
            {/* name 변수 삽입 */}
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

export default SpecAddComplete;
