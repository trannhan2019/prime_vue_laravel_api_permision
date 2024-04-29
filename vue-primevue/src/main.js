import "./assets/css/main.scss";

import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();

app.use(
  pinia.use(({ store }) => {
    store.router = markRaw(router);
  })
);
app.use(router);
app.use(PrimeVue);

app.mount("#app");
