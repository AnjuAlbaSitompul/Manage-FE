import FilterButton from "@/components/buttons/FilterButton";
import { reportKebun } from "@/services/private/kebun-services";
import { getMonthsFromNowToJanuary } from "@/utils/monthsBefore";
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { ReportParam } from "./vehicleReport";

import { colors } from "@/constants/Colors";
import { screenSize, size } from "@/constants/SIze";
import { getYearMonth } from "@/utils/getYearMonth";
import { Ionicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useIsFocused } from "@react-navigation/native";

type WoodTypes = {
  name: string;
  total: number;
};
type ReportWoodType = {
  name: string;
  woods: WoodTypes[];
};

const WoodReport = () => {
  const month = [...getMonthsFromNowToJanuary()];
  const bottomBar = useBottomTabBarHeight();
  const isFocused = useIsFocused();
  const [reports, setReports] = useState<ReportWoodType[]>([]);
  const [filter, setFilter] = useState<ReportParam>({
    month: undefined,
  });

  const fetchReport = async (params?: ReportParam) => {
    const response = await reportKebun(params);
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

  const renderItem = ({ item }: { item: ReportWoodType }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemHeaderContainer}>
          <View style={styles.itemIconContainer}>
            <Ionicons
              name="home-outline"
              size={size.xl}
              color={colors.secondary}
            />
          </View>
          <Text style={styles.textName}>{item.name}</Text>
        </View>
        <View style={styles.itemList}>
          <ScrollView
            contentContainerStyle={[
              styles.contentContainer,
              { gap: size.sm, paddingVertical: size.sm },
            ]}
          >
            {item.woods.map((wood) => (
              <View key={wood.name} style={styles.woodItem}>
                <View style={styles.woodItemIconContainer}>
                  <Ionicons
                    name="leaf-outline"
                    size={size.lg}
                    color={colors.secondary}
                  />
                </View>

                <View style={styles.woodTextContainer}>
                  <Text>{wood.name}</Text>
                  <Text style={styles.woodTotal}>{wood.total}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.titleText}>Laporan Kebun</Text>
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
          nestedScrollEnabled
        />
      </View>
    </View>
  );
};

export default WoodReport;

const styles = StyleSheet.create({
  headerContainer: {
    padding: size.md,
  },
  titleText: {
    fontSize: size.xxl,
    fontWeight: "bold",
    color: colors.captions,
  },
  contentContainer: {
    paddingHorizontal: size.md,
  },
  itemContainer: {
    backgroundColor: colors.white,
    borderRadius: size.md,
    padding: size.md,
    height: screenSize.width / 2,
  },
  itemHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemIconContainer: {
    paddingRight: size.sm,
  },
  textName: {
    fontSize: size.md,
    fontWeight: "400",
    color: colors.captions,
  },
  itemList: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: size.sm,
    marginTop: size.xs,
  },
  woodItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: size.sm,
    padding: size.sm,
  },
  woodItemIconContainer: {
    paddingRight: size.sm,
  },
  woodTextContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  woodTotal: {
    color: colors.white,
    padding: size.xs,
    backgroundColor: colors.secondary,
    borderRadius: size.xs,
  },
});
