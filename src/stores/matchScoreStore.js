import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { addPointToFirebase } from "../firebase/firebaseService";
import { auth } from "@/firebase/init";

export const useMatchScoreStore = defineStore("scoreStore", {
  state: () => ({
    currentPoint: {},
    pointWinner: null,

    player1GameScore: 0,
    player2GameScore: 0,

    tiebreak: false,
    secondServe: false,
    currentMatchID: null,
    pointNumber: 0,
    playerServing: 1,

    player1Set1: 0,
    player2Set1: 0,
    player1Set2: 0,
    player2Set2: 0,
    player1Set3: 0,
    player2Set3: 0,

    player1TiebreakScoreSet1: null,
    player2TiebreakScoreSet1: null,
    player1TiebreakScoreSet2: null,
    player2TiebreakScoreSet2: null,
    player1TiebreakScoreSet3: null,
    player2TiebreakScoreSet3: null,

    currentSet: 1,
  }),
  getters: {
    getPlayer1GameScore: (state) => state.player1GameScore,
    getPlayer2GameScore: (state) => state.player2GameScore,
    getPlayerServing: (state) => state.playerServing,
    isDeuceSide(state) {
      const scoreMap = {
        0: 0,
        15: 1,
        30: 2,
        40: 3,
      };
      const totalPoints =
        (scoreMap[state.player1GameScore] ?? 0) +
        (scoreMap[state.player2GameScore] ?? 0);
      return totalPoints % 2 === 0;
    },
  },
  actions: {
    incrementScore(player) {
      this.secondServe = false;

      if (this.tiebreak) {
        this.incrementTiebreakScore(player);
      } else if (player === 1) {
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
      if (this.tiebreak) {
        this.decrementTiebreakScore(player);
      } else if (player === 1) {
        if (this.player1GameScore === 40) {
          this.player1GameScore = 30;
        } else if (this.player1GameScore === 30) {
          this.player1GameScore = 15;
        } else if (this.player1GameScore === 15) {
          this.player1GameScore = 0;
        } else if (this[`player1Set${this.currentSet}`] > 0) {
          this[`player1Set${this.currentSet}`]--;
          this.player1GameScore = 40;
        }
      } else {
        if (this.player2GameScore === 40) {
          this.player2GameScore = 30;
        } else if (this.player2GameScore === 30) {
          this.player2GameScore = 15;
        } else if (this.player2GameScore === 15) {
          this.player2GameScore = 0;
        } else if (this[`player2Set${this.currentSet}`] > 0) {
          this[`player2Set${this.currentSet}`]--;
          this.player2GameScore = 40;
        }
      }
    },
    incrementSetScore(player) {
      this.resetGameScores();

      if (player === 1) {
        this[`player1Set${this.currentSet}`]++;
        this.switchServer();

        if (
          this[`player1Set${this.currentSet}`] === 6 &&
          this[`player2Set${this.currentSet}`] <= 4
        ) {
          this.incrementMatchScore();
        } else if (this[`player1Set${this.currentSet}`] === 7) {
          this.incrementMatchScore();
        } else if (
          this[`player1Set${this.currentSet}`] === 6 &&
          this[`player2Set${this.currentSet}`] === 6
        ) {
          this.tiebreak = true;
        }
      } else {
        this[`player2Set${this.currentSet}`]++;
        this.switchServer();

        if (
          this[`player2Set${this.currentSet}`] === 6 &&
          this[`player1Set${this.currentSet}`] <= 4
        ) {
          this.incrementMatchScore();
        } else if (this[`player2Set${this.currentSet}`] === 7) {
          this.incrementMatchScore();
        } else if (
          this[`player2Set${this.currentSet}`] === 6 &&
          this[`player1Set${this.currentSet}`] === 6
        ) {
          this.tiebreak = true;
        }
      }
      // win set 6-4
      // win set 7-5
      // win set 7-6
    },

    incrementTiebreakScore(player) {
      const key = `player${player}TiebreakScoreSet${this.currentSet}`;
      const opponentKey = `player${player === 1 ? 2 : 1}TiebreakScoreSet${
        this.currentSet
      }`;
      const setKey = `player${player}Set${this.currentSet}`;

      this[key] = (this[key] ?? 0) + 1;

      const playerScore = this[key];
      const opponentScore = this[opponentKey];

      if (playerScore >= 7 && playerScore - opponentScore >= 2) {
        this[setKey]++;
        this.resetTiebreak();
        this.incrementMatchScore();
      }

      const totalPoints =
        (this[`player1TiebreakScoreSet${this.currentSet}`] ?? 0) +
        (this[`player2TiebreakScoreSet${this.currentSet}`] ?? 0);

      if (totalPoints % 2 === 1) {
        this.switchServer();
      }
    },

    decrementTiebreakScore(player) {
      const key = `player${player}TiebreakScoreSet${this.currentSet}`;
      const opponentKey = `player${player === 1 ? 2 : 1}TiebreakScoreSet${
        this.currentSet
      }`;

      if (this[key] != null) {
        if (this[key] > 0) {
          this[key]--;
        } else {
          this.resetTiebreak();
          this[key] = null;
          this[opponentKey] = null;
          this.decrementScore(player);
        }
      }

      const totalPoints =
        (this[`player1TiebreakScoreSet${this.currentSet}`] ?? 0) +
        (this[`player2TiebreakScoreSet${this.currentSet}`] ?? 0);

      if (totalPoints % 2 === 1) {
        this.switchServer();
      }
    },

    resetGameScores() {
      this.player1GameScore = 0;
      this.player2GameScore = 0;
    },

    resetTiebreak() {
      this.tiebreak = false;
    },

    incrementMatchScore() {
      this.currentSet++;

      // this.resetSetScores();
    },

    // resetMatchScore() {
    //   this.player1MatchScore = 0;
    //   this.player2MatchScore = 0;
    // },

    // resetSetScores() {
    //   this.player1SetScore = 0;
    //   this.player2SetScore = 0;
    // },

    resetScore() {
      this.resetGameScores();
      // this.resetSetScores();
      // this.resetMatchScore();
    },

    fault(player) {
      if (this.secondServe) {
        this.secondServe = false;
        this.incrementScore(player);
      } else {
        this.secondServe = true;
      }
    },
    resetCurrentPointFields() {
      this.currentPoint = {};
    },
    pointEnded() {
      this.currentPoint["Point Number"] = this.pointNumber + 1;
      this.pointNumber++;

      if (this.isDeuceSide()) {
        this.currentPoint["Side"] = "Deuce";
      }
      else{
        this.currentPoint["Side"] = "Ad";
      }

      if (!this.tiebreak) {
        this.currentPoint[
          "Game Score"
        ] = `${this.player1GameScore}-${this.player2GameScore}`;
      } else {
        this.currentPoint["Game Score"] = `${
          this[`player1TiebreakScoreSet${this.currentSet}`]
        }-${this[`player2TiebreakScoreSet${this.currentSet}`]}`;
      }
      this.currentPoint[
        "Match Score"
      ] = `${this.player1Set1}-${this.player2Set1}, ${this.player1Set2}-${this.player2Set2}, ${this.player1Set3}-${this.player2Set3}`;

      this.currentPoint["Match ID"] = this.currentMatchID;

      this.currentPoint["OwnerID"] = auth.currentUser?.uid;

      addPointToFirebase(this.currentPoint, this.currentMatchID);
      this.resetCurrentPointFields();
    },
    switchServer() {
      this.playerServing = this.playerServing === 1 ? 2 : 1;
    },
    setServer(playerNumber) {
      this.playerServing = playerNumber;
    },
    setTemporaryPointWinner(playerNumber) {
      this.pointWinner = playerNumber;
    },
    setMatchID(id) {
      this.currentMatchID = id;
    },
  },
});
