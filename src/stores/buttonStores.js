import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useButtonStore = defineStore("buttonStore", {
  state: () => ({
    page: 1,
    pageHistory: [],

    group1Active: null,
    group2Active: null,
    group3Active: null,
    group4Active: null,
    group5Active: null,
    group6Active: null,
  }),
  getters: {
    getPage: (state) => state.page,
    isActive: (state) => (group, id) => {
      return state[`group${group}Active`] === id;
    },
  },
  actions: {
    togglePage(value) {
      const maxSize = 10;
      if (this.page !== value) {
        if (this.pageHistory.length >= maxSize) {
          this.pageHistory.shift(); // Remove the oldest
        }
        this.pageHistory.push(this.page);
        this.page = value;
      }
    },
    undo() {
      if (this.pageHistory.length > 0) {
        this.page = this.pageHistory.pop();
      }
    },
    setActiveButton(group, id) {
      if (this[`group${group}Active`] === id) {
        this[`group${group}Active`] = null;
      } else {
        this[`group${group}Active`] = id;
      }
    },
    resetShotCharacteristics() {
      for (let i = 1; i <= 6; i++) {
        this[`group${i}Active`] = null;
      }
    },
  },
});
