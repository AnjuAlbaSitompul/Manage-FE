import IconButtons from "@/components/buttons/IconButtons";
import HeaderText from "@/components/texts/HeaderText";
import { colors } from "@/constants/Colors";
import { size } from "@/constants/SIze";
import { KebunModels } from "@/models/kebuns/kebunModels";
import { getKebuns } from "@/services/private/kebun-services";
import { toastShow } from "@/utils/toastShow";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

const Kebun = () => {
  const router = useRouter();
  const [kebuns, setKebuns] = React.useState<KebunModels<any>[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchKebun();
    }
  }, [isFocused]);

  const fetchKebun = async () => {
    const response = await getKebuns();
    if (response.status === "success") {
      setKebuns(response.data);
    }
    if (response.status === "error") {
      toastShow({
        text: response.message,
        type: "error",
      });
    }
  };

  const renderItem = ({ item }: { item: KebunModels<any> }) => {
    return (
      <View style={styles.itemWrapper}>
        <Pressable
          style={styles.itemContainer}
          android_ripple={{ color: colors.inactive }}
        >
          <View style={styles.itemIconContainer}>
            <Ionicons
              name="leaf-outline"
              size={size.xl}
              color={colors.secondary}
            />
          </View>
          <View style={styles.itemTextContainer}>
            <Text>{item.name}</Text>
          </View>
          <View style={styles.itemJumlahContainer}>
            <Text style={styles.textItem}>{item.totalWoodsQuantity}</Text>
          </View>
        </Pressable>
      </View>
    );
  };
  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <HeaderText title="Data Kebun Anda" icon="leaf-outline">
          <IconButtons
            iconName="add-circle-outline"
            onPress={() => router.push("/kebuns/addKebun")}
          />
        </HeaderText>
      </View>
      <View style={styles.content}>
        <FlatList
          data={kebuns}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
          ItemSeparatorComponent={() => <View style={{ height: size.xs }} />}
        />
      </View>
    </View>
  );
};

export default Kebun;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  header: {
    margin: size.md,
    padding: size.sm,
    backgroundColor: colors.white,
    borderRadius: size.sm,
  },
  content: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",

    padding: size.xs,
  },
  itemWrapper: {
    backgroundColor: colors.white,
    borderRadius: size.sm,
    overflow: "hidden",
  },
  itemIconContainer: {
    padding: size.md,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemJumlahContainer: {
    padding: size.sm,
    backgroundColor: colors.secondary,
    borderRadius: size.xs,
  },
  contentContainer: {
    paddingHorizontal: size.md,
  },
  textItem: {
    color: colors.white,
    fontWeight: "bold",
  },
});
