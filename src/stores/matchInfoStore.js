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
    OwnerID: null,
    date: null,
    finalScore: null,
  }),
  getters: {
    player1FullName: (state) =>
      `${state.player1FirstName} ${state.player1LastName}`,
    player2FullName: (state) =>
      `${state.player2FirstName} ${state.player2LastName}`,
  },
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
    setPlayer2Team(team) {
      this.player2Team = team;
    },
    setLocation(location) {
      this.location = location;
    },
    setDate() {
      this.date = new Date();
    },
    getPlayerNameFromNumber(player) {
      return player === 1
        ? `${this.player1FirstName} ${this.player1LastName}`
        : `${this.player2FirstName} ${this.player2LastName}`;
    },
    getPlayerNameFromSide(side) {
      return side === "left"
        ? `${this.player1FirstName} ${this.player1LastName}`
        : `${this.player2FirstName} ${this.player2LastName}`;
    },
    setOwnerID(id) {
      this.OwnerID = id;
    },
    setMatchInfo({ player1FirstName, player1LastName, player2FirstName, player2LastName, finalScore }) {
      this.player1FirstName = player1FirstName;
      this.player1LastName = player1LastName;
      this.player2FirstName = player2FirstName;
      this.player2LastName = player2LastName;
      this.finalScore = finalScore;
    },
  },
});
