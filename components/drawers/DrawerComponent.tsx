import { colors } from "@/constants/Colors";
import { size } from "@/constants/SIze";
import { signOut } from "@/services/private/auth-services";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Platform, StatusBar, StyleSheet, View } from "react-native";
import DrawerItem from "./DrawerItem";

const DrawerComponent = (props: DrawerContentComponentProps) => {
  const router = useRouter();
  const onLogoutHandler = async (): Promise<void> => {
    const response = await signOut();
    if (response.status === "success") {
      router.replace("/");
    }
  };

  return (
    <DrawerContentScrollView style={styles.main} {...props}>
      {/* SafeAreaView is used to avoid notch issues on Android and iOS */}
      <View style={styles.header}>
        <View style={styles.logoWrapper}>
          <Image
            source={require("@/assets/images/others/icon.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.content}>
          <View>
            <DrawerItemList {...props} />
          </View>
          <DrawerItem
            text="Sign out"
            name="log-out-outline"
            color="primary"
            onPress={() => onLogoutHandler()}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerComponent;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    width: "100%",
    aspectRatio: 4.5,
    paddingHorizontal: size.sm,
  },
  logoWrapper: {
    width: "50%",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  content: {},
});
