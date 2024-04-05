import React, { useState } from "react";
import CalendarPicker from "react-native-calendar-picker";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ContestAddScreenStackParamList } from "@stackNav/ContestAddScreen";

type ContestProps = NativeStackScreenProps<
  ContestAddScreenStackParamList,
  "ContestAdd2"
>;

function ContestAdd2({ navigation }: Readonly<ContestProps>) {
  const [contestName, setContestName] = useState("");

  const handleNext = () => {
    navigation.navigate("ContestAdd3");
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FCFCFE",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 0,
      }}
    >
      {/* 페이지 인디케이터 */}
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          top: 20,
          right: 30,
        }}
      >
        <Text
          style={{
            color: "#0094FF",
            fontSize: 14,
            fontWeight: "600",
          }}
        >
          2
        </Text>
        <Text style={{ color: "black", fontSize: 14, fontWeight: "600" }}>
          /3
        </Text>
      </View>

      {/* 공모전 정보 입력 */}
      <View style={{ width: 320, marginBottom: 20, marginTop: 120 }}>
        <Text style={{ color: "#373737", fontSize: 18, fontWeight: "600" }}>
          해당 공모전의 정보를 입력해주세요.
        </Text>
      </View>

      {/* 섹션 1: 공모전 기간 */}
      <View style={{ width: 320, marginBottom: 38 }}>
        <Text
          style={{
            color: "#373737",
            fontSize: 16,
            fontWeight: "600",
            marginBottom: 20,
          }}
        >
          공모전 준비/마감 기간을 선택해주세요.
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              padding: 13,
              backgroundColor: "white",
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#D9D9D9",
              marginRight: 10,
            }}
          >
            <Text style={{ color: "#9F9F9F", fontSize: 10, fontWeight: "400" }}>
              시작~준비기간
            </Text>
            <Text style={{ color: "#373737", fontSize: 16, fontWeight: "400" }}>
              9월 8일
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              padding: 13,
              backgroundColor: "white",
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#D9D9D9",
            }}
          >
            <Text style={{ color: "#9F9F9F", fontSize: 10, fontWeight: "400" }}>
              마감기간
            </Text>
            <Text style={{ color: "#373737", fontSize: 16, fontWeight: "400" }}>
              날짜 선택
            </Text>
          </View>
        </View>
      </View>

      {/* 섹션 2: 공모전 이름 및 주최기관 입력 */}
      <View style={{ width: 320, marginBottom: 38 }}>
        <View
          style={{
            alignItems: "flex-start",
            justifyContent: "flex-start",
            marginBottom: 15,
          }}
        >
          <Text
            style={{
              color: "#373737",
              fontSize: 16,
              fontWeight: "600",
              // marginBottom: 20,
            }}
          >
            공모전 주최기관을 입력해주세요.
          </Text>
        </View>
        <View
          style={{
            padding: 16,
            backgroundColor: "white",
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "#D9D9D9",
            width: "100%",
            // marginBottom: 20,
            alignItems: "flex-start",
          }}
        >
          <Text
            style={{
              color: "#9F9F9F",
              fontSize: 10,
              fontWeight: "400",
              marginBottom: 5,
            }}
          >
            주최기관
          </Text>
          <TextInput
            style={{ color: "#C1C1C1", fontSize: 16, fontWeight: "400" }}
            placeholder="주최기관을 입력해주세요."
            value={contestName}
            onChangeText={(text) => setContestName(text)}
          />
        </View>
      </View>

      {/* 섹션 3: 공모전 분야 선택 */}
      <View style={{ width: 320, marginBottom: 38 }}>
        <Text
          style={{
            color: "#373737",
            fontSize: 16,
            fontWeight: "600",
            marginBottom: 15,
          }}
        >
          공모전 분야를 선택해주세요
        </Text>
        <View
          style={{
            padding: 16,
            backgroundColor: "white",
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "#D9D9D9",
            alignItems: "flex-start",
          }}
        >
          <Text
            style={{
              color: "#9F9F9F",
              fontSize: 10,
              fontWeight: "400",
              marginBottom: 5,
            }}
          >
            분야
          </Text>
          <Text style={{ color: "#373737", fontSize: 16, fontWeight: "400" }}>
            디자인
          </Text>
        </View>
      </View>

      {/* 섹션 4: 공모전 상세 정보 입력 */}
      <View style={{ width: 320, marginBottom: 38 }}>
        <Text
          style={{
            color: "#373737",
            fontSize: 16,
            fontWeight: "600",
            marginBottom: 15,
          }}
        >
          공모전 상세 정보를 자유롭게 입력해주세요.
        </Text>
        <View
          style={{
            padding: 16,
            backgroundColor: "white",
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "#D9D9D9",
            alignItems: "flex-start",
          }}
        >
          <Text
            style={{
              color: "#9F9F9F",
              fontSize: 10,
              fontWeight: "400",
              marginBottom: 5,
            }}
          >
            상세정보
          </Text>
          <Text style={{ color: "#C1C1C1", fontSize: 16, fontWeight: "400" }}>
            상세정보를 입력해주세요.
          </Text>
        </View>
      </View>

      {/* 다음으로 버튼 */}
      <TouchableOpacity
        style={{
          backgroundColor: "#0094FF",
          padding: 16,
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
          width: "90%",
          marginBottom: 20,
        }}
        onPress={handleNext}
      >
        <Text style={{ color: "white", fontSize: 14, fontWeight: "600" }}>
          다음으로
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default ContestAdd2;
