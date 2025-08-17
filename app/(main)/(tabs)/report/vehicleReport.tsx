import FilterButton from "@/components/buttons/FilterButton";
import { colors } from "@/constants/Colors";
import { size } from "@/constants/SIze";
import { reportArmada } from "@/services/private/armada-services";
import { getYearMonth } from "@/utils/getYearMonth";
import { getMonthsFromNowToJanuary } from "@/utils/monthsBefore";
import { Ionicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export type ReportParam = {
  month?: string;
};

type VehiclesReportTypes = {
  name: string;
  total: number;
};
const VehicleReport = () => {
  const month = [...getMonthsFromNowToJanuary()];
  const isFocused = useIsFocused();
  const bottomBar = useBottomTabBarHeight();
  const [filter, setFilter] = useState<ReportParam>({
    month: undefined,
  });
  const [reports, setReports] = useState<VehiclesReportTypes[]>([]);

  const fetchReport = async (params?: ReportParam) => {
    const response = await reportArmada(params);
    if (response.status === "success") {
      setReports(response.data);
    }
  };

  const handlerFilter = (val: string | null) => {
    if (val) {
      const getMonth = getYearMonth(val, new Date().getFullYear());
      setFilter({ month: getMonth });
    } else {
      setFilter({ month: undefined });
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchReport();
    }
  }, [isFocused]);

  useEffect(() => {
    fetchReport(filter);
  }, [filter]);

  const renderItem = ({ item }: { item: VehiclesReportTypes }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemIconContainer}>
          <Ionicons
            name="bus-outline"
            color={colors.secondary}
            size={size.xl}
          />
        </View>
        <View style={styles.itemTextContainer}>
          <Text>{item.name}</Text>
          <View style={styles.totalContainer}>
            <Text style={styles.textTotal}>{item.total}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.titleText}>Laporan Armada</Text>
        </View>
        <View>
          <FilterButton data={month} onPress={(val) => handlerFilter(val)} />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={reports}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={{ height: size.md }} />}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={[
            styles.contentContainer,
            { paddingBottom: bottomBar },
          ]}
        />
      </View>
    </View>
  );
};

export default VehicleReport;

const styles = StyleSheet.create({
  headerContainer: {
    padding: size.md,
  },
  titleText: {
    fontSize: size.xxl,
    fontWeight: "bold",
    color: colors.captions,
  },
  itemContainer: {
    backgroundColor: colors.white,
    padding: size.md,
    borderRadius: size.md,
    flexDirection: "row",
    alignItems: "center",
  },
  itemIconContainer: {
    paddingRight: size.md,
  },
  itemTextContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalContainer: {
    backgroundColor: colors.secondary,
    padding: size.sm,
    borderRadius: size.sm,
  },
  contentContainer: {
    paddingHorizontal: size.md,
  },
  textTotal: {
    fontSize: size.md,
    fontWeight: "bold",
    color: colors.white,
  },
});
