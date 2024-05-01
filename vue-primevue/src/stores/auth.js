import { defineStore } from "pinia";
import { login, getInfo, logout } from "@/api-services/auth";

export const useAuth = defineStore("auth", {
  state: () => ({
    authData: null,
  }),

  getters: {
    isAuthenticated: (state) => (state.authData ? true : false),
  },

  actions: {
    async getData() {
      const res = await getInfo(); // getInfo();
      this.authData = res.data;
    },

    clearData() {
      this.authData = null;
    },

    async login(form) {
      await login(form);
      await this.getData();
      this.router.push({ name: "dashboard" });
    },

    async logout() {
      await logout();
      this.clearData();
      this.router.push({ name: "login" });
    },
  },

  persist: {
    key: "auth",
    storage: sessionStorage,
  },
});
