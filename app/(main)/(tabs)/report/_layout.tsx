import { Stack } from "expo-router";
import React from "react";

const ReportLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="woodReport" />
      <Stack.Screen name="moneyReport" />
      <Stack.Screen name="vehicleReport" />
    </Stack>
  );
};

export default ReportLayout;
