import { Reflesh } from "../services/auth";
import { instance } from "./axiosConf";

export const handleInterceptors = {
  InterceptorsUse: ({ get }) => {
    return instance.interceptors.request.use(
      (config) => {
        const token = get().Token;
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  },
  InterceptorsReflesh: ({ isRefreshing, set }) => {
    return instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (
          error?.response?.status === 401 &&
          !isRefreshing &&
          !originalRequest._retry
        ) {
          isRefreshing = true;
          originalRequest._retry = true;
          try {
            const newToken = await Reflesh();
            set({
              Token: newToken?.token,
            });
            instance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${newToken?.token}`;
            return instance(originalRequest);
          } catch (error) {
            window.localStorage.clear();
            window.location.href = "/";
          } finally {
            isRefreshing = false;
          }
        }
        return Promise.reject(error);
      }
    );
  },
};
