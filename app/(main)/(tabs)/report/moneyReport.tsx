import FilterButton from "@/components/buttons/FilterButton";
import TaskItem from "@/components/listItems/TaskItem";
import DefaultPicker from "@/components/pickers/DefaultPicker";
import { colors } from "@/constants/Colors";
import { size } from "@/constants/SIze";
import { GetAllTransactionParams } from "@/models/others/paginationModels";
import { PemilikModels } from "@/models/pemilik/pemilikModels";
import { Transaction } from "@/models/transactions/transactionModels";
import { getPemilik } from "@/services/private/pemilik-services";
import { getAllTransaction } from "@/services/private/transaction-services";
import { currency } from "@/utils/currency";
import { getYearMonth } from "@/utils/getYearMonth";
import { getMonthsFromNowToJanuary } from "@/utils/monthsBefore";
import { Ionicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

type TransactionReportTypes = {
  customer: string;
  month: string;
  totalDebt: string;
  totalPrice: string;
  transactions: Transaction[];
};
type PemilikType = {
  data: PemilikModels[];
  picker: string[];
};

const MoneyReport = () => {
  const months = [...getMonthsFromNowToJanuary()];
  const isFocused = useIsFocused();
  const tabBarHeight = useBottomTabBarHeight();
  const [pemilik, setPemilik] = useState<PemilikType>({
    data: [],
    picker: [],
  });

  const [filter, setFilter] = useState<GetAllTransactionParams>({
    month: undefined,
    customerName: undefined,
  });
  const [transaction, setTransaction] = useState<TransactionReportTypes>({
    customer: "",
    month: "",
    totalDebt: "",
    totalPrice: "",
    transactions: [],
  });

  const initialFetch = async () => {
    await Promise.all([
      fetchPemilik(),
      fetchTransactions({ cursor: undefined }),
    ]);
  };

  const fetchTransactions = async (params: GetAllTransactionParams) => {
    const response = await getAllTransaction(params);
    if (response.status === "success") {
      if (params.cursor === undefined) {
        setTransaction(response.data);
      } else {
        setTransaction((prev) => ({
          ...prev,
          transactions: [...prev.transactions, ...response.data.transactions],
        }));
      }
    }
  };

  const fetchPemilik = async () => {
    const response = await getPemilik();
    if (response.status === "success") {
      setPemilik({
        data: response.data,
        picker: response.data.map((item: PemilikModels) => item.name),
      });
    }
  };

  const monthHandler = (val: string | null) => {
    if (val) {
      const month = getYearMonth(val, new Date().getFullYear());
      setFilter((prev) => ({ ...prev, month }));
    } else {
      setFilter((prev) => ({ ...prev, month: undefined }));
    }
  };

  useEffect(() => {
    initialFetch();
  }, [isFocused]);

  useEffect(() => {
    fetchTransactions({ cursor: undefined, ...filter });
  }, [filter]);

  const renderItem = ({ item }: { item: Transaction }) => (
    <TaskItem item={item} />
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.itemHeaderContainer}>
        <View>
          <Text style={styles.textHighlight}>Pendapatan Bulan Ini</Text>
          <Text style={styles.textTitle}>
            {currency(transaction.totalPrice)}
          </Text>
        </View>
        <View>
          <Ionicons
            name="wallet-outline"
            size={size.xxl}
            color={colors.secondary}
          />
        </View>
      </View>

      <View style={styles.itemHeaderContainer}>
        <View>
          <Text style={styles.textHighlight}>Total Hutang Bulan Ini</Text>
          <Text style={styles.textTitle}>
            {currency(transaction.totalDebt)}
          </Text>
        </View>
        <View>
          <Ionicons
            name="card-outline"
            size={size.xxl}
            color={colors.secondary}
          />
        </View>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.textTitle}>Report Keuangan</Text>
        </View>
        <View style={styles.filterContainer}>
          <FilterButton data={months} onPress={(val) => monthHandler(val)} />
        </View>
        <DefaultPicker
          data={pemilik.picker}
          title="Pilih Pemilik"
          selectedValue={filter.customerName}
          onValueChange={(val) =>
            setFilter((prev) => ({
              ...prev,
              customerName: val ? val : undefined,
            }))
          }
        />
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={transaction.transactions}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: size.xs }} />}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={[
            styles.contentContainer,
            { paddingBottom: tabBarHeight },
          ]}
          onEndReachedThreshold={0.5}
          onEndReached={() =>
            fetchTransactions({
              cursor:
                transaction.transactions[transaction.transactions.length - 1]
                  ?.id,
              ...filter,
            })
          }
        />
      </View>
    </View>
  );
};

export default MoneyReport;

const styles = StyleSheet.create({
  headerContainer: {
    padding: size.md,
  },
  filterContainer: {
    marginBottom: size.sm,
  },
  textTitle: {
    fontSize: size.xxl,
    fontWeight: "bold",
    color: colors.captions,
  },
  itemHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: size.md,
    backgroundColor: colors.white,
    borderRadius: size.sm,
  },
  header: {
    marginBottom: size.md,
    gap: size.md,
  },
  textHighlight: {
    color: colors.captions,
    fontWeight: "400",
    fontSize: size.md,
  },
  contentContainer: {
    paddingHorizontal: size.md,
  },
});
