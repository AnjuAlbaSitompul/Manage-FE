import ToastConfig from "@/components/toasts/ToastConfig";
import { getProfile } from "@/services/private/user-services";
import { authStore } from "@/store/authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import Toast from "react-native-toast-message";

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const isAuthenticated = authStore((state) => state.isAuthenticated);
  const setIsAuthenticated = authStore((state) => state.setIsAuthenticated);
  const setIsUnAuthenticated = authStore((state) => state.setIsUnAuthenticated);

  const getUserProfile = async () => {
    const response = await getProfile();
    if (response.status === "success") {
      return response.data;
    }
    return null;
  };

  const getToken = async (): Promise<void> => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const user = await getUserProfile();
        if (user) {
          setIsAuthenticated();
        } else {
          setIsUnAuthenticated();
        }
      } else {
        setIsUnAuthenticated();
      }
    } catch (e) {
      console.error("Error fetching token:", e);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (isAuthenticated !== undefined) {
      if (isAuthenticated) {
        router.replace("/(main)/(tabs)/home");
      } else {
        router.replace("/(auth)");
      }
      SplashScreen.hideAsync();
    }
  }, [isAuthenticated]);

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
      <Toast config={ToastConfig} />
    </ThemeProvider>
  );
}
