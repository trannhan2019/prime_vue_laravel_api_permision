import axios from "axios";
import router from "../router";
import { useAuth } from "../stores/auth";
import NProgress from "nprogress";

//const router = useRouter(); khong su dung duoc hook router ngoai vue component
//phai import instance router de su dung

const axiosClient = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 60000,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    Accept: "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  //su dung NProgress
  NProgress.start();
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response;
  },
  (err) => {
    const auth = useAuth(); //pinia store su dung ngoai vue component phai trong function, de no khoi tao tai file main.js

    switch (err.response?.status) {
      case 401:
        auth.clearData();
        sessionStorage.clear();
        router.push({ name: "login" });
        break;
      case 403:
        router.push({ name: "access.denied" });
        break;
      // case 404:
      //   router.push({ name: "not.found" });
      //   break;
      case 500:
        router.push({ name: "error" });
        break;
      default:
        console.log(err?.response?.data);
        break;
    }
    console.error(err.response);
    return Promise.reject(err);
  }
);

export default axiosClient;
