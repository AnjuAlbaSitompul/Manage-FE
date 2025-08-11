import { colors } from "@/constants/Colors";
import { size } from "@/constants/SIze";
import { woodType } from "@/models/kebuns/kebunModels";
import { WoodModels } from "@/models/woods/woodmodels";
import { getWoods } from "@/services/private/wood-services";
import { toastShow } from "@/utils/toastShow";
import { validateObject } from "@/utils/validateObject";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import IconButtons from "../buttons/IconButtons";
import Loading from "../loading/Loading";
import DefaultPicker from "../pickers/DefaultPicker";
import DefaultTextInputs from "../textInputs/DefaultTextInputs";

type AddKebunFormProps = {
  addWood: (wood: woodType) => void;
  namaKebun: string;
  setNamaKebun: (nama: string) => void;
};

const AddKebunForm = ({
  addWood,
  namaKebun,
  setNamaKebun,
}: AddKebunFormProps) => {
  const isFocused = useIsFocused();
  const [wood, setWood] = useState<woodType>({
    woodId: "",
    quantity: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const [woods, setWoods] = useState<WoodModels[]>([]);
  const [jenis, setJenis] = useState<string[]>([]);

  const getWoodsData = async (): Promise<void> => {
    setLoading(true);
    const response = await getWoods();
    if (response.status === "success") {
      setWoods(response.data);
      setJenis(response.data.map((wood: WoodModels) => wood.name));
    }
    if (response.status === "error") {
      toastShow({ text: response.message, type: "error" });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isFocused) {
      getWoodsData();
    }
  }, [isFocused]);

  const onPressHandler = () => {
    console.log(wood);
    const isValid = validateObject(wood);
    if (!isValid) {
      toastShow({ text: "Mohon Isi Terlebih Dahulu", type: "error" });
      return;
    }
    addWood(wood);
    setWood({ quantity: 0, woodId: "" });
  };

  const pickerHandler = (value: string) => {
    const selectedWood = woods.find((wood) => wood.name === value);
    if (selectedWood) {
      setWood((prev) => ({ ...prev, woodId: selectedWood.id, name: value }));
    }
  };

  const jumlahHandler = (value: string) => {
    setWood((prev) => ({ ...prev, quantity: Number(value) }));
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Loading />
      </View>
    );
  }
  return (
    <KeyboardAvoidingView behavior="height">
      <View style={styles.formContainer}>
        <DefaultTextInputs
          title="Nama Kebun"
          iconName="leaf-outline"
          placeholder="Masukkan Nama Kebun"
          value={namaKebun}
          onChangeText={setNamaKebun}
        />
        <View style={styles.formWrapper}>
          <View style={{ flex: 1 }}>
            <DefaultPicker
              data={jenis}
              title="Jenis Kayu"
              onValueChange={(val) => pickerHandler(val)}
            />
            <DefaultTextInputs
              title="Jumlah Kayu"
              placeholder="Masukkan Jumlah Kayu"
              iconName="pricetag-outline"
              keyboardType="numeric"
              onChangeText={(val) => jumlahHandler(val)}
              value={wood.quantity.toString()}
            />
          </View>
          <View>
            <IconButtons
              iconName="add-circle-outline"
              iconColor="white"
              style={styles.button}
              onPress={() => onPressHandler()}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddKebunForm;

const styles = StyleSheet.create({
  formContainer: {
    marginTop: size.sm,
    gap: size.sm,
  },
  formWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: size.sm,
  },
  button: {
    padding: size.sm,
    backgroundColor: colors.secondary,
    overflow: "hidden",
  },
});
