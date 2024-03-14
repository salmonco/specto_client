import React, { useEffect, useState } from "react";
import { FlatList, Pressable, View } from "react-native";
import { CustomText as Text } from "@components/CustomText";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SpecScreenStackParamList } from "@stackNav/SpecScreen";
import Button from "@components/Button";
import Contest from "@assets/images/contest.svg";
import Certificate from "@assets/images/certificate.svg";
import Intern from "@assets/images/intern.svg";
import Project from "@assets/images/project.svg";
import AddIcon from "@assets/images/add-blue.svg";

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

  const CATEGORY_LABEL: { [key: string]: string } = {
    all: "전체",
    contest: "공모전",
    certificate: "자격증",
    intern: "인턴",
    activity: "대외활동",
    project: "논문/프로젝트",
  };
  const MENU = Object.entries(CATEGORY_LABEL).map(([k, v]) => {
    return { category: k, label: v };
  });
  interface SpecBase {
    id: number;
    name: string;
    category: string;
    startDate: string;
    endDate: string;
    completed: boolean;
  }
  const specData = [
    {
      id: 1,
      name: "정보처리기사",
      category: "certificate",
      startDate: "2024-03-06",
      endDate: "2024-04-10",
      completed: false,
    },
    {
      id: 2,
      name: "SolidIT 현장실습",
      category: "intern",
      startDate: "2024-02-01",
      endDate: "2024-05-31",
      completed: false,
    },
    {
      id: 3,
      name: "ADSP",
      category: "contest",
      startDate: "2024-02-01",
      endDate: "2024-05-31",
      completed: true,
    },
    {
      id: 4,
      name: "어쩌구 논문",
      category: "project",
      startDate: "2024-02-01",
      endDate: "2024-05-31",
      completed: false,
    },
    {
      id: 5,
      name: "저쩌구 논문",
      category: "project",
      startDate: "2024-02-01",
      endDate: "2024-05-31",
      completed: true,
    },
    {
      id: 6,
      name: "저쩌구 논문",
      category: "project",
      startDate: "2024-02-01",
      endDate: "2024-05-31",
      completed: true,
    },
    {
      id: 7,
      name: "저쩌구 논문",
      category: "project",
      startDate: "2024-02-01",
      endDate: "2024-05-31",
      completed: true,
    },
  ];
  const [clickedCategory, setClickedCategory] = useState("all");
  const [specList, setSpecList] = useState(specData);

  const renderIcon = (category: string) => {
    switch (category) {
      case "contest":
        return <Contest />;
      case "certificate":
        return <Certificate />;
      case "intern":
        return <Intern />;
      case "project":
        return <Project />;
    }
  };
  const renderItem = ({ item }: { item: Readonly<SpecBase> }) => {
    return (
      <Pressable
        key={item.id}
        className="flex-1 flex-row justify-between items-center gap-[10] border border-[#DEDEDE] p-[16] h-[78] mx-[14] my-[1]"
        style={{ borderRadius: 10 }}
        onPress={() => console.log(`${item.id}번 스펙을 클릭했습니다.`)}
      >
        <View>
          <View className="flex-row gap-[10] items-center">
            {renderIcon(item.category)}
            <View className="flex-col justify-between">
              <View className="flex-row gap-[7.8] justify-start items-center">
                <Text className="font-[Inter-SemiBold] h-full" size={18}>
                  {item.name}
                </Text>
                <Text className="text-[#AEAEB2]" size={10}>
                  {CATEGORY_LABEL[item.category]}
                </Text>
              </View>
              <Text className="text-[#636366]" size={12}>
                {item.startDate} ~ {item.endDate}
              </Text>
            </View>
          </View>
        </View>
        <View
          className={`justify-center items-center w-[55] h-[22] ${
            item.completed ? "bg-[#EAF4FF]" : "bg-[#EFEFEF]"
          }`}
          style={{ borderRadius: 4 }}
        >
          <Text
            className={`font-[Inter-SemiBold] ${
              item.completed ? "text-[#0069CF]" : "text-[#9F9F9F]"
            }`}
            size={12}
          >
            {item.completed ? "완료" : "진행중"}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View className="flex-1 relative">
      <View className="flex-row justify-between gap-[8] py-[23] px-[20] border-b border-b-[#ECEBEB]">
        {MENU.map((v) => (
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
