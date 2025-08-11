import { colors } from "@/constants/Colors";
import { size } from "@/constants/SIze";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
} from "react-native";

type FilterButtonProps = {
  data: string[];
  style?: ViewProps["style"];
  onPress: (item: string) => void;
};

const FilterButton = ({ data, onPress, style }: FilterButtonProps) => {
  const [isChoosen, setIsChosen] = useState<string | null>(null);

  const onPressHandler = (item: string) => {
    setIsChosen(item);
    onPress(item);
  };
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={style}
      contentContainerStyle={styles.contentContainerStyle}
    >
      {data.map((item) => (
        <TouchableOpacity key={item} onPress={() => onPressHandler(item)}>
          <View
            style={
              item === isChoosen
                ? [styles.button, { backgroundColor: colors.secondary }]
                : styles.button
            }
          >
            <Text style={styles.buttonText}>{item}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default FilterButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.inactive,
    padding: size.xs,
    borderRadius: size.xs,
    marginRight: size.xs,
  },
  buttonText: {
    color: colors.white,
    fontSize: size.sm,
  },
  contentContainerStyle: {
    paddingVertical: size.xs,
  },
});
