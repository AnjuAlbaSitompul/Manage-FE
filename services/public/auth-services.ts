import { SignInTypes } from "@/models/forms/signInModels";
import axios, { AxiosError } from "axios";

export type responseType<T> = {
  status: "success" | "error";
  data?: T;
  message: string;
};

const API = process.env.EXPO_PUBLIC_API_URL;

const login = async (
  props: SignInTypes
): Promise<responseType<{ accessToken: string } | undefined>> => {
  try {
    const response = await axios.post(`${API}/auth`, props);
    return {
      status: "success",
      data: { accessToken: response.data.data.accessToken },
      message: "Login successful",
    };
  } catch (e: AxiosError<{ message: string }> | any) {
    return {
      status: "error",
      message: e.response?.data?.message || "Login failed",
    };
  }
};

const refreshToken = async (): Promise<
  responseType<{ accessToken: string }>
> => {
  try {
    const response = await axios.post(`${API}/auth/refresh-token`);
    return {
      status: "success",
      data: { accessToken: response.data.data.accessToken },
      message: "Token refreshed successfully",
    };
  } catch (e: AxiosError<{ message: string }> | any) {
    return {
      status: "error",
      message: e.response?.data?.message || "Token refresh failed",
    };
  }
};

export { login, refreshToken };
