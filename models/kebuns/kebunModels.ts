export type KebunModels<T> = {
  createdAt: string;
  updatedAt: string;
  id: string;
  isActive: boolean;
  name: string;
  totalWoodsQuantity: number;
  woods: T[];
};

export type woodType = {
  woodId: string;
  quantity: number;
  name?: string;
};
export type KebunCreateType = {
  name: string;
  woods: woodType[];
};
