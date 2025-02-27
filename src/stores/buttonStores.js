import { ref, computed } from "vue";
import { defineStore } from 'pinia'

export const useButtonStore = defineStore("buttonStore", {
  state: () => ({
    page: 1,
    activeButton: null,
    ServeInActive: null,
    AceActive: null,
  }),
  getters: {
    getPage: (state) => state.page, 
  },
  actions: {
    togglePage(value) {
      this.page = value;
    },
    toggleServeState(){
      this.ServeActive = !this.ServeActive;
      this.page = this.page === 1 ? 2 : 1; 
    },
    toggleAceState(){
      this.AceActive = !this.AceActive;
      this.page = this.page === 1 ? 3 : 1; 
    }
  },
});

