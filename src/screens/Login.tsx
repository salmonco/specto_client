import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";

const LoginScreen: React.FC = () => {
  const handleGoogleLogin = () => {
    Alert.alert("", "'스펙토'에서 '구글'을 열려고 합니다.", [
      {
        text: "취소",
        onPress: () => console.log("구글 취소 버튼을 눌렀습니다."),
        style: "cancel",
      },
      {
        text: "열기",
        onPress: () => console.log("구글 열기 버튼을 눌렀습니다."),
      },
    ]);
    // 구글 로그인 링크로 이동하는 코드 추가
  };

  const handleKakaoLogin = () => {
    Alert.alert("", "'스펙토'에서 '카카오톡'을 열려고 합니다.", [
      {
        text: "취소",
        onPress: () => console.log("카카오톡 취소 버튼을 눌렀습니다."),
        style: "cancel",
      },
      {
        text: "열기",
        onPress: () => console.log("카카오톡 열기 버튼을 눌렀습니다."),
      },
    ]);
    // 카카오 로그인 링크로 이동하는 코드 추가
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>specto.</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.googleButton]}
          onPress={handleGoogleLogin}
        >
          <AntDesign name="google" size={18} color="black" />
          <Text
            style={[styles.buttonText, styles.googleText, { marginLeft: 10 }]}
          >
            구글로 계속하기
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.kakaoButton]}
          onPress={handleKakaoLogin}
        >
          <Ionicons name="chatbubble" size={18} color="#381E1E" />
          <Text
            style={[styles.buttonText, styles.kakaoText, , { marginLeft: 10 }]}
          >
            카카오톡으로 계속하기
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 200,
  },
  logo: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#0094FF",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 80,
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center", // 가로 방향 가운데 정렬
    alignItems: "center", // 세로 방향 가운데 정렬
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: "80%",
    borderWidth: 1,
  },

  googleButton: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
  },
  kakaoButton: {
    backgroundColor: "#FEE500",
    borderWidth: 0,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  googleText: {
    color: "#000",
  },
  kakaoText: {
    color: "#381E1E",
  },
});

export default LoginScreen;
