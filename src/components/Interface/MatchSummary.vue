<template>
  <div style="display: flex; align-items: center; justify-content: center">
    <v-btn @click="press" class="text-none" variant="outlined" color="primary"
      >Get Match Summary</v-btn
    >
  </div>
  <v-row>
    <v-col cols="6">
      Unforced Errors: {{ unforcedErrors }}
      <br />
      Forced Errors: {{ forcedErrors }}
      <br />
      Winners: {{ winners }}
      <br />
      Aces: {{ aces }}
      <br />
      Double Faults: {{ doubleFaults }}
      <br />
      First Serve %: {{ firstServePercentage }}
      <br />
      Deuce Points Won: {{ deucePointsWon }}/{{ deucePoints }}
      <br />
      <br />
      Most Common Unforced Errors:
      <br />
      Error Count: {{ count1 }}
      <br />
      Intent: {{ intent1 }}
      <br />
      Stroke Side: {{ strokeSide1 }}
      <br />
      Type of Stroke: {{ strokeType1 }}
      <br />
      Error Location: {{ errorLocation1 }}
      <br />
      <br />
      Error Count: {{ count2 }}
      <br />
      Intent: {{ intent2 }}
      <br />
      Stroke Side: {{ strokeSide2 }}
      <br />
      Type of Stroke: {{ strokeType2 }}
      <br />
      Error Location: {{ errorLocation2 }}
      <br />
    </v-col>
    <v-col cols="6">
      Unforced Errors: {{ unforcedErrors }}
      <br />
      Forced Errors: {{ forcedErrors }}
      <br />
      Winners: {{ winners }}
      <br />
      Aces: {{ aces }}
      <br />
      Double Faults: {{ doubleFaults }}
      <br />
      First Serve %: {{ firstServePercentage }}
      <br />
      Deuce Points Won: {{ deucePointsWon }}/{{ deucePoints }}
      <br />
      <br />
      Most Common Unforced Errors:
      <br />
      Error Count: {{ count1 }}
      <br />
      Intent: {{ intent1 }}
      <br />
      Stroke Side: {{ strokeSide1 }}
      <br />
      Type of Stroke: {{ strokeType1 }}
      <br />
      Error Location: {{ errorLocation1 }}
      <br />
      <br />
      Error Count: {{ count2 }}
      <br />
      Intent: {{ intent2 }}
      <br />
      Stroke Side: {{ strokeSide2 }}
      <br />
      Type of Stroke: {{ strokeType2 }}
      <br />
      Error Location: {{ errorLocation2 }}
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
    const {
      unforcedErrors,
      forcedErrors,
      winners,
      aces,
      doubleFaults,
      firstServePercentage,
      deucePoints,
      deucePointsWon,
      count1,
      intent1,
      strokeSide1,
      strokeType1,
      errorLocation1,
      count2,
      intent2,
      strokeSide2,
      strokeType2,
      errorLocation2,
    } = storeToRefs(matchSummary);
    return {
      matchSummary,
      matchScoreStore,
      matchInfoStore,
      unforcedErrors,
      forcedErrors,
      winners,
      aces,
      doubleFaults,
      firstServePercentage,
      deucePoints,
      deucePointsWon,
      count1,
      intent1,
      strokeSide1,
      strokeType1,
      errorLocation1,
      count2,
      intent2,
      strokeSide2,
      strokeType2,
      errorLocation2,
    };
  },
  methods: {
    async press() {
      const currentMatchID = this.matchScoreStore.currentMatchID;
      //   const currentMatchID = "NZBiZCkGcyLCRt8zbO3A";
      console.log("currentMatchID", currentMatchID);
      const player1 = this.matchInfoStore.player1FullName;
      //   const player1 = "Finley Buelte";
      console.log("player1", player1);
      const player2 = this.matchInfoStore.player2FullName;
      //   const player2 = "Ganchi  Lafeyette 1";
      console.log("player2", player2);

      try {
        const {
          unforcedErrors,
          forcedErrors,
          winners,
          aces,
          doubleFaults,
          firstServePercentage,
          deucePoints,
          deucePointsWon,
        } = await getMatchSummary(currentMatchID, player1, player2);
        this.matchSummary.unforcedErrors = unforcedErrors;
        this.matchSummary.forcedErrors = forcedErrors;
        this.matchSummary.winners = winners;
        this.matchSummary.aces = aces;
        this.matchSummary.doubleFaults = doubleFaults;
        this.matchSummary.firstServePercentage = firstServePercentage;
        this.matchSummary.deucePoints = deucePoints;
        this.matchSummary.deucePointsWon = deucePointsWon;
      } catch (error) {
        console.error(error);
      }

      try {
        const result = await getPointsLost(currentMatchID, player2);

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
    //     async pointsLost() {
    //       const currentMatchID = "NZBiZCkGcyLCRt8zbO3A";
    //       const player2 = "Ganchi  Lafeyette 1";

    //       try {
    //         const result = await getPointsLost(currentMatchID, player2);

    //         if (result.length >= 1 && result[0].obj) {
    //           const { count: count1, obj: obj1 } = result[0];

    //           this.matchSummary.count1 = count1;
    //           this.matchSummary.intent1 = obj1["Stroke Intent"] || "N/A";
    //           this.matchSummary.strokeSide1 = obj1["Stroke Side"] || "N/A";
    //           this.matchSummary.strokeType1 = obj1["Stroke Type"] || "N/A";
    //           this.matchSummary.errorLocation1 = obj1["Error Location"] || "N/A";
    //         } else {
    //           console.warn("No data available for result[0]");
    //         }
    //         if (result.length >= 2 && result[1].obj) {
    //           const { count: count2, obj: obj2 } = result[1];

    //           this.matchSummary.count2 = count2;
    //           this.matchSummary.intent2 = obj2["Stroke Intent"] || "N/A";
    //           this.matchSummary.strokeSide2 = obj2["Stroke Side"] || "N/A";
    //           this.matchSummary.strokeType2 = obj2["Stroke Type"] || "N/A";
    //           this.matchSummary.errorLocation2 = obj2["Error Location"] || "N/A";
    //         } else {
    //           console.warn("No data available for result[1]");
    //         }
    //       } catch (error) {
    //         console.error(error);
    //       }
    //     },
  },
};
</script>
