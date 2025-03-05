import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useButtonStore = defineStore("buttonStore", {
  state: () => ({
    page: 1,
    pageHistory: [],
    serverSide: "left",
    group1LeftActive: null,
    group2LeftActive: null,
    group3LeftActive: null,
    group4LeftActive: null,
    group5LeftActive: null,

    group1RightActive: null,
    group2RightActive: null,
    group3RightActive: null,
    group4RightActive: null,
    group5RightActive: null,
  }),
  getters: {
    getPage: (state) => state.page,
    isActive: (state) => (group, id, side) => {
      return state[`group${group}${side}Active`] === id;
    },
  },
  actions: {
    togglePage(value) {
      if (this.page !== value) {
        this.pageHistory.push(this.page);
        this.page = value;
      }
    },
    undo() {
      if (this.pageHistory.length > 0) {
        this.page = this.pageHistory.pop();
      }
    },
    setActiveButton(group, buttonId, side) {
      if (side === "Left") {
        this[`group${group}LeftActive`] = buttonId;
      } else if (side === "Right") {
        this[`group${group}RightActive`] = buttonId;
      } else {
        console.error("Invalid side: Use 'left' or 'right'");
      }
    },
    reset(page) {
      for (let i = 1; i <= 5; i++) {
        if (page === 7) {
          this[`group${i}LeftActive`] = null;
        }
        if (page === 8) {
          this[`group${i}RightActive`] = null;
        }
      }
    },
    switchServer() {
      this.serverSide = this.serverSide === "left" ? "right" : "left";
    },
  },
});
