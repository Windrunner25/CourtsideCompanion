<template>
    <v-btn class="text-none" variant="tonal" color="primary" @click="getStats"
      >Set by Set</v-btn
    >
  </template>
  
  <script setup>
  import { getSetBySet } from "@/firebase/firebaseService";
  import { useSummaryStore } from "@/stores/analyticsStore";
  import { useMatchInfoStore } from "@/stores/matchInfoStore";
  import { useMatchScoreStore } from "@/stores/matchScoreStore";
  
  const analyticsStore = useSummaryStore();
  const matchInfoStore = useMatchInfoStore();
  const matchScoreStore = useMatchScoreStore();
  
  async function getStats() {
    let summary = {};
    const currentMatchID = matchScoreStore.currentMatchID;
    console.log("currentMatchID:", currentMatchID);

    const player1 = matchInfoStore.player1FullName;
    console.log("player1:", player1);

    const player2 = matchInfoStore.player2FullName;
    console.log("player2:", player2);
    
    try {
      summary = await getSetBySet(currentMatchID, player1, player2);
    } catch (error) {
      console.log("error getting match summary" + error);
      return;
    }
}
    // Update match summary for player1
//     analyticsStore.totalPointsWonPlayer1 = summary[player1].totalPointsWon;
//     analyticsStore.totalPointsWonPlayer1 = summary[player1].totalPointsWon;
//     analyticsStore.totalPointsWonPlayer2 = summary[player2].totalPointsWon;
//     analyticsStore.totalPoints = summary[player1].totalPoints;
//     analyticsStore.totalPointWonPercentagePlayer1 =
//       summary[player1].totalPointWonPercentage;
//     analyticsStore.totalPointWonPercentagePlayer2 =
//       summary[player2].totalPointWonPercentage;
//     analyticsStore.winnersPlayer1 = summary[player1].winners;
//     analyticsStore.winnersPlayer1 = summary[player2].winners;
//     analyticsStore.unforcedErrorsPlayer1 = summary[player1].unforcedErrors;
//     analyticsStore.unforcedErrorsPlayer2 = summary[player2].unforcedErrors;
//     analyticsStore.forcedErrorsPlayer1 = summary[player1].forcedErrors;
//     analyticsStore.forcedErrorsPlayer2 = summary[player2].forcedErrors;
//     analyticsStore.firstServePercentagePlayer1 =
//       summary[player1].firstServePercentage;
//     analyticsStore.firstServePercentagePlayer2 =
//       summary[player2].firstServePercentage;
//     analyticsStore.firstServeWonCountPlayer1 =
//       summary[player1].firstServeWonCount;
//     analyticsStore.firstServeWonCountPlayer2 =
//       summary[player2].firstServeWonCount;
//     analyticsStore.firstServeCountPlayer1 = summary[player1].firstServeCount;
//     analyticsStore.firstServeCountPlayer2 = summary[player2].firstServeCount;
//     analyticsStore.firstServeWonPercentagePlayer1 =
//       summary[player1].firstServeWonPercentage;
//     analyticsStore.firstServeWonPercentagePlayer2 =
//       summary[player2].firstServeWonPercentage;
//     analyticsStore.secondServeWonCountPlayer1 =
//       summary[player1].secondServeWonCount;
//     analyticsStore.secondServeWonCountPlayer2 =
//       summary[player2].secondServeWonCount;
//     analyticsStore.secondServeCountPlayer1 = summary[player1].secondServeCount;
//     analyticsStore.secondServeCountPlayer2 = summary[player2].secondServeCount;
//     analyticsStore.secondServeWonPercentagePlayer1 =
//       summary[player1].secondServeWonPercentage;
//     analyticsStore.secondServeWonPercentagePlayer2 =
//       summary[player2].secondServeWonPercentage;
//     analyticsStore.pointsWonServedTPlayer1 = summary[player1].pointsWonServedT;
//     analyticsStore.pointsWonServedTPlayer2 = summary[player2].pointsWonServedT;
//     analyticsStore.pointsServedTPlayer1 = summary[player1].pointsServedT;
//     analyticsStore.pointsServedTPlayer2 = summary[player2].pointsServedT;
//     analyticsStore.pointsWonServedBodyBackhandPlayer1 =
//       summary[player1].pointsWonServedBodyBackhand;
//     analyticsStore.pointsWonServedBodyBackhandPlayer2 =
//       summary[player2].pointsWonServedBodyBackhand;
//     analyticsStore.pointsServedBodyBackhandPlayer1 =
//       summary[player1].pointsServedBodyBackhand;
//     analyticsStore.pointsServedBodyBackhandPlayer2 =
//       summary[player2].pointsServedBodyBackhand;
//     analyticsStore.pointsWonServedBodyForehandPlayer1 =
//       summary[player1].pointsWonServedBodyForehand;
//     analyticsStore.pointsWonServedBodyForehandPlayer2 =
//       summary[player2].pointsWonServedBodyForehand;
//     analyticsStore.pointsServedBodyForehandPlayer1 =
//       summary[player1].pointsServedBodyForehand;
//     analyticsStore.pointsServedBodyForehandPlayer2 =
//       summary[player2].pointsServedBodyForehand;
//     analyticsStore.pointsWonServedWidePlayer1 =
//       summary[player1].pointsWonServedWide;
//     analyticsStore.pointsWonServedWidePlayer2 =
//       summary[player2].pointsWonServedWide;
//     analyticsStore.pointsServedWidePlayer1 = summary[player1].pointsServedWide;
//     analyticsStore.pointsServedWidePlayer2 = summary[player2].pointsServedWide;
  
