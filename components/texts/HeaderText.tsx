import { colors } from "@/constants/Colors";
import { size } from "@/constants/SIze";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View, ViewProps } from "react-native";

type HeaderTextProps = ViewProps & {
  children?: React.ReactNode;
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
};
const HeaderText = ({
  children,
  title,
  icon = "document-attach",
}: HeaderTextProps) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.iconHeaderContainer}>
        <Ionicons name={icon} color={colors.inactive} size={size.xl} />
      </View>
      <Text style={styles.headerText}>{title}</Text>
      <View style={styles.textContainer}>{children}</View>
    </View>
  );
};

export default HeaderText;

const styles = StyleSheet.create({
  headerText: {
    fontSize: size.md,
    fontWeight: "bold",
    color: colors.captions,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: size.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.inactive,
  },
  iconHeaderContainer: {
    marginRight: size.xs,
  },
  textContainer: {
    paddingLeft: size.md,
    flex: 1,
    flexDirection: "row",
    gap: size.xs,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
