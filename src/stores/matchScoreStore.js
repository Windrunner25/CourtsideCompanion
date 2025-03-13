import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useMatchScoreStore = defineStore("scoreStore", {
  state: () => ({
    currentPoint: {},
    gamePoints: [],
    player1GameScore: 0,
    player2GameScore: 0,
    player1SetScore: 0,
    player2SetScore: 0,
    player1MatchScore: 0,
    player2MatchScore: 0,
    tiebreak: false,
    player1TiebreakScore: 0,
    player2TiebreakScore: 0,
    secondServe: false,
  }),
  getters: {
    getPlayer1GameScore: (state) => state.player1GameScore,
    getPlayer2GameScore: (state) => state.player2GameScore,
  },
  actions: {
    incrementScore(player) {
      this.secondServe = false;

      if (this.tiebreak) {
        this.incrementTiebreakScore(player);
      }

      if (player === 1) {
        if (this.player1GameScore === 0 || this.player1GameScore === 15) {
          this.player1GameScore += 15;
        } else if (this.player1GameScore === 30) {
          this.player1GameScore += 10;
        } else {
          this.incrementSetScore(1);
        }
      } else {
        if (this.player2GameScore === 0 || this.player2GameScore === 15) {
          this.player2GameScore += 15;
        } else if (this.player2GameScore === 30) {
          this.player2GameScore += 10;
        } else {
          this.incrementSetScore(2);
        }
      }
    },
    incrementSetScore(player) {
      this.resetGameScores();

      if (player === 1) {
        this.player1SetScore++;
        // Increment because they won the game, but then check score to see if they won the set

        if (this.player1SetScore === 6 && this.player2SetScore <= 4) {
          this.incrementMatchScore(1);
        } else if (this.player1SetScore === 7) {
          this.incrementMatchScore(1);
        } else if (this.player1SetScore === 6 && this.player2SetScore === 6) {
          this.tiebreak = true;
        }
      } else {
        this.player2SetScore++;

        if (this.player2SetScore === 6 && this.player1SetScore <= 4) {
          this.incrementMatchScore(2);
        } else if (this.player2SetScore === 7) {
          this.incrementMatchScore(2);
        } else if (this.player2SetScore === 6 && this.player1SetScore === 6) {
          this.tiebreak = true;
        }
      }
      // win set 6-4
      // win set 7-5
      // win set 7-6
    },

    incrementTiebreakScore(player) {
      if (player === 1) {
        this.player1TiebreakScore++;
      } else {
        this.player2TiebreakScore++;
      }

      if (
        this.player1TiebreakScore >= 7 &&
        this.player1TiebreakScore - this.player2TiebreakScore >= 2
      ) {
        this.player1SetScore++;
        this.resetTiebreak();
        this.incrementMatchScore(1);
      } else if (
        this.player2TiebreakScore >= 7 &&
        this.player2TiebreakScore - this.player1TiebreakScore >= 2
      ) {
        this.player2SetScore++;
        this.resetTiebreak();
        this.incrementMatchScore(2);
      }
    },

    resetGameScores() {
      this.player1GameScore = 0;
      this.player2GameScore = 0;
    },

    resetTiebreak() {
      this.player1TiebreakScore = 0;
      this.player2TiebreakScore = 0;
      this.tiebreak = false;
    },

    incrementMatchScore(player) {
      if (player === 1) {
        this.player1MatchScore++;
      } else {
        this.player2MatchScore++;
      }

      this.resetSetScores();
    },

    resetMatchScore() {
      this.player1MatchScore = 0;
      this.player2MatchScore = 0;
    },

    resetSetScores() {
      this.player1SetScore = 0;
      this.player2SetScore = 0;
    },

    resetScore() {
      this.resetGameScores();
      this.resetSetScores();
      this.resetMatchScore();
    },

    fault(player) {
      if (this.secondServe) {
        this.secondServe = false;
        this.incrementScore(player);
      } else {
        this.secondServe = true;
      }
    },
    addPoint(point) {
      this.gamePoints.push(point);
    },
    resetCurrentPointFields(){
      this.currentPoint = {};
    },
    async commitGameToDatabase(player1Id, player2Id) {
      try {
        await addMatch(player1Id, player2Id, this.points);
        this.points = []; // Clear points array after committing to database
      } catch (error) {
        console.error("Error committing game to database:", error);
      }
    },
  },
});
