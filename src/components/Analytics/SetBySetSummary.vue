<template>
  <v-container class="stat-table pa-4">
    <v-container class="d-flex justify-center">
      <v-btn-toggle v-model="selectedSet">
        <v-btn value="whole" class="toggle-btn" width="25%" style="font-size: 80%;">Whole Match</v-btn>
        <v-btn value="set1" class="toggle-btn" width="25%" style="font-size: 80%;">First Set</v-btn>
        <v-btn value="set2" class="toggle-btn" width="25%" style="font-size: 80%;">Second Set</v-btn>
        <v-btn value="set3" class="toggle-btn" width="25%" style="font-size: 80%;">Third Set</v-btn>
      </v-btn-toggle>
    </v-container>
    <v-row>
      <v-col class="stat-header"> Match Overview </v-col>
      <v-col class="stat-header"> {{ matchInfoStore.player1FullName }} </v-col>
      <v-col class="stat-header"> {{ matchInfoStore.player2FullName }} </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> Total Points Won </v-col>
      <v-col class="stat-row">
        {{ setAnalytics.player1?.[selectedSet]?.totalPointsWon ?? 0 }} /
        {{ setAnalytics.player1?.[selectedSet]?.totalPoints ?? 0 }} –
        {{ setAnalytics.player1?.[selectedSet]?.totalPointWonPercentage ?? 0 }}%
      </v-col>
      <v-col>
        {{ setAnalytics.player2?.[selectedSet]?.totalPointsWon ?? 0 }} /
        {{ setAnalytics.player1?.[selectedSet]?.totalPoints ?? 0 }} –
        {{ setAnalytics.player2?.[selectedSet]?.totalPointWonPercentage ?? 0 }}%
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4"> Deuce Points Won </v-col>
      <v-col>
        {{ setAnalytics.player1?.[selectedSet]?.deucePointsWon ?? 0 }} /
        {{ setAnalytics.player1?.[selectedSet]?.deucePoints ?? 0 }}
      </v-col>
      <v-col>
        {{ setAnalytics.player2?.[selectedSet]?.deucePointsWon ?? 0 }} /
        {{ setAnalytics.player2?.[selectedSet]?.deucePoints ?? 0 }}
      </v-col>
    </v-row>
    <v-row>
      <v-col class="stat-header"> Errors </v-col>
      <v-col class="stat-header"> {{ matchInfoStore.player1FullName }} </v-col>
      <v-col class="stat-header"> {{ matchInfoStore.player2FullName }} </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> Winners </v-col>
      <v-col> {{ setAnalytics.player1?.[selectedSet]?.winners ?? 0 }} </v-col>
      <v-col> {{ setAnalytics.player2?.[selectedSet]?.winners ?? 0 }} </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> Unforced Errors </v-col>
      <v-col> {{ setAnalytics.player1?.[selectedSet]?.unforcedErrors ?? 0 }} </v-col>
      <v-col> {{ setAnalytics.player2?.[selectedSet]?.unforcedErrors ?? 0 }} </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> Forced Errors </v-col>
      <v-col> {{ setAnalytics.player1?.[selectedSet]?.forcedErrors ?? 0 }} </v-col>
      <v-col> {{ setAnalytics.player2?.[selectedSet]?.forcedErrors ?? 0 }} </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> Errors in Net </v-col>
      <v-col> {{ setAnalytics.player1?.[selectedSet]?.totalErrorsNet ?? 0 }} </v-col>
      <v-col> {{ setAnalytics.player2?.[selectedSet]?.totalErrorsNet ?? 0 }} </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> Errors Long </v-col>
      <v-col> {{ setAnalytics.player1?.[selectedSet]?.totalErrorsLong ?? 0 }} </v-col>
      <v-col> {{ setAnalytics.player2?.[selectedSet]?.totalErrorsLong ?? 0 }} </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> Errors Wide </v-col>
      <v-col> {{ setAnalytics.player1?.[selectedSet]?.totalErrorsWide ?? 0 }} </v-col>
      <v-col> {{ setAnalytics.player2?.[selectedSet]?.totalErrorsWide ?? 0 }} </v-col>
    </v-row>
    <v-row>
      <v-col class="stat-header"> Serves </v-col>
      <v-col class="stat-header"> {{ matchInfoStore.player1FullName }} </v-col>
      <v-col class="stat-header"> {{ matchInfoStore.player2FullName }} </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> Aces </v-col>
      <v-col> {{ setAnalytics.player1?.[selectedSet]?.aces ?? 0 }} </v-col>
      <v-col> {{ setAnalytics.player2?.[selectedSet]?.aces ?? 0 }} </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> Double Faults </v-col>
      <v-col> {{ setAnalytics.player1?.[selectedSet]?.doubleFaults ?? 0 }} </v-col>
      <v-col> {{ setAnalytics.player2?.[selectedSet]?.doubleFaults ?? 0 }} </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> First Serve % </v-col>
      <v-col> {{ setAnalytics.player1?.[selectedSet]?.firstServePercentage ?? 0 }}% </v-col>
      <v-col> {{ setAnalytics.player2?.[selectedSet]?.firstServePercentage ?? 0 }}% </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> First Serve Won </v-col>
      <v-col>
        {{ setAnalytics.player1?.[selectedSet]?.firstServeWonCount ?? 0 }} /
        {{ setAnalytics.player1?.[selectedSet]?.firstServeCount ?? 0 }} –
        {{ setAnalytics.player1?.[selectedSet]?.firstServeWonPercentage ?? 0 }}%</v-col
      >
      <v-col>
        {{ setAnalytics.player2?.[selectedSet]?.firstServeWonCount ?? 0 }} /
        {{ setAnalytics.player2?.[selectedSet]?.firstServeCount ?? 0 }} –
        {{ setAnalytics.player2?.[selectedSet]?.firstServeWonPercentage ?? 0 }}%</v-col
      >
    </v-row>
    <v-row>
      <v-col cols="4"> Second Serve Won </v-col>
      <v-col>
        {{ setAnalytics.player1?.[selectedSet]?.secondServeWonCount ?? 0 }} /
        {{ setAnalytics.player1?.[selectedSet]?.secondServeCount ?? 0 }} –
        {{ setAnalytics.player1?.[selectedSet]?.secondServeWonPercentage ?? 0 }}%</v-col
      >
      <v-col>
        {{ setAnalytics.player2?.[selectedSet]?.secondServeWonCount ?? 0 }} /
        {{ setAnalytics.player2?.[selectedSet]?.secondServeCount ?? 0 }} –
        {{ setAnalytics.player2?.[selectedSet]?.secondServeWonPercentage ?? 0 }}%</v-col
      >
    </v-row>
    <v-row>
      <v-col cols="4"> Points Won Serving T </v-col>
      <v-col>
        {{ setAnalytics.player1?.[selectedSet]?.pointsWonServedT ?? 0 }} /
        {{ setAnalytics.player1?.[selectedSet]?.pointsServedT ?? 0 }} –
        {{ setAnalytics.player1?.[selectedSet]?.pointsWonServedTDeuce ?? 0 }} Deuce/{{
          setAnalytics.player1?.[selectedSet]?.pointsWonServedTAd
        ?? 0 }}
        Ad
      </v-col>
      <v-col>
        {{ setAnalytics.player2?.[selectedSet]?.pointsWonServedT ?? 0 }} /
        {{ setAnalytics.player2?.[selectedSet]?.pointsServedT ?? 0 }} –
        {{ setAnalytics.player2?.[selectedSet]?.pointsWonServedTDeuce ?? 0 }} Deuce/{{
          setAnalytics.player2?.[selectedSet]?.pointsWonServedTAd
        ?? 0 }}
        Ad
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> Points Won Serving Body Forehand </v-col>
      <v-col>
        {{ setAnalytics.player1?.[selectedSet]?.pointsWonServedBodyForehand ?? 0 }} /
        {{ setAnalytics.player1?.[selectedSet]?.pointsServedBodyForehand ?? 0 }}
      </v-col>
      <v-col>
        {{ setAnalytics.player2?.[selectedSet]?.pointsWonServedBodyForehand ?? 0 }} /
        {{ setAnalytics.player2?.[selectedSet]?.pointsServedBodyForehand ?? 0 }}
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> Points Won Serving Body Backhand </v-col>
      <v-col>
        {{ setAnalytics.player1?.[selectedSet]?.pointsWonServedBodyBackhand ?? 0 }} /
        {{ setAnalytics.player1?.[selectedSet]?.pointsServedBodyBackhand ?? 0 }}
      </v-col>
      <v-col>
        {{ setAnalytics.player2?.[selectedSet]?.pointsWonServedBodyBackhand ?? 0 }} /
        {{ setAnalytics.player2?.[selectedSet]?.pointsServedBodyBackhand ?? 0 }}
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> Points Won Serving Wide </v-col>
      <v-col>
        {{ setAnalytics.player1?.[selectedSet]?.pointsWonServedWide ?? 0 }} /
        {{ setAnalytics.player1?.[selectedSet]?.pointsServedWide ?? 0 }} –
        {{ setAnalytics.player1?.[selectedSet]?.pointsWonServedWideDeuce ?? 0 }} Deuce/{{
          setAnalytics.player1?.[selectedSet]?.pointsWonServedWideAd
        ?? 0 }}
        Ad
      </v-col>
      <v-col>
        {{ setAnalytics.player2?.[selectedSet]?.pointsWonServedWide ?? 0 }} /
        {{ setAnalytics.player2?.[selectedSet]?.pointsServedWide ?? 0 }} –
        {{ setAnalytics.player2?.[selectedSet]?.pointsWonServedWideDeuce ?? 0 }} Deuce/{{
          setAnalytics.player2?.[selectedSet]?.pointsWonServedWideAd
        ?? 0 }}
        Ad
      </v-col>
    </v-row>
    <v-row>
      <v-col class="stat-header"> Returns </v-col>
      <v-col class="stat-header"> {{ matchInfoStore.player1FullName }} </v-col>
      <v-col class="stat-header"> {{ matchInfoStore.player2FullName }} </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> Returns In </v-col>
      <v-col>
        {{ setAnalytics.player1?.[selectedSet]?.totalReturnsIn ?? 0 }} /
        {{ setAnalytics.player1?.[selectedSet]?.totalReturns ?? 0 }} –
        {{ setAnalytics.player1?.[selectedSet]?.returnsInPercentage ?? 0 }}%
      </v-col>
      <v-col>
        {{ setAnalytics.player2?.[selectedSet]?.totalReturnsIn ?? 0 }} /
        {{ setAnalytics.player2?.[selectedSet]?.totalReturns ?? 0 }} –
        {{ setAnalytics.player2?.[selectedSet]?.returnsInPercentage ?? 0 }}%
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> Return Points Won </v-col>
      <v-col>
        {{ setAnalytics.player1?.[selectedSet]?.totalReturnPointsWon ?? 0 }} /
        {{ setAnalytics.player1?.[selectedSet]?.totalReturns ?? 0 }} –
        {{ setAnalytics.player1?.[selectedSet]?.returnPointsWonPercentage ?? 0 }}%
      </v-col>
      <v-col>
        {{ setAnalytics.player2?.[selectedSet]?.totalReturnPointsWon ?? 0 }} /
        {{ setAnalytics.player2?.[selectedSet]?.totalReturns ?? 0 }} –
        {{ setAnalytics.player2?.[selectedSet]?.returnPointsWonPercentage ?? 0 }}%
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> Return Winners </v-col>
      <v-col> {{ setAnalytics.player1?.[selectedSet]?.totalReturnWinners ?? 0 }} </v-col>
      <v-col> {{ setAnalytics.player2?.[selectedSet]?.totalReturnWinners ?? 0 }} </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> Wide Returns Missed </v-col>
      <v-col>
        {{ setAnalytics.player1?.[selectedSet]?.returnErrorsWide ?? 0 }} /
        {{ setAnalytics.player1?.[selectedSet]?.returnsWide ?? 0 }} –
        {{ setAnalytics.player1?.[selectedSet]?.returnErrorsWideDeuce ?? 0 }} Deuce/{{
          setAnalytics.player1?.[selectedSet]?.returnErrorsWideAd
        ?? 0 }}
        Ad
      </v-col>
      <v-col>
        {{ setAnalytics.player2?.[selectedSet]?.returnErrorsWide ?? 0 }} /
        {{ setAnalytics.player2?.[selectedSet]?.returnsWide ?? 0 }} –
        {{ setAnalytics.player2?.[selectedSet]?.returnErrorsWideDeuce ?? 0 }} Deuce/{{
          setAnalytics.player2?.[selectedSet]?.returnErrorsWideAd
        ?? 0 }}
        Ad
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> Body Forehand Returns Missed </v-col>
      <v-col>
        {{ setAnalytics.player1?.[selectedSet]?.returnErrorsBodyForehand ?? 0 }} /
        {{ setAnalytics.player1?.[selectedSet]?.returnsBodyForehand ?? 0 }}
      </v-col>
      <v-col>
        {{ setAnalytics.player2?.[selectedSet]?.returnErrorsBodyForehand ?? 0 }} /
        {{ setAnalytics.player2?.[selectedSet]?.returnsBodyForehand ?? 0 }}
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> Body Backhand Returns Missed </v-col>
      <v-col>
        {{ setAnalytics.player1?.[selectedSet]?.returnErrorsBodyBackhand ?? 0 }} /
        {{ setAnalytics.player1?.[selectedSet]?.returnsBodyBackhand ?? 0 }}
      </v-col>
      <v-col>
        {{ setAnalytics.player2?.[selectedSet]?.returnErrorsBodyBackhand ?? 0 }} /
        {{ setAnalytics.player2?.[selectedSet]?.returnsBodyBackhand ?? 0 }}
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> T Returns Missed </v-col>
      <v-col>
        {{ setAnalytics.player1?.[selectedSet]?.returnErrorsT ?? 0 }} /
        {{ setAnalytics.player1?.[selectedSet]?.returnsT ?? 0 }} –
        {{ setAnalytics.player1?.[selectedSet]?.returnErrorsTDeuce ?? 0 }} Deuce/{{
          setAnalytics.player1?.[selectedSet]?.returnErrorsTAd
        ?? 0 }}
        Ad
      </v-col>
      <v-col>
        {{ setAnalytics.player2?.[selectedSet]?.returnErrorsT ?? 0 }} /
        {{ setAnalytics.player2?.[selectedSet]?.returnsT ?? 0 }} –
        {{ setAnalytics.player2?.[selectedSet]?.returnErrorsTDeuce ?? 0 }} Deuce/{{
          setAnalytics.player2?.[selectedSet]?.returnErrorsTAd
        ?? 0 }}
        Ad
      </v-col>
    </v-row>
    <v-row>
      <v-col class="stat-header"> Point Length </v-col>
      <v-col class="stat-header"> {{ matchInfoStore.player1FullName }} </v-col>
      <v-col class="stat-header"> {{ matchInfoStore.player2FullName }} </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> Rallies of 1-5 Shots Won </v-col>
      <v-col>
        {{ setAnalytics.player1?.[selectedSet]?.rallyLength1_5Won ?? 0 }} /
        {{ setAnalytics.player1?.[selectedSet]?.rallyLength1_5 ?? 0 }}
      </v-col>
      <v-col>
        {{ setAnalytics.player2?.[selectedSet]?.rallyLength1_5Won ?? 0 }} /
        {{ setAnalytics.player2?.[selectedSet]?.rallyLength1_5 ?? 0 }}
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> Rallies of 6-10 Shots Won </v-col>
      <v-col>
        {{ setAnalytics.player1?.[selectedSet]?.rallyLength6_10Won ?? 0 }} /
        {{ setAnalytics.player1?.[selectedSet]?.rallyLength6_10 ?? 0 }}
      </v-col>
      <v-col>
        {{ setAnalytics.player2?.[selectedSet]?.rallyLength6_10Won ?? 0 }} /
        {{ setAnalytics.player2?.[selectedSet]?.rallyLength6_10 ?? 0 }}
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> Rallies of 11-15 Shots Won </v-col>
      <v-col>
        {{ setAnalytics.player1?.[selectedSet]?.rallyLength11_15Won ?? 0 }} /
        {{ setAnalytics.player1?.[selectedSet]?.rallyLength11_15 ?? 0 }}
      </v-col>
      <v-col>
        {{ setAnalytics.player2?.[selectedSet]?.rallyLength11_15Won ?? 0 }} /
        {{ setAnalytics.player2?.[selectedSet]?.rallyLength11_15 ?? 0 }}
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> Rallies of 16+ Shots Won </v-col>
      <v-col>
        {{ setAnalytics.player1?.[selectedSet]?.rallyLength16plusWon ?? 0 }} /
        {{ setAnalytics.player1?.[selectedSet]?.rallyLength16plus ?? 0 }}
      </v-col>
      <v-col>
        {{ setAnalytics.player2?.[selectedSet]?.rallyLength16plusWon ?? 0 }} /
        {{ setAnalytics.player2?.[selectedSet]?.rallyLength16plus ?? 0 }}
      </v-col>
    </v-row>
    <v-row>
      <v-col class="stat-header"> Most Common Errors - {{ matchInfoStore.player1FullName }}</v-col>
    </v-row>
    <v-row>
      <v-col>
        {{ setAnalytics.player1?.countFirst ?? 0 }} Errors:
        {{ setAnalytics.player1?.intentFirst ?? 0 }}
        {{ setAnalytics.player1?.strokeSideFirst ?? 0 }}
        {{ setAnalytics.player1?.strokeTypeFirst ?? 0 }} – Missed
        {{ setAnalytics.player1?.errorLocationFirst ?? 0 }}</v-col
      >
    </v-row>
    <v-row>
      <v-col>
        {{ setAnalytics.player1?.countSecond ?? 0 }} Errors:
        {{ setAnalytics.player1?.intentSecond ?? 0 }}
        {{ setAnalytics.player1?.strokeSideSecond ?? 0 }}
        {{ setAnalytics.player1?.strokeTypeSecond ?? 0 }} – Missed
        {{ setAnalytics.player1?.errorLocationSecond ?? 0 }}</v-col
      >
    </v-row>
  </v-container>
