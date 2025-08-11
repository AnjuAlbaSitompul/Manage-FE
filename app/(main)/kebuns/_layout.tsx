import Header from "@/components/screensComponents/header/Header";
import { Stack } from "expo-router";
import React from "react";

const KebunLayout = () => {
  return (
    <>
      <Header />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="addKebun" />
      </Stack>
    </>
  );
};

export default KebunLayout;
