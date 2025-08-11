import Header from "@/components/screensComponents/header/Header";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const ArmadaLayout = () => {
  return (
    <>
      <Header />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default ArmadaLayout;

const styles = StyleSheet.create({});
