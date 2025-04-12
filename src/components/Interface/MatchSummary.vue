<template>
  <div style="display: flex; align-items: center; justify-content: center">
    <v-btn @click="press" class="text-none" variant="outlined" color="primary"
      >Get Match Summary</v-btn
    >
  </div>
  <v-row>
    <v-col cols="6">
      Unforced Errors:
      {{ matchSummary?.unforcedErrorsPlayer1 }}
      <br />
      Forced Errors:
      {{ matchSummary?.forcedErrorsPlayer1 }}
      <br />
      Winners: {{ matchSummary?.winnersPlayer1 }}
      <br />
      Aces: {{ matchSummary?.acesPlayer1 }}
      <br />
      Double Faults:
      {{ matchSummary?.doubleFaultsPlayer1 }}
      <br />
      First Serve %:
      {{ matchSummary?.firstServePercentagePlayer1 }}
      <br />
      Deuce Points Won:
      {{ matchSummary?.deucePointsWonPlayer1 }}/{{
        matchSummary?.deucePointsPlayer1
      }}
      <br />
      <br />
      Most Common Unforced Errors:
      <br />
      Error Count: {{ matchSummary?.countPlayer1First }}
      <br />
      Intent: {{ matchSummary?.intentPlayer1First }}
      <br />
      Stroke Side:
      {{ matchSummary?.strokeSidePlayer1First }}
      <br />
      Type of Stroke:
      {{ matchSummary?.strokeTypePlayer1First }}
      <br />
      Error Location:
      {{ matchSummary?.errorLocationPlayer1First }}
      <br />
      <br />
      Error Count: {{ matchSummary?.countPlayer1Second }}
      <br />
      Intent: {{ matchSummary?.intentPlayer1Second }}
      <br />
      Stroke Side:
      {{ matchSummary?.strokeSidePlayer1Second }}
      <br />
      Type of Stroke:
      {{ matchSummary?.strokeTypePlayer1Second }}
      <br />
      Error Location:
      {{ matchSummary?.errorLocationPlayer1Second }}
      <br />
    </v-col>
    <v-col cols="6">
      Unforced Errors:
      {{ matchSummary?.unforcedErrorsPlayer2 }}
      <br />
      Forced Errors:
      {{ matchSummary?.forcedErrorsPlayer2 }}
      <br />
      Winners: {{ matchSummary?.winnersPlayer2 }}
      <br />
      Aces: {{ matchSummary?.acesPlayer2 }}
      <br />
      Double Faults:
      {{ matchSummary?.doubleFaultsPlayer2 }}
      <br />
      First Serve %:
      {{ matchSummary?.firstServePercentagePlayer2 }}
      <br />
      Deuce Points Won:
      {{ matchSummary?.deucePointsWonPlayer2 }}/{{
        matchSummary?.deucePointsPlayer2
      }}
      <br />
      <br />
      Most Common Unforced Errors:
      <br />
      Error Count: {{ matchSummary?.countPlayer2First }}
      <br />
      Intent: {{ matchSummary?.intentPlayer2First }}
      <br />
      Stroke Side:
      {{ matchSummary?.strokeSidePlayer2First }}
      <br />
      Type of Stroke:
      {{ matchSummary?.strokeTypePlayer2First }}
      <br />
      Error Location:
      {{ matchSummary?.errorLocationPlayer2First }}
      <br />
      <br />
      Error Count: {{ matchSummary?.countPlayer2Second }}
      <br />
      Intent: {{ matchSummary?.intentPlayer2Second }}
      <br />
      Stroke Side:
      {{ matchSummary?.strokeSidePlayer2Second }}
      <br />
      Type of Stroke:
      {{ matchSummary?.strokeTypePlayer2Second }}
      <br />
      Error Location:
      {{ matchSummary?.errorLocationPlayer2Second }}
      <br />
    </v-col>
  </v-row>
</template>

