import { instance } from "../utlis/axiosConf";

export const Reflesh = async () => {
  const reponde = await instance.get("api/v1/auth/refresh");
  return reponde?.data;
};

export const Login = async ({ email, password }) => {
  const reponde = await instance.post("api/v1/auth/login", {
    email,
    password,
  });
  return reponde.data;
};
