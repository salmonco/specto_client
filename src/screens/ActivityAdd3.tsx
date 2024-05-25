import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityAddScreenStackParamList } from "@stackNav/ActivityAddScreen";
import getEnvVars from "environment";

type ActivityProps = NativeStackScreenProps<
  ActivityAddScreenStackParamList,
  "ActivityAdd3"
>;

function ActivityAdd3({ route, navigation }: Readonly<ActivityProps>) {
  const { name, host, startDate, endDate, field, contents, proofFile } =
    route.params || {};
  const [motivation, setMotivation] = useState<string | null>(null);
  const [goal, setGoal] = useState<string | null>(null);
  const [direction, setDirection] = useState<string | null>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const handleNext = useCallback(async () => {
    const formData = new FormData();

    enum ActivityCategory {
      ACTIVITY = "ACTIVITY",
      CERTIFICATION = "CERTIFICATION",
      CONTEST = "CONTEST",
      INTERNSHIP = "INTERNSHIP",
      PROJECT = "PROJECT",
    }

    if (proofFile) {
      const response = await fetch(proofFile);
      const blob = await response.blob();
      formData.append("documentation", blob);
    }

    const value = {
      name: name || "기본 이름",
      category: ActivityCategory.ACTIVITY,
      startDate: startDate || "2024-03-06",
      endDate: endDate || "2024-03-06",
      contents: contents || "기본 내용",
      detail: {
        host: host || "기본 주최자",
        field: field || "IDEATION",
        motivation: motivation || "기본 동기",
        goal: goal || "기본 목표",
        direction: direction || "기본 목표",
      },
    };

    console.log(value);

    const blob = new Blob([JSON.stringify(value)], {
      type: "application/json",
    });
    formData.append("specPostReq", blob);

    console.log("블랍:", blob);
    console.log("폼데이터:", formData);

    try {
      // await axiosInstance.post(`/api/v1/spec`, formData, {
      //   headers: {
      //     // "Content-Type": "multipart/form-data; boundary='boundary'",
      //     "Content-Type": "multipart/form-data",
      //   },
      //   transformRequest: (data, headers) => {
      //     return data;
      //   },
      // });
      await fetch(`${getEnvVars()?.apiUrl}/api/v1/spec`, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigation.navigate("SpecAddComplete", { name });
    } catch (error) {
      console.error("Error 응애:", error);
      Alert.alert(
        "양식을 제출하는 동안 오류가 발생했습니다. 다시 시도해 주세요."
      );
    }
  }, [
    name,
    host,
    startDate,
    endDate,
    field,
    contents,
    motivation,
    goal,
    direction,
    proofFile,
    navigation,
  ]);

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.pageIndicator}>
          <Text style={styles.currentPage}>3</Text>
          <Text style={styles.totalPages}>/3</Text>
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { marginTop: 45 }]}>
            해당 활동의 세부 정보를 입력해주세요.
          </Text>
        </View>

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
    height: 50,
  },
  nextButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});

export default ActivityAdd3;
