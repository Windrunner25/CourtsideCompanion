<template>
  <v-btn @click="press">Get Match Summary</v-btn>
  <v-btn @click="pointsLost">Get Points Lost</v-btn>
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
    </v-col>
    <v-col cols="6"> </v-col>
  </v-row>
</template>

<script>
import { useSummaryStore } from "@/stores/matchSummaryStore";
import { getMatchSummary } from "@/firebase/firebaseService";
import { getPointsLost } from "@/firebase/firebaseService";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const matchSummary = useSummaryStore();
    const { unforcedErrors, forcedErrors, winners, aces } =
      storeToRefs(matchSummary);
    return { matchSummary, unforcedErrors, forcedErrors, winners, aces };
  },
  methods: {
    async press() {
      const currentMatchID = "NZBiZCkGcyLCRt8zbO3A";
      const player1 = "Finley Buelte";
      const player2 = "Ganchi  Lafeyette 1";

      try {
        const { unforcedErrors, forcedErrors, winners, aces } =
          await getMatchSummary(currentMatchID, player1, player2);
        this.matchSummary.unforcedErrors = unforcedErrors;
        this.matchSummary.forcedErrors = forcedErrors;
        this.matchSummary.winners = winners;
        this.matchSummary.aces = aces;
      } catch (error) {
        console.error(error);
      }
    },
    async pointsLost() {
      const currentMatchID = "NZBiZCkGcyLCRt8zbO3A";
      const player2 = "Ganchi  Lafeyette 1";

      try {
        const result = await getPointsLost(currentMatchID, player2);

        if (result.length >= 1 && result[0].obj) {
          const { count: count1, obj: obj1 } = result[0];

          const intent1 = obj1["Stroke Intent"] || "N/A";
          const strokeSide1 = obj1["Stroke Side"] || "N/A";
          const strokeType1 = obj1["Stroke Type"] || "N/A";
          const errorLocation1 = obj1["Error Location"] || "N/A";

          console.log(
            `Finley made ${count1} unforced errors with the following characteristics: ${intent1} ${strokeSide1} ${strokeType1} ${errorLocation1}`
          );
        } else {
          console.warn("No data available for result[0]");
        }
        if (result.length >= 2 && result[1].obj) {
          const { count: count2, obj: obj2 } = result[1];

          const intent2 = obj2["Stroke Intent"] || "N/A";
          const strokeSide2 = obj2["Stroke Side"] || "N/A";
          const strokeType2 = obj2["Stroke Type"] || "N/A";
          const errorLocation2 = obj2["Error Location"] || "N/A";

          console.log(
            `Finley made ${count2} unforced errors with the following characteristics: ${intent2} ${strokeSide2} ${strokeType2} ${errorLocation2}`
          );
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
