<template>
  <v-container class="stat-table pa-4">
    <v-row>
      <v-col class="stat-header"> General </v-col>
    </v-row>
    <v-row>
      <v-col> Total Points Won </v-col>
      <v-col class="stat-row"> {{ matchSummary.totalPointsWonPlayer1 }} / {{ matchSummary.totalPoints }} – {{ matchSummary.totalPointWonPercentagePlayer1 }}% </v-col>
      <v-col> {{ matchSummary.totalPointsWonPlayer2 }} / {{ matchSummary.totalPoints }} – {{ matchSummary.totalPointWonPercentagePlayer2 }}% </v-col>
    </v-row>
    <v-row>
      <v-col> Deuce Points Won </v-col>
      <v-col> {{ matchSummary.deucePointsWonPlayer1 }} / {{ matchSummary.deucePoints }} </v-col>
      <v-col> {{ matchSummary.deucePointsWonPlayer2 }} / {{ matchSummary.deucePoints }} </v-col>
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
      <v-col> {{ matchSummary.doubleFaultsPlayer1 }} </v-col>
      <v-col> {{ matchSummary.doubleFaultsPlayer2 }} </v-col>
    </v-row>
    <v-row>
      <v-col> First Serve % </v-col>
      <v-col> {{ matchSummary.firstServePercentagePlayer1 }} </v-col>
      <v-col> {{ matchSummary.firstServePercentagePlayer2 }} </v-col>
    </v-row>
    <v-row>
      <v-col> First Serve Won </v-col>
      <v-col>
        {{ matchSummary.firstServeWonCountPlayer1 }} /
        {{ matchSummary.firstServeCountPlayer1 }} –
        {{ matchSummary.firstServeWonPercentagePlayer1 }}%</v-col
      >
      <v-col>
        {{ matchSummary.firstServeWonCountPlayer2 }} /
        {{ matchSummary.firstServeCountPlayer2 }} –
        {{ matchSummary.firstServeWonPercentagePlayer2 }}%</v-col
      >
    </v-row>
    <v-row>
      <v-col> Second Serve Won </v-col>
      <v-col>
        {{ matchSummary.secondServeWonCountPlayer1 }} /
        {{ matchSummary.secondServeCountPlayer1 }} –
        {{ matchSummary.secondServeWonPercentagePlayer1 }}%</v-col
      >
      <v-col>
        {{ matchSummary.secondServeWonCountPlayer2 }} /
        {{ matchSummary.secondServeCountPlayer2 }} –
        {{ matchSummary.secondServeWonPercentagePlayer2 }}%</v-col
      >
    </v-row>
    <v-row>
      <v-col> Points Won Serving T </v-col>
      <v-col>
        {{ matchSummary.pointsWonServedTPlayer1 }} /
        {{ matchSummary.pointsServedTPlayer1 }} –
        {{ matchSummary.pointsWonServedTDeucePlayer1 }} Deuce/{{
          matchSummary.pointsWonServedTAdPlayer1
        }}
        Ad
      </v-col>
      <v-col>
        {{ matchSummary.pointsWonServedTPlayer2 }} /
        {{ matchSummary.pointsServedTPlayer2 }} –
        {{ matchSummary.pointsWonServedTDeucePlayer2 }} Deuce/{{
          matchSummary.pointsWonServedTAdPlayer2
        }}
        Ad
      </v-col>
    </v-row>
    <v-row>
      <v-col> Points Won Serving Body Forehand </v-col>
      <v-col>
        {{ matchSummary.pointsWonServedBodyForehandPlayer1 }} /
        {{ matchSummary.pointsServedBodyForehandPlayer1 }}
      </v-col>
      <v-col>
        {{ matchSummary.pointsWonServedBodyForehandPlayer2 }} /
        {{ matchSummary.pointsServedBodyForehandPlayer2 }}
      </v-col>
    </v-row>
    <v-row>
      <v-col> Points Won Serving Body Backhand </v-col>
      <v-col>
        {{ matchSummary.pointsWonServedBodyBackhandPlayer1 }} /
        {{ matchSummary.pointsServedBodyBackhandPlayer1 }}
      </v-col>
      <v-col>
        {{ matchSummary.pointsWonServedBodyBackhandPlayer2 }} /
        {{ matchSummary.pointsServedBodyBackhandPlayer2 }}
      </v-col>
    </v-row>
    <v-row>
      <v-col> Points Won Serving Wide </v-col>
      <v-col>
        {{ matchSummary.pointsWonServedWidePlayer1 }} /
        {{ matchSummary.pointsServedWidePlayer1 }} –
        {{ matchSummary.pointsWonServedWideDeucePlayer1 }} Deuce/{{
          matchSummary.pointsWonServedWideAdPlayer1
        }}
        Ad
      </v-col>
      <v-col>
        {{ matchSummary.pointsWonServedWidePlayer2 }} /
        {{ matchSummary.pointsServedWidePlayer2 }} –
        {{ matchSummary.pointsWonServedWideDeucePlayer2 }} Deuce/{{
          matchSummary.pointsWonServedWideAdPlayer2
        }}
        Ad
      </v-col>
    </v-row>
    <v-row>
      <v-col class="stat-header"> Returns </v-col>
    </v-row>
    <v-row>
      <v-col> Returns In </v-col>
      <v-col>
        {{ matchSummary.totalReturnsInPlayer1 }} /
        {{ matchSummary.totalReturnsPlayer1 }} –
        {{ matchSummary.returnsInPercentagePlayer1 }}%
      </v-col>
      <v-col>
        {{ matchSummary.totalReturnsInPlayer2 }} /
        {{ matchSummary.totalReturnsPlayer2 }} –
        {{ matchSummary.returnsInPercentagePlayer2 }}%
      </v-col>
    </v-row>
    <v-row>
      <v-col> Return Points Won </v-col>
      <v-col>
        {{ matchSummary.totalReturnPointsWonPlayer1 }} /
        {{ matchSummary.totalReturnsPlayer1 }} –
        {{ matchSummary.returnPointsWonPercentagePlayer1 }}%
      </v-col>
      <v-col>
        {{ matchSummary.totalReturnPointsWonPlayer2 }} /
        {{ matchSummary.totalReturnsPlayer2 }} –
        {{ matchSummary.returnPointsWonPercentagePlayer2 }}%
      </v-col>
    </v-row>
    <v-row>
      <v-col> Wide Returns Missed </v-col>
      <v-col>
        {{ matchSummary.returnErrorsWidePlayer1 }} /
        {{ matchSummary.totalReturnErrorsPlayer1 }}
      </v-col>
      <v-col>
        {{ matchSummary.returnErrorsWidePlayer2 }} /
        {{ matchSummary.totalReturnErrorsPlayer2 }}
      </v-col>
    </v-row>
    <v-row>
      <v-col> Body Forehand Returns Missed </v-col>
      <v-col>
        {{ matchSummary.returnErrorsBodyForehandPlayer1 }} /
        {{ matchSummary.totalReturnErrorsPlayer1 }}
      </v-col>
      <v-col>
        {{ matchSummary.returnErrorsBodyForehandPlayer2 }} /
        {{ matchSummary.totalReturnErrorsPlayer2 }}
      </v-col>
    </v-row>
    <v-row>
      <v-col> Body Backhand Returns Missed </v-col>
      <v-col>
        {{ matchSummary.returnErrorsBodyBackhandPlayer1 }} /
        {{ matchSummary.totalReturnErrorsPlayer1 }}
      </v-col>
      <v-col>
        {{ matchSummary.returnErrorsBodyBackhandPlayer2 }} /
        {{ matchSummary.totalReturnErrorsPlayer2 }}
      </v-col>
    </v-row>
    <v-row>
      <v-col> T Returns Missed </v-col>
      <v-col>
        {{ matchSummary.returnErrorsTPlayer1 }} /
        {{ matchSummary.totalReturnErrorsPlayer1 }}
      </v-col>
      <v-col>
        {{ matchSummary.returnErrorsTPlayer2 }} /
        {{ matchSummary.totalReturnErrorsPlayer2 }}
      </v-col>
    </v-row>
    <v-row>
      <v-col class="stat-header"> Point Length </v-col>
    </v-row>
    <v-row>
      <v-col> Rallies of 1-5 Shots Won </v-col>
      <v-col>
        {{ matchSummary.rallyLength1_5WonPlayer1 }} /
        {{ matchSummary.rallyLength1_5Player1 }}
      </v-col>
      <v-col>
        {{ matchSummary.rallyLength1_5WonPlayer2 }} /
        {{ matchSummary.rallyLength1_5Player2 }}
      </v-col>
    </v-row>
    <v-row>
      <v-col> Rallies of 6-10 Shots Won </v-col>
      <v-col>
        {{ matchSummary.rallyLength6_10WonPlayer1 }} /
        {{ matchSummary.rallyLength6_10Player1 }}
      </v-col>
      <v-col>
        {{ matchSummary.rallyLength6_10WonPlayer2 }} /
        {{ matchSummary.rallyLength6_10Player2 }}
      </v-col>
    </v-row>
    <v-row>
      <v-col> Rallies of 11-15 Shots Won </v-col>
      <v-col>
        {{ matchSummary.rallyLength11_15WonPlayer1 }} /
        {{ matchSummary.rallyLength11_15Player1 }}
      </v-col>
      <v-col>
        {{ matchSummary.rallyLength11_15WonPlayer2 }} /
        {{ matchSummary.rallyLength11_15Player2 }}
      </v-col>
    </v-row>
    <v-row>
      <v-col> Rallies of 16+ Shots Won </v-col>
      <v-col>
        {{ matchSummary.rallyLength16plusWonPlayer1 }} /
        {{ matchSummary.rallyLength16plusPlayer1 }}
      </v-col>
      <v-col>
        {{ matchSummary.rallyLength16plusWonPlayer2 }} /
        {{ matchSummary.rallyLength16plusPlayer2 }}
      </v-col>
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
  align-items: center;
}

.stat-label {
  font-weight: 600;
  background-color: #f1f1f1;
}
</style>
