import FilterButton from "@/components/buttons/FilterButton";
import TaskItem from "@/components/listItems/TaskItem";
import TaskCard from "@/components/screensComponents/homeScreen/TaskCard";
import UserCard from "@/components/screensComponents/homeScreen/UserCard";
import { colors } from "@/constants/Colors";
import { size } from "@/constants/SIze";
import { GetAllTransactionParams } from "@/models/others/paginationModels";
import { Transaction } from "@/models/transactions/transactionModels";
import { getAllTransaction } from "@/services/private/transaction-services";
import { dateToIndonesianString } from "@/utils/dateTranslate";
import { getYearMonth } from "@/utils/getYearMonth";
import { getMonthsFromNowToJanuary } from "@/utils/monthsBefore";
import { toastShow } from "@/utils/toastShow";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const Main = () => {
  const isFocused = useIsFocused();
  const [transaction, setTransactions] = useState<Transaction[]>([]);
  const [pagination, setPagination] = useState<GetAllTransactionParams>({
    cursor: undefined,
    size: 10,
  });
  const [endReached, setEndReached] = useState<boolean>(false);
  const months = [...getMonthsFromNowToJanuary()];

  useEffect(() => {
    if (isFocused) {
      fetchTransaction();
    } else {
      setTransactions([]);
    }
  }, [isFocused]);

  const filterHandler = (item: string | null) => {
    if (item) {
      const month = getYearMonth(item, new Date().getFullYear());
      fetchTransaction({ cursor: undefined, month });
    } else {
      fetchTransaction({ cursor: undefined });
    }
  };

  const fetchTransaction = async (params?: GetAllTransactionParams) => {
    const response = await getAllTransaction(params);

    if (response.status === "success") {
      setPagination((prev) => ({
        ...prev,
        cursor:
          response.data.transactions[response.data.transactions.length - 1]?.id,
      }));
      setTransactions((prev) =>
        params?.cursor
          ? [...prev, ...response.data.transactions]
          : response.data.transactions
      );
      setEndReached(response.data.transactions.length < 10);
    }
    if (response.status === "error") {
      toastShow({ text: response.message, type: "error" });
    }
  };

  const onEndReachHandler = useCallback(() => {
    if (!endReached && pagination.cursor) {
      fetchTransaction(pagination);
    }
  }, [endReached, pagination]);
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
        <FilterButton data={months} onPress={(item) => filterHandler(item)} />
      </View>
    );
  };

  const RenderItem = ({ item }: { item: Transaction }) => {
    return <TaskItem item={item} refresh={() => fetchTransaction()} />;
  };

  return (
    <View style={styles.main}>
      <FlatList
        data={transaction}
        renderItem={RenderItem}
        contentContainerStyle={styles.contentContainer}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={renderHeader}
        ItemSeparatorComponent={() => <View style={{ height: size.xs }} />}
        onEndReachedThreshold={0.5}
        onEndReached={() => onEndReachHandler()}
      />
    </View>
  );
};

export default Main;

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
    marginTop: size.md,
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
