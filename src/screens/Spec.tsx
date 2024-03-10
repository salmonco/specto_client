import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SpecScreenStackParamList } from "../stackNav/SpecScreen";

type SpecScreenProps = NativeStackScreenProps<SpecScreenStackParamList, "Spec">;

function Spec({ navigation }: Readonly<SpecScreenProps>) {
  return (
    <SafeAreaView>
      <Header label="내 스펙" closeCallbackFn={() => navigation.goBack()} />
    </SafeAreaView>
  );
}

export default Spec;
