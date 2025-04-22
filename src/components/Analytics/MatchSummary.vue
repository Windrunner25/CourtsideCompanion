<template>
  <v-container class="stat-table pa-4">
    <v-row>
      <v-col class="stat-header"> General </v-col>
    </v-row>
    <v-row >
      <v-col > Total Points Won </v-col>
      <v-col> {{ matchSummary.totalPointsWonPlayer1 }} </v-col>
      <v-col> {{ matchSummary.totalPointsWonPlayer2 }} </v-col>
    </v-row>
    <v-row>
      <v-col> Deuce Points Won </v-col>
      <v-col> {{ matchSummary.deucePointsWonPlayer1 }} </v-col>
      <v-col> {{ matchSummary.deucePointsWonPlayer2 }} </v-col>
    </v-row>
    <v-row>
      <v-col class="stat-header"> Errors </v-col>
    </v-row>
    <v-row>
      <v-col> Winners </v-col>
      <v-col> {{ matchSummary.winnersPlayer1 }} </v-col>
      <v-col> {{ matchSummary.winnersPlayer2 }} </v-col>
    </v-row>
    <v-row>
      <v-col> Unforced Errors </v-col>
      <v-col> {{ matchSummary.unforcedErrorsPlayer1 }} </v-col>
      <v-col> {{ matchSummary.unforcedErrorsPlayer2 }} </v-col>
    </v-row>
    <v-row>
      <v-col> Forced Errors </v-col>
      <v-col> {{ matchSummary.forcedErrorsPlayer1 }} </v-col>
      <v-col> {{ matchSummary.forcedErrorsPlayer2 }} </v-col>
    </v-row>
    <v-row>
      <v-col> Errors in Net </v-col>
      <v-col> {{ matchSummary.totalErrorsNetPlayer1 }} </v-col>
      <v-col> {{ matchSummary.totalErrorsNetPlayer2 }} </v-col>
    </v-row>
    <v-row>
      <v-col> Errors Long </v-col>
      <v-col> {{ matchSummary.totalErrorsLongPlayer1 }} </v-col>
      <v-col> {{ matchSummary.totalErrorsLongPlayer2 }} </v-col>
    </v-row>
    <v-row>
      <v-col> Errors Wide </v-col>
      <v-col> {{ matchSummary.totalErrorsWidePlayer1 }} </v-col>
      <v-col> {{ matchSummary.totalErrorsWidePlayer2 }} </v-col>
    </v-row>
    <v-row>
      <v-col class="stat-header"> Serves </v-col>
    </v-row>
    <v-row>
      <v-col> Double Faults </v-col>
      <v-col> {{ matchSummary.totalErrorsWidePlayer1 }} </v-col>
      <v-col> {{ matchSummary.totalErrorsWidePlayer2 }} </v-col>
    </v-row>
    <v-row>
      <v-col> First Serve % </v-col>
      <v-col> {{ matchSummary.totalErrorsWidePlayer1 }} </v-col>
      <v-col> {{ matchSummary.totalErrorsWidePlayer2 }} </v-col>
    </v-row>
    <v-row>
      <v-col> First Serve Won </v-col>
      <v-col> {{ matchSummary.totalErrorsWidePlayer1 }} </v-col>
      <v-col> {{ matchSummary.totalErrorsWidePlayer2 }} </v-col>
    </v-row>
    <v-row>
      <v-col> Second Serve Won </v-col>
      <v-col> {{ matchSummary.totalErrorsWidePlayer1 }} </v-col>
      <v-col> {{ matchSummary.totalErrorsWidePlayer2 }} </v-col>
    </v-row>
    <v-row>
      <v-col> Points Won Serving T </v-col>
      <v-col> {{ matchSummary.totalErrorsWidePlayer1 }} </v-col>
      <v-col> {{ matchSummary.totalErrorsWidePlayer2 }} </v-col>
    </v-row>
    <v-row>
      <v-col> Points Won Serving Body Forehand </v-col>
      <v-col> {{ matchSummary.totalErrorsWidePlayer1 }} </v-col>
      <v-col> {{ matchSummary.totalErrorsWidePlayer2 }} </v-col>
    </v-row>
    <v-row>
      <v-col> Points Won Serving Body Backhand </v-col>
      <v-col> {{ matchSummary.totalErrorsWidePlayer1 }} </v-col>
      <v-col> {{ matchSummary.totalErrorsWidePlayer2 }} </v-col>
    </v-row>
    <v-row>
      <v-col> Points Won Serving Wide </v-col>
      <v-col> {{ matchSummary.totalErrorsWidePlayer1 }} </v-col>
      <v-col> {{ matchSummary.totalErrorsWidePlayer2 }} </v-col>
    </v-row>
    <v-row>
      <v-col class="stat-header"> Returns </v-col>
    </v-row>
    <v-row>
      <v-col> Returns In </v-col>
      <v-col> {{ matchSummary.totalErrorsWidePlayer1 }} </v-col>
      <v-col> {{ matchSummary.totalErrorsWidePlayer2 }} </v-col>
    </v-row>
    <v-row>
      <v-col> Return Points Won </v-col>
      <v-col> {{ matchSummary.totalErrorsWidePlayer1 }} </v-col>
      <v-col> {{ matchSummary.totalErrorsWidePlayer2 }} </v-col>
    </v-row>
    <v-row>
      <v-col> Wide Returns Missed </v-col>
      <v-col> {{ matchSummary.totalErrorsWidePlayer1 }} </v-col>
      <v-col> {{ matchSummary.totalErrorsWidePlayer2 }} </v-col>
    </v-row>
    <v-row>
      <v-col> Body Forehand Returns Missed </v-col>
      <v-col> {{ matchSummary.totalErrorsWidePlayer1 }} </v-col>
      <v-col> {{ matchSummary.totalErrorsWidePlayer2 }} </v-col>
    </v-row>
    <v-row>
      <v-col> Body Backhand Returns Missed </v-col>
      <v-col> {{ matchSummary.totalErrorsWidePlayer1 }} </v-col>
      <v-col> {{ matchSummary.totalErrorsWidePlayer2 }} </v-col>
    </v-row>
    <v-row>
      <v-col> T Returns Missed </v-col>
      <v-col> {{ matchSummary.totalErrorsWidePlayer1 }} </v-col>
      <v-col> {{ matchSummary.totalErrorsWidePlayer2 }} </v-col>
    </v-row>
    <v-row>
      <v-col class="stat-header"> Point Length </v-col>
    </v-row>
    <v-row>
      <v-col> Rallies of 1-5 Shots Won </v-col>
      <v-col> {{ matchSummary.totalErrorsWidePlayer1 }} </v-col>
      <v-col> {{ matchSummary.totalErrorsWidePlayer2 }} </v-col>
    </v-row>
    <v-row>
      <v-col> Rallies of 6-10 Shots Won </v-col>
      <v-col> {{ matchSummary.totalErrorsWidePlayer1 }} </v-col>
      <v-col> {{ matchSummary.totalErrorsWidePlayer2 }} </v-col>
    </v-row>
    <v-row>
      <v-col> Rallies of 11-15 Shots Won </v-col>
      <v-col> {{ matchSummary.totalErrorsWidePlayer1 }} </v-col>
      <v-col> {{ matchSummary.totalErrorsWidePlayer2 }} </v-col>
    </v-row>
    <v-row>
      <v-col> Rallies of 16+ Shots Won </v-col>
      <v-col> {{ matchSummary.totalErrorsWidePlayer1 }} </v-col>
      <v-col> {{ matchSummary.totalErrorsWidePlayer2 }} </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useSummaryStore } from "@/stores/matchSummaryStore";
import { useMatchInfoStore } from "@/stores/matchInfoStore";
import { useMatchScoreStore } from "@/stores/matchScoreStore";
import { getMatchSummary } from "@/firebase/firebaseService";
import { getPointsLost } from "@/firebase/firebaseService";

const matchSummary = useSummaryStore();
const matchScoreStore = useMatchScoreStore();
const matchInfoStore = useMatchInfoStore();

async function press() {}
</script>

<style>
.stat-table {
  background-color: #f9f9f9;
  border-radius: 10px;
  border: 1px solid #ccc;
  max-width: 800px;
  margin: auto;
  font-family: "Segoe UI", sans-serif;
}

.stat-header {
  background-color: #eaeaea;
  font-weight: bold;
}

.stat-row {
  border-bottom: 1px solid #ddd;
  align-items: center;
  padding: 10px 0;
}

.stat-label {
  font-weight: 600;
  background-color: #f1f1f1;
}

.player-name {
  font-weight: bold;
  background-color: #f5f5f5;
}
</style>