<script>
import { useSummaryStore } from "@/stores/matchSummaryStore";
import { useMatchInfoStore } from "@/stores/matchInfoStore";
import { getMatchSummary } from "@/firebase/firebaseService";
import { getPointsLost } from "@/firebase/firebaseService";
import { storeToRefs } from "pinia";
import { useMatchScoreStore } from "@/stores/matchScoreStore";

export default {
  setup() {
    const matchSummary = useSummaryStore();
    const matchScoreStore = useMatchScoreStore();
    const matchInfoStore = useMatchInfoStore();
    return {
      matchSummary,
      matchScoreStore,
      matchInfoStore,
    };
  },
  methods: {
    async press() {
      let summary = {};
      const currentMatchID = this.matchScoreStore.currentMatchID;
      // const currentMatchID = "NZBiZCkGcyLCRt8zbO3A";
      console.log("currentMatchID", currentMatchID);
      const player1 = this.matchInfoStore.player1FullName;
      // const player1 = "Finley Buelte";
      console.log("player1", player1);
      const player2 = this.matchInfoStore.player2FullName;
      // const player2 = "Ganchi  Lafeyette 1";
      console.log("player2", player2);
      try {
        summary = await getMatchSummary(currentMatchID, player1, player2);
      } catch (error) {
        console.log("error getting match summary" + error);
        return;
      }
      // Update match summary for player1
      this.matchSummary.unforcedErrorsPlayer1 = summary[player1].unforcedErrors;
      this.matchSummary.forcedErrorsPlayer1 = summary[player1].forcedErrors;
      this.matchSummary.winnersPlayer1 = summary[player1].winners;
      this.matchSummary.acesPlayer1 = summary[player1].aces;
      this.matchSummary.doubleFaultsPlayer1 = summary[player1].doubleFaults;
      this.matchSummary.firstServePercentagePlayer1 =
        summary[player1].firstServePercentage;
      this.matchSummary.deucePointsPlayer1 = summary[player1].deucePoints;
      this.matchSummary.deucePointsWonPlayer1 = summary[player1].deucePointsWon;

      // Update match summary for player2
      this.matchSummary.unforcedErrorsPlayer2 = summary[player2].unforcedErrors;
      this.matchSummary.forcedErrorsPlayer2 = summary[player2].forcedErrors;
      this.matchSummary.winnersPlayer2 = summary[player2].winners;
      this.matchSummary.acesPlayer2 = summary[player2].aces;
      this.matchSummary.doubleFaultsPlayer2 = summary[player2].doubleFaults;
      this.matchSummary.firstServePercentagePlayer2 =
        summary[player2].firstServePercentage;
      this.matchSummary.deucePointsPlayer2 = summary[player2].deucePoints;
      this.matchSummary.deucePointsWonPlayer2 = summary[player2].deucePointsWon;

      try {
        const result = await getPointsLost(currentMatchID, player2);
        console.log("result", result);

        if (result.length >= 1 && result[0].obj) {
          const { count: count1, obj: obj1 } = result[0];

          this.matchSummary.countPlayer1First = count1;
          this.matchSummary.intentPlayer1First = obj1["Stroke Intent"] || "N/A";
          this.matchSummary.strokeSidePlayer1First =
            obj1["Stroke Side"] || "N/A";
          this.matchSummary.strokeTypePlayer1First =
            obj1["Stroke Type"] || "N/A";
          this.matchSummary.errorLocationPlayer1First =
            obj1["Error Location"] || "N/A";
        } else {
          console.warn("No data available for result[0]");
        }
        if (result.length >= 2 && result[1].obj) {
          const { count: count2, obj: obj2 } = result[1];

          this.matchSummary.countPlayer1Second = count2;
          this.matchSummary.intentPlayer1Second =
            obj2["Stroke Intent"] || "N/A";
          this.matchSummary.strokeSidePlayer1Second =
            obj2["Stroke Side"] || "N/A";
          this.matchSummary.strokeTypePlayer1Second =
            obj2["Stroke Type"] || "N/A";
          this.matchSummary.errorLocationPlayer1Second =
            obj2["Error Location"] || "N/A";
        } else {
          console.warn("No data available for result[1]");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
