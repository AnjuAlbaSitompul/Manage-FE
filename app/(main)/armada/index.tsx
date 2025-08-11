import IconButtons from "@/components/buttons/IconButtons";
import AddArmadaForm from "@/components/forms/addArmadaForm";
import Loading from "@/components/loading/Loading";

import HeaderText from "@/components/texts/HeaderText";
import { colors } from "@/constants/Colors";
import { size } from "@/constants/SIze";
import { ArmadaModels } from "@/models/armadas/armadaModels";
import { createArmada, getArmadas } from "@/services/private/armada-services";
import { toastShow } from "@/utils/toastShow";

import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

const Armada = () => {
  const [armadas, setArmadas] = useState<ArmadaModels[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchArmadas = async () => {
    const response = await getArmadas();
    if (response.status === "success") {
      setArmadas(response.data);
    }
  };

  useEffect(() => {
    setLoading(true);

    fetchArmadas();
    setLoading(false);
  }, []);

  const onCreate = async (name: string) => {
    const data: { name: string } = { name };
    const response = await createArmada(data);
    if (response.status === "success") {
      toastShow({ text: response.message, type: "success" });
      fetchArmadas();
    } else {
      toastShow({ text: response.message, type: "error" });
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Loading color={colors.secondary} />
      </View>
    );
  }

  const renderItem = ({ item }: { item: ArmadaModels }) => {
    console.log(item);
    return (
      <View style={styles.itemContainer}>
        <Pressable
          style={styles.itemWrapper}
          android_ripple={{ color: colors.inactive }}
        >
          <View style={styles.itemIconContainer}>
            <Ionicons
              name="car-outline"
              size={size.xl}
              color={colors.secondary}
            />
          </View>
          <View style={styles.itemTextContainer}>
            <Text>{item.name}</Text>
          </View>
          <View style={styles.itemButtonContainer}>
            <IconButtons iconName="trash-outline" iconColor={"error"} />
          </View>
        </Pressable>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View>
        <HeaderText title="Jenis Armada" icon="car-outline" />
      </View>
      <View>
        <AddArmadaForm onPress={(name) => onCreate(name)} />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={armadas}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
        />
      </View>
    </View>
  );
};

export default Armada;

const styles = StyleSheet.create({
  container: {
    margin: size.md,
    padding: size.md,
    backgroundColor: colors.white,
    borderRadius: size.sm,
    flex: 1,
  },
  listContainer: {
    flex: 1,
    backgroundColor: colors.background,
    marginTop: size.sm,
    borderRadius: size.md,
  },

  itemContainer: {
    backgroundColor: colors.white,
    borderRadius: size.sm,
    overflow: "hidden",
  },
  itemWrapper: {
    flexDirection: "row",
    alignItems: "center",
    padding: size.sm,
  },
  itemIconContainer: {
    padding: size.sm,
  },
  itemTextContainer: {
    flex: 1,
    paddingHorizontal: size.sm,
  },
  itemButtonContainer: {
    padding: size.sm,
  },
  contentContainer: {
    padding: size.xs,
  },
});
