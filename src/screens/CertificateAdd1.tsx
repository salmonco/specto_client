import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CertificateAddScreenStackParamList } from "@stackNav/CertificateAddScreen";

type CertificateProps = NativeStackScreenProps<
  CertificateAddScreenStackParamList,
  "CertificateAdd1"
>;

function CertificateAdd1({ navigation }: Readonly<CertificateProps>) {
  const [name, setName] = useState("");

  const handleNext = () => {
    console.log("CertificateAdd1 -> CertificateAdd2", { name });
    navigation.navigate("CertificateAdd2", { name });
  };

  return (
    <View style={styles.container}>
      <View style={styles.pageIndicator}>
        <Text style={styles.currentPage}>1</Text>
        <Text style={styles.totalPages}>/3</Text>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>어떤 자격증인가요?</Text>
      </View>
      <View style={styles.inputBox}>
        <Text style={styles.inputLabel}>자격증 이름</Text>
        <TextInput
          style={styles.inputText}
          placeholder="자격증 이름을 입력해주세요."
          value={name}
          onChangeText={(text) => setName(text)}
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

export default CertificateAdd1;