//     //   Deuce/Ad
//     analyticsStore.pointsWonServedTDeucePlayer1 =
//       summary[player1].pointsWonServedTDeuce;
//     analyticsStore.pointsWonServedTDeucePlayer2 =
//       summary[player2].pointsWonServedTDeuce;
//     analyticsStore.pointsServedTDeucePlayer1 =
//       summary[player1].pointsServedTDeuce;
//     analyticsStore.pointsServedTDeucePlayer2 =
//       summary[player2].pointsServedTDeuce;
//     analyticsStore.pointsWonServedWideDeucePlayer1 =
//       summary[player1].pointsWonServedWideDeuce;
//     analyticsStore.pointsWonServedWideDeucePlayer2 =
//       summary[player2].pointsWonServedWideDeuce;
//     analyticsStore.pointsServedWideDeucePlayer1 =
//       summary[player1].pointsServedWideDeuce;
//     analyticsStore.pointsServedWideDeucePlayer2 =
//       summary[player2].pointsServedWideDeuce;
//     analyticsStore.pointsWonServedTAdPlayer1 =
//       summary[player1].pointsWonServedTAd;
//     analyticsStore.pointsWonServedTAdPlayer2 =
//       summary[player2].pointsWonServedTAd;
//     analyticsStore.pointsServedTAdPlayer1 = summary[player1].pointsServedTAd;
//     analyticsStore.pointsServedTAdPlayer2 = summary[player2].pointsServedTAd;
//     analyticsStore.pointsWonServedWideAdPlayer1 =
//       summary[player1].pointsWonServedWideAd;
//     analyticsStore.pointsWonServedWideAdPlayer2 =
//       summary[player2].pointsWonServedWideAd;
//     analyticsStore.pointsServedWideAdPlayer1 =
//       summary[player1].pointsServedWideAd;
//     analyticsStore.pointsServedWideAdPlayer2 =
//       summary[player2].pointsServedWideAd;
  
