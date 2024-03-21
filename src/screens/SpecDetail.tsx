import React, { useEffect, useState } from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { CustomText as Text } from "@components/CustomText";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SpecScreenStackParamList } from "@stackNav/SpecScreen";
import Button from "@components/Button";
import Contest from "@assets/images/contest.svg";
import Certificate from "@assets/images/certificate.svg";
import Intern from "@assets/images/intern.svg";
import Project from "@assets/images/project.svg";
import AddIcon from "@assets/images/add-blue.svg";

type SpecDetailScreenProps = NativeStackScreenProps<
  SpecScreenStackParamList,
  "SpecDetail"
>;

const CATEGORY_LABEL: { [key: string]: string } = {
  all: "전체",
  contest: "공모전",
  certificate: "자격증",
  intern: "인턴",
  activity: "대외활동",
  project: "논문/프로젝트",
};

const renderCategoryIcon = (category: string) => {
  switch (category) {
    case "certificate":
      return <Certificate />;
    case "intern":
      return <Intern />;
    case "contest":
      return <Contest />;
    case "project":
      return <Project />;
    default:
      return null;
  }
};

const SpecDetail = ({ route, navigation }: Readonly<SpecDetailScreenProps>) => {
  const { id } = route.params; // route.params에서 id 추출

  useEffect(() => {
    // 스크린 옵션 설정 (헤더 우측에 "수정" 버튼 표시)
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => console.log("수정 버튼을 눌렀습니다.")}>
          <Text className="text-[#0094FF]">수정</Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  // 스펙 데이터 예시
  const specData = [
    {
      id: 1,
      name: "정보처리기사",
      category: "certificate",
      startDate: "2024-03-06",
      endDate: "2024-04-10",
      completed: false,
      detail: {
        title: "정보처리기사",
        date: "2024-03-06 ~ 2024-04-10",
        field: "정보기술",
        organization: "한국산업인력공단",
        deadline: "2024-04-10",
        description:
          "정보처리기사 자격증 획득에 대한 상세 설명을 여기에 추가합니다.",
      },
    },
    {
      id: 2,
      name: "SolidIT 현장실습",
      category: "intern",
      startDate: "2024-02-01",
      endDate: "2024-05-31",
      completed: false,
      detail: {
        title: "SolidIT 현장실습",
        date: "2024-02-01 ~ 2024-05-31",
        field: "소프트웨어 개발",
        organization: "SolidIT",
        deadline: "2024-05-31",
        description: "SolidIT 현장실습에 대한 상세 설명을 여기에 추가합니다.",
      },
    },
    // 나머지 스펙 데이터...
  ];

  // id로 해당 스펙 찾기
  const item = specData.find((item) => item.id === id);
  const specCompleted = item && item.completed;
  // SpecDetail 스크린 컴포넌트 렌더링
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        {/* 아이콘 및 자격증 정보 */}
        <View style={styles.iconInfoContainer}>
          {renderCategoryIcon(item?.category || "")}
          <Text style={[styles.categoryText, { marginLeft: 10 }]}>
            {CATEGORY_LABEL[item?.category || ""]}
          </Text>
        </View>
        {/* 상태 및 내 회고 버튼 */}
        <View style={styles.statusButtonContainer}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 55,
              height: 22,
              backgroundColor: specCompleted ? "#EAF4FF" : "#EFEFEF",
              borderRadius: 4,
            }}
          >
            <Text
              style={{
                fontFamily: "Inter-SemiBold",
                fontSize: 12,
                color: specCompleted ? "#0069CF" : "#9F9F9F",
              }}
            >
              {specCompleted ? "완료" : "진행중"}
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 55,
              height: 22,
              backgroundColor: "#EAF4FF",
              borderRadius: 4,
              marginLeft: 10,
            }}
          >
            <Button
              label="내 회고 >"
              callbackFn={() =>
                console.log("내 회고로 이동 버튼을 눌렀습니다.")
              }
            />
          </View>
        </View>
      </View>

      {/* 상세 소개 */}
      <View style={styles.detailContainer}>
        <Text style={styles.detailText}>상세소개</Text>
        <Text style={styles.detailTitle}>{item?.detail.title || ""}</Text>
        <Text style={styles.detailText}>날짜: {item?.detail.date || ""}</Text>
        <Text style={styles.detailText}>
          공모분야: {item?.detail.field || ""}
        </Text>
        <Text style={styles.detailText}>
          주체기관: {item?.detail.organization || ""}
        </Text>
        <Text style={styles.detailText}>
          마감기한: {item?.detail.deadline || ""}
        </Text>
        <Text style={styles.detailText}>{item?.detail.description || ""}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 15,
    // justifyContent: "center",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  iconInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 0.9,
  },
  statusButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryText: {
    borderRadius: 4,
    fontFamily: "Inter-SemiBold",
    fontWeight: "bold",
    fontSize: 16,
    color: "#0094FF",
  },
  statusText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 12,
    // color: item.completed ? "#0069CF" : "#9F9F9F",
  },
  detailContainer: {
    marginTop: 20,
  },
  detailTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  detailText: {
    marginTop: 5,
  },
});

export default SpecDetail;
