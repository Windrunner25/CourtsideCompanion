import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useButtonStore = defineStore("buttonStore", {
  state: () => ({
    page: 1,
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
      this.page = value;
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
  },
});
