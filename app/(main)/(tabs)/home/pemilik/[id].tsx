import DetailPemilikForm from "@/components/forms/DetailPemilikForm";
import Loading from "@/components/loading/Loading";
import HeaderText from "@/components/texts/HeaderText";
import { colors } from "@/constants/Colors";
import { size } from "@/constants/SIze";
import { PemilikModels } from "@/models/pemilik/pemilikModels";
import { getOnePemilik } from "@/services/private/pemilik-services";
import { toastShow } from "@/utils/toastShow";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

const DetailPemilik = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [pemilik, setPemilik] = useState<PemilikModels | null>(null);

  useEffect(() => {
    fetchDataPemilik();
  }, [id]);

  const fetchDataPemilik = async (): Promise<void> => {
    setLoading(true);
    const response = await getOnePemilik(id as string);
    if (response.status === "success") {
      setPemilik(response.data);
    }
    if (response.status === "error") {
      toastShow({ text: response.message, type: "error" });
      router.back();
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Loading />
      </View>
    );
  }
  return (
    <View style={styles.main}>
      <View style={styles.contentContainer}>
        <HeaderText icon="person-circle-outline" title="Detail Pemilik" />
        <View style={styles.container}>
          <DetailPemilikForm {...(pemilik as PemilikModels)} />
        </View>
      </View>
    </View>
  );
};

export default DetailPemilik;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: size.md,
  },
  contentContainer: {
    borderRadius: size.sm,
    backgroundColor: colors.white,
    padding: size.md,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.transparentBlack,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    marginTop: size.sm,
  },
});
