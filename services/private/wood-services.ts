import { UpdateKayuForms } from "@/components/forms/UpdateKayuForm";
import { CreateWoodModels } from "@/models/woods/woodmodels";
import axiosInstance from "@/utils/axiosInstance";
import { AxiosError, AxiosResponse } from "axios";
import { responseType } from "../public/auth-services";

const getWoods = async (): Promise<AxiosResponse<responseType<any>> | any> => {
  try {
    const response = await axiosInstance.get("/wood");
    return response.data;
  } catch (e: AxiosError<{ message: string }> | any) {
    return {
      status: "error",
      message: e.response?.data?.message || "Failed to fetch woods",
    };
  }
};

const logWood = async (
  id: string
): Promise<AxiosResponse<responseType<any>> | any> => {
  try {
    const response = await axiosInstance.get(`/wood/${id}/logs`);
    return response.data;
  } catch (e: AxiosError<{ message: string }> | any) {
    return {
      status: "error",
      message: e.response?.data?.message || "Failed to log wood",
    };
  }
};

const findOneWood = async (
  id: string
): Promise<AxiosResponse<responseType<any>> | any> => {
  try {
    const response = await axiosInstance.get(`/wood/${id}`);
    return response.data;
  } catch (e: AxiosError<{ message: string }> | any) {
    return {
      status: "error",
      message: e.response?.data?.message || "Failed to find wood",
    };
  }
};

const updateWood = async (id: string, data: UpdateKayuForms) => {
  try {
    const response = await axiosInstance.patch(`/wood/${id}`, data);
    return response.data;
  } catch (e: AxiosError<{ message: string }> | any) {
    return {
      status: "error",
      message: e.response?.data?.message || "Failed to update wood",
    };
  }
};

const createWood = async (
  data: CreateWoodModels
): Promise<AxiosResponse<responseType<any>> | any> => {
  try {
    const response = await axiosInstance.post("/wood", data);
    return response.data;
  } catch (e: AxiosError<{ message: string }> | any) {
    return {
      status: "error",
      message: e.response?.data?.message || "Failed to create wood",
    };
  }
};

const deleteWood = async (
  id: string
): Promise<AxiosResponse<responseType<any>> | any> => {
  try {
    const response = await axiosInstance.delete(`/wood/${id}`);
    return response.data;
  } catch (e: AxiosError<{ message: string }> | any) {
    return {
      status: "error",
      message: e.response?.data?.message || "Failed to delete wood",
    };
  }
};

export { createWood, deleteWood, findOneWood, getWoods, logWood, updateWood };

