import IconButtons from "@/components/buttons/IconButtons";
import HeaderText from "@/components/texts/HeaderText";
import { colors } from "@/constants/Colors";
import { size } from "@/constants/SIze";
import { WoodModels } from "@/models/woods/woodmodels";
import { deleteWood, getWoods } from "@/services/private/wood-services";
import { capitalize } from "@/utils/capitalize";
import { currency } from "@/utils/currency";
import { toastShow } from "@/utils/toastShow";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

const Kayu = () => {
  const router = useRouter();
  const isFocused = useIsFocused();
  const [kayu, setKayu] = useState<WoodModels[]>([]);

  const handleDelete = async (id: string): Promise<void> => {
    console.log("Deleting wood with ID:", id);
    const response = await deleteWood(id);
    if (response.status === "success") {
      toastShow({
        text: response.message,
        type: "success",
      });
      fetchData();
    } else {
      toastShow({
        text: response.message,
        type: "error",
      });
    }
  };

  const fetchData = async (): Promise<void> => {
    const response = await getWoods();
    if (response.status === "success") {
      setKayu(response.data as WoodModels[]);
    } else {
      toastShow({
        text: response.message,
        type: "error",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [isFocused]);
  const renderItem = ({ item }: { item: WoodModels }) => {
    return (
      <View
        style={
          item.isActive
            ? styles.itemWrapper
            : [styles.itemWrapper, { opacity: 0.5 }]
        }
      >
        <Pressable
          style={styles.itemContainer}
          android_ripple={{ color: colors.inactive }}
          onPress={() => {
            router.push(`/kayu/${item.id}`); // Navigate to detail page
          }}
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
            <View style={styles.hargaContainer}>
              <Text style={styles.hargaText}>{currency(item.price)}</Text>
              <Text style={styles.highlightText}>
                / {capitalize(item.unit)}
              </Text>
            </View>
          </View>
          <View>
            <IconButtons
              iconName="trash-bin-outline"
              iconColor={"error"}
              onPress={() => handleDelete(item.id)}
            />
          </View>
        </Pressable>
      </View>
    );
  };
  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <HeaderText title="Daftar Kayu" icon="leaf-outline">
          <IconButtons
            iconName="add-circle-outline"
            onPress={() => {
              router.push("/(main)/kayu/addKayu");
            }}
          />
        </HeaderText>
      </View>
      <View style={styles.content}>
        <FlatList
          data={kayu}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={{ height: size.xs }} />}
          contentContainerStyle={styles.contentContainer}
        />
      </View>
    </View>
  );
};

export default Kayu;

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
    padding: size.sm,
  },
  contentContainer: {
    padding: size.md,
  },
  itemIconContainer: {
    padding: size.xs,
  },
  itemTextContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  hargaContainer: {
    alignItems: "flex-end",
  },
  hargaText: {
    fontSize: size.md,
    color: colors.white,
    fontWeight: "bold",
    padding: size.xs,
    backgroundColor: colors.secondary,
    borderRadius: size.sm,
  },
  highlightText: {
    fontSize: size.sm,
    color: colors.inactive,
  },
  itemWrapper: {
    backgroundColor: colors.white,
    borderRadius: size.sm,
    overflow: "hidden",
  },
});
