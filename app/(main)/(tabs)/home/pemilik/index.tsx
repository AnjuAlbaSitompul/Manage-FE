import IconButtons from "@/components/buttons/IconButtons";
import PemilikForm from "@/components/forms/PemilikForm";
import Loading from "@/components/loading/Loading";
import { colors } from "@/constants/Colors";
import { size } from "@/constants/SIze";
import { PemilikModels } from "@/models/pemilik/pemilikModels";
import { deletePemilik, getPemilik } from "@/services/private/pemilik-services";
import { toastShow } from "@/utils/toastShow";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { FlatList } from "react-native-gesture-handler";

const Pemilik = () => {
  const [dataPemilik, setDataPemilik] = useState<PemilikModels[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const isFocused = useIsFocused();
  const router = useRouter();

  useEffect(() => {
    if (isFocused) {
      console.log("focused");
      getPemilikData();
    }
  }, [isFocused]);

  const getPemilikData = async () => {
    setLoading(true);
    const response = await getPemilik();
    if (response.status === "success") {
      setDataPemilik(response.data);
    }
    if (response.status === "error") {
      toastShow({ text: response.message, type: "error" });
    }
    setLoading(false);
  };

  const handleDelete = async (id: string): Promise<void> => {
    const response = await deletePemilik(id);
    if (response.status === "success") {
      toastShow({ text: "Data pemilik berhasil dihapus", type: "success" });
      getPemilikData();
    }
    if (response.status === "error") {
      toastShow({ text: response.message, type: "error" });
    }
  };

  const refreshHandler = () => {
    getPemilikData();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Loading />
      </View>
    );
  }

  const header = () => (
    <>
      <PemilikForm refresh={() => refreshHandler()} />
    </>
  );
  const renderItem = ({ item }: { item: PemilikModels }) => (
    <View
      style={
        item.isActive
          ? styles.itemWrapper
          : [styles.itemWrapper, { opacity: 0.5 }]
      }
    >
      <Pressable
        style={styles.itemContainer}
        android_ripple={{ color: colors.inactive }}
        onPress={() => router.push(`/home/pemilik/${item.id}`)}
      >
        <View style={styles.itemIconWrapper}>
          <Ionicons name="person" size={24} color={colors.secondary} />
        </View>
        <View style={styles.itemTextWrapper}>
          <Text>{item.name}</Text>
        </View>
        <View>
          <IconButtons
            iconName="trash-outline"
            onPress={() => handleDelete(item.id.toString())}
            iconColor="error"
          />
        </View>
      </Pressable>
    </View>
  );
  return (
    <View style={styles.main}>
      <FlatList
        data={dataPemilik}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListHeaderComponent={header}
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={() => <View style={{ height: size.sm }} />}
      />
    </View>
  );
};

export default Pemilik;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    padding: size.md,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: size.xs,
  },
  itemTextWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemIconWrapper: {
    padding: size.sm,
    alignItems: "center",
  },
  transaksiWrapper: {
    backgroundColor: colors.secondary,
    paddingHorizontal: size.sm,
    paddingVertical: size.xs,
    borderRadius: size.sm,
  },
  transaksiText: {
    color: colors.white,
    fontWeight: "bold",
  },
  itemOptionsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: size.xs,
  },
  itemWrapper: {
    borderRadius: size.sm,
    backgroundColor: colors.white,
    overflow: "hidden",
  },
});
