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
import SpecCategorySelect from "@screens/SpecCategorySelect";
import axiosInstance from "src/api/axiosInstance";

type SpecScreenProps = NativeStackScreenProps<SpecScreenStackParamList, "Spec">;

export const CATEGORY_LABEL: { [key: string]: string } = {
  ALL: "전체",
  CONTEST: "공모전",
  CERTIFICATION: "자격증",
  INTERNSHIP: "인턴",
  ACTIVITY: "대외활동",
  PROJECT: "논문/프로젝트",
};
export const SPEC_MENU = Object.entries(CATEGORY_LABEL).map(([k, v]) => {
  return { category: k, label: v };
});
export interface SpecBase {
  specId: number;
  name: string;
  category: string;
  startDate: string;
  endDate: string;
  completed: boolean;
}
export const SPEC_DATA = [
  {
    specId: 1,
    name: "정보처리기사",
    category: "certificate",
    startDate: "2024-03-06",
    endDate: "2024-04-10",
    completed: false,
  },
  {
    specId: 2,
    name: "SolidIT 현장실습",
    category: "intern",
    startDate: "2024-02-01",
    endDate: "2024-05-31",
    completed: false,
  },
  {
    specId: 3,
    name: "ADSP",
    category: "contest",
    startDate: "2024-02-01",
    endDate: "2024-05-31",
    completed: true,
  },
  {
    specId: 4,
    name: "어쩌구 논문",
    category: "project",
    startDate: "2024-02-01",
    endDate: "2024-05-31",
    completed: false,
  },
  {
    specId: 5,
    name: "KT Y 퓨터리스트",
    category: "activity",
    startDate: "2024-02-01",
    endDate: "2024-05-31",
    completed: true,
  },
  {
    specId: 6,
    name: "저쩌구 논문",
    category: "project",
    startDate: "2024-02-01",
    endDate: "2024-05-31",
    completed: true,
  },
  {
    specId: 7,
    name: "저쩌구 논문",
    category: "project",
    startDate: "2024-02-01",
    endDate: "2024-05-31",
    completed: true,
  },
];

export const renderSpecIcon = (category: string) => {
  switch (category) {
    case "CONTEST":
      return <Contest />;
    case "CERTIFICATION":
      return <Certificate />;
    case "INTERNSHIP":
      return <Intern />;
    case "ACTIVITY":
      return <Project />; // TODO: 아이콘 교체
    case "PROJECT":
      return <Project />;
  }
};

function Spec({ navigation }: Readonly<SpecScreenProps>) {
  const [clickedCategory, setClickedCategory] = useState(SPEC_MENU[0].category);
  const [specList, setSpecList] = useState(SPEC_DATA);
  const [isCategorySelectOpen, setIsCategorySelectOpen] = React.useState(false); // 스펙 추가하기 레이어 팝업

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

  // 각 스펙 클릭 이벤트 핸들러
  const handleSpecClick = (id: number, category: string) => {
    console.log(`스펙 ID ${id}를 클릭 - 개별 페이지로 이동.`);
    // SpecDetail 스크린으로 이동하면서 category, id 전달
    navigation.navigate("SpecDetail", { id, category });
  };

  useEffect(() => {
    const getSpecList = async () => {
      try {
        const res = await axiosInstance.get(
          `/api/v1/spec?category=${
            clickedCategory === "ALL" ? "" : clickedCategory
          }`
        );
        console.log(`spec ${clickedCategory}`, res);
        setSpecList(res.data.content);
      } catch (e) {
        console.log(e);
      }
    };
    getSpecList();
  }, [clickedCategory]);

  const renderItem = ({ item }: { item: Readonly<SpecBase> }) => {
    return (
      <Pressable
        key={item.specId}
        className="flex-1 flex-row justify-between items-center gap-[10] border border-[#DEDEDE] p-[16] h-[78] mx-[14] my-[1]"
        style={{ borderRadius: 10 }}
        onPress={() => {
          console.log(`${item.specId}번 스펙을 클릭했습니다.`);
          handleSpecClick(item.specId, item.category);
        }}
      >
        <View>
          <View className="flex-row gap-[10] items-center">
            {renderSpecIcon(item.category)}
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
            onPress={() => {
              setClickedCategory(v.category);
              // navigateToSpecComponent(v.category); // 이 부분을 추가해주세요.
            }}
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
          keyExtractor={(item) => `${item.specId}`}
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
