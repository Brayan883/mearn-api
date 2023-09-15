import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { RefleshToken } from "../services/auth";

export const useStore = create(
  devtools((set) => ({
    Token: null,
    addToken: ({ token }) => {
      set({ token });
    },
    logout: () => {
      set({
        Token: null,
      });
    },
    refreshToken: async () => {
      try {
        const data = await RefleshToken();
        set({ Token: data.token });
      } catch (error) {
        console.log(error.message);
      }
    },
  }))
);
