import { colors } from "@/constants/Colors";
import { size } from "@/constants/SIze";
import {
  Transaction,
  TransactionUpdateDebt,
} from "@/models/transactions/transactionModels";
import { updateDebtTransaction } from "@/services/private/transaction-services";
import { currency } from "@/utils/currency";
import { toastShow } from "@/utils/toastShow";
import { validateObject } from "@/utils/validateObject";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import DefaultInputButtons from "../buttons/DefaultInputButtons";
import DefaultTextInputs from "../textInputs/DefaultTextInputs";

const DebtForm = (data?: Transaction) => {
  const [dataToSend, setDataToSend] = useState<TransactionUpdateDebt>({
    totalPaid: "",
    type: data?.type as TransactionUpdateDebt["type"],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<string>("");
  const router = useRouter();
  const valueHandler = (val: string) => {
    if (data?.totalPrice) {
      if (
        parseInt(val) + parseInt(data?.totalPaid) >
        parseInt(data?.totalPrice)
      ) {
        toastShow({ text: "Total paid exceeds total price", type: "error" });
        return;
      }
      setForm(val);
      setDataToSend((prev) => ({
        ...prev,
        totalPaid: (parseInt(data?.totalPaid) + parseInt(val)).toString(),
      }));
      if (
        parseInt(data?.totalPaid) + parseInt(val) ===
        parseInt(data?.totalPrice)
      ) {
        setDataToSend((prev) => ({
          ...prev,
          type: "LUNAS",
        }));
      } else {
        setDataToSend((prev) => ({
          ...prev,
          type: "UTANG",
        }));
      }
    }
  };

  const handleDebt = async () => {
    setLoading(true);
    const validate = validateObject(dataToSend);
    if (!validate) {
      toastShow({ text: "Invalid data", type: "error" });
      return;
    }

    const response = await updateDebtTransaction(dataToSend, data?.id);
    if (response.status === "success") {
      toastShow({ text: "Debt updated successfully", type: "success" });
      setForm("");
      setDataToSend({
        totalPaid: "",
        type: "UTANG",
      });
      router.back();
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView behavior="position">
      <View style={styles.container}>
        <DefaultTextInputs
          title="Debt Amount"
          placeholder="Enter debt amount"
          iconName="pricetag-outline"
          keyboardType="numeric"
          value={form}
          onChangeText={(val) => valueHandler(val)}
        />
        <Text style={styles.text}>
          Terbayar: {currency(data?.totalPaid)} / {currency(data?.totalPrice)}
        </Text>
        <DefaultInputButtons
          text="SIMPAN"
          onPress={() => handleDebt()}
          loading={loading}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default DebtForm;

const styles = StyleSheet.create({
  container: {
    gap: size.sm,
    marginTop: size.md,
  },
  text: {
    fontSize: size.sm,
    color: colors.captions,
    fontWeight: "300",
  },
});
