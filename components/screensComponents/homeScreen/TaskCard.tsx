import DashboardButton from "@/components/buttons/DashboardButton";
import { colors } from "@/constants/Colors";
import { screenSize } from "@/constants/SIze";
import { getPemilik } from "@/services/private/pemilik-services";
import { getAllTransaction } from "@/services/private/transaction-services";
import { authStore } from "@/store/authStore";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

const TaskCard = () => {
  const isFocused = useIsFocused();
  const route = useRouter();
  const user = authStore((state) => state.user);

  const [loading, setLoading] = useState<{ pemilik: boolean; armada: boolean }>(
    { pemilik: true, armada: true }
  );
  const [count, setCount] = useState<{ pemilik: number; armada: number }>({
    pemilik: 0,
    armada: 0,
  });

  useEffect(() => {
    fetchAll();
  }, [isFocused]);

  const fetchAll = async (): Promise<void> => {
    setLoading({ pemilik: true, armada: true });
    await Promise.all([countPemilik(), countTransaction()]);
  };

  const countTransaction = async (): Promise<void> => {
    const response = await getAllTransaction({ status: "PENDING", size: 100 });
    if (response.status === "success") {
      const armadaCount = response.data.transactions.length;
      setCount((prev) => ({ ...prev, armada: armadaCount }));
    }
    setLoading((prev) => ({ ...prev, armada: false }));
  };

  const countPemilik = async (): Promise<void> => {
    const response = await getPemilik();
    if (response.status === "success") {
      const pemilikCount = response.data.length;
      setCount((prev) => ({ ...prev, pemilik: pemilikCount }));
    }
    setLoading((prev) => ({ ...prev, pemilik: false }));
  };
  return (
    <View style={styles.main}>
      {user?.role !== "MANDOR" && (
        <DashboardButton
          iconName="car-outline"
          title={`${count.armada} Armada`}
          subTitle="Perlu Divalidasi"
          style={styles.wrapper}
          onPress={() => route.push("/home/validasi")}
          loading={loading.armada}
        />
      )}
      <DashboardButton
        iconName="person-circle-outline"
        title={`${count.pemilik} Pemilik`}
        subTitle="Terdaftar"
        style={[styles.wrapper, { backgroundColor: colors.inactive }]}
        onPress={() => route.push("/home/pemilik")}
        loading={loading.pemilik}
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
