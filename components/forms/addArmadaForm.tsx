import { size } from "@/constants/SIze";
import React from "react";
import { StyleSheet, View } from "react-native";
import DefaultInputButtons from "../buttons/DefaultInputButtons";
import DefaultTextInputs from "../textInputs/DefaultTextInputs";

type AddArmadaFormProps = {
  onPress: (text: string) => void;
};
const AddArmadaForm = ({ onPress }: AddArmadaFormProps) => {
  const [nama, setNama] = React.useState<string>("");
  return (
    <View style={styles.main}>
      <DefaultTextInputs
        title="Nama Armada"
        iconName="car-outline"
        placeholder="Masukkan Nama Armada"
        value={nama}
        onChangeText={setNama}
      />
      <DefaultInputButtons text="Tambah Armada" onPress={() => onPress(nama)} />
    </View>
  );
};

export default AddArmadaForm;

const styles = StyleSheet.create({
  main: {
    marginTop: size.md,
    gap: size.sm,
  },
});
