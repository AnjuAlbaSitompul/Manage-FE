import { colors } from "@/constants/Colors";
import { size } from "@/constants/SIze";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View, ViewProps } from "react-native";

type DrawerItemProps = ViewProps & {
  name: keyof typeof Ionicons.glyphMap;
  color: keyof typeof colors;
  text: string;
  onPress?: () => void;
};

const DrawerItem = ({ style, name, color, text, onPress }: DrawerItemProps) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.main, style]}
        android_ripple={{ color: colors.inactive }}
        onPress={onPress}
      >
        <View style={styles.iconContainer}>
          <Ionicons name={name} size={size.xl} color={colors[color]} />
        </View>
        <View>
          <Text>{text}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default DrawerItem;

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  iconContainer: {
    padding: size.xs,
  },
  container: {
    borderRadius: size.xs,
    overflow: "hidden",
  },
});
