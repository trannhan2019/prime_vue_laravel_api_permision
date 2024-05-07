import { defineStore } from "pinia";
// import {  QueryClient } from "@tanstack/vue-query";
import { login, getInfo, logout } from "@/api-services/auth";

export const useAuth = defineStore("auth", {
  state: () => ({
    authData: null,
  }),

  getters: {
    isAuthenticated: (state) => (state.authData ? true : false),
  },

  actions: {
    //su dung tanstack/vue-query out side compnonent
    // async getTestUser() {
    //   const queryClient = new QueryClient();
    //   try {
    //     const data = await queryClient.fetchQuery({
    //       queryKey: ["auth"],
    //       queryFn: getInfo,
    //       staleTime: 1000 * 60 * 60,
    //     });
    //     console.log(data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },

    setData(data) {
      this.authData = data;
    },
    clearData() {
      this.authData = null;
    },

    // async logout() {
    //   await logout();
    //   this.clearData();
    //   this.router.push({ name: "login" });
    // },
  },

  persist: {
    key: "auth",
    storage: sessionStorage,
  },
});
