import Loading from "@/components/loading/Loading";
import { colors } from "@/constants/Colors";
import { size } from "@/constants/SIze";
import { getProfile } from "@/services/private/user-services";
import { authStore } from "@/store/authStore";
import { capitalize } from "@/utils/capitalize";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const UserCard = () => {
  const user = authStore((state) => state.user);
  const setUser = authStore((state) => state.setUser);
  const [loading, setLoading] = useState<boolean | undefined>();

  const getUserProfile = async () => {
    setLoading(true);
    const response = await getProfile();
    if (response.status === "success") {
      setUser({
        name: response.data.name,
        role: response.data.role,
        id: response.data.id,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      getUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <View>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Text style={styles.highLight}>Hello, {capitalize(user?.role)}</Text>
          <Text style={styles.name}>{capitalize(user?.name)}</Text>
        </>
      )}
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  highLight: {
    fontSize: size.md,
    fontWeight: "bold",
    color: colors.inactive,
  },
  name: {
    fontSize: size.xxl,
    fontWeight: "bold",
    color: colors.black,
  },
});
