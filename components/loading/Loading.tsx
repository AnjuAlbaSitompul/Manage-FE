import { colors } from "@/constants/Colors";
import React from "react";
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleSheet,
  View,
} from "react-native";

const Loading = ({
  size = "small",
  color = colors.white,
}: ActivityIndicatorProps) => {
  return (
    <View>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
