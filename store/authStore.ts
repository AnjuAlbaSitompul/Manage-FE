import { AuthModels, userModels } from "@/models/zustand/authModels";
import { create } from "zustand";

export const authStore = create<AuthModels>()((set) => ({
  user: undefined,
  isAuthenticated: undefined,
  setIsAuthenticated: () => set({ isAuthenticated: true }),
  setIsUnAuthenticated: () => set({ isAuthenticated: false, user: undefined }),
  setUser: (user: userModels) => set({ user }),
}));
