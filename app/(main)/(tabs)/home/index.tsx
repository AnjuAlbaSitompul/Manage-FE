import TaskItem from "@/components/listItems/TaskItem";
import TaskCard from "@/components/screensComponents/homeScreen/TaskCard";
import UserCard from "@/components/screensComponents/homeScreen/UserCard";
import { colors } from "@/constants/Colors";
import { dummyTasks, DummyTasksType } from "@/constants/Dummy";
import { size } from "@/constants/SIze";
import { authStore } from "@/store/authStore";
import { dateToIndonesianString } from "@/utils/dateTranslate";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const index = () => {
  const user = authStore((state) => state.user);

  const renderHeader = () => {
    return (
      <View>
        <UserCard />
        <TaskCard />
        <View style={styles.header}>
          <Ionicons
            name="file-tray-stacked"
            size={size.lg}
            color={colors.primary}
            style={styles.iconHeader}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.text}>Daftar Angkutan</Text>
          </View>
          <Text style={styles.itemHighlight}>
            {dateToIndonesianString(new Date())}
          </Text>
        </View>
      </View>
    );
  };

  const RenderItem = ({ item }: { item: DummyTasksType }) => {
    return <TaskItem item={item} />;
  };

  return (
    <View style={styles.main}>
      <FlatList
        data={dummyTasks}
        renderItem={RenderItem}
        contentContainerStyle={styles.contentContainer}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={renderHeader}
        ItemSeparatorComponent={() => <View style={{ height: size.xs }} />}
      />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    paddingHorizontal: size.md,
    paddingBottom: size.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: size.md,
  },
  iconHeader: {
    padding: size.sm,
  },
  text: {
    fontSize: size.lg,
    fontWeight: "bold",
    color: colors.primary,
  },
  itemHighlight: {
    fontSize: size.sm,
    color: colors.inactive,
    fontWeight: "bold",
  },
});
