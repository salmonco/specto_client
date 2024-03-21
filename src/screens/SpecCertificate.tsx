import React, { useEffect } from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { CustomText as Text } from "@components/CustomText";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SpecScreenStackParamList } from "@stackNav/SpecScreen";
import Certificate from "@assets/images/certificate.svg";

type SpecCertificateScreenProps = NativeStackScreenProps<
  SpecScreenStackParamList,
  "SpecCertificate"
>;

const CATEGORY_LABEL: { [key: string]: string } = {
  certificate: "자격증",
};

const SpecCertificate = ({
  route,
  navigation,
}: Readonly<SpecCertificateScreenProps>) => {
  const { id } = route.params;

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
  const certificateInfo = {
    id: 1,
    // name: "정보처리기사",
    category: "certificate",
    completed: true,
    title: "정보처리기사",
    date: "2024.03.06 ~ 진행중",
    classification: "필기 + 실기", // 분류
    field: "정보기술", // 분야
    testdate: "2024.04.22", // 시험 일시
    result: "합격", // 결과
    // description:
    //   "정보처리기사 자격증 획득에 대한 상세 설명을 여기에 추가합니다.",
  };

  // SpecCertificate 스크린 컴포넌트 렌더링
  return (
    <View style={styles.container}>
      {/* 아이콘 및 자격증 정보 */}
      <View style={styles.rowContainer}>
        <View style={styles.iconInfoContainer}>
          <Certificate width={22} height={22} />
          <Text style={styles.categoryText}>{CATEGORY_LABEL.certificate}</Text>
        </View>
        {/* 상태 및 내 회고 버튼 */}
        <View style={styles.statusButtonContainer}>
          <View
            style={[
              styles.statusContainer,
              {
                backgroundColor: certificateInfo.completed
                  ? "#EAF4FF"
                  : "#EFEFEF",
              },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                {
                  color: certificateInfo.completed ? "#0069CF" : "#9F9F9F",
                },
              ]}
            >
              {certificateInfo.completed ? "완료" : "진행중"}
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

      {/* 상세 소개 */}
      <View style={styles.detailContainer}>
        <View style={styles.detailBox}>
          <Text style={{ fontSize: 10, color: "#9F9F9F", marginBottom: 5 }}>
            상세소개
          </Text>
          <Text style={[styles.detailTitle, { marginBottom: 5 }]}>
            {certificateInfo.title}
          </Text>
          <Text style={[styles.detailText, { marginBottom: 30 }]}>
            {certificateInfo.date}
          </Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>분류</Text>
            <Text style={styles.detailText}>
              {certificateInfo.classification}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>분야</Text>
            <Text style={styles.detailText}>{certificateInfo.field}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>시험 일시</Text>
            <Text style={styles.detailText}>{certificateInfo.testdate}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>결과</Text>
            <Text style={styles.detailText}>{certificateInfo.result}</Text>
          </View>
        </View>
      </View>
      <View style={styles.line}></View>
      {/* 요약 */}
      <View style={styles.descriptionContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.detailTitle}>{certificateInfo.title}</Text>
          <Pressable
            style={styles.createButton}
            onPress={() => console.log("생성하기 버튼을 눌렀습니다.")}
          >
            <Text style={styles.createButtonText}>생성하기</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 15,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // 가운데 간격을 두고 정렬
    marginBottom: 10,
    marginTop: 15,
  },
  descriptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // 가운데 간격을 두고 정렬
    marginBottom: 10,
    marginTop: 15,
  },
  iconInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: 120,
  },
  statusButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: "auto",
  },
  categoryText: {
    marginLeft: 10,
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    color: "#0094FF",
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
    width: "90%",
    marginTop: 10,
  },
  detailBox: {
    borderColor: "#EFEFEF",
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  detailTitle: {
    marginBottom: 10,
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
    alignItems: "flex-start", // 수정된 부분
    marginBottom: 5,
  },
  detailLabel: {
    fontFamily: "Inter-Regular",
    fontSize: 13,
    marginRight: 2,
    width: 80,
    textAlign: "left",
  },
  headerButtonText: {
    color: "#0094FF",
    fontSize: 16,
    marginRight: 15,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  line: {
    // flex: 1,
    height: 30,
    backgroundColor: "#EFEFEF",
    marginRight: 10,
  },
  createButton: {
    backgroundColor: "#EFEFEF",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 160,
  },
  createButtonText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 12,
    color: "#0094FF",
  },
});

export default SpecCertificate;
