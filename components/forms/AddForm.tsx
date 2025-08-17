import { size } from "@/constants/SIze";
import { ArmadaModels } from "@/models/armadas/armadaModels";
import { KebunModels } from "@/models/kebuns/kebunModels";
import { PemilikModels } from "@/models/pemilik/pemilikModels";
import { TransactionCreate } from "@/models/transactions/transactionModels";
import { WoodModels } from "@/models/woods/woodmodels";
import { getArmadas } from "@/services/private/armada-services";
import { getKebuns } from "@/services/private/kebun-services";
import { getPemilik } from "@/services/private/pemilik-services";
import { createTransaction } from "@/services/private/transaction-services";
import { formDataHandler } from "@/utils/formDataHandler";
import { imagePicker } from "@/utils/imagePicker";
import { toastShow } from "@/utils/toastShow";
import { validateObject } from "@/utils/validateObject";
import { useIsFocused } from "@react-navigation/native";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import DefaultInputButtons from "../buttons/DefaultInputButtons";
import PickerCameraButton from "../buttons/PickerCameraButton";
import Loading from "../loading/Loading";
import DefaultPicker from "../pickers/DefaultPicker";
import DefaultTextInputs from "../textInputs/DefaultTextInputs";

export type AddFormTypes = {
  pemilik: string;
  kebun: string;
  armada: string;
  jenisKayu: string;
};

type DataKebun = {
  data: KebunModels<WoodModels[]>[];
  picker: string[];
};

type DataVehicle = {
  data: ArmadaModels[];
  picker: string[];
};

type DataCostumer = {
  data: PemilikModels[];
  picker: string[];
};

type DataWood = {
  data: WoodModels[];
  picker: string[];
};

