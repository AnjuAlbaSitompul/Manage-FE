import { size } from "@/constants/SIze";
import { satuanKayu } from "@/models/others/kayuModels";
import { WoodModels } from "@/models/woods/woodmodels";
import { updateWood } from "@/services/private/wood-services";
import { toastShow } from "@/utils/toastShow";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import DefaultInputButtons from "../buttons/DefaultInputButtons";
import DefaultPicker from "../pickers/DefaultPicker";
import DefaultTextInputs from "../textInputs/DefaultTextInputs";

export type UpdateKayuForms = {
  name: string;
  price: string;
  unit: WoodModels["unit"];
  isActive: boolean;
};

const UpdateKayuForm = ({
  id,
  createdAt,
  updatedAt,
  ...otherProps
}: WoodModels) => {
  const [formData, setFormData] = useState<UpdateKayuForms>(otherProps);

  useEffect(() => {
    if (formData.name === "") {
      setFormData({ ...otherProps, isActive: true });
    }
  }, [formData, otherProps]);

  const onPressHandler = async () => {
    const response = await updateWood(id, formData);
    if (response.status === "success") {
      toastShow({
        text: response.message,
        type: "success",
      });
      setFormData({
        name: "",
        price: "",
        unit: "KG",
        isActive: true,
      });
    }
    if (response.status === "error") {
      toastShow({
        text: response.message,
        type: "error",
      });
    }
  };
  return (
    <KeyboardAvoidingView behavior="height">
      <View style={styles.formContainer}>
        <DefaultTextInputs
          placeholder="Masukkan Nama Kayu"
          iconName="pricetag-outline"
          title="Nama Kayu Terbaru"
          value={formData.name}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, name: text }))
          }
        />
        <DefaultTextInputs
          placeholder="Masukkan Harga Terbaru"
          iconName="pricetag-outline"
          title="Harga Kayu Terbaru"
          value={formData.price}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, price: text }))
          }
          keyboardType="numeric"
        />

        <DefaultPicker
          data={satuanKayu}
          title="Satuan Kayu Terbaru"
          onValueChange={(val) =>
            setFormData((prev) => ({
              ...prev,
              unit: val as WoodModels["unit"],
            }))
          }
        />
        <DefaultInputButtons text="Update" onPress={() => onPressHandler()} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default UpdateKayuForm;

const styles = StyleSheet.create({
  formContainer: {
    gap: size.md,
    paddingVertical: size.md,
  },
});
