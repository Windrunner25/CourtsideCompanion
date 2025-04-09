import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    user: null,
    email: null,
    first_name: null,
    last_name: null,
  }),
  getters: {},
  actions: {
    setUser(user) {
      this.user = user;
    },
    clearUser() {
      this.user = null;
    },
    setEmail(email) {
      this.email = email;
    },
    clearEmail() {
      this.email = null;
    },
    setFirstName(first_name) {
      this.first_name = first_name;
    },
    clearFirstName() {
      this.first_name = null;
    },
    setLastName(last_name) {
      this.last_name = last_name;
    },
    clearLastName() {
      this.last_name = null;
    },
  },
});
