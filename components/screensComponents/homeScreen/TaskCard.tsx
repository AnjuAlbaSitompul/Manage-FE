import DashboardButton from "@/components/buttons/DashboardButton";
import { colors } from "@/constants/Colors";
import { screenSize } from "@/constants/SIze";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

const TaskCard = () => {
  const route = useRouter();
  return (
    <View style={styles.main}>
      <DashboardButton
        iconName="car-outline"
        title={`12 Armada`}
        subTitle="Perlu Divalidasi"
        style={styles.wrapper}
        onPress={() => route.push("/home/validasi")}
      />
      <DashboardButton
        iconName="person-circle-outline"
        title={`12 Pemilik`}
        subTitle="Terdaftar"
        style={[styles.wrapper, { backgroundColor: colors.inactive }]}
        onPress={() => route.push("/home/pemilik")}
      />
    </View>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  wrapper: {
    width: screenSize.width / 2 - 20,
  },
});
