import AddForm from "@/components/forms/AddForm";
import { colors } from "@/constants/Colors";
import { size } from "@/constants/SIze";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const Add = () => {
  return (
    <View style={styles.main}>
      <ScrollView contentContainerStyle={{ padding: size.md }}>
        <View style={styles.caption}>
          <View style={styles.captionWrapper}>
            <Text style={styles.text}>Data Mobil Masuk</Text>
          </View>
          <View style={styles.iconWrapper}>
            <Ionicons name="car-outline" size={size.lg} color={colors.black} />
          </View>
        </View>
        <AddForm />
      </ScrollView>
    </View>
  );
};

export default Add;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  caption: {
    marginBottom: size.md,
    paddingBottom: size.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.inactive,
    flexDirection: "row",
  },
  text: {
    fontSize: size.lg,
    fontWeight: "bold",
  },
  captionWrapper: {
    flex: 1,
  },
  iconWrapper: {
    paddingHorizontal: size.sm,
  },
});
