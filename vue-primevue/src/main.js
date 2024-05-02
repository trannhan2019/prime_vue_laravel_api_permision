import "./assets/css/main.scss";

import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import { VueQueryPlugin } from "@tanstack/vue-query";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import ToastService from "primevue/toastservice";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();

app.use(
  pinia.use(({ store }) => {
    store.router = markRaw(router);
  })
);
pinia.use(piniaPluginPersistedstate);
app.use(router);
app.use(VueQueryPlugin);
app.use(PrimeVue);
app.use(ToastService);

app.mount("#app");
