import Header from "@/components/screensComponents/header/Header";
import { Stack } from "expo-router";
import React from "react";

const UserLayout = () => {
  return (
    <>
      <Header />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ title: "Users" }} />
        <Stack.Screen name="addUser" options={{ title: "Add User" }} />
        <Stack.Screen name="[id]" options={{ title: "User Detail" }} />
      </Stack>
    </>
  );
};

export default UserLayout;
