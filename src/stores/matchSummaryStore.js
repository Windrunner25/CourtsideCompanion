import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { addPointToFirebase } from "../firebase/firebaseService";

export const useSummaryStore = defineStore("summaryStore", {
  state: () => ({
    unforcedErrorsPlayer1: 0,
    forcedErrorsPlayer1: 0,
    winnersPlayer1: 0,
    acesPlayer1: 0,
    doubleFaultsPlayer1: 0,
    firstServePercentagePlayer1: 0,
    deucePointsPlayer1: 0,
    deucePointsWonPlayer1: 0,

    countPlayer1First: 0,
    intentPlayer1First: "",
    strokeSidePlayer1First: "",
    strokeTypePlayer1First: "",
    errorLocationPlayer1First: "",

    countPlayer1Second: 0,
    intentPlayer1Second: "",
    strokeSidePlayer1Second: "",
    strokeTypePlayer1Second: "",
    errorLocationPlayer1Second: "",

    unforcedErrorsPlayer2: 0,
    forcedErrorsPlayer2: 0,
    winnersPlayer2: 0,
    acesPlayer2: 0,
    doubleFaultsPlayer2: 0,
    firstServePercentagePlayer2: 0,
    deucePointsPlayer2: 0,
    deucePointsWonPlayer2: 0,

    countPlayer2First: 0,
    intentPlayer2First: "",
    strokeSidePlayer2First: "",
    strokeTypePlayer2First: "",
    errorLocationPlayer2First: "",

    countPlayer2Second: 0,
    intentPlayer2Second: "",
    strokeSidePlayer2Second: "",
    strokeTypePlayer2Second: "",
    errorLocationPlayer2Second: "",
  }),
  getters: {},
  actions: {},
});
