import TaskItem from "@/components/listItems/TaskItem";
import DefaultPicker from "@/components/pickers/DefaultPicker";
import { colors } from "@/constants/Colors";
import { size } from "@/constants/SIze";
import { KebunModels } from "@/models/kebuns/kebunModels";
import { GetAllTransactionParams } from "@/models/others/paginationModels";
import { Transaction } from "@/models/transactions/transactionModels";
import { WoodModels } from "@/models/woods/woodmodels";
import { getKebuns } from "@/services/private/kebun-services";
import { getAllTransaction } from "@/services/private/transaction-services";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const Validasi = () => {
  const isFocused = useIsFocused();
  const [pagination, setPagination] = useState<GetAllTransactionParams>({
    size: 10,
    status: "PENDING",
    gardenName: undefined,
    cursor: undefined,
  });
  const [endReached, setEndReached] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [kebun, setKebun] = useState<{
    data: KebunModels<WoodModels[]>[];
    picker: string[];
  }>({ data: [], picker: [] });

  const fetchKebun = async (): Promise<void> => {
    const response = await getKebuns();
    if (response.status === "success") {
      setKebun({
        data: response.data,
        picker: response.data.map(
          (item: KebunModels<WoodModels[]>) => item.name
        ),
      });
    }
  };

  const fetchTransactions = async (params?: GetAllTransactionParams) => {
    if (!endReached) {
      const response = await getAllTransaction(params);
      console.log(response.data);
      if (response.status === "success") {
        setTransactions((prev) => [...prev, ...response.data.transactions]);
        setEndReached(response.data.transactions.length < 10);
        setPagination((prev) => ({
          ...prev,
          cursor: response.data.transactions.length
            ? response.data.transactions[response.data.transactions.length - 1]
                .id
            : undefined,
        }));
      }
    }
  };

  useEffect(() => {
    if (pagination.gardenName) {
      fetchTransactions(pagination);
    }
  }, [pagination]);

  useEffect(() => {
    if (isFocused) {
      fetchKebun();
    }
  }, [isFocused]);

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
        <DefaultPicker
          title="Pilih Kebun"
          data={kebun.picker}
          iconName="leaf-outline"
          iconSize="lg"
          onValueChange={(value) =>
            setPagination({ ...pagination, gardenName: value })
          }
          selectedValue={pagination.gardenName}
        />
      </View>
    );
  };
  const renderItem = ({ item }: { item: Transaction }) => {
    return (
      <TaskItem item={item} refresh={() => fetchTransactions(pagination)} />
    );
  };
  return (
    <View>
      <FlatList
        data={transactions}
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
    marginBottom: size.md,
  },
  headerText: {
    fontSize: size.lg,
    fontWeight: "bold",
  },
  header: {
    marginBottom: size.sm,
  },
});
