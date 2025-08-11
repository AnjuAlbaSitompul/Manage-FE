import { Stack } from "expo-router";
import React from "react";

const ValidasiLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
      <Stack.Screen name="index" />
      <Stack.Screen name="detail" />
    </Stack>
  );
};

export default ValidasiLayout;
