<template>
  <v-container class="stat-table pa-4">
    <v-container class="d-flex justify-center">
      <v-btn-toggle v-model="selectedSet" class="toggle-btns">
        <v-btn value="whole" class="toggle-btn">Whole Match</v-btn>
        <v-btn value="set1" class="toggle-btn">First Set</v-btn>
        <v-btn value="set2" class="toggle-btn">Second Set</v-btn>
        <v-btn value="set3" class="toggle-btn">Third Set</v-btn>
      </v-btn-toggle>
    </v-container>
    <v-row>
      <v-col class="stat-header"> General </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> Total Points Won </v-col>
      <v-col class="stat-row">
        {{ setAnalytics.player1[selectedSet].totalPointsWon }} /
        {{ setAnalytics.player1[selectedSet].totalPoints }} –
        {{ setAnalytics.player1[selectedSet].totalPointWonPercentagePlayer1 }}%
      </v-col>
      <v-col>
        {{ summaryStore.totalPointsWonPlayer2 }} /
        {{ summaryStore.totalPoints }} –
        {{ summaryStore.totalPointWonPercentagePlayer2 }}%
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> Deuce Points Won </v-col>
      <v-col>
        {{ setAnalytics.player1[selectedSet].deucePointsWonPlayer1 }} /
        {{ setAnalytics.player1[selectedSet].deucePoints }}
      </v-col>
      <v-col>
        {{ summaryStore.deucePointsWonPlayer2 }} /
        {{ summaryStore.deucePoints }}
      </v-col>
    </v-row>
    <v-row>
      <v-col class="stat-header"> Errors </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> Winners </v-col>
      <v-col> {{ summaryStore.winnersPlayer1 }} </v-col>
      <v-col> {{ summaryStore.winnersPlayer2 }} </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> Unforced Errors </v-col>
      <v-col> {{ summaryStore.unforcedErrorsPlayer1 }} </v-col>
      <v-col> {{ summaryStore.unforcedErrorsPlayer2 }} </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> Forced Errors </v-col>
      <v-col> {{ summaryStore.forcedErrorsPlayer1 }} </v-col>
      <v-col> {{ summaryStore.forcedErrorsPlayer2 }} </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> Errors in Net </v-col>
      <v-col> {{ summaryStore.totalErrorsNetPlayer1 }} </v-col>
      <v-col> {{ summaryStore.totalErrorsNetPlayer2 }} </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> Errors Long </v-col>
      <v-col> {{ summaryStore.totalErrorsLongPlayer1 }} </v-col>
      <v-col> {{ summaryStore.totalErrorsLongPlayer2 }} </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> Errors Wide </v-col>
      <v-col> {{ summaryStore.totalErrorsWidePlayer1 }} </v-col>
      <v-col> {{ summaryStore.totalErrorsWidePlayer2 }} </v-col>
    </v-row>
    <v-row>
      <v-col class="stat-header"> Serves </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> Double Faults </v-col>
      <v-col> {{ summaryStore.doubleFaultsPlayer1 }} </v-col>
      <v-col> {{ summaryStore.doubleFaultsPlayer2 }} </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> First Serve % </v-col>
      <v-col> {{ summaryStore.firstServePercentagePlayer1 }}% </v-col>
      <v-col> {{ summaryStore.firstServePercentagePlayer2 }}% </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> First Serve Won </v-col>
      <v-col>
        {{ summaryStore.firstServeWonCountPlayer1 }} /
        {{ summaryStore.firstServeCountPlayer1 }} –
        {{ summaryStore.firstServeWonPercentagePlayer1 }}%</v-col
      >
      <v-col>
        {{ summaryStore.firstServeWonCountPlayer2 }} /
        {{ summaryStore.firstServeCountPlayer2 }} –
        {{ summaryStore.firstServeWonPercentagePlayer2 }}%</v-col
      >
    </v-row>
    <v-row>
      <v-col cols="4"> Second Serve Won </v-col>
      <v-col>
        {{ summaryStore.secondServeWonCountPlayer1 }} /
        {{ summaryStore.secondServeCountPlayer1 }} –
        {{ summaryStore.secondServeWonPercentagePlayer1 }}%</v-col
      >
      <v-col>
        {{ summaryStore.secondServeWonCountPlayer2 }} /
        {{ summaryStore.secondServeCountPlayer2 }} –
        {{ summaryStore.secondServeWonPercentagePlayer2 }}%</v-col
      >
    </v-row>
    <v-row>
      <v-col cols="4"> Points Won Serving T </v-col>
      <v-col>
        {{ summaryStore.pointsWonServedTPlayer1 }} /
        {{ summaryStore.pointsServedTPlayer1 }} –
        {{ summaryStore.pointsWonServedTDeucePlayer1 }} Deuce/{{
          summaryStore.pointsWonServedTAdPlayer1
        }}
        Ad
      </v-col>
      <v-col>
        {{ summaryStore.pointsWonServedTPlayer2 }} /
        {{ summaryStore.pointsServedTPlayer2 }} –
        {{ summaryStore.pointsWonServedTDeucePlayer2 }} Deuce/{{
          summaryStore.pointsWonServedTAdPlayer2
        }}
        Ad
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> Points Won Serving Body Forehand </v-col>
      <v-col>
        {{ summaryStore.pointsWonServedBodyForehandPlayer1 }} /
        {{ summaryStore.pointsServedBodyForehandPlayer1 }}
      </v-col>
      <v-col>
        {{ summaryStore.pointsWonServedBodyForehandPlayer2 }} /
        {{ summaryStore.pointsServedBodyForehandPlayer2 }}
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> Points Won Serving Body Backhand </v-col>
      <v-col>
        {{ summaryStore.pointsWonServedBodyBackhandPlayer1 }} /
        {{ summaryStore.pointsServedBodyBackhandPlayer1 }}
      </v-col>
      <v-col>
        {{ summaryStore.pointsWonServedBodyBackhandPlayer2 }} /
        {{ summaryStore.pointsServedBodyBackhandPlayer2 }}
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> Points Won Serving Wide </v-col>
      <v-col>
        {{ summaryStore.pointsWonServedWidePlayer1 }} /
        {{ summaryStore.pointsServedWidePlayer1 }} –
        {{ summaryStore.pointsWonServedWideDeucePlayer1 }} Deuce/{{
          summaryStore.pointsWonServedWideAdPlayer1
        }}
        Ad
      </v-col>
      <v-col>
        {{ summaryStore.pointsWonServedWidePlayer2 }} /
        {{ summaryStore.pointsServedWidePlayer2 }} –
        {{ summaryStore.pointsWonServedWideDeucePlayer2 }} Deuce/{{
          summaryStore.pointsWonServedWideAdPlayer2
        }}
        Ad
      </v-col>
    </v-row>
    <v-row>
      <v-col class="stat-header"> Returns </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> Returns In </v-col>
      <v-col>
        {{ summaryStore.totalReturnsInPlayer1 }} /
        {{ summaryStore.totalReturnsPlayer1 }} –
        {{ summaryStore.returnsInPercentagePlayer1 }}%
      </v-col>
      <v-col>
        {{ summaryStore.totalReturnsInPlayer2 }} /
        {{ summaryStore.totalReturnsPlayer2 }} –
        {{ summaryStore.returnsInPercentagePlayer2 }}%
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> Return Points Won </v-col>
      <v-col>
        {{ summaryStore.totalReturnPointsWonPlayer1 }} /
        {{ summaryStore.totalReturnsPlayer1 }} –
        {{ summaryStore.returnPointsWonPercentagePlayer1 }}%
      </v-col>
      <v-col>
        {{ summaryStore.totalReturnPointsWonPlayer2 }} /
        {{ summaryStore.totalReturnsPlayer2 }} –
        {{ summaryStore.returnPointsWonPercentagePlayer2 }}%
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> Wide Returns Missed </v-col>
      <v-col>
        {{ summaryStore.returnErrorsWidePlayer1 }} /
        {{ summaryStore.totalReturnErrorsPlayer1 }}
      </v-col>
      <v-col>
        {{ summaryStore.returnErrorsWidePlayer2 }} /
        {{ summaryStore.totalReturnErrorsPlayer2 }}
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> Body Forehand Returns Missed </v-col>
      <v-col>
        {{ summaryStore.returnErrorsBodyForehandPlayer1 }} /
        {{ summaryStore.totalReturnErrorsPlayer1 }}
      </v-col>
      <v-col>
        {{ summaryStore.returnErrorsBodyForehandPlayer2 }} /
        {{ summaryStore.totalReturnErrorsPlayer2 }}
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> Body Backhand Returns Missed </v-col>
      <v-col>
        {{ summaryStore.returnErrorsBodyBackhandPlayer1 }} /
        {{ summaryStore.totalReturnErrorsPlayer1 }}
      </v-col>
      <v-col>
        {{ summaryStore.returnErrorsBodyBackhandPlayer2 }} /
        {{ summaryStore.totalReturnErrorsPlayer2 }}
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> T Returns Missed </v-col>
      <v-col>
        {{ summaryStore.returnErrorsTPlayer1 }} /
        {{ summaryStore.totalReturnErrorsPlayer1 }}
      </v-col>
      <v-col>
        {{ summaryStore.returnErrorsTPlayer2 }} /
        {{ summaryStore.totalReturnErrorsPlayer2 }}
      </v-col>
    </v-row>
    <v-row>
      <v-col class="stat-header"> Point Length </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> Rallies of 1-5 Shots Won </v-col>
      <v-col>
        {{ summaryStore.rallyLength1_5WonPlayer1 }} /
        {{ summaryStore.rallyLength1_5Player1 }}
      </v-col>
      <v-col>
        {{ summaryStore.rallyLength1_5WonPlayer2 }} /
        {{ summaryStore.rallyLength1_5Player2 }}
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> Rallies of 6-10 Shots Won </v-col>
      <v-col>
        {{ summaryStore.rallyLength6_10WonPlayer1 }} /
        {{ summaryStore.rallyLength6_10Player1 }}
      </v-col>
      <v-col>
        {{ summaryStore.rallyLength6_10WonPlayer2 }} /
        {{ summaryStore.rallyLength6_10Player2 }}
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> Rallies of 11-15 Shots Won </v-col>
      <v-col>
        {{ summaryStore.rallyLength11_15WonPlayer1 }} /
        {{ summaryStore.rallyLength11_15Player1 }}
      </v-col>
      <v-col>
        {{ summaryStore.rallyLength11_15WonPlayer2 }} /
        {{ summaryStore.rallyLength11_15Player2 }}
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> Rallies of 16+ Shots Won </v-col>
      <v-col>
        {{ summaryStore.rallyLength16plusWonPlayer1 }} /
        {{ summaryStore.rallyLength16plusPlayer1 }}
      </v-col>
      <v-col>
        {{ summaryStore.rallyLength16plusWonPlayer2 }} /
        {{ summaryStore.rallyLength16plusPlayer2 }}
      </v-col>
    </v-row>
    <v-row>
      <v-col class="stat-header"> Most Common Errors </v-col>
    </v-row>
    <v-row>
      <v-col>
        {{ summaryStore.countPlayer1First }} Errors:
        {{ summaryStore.intentPlayer1First }}
        {{ summaryStore.strokeSidePlayer1First }}
        {{ summaryStore.strokeTypePlayer1First }} – Missed
        {{ summaryStore.errorLocationPlayer1First }}</v-col
      >
    </v-row>
    <v-row>
      <v-col>
        {{ summaryStore.countPlayer1Second }} Errors:
        {{ summaryStore.intentPlayer1Second }}
        {{ summaryStore.strokeSidePlayer1Second }}
        {{ summaryStore.strokeTypePlayer1Second }} – Missed
        {{ summaryStore.errorLocationPlayer1Second }}</v-col
      >
    </v-row>
  </v-container>
</template>

<script setup>
import { useSummaryStore } from "@/stores/analyticsStore";
import { useMatchInfoStore } from "@/stores/matchInfoStore";
import { useMatchScoreStore } from "@/stores/matchScoreStore";
import { useSetAnalyticsStore } from "@/stores/setAnalyticsStore";

const setAnalytics = useSetAnalyticsStore();
const summaryStore = useSummaryStore();
const selectedSet = ref("whole"); // default view
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
}

/* Selected (active) button appearance */
.v-btn--active.toggle-btn {
  background-color: #fedb8c; /* Light blue shade when selected */
  color: black; /* Vuetify's primary blue color */
}
</style>
