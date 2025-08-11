import FilterButton from "@/components/buttons/FilterButton";
import TaskItem from "@/components/listItems/TaskItem";
import DefaultPicker from "@/components/pickers/DefaultPicker";
import { colors } from "@/constants/Colors";
import { dummyTasks } from "@/constants/Dummy";
import { size } from "@/constants/SIze";
import { getMonthsFromNowToJanuary } from "@/utils/monthsBefore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const Validasi = () => {
  const months = ["All", ...getMonthsFromNowToJanuary()];
  const route = useRouter();

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Validasi Armada</Text>
          <Ionicons
            name="car-outline"
            color={colors.secondary}
            size={size.lg}
          />
        </View>
        <FilterButton
          data={["All", "DiValidasi", "Belum DiValidasi"]}
          onPress={(item) => console.log(item)}
        />
        <FilterButton data={months} onPress={(item) => console.log(item)} />
        <DefaultPicker
          title="Pilih Kebun"
          data={["Kebun 1", "Kebun 2", "Kebun 3"]}
          iconName="leaf-outline"
          iconSize="lg"
          onValueChange={(value) => console.log(value)}
        />
      </View>
    );
  };
  const renderItem = ({ item }: { item: any }) => {
    return (
      <TaskItem
        item={item}
        onPress={() => route.push("/home/validasi/detail/[id]")}
      />
    );
  };
  return (
    <View>
      <FlatList
        data={dummyTasks}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainer}
        ListHeaderComponent={renderHeader}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={{ height: size.xs }} />}
      />
    </View>
  );
};

export default Validasi;

const styles = StyleSheet.create({
  contentContainer: {
    padding: size.md,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: size.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.inactive,
  },
  headerText: {
    fontSize: size.lg,
    fontWeight: "bold",
  },
  header: {
    marginBottom: size.sm,
  },
});
