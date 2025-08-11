import Header from "@/components/screensComponents/header/Header";
import { Stack } from "expo-router";
import React from "react";

const KayuLayout = () => {
  return (
    <>
      <Header />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="addKayu" />
        <Stack.Screen name="[id]" />
      </Stack>
    </>
  );
};

export default KayuLayout;
