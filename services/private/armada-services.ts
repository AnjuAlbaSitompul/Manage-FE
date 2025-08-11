import axiosInstance from "@/utils/axiosInstance";
import { AxiosResponse } from "axios";
import { responseType } from "../public/auth-services";

const getArmadas = async (): Promise<
  AxiosResponse<responseType<any>> | any
> => {
  try {
    const response = await axiosInstance.get("/vehicle");
    return response.data;
  } catch (e: any) {
    return {
      status: "error",
      message: e.response?.data?.message || "Failed to fetch armadas",
    };
  }
};

const createArmada = async (data: {
  name: string;
}): Promise<AxiosResponse<responseType<any>> | any> => {
  try {
    const response = await axiosInstance.post("/vehicle", data);
    return response.data;
  } catch (e: any) {
    return {
      status: "error",
      message: e.response?.data?.message || "Failed to create armada",
    };
  }
};

export { createArmada, getArmadas };
