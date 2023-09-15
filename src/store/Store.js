import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { RefleshToken } from "../services/auth";

export const useStore = create(
  devtools((set) => ({
    Token: null,
    addToken: ({ token }) => {
      set({
        Token: token,
      });
    },
    logout: () => {
      set({
        Token: null,
      });
    },
    refreshToken: async () => {
      const data = await RefleshToken();
      console.log( "data" ,  data)
      set((prev) => {
        console.log(JSON.stringify(prev, null, 2));
        console.log(data.token);
        return { ...prev, Token: data.token };
      });
    },
  }))
);
