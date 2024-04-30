import axiosClient from "./axios.client";
import { csrf } from "./get-csrf";

export const getList = () => axiosClient.get("/api/companies");
