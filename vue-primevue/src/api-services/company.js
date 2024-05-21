import axiosClient from "./axios.client";
import { csrf } from "./get-csrf";

export const getList = (params) =>
  axiosClient({
    url: "/api/companies",
    method: "get",
    params,
  });

export const store = async (data) => {
  await csrf();
  return axiosClient.post("/api/companies", data);
};

export const show = (id) => axiosClient.get(`/api/companies/${id}`);

export const update = async (id, data) => {
  await csrf();
  return axiosClient.put(`/api/companies/${id}`, data);
};

export const destroy = async (id) => {
  await csrf();
  return axiosClient.delete(`/api/companies/${id}`);
};

// export const destroyList = (ids) =>
//   axiosClient({
//     url: "/api/companies-destroy",
//     method: "delete",
//     data: ids,
//   });

export const destroyList = async (ids) => {
  await csrf();
  return axiosClient.delete("/api/companies-destroy", { data: { ids } });
};
