import { authStore } from "@/store/authStore";
import axiosInstance from "@/utils/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { responseType } from "../public/auth-services";

const signOut = async (): Promise<responseType<undefined> | any> => {
  try {
    const response = await axiosInstance.delete("/auth");
    if (response.data.status === "success") {
      await AsyncStorage.removeItem("token");
      authStore.getState().setIsUnAuthenticated();
    }
    return response.data;
  } catch (e) {
    console.error("Error signing out:", e);
  }
};

export { signOut };
