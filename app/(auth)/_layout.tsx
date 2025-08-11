import { colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import React from "react";
import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";

const AuthLayout = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaView>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: colors.background,
  },
});
