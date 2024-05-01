import { defineStore } from "pinia";
import { login, getInfo } from "@/api-services/auth";
// import { useStorage } from "@vueuse/core";

export const useAuth = defineStore("auth", {
  state: () => ({
    authData: null,
  }),

  getters: {
    isAuthenticated: (state) => state.authData ? true : false,
  },

  actions: {
    async getData() {
      try {
        const res = await getInfo();
        this.authData = res.data;
      } catch (error) {
        // if (error.response.status !== 409) throw error;
        console.log(error);
        // this.router.push('/verify-email')
      }
    },

    async login(form) {
      try {
        await login(form);
        this.router.push({ name: "dashboard" });
      } catch (error) {
        // if (error.response.status !== 422) throw error;
        console.log(error);
      }
    },

    clearData() {
      this.authData = null;
    },
  },

  persist: {
    key: "auth",
    storage: sessionStorage,
  },
});
