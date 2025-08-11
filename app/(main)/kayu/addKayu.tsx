import AddKayuForm from "@/components/forms/AddKayuForm";
import HeaderText from "@/components/texts/HeaderText";
import { colors } from "@/constants/Colors";
import { size } from "@/constants/SIze";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const AddKayu = () => {
  return (
    <View style={styles.main}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.content}>
          <HeaderText title="Tambah Jenis Kayu" icon="add-circle-outline" />
          <AddKayuForm />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddKayu;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  contentContainer: {
    padding: size.md,
  },
  content: {
    backgroundColor: colors.white,
    padding: size.md,
    borderRadius: size.sm,
  },
});
