import { colors } from "@/constants/Colors";
import { DummyTasksType } from "@/constants/Dummy";
import { screenSize, size } from "@/constants/SIze";
import { authStore } from "@/store/authStore";
import { dateToIndonesianTime } from "@/utils/dateTranslate";
import React from "react";
import {
  Image,
  ImageProps,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import IconButtons from "../buttons/IconButtons";

type TaskItemProps = {
  onPress?: () => void;
  item: DummyTasksType;
};

const TaskItem = ({ onPress, item }: TaskItemProps) => {
  const user = authStore((state) => state.user);
  return (
    <View style={styles.itemWrapper}>
      <Pressable
        style={styles.itemContainer}
        android_ripple={{ color: colors.inactive }}
        onPress={onPress}
      >
        <View>
          <View style={styles.itemImageWrapper}>
            <Image
              source={item.gambar as ImageProps}
              style={styles.itemImage}
            />
          </View>
        </View>
        <View style={styles.itemTextWrapper}>
          <Text style={styles.itemHighlight}>{item.kebun}</Text>
          <Text style={styles.itemText}>{item.jenisKayu}</Text>
          <Text style={styles.itemHighlight}>{item.pemilik}</Text>
        </View>

        <View>
          <Text style={[styles.itemHighlight, { textAlign: "right" }]}>
            {dateToIndonesianTime(item.createdAt)}
          </Text>
          <View style={styles.itemBeratContainer}>
            <View style={styles.itemBeratWrapper}>
              <Text style={[styles.itemHighlight, { color: colors.white }]}>
                {item.bk}
              </Text>
            </View>
            <View style={styles.itemBeratWrapper}>
              <Text style={[styles.itemHighlight, { color: colors.white }]}>
                {item.jumlahKayu}
              </Text>
            </View>
          </View>
        </View>
        {user?.role === "admin" && (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButtons iconName="ellipsis-horizontal" iconSize="lg" />
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  itemImage: {
    width: "100%",
    height: "100%",
  },
  itemImageWrapper: {
    height: screenSize.width / 6,
    aspectRatio: 1,
    overflow: "hidden",
  },
  itemContainer: {
    padding: size.xs,
    flexDirection: "row",
  },
  itemWrapper: {
    elevation: 5,
    shadowColor: colors.inactive,
    backgroundColor: colors.white,
    borderRadius: size.sm,
    overflow: "hidden",
  },
  itemTextWrapper: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: size.sm,
  },
  itemText: {
    fontSize: size.md,
    color: colors.black,
  },
  itemHighlight: {
    fontSize: size.sm,
    color: colors.inactive,
    fontWeight: "bold",
  },
  itemBeratContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
  },
  itemBeratWrapper: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    padding: size.xs,
    borderRadius: size.sm,
  },
});
