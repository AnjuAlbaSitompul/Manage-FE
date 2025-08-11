import { colors } from "@/constants/Colors";
import { size } from "@/constants/SIze";
import React from "react";
import { StyleSheet, Text, View, ViewProps } from "react-native";

type FormTextsProps = ViewProps & {
  title: string;
  description: string | number;
};

const FormTexts = ({
  title,
  description,
  style,
  ...others
}: FormTextsProps) => {
  return (
    <View style={[styles.container, style]} {...others}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

export default FormTexts;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  title: {
    fontSize: size.md,
    fontWeight: "300",
    color: colors.captions,
  },
  description: {
    fontSize: size.md,
    fontWeight: "300",
    color: colors.black,
    textAlign: "right",
  },
});
