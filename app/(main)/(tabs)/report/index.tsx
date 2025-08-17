import ReportsMenuItem from "@/components/listItems/ReportsMenuItem";
import Loading from "@/components/loading/Loading";
import { colors } from "@/constants/Colors";
import { ReportFeatures } from "@/constants/Features";
import { size } from "@/constants/SIze";
import { authStore } from "@/store/authStore";
import { toastShow } from "@/utils/toastShow";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

const Report = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const auth = authStore((state) => state.user);
  const router = useRouter();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && auth) {
      handleUnauthorizedAccess();
    }
  }, [isFocused, auth, router]);

  const handleUnauthorizedAccess = () => {
    if (auth?.role !== "ADMIN") {
      toastShow({
        text: "Anda tidak memiliki akses untuk melihat laporan ini.",
        type: "error",
      });

      return;
    }
    setLoading(false);
  };

  const menuHandler = (slug: string) => {
    router.push(`/report/${slug}`);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Loading size="large" color={colors.secondary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {ReportFeatures.map((feature) => (
        <ReportsMenuItem
          key={feature.title}
          data={feature}
          onPress={() => menuHandler(feature.slug)}
        />
      ))}
    </View>
  );
};

export default Report;

const styles = StyleSheet.create({
  aksesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  textWarning: {
    color: colors.error,
    fontWeight: "300",
  },
  container: {
    gap: size.sm,
    padding: size.sm,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
