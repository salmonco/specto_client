import React, { useEffect, useState } from "react";
import { Pressable, View, StyleSheet, ScrollView } from "react-native";
import { CustomText as Text } from "@components/CustomText";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SpecScreenStackParamList } from "@stackNav/SpecScreen";
import Contest from "@assets/images/contest.svg";
import Certificate from "@assets/images/certificate.svg";
import Intern from "@assets/images/intern.svg";
import Project from "@assets/images/project.svg";

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

const CATEGORY_DETAIL_MENU = {
  contest: [
    "host",
    "field",
    "awardStatus",
    "awardTitle",
    { key: "date", label: "수상일자" },
    "documentation",
  ],
  certificate: [
    "host",
    "field",
    { key: "date", label: "취득 날짜" },
    "documentation",
  ],
  intern: ["company", "work", "motivation", "goal", "project", "documentation"],
  activity: [
    "host",
    "field",
    { key: "motivation", label: "활동 배경" },
    { key: "goal", label: "활동 목표" },
    "direction",
    "documentation",
  ],
  project: [
    "host",
    "field",
    { key: "motivation", label: "활동 배경" },
    { key: "goal", label: "활동 목표" },
    "direction",
    "documentation",
  ],
};

const DETAIL_MENU: { [key: string]: string } = {
  host: "주최 기관",
  field: "분야",
  awardStatus: "수상 여부",
  awardTitle: "수상명",
  date: "수상일자",
  documentation: "증빙자료",
  company: "기업명",
  work: "직무",
  motivation: "지원 경로",
  goal: "입사 전 목표",
  project: "프로젝트 내용",
  direction: "방향성",
};

