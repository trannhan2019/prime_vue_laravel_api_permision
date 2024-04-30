import "./assets/css/main.scss";

import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
// import { isAxiosError } from "axios";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";
// import { useAuth } from "./stores/auth";
// import { useSessionStorage } from "@vueuse/core";

const app = createApp(App);
const pinia = createPinia();

app.use(
  pinia.use(({ store }) => {
    store.router = markRaw(router);
  })
);
pinia.use(piniaPluginPersistedstate);
app.use(router);
app.use(PrimeVue);

// const auth = useAuth();
// if (!auth.userData) {
//   auth.getUser();
// }

// app.config.errorHandler = async (err, vm, info) => {
//   if (isAxiosError(err)) {
//     switch (err.response.status) {
//       case 419:
//       case 401:
//         auth.clearUser();
//         // sessionStorage.clear();
//         console.log("401401401");
//         await router.push({ name: "login" });
//         break;
//       case 403:
//         // router.push({ name: "login" });
//         router.push({ name: "access.denied" });
//         break;
//       case 404:
//         router.push({ name: "not.found" });
//         break;
//       default:
//         router.push({ name: "error" });
//         break;
//     }
//     console.error(err.response.data);
//   }
// };

app.mount("#app");
