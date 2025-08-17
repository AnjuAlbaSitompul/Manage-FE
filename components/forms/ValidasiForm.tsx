import { screenSize, size } from "@/constants/SIze";
import { Transaction } from "@/models/transactions/transactionModels";
import { validateTransaction } from "@/services/private/transaction-services";
import { currency } from "@/utils/currency";
import { toastShow } from "@/utils/toastShow";
import { validateObject } from "@/utils/validateObject";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DefaultInputButtons from "../buttons/DefaultInputButtons";
import DefaultPicker from "../pickers/DefaultPicker";
import DefaultTextInputs from "../textInputs/DefaultTextInputs";

export type TypeValidasiForm = {
  woodUnitsqty: number;
  type?: "LUNAS" | "UTANG" | "BELUM_DIBAYAR";
  totalPrice: string;
  totalPaid: string;
};
const ValidasiForm = (data: Transaction) => {
  const countPrice = () => {
    if (data.wood.price && data.wood.unit) {
      if (data.wood.unit === "BATANG") {
        setForm((prev) => ({
          ...prev,
          totalPrice: (
            parseInt(data.wood.price) * data.wood.piecesQty
          ).toString(),
          woodUnitsqty: data.wood.piecesQty,
        }));
      }
      if (data.wood.unit === "KENDARAAN") {
        setForm((prev) => ({
          ...prev,
          totalPrice: data.wood.price,
          woodUnitsqty: 1,
        }));
      }
    }
  };
  const [form, setForm] = useState<TypeValidasiForm>({
    woodUnitsqty: 0,
    totalPrice: "",
    totalPaid: "",
    type: undefined,
  });

  const handlerBerat = (val: string) => {
    setForm((prev) => ({
      ...prev,
      woodUnitsqty: val === "" ? 0 : parseInt(val),
      type: undefined,
    }));
    if (data.wood.unit === "KG") {
      setForm((prev) => ({
        ...prev,
        totalPrice: (parseInt(data.wood.price) * parseInt(val)).toString(),
      }));
    }
  };

  const pickerHandler = (val: string) => {
    if (val === "LUNAS") {
      setForm((prev) => ({ ...prev, totalPaid: form.totalPrice }));
    }
    if (val === "BELUM_DIBAYAR") {
      setForm((prev) => ({ ...prev, totalPaid: "0" }));
    }
    if (val === "UTANG") {
      setForm((prev) => ({ ...prev, totalPaid: "" }));
    }
    setForm((prev) => ({
      ...prev,
      type: val as TypeValidasiForm["type"],
    }));
  };

  const totalPaidHandler = (val: string) => {
    if (form.totalPrice === "") {
      toastShow({ text: "Harga Belum Ditentukan", type: "error" });
    }
    if (parseInt(val) > parseInt(form.totalPrice)) {
      toastShow({
        text: "Jumlah Terbayar Tidak Boleh Lebih Besar dari Total Harga",
        type: "error",
      });
      return;
    }
    setForm((prev) => ({ ...prev, totalPaid: val }));
  };

  const validateData = async (): Promise<void> => {
    const validate = validateObject(form);
    if (!validate) {
      toastShow({ text: "Harap Isi Form Dengan Benar", type: "error" });
      return;
    }
    const response = await validateTransaction(form, data.id);
    if (response.status === "error") {
      toastShow({ text: response.message, type: "error" });
      return;
    }
    toastShow({ text: "Validasi Berhasil", type: "success" });
    setForm({
      woodUnitsqty: 0,
      totalPrice: "",
      totalPaid: "",
      type: undefined,
    });
    router.back();
  };

  useEffect(() => {
    countPrice();
  }, [data]);

  return (
    <View>
      <View style={styles.container}>
        {data.wood.unit === "KG" && (
          <View style={styles.beratContainer}>
            <DefaultTextInputs
              title="Berat"
              placeholder="Masukkan Berat"
              iconName="scale-outline"
              value={form.woodUnitsqty.toString()}
              onChangeText={(val) => handlerBerat(val)}
              keyboardType="numeric"
            />
          </View>
        )}
        <View style={styles.hargaContainer}>
          <DefaultTextInputs
            title="Satuan"
            placeholder="Satuan"
            value={data.wood.unit}
            iconName="cube-outline"
            disable={true}
          />
        </View>
      </View>
      {form.totalPrice && (
        <View>
          <Text>Harga: {currency(form.totalPrice)}</Text>
        </View>
      )}
      {form.woodUnitsqty !== 0 && (
        <DefaultPicker
          data={["LUNAS", "UTANG", "BELUM_DIBAYAR"]}
          title="Status Pembayaran"
          onValueChange={(val) => pickerHandler(val)}
          selectedValue={form.type}
        />
      )}
      {form.type === "UTANG" && (
        <DefaultTextInputs
          title="Jumlah Terbayar"
          placeholder="Masukkan Jumlah Terbayar"
          value={form.totalPaid}
          onChangeText={(val) => totalPaidHandler(val)}
          keyboardType="numeric"
        />
      )}
      <DefaultInputButtons
        text="SIMPAN"
        style={styles.button}
        onPress={() => validateData()}
      />
    </View>
  );
};

export default ValidasiForm;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  hargaContainer: {
    flex: 1,
    marginLeft: size.sm,
  },
  button: {
    marginTop: size.md,
  },
  beratContainer: {
    width: screenSize.width / 2.5,
  },
});
