import { colors } from "@/constants/Colors";
import { size } from "@/constants/SIze";
import React from "react";
import { Pressable, StyleSheet, Text, View, ViewProps } from "react-native";
import Loading from "../loading/Loading";

type DefaultInputButtonsProps = ViewProps & {
  text: string;
  onPress?: () => void;
  loading?: boolean;
};

const DefaultInputButtons = ({
  text,
  style,
  loading = false,
  onPress,
  ...otherProps
}: DefaultInputButtonsProps) => {
  return (
    <View style={[styles.container, style]} {...otherProps}>
      <Pressable
        style={styles.wrapper}
        android_ripple={{ color: colors.inactive }}
        onPress={onPress}
        disabled={loading}
      >
        {loading ? <Loading /> : <Text style={styles.text}>{text}</Text>}
      </Pressable>
    </View>
  );
};

export default DefaultInputButtons;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    overflow: "hidden",
    borderRadius: size.md,
  },
  wrapper: {
    padding: size.md,
    alignItems: "center",
  },
  text: {
    fontSize: size.md,
    fontWeight: "bold",
    color: colors.white,
  },
});
