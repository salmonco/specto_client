import React, { useState } from "react";
import { FlatList, Pressable, View } from "react-native";
import { CustomText as Text } from "@components/CustomText";
import SpecListItem, {
  SPEC_DATA,
  SPEC_MENU,
  SpecBase,
} from "@components/SpecListItem";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ReviewListScreenStackParamList } from "@stackNav/ReviewListScreen";

type ReviewListScreenProps = NativeStackScreenProps<
  ReviewListScreenStackParamList,
  "ReviewList"
>;

function ReviewList({ navigation }: Readonly<ReviewListScreenProps>) {
  const [clickedCategory, setClickedCategory] = useState("all");
  const [specList, setSpecList] = useState(SPEC_DATA);

  const handleSpecClick = (id: number) => {
    console.log(`${id}번 스펙을 클릭했습니다.`);
    navigation.navigate("ReviewListUp", { id });
  };

  const renderItem = ({ item }: { item: SpecBase }) => {
    return <SpecListItem item={item} callbackFn={handleSpecClick} />;
  };

  return (
    <View className="flex-1">
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
          <View className="flex-row items-center justify-end mr-[15]">
            <Text
              className="text-[#1C1C1E] font-[Inter-Medium] mr-[5]"
              size={12}
            >
              최근 등록순
            </Text>
            <View className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-4 border-b-[#1C1C1E] rotate-180" />
          </View>
        }
      />
    </View>
  );
}

export default ReviewList;
