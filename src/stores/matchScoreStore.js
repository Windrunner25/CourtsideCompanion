import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { listenForMatchUpdates } from "../firebase/firebaseService";
import { addPointToFirebase } from "../firebase/firebaseService";

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
    currentMatchID: null,
    pointNumber: 0,
  }),
  getters: {
    getPlayer1GameScore: (state) => state.player1GameScore,
    getPlayer2GameScore: (state) => state.player2GameScore,
  },
  actions: {
    startListening() {
      listenForMatchUpdates((newMatch) => {
        this.matches.push(newMatch);
      });
    },
    incrementScore(player) {
      this.secondServe = false;

      if (this.tiebreak) {
        this.incrementTiebreakScore(player);
      }

      else if (player === 1) {
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
    decrementScore(player) {
      if (player === 1) {
        if (this.player1GameScore === 40) {
          this.player1GameScore = 30;
        } else if (this.player1GameScore === 30) {
          this.player1GameScore = 15;
        } else if (this.player1GameScore === 15) {
          this.player1GameScore = 0;
        }
      } else {
        if (this.player2GameScore === 40) {
          this.player2GameScore = 30;
        } else if (this.player2GameScore === 30) {
          this.player2GameScore = 15;
        } else if (this.player2GameScore === 15) {
          this.player2GameScore = 0;
        }
      }
    },
    incrementSetScore(player) {
      this.resetGameScores();

      if (player === 1) {
        this.player1SetScore++;
        // This is where I will input the logic for adding game points to Firebase
        // addPoints(this.gamePoints, this.currentMatchID);
        // this.gamePoints = [];

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
        // addPoints(this.gamePoints, this.currentMatchID);
        // this.gamePoints = [];

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
        this.player1GameScore++;
      } else {
        this.player2GameScore++;
      }

      if (
        this.player1GameScore >= 7 &&
        this.player1GameScore - this.player2GameScore >= 2
      ) {
        this.player1SetScore++;
        this.resetTiebreak();
        this.incrementMatchScore(1);
      } else if (
        this.player2GameScore >= 7 &&
        this.player2GameScore - this.player1GameScore >= 2
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
      this.player1GameScore = 0;
      this.player2GameScore = 0;
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
    resetCurrentPointFields() {
      this.currentPoint = {};
    },
    pointEnded(winnerOfPoint, currentServer) {
      this.currentPoint["Point Number"] = this.pointNumber + 1;
      this.pointNumber++;
      this.currentPoint["Point Winner"] = winnerOfPoint;
      this.currentPoint["Server"] = currentServer;
      this.currentPoint[
        "Game Score"
      ] = `${this.player1GameScore}-${this.player2GameScore}`;
      this.currentPoint["Match ID"] = this.currentMatchID;

      this.addPoint(this.currentPoint);
      addPointToFirebase(this.currentPoint, this.currentMatchID);
      this.resetCurrentPointFields();
    },
  },
});
