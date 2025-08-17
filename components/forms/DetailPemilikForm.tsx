import { size } from "@/constants/SIze";
import { PemilikModels } from "@/models/pemilik/pemilikModels";
import { updatePemilik } from "@/services/private/pemilik-services";
import { dateToIndonesianString } from "@/utils/dateTranslate";
import { toastShow } from "@/utils/toastShow";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import DefaultInputButtons from "../buttons/DefaultInputButtons";
import EditTextInputs from "../textInputs/EditTextInputs";

const DetailPemilikForm = ({ ...props }: PemilikModels) => {
  const router = useRouter();
  const [data, setData] = useState<PemilikModels>(props);

  const handleUpdate = async () => {
    const response = await updatePemilik(data);
    if (response.status === "success") {
      toastShow({
        text: "Data pemilik berhasil diperbarui",
        type: "success",
      });
    } else {
      toastShow({
        text: "Gagal memperbarui data pemilik",
        type: "error",
      });
    }
    router.back();
  };

  const handleActive = async () => {
    const response = await updatePemilik({ ...data, isActive: true });
    if (response.status === "success") {
      toastShow({
        text: "Data pemilik berhasil diaktifkan",
        type: "success",
      });
    } else {
      toastShow({
        text: "Gagal mengaktifkan data pemilik",
        type: "error",
      });
    }
    router.back();
  };
  return (
    <View style={styles.formControl}>
      <EditTextInputs
        title="Nama Pemilik"
        value={data.name}
        iconName="person-outline"
        onChangeText={(text) => setData({ ...data, name: text })}
        onPress={() => handleUpdate()}
        editable={props.isActive}
      />

      {data.createdAt && (
        <EditTextInputs
          title="Tanggal Dibuat"
          value={dateToIndonesianString(new Date(data.createdAt))}
          iconName="calendar-outline"
          editable={false}
        />
      )}
      {data.updatedAt && (
        <EditTextInputs
          title="Tanggal Diupdate"
          value={dateToIndonesianString(new Date(data.updatedAt))}
          iconName="calendar-outline"
          editable={false}
        />
      )}
      {!data.isActive && (
        <DefaultInputButtons text={"Aktifkan"} onPress={() => handleActive()} />
      )}
    </View>
  );
};

export default DetailPemilikForm;

const styles = StyleSheet.create({
  formControl: {
    gap: size.sm,
  },
});
