import { ref, computed } from "vue";
import { defineStore } from 'pinia'

export const useUIStore = defineStore("ui", {
  state: () => ({
    page: 1,

  }),
  actions: {
    togglePage(value) {
      this.page = value;
    },
  },
});
