<template>
  <v-btn class="text-none" variant="tonal" color="primary" @click="getStats"
    >Set by Set</v-btn
  >
</template>

<script setup>
import { getSetBySet } from "@/firebase/firebaseService";
import { useSetAnalyticsStore } from "@/stores/setAnalyticsStore";
import { useMatchInfoStore } from "@/stores/matchInfoStore";
import { useMatchScoreStore } from "@/stores/matchScoreStore";

const setAnalytics = useSetAnalyticsStore();
const matchInfoStore = useMatchInfoStore();
const matchScoreStore = useMatchScoreStore();

const stat = [
  "totalPointsWon",
  "totalPoints",
  "totalPointWonPercentage",
  "winners",
  "unforcedErrors",
  "forcedErrors",
  "firstServePercentage",
  "firstServeWonCount",
  "firstServeCount",
  "firstServeWonPercentage",
  "secondServeWonCount",
  "secondServeCount",
  "secondServeWonPercentage",
  "pointsWonServedT",
  "pointsServedT",
  "pointsWonServedBodyBackhand",
  "pointsServedBodyBackhand",
  "pointsWonServedBodyForehand",
  "pointsServedBodyForehand",
  "pointsWonServedWide",
  "pointsServedWide",
  "pointsWonServedTDeuce",
  "pointsServedTDeuce",
  "pointsWonServedWideDeuce",
  "pointsServedWideDeuce",
  "pointsWonServedTAd",
  "pointsServedTAd",
  "pointsWonServedWideAd",
  "pointsServedWideAd",
  "totalReturnsIn",
  "totalReturns",
  "totalReturnPointsWon",
  "returnPointsWonPercentage",
  "returnsInPercentage",
  "returnErrorsWide",
  "returnErrorsBodyBackhand",
  "returnErrorsBodyForehand",
  "returnErrorsT",
  "totalReturnErrors",
  "totalErrorsNet",
  "totalErrorsLong",
  "totalErrorsWide",
  "rallyLength1_5Won",
  "rallyLength1_5",
  "rallyLength6_10Won",
  "rallyLength6_10",
  "rallyLength11_15Won",
  "rallyLength11_15",
  "rallyLength16plusWon",
  "rallyLength16plus",
  "deucePoints",
  "deucePointsWon",
  "doubleFaults",
];

const sets = ["whole", "set1", "set2", "set3"];

async function getStats() {
  let summary = {};
  const currentMatchID = matchScoreStore.currentMatchID;
  console.log("currentMatchID:", currentMatchID);

  const player1 = matchInfoStore.player1FullName;
  const player2 = matchInfoStore.player2FullName;

  try {
    summary = await getSetBySet(currentMatchID, player1, player2);

    // 🔥 Now loop correctly
    sets.forEach((set) => {
      stat.forEach((statName) => {
        setAnalytics.player1[set][statName] = summary[player1][set][statName] || 0;
        setAnalytics.player2[set][statName] = summary[player2][set][statName] || 0;
      });
    });

    // Special case
    setAnalytics.totalPoints = summary[player1].totalPoints;
  } catch (error) {
    console.log("error getting match summary" + error);
    return;
  }
}
</script>
