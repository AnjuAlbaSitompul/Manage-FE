import DefaultInputButtons from "@/components/buttons/DefaultInputButtons";
import IconButtons from "@/components/buttons/IconButtons";
import AddKebunForm from "@/components/forms/AddKebunForm";
import Loading from "@/components/loading/Loading";
import HeaderText from "@/components/texts/HeaderText";
import { colors } from "@/constants/Colors";
import { size } from "@/constants/SIze";
import { KebunCreateType, woodType } from "@/models/kebuns/kebunModels";
import { createKebun } from "@/services/private/kebun-services";
import { toastShow } from "@/utils/toastShow";
import { ValidationForm } from "@/utils/ValidationForm";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import * as Yup from "yup";

const AddKebun = () => {
  const [kebun, setKebun] = useState<KebunCreateType>({
    name: "",
    woods: [],
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleDeleteWood = (index: number) => {
    setKebun((prev) => ({
      ...prev,
      woods: prev.woods.filter((_, i) => i !== index),
    }));
  };

  const schema = Yup.object().shape({
    name: Yup.string().required("Nama kebun harus diisi"),
    woods: Yup.array()
      .of(
        Yup.object().shape({
          quantity: Yup.string().required("Jumlah kayu harus diisi"),
          woodId: Yup.string().required("ID kayu harus diisi"),
        })
      )
      .min(1, "Minimal satu jenis kayu harus ditambahkan"),
  });

  const onCreateHandler = async (): Promise<void> => {
    const woodsWithoutName = kebun.woods.map(({ name, ...rest }) => rest);
    const kebunWithWoods = { ...kebun, woods: woodsWithoutName };
    console.log(kebunWithWoods);
    setLoading(true);
    const validate = await ValidationForm<KebunCreateType>(
      kebunWithWoods,
      schema
    );
    if (Object.keys(validate).length > 0) {
      toastShow({
        text: "Pastikan semua field terisi dengan benar",
        type: "error",
      });
      return;
    }
    const response = await createKebun(kebunWithWoods);
    if (response.status === "success") {
      toastShow({ text: response.message, type: "success" });
      setKebun({ name: "", woods: [] }); // Reset form after success
    } else {
      toastShow({ text: response.message, type: "error" });
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Loading color={colors.secondary} />
      </View>
    );
  }

  const renderItem = ({ item, index }: { item: woodType; index: number }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.iconContainer}>
          <Ionicons
            name="leaf-outline"
            size={size.xl}
            color={colors.secondary}
          />
        </View>
        <View style={styles.textContainer}>
          <Text>{item.name}</Text>
          <Text style={styles.jumlahText}>{item.quantity}</Text>
        </View>
        <View>
          <IconButtons
            iconName="trash-outline"
            iconColor="error"
            onPress={() => handleDeleteWood(index)}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.main}>
      <View style={styles.contentContainerStyle}>
        <View style={styles.contentContainer}>
          <HeaderText title="Tambah Kebun" icon="leaf-outline" />
          <AddKebunForm
            addWood={(wood) =>
              setKebun((prev) => ({
                ...prev,
                woods: [...prev.woods, wood],
              }))
            }
            namaKebun={kebun.name}
            setNamaKebun={(nama) =>
              setKebun((prev) => ({ ...prev, name: nama }))
            }
          />
          <View style={styles.listContainer}>
            <FlatList
              data={kebun.woods}
              renderItem={renderItem}
              contentContainerStyle={styles.listContent}
            />
          </View>
          <DefaultInputButtons
            text="Tambah Kebun"
            onPress={() => onCreateHandler()}
          />
        </View>
      </View>
    </View>
  );
};

export default AddKebun;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  contentContainerStyle: {
    padding: size.md,
    flex: 1,
  },
  contentContainer: {
    padding: size.md,
    borderRadius: size.sm,
    backgroundColor: colors.white,
    gap: size.sm,
    flex: 1,
  },
  listContainer: {
    flex: 1,
    overflow: "hidden",
    backgroundColor: colors.background,
    borderRadius: size.sm,
  },
  listContent: {
    padding: size.xs,
  },
  iconContainer: {
    padding: size.sm,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    padding: size.sm,
    borderRadius: size.sm,
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  jumlahText: {
    padding: size.xs,
    backgroundColor: colors.secondary,
    borderRadius: size.xs,
    color: colors.white,
    fontWeight: "bold",
  },
});
