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
  "ActivityAdd2"
>;

function ActivityAdd2({ route, navigation }: Readonly<ActivityProps>) {
  const [host, setHost] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isStartDatePickerVisible, setIsStartDatePickerVisible] =
    useState(false);
  const [isEndDatePickerVisible, setIsEndDatePickerVisible] = useState(false);
  const [field, setField] = useState("");
  const [contents, setContents] = useState<string | null>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [proofFile, setProofFile] = useState<string | null>(null);

  const { name } = route.params;

  const handleNext = () => {
    navigation.navigate("ActivityAdd3", {
      name,
      host,
      startDate,
      endDate,
      field,
      contents,
      proofFile,
    });
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        setKeyboardHeight(event.endCoordinates.height);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      }
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const formatDate = (date: Date | null): string => {
    if (!date) return "날짜 선택";
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}월 ${day}일`;
  };

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    console.log(result);
    alert(result);
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
          <Text style={styles.currentPage}>2</Text>
          <Text style={styles.totalPages}>/3</Text>
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { marginTop: 45 }]}>
            해당 활동의 정보를 입력해주세요.
          </Text>
        </View>
        {/* 섹션 1: 대외활동 기간 */}
        <View style={styles.section}>
          <Text style={[styles.sectionSubtitle, { marginTop: 10 }]}>
            활동 시작/종료 날짜을 선택해주세요.
          </Text>
          <View style={styles.datePickerRow}>
            <TouchableOpacity
              onPress={() => setIsStartDatePickerVisible(true)}
              style={styles.datePicker}
            >
              <Text style={styles.datePickerLabel}>시작날짜:</Text>
              <Text style={styles.datePickerText}>{formatDate(startDate)}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsEndDatePickerVisible(true)}
              style={styles.datePicker}
            >
              <Text style={styles.datePickerLabel}>종료날짜:</Text>
              <Text style={styles.datePickerText}>{formatDate(endDate)}</Text>
            </TouchableOpacity>
          </View>
          <Modal
            visible={isStartDatePickerVisible || isEndDatePickerVisible}
            animationType="slide"
            transparent={true}
          >
            <View style={styles.modalContainer}>
              <TouchableOpacity
                style={styles.modalBackground}
                onPress={() => {
                  setIsStartDatePickerVisible(false);
                  setIsEndDatePickerVisible(false);
                }}
              />
              <View style={styles.calendarModal}>
                <CalendarPicker
                  onDateChange={(date) => {
                    if (isStartDatePickerVisible) {
                      setStartDate(date);
                      setIsStartDatePickerVisible(false);
                    } else if (isEndDatePickerVisible) {
                      setEndDate(date);
                      setIsEndDatePickerVisible(false);
                    }
                  }}
                />
              </View>
            </View>
          </Modal>
        </View>

        {/* 섹션 2: 대외활동 이름 및 주최기관 입력 */}
        <View style={styles.section}>
          <Text style={styles.sectionSubtitle}>
            활동 주최기관을 입력해주세요.
          </Text>
          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>주최기관</Text>
            <TextInput
              style={styles.inputText}
              placeholder="주최기관을 입력해주세요."
              value={host}
              onChangeText={(text) => setHost(text)}
            />
          </View>
        </View>

        {/* 섹션 3: 대외활동 분야 선택 */}
        <View style={styles.section}>
          <Text style={[styles.sectionSubtitle, { marginTop: 0 }]}>
            활동 분야를 선택해주세요
          </Text>
          <View style={{ ...styles.inputBox, paddingVertical: 5 }}>
            <Text style={{ ...styles.inputLabel, marginTop: 7 }}>분야</Text>
            <Dropdown
              style={{ width: "100%" }}
              placeholderStyle={styles.inputText}
              selectedTextStyle={[styles.inputText, { color: "#373737" }]}
              data={data}
              labelField="label"
              valueField="value"
              placeholder={"분야를 선택해주세요."}
              value={field}
              onChange={(item) => setField(item.value)}
            />
          </View>
        </View>

        {/* 섹션 4: 상세 내역 입력 */}
        <View style={styles.section}>
          <Text style={styles.sectionSubtitle}>
            상세 활동 내역을 입력해주세요.
          </Text>
          <View
            style={[
              styles.inputBox,
              { marginBottom: keyboardHeight }, // 키보드 높이만큼 입력 박스를 올림
            ]}
          >
            <Text style={styles.inputLabel}>상세정보</Text>
            <TextInput
              style={styles.inputText}
              placeholder="상세정보를 입력해주세요."
              multiline={true}
              numberOfLines={4}
              value={contents || ""}
              onChangeText={(text) => setContents(text)} // contents 상태 업데이트
            />
          </View>

          {/* 섹션 5: 증빙자료 업로드 */}
          <View style={styles.section}>
            <Text style={[styles.sectionSubtitle, { marginTop: 25 }]}>
              증빙자료를 업로드해주세요.
            </Text>
            <TouchableOpacity
              style={[styles.inputBox, { width: 110 }]}
              onPress={pickDocument}
            >
              <View>
                <Text style={styles.inputText}>파일 업로드</Text>
              </View>
            </TouchableOpacity>
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

export default ActivityAdd2;
