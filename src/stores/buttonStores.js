import { ref, computed } from "vue";
import { defineStore } from 'pinia'

export const useButtonStore = defineStore("buttonStore", {
  state: () => ({
    page: 1,
    activeButton: null,
  }),
  getters: {
    getPage: (state) => state.page, 
  },
  actions: {
    togglePage(value) {
      this.page = value;
    },
  },
});
