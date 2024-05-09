import axiosClient from "./axios.client";
import { csrf } from "./get-csrf";

export const getList = (params) =>
  axiosClient({
    url: "/api/companies",
    method: "get",
    params,
  });

export const store = (data) => axiosClient.post("/api/companies", data);

export const show = (id) => axiosClient.get(`/api/companies/${id}`);

export const update = (id, data) =>
  axiosClient.put(`/api/companies/${id}`, data);

export const destroy = (id) => axiosClient.delete(`/api/companies/${id}`);