//     analyticsStore.totalReturnsInPlayer1 = summary[player1].totalReturnsIn;
//     analyticsStore.totalReturnsInPlayer2 = summary[player2].totalReturnsIn;
//     analyticsStore.totalReturnsPlayer1 = summary[player1].totalReturns;
//     analyticsStore.totalReturnsPlayer2 = summary[player2].totalReturns;
//     analyticsStore.totalReturnPointsWonPlayer1 =
//       summary[player1].totalReturnPointsWon;
//     analyticsStore.totalReturnPointsWonPlayer2 =
//       summary[player2].totalReturnPointsWon;
//     analyticsStore.returnPointsWonPercentagePlayer1 =
//       summary[player1].returnPointsWonPercentage;
//     analyticsStore.returnPointsWonPercentagePlayer2 =
//       summary[player2].returnPointsWonPercentage;
//     analyticsStore.returnsInPercentagePlayer1 =
//       summary[player1].returnsInPercentage;
//     analyticsStore.returnsInPercentagePlayer2 =
//       summary[player2].returnsInPercentage;
//     analyticsStore.returnErrorsWidePlayer1 = summary[player1].returnErrorsWide;
//     analyticsStore.returnErrorsWidePlayer2 = summary[player2].returnErrorsWide;
//     analyticsStore.returnErrorsBodyBackhandPlayer1 =
//       summary[player1].returnErrorsBodyBackhand;
//     analyticsStore.returnErrorsBodyBackhandPlayer2 =
//       summary[player2].returnErrorsBodyBackhand;
//     analyticsStore.returnErrorsBodyForehandPlayer1 =
//       summary[player1].returnErrorsBodyForehand;
//     analyticsStore.returnErrorsBodyForehandPlayer2 =
//       summary[player2].returnErrorsBodyForehand;
//     analyticsStore.returnErrorsTPlayer1 = summary[player1].returnErrorsT;
//     analyticsStore.returnErrorsTPlayer2 = summary[player2].returnErrorsT;
//     analyticsStore.totalReturnErrorsPlayer1 = summary[player1].totalReturnErrors;
//     analyticsStore.totalReturnErrorsPlayer2 = summary[player2].totalReturnErrors;
//     analyticsStore.totalErrorsNetPlayer1 = summary[player1].totalErrorsNet;
//     analyticsStore.totalErrorsNetPlayer2 = summary[player2].totalErrorsNet;
//     analyticsStore.totalErrorsLongPlayer1 = summary[player1].totalErrorsLong;
//     analyticsStore.totalErrorsLongPlayer2 = summary[player2].totalErrorsLong;
//     analyticsStore.totalErrorsWidePlayer1 = summary[player1].totalErrorsWide;
//     analyticsStore.totalErrorsWidePlayer2 = summary[player2].totalErrorsWide;
//     analyticsStore.rallyLength1_5WonPlayer1 = summary[player1].rallyLength1_5Won;
//     analyticsStore.rallyLength1_5WonPlayer2 = summary[player2].rallyLength1_5Won;
//     analyticsStore.rallyLength1_5Player1 = summary[player1].rallyLength1_5;
//     analyticsStore.rallyLength1_5Player2 = summary[player2].rallyLength1_5;
//     analyticsStore.rallyLength6_10WonPlayer1 =
//       summary[player1].rallyLength6_10Won;
//     analyticsStore.rallyLength6_10WonPlayer2 =
//       summary[player2].rallyLength6_10Won;
//     analyticsStore.rallyLength6_10Player1 = summary[player1].rallyLength6_10;
//     analyticsStore.rallyLength6_10Player2 = summary[player2].rallyLength6_10;
//     analyticsStore.rallyLength11_15WonPlayer1 =
//       summary[player1].rallyLength11_15Won;
//     analyticsStore.rallyLength11_15WonPlayer2 =
//       summary[player2].rallyLength11_15Won;
//     analyticsStore.rallyLength11_15Player1 = summary[player1].rallyLength11_15;
//     analyticsStore.rallyLength11_15Player2 = summary[player2].rallyLength11_15;
//     analyticsStore.rallyLength16plusWonPlayer1 =
//       summary[player1].rallyLength16plusWon;
//     analyticsStore.rallyLength16plusWonPlayer2 =
//       summary[player2].rallyLength16plusWon;
//     analyticsStore.rallyLength16plusPlayer1 = summary[player1].rallyLength16plus;
//     analyticsStore.rallyLength16plusPlayer2 = summary[player2].rallyLength16plus;
//     analyticsStore.deucePoints = summary[player1].deucePoints;
//     analyticsStore.deucePointsWonPlayer1 = summary[player1].deucePointsWon;
//     analyticsStore.deucePointsWonPlayer2 = summary[player2].deucePointsWon;
//     analyticsStore.doubleFaultsPlayer1 = summary[player1].doubleFaults;
//     analyticsStore.doubleFaultsPlayer2 = summary[player2].doubleFaults;
  
//     try {
//       const pointsLost = await getPointsLost(currentMatchID, player2);
//       console.log("pointsLost", pointsLost);
  
//       if (pointsLost.length >= 1 && pointsLost[0].obj) {
//         const { count: count1, obj: obj1 } = pointsLost[0];
  
//         analyticsStore.countPlayer1First = count1;
//         analyticsStore.intentPlayer1First = obj1["Stroke Intent"] || "N/A";
//         analyticsStore.strokeSidePlayer1First = obj1["Stroke Side"] || "N/A";
//         analyticsStore.strokeTypePlayer1First = obj1["Stroke Type"] || "N/A";
//         analyticsStore.errorLocationPlayer1First =
//           obj1["Error Location"] || "N/A";
//       } else {
//         console.warn("No data available for pointsLost[0]");
//       }
//       if (pointsLost.length >= 2 && pointsLost[1].obj) {
//         const { count: count2, obj: obj2 } = pointsLost[1];
  
//         analyticsStore.countPlayer1Second = count2;
//         analyticsStore.intentPlayer1Second = obj2["Stroke Intent"] || "N/A";
//         analyticsStore.strokeSidePlayer1Second = obj2["Stroke Side"] || "N/A";
//         analyticsStore.strokeTypePlayer1Second = obj2["Stroke Type"] || "N/A";
//         analyticsStore.errorLocationPlayer1Second =
//           obj2["Error Location"] || "N/A";
//       } else {
//         console.warn("No data available for pointsLost[1]");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }

  </script>
  