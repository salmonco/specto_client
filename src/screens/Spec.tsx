import React, { useEffect, useState } from "react";
import { FlatList, Pressable, View } from "react-native";
import { CustomText as Text } from "@components/CustomText";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SpecScreenStackParamList } from "@stackNav/SpecScreen";
import Button from "@components/Button";
import AddIcon from "@assets/images/add-blue.svg";

import SpecContest from "@screens/SpecContest";
import SpecCertificate from "@screens/SpecCertificate";
import SpecIntern from "@screens/SpecIntern";
import SpecActivity from "@screens/SpecActivity";
import SpecProject from "@screens/SpecProject";

type SpecScreenProps = NativeStackScreenProps<SpecScreenStackParamList, "Spec">;

function Spec({ navigation }: Readonly<SpecScreenProps>) {
  const [isCategorySelectOpen, setIsCategorySelectOpen] = React.useState(false);

  const handleAddSpecPress = () => {
    setIsCategorySelectOpen(true);
  };

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

  const navigateToSpecComponent = (category: string, id: number) => {
    switch (category) {
      case "contest":
        navigation.navigate("SpecContest", { id });
        break;
      case "certificate":
        navigation.navigate("SpecCertificate", { id });
        break;
      case "intern":
        navigation.navigate("SpecIntern", { id });
        break;
      case "activity":
        navigation.navigate("SpecActivity", { id });
        break;
      case "project":
        navigation.navigate("SpecProject", { id });
        break;
      default:
        break;
    }
  };

  // 각 스펙 클릭 이벤트 핸들러
  const handleSpecClick = (id: number) => {
    console.log(`스펙 ID ${id}를 클릭 - 개별 페이지로 이동.`);
    // SpecDetail 스크린으로 이동하면서 id 전달
    // navigation.navigate("SpecDetail", { id });
  };

  const renderItem = ({ item }: { item: Readonly<SpecBase> }) => {
    return (
      <Pressable
        key={item.id}
        className="flex-1 flex-row justify-between items-center gap-[10] border border-[#DEDEDE] p-[16] h-[78] mx-[14] my-[1]"
        style={{ borderRadius: 10 }}
        onPress={() => {
          console.log(`${item.id}번 스펙을 클릭했습니다.`);
          // handleSpecClick(item.id);
          navigateToSpecComponent(item.category, item.id);
        }}
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
      {/* 상단 바 및 메뉴 버튼 */}
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
      {/* 스펙 목록 */}
      <View style={{ flex: 1 }}>
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
              callbackFn={() => setIsCategorySelectOpen(true)}
            />
          }
        />
        {/* 스펙 추가 버튼 */}
        <Pressable
          style={{
            position: "absolute",
            right: 22,
            bottom: 22,
          }}
          onPress={() => setIsCategorySelectOpen(true)}
        >
          <AddIcon />
        </Pressable>
        {/* 스펙 카테고리 선택 레이어 팝업 */}
        {isCategorySelectOpen && (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)", // 회색 배경
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SpecCategorySelect
              onClose={() => setIsCategorySelectOpen(false)}
              onSelectCategory={(category) => {
                setIsCategorySelectOpen(false);
                // 선택된 카테고리 처리 로직 추가
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
}

export default Spec;
