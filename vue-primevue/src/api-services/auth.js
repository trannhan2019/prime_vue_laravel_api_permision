import axiosClient from "./axios.client";
import { csrf } from "./get-csrf";

export const login = async (form) => {
  await csrf();
  return axiosClient.post("/login", {
    email: form.email,
    password: form.password,
  });
};

export const logout = async () => {
  await csrf();
  return axiosClient.post("/logout");
};

export const getInfo = () => axiosClient.get("/api/user");