const AddForm = () => {
  const isFocused = useIsFocused();
  const [dataKebun, setDataKebun] = useState<DataKebun>({
    data: [],
    picker: [],
  });
  const [dataVehicle, setDataVehicle] = useState<DataVehicle>({
    data: [],
    picker: [],
  });
  const [dataCostumer, setDataCostumer] = useState<DataCostumer>({
    data: [],
    picker: [],
  });
  const [woods, setWoods] = useState<DataWood>({
    data: [],
    picker: [],
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<TransactionCreate>({
    gardenId: "",
    customerId: "",
    vehicleId: "",
    woodId: "",
    vehicleNumber: "",
    woodPiecesQty: "",
    media: undefined,
  });
  const [formData, setFormData] = React.useState<AddFormTypes>({
    pemilik: "",
    kebun: "",
    armada: "",
    jenisKayu: "",
  });

  useEffect(() => {
    if (isFocused) {
      setForm({
        gardenId: "",
        customerId: "",
        vehicleId: "",
        woodId: "",
        vehicleNumber: "",
        woodPiecesQty: "",
        media: undefined,
      });
      fetchNeededData();
    }
  }, [isFocused]);

  const fetchNeededData = async (): Promise<void> => {
    setLoading(true);
    await Promise.all([fetchKebun(), fetchVehicle(), fetchCostumer()]);
    setLoading(false);
  };

  const launchCameraHandler = async () => {
    const result = await imagePicker();
    setForm((prev) => ({ ...prev, media: result }));
  };

  const fetchKebun = async (): Promise<void> => {
    const response = await getKebuns();
    setDataKebun({
      data: response.data,
      picker: response.data.map(
        (item: KebunModels<any>) => item.name as string
      ),
    });
  };

  const fetchVehicle = async (): Promise<void> => {
    const response = await getArmadas();
    setDataVehicle({
      data: response.data,
      picker: response.data.map((item: ArmadaModels) => item.name as string),
    });
  };

  const fetchCostumer = async (): Promise<void> => {
    const response = await getPemilik();
    setDataCostumer({
      data: response.data,
      picker: response.data.map((item: PemilikModels) => item.name as string),
    });
  };

  const onChangeKebunHandler = (value: string) => {
    const selectedKebun: KebunModels<any> | undefined = dataKebun.data.find(
      (item) => item.name === value
    );
    if (selectedKebun) {
      setForm((prev) => ({ ...prev, gardenId: selectedKebun.id }));
    }
    setWoods({
      data: [...(selectedKebun?.woods || [])],
      picker: selectedKebun
        ? selectedKebun.woods.map((item) => item.name as string)
        : [],
    });
  };

  const handleSubmit = async () => {
    const validate = validateObject(form);
    if (!validate) {
      toastShow({ type: "error", text: "Harap Masukkan Form Dengan Benar" });
      return;
    }
    const formData = await formDataHandler(form);
    const response = await createTransaction(formData);
    if (response.status === "success") {
      toastShow({ type: "success", text: "Transaksi Berhasil Dibuat" });
      router.back();
    }

    if (response.status === "error") {
      toastShow({ type: "error", text: response.message });
    }
  };

  const handlerWood = (val: string) => {
    const getWood = woods.data.find(
      (item) => item.id.toString() === form.woodId
    );
    if (parseInt(val) > (getWood?.quantity || 0)) {
      toastShow({ type: "error", text: "Jumlah kayu melebihi stok" });
      return;
    }
    setForm((prev) => ({ ...prev, woodPiecesQty: val }));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Loading />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView>
      <DefaultPicker
        data={dataKebun.picker}
        onValueChange={(value) => onChangeKebunHandler(value)}
        iconName="leaf-outline"
        style={styles.formControl}
        title="Pilih Kebun"
        selectedValue={form.gardenId}
      />
      <DefaultPicker
        data={dataCostumer.picker}
        onValueChange={(value) => {
          const selectedCostumer = dataCostumer.data.find(
            (item) => item.name === value
          );
          if (selectedCostumer) {
            setForm((prev) => ({
              ...prev,
              customerId: selectedCostumer.id.toString(),
            }));
          }
        }}
        iconName="person-add-outline"
        style={styles.formControl}
        title="Pilih Pemilik"
      />
      <DefaultPicker
        data={dataVehicle.picker}
        onValueChange={(value) => {
          const selectedVehicle = dataVehicle.data.find(
            (item) => item.name === value
          );
          if (selectedVehicle) {
            setForm((prev) => ({
              ...prev,
              vehicleId: selectedVehicle.id,
            }));
          }
        }}
        style={styles.formControl}
        iconName="car"
        title="Pilih Armada"
      />
      <DefaultTextInputs
        title="No Plat"
        iconName="pricetag-outline"
        placeholder="Masukkan no plat"
        style={styles.formControl}
        value={form?.vehicleNumber}
        onChangeText={(value) =>
          setForm((prev) => ({ ...prev, vehicleNumber: value }))
        }
      />
      <DefaultPicker
        data={woods.picker}
        onValueChange={(value) => {
          const selectedWood = woods.data.find((item) => item.name === value);
          if (selectedWood) {
            setForm((prev) => ({
              ...prev,
              woodId: selectedWood.id.toString(),
            }));
          }
        }}
        style={styles.formControl}
        iconName="leaf-outline"
        title="Pilih Jenis Kayu"
      />
      <DefaultTextInputs
        title="Jumlah"
        iconName="pricetag-outline"
        placeholder="Masukkan Jumlah Kayu"
        style={styles.formControl}
        value={form?.woodPiecesQty}
        onChangeText={(value) => handlerWood(value)}
        keyboardType="numeric"
      />
      <PickerCameraButton
        style={styles.formControl}
        onPress={() => launchCameraHandler()}
        image={form.media?.uri}
        onClosePress={() => setForm((prev) => ({ ...prev, media: undefined }))}
      />
      <DefaultInputButtons text="Simpan" onPress={() => handleSubmit()} />
    </KeyboardAvoidingView>
  );
};

export default AddForm;

const styles = StyleSheet.create({
  formControl: {
    marginBottom: size.md,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
