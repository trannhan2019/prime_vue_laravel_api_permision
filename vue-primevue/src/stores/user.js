import { defineStore } from "pinia";
import axiosClient from "@/lib/axios.client";
import { useStorage } from "@vueuse/core";

const csrf = () => axiosClient.get("/sanctum/csrf-cookie");

export const useUsers = defineStore("users", {
  state: () => ({
    userData: useStorage("userData", null),
    authStatus: useStorage("authStatus", []),
  }),
  actions: {
    // async getToken() {
    //   await axiosClient.get("/sanctum/csrf-cookie");
    // },

    getData() {
      axiosClient
        .get("/api/user")
        .then((response) => {
          this.userData = response.data;
        })
        .catch((error) => {
          if (error.response.status !== 409) throw error;

          // this.router.push('/verify-email')
        });
    },

    async login(form) {
      await csrf();
      try {
        await axiosClient.post("/login", {
          email: form.email,
          password: form.password,
        });
        this.router.push({ name: "dashboard" });
      } catch (error) {
        if (error.response.status !== 422) throw error;
      }
    },
  },
});
