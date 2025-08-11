import { size } from "@/constants/SIze";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import DefaultInputButtons from "../buttons/DefaultInputButtons";
import DefaultPicker from "../pickers/DefaultPicker";
import DefaultTextInputs from "../textInputs/DefaultTextInputs";

type ValidasiFormProps = {
  satuan: string;
};

type TypeValidasiForm = {
  berat: number;
  status: string;
  harga: number;
  terbayar?: number;
};
const ValidasiForm = ({ satuan }: ValidasiFormProps) => {
  const [form, setForm] = useState<TypeValidasiForm>({
    berat: 0,
    status: "",
    harga: 0,
  });
  return (
    <View>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <DefaultTextInputs
            title="Berat"
            placeholder="Masukkan Berat"
            iconName="scale-outline"
          />
        </View>
        <View style={styles.hargaContainer}>
          <DefaultTextInputs
            title="Harga"
            placeholder="Harga"
            value={satuan}
            iconName="cube-outline"
            disable={true}
          />
        </View>
      </View>
      <DefaultPicker
        data={["Hutang", "Lunas", "Belum Dibayar"]}
        title="Status Pembayaran"
        onValueChange={(val) => setForm((prev) => ({ ...prev, status: val }))}
      />
      {form.status === "Hutang" && (
        <DefaultTextInputs
          title="Jumlah Terbayar"
          placeholder="Masukkan Jumlah Terbayar"
        />
      )}
      <DefaultInputButtons text="Validasi" style={styles.button} />
    </View>
  );
};

export default ValidasiForm;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  hargaContainer: {
    width: "40%",
  },
  button: {
    marginTop: size.md,
  },
});
