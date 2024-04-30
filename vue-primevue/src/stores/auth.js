import { defineStore } from "pinia";
import { login, getInfo } from "@/api-services/auth";
import { useStorage } from "@vueuse/core";

export const useAuth = defineStore("auth", {
  state: () => ({
    userData: useStorage("userData", null),
    authStatus: useStorage("authStatus", []),
  }),

  actions: {
    async getUser() {
      try {
        const res = await getInfo();
        this.userData = res.data;
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

    clearUser() {
      this.userData = null;
      this.authStatus = null;
    },
  },

  persist: {
    key: "auth",
    storage: sessionStorage,
  },
});
