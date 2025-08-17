import { TypeValidasiForm } from "@/components/forms/ValidasiForm";
import { GetAllTransactionParams } from "@/models/others/paginationModels";
import { TransactionUpdateDebt } from "@/models/transactions/transactionModels";
import axiosInstance from "@/utils/axiosInstance";
import { AxiosError, AxiosResponse } from "axios";
import { responseType } from "../public/auth-services";

const getAllTransaction = async (
  params?: GetAllTransactionParams
): Promise<AxiosResponse<responseType<any>> | any> => {
  try {
    const response = await axiosInstance.get("/transaction", { params });
    return response.data;
  } catch (error: AxiosError<{ message: string }> | any) {
    console.error("Error fetching transactions:", error);
    return { status: "error", message: error.message };
  }
};

const getOneTransaction = async (
  id: string
): Promise<AxiosResponse<responseType<any>> | any> => {
  try {
    const response = await axiosInstance.get(`/transaction/${id}`);
    return response.data;
  } catch (error: AxiosError<{ message: string }> | any) {
    return { status: "error", message: error.message };
  }
};

const createTransaction = async (
  data: FormData
): Promise<AxiosResponse<responseType<any>> | any> => {
  try {
    const response = await axiosInstance.post("/transaction", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: AxiosError<{ message: string }> | any) {
    console.log(JSON.stringify(error));
    return { status: "error", message: error.message };
  }
};

const validateTransaction = async (
  data: TypeValidasiForm,
  id: string
): Promise<AxiosResponse<responseType<any>> | any> => {
  try {
    const response = await axiosInstance.post(
      `/transaction/${id}/validate`,
      data
    );
    return response.data;
  } catch (error: AxiosError<{ message: string }> | any) {
    return { status: "error", message: error.response.message };
  }
};

const updateDebtTransaction = async (
  data: TransactionUpdateDebt,
  id?: string
): Promise<AxiosResponse<responseType<any>> | any> => {
  try {
    const response = await axiosInstance.patch(
      `/transaction/${id}/validate`,
      data
    );
    return response.data;
  } catch (error: AxiosError<{ message: string }> | any) {
    return { status: "error", message: error.response.massage };
  }
};

const deleteTransaction = async (
  id: string
): Promise<AxiosResponse<responseType<any>> | any> => {
  try {
    const response = await axiosInstance.delete(`/transaction/${id}`);
    return response.data;
  } catch (error: AxiosError<{ message: string }> | any) {
    return { status: "error", message: error.response.message };
  }
};

export {
  createTransaction,
  deleteTransaction,
  getAllTransaction,
  getOneTransaction,
  updateDebtTransaction,
  validateTransaction,
};
