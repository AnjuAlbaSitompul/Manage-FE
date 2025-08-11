import { colors } from "@/constants/Colors";
import { size } from "@/constants/SIze";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, View, ViewProps } from "react-native";

type IconButtonsProps = ViewProps & {
  iconName: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  iconSize?: keyof typeof size;
  iconColor?: keyof typeof colors;
};

const IconButtons = ({
  iconName,
  onPress,
  style,
  iconSize = "md",
  iconColor = "secondary",
  ...rest
}: IconButtonsProps) => {
  return (
    <View style={styles.main} {...rest}>
      <Pressable
        onPress={onPress}
        style={[styles.wrapper, style]}
        android_ripple={{ color: colors.inactive }}
      >
        <Ionicons
          name={iconName}
          size={size[iconSize]}
          color={colors[iconColor]}
        />
      </Pressable>
    </View>
  );
};

export default IconButtons;

const styles = StyleSheet.create({
  main: {
    borderRadius: size.xs,
    overflow: "hidden",
  },
  wrapper: {
    padding: size.xs,
    alignItems: "center",
  },
});
