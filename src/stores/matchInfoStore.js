import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useMatchInfoStore = defineStore("matchInfoStore", {
  state: () => ({
    player1Name: "Player 1",
    player1Team: "DePauw",
    player2Name: "Player 2",
    IndoorsOutdoors: "Indoors",
    date: null, 
  }),
  actions: {
    setPlayer1(player) {
      this.player1 = player;
    },
    setPlayer2(player) {
      this.player2 = player;
    },
    setLocation(location) {
      this.location = location;
    },
  },
});