const SpecDetail = ({ route, navigation }: Readonly<SpecDetailScreenProps>) => {
  const { id, category } = route.params;
  // const [progress, setProgress] = useState("50%"); // 예시로 50%로 초기화

  useEffect(() => {
    // 스크린 옵션 설정 (헤더 우측에 "수정" 버튼 표시)
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => console.log("수정 버튼을 눌렀습니다.")}>
          <Text style={styles.headerButtonText}>수정</Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  // 자격증 정보 예시
  let specInfo: any = null;

  switch (category) {
    case "certificate":
      specInfo = {
        name: "정보처리기사",
        startDate: "2024.03.06",
        endDate: "진행중",
        completed: true,
        contents: "정보처리기사 자격증 획득",
        summary:
          "정보처리기사 자격증 획득에 대한 요약 내용을 여기에 추가합니다.",
        detail: {
          host: "한국산업인력공단",
          field: "정보기술",
          date: "2024.04.22",
          documentation: null,
        },
      };
      break;
    case "contest":
      specInfo = {
        name: "올해의 토목 구조물 공모전",
        startDate: "2024.03.06",
        endDate: "2024.03.10",
        completed: true,
        contents: "공모전 참가 및 수상",
        summary:
          "공모전 참가 및 수상 내용에 대한 요약 내용을 여기에 추가합니다.",
        detail: {
          host: "주최 기관",
          field: "기획",
          awardStatus: true,
          awardTitle: "최우수상",
          date: "2024.03.10",
          documentation: null,
        },
      };
      break;
    case "intern":
      specInfo = {
        name: "SolidIT 현장실습",
        startDate: "2024.03.06",
        endDate: "2024.03.10",
        completed: false,
        contents: "인턴 참여",
        summary: "인턴 참여 내용에 대한 요약 내용을 여기에 추가합니다.",
        detail: {
          company: "회사명",
          work: "업무 내용",
          motivation: "인턴 참여 동기",
          goal: "인턴 기간 동안의 목표",
          project: "수행한 프로젝트",
          documentation: null,
        },
      };
      break;
    case "activity":
      specInfo = {
        name: "KT Y 퓨터리스트",
        startDate: "2024.03.06",
        endDate: "2024.03.10",
        completed: true,
        contents: "활동 참여",
        summary: "활동 참여 내용에 대한 요약 내용을 여기에 추가합니다.",
        detail: {
          host: "주최 기관",
          field: "기획",
          motivation: "활동 참여 동기",
          goal: "활동 목표",
          direction: "활동 방향",
          documentation: null,
        },
      };
      break;
    case "project":
      specInfo = {
        name: "프로젝트명",
        startDate: "2024.03.06",
        endDate: "2024.03.10",
        completed: true,
        contents: "프로젝트 진행",
        summary: "프로젝트 진행 내용에 대한 요약 내용을 여기에 추가합니다.",
        detail: {
          host: "주최 기관",
          field: "기획",
          motivation: "프로젝트 시작 동기",
          goal: "프로젝트 목표",
          direction: "프로젝트 방향",
          documentation: null,
        },
      };
      break;
    default:
      break;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <View style={styles.iconContainer}>
            {category === "contest" && <Contest width={22} height={22} />}
            {category === "certificate" && (
              <Certificate width={22} height={22} />
            )}
            {category === "intern" && <Intern width={22} height={22} />}
            {category === "project" && <Project width={22} height={22} />}
            <Text style={styles.categoryText}>{CATEGORY_LABEL[category]}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <View
              style={[
                styles.statusContainer,
                {
                  backgroundColor: specInfo.completed ? "#EAF4FF" : "#EFEFEF",
                },
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  {
                    color: specInfo.completed ? "#0069CF" : "#9F9F9F",
                  },
                ]}
              >
                {specInfo.completed ? "완료" : "진행중"}
              </Text>
            </View>
            <Pressable
              style={styles.editButton}
              onPress={() => console.log("내 회고로 이동 버튼을 눌렀습니다.")}
            >
              <Text style={styles.editButtonText}>내 회고 &gt;</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.innerDetailContainer}>
            <View style={styles.detailBox}>
              <Text style={styles.detailSubTitle}>상세소개</Text>
              <Text style={styles.detailTitle}>{specInfo.name}</Text>
              <Text style={[styles.detailText, { marginBottom: 30 }]}>
                {specInfo.startDate} ~ {specInfo.endDate}
              </Text>
              {CATEGORY_DETAIL_MENU[
                category as keyof typeof CATEGORY_DETAIL_MENU
              ].map((item: string | { key: string; label: string }) => (
                <View
                  style={styles.detailRow}
                  key={typeof item === "string" ? item : item.key}
                >
                  <Text style={styles.detailLabel}>
                    {typeof item === "string" ? DETAIL_MENU[item] : item.label}
                  </Text>
                  <Text style={styles.detailText}>
                    {typeof item === "string"
                      ? specInfo.detail[item as keyof typeof specInfo.detail]
                      : specInfo.detail[
                          item.key as keyof typeof specInfo.detail
                        ]}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.summaryContainer}>
          <View style={styles.separator} />
          <View style={styles.titleContainer}>
            <Text style={styles.summaryTitle}>
              {specInfo.user}님의 {specInfo.name}
            </Text>
            <Pressable
              style={styles.createButton}
              onPress={() => console.log("생성하기 버튼을 눌렀습니다.")}
            >
              <Text style={styles.createButtonText}>생성하기</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.innerDetailContainer}>
            <View style={styles.detailBox}>
              <Text style={styles.detailSubTitle}>요약내용: </Text>
              <Text style={styles.summarycontentContainer}>
                {specInfo.summary}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerButtonText: {
    color: "#0094FF",
    fontSize: 16,
    marginRight: 15,
  },
  container: {
    flex: 1,
    marginTop: 15,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    paddingHorizontal: 15,
    marginLeft: 10,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryText: {
    marginLeft: 10,
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    color: "#0094FF",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  statusContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 55,
    height: 22,
    borderRadius: 4,
  },
  statusText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 12,
  },
  editButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0094FF",
    borderRadius: 4,
    width: 69,
    height: 22,
    marginLeft: 10,
  },
  editButtonText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 12,
    color: "#FFFFFF",
  },
  detailContainer: {
    // flex: 1,
    alignItems: "center",
    marginTop: 10,
  },
  innerDetailContainer: {
    width: "90%",
    marginTop: 10,
  },
  detailBox: {
    borderColor: "#EFEFEF",
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  detailSubTitle: {
    fontSize: 10,
    color: "#9F9F9F",
    marginBottom: 5,
  },
  detailTitle: {
    marginBottom: 5,
    fontFamily: "Inter-SemiBold",
    fontSize: 18,
  },
  detailText: {
    marginBottom: 5,
    fontFamily: "Inter-Regular",
    fontSize: 13,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 5,
  },
  detailLabel: {
    fontFamily: "Inter-Regular",
    fontSize: 13,
    marginRight: 20,
    width: 80,
    textAlign: "left",
  },
  summaryContainer: {
    marginTop: 15,
    paddingHorizontal: 15,
  },
  summarycontentContainer: { fontSize: 15 },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  summaryTitle: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
  },
  createButton: {
    backgroundColor: "#EFEFEF",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  createButtonText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 12,
    color: "#0094FF",
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFEF",
    marginTop: 15,
  },
});

export default SpecDetail;
