import ImageModalButton from "@/components/buttons/ImageModalButton";
import DebtForm from "@/components/forms/DebtForm";
import ValidasiForm from "@/components/forms/ValidasiForm";
import Loading from "@/components/loading/Loading";
import FormTexts from "@/components/texts/FormTexts";
import HeaderText from "@/components/texts/HeaderText";
import { colors } from "@/constants/Colors";
import { screenSize, size } from "@/constants/SIze";
import { fileDownloader } from "@/hooks/useFileDownloader";
import { Transaction } from "@/models/transactions/transactionModels";
import { getOneTransaction } from "@/services/private/transaction-services";
import { authStore } from "@/store/authStore";
import { currency } from "@/utils/currency";
import {
  dateToIndonesianString,
  dateToIndonesianTime,
} from "@/utils/dateTranslate";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const DetailValidasi = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const { id } = useLocalSearchParams();
  const user = authStore((state) => state.user);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [data, setData] = useState<Transaction | undefined>(undefined);

  const fetchingTransaction = async () => {
    const response = await getOneTransaction(id as string);
    console.log(response.data);
    if (response.status === "success") {
      setData(response.data);
    }
  };

  const downloadImage = async (uri: string) => {
    const image = await fileDownloader(uri, `photo_${id}`);
    setImage(image);
  };

  useEffect(() => {
    if (data?.urlFile) {
      downloadImage(data.urlFile);
    }
  }, [data?.urlFile]);

  useEffect(() => {
    if (id) {
      fetchingTransaction();
    }
  }, [id]);

  if (!data) {
    return (
      <View style={styles.loadingContainer}>
        <Loading color={colors.primary} size={"large"} />
      </View>
    );
  }

  return (
    <View style={styles.main}>
      <ScrollView
        contentContainerStyle={{
          ...styles.wrapper,
          paddingBottom: tabBarHeight,
        }}
      >
        <View style={styles.container}>
          <HeaderText title="Detail Transaksi">
            <Text style={styles.highlightText}>
              {data.createdAt &&
                dateToIndonesianString(new Date(data?.createdAt))}
            </Text>
            <Text style={styles.highlightText}>
              {data?.createdAt &&
                dateToIndonesianTime(new Date(data?.createdAt))}
            </Text>
          </HeaderText>
          <View style={styles.contentContainer}>
            <View style={styles.imageContainer}>
              {!image ? (
                <Loading color={colors.primary} />
              ) : (
                <ImageModalButton imageSource={{ uri: image }} />
              )}
            </View>
            <View style={[styles.dataContainer, { marginLeft: size.md }]}>
              <FormTexts title="Kebun" description={data.garden.name} />
              <FormTexts title="Pemilik" description={data.customer.name} />
              <FormTexts title="Jenis Kayu" description={data.wood.name} />

              <FormTexts
                title="Jumlah Kayu"
                description={data.wood.piecesQty}
              />
              {data?.totalPrice && (
                <FormTexts
                  title="Harga"
                  description={currency(data.totalPrice)}
                />
              )}
            </View>
          </View>
          <HeaderText title="Detail Armada" icon="car-outline" />
          <View style={[styles.dataContainer, { paddingVertical: size.sm }]}>
            <FormTexts
              style={{ marginBottom: size.sm }}
              title="Jenis Armada"
              description={data.vehicle.name}
            />
            <FormTexts title="Nomor Plat" description={data.vehicle.number} />
          </View>
          {data.status === "PENDING" && user?.role !== "MANDOR" && (
            <View>
              <HeaderText
                title="Validasi Transaksi"
                icon="add-circle-outline"
              />
              <Text style={styles.warnText}>
                Perhatian harga telah ditetapkan berdasarkan jenis satuan, jika
                harga tidak cocok harap menghubungi Admin
              </Text>
              <View
                style={[styles.dataContainer, { paddingVertical: size.sm }]}
              >
                <ValidasiForm {...data} />
              </View>
            </View>
          )}
          {data.status === "DITERIMA" && (
            <View>
              <HeaderText
                title={"Status Transaksi " + data.type}
                icon={
                  data.type === "LUNAS"
                    ? "checkmark-circle-outline"
                    : "warning-outline"
                }
              />
              <Text style={styles.warnText}>
                Transaksi ini sudah divalidasi, jika ada kesalahan harap
                menghubungi Admin || Spv
              </Text>
              {(data.type === "UTANG" || data.type === "BELUM_DIBAYAR") &&
                (user?.role === "ADMIN" || user?.role === "SPV") && (
                  <View>
                    <DebtForm {...data} />
                  </View>
                )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailValidasi;

const styles = StyleSheet.create({
  imageContainer: {
    width: screenSize.width / 3.5,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  main: {
    flex: 1,
  },
  wrapper: {
    marginHorizontal: size.md,
    marginTop: size.md,
    borderRadius: size.sm,
  },
  contentContainer: {
    paddingVertical: size.md,
    flexDirection: "row",
  },
  container: {
    backgroundColor: colors.white,
    padding: size.md,
    borderRadius: size.sm,
  },
  highlightText: {
    fontSize: size.sm,
    color: colors.captions,
    fontWeight: "300",
  },
  dataContainer: {
    flex: 1,
    justifyContent: "space-around",
  },
  warnText: {
    fontSize: size.sm,
    color: colors.error,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
