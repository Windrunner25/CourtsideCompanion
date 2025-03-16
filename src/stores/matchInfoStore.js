import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useMatchInfoStore = defineStore("matchInfoStore", {
  state: () => ({
    player1FirstName: "Player",
    player1LastName: "1",
    player1Team: "DePauw",
    player2FirstName: "Player",
    player2LastName: "2",
    player2Team: "Opponent",
    IndoorsOutdoors: "Indoors",
    date: null, 
  }),
  actions: {
    setPlayer1FirstName(player) {
      this.player1FirstName = player;
    },
    setPlayer1LastName(player) {
      this.player1LastName = player;
    },
    setPlayer2FirstName(player) {
      this.player2FirstName = player;
    },
    setPlayer2LastName(player) {
      this.player2LastName = player;
    },
    setLocation(location) {
      this.location = location;
    },
    setDate() {
      this.date = new Date();
    }
  },
});
