import axiosClient from "./axios.client";
import { csrf } from "./get-csrf";

export const getList = (params) =>
  axiosClient({
    url: "/api/companies",
    method: "get",
    params,
  });
