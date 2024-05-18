import React, { useState, useEffect } from "react";
import CalendarPicker from "react-native-calendar-picker";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Keyboard,
  Modal,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityAddScreenStackParamList } from "@stackNav/ActivityAddScreen";
import { Dropdown } from "react-native-element-dropdown";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import axiosInstance from "src/api/axiosInstance";

const data = [
  { label: "기획/아이디어", value: "기획/아이디어" },
  { label: "브랜드/네이밍", value: "브랜드/네이밍" },
  { label: "사진/영상", value: "사진/영상" },
  { label: "디자인", value: "디자인" },
  { label: "예체능", value: "예체능" },
  { label: "IT/SW", value: "IT/SW" },
];

type ActivityProps = NativeStackScreenProps<
  ActivityAddScreenStackParamList,
  "ActivityAdd3"
>;

function ActivityAdd3({ route, navigation }: Readonly<ActivityProps>) {
  const [motivation, setMotivation] = useState<string | null>(null);
  const [goal, setGoal] = useState<string | null>(null);
  const [direction, setDirection] = useState<string | null>(null);
  const [files, setFiles] = useState<any[]>([]); // assuming you have a state to hold uploaded files
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const { name, host, startDate, endDate, field, contents, proofFile } =
    route.params;

  const handleNext = async () => {
    try {
      const formData = new FormData();

      formData.append("documentation", files[0]); // assuming files[0] contains the uploaded file

      const value = [
        {
          name: "얼렁뚱땅 대외활동",
          host: "주최자",
          startDate: "시작 날짜",
          endDate: "종료 날짜",
          field: "피일드",
          contents: "이건 뭐지",
          motivation: "돈 벌려고 하는 거지",
          goal: "목표는 없어",
          direction: "방향은 없어",
        },
      ];

      const blob = new Blob([JSON.stringify(value)], {
        type: "application/json",
      });

      formData.append("specPostReq", JSON.stringify(value));

      const res = await axiosInstance.post(`/api/v1/spec`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res);

      navigation.navigate("SpecAddComplete", { name });
    } catch (error) {
      console.error("Error:", error as Error);
    }
  };

  return (
    <View style={styles.container}>
      {/* 대외활동 정보 입력 */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* 페이지 인디케이터 */}
        <View style={styles.pageIndicator}>
          <Text style={styles.currentPage}>3</Text>
          <Text style={styles.totalPages}>/3</Text>
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { marginTop: 45 }]}>
            해당 활동의 세부 정보를 입력해주세요.
          </Text>
        </View>

        {/* 섹션 1: 대외활동 배경 입력 */}
        <View style={styles.section}>
          <Text style={styles.sectionSubtitle}>활동 배경을 입력해주세요.</Text>
          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>활동 배경</Text>
            <TextInput
              style={styles.inputText}
              placeholder="활동 배경을 입력해주세요."
              value={motivation || ""}
              onChangeText={(text) => setMotivation(text)}
            />
          </View>
        </View>

        {/* 섹션 2: 대외활동 목표 입력 */}
        <View style={styles.section}>
          <Text style={styles.sectionSubtitle}>활동 목표를 입력해주세요.</Text>
          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>활동 목표</Text>
            <TextInput
              style={styles.inputText}
              placeholder="활동 목표를 입력해주세요."
              value={goal || ""}
              onChangeText={(text) => setGoal(text)}
            />
          </View>
        </View>

        {/* 섹션 3: 대외활동 방향성 */}
        <View style={styles.section}>
          <Text style={styles.sectionSubtitle}>
            추구하는 활동 방향성을 입력해주세요.
          </Text>
          <View style={[styles.inputBox, { marginBottom: keyboardHeight }]}>
            <Text style={styles.inputLabel}>활동 방향성</Text>
            <TextInput
              style={styles.inputText}
              placeholder="추구하는 활동 방향성을 입력해주세요."
              value={direction || ""}
              onChangeText={(text) => setDirection(text)}
            />
          </View>
        </View>
      </ScrollView>

      {/* 다음으로 버튼 */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>다음으로</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFCFE",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 0,
  },
  pageIndicator: {
    flexDirection: "row",
    position: "absolute",
    top: 20,
    right: 10,
  },
  pageText: {
    color: "#0094FF",
    fontSize: 14,
    fontWeight: "600",
  },
  currentPage: {
    color: "#0094FF",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 22,
  },
  totalPages: {
    color: "black",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 22,
  },
  section: {
    width: 320,
    marginBottom: 10,
  },
  sectionTitle: {
    color: "#373737",
    fontSize: 18,
    fontWeight: "600",
  },
  sectionSubtitle: {
    color: "#373737",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 15,
  },
  datePickerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  datePicker: {
    flex: 1,
    padding: 13,
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    marginRight: 10,
  },
  datePickerLabel: {
    color: "#9F9F9F",
    fontSize: 10,
    fontWeight: "400",
  },
  datePickerText: {
    marginTop: 5,
    color: "#C1C1C1",
    fontSize: 16,
    fontWeight: "400",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },

  inputBox: {
    paddingVertical: 12,
    padding: 16,
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    width: "100%",
    marginBottom: 20,
    alignItems: "flex-start",
  },
  inputLabel: {
    color: "#9F9F9F",
    fontSize: 10,
    fontWeight: "400",
    marginBottom: 5,
  },
  inputText: {
    color: "#C1C1C1",
    fontSize: 16,
    fontWeight: "400",
  },
  nextButton: {
    position: "absolute",
    bottom: 10,
    backgroundColor: "#0094FF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    width: "90%",
    height: 50, // 높이 조절
  },
  nextButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20, // 키보드가 나타날 때 입력란이 가려지지 않도록 하기 위한 여분의 공간
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 투명한 검은 배경
  },
  calendarModal: {
    backgroundColor: "white", // 달력이 표시되는 박스 배경색
    marginHorizontal: 20, // 모달 창과 달력 사이의 여백
    borderRadius: 10, // 모달 창과 달력의 모서리를 둥글게 만듦
    paddingBottom: 20, // 하단 여백
  },
});

export default ActivityAdd3;
