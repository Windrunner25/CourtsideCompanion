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
      const currentMatchID = "IDC8bVBz0S0RVhpfjbfS";
      const player1 = "Finley Buelte";
      const player2 = "Asbury 1";

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
      const currentMatchID = "IDC8bVBz0S0RVhpfjbfS";
      const player2 = "Asbury 1";

      try {
        await getPointsLost(currentMatchID, player2);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
