import { colors } from "@/constants/Colors";
import { size } from "@/constants/SIze";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, View, ViewProps } from "react-native";
import IconButtons from "../buttons/IconButtons";
import DefaultPicker from "./DefaultPicker";

type EditPickerProps = ViewProps & {
  value: string;
  data: string[];
  onValueChange?: (text: string) => void;
  title: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  placeholder?: string;
  onPress?: () => void;
};

const EditPicker = ({
  value,
  onValueChange,
  title,
  iconName,
  style,
  data,
  onPress,
}: EditPickerProps) => {
  const [edit, setEdit] = useState<boolean>(false);

  const onDoneEdit = () => {
    setEdit(false);
    if (onPress) {
      onPress();
    }
  };

  return (
    <View style={styles.main}>
      <View style={{ flex: 1 }}>
        {edit ? (
          <DefaultPicker
            title={title}
            iconName={iconName}
            data={data}
            onValueChange={onValueChange}
            style={style}
          />
        ) : (
          <View style={styles.unEditContainer}>
            <View style={styles.iconContainer}>
              <Ionicons
                name={iconName}
                color={colors.inactive}
                size={size.md}
              />
            </View>
            <View>
              <Text style={styles.title}>{title}</Text>
              <Text>{value}</Text>
            </View>
          </View>
        )}
      </View>
      <View>
        {!edit ? (
          <IconButtons
            iconName="pencil-outline"
            onPress={() => setEdit(true)}
          />
        ) : (
          <IconButtons
            iconName="checkmark-outline"
            onPress={() => {
              onDoneEdit();
            }}
          />
        )}
      </View>
    </View>
  );
};

export default EditPicker;

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    alignItems: "center",
    gap: size.sm,
  },
  unEditContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: size.xs,
  },
  iconContainer: {
    padding: size.md,
  },
  title: {
    fontSize: size.sm,
    color: colors.inactive,
    marginBottom: size.xs,
  },
});
