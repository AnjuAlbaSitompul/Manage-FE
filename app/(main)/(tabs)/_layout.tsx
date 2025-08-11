import Header from "@/components/screensComponents/header/Header";
import { colors } from "@/constants/Colors";
import { screenSize } from "@/constants/SIze";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

const TabsLayout = () => {
  return (
    <View style={styles.main}>
      <Header />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.secondary,
          tabBarInactiveTintColor: colors.inactive,
        }}
        initialRouteName="home"
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="add"
          options={{
            tabBarShowLabel: false,
            tabBarLabel: "",
            tabBarIcon: ({ color, size }) => (
              <View style={styles.addContainer}>
                <Ionicons name="add" size={size} color={colors.white} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="report"
          options={{
            title: "Report",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="document" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
};

export default TabsLayout;
const styles = StyleSheet.create({
  main: {
    flex: 1,
  },

  addContainer: {
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: colors.secondary,
    width: screenSize.width / 7,
    aspectRatio: 1,
    borderRadius: screenSize.width / 8,
    elevation: 3,
  },
});
