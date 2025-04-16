<template>
  <v-container
    class="d-flex flex-column justify-center align-center text-center"
    style="min-height: 100vh"
  >
    <v-btn style="margin-bottom: 20px;" @click="getStats">Get Stats</v-btn>
    <h3>{{ matchInfoStore?.player1FullName || 'Player 1' }} Stats</h3>
    <div>
      Total Points Won: {{ analyticsStore.totalPointsWonPlayer1 }}/{{
        analyticsStore.totalPointsPlayer1
      }}
      – {{ analyticsStore.totalPointWonPercentagePlayer1 }}%
    </div>
    <h4>Errors</h4>
    <div>Unforced Errors: {{ analyticsStore.unforcedErrorsPlayer1 }}</div>
    <div>Forced Errors: {{ analyticsStore.forcedErrorsPlayer1 }}</div>
    <div>Errors in Net: {{ analyticsStore.totalErrorsNetPlayer1 }}</div>
    <div>Errors Long: {{ analyticsStore.totalErrorsLongPlayer1 }}</div>
    <div>Errors Wide: {{ analyticsStore.totalErrorsWidePlayer1 }}</div>
    <h4>Serving</h4>
    <div>First Serve %: {{ analyticsStore.firstServePercentagePlayer1 }}</div>
    <div>
      First Serve Won: {{ analyticsStore.firstServeWonCountPlayer1 }}/{{
        analyticsStore.firstServeCountPlayer1
      }}
      – {{ analyticsStore.firstServeWonPercentagePlayer1 }}%
    </div>
    <div>
      Second Serve Won %: {{ analyticsStore.secondServeWonCountPlayer1 }}/{{
        analyticsStore.secondServeCountPlayer1
      }}
      – {{ analyticsStore.secondServeWonPercentagePlayer1 }}%
    </div>
    <div>
      Points Won Serving T: {{ analyticsStore.pointsWonServedTPlayer1 }} /
      {{ analyticsStore.pointsServedTPlayer1 }}
    </div>
    <div>
      Points Won Serving Body Backhand:
      {{ analyticsStore.pointsWonServedBodyBackhandPlayer1 }} /
      {{ analyticsStore.pointsServedBodyBackhandPlayer1 }}
    </div>
    <div>
      Points Won Serving Forehand:
      {{ analyticsStore.pointsWonServedBodyForehandPlayer1 }} /
      {{ analyticsStore.pointsServedBodyForehandPlayer1 }}
    </div>
    <div>
      Points Won Serving Wide: {{ analyticsStore.pointsWonServedWidePlayer1 }} /
      {{ analyticsStore.pointsServedWidePlayer1 }}
    </div>
    <h4>Returns</h4>
    <div>
      Returns In: {{ analyticsStore.totalReturnsInPlayer1 }} /
      {{ analyticsStore.totalReturnsPlayer1 }}
    </div>
    <div>Returns In %: {{ analyticsStore.returnsInPercentagePlayer1 }}</div>
    <div>
      Return Points Won: {{ analyticsStore.totalReturnPointsWonPlayer1 }} /
      {{ analyticsStore.totalReturnsPlayer1 }}
    </div>
    <div>
      Return Points Won %: {{ analyticsStore.returnPointsWonPercentagePlayer1 }}
    </div>
    <div>
      Returns Missed-Serve was Wide: {{ analyticsStore.returnErrorsWidePlayer1 }} /
      {{ analyticsStore.totalReturnErrorsPlayer1 }}
    </div>
    <div>
      Returns Missed-Serve was Body Backhand:
      {{ analyticsStore.returnErrorsBodyBackhandPlayer1 }} /
      {{ analyticsStore.totalReturnErrorsPlayer1 }}
    </div>
    <div>
      Returns Missed-Serve was Body Forehand:
      {{ analyticsStore.returnErrorsBodyForehandPlayer1 }} /
      {{ analyticsStore.totalReturnErrorsPlayer1 }}
    </div>
    <div>
      Returns Missed-Serve was T: {{ analyticsStore.returnErrorsTPlayer1 }} /
      {{ analyticsStore.totalReturnErrorsPlayer1 }}
    </div>
    <h4>Rally Length</h4>
    <div>
      Rallies of 1–5 shots Won: {{ analyticsStore.rallyLength1_5WonPlayer1 }} /
      {{ analyticsStore.rallyLength1_5Player1 }}
    </div>
    <div>
      Rallies of 6–10 shots Won: {{ analyticsStore.rallyLength6_10WonPlayer1 }} /
      {{ analyticsStore.rallyLength6_10Player1 }}
    </div>
    <div>
      Rallies of 11–15 shots Won: {{ analyticsStore.rallyLength11_15WonPlayer1 }} /
      {{ analyticsStore.rallyLength11_15Player1 }}
    </div>
    <div>
      Rallies of 16+ shots Won: {{ analyticsStore.rallyLength16plusWonPlayer1 }} /
      {{ analyticsStore.rallyLength16plusPlayer1 }}
    </div>
    <br/>
    <h3>{{ matchInfoStore?.player2FullName || 'Player 2' }} Stats</h3>
    <div>
      Total Points Won: {{ analyticsStore.totalPointsWonPlayer2 }}/{{
        analyticsStore.totalPointsPlayer2
      }}
      – {{ analyticsStore.totalPointWonPercentagePlayer2 }}%
    </div>
    <h4>Errors</h4>
    <div>Unforced Errors: {{ analyticsStore.unforcedErrorsPlayer2 }}</div>
    <div>Forced Errors: {{ analyticsStore.forcedErrorsPlayer2 }}</div>
    <div>Errors in Net: {{ analyticsStore.totalErrorsNetPlayer2 }}</div>
    <div>Errors Long: {{ analyticsStore.totalErrorsLongPlayer2 }}</div>
    <div>Errors Wide: {{ analyticsStore.totalErrorsWidePlayer2 }}</div>
    <h4>Serving</h4>
    <div>First Serve %: {{ analyticsStore.firstServePercentagePlayer2 }}</div>
    <div>
      First Serve Won: {{ analyticsStore.firstServeWonCountPlayer2 }}/{{
        analyticsStore.firstServeCountPlayer2
      }}
      – {{ analyticsStore.firstServeWonPercentagePlayer2 }}%
    </div>
    <div>
      Second Serve Won %: {{ analyticsStore.secondServeWonCountPlayer2 }}/{{
        analyticsStore.secondServeCountPlayer2
      }}
      – {{ analyticsStore.secondServeWonPercentagePlayer2 }}%
    </div>
    <div>
      Points Won Serving T: {{ analyticsStore.pointsWonServedTPlayer2 }} /
      {{ analyticsStore.pointsServedTPlayer2 }}
    </div>
    <div>
      Points Won Serving Body Backhand:
      {{ analyticsStore.pointsWonServedBodyBackhandPlayer2 }} /
      {{ analyticsStore.pointsServedBodyBackhandPlayer2 }}
    </div>
    <div>
      Points Won Serving Forehand:
      {{ analyticsStore.pointsWonServedBodyForehandPlayer2 }} /
      {{ analyticsStore.pointsServedBodyForehandPlayer2 }}
    </div>
    <div>
      Points Won Serving Wide: {{ analyticsStore.pointsWonServedWidePlayer2 }} /
      {{ analyticsStore.pointsServedWidePlayer2 }}
    </div>
    <h4>Returns</h4>
    <div>
      Returns In: {{ analyticsStore.totalReturnsInPlayer2 }} /
      {{ analyticsStore.totalReturnsPlayer2 }}
    </div>
    <div>Returns In %: {{ analyticsStore.returnsInPercentagePlayer2 }}</div>
    <div>
      Return Points Won: {{ analyticsStore.totalReturnPointsWonPlayer2 }} /
      {{ analyticsStore.totalReturnsPlayer2 }}
    </div>
    <div>
      Return Points Won %: {{ analyticsStore.returnPointsWonPercentagePlayer2 }}
    </div>
    <div>
      Returns Missed-Serve was Wide: {{ analyticsStore.returnErrorsWidePlayer2 }} /
      {{ analyticsStore.totalReturnErrorsPlayer2 }}
    </div>
    <div>
      Returns Missed-Serve was Body Backhand:
      {{ analyticsStore.returnErrorsBodyBackhandPlayer2 }} /
      {{ analyticsStore.totalReturnErrorsPlayer2 }}
    </div>
    <div>
      Returns Missed-Serve was Body Forehand:
      {{ analyticsStore.returnErrorsBodyForehandPlayer2 }} /
      {{ analyticsStore.totalReturnErrorsPlayer2 }}
    </div>
    <div>
      Returns Missed-Serve was T: {{ analyticsStore.returnErrorsTPlayer2 }} /
      {{ analyticsStore.totalReturnErrorsPlayer2 }}
    </div>
    <h4>Rally Length</h4>
    <div>
      Rallies of 1–5 shots Won: {{ analyticsStore.rallyLength1_5WonPlayer2 }} /
      {{ analyticsStore.rallyLength1_5Player2 }}
    </div>
    <div>
      Rallies of 6–10 shots Won: {{ analyticsStore.rallyLength6_10WonPlayer2 }} /
      {{ analyticsStore.rallyLength6_10Player2 }}
    </div>
    <div>
      Rallies of 11–15 shots Won: {{ analyticsStore.rallyLength11_15WonPlayer2 }} /
      {{ analyticsStore.rallyLength11_15Player2 }}
    </div>
    <div>
      Rallies of 16+ shots Won: {{ analyticsStore.rallyLength16plusWonPlayer2 }} /
      {{ analyticsStore.rallyLength16plusPlayer2 }}
    </div>
  </v-container>
