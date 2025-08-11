import { colors } from "@/constants/Colors";
import { size } from "@/constants/SIze";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, StyleSheet, View, ViewProps } from "react-native";
import IconButtons from "./IconButtons";

type PickerCameraButtonProps = ViewProps & {
  onPress?: () => void;
  onClosePress?: () => void;
  image?: string;
};

const PickerCameraButton = ({
  onPress,
  onClosePress,
  style,
  image,
  ...props
}: PickerCameraButtonProps) => {
  return (
    <View style={[styles.main, style]} {...props}>
      {!image ? (
        <Pressable
          style={styles.container}
          android_ripple={{ color: colors.inactive }}
          onPress={onPress}
        >
          <Ionicons name="camera" size={24} color={colors.inactive} />
        </Pressable>
      ) : (
        <View style={styles.container}>
          <Image
            source={{ uri: image }}
            style={{ width: "100%", height: "100%" }}
          />
          <IconButtons
            iconName="close"
            onPress={onClosePress}
            iconSize="md"
            iconColor="inactive"
            style={styles.iconButton}
          />
        </View>
      )}
    </View>
  );
};

export default PickerCameraButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  main: {
    width: "100%",
    aspectRatio: 1,
    overflow: "hidden",
    borderRadius: size.md,
  },
  iconButton: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: colors.transparentError,
  },
});
