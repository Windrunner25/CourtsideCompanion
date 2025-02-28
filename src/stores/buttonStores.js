import { ref, computed } from "vue";
import { defineStore } from 'pinia'

export const useButtonStore = defineStore("buttonStore", {
  state: () => ({
    page: 1,
    activeButtonLeft: null,
    activeButtonRight: null,
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
    },
    setActiveButtonLeft(id) {
      this.activeButtonLeft = id;
    },
    setActiveButtonRight(id) {
      this.activeButtonRight = id;
    }
  },
});

