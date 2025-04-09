import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    user: null,
  }),
  getters: {},
  actions: {
    setUser(user) {
      this.user = user;
    },
    clearUser() {
      this.user = null;
    },
  },
});
