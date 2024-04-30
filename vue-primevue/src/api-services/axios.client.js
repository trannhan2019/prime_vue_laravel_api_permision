import axios from "axios";
// import { useRouter } from "vue-router";
import router from "../router";
import { useAuth } from "../stores/auth";

// const router = useRouter();

const axiosClient = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 60000,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    Accept: "application/json",
  },
});

// axiosClient.interceptors.response.use(null, (err) => {
//   const error = {
//     status: err.response?.status,
//     original: err,
//     validation: {},
//     message: null,
//   };

//   if (err.response?.status === 422) {
//     for (let field in err.response.data.errors) {
//       error.validation[field] = err.response.data.errors[field][0];
//     }
//   } else {
//     error.message = "Something went wrong. Please try again later.";
//   }

//   return Promise.reject(error);
// });

axiosClient.interceptors.response.use(null, (err) => {
  const auth = useAuth();

  switch (err.response?.status) {
    case 401:
      auth.clearUser();
      sessionStorage.clear();
      router.push({ name: "login" });
      console.log("401");
      break;
    case 403:
      router.push({ name: "access.denied" });
      console.log("403");
      break;
    case 404:
      router.push({ name: "not.found" });
      break;
    default:
      router.push({ name: "error" });
      break;
  }
  console.error(err.response.data);
  return Promise.reject(err);
});

export default axiosClient;
