import { size } from "@/constants/SIze";
import { createPemilik } from "@/services/private/pemilik-services";
import { toastShow } from "@/utils/toastShow";
import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import DefaultInputButtons from "../buttons/DefaultInputButtons";
import DefaultTextInputs from "../textInputs/DefaultTextInputs";

type PemilikFormProps = {
  refresh: () => void;
};
const PemilikForm = ({ refresh }: PemilikFormProps) => {
  const [name, setName] = useState<string>("");
  const onCreateHandler = async (): Promise<void> => {
    if (!name.trim()) {
      toastShow({ type: "error", text: "Nama pemilik tidak boleh kosong" });
      return;
    }
    const response = await createPemilik(name);
    if (response.status === "success") {
      toastShow({ type: "success", text: "Pemilik created successfully" });
      setName("");
      refresh();
    } else {
      toastShow({ type: "error", text: response.message });
    }
  };
  return (
    <KeyboardAvoidingView behavior="height">
      <DefaultTextInputs
        title="Nama Pemilik"
        iconName="person-circle-outline"
        iconSize="lg"
        placeholder="Masukkan nama pemilik"
        style={styles.formControl}
        value={name}
        onChangeText={setName}
      />
      <DefaultInputButtons
        text="Tambah Pemilik"
        style={styles.formControl}
        onPress={() => onCreateHandler()}
      />
    </KeyboardAvoidingView>
  );
};

export default PemilikForm;

const styles = StyleSheet.create({
  formControl: {
    marginBottom: size.md,
  },
});
