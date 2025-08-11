import { colors } from "@/constants/Colors";
import { size } from "@/constants/SIze";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewProps,
} from "react-native";

type DefaultTextInputsProps = ViewProps & {
  iconName?: keyof typeof Ionicons.glyphMap;
  placeholder?: string;
  secureTextEntry?: boolean;
  onChangeText?: (text: string) => void;
  value?: string;
  iconSize?: keyof typeof size;
  iconColor?: keyof typeof colors;
  title?: string;
  disable?: boolean;
  keyboardType?: TextInputProps["keyboardType"];
};

const DefaultTextInputs = ({
  iconName,
  placeholder,
  secureTextEntry,
  title,
  onChangeText,
  value,
  style,
  disable = false,
  iconColor = "inactive",
  iconSize = "md",
  keyboardType = "default",
  ...otherProps
}: DefaultTextInputsProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [color, setColor] = useState<keyof typeof colors>("inactive");
  const [isSecure, setSecure] = useState<boolean>(secureTextEntry || false);

  const handleFocus = () => {
    setIsActive(true);
    setColor("secondary");
  };
  const handleBlur = () => {
    setIsActive(false);
    setColor("inactive");
  };

  return (
    <View
      style={
        isActive
          ? [styles.inputContainer, { borderColor: colors[color] }, style]
          : [styles.inputContainer, style]
      }
    >
      <View style={styles.iconContainer}>
        <Ionicons name={iconName} size={size[iconSize]} color={colors[color]} />
      </View>
      <View style={styles.textInputContainer}>
        <Text style={[styles.titleText, { color: colors[color] }]}>
          {title}
        </Text>
        <TextInput
          style={[styles.input]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          secureTextEntry={isSecure}
          onChangeText={onChangeText}
          value={value}
          readOnly={disable}
          keyboardType={keyboardType}
          placeholderTextColor={colors.inactive}
          {...otherProps}
        />
      </View>
      {secureTextEntry && (
        <Pressable
          style={styles.pressableContainer}
          onPress={() => setSecure(!isSecure)}
        >
          <Ionicons
            name={isSecure ? "eye-off" : "eye"}
            size={size.md}
            color={isActive ? colors.secondary : colors.inactive}
          />
        </Pressable>
      )}
    </View>
  );
};

export default DefaultTextInputs;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: size.sm,
    borderColor: colors.white,
    backgroundColor: colors.white,
  },
  input: {
    fontSize: size.md,
  },
  iconContainer: {
    padding: size.sm,
  },
  titleText: {
    fontSize: size.sm,
    marginTop: size.xs / 2,
  },
  textInputContainer: {
    flex: 1,
  },
  pressableContainer: {
    padding: size.md,
  },
});
