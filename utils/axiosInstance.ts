import { refreshToken } from "@/services/public/auth-services";
import { authStore } from "@/store/authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { InternalAxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

axiosInstance.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      (error.response || error.response?.status === 401) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const newAccessToken = await refreshToken();

      if (newAccessToken.status === "success" && newAccessToken.data) {
        await AsyncStorage.setItem("token", newAccessToken.data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken.data.accessToken}`;
      }
      if (newAccessToken.status === "error") {
        await AsyncStorage.removeItem("token");
        authStore.getState().setIsUnAuthenticated();
      }
      return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
