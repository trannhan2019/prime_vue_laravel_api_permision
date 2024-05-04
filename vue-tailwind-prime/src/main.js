import "./assets/css/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import Lara from "./assets/css/presets/lara";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
  unstyled: true,
  pt: Lara,
});

app.mount("#app");