</template>

<script setup>
import { getMatchSummary } from "@/firebase/firebaseService";
import { useSummaryStore } from "@/stores/matchSummaryStore";
import { useMatchInfoStore } from "@/stores/matchInfoStore";
import { useMatchScoreStore } from "@/stores/matchScoreStore";

const analyticsStore = useSummaryStore();
const matchInfoStore = useMatchInfoStore();
const matchScoreStore = useMatchScoreStore();

async function getStats() {
  let summary = {};
  const currentMatchID = matchScoreStore.currentMatchID;
//   const currentMatchID = "Isn1axIB2VyMLpcESRyI";
  console.log("currentMatchID:", currentMatchID);
  const player1 = matchInfoStore.player1FullName;
//   const player1 = "Finley Buelte";
  console.log("player1:", player1);
  const player2 = matchInfoStore.player2FullName;
//   const player2 = "Wooster 1";
  console.log("player2:", player2);
  try {
    summary = await getMatchSummary(currentMatchID, player1, player2);
  } catch (error) {
    console.log("error getting match summary" + error);
    return;
  }
  // Update match summary for player1
  analyticsStore.totalPointsWonPlayer1 = summary[player1].totalPointsWon;
  analyticsStore.totalPointsWonPlayer1 = summary[player1].totalPointsWon;
  analyticsStore.totalPointsWonPlayer2 = summary[player2].totalPointsWon;
  analyticsStore.totalPointsPlayer1 = summary[player1].totalPoints;
  analyticsStore.totalPointsPlayer2 = summary[player2].totalPoints;
  analyticsStore.totalPointWonPercentagePlayer1 =
    summary[player1].totalPointWonPercentage;
  analyticsStore.totalPointWonPercentagePlayer2 =
    summary[player2].totalPointWonPercentage;
  analyticsStore.unforcedErrorsPlayer1 = summary[player1].unforcedErrors;
  analyticsStore.unforcedErrorsPlayer2 = summary[player2].unforcedErrors;
  analyticsStore.forcedErrorsPlayer1 = summary[player1].forcedErrors;
  analyticsStore.forcedErrorsPlayer2 = summary[player2].forcedErrors;
  analyticsStore.firstServePercentagePlayer1 =
    summary[player1].firstServePercentage;
  analyticsStore.firstServePercentagePlayer2 =
    summary[player2].firstServePercentage;
  analyticsStore.firstServeWonCountPlayer1 =
    summary[player1].firstServeWonCount;
  analyticsStore.firstServeWonCountPlayer2 =
    summary[player2].firstServeWonCount;
  analyticsStore.firstServeCountPlayer1 = summary[player1].firstServeCount;
  analyticsStore.firstServeCountPlayer2 = summary[player2].firstServeCount;
  analyticsStore.firstServeWonPercentagePlayer1 =
    summary[player1].firstServeWonPercentage;
  analyticsStore.firstServeWonPercentagePlayer2 =
    summary[player2].firstServeWonPercentage;
  analyticsStore.secondServeWonCountPlayer1 =
    summary[player1].secondServeWonCount;
  analyticsStore.secondServeWonCountPlayer2 =
    summary[player2].secondServeWonCount;
  analyticsStore.secondServeCountPlayer1 = summary[player1].secondServeCount;
  analyticsStore.secondServeCountPlayer2 = summary[player2].secondServeCount;
  analyticsStore.secondServeWonPercentagePlayer1 =
    summary[player1].secondServeWonPercentage;
  analyticsStore.secondServeWonPercentagePlayer2 =
    summary[player2].secondServeWonPercentage;
  analyticsStore.pointsWonServedTPlayer1 = summary[player1].pointsWonServedT;
  analyticsStore.pointsWonServedTPlayer2 = summary[player2].pointsWonServedT;
  analyticsStore.pointsServedTPlayer1 = summary[player1].pointsServedT;
  analyticsStore.pointsServedTPlayer2 = summary[player2].pointsServedT;
  analyticsStore.pointsWonServedBodyBackhandPlayer1 =
    summary[player1].pointsWonServedBodyBackhand;
  analyticsStore.pointsWonServedBodyBackhandPlayer2 =
    summary[player2].pointsWonServedBodyBackhand;
  analyticsStore.pointsServedBodyBackhandPlayer1 =
    summary[player1].pointsServedBodyBackhand;
  analyticsStore.pointsServedBodyBackhandPlayer2 =
    summary[player2].pointsServedBodyBackhand;
  analyticsStore.pointsWonServedBodyForehandPlayer1 =
    summary[player1].pointsWonServedBodyForehand;
  analyticsStore.pointsWonServedBodyForehandPlayer2 =
    summary[player2].pointsWonServedBodyForehand;
  analyticsStore.pointsServedBodyForehandPlayer1 =
    summary[player1].pointsServedBodyForehand;
  analyticsStore.pointsServedBodyForehandPlayer2 =
    summary[player2].pointsServedBodyForehand;
  analyticsStore.pointsWonServedWidePlayer1 =
    summary[player1].pointsWonServedWide;
  analyticsStore.pointsWonServedWidePlayer2 =
    summary[player2].pointsWonServedWide;
  analyticsStore.pointsServedWidePlayer1 = summary[player1].pointsServedWide;
  analyticsStore.pointsServedWidePlayer2 = summary[player2].pointsServedWide;
  analyticsStore.totalReturnsInPlayer1 = summary[player1].totalReturnsIn;
  analyticsStore.totalReturnsInPlayer2 = summary[player2].totalReturnsIn;
  analyticsStore.totalReturnsPlayer1 = summary[player1].totalReturns;
  analyticsStore.totalReturnsPlayer2 = summary[player2].totalReturns;
  analyticsStore.totalReturnPointsWonPlayer1 =
    summary[player1].totalReturnPointsWon;
  analyticsStore.totalReturnPointsWonPlayer2 =
    summary[player2].totalReturnPointsWon;
  analyticsStore.returnPointsWonPercentagePlayer1 =
    summary[player1].returnPointsWonPercentage;
  analyticsStore.returnPointsWonPercentagePlayer2 =
    summary[player2].returnPointsWonPercentage;
  analyticsStore.returnsInPercentagePlayer1 =
    summary[player1].returnsInPercentage;
  analyticsStore.returnsInPercentagePlayer2 =
    summary[player2].returnsInPercentage;
  analyticsStore.returnErrorsWidePlayer1 = summary[player1].returnErrorsWide;
  analyticsStore.returnErrorsWidePlayer2 = summary[player2].returnErrorsWide;
  analyticsStore.returnErrorsBodyBackhandPlayer1 =
    summary[player1].returnErrorsBodyBackhand;
  analyticsStore.returnErrorsBodyBackhandPlayer2 =
    summary[player2].returnErrorsBodyBackhand;
  analyticsStore.returnErrorsBodyForehandPlayer1 =
    summary[player1].returnErrorsBodyForehand;
  analyticsStore.returnErrorsBodyForehandPlayer2 =
    summary[player2].returnErrorsBodyForehand;
  analyticsStore.returnErrorsTPlayer1 = summary[player1].returnErrorsT;
  analyticsStore.returnErrorsTPlayer2 = summary[player2].returnErrorsT;
  analyticsStore.totalReturnErrorsPlayer1 = summary[player1].totalReturnErrors;
  analyticsStore.totalReturnErrorsPlayer2 = summary[player2].totalReturnErrors;
  analyticsStore.totalErrorsNetPlayer1 = summary[player1].totalErrorsNet;
  analyticsStore.totalErrorsNetPlayer2 = summary[player2].totalErrorsNet;
  analyticsStore.totalErrorsLongPlayer1 = summary[player1].totalErrorsLong;
  analyticsStore.totalErrorsLongPlayer2 = summary[player2].totalErrorsLong;
  analyticsStore.totalErrorsWidePlayer1 = summary[player1].totalErrorsWide;
  analyticsStore.totalErrorsWidePlayer2 = summary[player2].totalErrorsWide;
  analyticsStore.rallyLength1_5WonPlayer1 = summary[player1].rallyLength1_5Won;
  analyticsStore.rallyLength1_5WonPlayer2 = summary[player2].rallyLength1_5Won;
  analyticsStore.rallyLength1_5Player1 = summary[player1].rallyLength1_5;
  analyticsStore.rallyLength1_5Player2 = summary[player2].rallyLength1_5;
  analyticsStore.rallyLength6_10WonPlayer1 =
    summary[player1].rallyLength6_10Won;
  analyticsStore.rallyLength6_10WonPlayer2 =
    summary[player2].rallyLength6_10Won;
  analyticsStore.rallyLength6_10Player1 = summary[player1].rallyLength6_10;
  analyticsStore.rallyLength6_10Player2 = summary[player2].rallyLength6_10;
  analyticsStore.rallyLength11_15WonPlayer1 =
    summary[player1].rallyLength11_15Won;
  analyticsStore.rallyLength11_15WonPlayer2 =
    summary[player2].rallyLength11_15Won;
  analyticsStore.rallyLength11_15Player1 = summary[player1].rallyLength11_15;
  analyticsStore.rallyLength11_15Player2 = summary[player2].rallyLength11_15;
  analyticsStore.rallyLength16plusWonPlayer1 =
    summary[player1].rallyLength16plusWon;
  analyticsStore.rallyLength16plusWonPlayer2 =
    summary[player2].rallyLength16plusWon;
  analyticsStore.rallyLength16plusPlayer1 = summary[player1].rallyLength16plus;
  analyticsStore.rallyLength16plusPlayer2 = summary[player2].rallyLength16plus;
}
</script>
