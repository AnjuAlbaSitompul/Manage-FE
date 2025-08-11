import UpdateKayuForm from "@/components/forms/UpdateKayuForm";
import Loading from "@/components/loading/Loading";
import HeaderText from "@/components/texts/HeaderText";
import { colors } from "@/constants/Colors";
import { size } from "@/constants/SIze";
import { LogWoodModels, WoodModels } from "@/models/woods/woodmodels";
import { findOneWood, logWood } from "@/services/private/wood-services";
import { currency } from "@/utils/currency";
import {
  dateToIndonesianString,
  dateToIndonesianTime,
} from "@/utils/dateTranslate";
import { toastShow } from "@/utils/toastShow";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const DetailKayu = () => {
  const { id } = useLocalSearchParams();
  const [logs, setLogs] = useState<LogWoodModels<any>[]>([]);
  const [wood, setWood] = useState<WoodModels>({
    id: "",
    name: "",
    unit: "KG",
    price: "0",
    isActive: true,
    createdAt: "",
    updatedAt: "",
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    getData();
    fetchLog();
    setLoading(false);
  }, [id]);

  const getData = async () => {
    const response = await findOneWood(id as string);
    if (response.status === "success") {
      console.log(response.data);
      setWood(response.data);
    }
  };

  const fetchLog = async (): Promise<void> => {
    const response = await logWood(id as string);
    if (response.status === "error") {
      toastShow({ text: response.message, type: "error" });
    } else {
      setLogs(response.data.logs);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Loading />
      </View>
    );
  }
  const renderItem = ({ item }: { item: LogWoodModels<any> }) => {
    const icon =
      parseInt(item.oldPrice) < parseInt(item.newPrice)
        ? "arrow-up"
        : "arrow-down";
    const iconColor =
      parseInt(item.oldPrice) < parseInt(item.newPrice)
        ? colors.secondary
        : colors.error;
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemIconContainer}>
          <Ionicons name={icon} color={iconColor} size={size.xl} />
        </View>
        <View>
          <Text style={styles.highlightText}>
            {dateToIndonesianString(new Date(item.updatedAt))}{" "}
            {dateToIndonesianTime(new Date(item.updatedAt))}
          </Text>
          <Text style={styles.itemHarga}>{currency(item.newPrice)}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.main}>
      <View style={styles.content}>
        <HeaderText title={wood.name} icon="leaf-outline">
          <View style={styles.hargaContainer}>
            <Text style={styles.textHarga}>{currency(wood.price)}</Text>
          </View>
          <Text style={styles.highlightText}>/ {wood.unit}</Text>
        </HeaderText>
        <View>
          <UpdateKayuForm {...wood} />
        </View>
      </View>
      <View style={[styles.content, { flex: 1 }]}>
        <HeaderText title="Log Perubahan Harga" icon="list-outline" />
        <View style={styles.listContainer}>
          <FlatList
            data={logs}
            renderItem={renderItem}
            contentContainerStyle={styles.flatListContent}
            ItemSeparatorComponent={() => <View style={{ height: size.xs }} />}
          />
        </View>
      </View>
    </View>
  );
};

export default DetailKayu;

const styles = StyleSheet.create({
  hargaContainer: {
    padding: size.xs,
    backgroundColor: colors.secondary,
    borderRadius: size.sm,
  },
  textHarga: {
    fontSize: size.md,
    color: colors.white,
    fontWeight: "bold",
  },
  content: {
    margin: size.md,
    padding: size.sm,
    backgroundColor: colors.white,
    borderRadius: size.sm,
  },
  highlightText: {
    fontSize: size.sm,
    color: colors.captions,
  },
  main: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    marginTop: size.md,
    backgroundColor: colors.background,
    borderRadius: size.sm,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.transparentBlack,
  },
  itemContainer: {
    backgroundColor: colors.white,
    padding: size.sm,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: size.sm,
  },
  flatListContent: {
    padding: size.sm,
  },
  itemIconContainer: {
    padding: size.sm,
  },
  itemHarga: {
    fontSize: size.md,
    fontWeight: "bold",
  },
});
