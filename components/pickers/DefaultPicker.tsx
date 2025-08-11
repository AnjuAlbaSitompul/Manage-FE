import { colors } from "@/constants/Colors";
import { size } from "@/constants/SIze";
import { capitalize } from "@/utils/capitalize";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { StyleSheet, Text, View, ViewProps } from "react-native";

type DefaultPickerProps = ViewProps & {
  selectedValue?: string;
  onValueChange?: (value: string) => void;
  data: string[];
  iconName?: keyof typeof Ionicons.glyphMap;
  iconSize?: keyof typeof size;
  title: string;
};

const DefaultPicker = ({
  style,
  selectedValue,
  onValueChange,
  data,
  iconName = "chevron-down",
  iconSize = "lg",
  title,
}: DefaultPickerProps) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  return (
    <View
      style={
        isFocus
          ? [styles.container, { borderColor: colors.secondary }, style]
          : [styles.container, style]
      }
    >
      <View style={styles.iconWrapper}>
        <Ionicons
          name={iconName}
          size={size[iconSize]}
          color={isFocus ? colors.secondary : colors.inactive}
        />
      </View>
      <View style={styles.pickerContainer}>
        <View>
          <Text
            style={
              isFocus
                ? [styles.title, { color: colors.secondary }]
                : styles.title
            }
          >
            {title}
          </Text>
        </View>
        <View>
          <Picker
            selectedValue={selectedValue}
            onValueChange={onValueChange}
            style={styles.picker}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
          >
            <Picker.Item
              style={{ fontSize: size.sm, color: colors.inactive }}
              label="Pilih opsi"
              value=""
            />
            {data.map((item, index) => (
              <Picker.Item
                style={{ fontSize: size.sm }}
                key={index}
                label={capitalize(item)}
                value={item}
              />
            ))}
          </Picker>
        </View>
      </View>
    </View>
  );
};

export default DefaultPicker;

const styles = StyleSheet.create({
  picker: {},
  container: {
    borderRadius: size.sm,
    overflow: "hidden",
    backgroundColor: "#fff",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.white,
  },
  iconWrapper: {
    padding: size.sm,
    justifyContent: "center",
    alignItems: "center",
  },
  pickerContainer: {
    flex: 1,
  },
  title: {
    fontSize: size.sm,
    color: colors.inactive,
    marginTop: size.xs,
  },
});