</template>

<script setup>
import { useSetAnalyticsStore } from "@/stores/setAnalyticsStore";
import { useMatchInfoStore } from "@/stores/matchInfoStore";

const matchInfoStore = useMatchInfoStore();
const setAnalytics = useSetAnalyticsStore();
const selectedSet = ref("whole"); 

const player1 = computed(() => setAnalytics.player1?.[selectedSet.value] ?? {});
const player2 = computed(() => setAnalytics.player2?.[selectedSet.value] ?? {});

</script>

<style>
.stat-table {
  background-color: #f9f9f9;
  border-radius: 10px;
  border: 1px solid #ccc;
  max-width: 800px;
  margin: auto;
  font-family: "Segoe UI", sans-serif;
  font-size: small;
  animation: fadeInUp 0.8s ease;
}

.stat-header {
  background-color: #eaeaea;
  font-weight: bold;
}

.stat-row {
  align-items: center;
}

.stat-label {
  font-weight: 600;
  background-color: #f1f1f1;
}

.analytics-title {
  font-size: 2.8rem;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #333;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: -20px;
}

@keyframes fadeInUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.toggle-buttons {
  background-color: #f5f5f5;
  padding: 8px;
  border-radius: 8px;
}

/* Normal button appearance */
.toggle-btn {
  background-color: white;
  color: #555;
  font-weight: bold;
  transition: background-color 0.2s, color 0.2s;
  text-transform: none;
}

/* Selected (active) button appearance */
.v-btn--active.toggle-btn {
  background-color: #fedb8c; /* Light blue shade when selected */
  color: black; /* Vuetify's primary blue color */
}
</style>
