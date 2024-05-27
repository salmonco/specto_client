import React, { useEffect, useState } from "react";
import {
  Pressable,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { CustomText as Text } from "@components/CustomText";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SpecScreenStackParamList } from "@stackNav/SpecScreen";
import { LineChart } from "react-native-chart-kit";
import { Text as TextSVG } from "react-native-svg";
import { Circle } from "react-native-svg";
import { CATEGORY_LABEL, renderSpecIcon } from "./Spec";
import axiosInstance from "src/api/axiosInstance";

const screenWidth = Dimensions.get("window").width;

type SpecDetailScreenProps = NativeStackScreenProps<
  SpecScreenStackParamList,
  "SpecDetail"
>;
const chartConfig = {
  backgroundGradientFrom: "white",
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: "white",
  backgroundGradientToOpacity: 1,
  fillShadowGradientFromOpacity: 0,
  fillShadowGradientToOpacity: 0,
  // useShadowColorFromDataset: false,
  color: (opacity = 1) => `rgba(55, 55, 55, ${opacity})`,
  strokeWidth: 5,
  barPercentage: 0.5,
  propsForVerticalLabels: {
    fontSize: 11,
    fontWeight: "500",
    color: "#7B7B7B",
  },
  // propsForDots: {
  //   r: "6", // 점의 반지름 설정
  //   strokeWidth: "3", // 점의 테두리 두께 설정
  //   stroke: "#0094FF", // 점의 테두리 색상 설정
  //   fill: "white", // 점의 내부 색상 설정
  // },
};
const data = {
  labels: ["1월 첫째주", "1월 둘째주", "1월 셋째주", "1월 넷째주"],
  datasets: [
    {
      data: [20, 50, 80, 100], // data -> progress로 바꾸고 싶어
      color: (opacity = 1) => `rgba(224, 224, 224, ${opacity})`,
      strokeWidth: 3,
    },
  ],
};
export const CATEGORY_DETAIL_MENU = {
  CONTEST: [
    "host",
    "field",
    "awardStatus",
    "awardTitle",
    { key: "date", label: "수상일자" },
    "documentation",
  ],
  CERTIFICATION: [
    "host",
    "field",
    { key: "date", label: "취득 날짜" },
    "documentation",
  ],
  INTERNSHIP: [
    "company",
    "work",
    "motivation",
    "goal",
    "project",
    "documentation",
  ],
  ACTIVITY: [
    "host",
    "field",
    { key: "motivation", label: "활동 배경" },
    { key: "goal", label: "활동 목표" },
    "direction",
    "documentation",
  ],
  PROJECT: [
    "host",
    "field",
    { key: "motivation", label: "활동 배경" },
    { key: "goal", label: "활동 목표" },
    "direction",
    "documentation",
  ],
};
export const DETAIL_MENU: { [key: string]: string } = {
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
export interface SpecDetailDetailBase {
  host: string;
  field: string;
  awardStatus: boolean;
  awardTitle: string;
  date: string;
  documentation: string;
  company: string;
  work: string;
  motivation: string;
  goal: string;
  project: string;
  direction: string;
}
export interface SpecDetailBase {
  name: string;
  category: string;
  startDate: string;
  endDate: string;
  completed: boolean;
  contents: string;
  summary: string;
  detail: SpecDetailDetailBase;
}
const SpecDetail = ({ route, navigation }: Readonly<SpecDetailScreenProps>) => {
  const { id, category } = route.params;
  // TODO: id로 스펙 상세조회
  // const [progress, setProgress] = useState("50%"); // 예시로 50%로 초기화
  //const [specInfo, setSpecInfo] = useState<any>(null);
  const [specInfo, setSpecInfo] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  const handleEditPress = () => {
    // Navigate to the appropriate category screen based on the 'category' parameter
    switch (category) {
      case "CONTEST":
        navigation.navigate("ContestAddScreen");
        break;
      case "CERTIFICATION":
        navigation.navigate("CertificateAddScreen");
        break;
      case "INTERNSHIP":
        navigation.navigate("InternAddScreen");
        break;
      case "ACTIVITY":
        navigation.navigate("ActivityAddScreen");
        break;
      // Add cases for other categories as needed
      default:
        // Navigate to a default screen if the category is not recognized
        navigation.navigate("Spec");
        break;
    }
  };

  useEffect(() => {
    // 스크린 옵션 설정 (헤더 우측에 "수정" 버튼 표시)
    navigation.setOptions({
      headerRight: () => (
        // <Pressable onPress={() => console.log("수정 버튼을 눌렀습니다.")}>
        //   <Text className="text-[#0094FF]">수정</Text>
        // </Pressable>
        <Pressable style={styles.editButton} onPress={handleEditPress}>
          <Text style={styles.editButtonText}>수정</Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const fetchSpecDetail = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/spec/${id}`);
        setSpecInfo(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching spec detail:", error);
        setLoading(false);
      }
    };
    fetchSpecDetail();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <View style={styles.iconContainer}>
            {renderSpecIcon(category)}
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
              onPress={() =>
                navigation.navigate("ReviewListScreen", {
                  screen: "ReviewListUp",
                  params: { specItem: { ...specInfo, specId: id } },
                })
              }
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
                category.toUpperCase() as keyof typeof CATEGORY_DETAIL_MENU
              ].map((item: string | { key: string; label: string }) => (
                <View style={styles.detailRow} key={`${Math.random()}`}>
                  <Text style={styles.detailLabel}>
                    {typeof item === "string" ? DETAIL_MENU[item] : item.label}
                  </Text>
                  <Text style={styles.detailText}>
                    {typeof item === "string"
                      ? specInfo.detail && specInfo.detail[item]
                      : specInfo.detail && specInfo.detail[item.key]}
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
          <Text
            style={{
              width: "100%",
              color: "#373737",
              fontSize: 16,
              fontFamily: "Inter-SemiBold",
              fontWeight: "600",
              paddingTop: 40,
              marginLeft: 45,
            }}
          >
            진행상황 히스토리
          </Text>
          <View style={[styles.group, { paddingHorizontal: 0 }]}>
            <LineChart
              data={data}
              width={screenWidth}
              height={200}
              chartConfig={chartConfig}
              withVerticalLines={false}
              withHorizontalLabels={false}
              fromZero={true}
              renderDotContent={({ x, y, index }) => {
                const dataValue = data.datasets[0].data[index];
                let dotColor = "#FFFFFF";
                let strokeColor = "#0094FF";
                if (dataValue <= 50) {
                  dotColor = "#FFFFFF";
                  strokeColor = "#FF0909";
                }
                return (
                  <React.Fragment>
                    <Circle
                      key={`circle-${Math.random()}`}
                      cx={x}
                      cy={y}
                      r={6}
                      stroke={strokeColor}
                      strokeWidth={3}
                      fill={dotColor}
                    />
                    <TextSVG
                      key={`text-${Math.random()}`}
                      x={x}
                      y={y + 20}
                      fill="#7B7B7B"
                      fontSize="11"
                      fontWeight="normal"
                      textAnchor="middle"
                    >
                      {data.datasets[0].data[index]}%
                    </TextSVG>
                  </React.Fragment>
                );
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  group: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
    marginRight: 90,
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
