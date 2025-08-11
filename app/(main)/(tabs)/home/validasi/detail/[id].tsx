import ImageModalButton from "@/components/buttons/ImageModalButton";
import ValidasiForm from "@/components/forms/ValidasiForm";
import FormTexts from "@/components/texts/FormTexts";
import HeaderText from "@/components/texts/HeaderText";
import { colors } from "@/constants/Colors";
import { dummyTasks } from "@/constants/Dummy";
import { screenSize, size } from "@/constants/SIze";
import {
  dateToIndonesianString,
  dateToIndonesianTime,
} from "@/utils/dateTranslate";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const DetailValidasi = () => {
  const data = dummyTasks[0]; // Assuming you want to display the first task as an example
  const tabBarHeight = useBottomTabBarHeight();

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
              {dateToIndonesianString(data.createdAt)}
            </Text>
            <Text style={styles.highlightText}>
              {dateToIndonesianTime(data.createdAt)}
            </Text>
          </HeaderText>
          <View style={styles.contentContainer}>
            <View style={styles.imageContainer}>
              <ImageModalButton
                imageSource={require("@/assets/images/dummies/dummy1.jpg")}
              />
            </View>
            <View style={[styles.dataContainer, { marginLeft: size.md }]}>
              <FormTexts title="Kebun" description={data.kebun} />
              <FormTexts title="Pemilik" description={data.pemilik} />
              <FormTexts title="Jenis Kayu" description={data.jenisKayu} />
              <FormTexts title="Jumlah Kayu" description={data.jumlahKayu} />
            </View>
          </View>
          <HeaderText title="Detail Armada" icon="car-outline" />
          <View style={[styles.dataContainer, { paddingVertical: size.sm }]}>
            <FormTexts
              style={{ marginBottom: size.sm }}
              title="Jenis Armada"
              description={data.armada}
            />
            <FormTexts title="Nomor Plat" description={data.bk} />
          </View>
          <HeaderText title="Validasi Transaksi" icon="add-circle-outline" />
          <Text style={styles.warnText}>
            Perhatian harga telah ditetapkan berdasarkan jenis satuan, jika
            harga tidak cocok harap menghubungi Admin
          </Text>
          <View style={[styles.dataContainer, { paddingVertical: size.sm }]}>
            <ValidasiForm satuan="kg" />
          </View>
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
});
