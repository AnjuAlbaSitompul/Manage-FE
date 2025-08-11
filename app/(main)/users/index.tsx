import IconButtons from "@/components/buttons/IconButtons";
import HeaderText from "@/components/texts/HeaderText";
import { colors } from "@/constants/Colors";
import { size } from "@/constants/SIze";
import { UserDataModels } from "@/models/users/usersModels";
import { deleteUser, getUsers } from "@/services/private/user-services";
import { capitalize } from "@/utils/capitalize";
import { toastShow } from "@/utils/toastShow";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

const Users = () => {
  const route = useRouter();
  const [data, setData] = useState<UserDataModels[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getUsersData();
    }
  }, [isFocused]);

  const getUsersData = async (): Promise<void> => {
    const response = await getUsers();
    if (response.status === "success") {
      setData(response.data);
    }
    if (response.status === "error") {
      toastShow({ text: response.message, type: "error" });
      setData([]);
    }
  };

  const deleteHandler = async (id: string): Promise<void> => {
    const response = await deleteUser(id);
    if (response.status === "success") {
      toastShow({ text: response.message, type: "success" });
      getUsersData();
    }
    if (response.status === "error") {
      toastShow({ text: response.message, type: "error" });
    }
  };

  const renderItem = ({ item }: { item: UserDataModels }) => {
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
          onPress={() => route.push(`/users/${item.id}`)}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="person" size={24} color={colors.primary} />
          </View>
          <View style={styles.itemTextContainer}>
            <Text>{item.name}</Text>
            <Text style={styles.highlightText}>{capitalize(item?.role)}</Text>
          </View>
          <View style={styles.iconOptionsContainer}>
            {item.isActive && (
              <>
                <IconButtons
                  iconName="trash-bin-outline"
                  iconColor="error"
                  onPress={() => deleteHandler(item.id)}
                />
              </>
            )}
          </View>
        </Pressable>
      </View>
    );
  };
  return (
    <View style={styles.main}>
      <View style={styles.headerContainer}>
        <HeaderText title="Info User">
          <IconButtons
            iconName="add-circle-outline"
            onPress={() => route.push(`/users/addUser`)}
          />
        </HeaderText>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
          ItemSeparatorComponent={() => <View style={{ height: size.xs }} />}
        />
      </View>
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  headerContainer: {
    padding: size.md,
    margin: size.sm,
    marginBottom: 0,
    backgroundColor: colors.white,
    borderRadius: size.sm,
  },
  itemWrapper: {
    borderRadius: size.sm,
    overflow: "hidden",
    backgroundColor: colors.white,
  },
  listContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: size.sm,
  },
  iconContainer: {
    padding: size.sm,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: size.sm,
  },
  highlightText: {
    color: colors.inactive,
    fontWeight: "400",
  },
  itemTextContainer: {
    flex: 1,
  },
  iconOptionsContainer: {
    flexDirection: "row",
  },
});
