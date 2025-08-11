import { AddUserFormTypes } from "@/components/forms/AddUserForm";
import { EditUserFormProps } from "@/components/forms/DetailUserForm";
import axiosInstance from "@/utils/axiosInstance";
import { AxiosError, AxiosResponse } from "axios";
import { responseType } from "../public/auth-services";

const getProfile = async (): Promise<responseType<any> | any> => {
  try {
    const response = await axiosInstance.get("/user/profile");
    if (response.data.status === "success") {
      return response.data;
    }
    return { status: "error", message: "Failed to fetch profile" };
  } catch (e) {
    return { status: "error", message: "Network error" };
  }
};

const getUsers = async (): Promise<responseType<any> | any> => {
  try {
    const response = await axiosInstance.get("/user");
    return response.data;
  } catch (e: AxiosError<{ message: string }> | any) {
    return {
      status: "error",
      message: e.response?.data?.message || "Token refresh failed",
    };
  }
};

const findOneUser = async (id: string): Promise<responseType<any> | any> => {
  try {
    const response = await axiosInstance.get("/user/" + id);
    return response.data;
  } catch (e: AxiosError<{ message: string }> | any) {
    return {
      status: "error",
      message: e.response?.data?.message || "Failed to find user",
    };
  }
};

const updateUser = async (
  data: EditUserFormProps,
  id: string
): Promise<AxiosResponse<responseType<any>> | any> => {
  try {
    const response = await axiosInstance.patch(`/user/${id}`, data);
    return response.data;
  } catch (e: AxiosError<{ message: string }> | any) {
    return {
      status: "error",
      message: e.response?.data?.message || "Failed to update user",
    };
  }
};

const createUser = async (
  data: AddUserFormTypes
): Promise<responseType<any> | any> => {
  try {
    const response = await axiosInstance.post("/user", data);
    return response.data;
  } catch (e: AxiosError<{ message: string }> | any) {
    return {
      status: "error",
      message: e.response?.data?.message || "Failed to create user",
    };
  }
};

const deleteUser = async (
  id: string
): Promise<AxiosResponse<responseType<any>> | any> => {
  try {
    const response = await axiosInstance.delete(`/user/${id}`);
    return { status: "success", message: response.data.message };
  } catch (e: AxiosError<{ message: string }> | any) {
    return {
      status: "error",
      message: e.response?.data?.message || "Failed to delete user",
    };
  }
};

export {
  createUser,
  deleteUser,
  findOneUser,
  getProfile,
  getUsers,
  updateUser,
};
