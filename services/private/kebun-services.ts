import { KebunCreateType } from "@/models/kebuns/kebunModels";
import axiosInstance from "@/utils/axiosInstance";
import { AxiosResponse } from "axios";
import { responseType } from "../public/auth-services";

const getKebuns = async (): Promise<AxiosResponse<responseType<any>> | any> => {
  try {
    const response = await axiosInstance.get("/garden");
    return response.data;
  } catch (e: any) {
    return {
      status: "error",
      message: e.response?.data?.message || "Failed to fetch kebuns",
    };
  }
};

const createKebun = async (
  data: KebunCreateType
): Promise<AxiosResponse<responseType<any>> | any> => {
  try {
    const response = await axiosInstance.post("/garden", data);
    return response.data;
  } catch (e: any) {
    return {
      status: "error",
      message: e.response?.data?.message || "Failed to create kebun",
    };
  }
};
export { createKebun, getKebuns };
