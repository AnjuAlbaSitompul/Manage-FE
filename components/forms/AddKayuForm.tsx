import { size } from "@/constants/SIze";
import { satuanKayu } from "@/models/others/kayuModels";
import { CreateWoodModels, WoodModels } from "@/models/woods/woodmodels";
import { createWood } from "@/services/private/wood-services";
import { ValidationForm } from "@/utils/ValidationForm";
import { toastShow } from "@/utils/toastShow";
import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import * as Yup from "yup";
import DefaultInputButtons from "../buttons/DefaultInputButtons";
import DefaultPicker from "../pickers/DefaultPicker";
import DefaultTextInputs from "../textInputs/DefaultTextInputs";

const AddKayuForm = () => {
  const [formData, setFormData] = useState<CreateWoodModels>({
    name: "",
    price: "",
  });

  const schema = Yup.object().shape({
    name: Yup.string().required("Nama kayu harus diisi"),
    price: Yup.string().required("Harga kayu harus diisi"),
    unit: Yup.string().oneOf(satuanKayu, "Satuan kayu tidak valid"),
  });

  const createHandler = async (): Promise<void> => {
    const validate = await ValidationForm<CreateWoodModels>(formData, schema);
    if (Object.keys(validate).length > 0) {
      toastShow({ text: "Periksa kembali form anda", type: "error" });
      return;
    }

    const response = await createWood(formData);
    if (response.status === "success") {
      toastShow({
        text: response.message,
        type: "success",
      });
      setFormData({
        name: "",
        price: "",
      });
    } else {
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
          placeholder="Masukkan jenis kayu"
          title="Jenis Kayu"
          iconName="leaf-outline"
          value={formData.name}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, name: text }))
          }
        />
        <DefaultTextInputs
          placeholder="Masukkan harga kayu"
          title="Harga Kayu"
          iconName="pricetag-outline"
          value={formData.price}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, price: text }))
          }
          keyboardType="numeric"
        />
        <DefaultPicker
          title="Satuan"
          data={satuanKayu}
          selectedValue={formData.unit}
          onValueChange={(itemValue) =>
            setFormData((prev) => ({
              ...prev,
              unit: itemValue as WoodModels["unit"],
            }))
          }
        />
        <DefaultInputButtons text="Tambah" onPress={() => createHandler()} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddKayuForm;

const styles = StyleSheet.create({
  formContainer: {
    gap: size.md,
  },
});
