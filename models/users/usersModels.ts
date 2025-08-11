export type UserDataModels = {
  id: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  name: string;
  role: "SPV" | "ADMIN" | "MANDOR";
  username: string;
  password?: string;
};
