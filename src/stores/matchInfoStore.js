import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useMatchInfoStore = defineStore("matchInfoStore", {
  state: () => ({
    player1Name: "Player 1",
    player1Team: "DePauw",
    player2Name: "Player 2",
    player2Team: "Opponent",
    IndoorsOutdoors: "Indoors",
    date: null, 
  }),
  actions: {
    setPlayer1Name(player) {
      this.player1Name = player;
    },
    setPlayer2Name(player) {
      this.player2Name = player;
    },
    setLocation(location) {
      this.location = location;
    },
  },
});
