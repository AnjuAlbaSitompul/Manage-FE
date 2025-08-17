import { colors } from "@/constants/Colors";
import { ReportFeaturesType } from "@/constants/Features";
import { size } from "@/constants/SIze";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type ReportMenuItem = {
  data: ReportFeaturesType;
  onPress: () => void;
};

const ReportsMenuItem = ({ data, onPress }: ReportMenuItem) => {
  return (
    <View style={styles.wrapper}>
      <Pressable
        onPress={onPress}
        style={styles.container}
        android_ripple={{ color: colors.inactive }}
      >
        <View style={styles.iconContainer}>
          <Ionicons name={data.icon} size={size.xxl} color={colors.secondary} />
        </View>
        <View>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.description}>{data.description}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default ReportsMenuItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: size.sm,
    backgroundColor: colors.white,
    alignItems: "center",
  },
  wrapper: {
    borderRadius: size.sm,
    overflow: "hidden",
  },
  iconContainer: {
    padding: size.sm,
  },
  title: {
    fontSize: size.md,
    fontWeight: "bold",
    color: colors.secondary,
  },
  description: {
    fontSize: size.sm,
    color: colors.captions,
    fontWeight: "300",
  },
});
