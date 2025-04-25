<template>
  <v-container class="d-flex flex-column align-center">
    <v-btn @click="press">Update Chart</v-btn>
    <v-container fluid class="d-flex justify-center align-center">
      <MatchAnalyticsP1 class="ma-4" />
      <div
        class="d-flex justify-center align-center flex-column"
        style="font-size: 14px"
      >
        <div>Unforced Errors</div>
        <div>Forced Errors</div>
      </div>
      <MatchAnalyticsP2 class="ma-4" />
    </v-container>
  </v-container>
</template>

<script setup>
import MatchAnalyticsP1 from "./MatchAnalyticsP1.vue";
import MatchAnalyticsP2 from ".//MatchAnalyticsP2.vue";
import { useSummaryStore } from "@/stores/analyticsStore";
import { getMatchSummary } from "@/firebase/firebaseService";

const analyticsStore = useSummaryStore();

async function press() {
  let summary = {};
  // const currentMatchID = this.matchScoreStore.currentMatchID;
  const currentMatchID = "Isn1axIB2VyMLpcESRyI";
  console.log("currentMatchID:", currentMatchID);
  // const player1 = this.matchInfoStore.player1FullName;
  const player1 = "Finley Buelte";
  console.log("player1:", player1);
  // const player2 = this.matchInfoStore.player2FullName;
  const player2 = "Wooster 1";
  // console.log("player2:", player2);
  try {
    summary = await getMatchSummary(currentMatchID, player1, player2);
    console.log("Summary successfully store");
  } catch (error) {
    console.log("error getting match summary" + error);
    return;
  }
  // Update match summary for player1
  analyticsStore.unforcedErrorsPlayer1 = summary[player1].unforcedErrors;
  analyticsStore.forcedErrorsPlayer1 = summary[player1].forcedErrors;
  analyticsStore.winnersPlayer1 = summary[player1].winners;
  analyticsStore.acesPlayer1 = summary[player1].aces;
  analyticsStore.doubleFaultsPlayer1 = summary[player1].doubleFaults;
  analyticsStore.firstServePercentagePlayer1 =
    summary[player1].firstServePercentage;
  analyticsStore.deucePointsPlayer1 = summary[player1].deucePoints;
  analyticsStore.deucePointsWonPlayer1 = summary[player1].deucePointsWon;

  // Update match summary for player2
  analyticsStore.unforcedErrorsPlayer2 = summary[player2].unforcedErrors;
  analyticsStore.forcedErrorsPlayer2 = summary[player2].forcedErrors;
  analyticsStore.winnersPlayer2 = summary[player2].winners;
  analyticsStore.acesPlayer2 = summary[player2].aces;
  analyticsStore.doubleFaultsPlayer2 = summary[player2].doubleFaults;
  analyticsStore.firstServePercentagePlayer2 =
    summary[player2].firstServePercentage;
  analyticsStore.deucePointsPlayer2 = summary[player2].deucePoints;
  analyticsStore.deucePointsWonPlayer2 = summary[player2].deucePointsWon;

  console.log("Sucessfully store to analytics store");
  console.log(
    "Unforced Errors Player 1;",
    analyticsStore.unforcedErrorsPlayer1
  );
}
</script>
