<template>
  <div style="display: flex; align-items: center; justify-content: center">
    <v-btn @click="press" class="text-none" variant="outlined" color="primary"
      >Get Match Summary</v-btn
    >
  </div>
  <v-row>
    <!-- <v-col cols="6">
      {{ matchSummary[matchInfoStore.player1FullName].unforcedErrors }}
      Unforced Errors:
      {{ matchSummary[matchInfoStore.player1FullName]?.unforcedErrors }}
      <br />
      Forced Errors:
      {{ matchSummary[matchInfoStore.player1FullName]?.forcedErrors }}
      <br />
      Winners: {{ matchSummary[matchInfoStore.player1FullName]?.winners }}
      <br />
      Aces: {{ matchSummary[matchInfoStore.player1FullName]?.aces }}
      <br />
      Double Faults:
      {{ matchSummary[matchInfoStore.player1FullName]?.doubleFaults }}
      <br />
      First Serve %:
      {{ matchSummary[matchInfoStore.player1FullName]?.firstServePercentage }}
      <br />
      Deuce Points Won:
      {{ matchSummary[matchInfoStore.player1FullName]?.deucePointsWon }}/{{
        matchSummary[matchInfoStore.player1FullName]?.deucePoints
      }}
      <br />
      <br />
      Most Common Unforced Errors:
      <br />
      Error Count: {{ matchSummary[matchInfoStore.player1FullName]?.count1 }}
      <br />
      Intent: {{ matchSummary[matchInfoStore.player1FullName]?.intent1 }}
      <br />
      Stroke Side:
      {{ matchSummary[matchInfoStore.player1FullName]?.strokeSide1 }}
      <br />
      Type of Stroke:
      {{ matchSummary[matchInfoStore.player1FullName]?.strokeType1 }}
      <br />
      Error Location:
      {{ matchSummary[matchInfoStore.player1FullName]?.errorLocation1 }}
      <br />
      <br />
      Error Count: {{ matchSummary[matchInfoStore.player1FullName]?.count2 }}
      <br />
      Intent: {{ matchSummary[matchInfoStore.player1FullName]?.intent2 }}
      <br />
      Stroke Side:
      {{ matchSummary[matchInfoStore.player1FullName]?.strokeSide2 }}
      <br />
      Type of Stroke:
      {{ matchSummary[matchInfoStore.player1FullName]?.strokeType2 }}
      <br />
      Error Location:
      {{ matchSummary[matchInfoStore.player1FullName]?.errorLocation2 }}
      <br />
    </v-col>
    <v-col cols="6">
      Unforced Errors:
      {{ matchSummary[matchInfoStore.player2FullName]?.unforcedErrors }}
      <br />
      Forced Errors:
      {{ matchSummary[matchInfoStore.player2FullName]?.forcedErrors }}
      <br />
      Winners: {{ matchSummary[matchInfoStore.player2FullName]?.winners }}
      <br />
      Aces: {{ matchSummary[matchInfoStore.player2FullName]?.aces }}
      <br />
      Double Faults:
      {{ matchSummary[matchInfoStore.player2FullName]?.doubleFaults }}
      <br />
      First Serve %:
      {{ matchSummary[matchInfoStore.player2FullName]?.firstServePercentage }}
      <br />
      Deuce Points Won:
      {{ matchSummary[matchInfoStore.player2FullName]?.deucePointsWon }}/{{
        matchSummary[matchInfoStore.player2FullName]?.deucePoints
      }}
      <br />
      <br />
      Most Common Unforced Errors:
      <br />
      Error Count: {{ matchSummary[matchInfoStore.player2FullName]?.count1 }}
      <br />
      Intent: {{ matchSummary[matchInfoStore.player2FullName]?.intent1 }}
      <br />
      Stroke Side:
      {{ matchSummary[matchInfoStore.player2FullName]?.strokeSide1 }}
      <br />
      Type of Stroke:
      {{ matchSummary[matchInfoStore.player2FullName]?.strokeType1 }}
      <br />
      Error Location:
      {{ matchSummary[matchInfoStore.player2FullName]?.errorLocation1 }}
      <br />
      <br />
      Error Count: {{ matchSummary[matchInfoStore.player2FullName]?.count2 }}
      <br />
      Intent: {{ matchSummary[matchInfoStore.player2FullName]?.intent2 }}
      <br />
      Stroke Side:
      {{ matchSummary[matchInfoStore.player2FullName]?.strokeSide2 }}
      <br />
      Type of Stroke:
      {{ matchSummary[matchInfoStore.player2FullName]?.strokeType2 }}
      <br />
      Error Location:
      {{ matchSummary[matchInfoStore.player2FullName]?.errorLocation2 }}
      <br /> 
    </v-col> -->
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
      // const currentMatchID = this.matchScoreStore.currentMatchID;
      const currentMatchID = "NZBiZCkGcyLCRt8zbO3A";
      console.log("currentMatchID", currentMatchID);
      // const player1 = this.matchInfoStore.player1FullName;
      const player1 = "Finley Buelte";
      console.log("player1", player1);
      // const player2 = this.matchInfoStore.player2FullName;
      const player2 = "Ganchi  Lafeyette 1";
      console.log("player2", player2);

      try {
        const summary = await getMatchSummary(currentMatchID, player1, player2);

        // Update match summary for player1
        this.matchSummary[player1] = {
          unforcedErrors: summary[player1].unforcedErrors,
          forcedErrors: summary[player1].forcedErrors,
          winners: summary[player1].winners,
          aces: summary[player1].aces,
          doubleFaults: summary[player1].doubleFaults,
          firstServePercentage: summary[player1].firstServePercentage,
          deucePoints: summary[player1].deucePoints,
          deucePointsWon: summary[player1].deucePointsWon,
        };

        // Update match summary for player2
        this.matchSummary[player2] = {
          unforcedErrors: summary[player2].unforcedErrors,
          forcedErrors: summary[player2].forcedErrors,
          winners: summary[player2].winners,
          aces: summary[player2].aces,
          doubleFaults: summary[player2].doubleFaults,
          firstServePercentage: summary[player2].firstServePercentage,
          deucePoints: summary[player2].deucePoints,
          deucePointsWon: summary[player2].deucePointsWon,
        };
      } catch (error) {
        console.error(error);
      }

      try {
        const result = await getPointsLost(currentMatchID, player2);
        console.log("result", result);

        if (result.length >= 1 && result[0].obj) {
          const { count: count1, obj: obj1 } = result[0];

          this.matchSummary.count1 = count1;
          this.matchSummary.intent1 = obj1["Stroke Intent"] || "N/A";
          this.matchSummary.strokeSide1 = obj1["Stroke Side"] || "N/A";
          this.matchSummary.strokeType1 = obj1["Stroke Type"] || "N/A";
          this.matchSummary.errorLocation1 = obj1["Error Location"] || "N/A";
        } else {
          console.warn("No data available for result[0]");
        }
        if (result.length >= 2 && result[1].obj) {
          const { count: count2, obj: obj2 } = result[1];

          this.matchSummary.count2 = count2;
          this.matchSummary.intent2 = obj2["Stroke Intent"] || "N/A";
          this.matchSummary.strokeSide2 = obj2["Stroke Side"] || "N/A";
          this.matchSummary.strokeType2 = obj2["Stroke Type"] || "N/A";
          this.matchSummary.errorLocation2 = obj2["Error Location"] || "N/A";
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
