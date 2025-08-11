import DrawerComponent from "@/components/drawers/DrawerComponent";
import { colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import React from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
const MainLayout = () => {
  const DrawerContent = (props: DrawerContentComponentProps) => {
    return <DrawerComponent {...props} />;
  };
  return (
    <GestureHandlerRootView style={styles.container}>
      <Drawer
        screenOptions={{
          headerShown: false,
          drawerPosition: "right",
          drawerActiveTintColor: colors.primary,
          drawerInactiveTintColor: colors.inactive,
        }}
        drawerContent={(props) => <DrawerContent {...props} />}
        initialRouteName="(tabs)"
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            title: "Home",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="users"
          options={{
            title: "Users",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="people" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="kayu"
          options={{
            title: "Kayu",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="leaf" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="kebuns"
          options={{
            title: "Kebun",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="leaf" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="armada"
          options={{
            title: "Armada",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="car" color={color} size={size} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default MainLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
