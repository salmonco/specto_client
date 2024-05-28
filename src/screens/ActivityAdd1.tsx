import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityAddScreenStackParamList } from "@stackNav/ActivityAddScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const API_URL = "/api/v1/spec"; // baseURL을 이미 axiosInstance에서 설정했으므로 상대 경로만 사용

type ContestProps = NativeStackScreenProps<
  ActivityAddScreenStackParamList,
  "ActivityAdd1"
>;

function ActivityAdd1({ navigation }: Readonly<ContestProps>) {
  const [name, setName] = useState(""); // 활동명 상태 생성

  const handleNext = () => {
    // ActivityAdd2로 이동하면서 name 값을 전달
    console.log("ActivityAdd1 -> ActivityAdd2", { name });
    navigation.navigate("ActivityAdd2", { name });
  };

  return (
    <View style={styles.container}>
      <View style={styles.pageIndicator}>
        <Text style={styles.currentPage}>1</Text>
        <Text style={styles.totalPages}>/3</Text>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>어떤 대외활동인가요?</Text>
      </View>
      <View style={styles.inputBox}>
        <Text style={styles.inputLabel}>활동명</Text>
        <TextInput
          style={styles.inputText}
          placeholder="활동 이름을 입력해주세요."
          onChangeText={(text) => setName(text)} // name 값 업데이트
        />
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleNext}>
        <Text style={styles.buttonText}>다음으로</Text>
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
  },
  questionContainer: {
    position: "absolute",
    top: 50,
    left: 32,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  question: {
    color: "#373737",
    fontSize: 18,
    fontWeight: "600",
  },
  inputBox: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    position: "absolute",
    top: 90,
    left: 30,
    alignItems: "center",
    width: "85%",
  },
  inputLabel: {
    alignSelf: "stretch",
    color: "#9F9F9F",
    fontSize: 10,
    fontWeight: "400",
  },
  inputText: {
    marginTop: 5,
    alignSelf: "stretch",
    color: "#C1C1C1",
    fontSize: 16,
    fontWeight: "400",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 10,
    backgroundColor: "#0094FF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: 50, // 높이 조절
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 22,
  },
  pageIndicator: {
    position: "absolute",
    top: 20,
    right: 30,
    flexDirection: "row",
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
});

export default ActivityAdd1;
