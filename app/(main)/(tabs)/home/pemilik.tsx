import IconButtons from "@/components/buttons/IconButtons";
import PemilikForm from "@/components/forms/PemilikForm";
import { colors } from "@/constants/Colors";
import { dummyPemilik, DummyPemilikType } from "@/constants/Dummy";
import { size } from "@/constants/SIze";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { FlatList } from "react-native-gesture-handler";

const Pemilik = () => {
  const header = () => (
    <>
      <PemilikForm />
    </>
  );
  const renderItem = ({ item }: { item: DummyPemilikType }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemIconWrapper}>
        <Ionicons name="person" size={24} color={colors.secondary} />
      </View>
      <View style={styles.itemTextWrapper}>
        <Text>{item.nama}</Text>
        <View style={styles.transaksiWrapper}>
          <Text style={styles.transaksiText}>{item.jumlahTransaksi}</Text>
        </View>
      </View>
      <View style={styles.itemOptionsWrapper}>
        {item.jumlahTransaksi === 0 && (
          <IconButtons iconName="trash" iconSize="lg" iconColor="error" />
        )}
        <IconButtons iconName="pencil" iconSize="lg" iconColor="secondary" />
      </View>
    </View>
  );
  return (
    <View style={styles.main}>
      <FlatList
        data={dummyPemilik}
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
  contentContainer: {
    padding: size.md,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    padding: size.xs,
    borderRadius: size.sm,
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
});
