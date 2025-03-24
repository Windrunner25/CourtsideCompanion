import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { listenForMatchUpdates } from "../firebase/firebaseService";
import { addPointToFirebase } from "../firebase/firebaseService";

export const useSummaryStore = defineStore("summaryStore", {
  state: () => ({
    unforcedErrors: 0,
    forcedErrors: 0,
    winners: 0,
    aces: 0,
    doubleFaults: 0,
    firstServeCount: 0,
    secondServeCount: 0,
    firstServePercentage: 0,
    duecePoints: 0,
    deucePointsWon: 0,
  }),
  getters: {},
  actions: {

  },
});
