import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { instance } from "../utlis/axiosConf";
import { handleInterceptors } from "../utlis/confInterceptors";

export const useStore = create(
  devtools((set, get) => ({
    Token: null,
    expiresIn: null,
    addToken: ({ token, expiresIn }) => {
      set({
        Token: token,
        expiresIn: expiresIn,
      });
    },
    logout: () => {
      set({
        Token: null,
      });
    },
    refreshToken: () => {
      let isRefreshing = false;
      handleInterceptors.InterceptorsUse({ get });
      handleInterceptors.InterceptorsReflesh({ isRefreshing, set });
      return instance;
    },
  }))
);
