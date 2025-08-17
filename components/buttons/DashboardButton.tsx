import { colors } from "@/constants/Colors";
import { size } from "@/constants/SIze";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View, ViewProps } from "react-native";
import Loading from "../loading/Loading";

type DashboardButtonProps = ViewProps & {
  iconName: keyof typeof Ionicons.glyphMap;
  iconSize?: keyof typeof size;
  iconColor?: keyof typeof colors;
  title: string;
  subTitle: string;
  onPress?: () => void;
  loading?: boolean;
};

const DashboardButton = ({
  iconName,
  iconSize = "xl",
  iconColor = "white",
  style,
  title,
  subTitle,
  onPress,
  loading = true,
  ...props
}: DashboardButtonProps) => {
  return (
    <View style={styles.main} {...props}>
      <Pressable
        style={[styles.wrapper, style]}
        android_ripple={{ color: colors.white }}
        onPress={onPress}
      >
        <View>
          <Ionicons
            name={iconName}
            size={size[iconSize]}
            color={colors[iconColor]}
          />
        </View>
        {loading ? (
          <Loading color={colors.white} size={"large"} />
        ) : (
          <Text style={styles.text}>{title}</Text>
        )}
        <Text style={styles.subtitle}>{subTitle}</Text>
      </Pressable>
    </View>
  );
};

export default DashboardButton;

const styles = StyleSheet.create({
  main: {
    borderRadius: size.md,
    overflow: "hidden",
    elevation: 2,
    marginVertical: size.xs,
  },
  wrapper: {
    backgroundColor: colors.secondary,
    padding: size.md,
    flex: 1,
  },
  text: {
    fontSize: size.lg,
    fontWeight: "bold",
    color: colors.white,
    marginTop: size.xs,
  },
  subtitle: {
    fontSize: size.md,
    color: colors.white,
    marginTop: size.xs,
  },
});
