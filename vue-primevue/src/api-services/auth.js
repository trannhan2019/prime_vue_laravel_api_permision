import axiosClient from "./axios.client";
import { csrf } from "./get-csrf";

export const login = async (values) => {
  await csrf();
  return axiosClient.post("/login", {
    email: values.email,
    password: values.password,
  });
};

export const logout = async () => {
  await csrf();
  return axiosClient.post("/logout");
};

export const getInfo = () => axiosClient.get("/api/user");
