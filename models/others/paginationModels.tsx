export type GetAllTransactionParams = {
  cursor?: string;
  status?: "PENDING" | "DITERIMA";
  size?: number;
  gardenName?: string;
  month?: string;
  customerName?: string;
};
