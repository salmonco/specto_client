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
import axios from "axios";

const API_URL = "http://13.210.239.98:8080/api/v1/spec";

type ContestProps = NativeStackScreenProps<
  ActivityAddScreenStackParamList,
  "ActivityAdd1"
>;

function ActivityAdd1({ navigation }: Readonly<ContestProps>) {
  const [formData, setFormData] = useState(new FormData()); // FormData 상태 생성

  const handleNext = async () => {
    try {
      console.log("Sending request to:", API_URL);

      // AsyncStorage에서 accessToken 불러오기
      // 이게 뭔데 ... 토큰이 어딨어
      const accessToken = await getAccessToken();

      const formData = new FormData();
      console.log(formData);

      const value = [
        {
          name: "대외활동하기싫어", // 입력값
        },
      ];

      const blob = new Blob([JSON.stringify(value)], {
        type: "application/json",
      });

      // formData.append("data", blob);
      formData.append("data", JSON.stringify(value));

      console.log(formData);

      const response = await axios({
        method: "POST",
        url: API_URL,
        // mode: "cors",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`, // 엑세스 토큰 추가
        },
        data: formData,
      });

      console.log(response);

      if (response.status >= 200 && response.status < 300) {
        console.log("Success");
        navigation.navigate("ActivityAdd2");
      } else {
        console.error("Failed to save activity");
      }
    } catch (error) {
      console.error("Error:", error as Error);
    }
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
          onChangeText={(text) => {
            // name 값 업데이트
            const value = [{ name: text }];
            const blob = new Blob([JSON.stringify(value)], {
              type: "application/json",
            });
            const formData = new FormData();
            formData.append("data", blob);
            setFormData(formData); // formData 상태 업데이트
          }}
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
    marginTop: 20,
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
