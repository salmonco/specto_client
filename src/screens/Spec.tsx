import React, { useEffect, useState } from "react";
import { FlatList, Pressable, View } from "react-native";
import { CustomText as Text } from "@components/CustomText";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SpecScreenStackParamList } from "@stackNav/SpecScreen";
import Button from "@components/Button";
import AddIcon from "@assets/images/add-blue.svg";
import SpecListItem, {
  SPEC_DATA,
  SPEC_MENU,
  SpecBase,
} from "@components/SpecListItem";

type SpecScreenProps = NativeStackScreenProps<SpecScreenStackParamList, "Spec">;

function Spec({ navigation }: Readonly<SpecScreenProps>) {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => console.log("우측 버튼을 눌렀습니다.")}>
          <Text className="text-[#0094FF]">클릭</Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  const [clickedCategory, setClickedCategory] = useState("all");
  const [specList, setSpecList] = useState(SPEC_DATA);

  const renderItem = ({ item }: { item: SpecBase }) => {
    return <SpecListItem item={item} />;
  };

  return (
    <View className="flex-1 relative">
      <View className="flex-row justify-between gap-[8] py-[23] px-[20] border-b border-b-[#ECEBEB]">
        {SPEC_MENU.map((v) => (
          <Pressable
            className={`w-[52] h-[38] justify-center items-center ${
              v.category === clickedCategory ? "bg-[#0094FF]" : "bg-[#EAF4FF]"
            }`}
            style={{ borderRadius: 4 }}
            key={v.category}
            onPress={() => setClickedCategory(v.category)}
          >
            <Text
              className={`font-[Inter-Medium] text-center ${
                v.category === clickedCategory ? "text-white" : "text-[#0094FF]"
              }`}
              size={12}
            >
              {v.label}
            </Text>
          </Pressable>
        ))}
      </View>
      <FlatList
        contentContainerStyle={{
          gap: 15,
          paddingVertical: 20,
          paddingHorizontal: 20,
        }}
        data={specList}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Button
            label="스펙 추가하기"
            callbackFn={() => console.log("스펙 추가 버튼을 눌렀습니다.")}
          />
        }
      />
      <Pressable
        className="absolute right-[22] bottom-[22]"
        onPress={() => console.log("스펙 추가 버튼을 눌렀습니다.")}
      >
        <AddIcon />
      </Pressable>
    </View>
  );
}

export default Spec;
