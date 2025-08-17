import { PemilikModels } from "@/models/pemilik/pemilikModels";
import axiosInstance from "@/utils/axiosInstance";
import { AxiosError, AxiosResponse } from "axios";
import { responseType } from "../public/auth-services";

const getPemilik = async (): Promise<
  AxiosResponse<responseType<any>> | any
> => {
  try {
    const response = await axiosInstance.get("/customer");
    return response.data;
  } catch (e: any) {
    return {
      status: "error",
      message: e.response?.data?.message || "Failed to fetch pemilik data",
    };
  }
};

const getOnePemilik = async (id: string): Promise<responseType<any> | any> => {
  try {
    const response = await axiosInstance.get(`/customer/${id}`);
    return response.data;
  } catch (e: AxiosError<{ message: string }> | any) {
    return {
      status: "error",
      message: e.response?.data?.message || "Failed to fetch pemilik data",
    };
  }
};

const updatePemilik = async ({
  createdAt,
  updatedAt,
  id,
  ...data
}: PemilikModels) => {
  try {
    const response = await axiosInstance.patch(`/customer/${id}`, {
      ...data,
    });
    return response.data;
  } catch (e: AxiosError<{ message: string }> | any) {
    return {
      status: "error",
      message: e.response?.data?.message || "Failed to update pemilik data",
    };
  }
};

const deletePemilik = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/customer/${id}`);
    return response.data;
  } catch (e: AxiosError<{ message: string }> | any) {
    return {
      status: "error",
      message: e.response?.data?.message || "Failed to delete pemilik data",
    };
  }
};

const createPemilik = async (data: string) => {
  try {
    const response = await axiosInstance.post("/customer", { name: data });
    return response.data;
  } catch (e: AxiosError<{ message: string }> | any) {
    return {
      status: "error",
      message: e.response?.data?.message || "Failed to create pemilik data",
    };
  }
};

export {
  createPemilik,
  deletePemilik,
  getOnePemilik,
  getPemilik,
  updatePemilik,
};
