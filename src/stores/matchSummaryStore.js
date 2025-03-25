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
    firstServePercentage: 0,
    deucePoints: 0,
    deucePointsWon: 0,

    count1: 0,
    intent1: "",
    strokeSide1: "",
    strokeType1: "",
    errorLocation1: "",
    count2: 0,
    intent2: "",
    strokeSide2: "",
    strokeType2: "",
    errorLocation2: "",
  }),
  getters: {},
  actions: {},
});
