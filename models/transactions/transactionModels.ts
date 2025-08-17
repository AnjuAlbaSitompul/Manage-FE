import { ImagePickerAsset } from "expo-image-picker";
import { WoodModels } from "../woods/woodmodels";

export type Transaction = {
  createdAt?: string;
  updatedAt?: string;
  status: "DITERIMA" | "PENDING";
  type: "LUNAS" | "BELUM_DIBAYAR" | "UTANG";
  totalPrice: string;
  totalPaid: string;
  urlFile: string;
  createdBy: {
    name: string;
    id: string;
  };
  id: string;
  customer: {
    id: number;
    name: string;
  };
  garden: {
    name: number;
    id: number;
  };
  vehicle: {
    id: number;
    name: string;
    number: string;
  };
  wood: {
    id: number;
    name: string;
    price: string;
    unit: WoodModels["unit"];
    piecesQty: number;
    unitQty: number;
  };
  validatedBy: {
    id: string;
    name: string;
  };
};

export type TransactionCreate = {
  gardenId: string;
  customerId: string;
  vehicleId: string;
  woodId: string;
  vehicleNumber: string;
  woodPiecesQty: string;
  media?: ImagePickerAsset;
};

export type TransactionUpdateDebt = {
  totalPaid: string;
  type: Transaction["type"];
};
