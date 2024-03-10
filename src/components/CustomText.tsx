import React from "react";
import { StyleSheet, Text, TextStyle } from "react-native";

type Component = {
  children: string | string[];
  style?: TextStyle | TextStyle[];
  className?: string;
};
export const CustomText: React.FC<Component> = ({ children, ...props }) => {
  return (
    <Text
      {...props}
      style={[styles.defaultFontText, props.style]}
      className={props.className}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  defaultFontText: {
    fontFamily: "Inter-Regular",
  },
});
