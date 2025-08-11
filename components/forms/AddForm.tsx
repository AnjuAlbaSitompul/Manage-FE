import { size } from "@/constants/SIze";
import { imagePicker } from "@/utils/imagePicker";
import React from "react";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import DefaultInputButtons from "../buttons/DefaultInputButtons";
import PickerCameraButton from "../buttons/PickerCameraButton";
import DefaultPicker from "../pickers/DefaultPicker";
import DefaultTextInputs from "../textInputs/DefaultTextInputs";

export type AddFormTypes = {
  pemilik: string;
  kebun: string;
  armada: string;
  bk: string;
  jenisKayu: string;
  jumlahKayu: number;
  gambar: string | undefined;
};

const AddForm = () => {
  const [formData, setFormData] = React.useState<AddFormTypes>({
    pemilik: "",
    kebun: "",
    armada: "",
    bk: "",
    jenisKayu: "",
    jumlahKayu: 0,
    gambar: undefined,
  });

  const launchCameraHandler = async () => {
    const result = await imagePicker();
    setFormData((prev) => ({ ...prev, gambar: result }));
  };

  return (
    <KeyboardAvoidingView>
      <DefaultPicker
        data={["Option 1", "Option 2", "Option 3"]}
        onValueChange={(value) => console.log(value)}
        iconName="leaf-outline"
        style={styles.formControl}
        title="Pilih Kebun"
      />
      <DefaultPicker
        data={["Option 1", "Option 2", "Option 3"]}
        onValueChange={(value) => console.log(value)}
        iconName="person-add-outline"
        style={styles.formControl}
        title="Pilih Pemilik"
      />
      <DefaultPicker
        data={["Option 1", "Option 2", "Option 3"]}
        onValueChange={(value) => console.log(value)}
        style={styles.formControl}
        iconName="car"
        title="Pilih Armada"
      />
      <DefaultTextInputs
        title="No Plat"
        iconName="pricetag-outline"
        placeholder="Masukkan no plat"
        style={styles.formControl}
      />
      <DefaultPicker
        data={["Option 1", "Option 2", "Option 3"]}
        onValueChange={(value) => console.log(value)}
        style={styles.formControl}
        iconName="leaf-outline"
        title="Pilih Jenis Kayu"
      />
      <DefaultTextInputs
        title="Jumlah"
        iconName="pricetag-outline"
        placeholder="Masukkan Jumlah Kayu"
        style={styles.formControl}
      />
      <PickerCameraButton
        style={styles.formControl}
        onPress={() => launchCameraHandler()}
        image={formData.gambar}
        onClosePress={() =>
          setFormData((prev) => ({ ...prev, gambar: undefined }))
        }
      />
      <DefaultInputButtons
        text="Simpan"
        onPress={() => console.log(formData)}
      />
    </KeyboardAvoidingView>
  );
};

export default AddForm;

const styles = StyleSheet.create({
  formControl: {
    marginBottom: size.md,
  },
});
