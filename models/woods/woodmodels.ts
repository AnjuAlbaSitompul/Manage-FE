export type WoodModels = {
  createdAt?: string;
  updatedAt?: string;
  isActive?: boolean;
  id: string;
  unit: "KG" | "BATANG" | "KENDARAAN";
  name: string;
  price: string;
  quantity: number;
};

export type LogWoodModels<T> = {
  id: string;
  newPrice: string;
  oldName: string;
  oldPrice: string;
  oldUnit: WoodModels["unit"];
  updatedAt: string;
  createdAt: string;
  updatedBy?: T;
};

export type CreateWoodModels = {
  name: string;
  price: string;
  unit?: WoodModels["unit"];
};
