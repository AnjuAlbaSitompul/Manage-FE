import { colors } from "@/constants/Colors";
import { size } from "@/constants/SIze";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ToastConfig, ToastConfigParams } from "react-native-toast-message";

type ToastConfigProps = {
  type: "success" | "error" | "info";
};
const Toaster: ToastConfig = {
  defaultToast: ({ text1, props }: ToastConfigParams<ToastConfigProps>) => {
    const iconName: keyof typeof Ionicons.glyphMap =
      props.type === "success" ? "checkmark-circle" : "alert-circle";
    const iconColor =
      props.type === "success" ? colors.secondary : colors.error;

    return (
      <View style={styles.main}>
        <View style={styles.iconContainer}>
          <Ionicons name={iconName} size={size.lg} color={iconColor} />
        </View>
        <View>
          <Text style={styles.text}>{text1}</Text>
        </View>
      </View>
    );
  },
};

export default Toaster;

const styles = StyleSheet.create({
  main: {
    backgroundColor: colors.transparentBlack,
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  iconContainer: {
    padding: size.sm,
  },
  text: {
    fontSize: size.sm,
    color: colors.white,
  },
});
