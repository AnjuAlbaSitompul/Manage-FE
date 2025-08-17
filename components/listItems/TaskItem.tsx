import { colors } from "@/constants/Colors";
import { screenSize, size } from "@/constants/SIze";
import { fileDownloader } from "@/hooks/useFileDownloader";
import { Transaction } from "@/models/transactions/transactionModels";
import { authStore } from "@/store/authStore";
import {
  dateToIndonesianString,
  dateToIndonesianTime,
} from "@/utils/dateTranslate";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import IconButtons from "../buttons/IconButtons";
import Loading from "../loading/Loading";

import { deleteTransaction } from "@/services/private/transaction-services";

type TaskItemProps = {
  item: Transaction;
  refresh?: () => void;
};

const TaskItem = ({ item, refresh }: TaskItemProps) => {
  const [imageUri, setImageUri] = useState<string>("");
  const user = authStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (item.urlFile) {
      getUriImage(item.urlFile);
    }
  }, [item.urlFile]);

  const getUriImage = async (url: string) => {
    const image = await fileDownloader(url, `Transactions_${item.id}.jpg`);
    if (image) {
      setImageUri(image);
    }
  };

  const deleteHandler = async (val: string) => {
    Alert.alert(
      "Konfirmasi Hapus",
      "Apakah Anda yakin ingin menghapus item ini?",
      [
        {
          text: "Batal",
          style: "cancel",
        },
        {
          text: "Hapus",
          onPress: async () => {
            const result = await deleteTransaction(val);
            if (result.status === "success") {
              Alert.alert("Sukses", "Item berhasil dihapus");
              refresh?.();
            } else {
              Alert.alert("Error", result.message);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.itemWrapper}>
      <Pressable
        style={{ flexDirection: "row" }}
        android_ripple={{ color: colors.inactive }}
        onPress={() => router.push(`home/validasi/detail/${item.id}`)}
      >
        <View
          style={
            item.status === "DITERIMA"
              ? styles.footer
              : [styles.footer, { backgroundColor: colors.warn }]
          }
        ></View>
        <View style={styles.itemContainer}>
          <View>
            <View style={styles.itemImageWrapper}>
              {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.itemImage} />
              ) : (
                <Loading color={colors.primary} size={"large"} />
              )}
            </View>
          </View>
          <View style={styles.itemTextWrapper}>
            <Text style={styles.itemHighlight}>{item.garden.name}</Text>
            <Text style={styles.itemText}>{item.wood.name}</Text>
            <Text style={styles.itemHighlight}>{item.customer.name}</Text>
          </View>

          <View>
            <Text
              style={[
                styles.itemHighlight,
                { textAlign: "right", fontSize: size.xs },
              ]}
            >
              {item.createdAt &&
                `${dateToIndonesianString(
                  new Date(item?.createdAt)
                )} ${dateToIndonesianTime(new Date(item?.createdAt))}`}
            </Text>

            <View style={styles.itemBeratContainer}>
              {item.type && (
                <View style={styles.itemBeratWrapper}>
                  <Text style={[styles.itemHighlight, { color: colors.white }]}>
                    {item.type}
                  </Text>
                </View>
              )}
              <View style={styles.itemBeratWrapper}>
                <Text style={[styles.itemHighlight, { color: colors.white }]}>
                  {item.vehicle.number}
                </Text>
              </View>
            </View>
          </View>
          {(user?.role === "ADMIN" || user?.role === "SPV") &&
            item.status === "PENDING" && (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconButtons
                  iconName="trash-outline"
                  iconSize="lg"
                  iconColor="error"
                  onPress={() => deleteHandler(item.id)}
                />
              </View>
            )}
        </View>
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
    borderRadius: size.sm,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    flexDirection: "row",
    padding: size.sm,
    flex: 1,
  },
  itemWrapper: {
    elevation: 5,
    shadowColor: colors.captions,
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
    color: colors.captions,
    fontWeight: "300",
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
  statusContainer: {
    marginRight: size.xs,
    backgroundColor: colors.secondary,
  },
  footer: {
    width: size.xs,
    backgroundColor: colors.secondary,
  },
});
