import DetailUserForm from "@/components/forms/DetailUserForm";
import Loading from "@/components/loading/Loading";
import HeaderText from "@/components/texts/HeaderText";
import { colors } from "@/constants/Colors";
import { size } from "@/constants/SIze";
import { UserDataModels } from "@/models/users/usersModels";
import { findOneUser } from "@/services/private/user-services";
import { toastShow } from "@/utils/toastShow";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

const DetailUser = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserDataModels>({
    id: "",
    name: "",
    username: "",
    isActive: true,
    role: "MANDOR",
    createdAt: "",
    updatedAt: "",
  });

  useEffect(() => {
    getUserData();
  }, [id]);

  const getUserData = async () => {
    const response = await findOneUser(id as string);
    if (response.status === "success") {
      setUser(response.data as UserDataModels);
      setLoading(false);
    }
    if (response.status === "error") {
      toastShow({ text: response.message, type: "error" });
      router.back();
    }
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
        <HeaderText title="Detail User" icon="person-circle-outline" />
        <View>
          <DetailUserForm {...user} />
        </View>
      </View>
    </View>
  );
};

export default DetailUser;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: size.md,
  },
  contentContainer: {
    backgroundColor: colors.white,
    borderRadius: size.sm,
    padding: size.md,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.transparentBlack,
  },
});
