export type userModels = {
  name: string;
  role?: "SPV" | "ADMIN" | "MANDOR";
  id: string;
};

export type AuthModels = {
  user: userModels | undefined;
  isAuthenticated: boolean | undefined;
  setIsAuthenticated: () => void;
  setIsUnAuthenticated: () => void;
  setUser: (user: userModels) => void;
};
