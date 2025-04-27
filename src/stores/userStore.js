import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    user: null,
    email: null,
    name: "Guest",
  }),
  getters: {},
  actions: {
    setUser(user) {
      this.user = user;
    },
    clearUser() {
      this.user = null;
      this.email = null;
      this.name = "Guest";
    },
    setUserEmail(email) {
      this.email = email;
    },
    clearUserEmail() {
      this.email = null;
    },
    setUserName(name) {
      this.name = name;
    },
    clearUserName() {
      this.name = "Guest";
    },
  },
});
