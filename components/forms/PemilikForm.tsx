import { size } from "@/constants/SIze";
import React from "react";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import DefaultInputButtons from "../buttons/DefaultInputButtons";
import DefaultTextInputs from "../textInputs/DefaultTextInputs";

const PemilikForm = () => {
  return (
    <KeyboardAvoidingView behavior="height">
      <DefaultTextInputs
        title="Nama Pemilik"
        iconName="person-circle-outline"
        iconSize="lg"
        placeholder="Masukkan nama pemilik"
        style={styles.formControl}
      />
      <DefaultInputButtons text="Tambah Pemilik" style={styles.formControl} />
    </KeyboardAvoidingView>
  );
};

export default PemilikForm;

const styles = StyleSheet.create({
  formControl: {
    marginBottom: size.md,
  },
});
