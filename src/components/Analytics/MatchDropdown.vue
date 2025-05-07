<template>
  <div style="width: 175px; height: 50px">
    <v-select
      style="margin-bottom: 0"
      v-model="selectedMatch"
      :items="matchOptions"
      item-title="label"
      :return-object="true"
      :label="title"
      density="comfortable"
    />
  </div>
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
      class="centered"
    />
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { fetchMatches } from "@/firebase/firebaseService";
import { useMatchInfoStore } from "@/stores/matchInfoStore";
import { useMatchScoreStore } from "@/stores/matchScoreStore";
import { getSetBySet } from "@/firebase/firebaseService";
import { getPointsLost } from "@/firebase/firebaseService";
import { useSetAnalyticsStore } from "@/stores/setAnalyticsStore";

const loading = ref(false);
const matchOptions = ref([]);
const selectedMatch = ref(null);
const matchInfoStore = useMatchInfoStore();
const scoreStore = useMatchScoreStore();

const setAnalytics = useSetAnalyticsStore();

const props = defineProps({
  title: String,
});

onMounted(async () => {
  matchOptions.value = await fetchMatches();
});

watch(selectedMatch, (match) => {
  if (match) {
    console.log(
      match.player1FirstName,
      match.player1LastName,
      match.player2FirstName,
      match.player2LastName,
      match.finalScore
    );
    matchInfoStore.setMatchInfo({
      player1FirstName: match.player1FirstName,
      player1LastName: match.player1LastName,
      player2FirstName: match.player2FirstName,
      player2LastName: match.player2LastName,
      finalScore: match.finalScore,
    });
    scoreStore.setMatchID(match.id);
  }
});

watch(
  () => scoreStore.currentMatchID,
  (newID, oldID) => {
    console.log("Match ID changed to:", newID);
    console.log("Running stats function now...");
    getStats();
  }
);

const stat = [
  "totalPointsWon",
  "totalPoints",
  "totalPointWonPercentage",
  "winners",
  "unforcedErrors",
  "forcedErrors",
  "aces",
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
  "totalReturnWinners",
  "totalReturns",
  "totalReturnPointsWon",
  "returnPointsWonPercentage",
  "returnsInPercentage",
  "returnErrorsWide",
  "returnsWide",
  "returnErrorsWideAd",
  "returnErrorsWideDeuce",
  "returnErrorsBodyBackhand",
  "returnsBodyBackhand",
  "returnErrorsBodyForehand",
  "returnsBodyForehand",
  "returnErrorsT",
  "returnsT",
  "returnErrorsTAd",
  "returnErrorsTDeuce",
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
  loading.value = true;
  let summary = {};
  const currentMatchID = scoreStore.currentMatchID;
  console.log("currentMatchID:", currentMatchID);

  const player1 = matchInfoStore.player1FullName;
  const player2 = matchInfoStore.player2FullName;

  try {
    summary = await getSetBySet(currentMatchID, player1, player2);

    sets.forEach((set) => {
      stat.forEach((statName) => {
        setAnalytics.player1[set][statName] =
          summary[player1][set][statName] || 0;
        setAnalytics.player2[set][statName] =
          summary[player2][set][statName] || 0;
      });
    });

    // Special case
    setAnalytics.totalPoints = summary[player1].totalPoints;
  } catch (error) {
    console.log("error getting match summary" + error);
    return;
  }

  try {
    const pointsLost = await getPointsLost(currentMatchID, player2);
    console.log("pointsLost", pointsLost);

    if (pointsLost.length >= 1 && pointsLost[0].obj) {
      const { count: count1, obj: obj1 } = pointsLost[0];

      setAnalytics.player1.countFirst = count1;
      setAnalytics.player1.intentFirst = obj1["Stroke Intent"] || "N/A";
      setAnalytics.player1.strokeSideFirst = obj1["Stroke Side"] || "N/A";
      setAnalytics.player1.strokeTypeFirst = obj1["Stroke Type"] || "N/A";
      setAnalytics.player1.errorLocationFirst = obj1["Error Location"] || "N/A";
    } else {
      console.warn("No data available for pointsLost[0]");
    }
    if (pointsLost.length >= 2 && pointsLost[1].obj) {
      const { count: count2, obj: obj2 } = pointsLost[1];

      setAnalytics.player1.countSecond = count2;
      setAnalytics.player1.intentSecond = obj2["Stroke Intent"] || "N/A";
      setAnalytics.player1.strokeSideSecond = obj2["Stroke Side"] || "N/A";
      setAnalytics.player1.strokeTypeSecond = obj2["Stroke Type"] || "N/A";
      setAnalytics.player1.errorLocationSecond =
        obj2["Error Location"] || "N/A";
    } else {
      console.warn("No data available for pointsLost[1]");
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.centered {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}
</style>
