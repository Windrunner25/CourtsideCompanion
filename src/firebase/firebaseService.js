import {
  collection,
  addDoc,
  updateDoc,
  doc,
  arrayUnion,
  onSnapshot,
  query,
  where,
  count,
  getDocs,
  getDoc,
  setDoc,
  orderBy,
} from "firebase/firestore";
import { format } from "date-fns"; // Optional but helpful for formatting

import { auth } from "@/firebase/init";

import db from "./init.js";

export async function addPointToFirebase(pointData) {
  try {
    const docRef = await addDoc(collection(db, "points"), {
      ...pointData,
    });
    console.log("Point added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding point: ", e);
  }
}

export async function addMatch(matchDetailsObj) {
  try {
    const {
      player1FirstName,
      player1LastName,
      player1Team,
      player2FirstName,
      player2LastName,
      player2Team,
      IndoorsOutdoors,
      Date,
      OwnerID,
    } = matchDetailsObj;

    const docRef = await addDoc(collection(db, "matches"), {
      player1FirstName,
      player1LastName,
      player1Team,
      player2FirstName,
      player2LastName,
      player2Team,
      IndoorsOutdoors,
      Date,
      OwnerID,
    });

    console.log("Match logged with:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
}

export async function getMatchSummary(currentMatchId, player1, player2) {
  const pointsCollection = collection(db, "points");

  // Define the list of players
  const players = [player1, player2];

  // Map each stat to a function that returns query conditions for a given player.
  // Note: For some stats like errors, the query might need to compare against the opponent.
  const statQueries = {
    unforcedErrors: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Point End", "==", "Unforced Error"),
      // Error is credited to the player who lost the point.
      where("Point Winner", "==", player === player1 ? player2 : player1),
    ],
    forcedErrors: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Point End", "==", "Forced Error"),
      where("Point Winner", "==", player === player1 ? player2 : player1),
    ],
    winners: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Point End", "==", "Winner"),
      // Winner is credited to the player who made the shot.
      where("Point Winner", "==", player),
    ],
    aces: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Point End", "==", "Ace"),
      where("Point Winner", "==", player),
    ],
    doubleFaults: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Serve", "==", "Double Fault"),
      // Double fault is an error, so the point is won by the opponent.
      where("Point Winner", "==", player === player1 ? player2 : player1),
    ],

    // First Serve count and %
    firstServeCount: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Serve", "==", "First Serve"),
      where("Server", "==", player),
    ],
    firstServeWonCount: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Serve", "==", "First Serve"),
      where("Server", "==", player),
      where("Point Winner", "==", player),
    ],

    // Second Serve count and %
    secondServeCount: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Serve", "==", "Second Serve"),
      where("Server", "==", player),
    ],
    secondServeWonCount: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Serve", "==", "Second Serve"),
      where("Server", "==", player),
      where("Point Winner", "==", player),
    ],

    // Deuce points are common to both players; however, points won at deuce are player-specific.
    deucePoints: (_) => [
      where("Match ID", "==", currentMatchId),
      where("Game Score", "==", "40-40"),
    ],
    deucePointsWon: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Game Score", "==", "40-40"),
      where("Point Winner", "==", player),
    ],

    // Rally Length
    rallyLength1_5: () => [
      where("Match ID", "==", currentMatchId),
      where("Rally Length", "==", "1-5"),
    ],
    rallyLength1_5Won: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Rally Length", "==", "1-5"),
      where("Point Winner", "==", player),
    ],
    rallyLength6_10: () => [
      where("Match ID", "==", currentMatchId),
      where("Rally Length", "==", "6-10"),
    ],
    rallyLength6_10Won: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Rally Length", "==", "6-10"),
      where("Point Winner", "==", player),
    ],
    rallyLength11_15: () => [
      where("Match ID", "==", currentMatchId),
      where("Rally Length", "==", "11-15"),
    ],
    rallyLength11_15Won: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Rally Length", "==", "11-15"),
      where("Point Winner", "==", player),
    ],
    rallyLength16plus: () => [
      where("Match ID", "==", currentMatchId),
      where("Rally Length", "==", "16+"),
    ],
    rallyLength16plusWon: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Rally Length", "==", "16+"),
      where("Point Winner", "==", player),
    ],

    // Points won by serve location
    pointsServedWide: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "Wide"),
      where("Server", "==", player),
    ],
    pointsWonServedWide: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "Wide"),
      where("Point Winner", "==", player),
      where("Server", "==", player),
    ],
    pointsServedBodyForehand: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "Body Forehand"),
      where("Server", "==", player),
    ],
    pointsWonServedBodyForehand: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "Body Forehand"),
      where("Point Winner", "==", player),
      where("Server", "==", player),
    ],
    pointsServedBodyBackhand: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "Body Backhand"),
      where("Server", "==", player),
    ],
    pointsWonServedBodyBackhand: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "Body Backhand"),
      where("Point Winner", "==", player),
      where("Server", "==", player),
    ],
    pointsServedT: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "T"),
      where("Server", "==", player),
    ],
    pointsWonServedT: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "T"),
      where("Point Winner", "==", player),
      where("Server", "==", player),
    ],

    // Deuce/Ad
    pointsServedWideDeuce: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "Wide"),
      where("Server", "==", player),
      where("Serve Side", "==", "Deuce"),
    ],
    pointsWonServedWideDeuce: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "Wide"),
      where("Point Winner", "==", player),
      where("Server", "==", player),
      where("Serve Side", "==", "Deuce"),
    ],
    pointsServedTDeuce: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "T"),
      where("Server", "==", player),
      where("Serve Side", "==", "Deuce"),
    ],
    pointsWonServedTDeuce: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "T"),
      where("Point Winner", "==", player),
      where("Server", "==", player),
      where("Serve Side", "==", "Deuce"),
    ],
    pointsServedWideAd: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "Wide"),
      where("Server", "==", player),
      where("Serve Side", "==", "Ad"),
    ],
    pointsWonServedWideAd: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "Wide"),
      where("Point Winner", "==", player),
      where("Server", "==", player),
      where("Serve Side", "==", "Ad"),
    ],
    pointsServedTAd: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "T"),
      where("Server", "==", player),
      where("Serve Side", "==", "Ad"),
    ],
    pointsWonServedTAd: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "T"),
      where("Point Winner", "==", player),
      where("Server", "==", player),
      where("Serve Side", "==", "Ad"),
    ],

    // Returns
    totalReturns: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Server", "==", player === player1 ? player2 : player1),
    ],
    totalReturnPointsWon: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Point Winner", "==", player === player1 ? player1 : player2),
    ],
    totalReturnsIn: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Point End", "!=", "Return Error"),
    ],
    totalReturnErrors: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Point End", "==", "Return Error"),
    ],
    // Return error by location
    returnErrorsWide: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Point End", "==", "Return Error"),
      where("Serve Location", "==", "Wide"),
    ],
    returnErrorsBodyForehand: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Point End", "==", ""),
      where("Serve Location", "==", "Body Forehand"),
    ],
    returnErrorsBodyBackhand: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Point End", "==", "Return Error"),
      where("Serve Location", "==", "Body Backhand"),
    ],
    returnErrorsT: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Point End", "==", "Return Error"),
      where("Serve Location", "==", "T"),
    ],

    // Count of errors by location
    totalErrorsNet: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Error Location", "==", "Net"),
      where("Point Winner", "==", player === player1 ? player2 : player1),
    ],
    totalErrorsWide: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Error Location", "==", "Wide"),
      where("Point Winner", "==", player === player1 ? player2 : player1),
    ],
    totalErrorsLong: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Error Location", "==", "Long"),
      where("Point Winner", "==", player === player1 ? player2 : player1),
    ],
    // total points won
    totalPointsWon: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Point Winner", "==", player),
    ],
    totalPoints: () => [where("Match ID", "==", currentMatchId)],
  };

  // Object to store results for both players.
  const results = {};

  // Array to hold all query promises along with player and stat info.
  const queryPromises = [];

  // Loop over each player and each stat.
  players.forEach((player) => {
    results[player] = {}; // initialize object for this player

    Object.keys(statQueries).forEach((statKey) => {
      const q = query(pointsCollection, ...statQueries[statKey](player));
      queryPromises.push(
        getDocs(q).then((snapshot) => {
          results[player][statKey] = snapshot.size;
        })
      );
    });
  });

  try {
    await Promise.all(queryPromises);

    // Calculate additional stats such as first serve percentage for each player.
    players.forEach((player) => {
      const first = results[player].firstServeCount || 0;
      const second = results[player].secondServeCount || 0;
      const doubleFaults = results[player].doubleFaults || 0;
      results[player].firstServePercentage =
        Math.round((first / (first + second + doubleFaults)) * 100) || 0;

      // First serve won %
      const firstServeWon = results[player].firstServeWonCount;
      results[player].firstServeWonPercentage =
        Math.round((firstServeWon / first) * 100) || 0;

      // Second Serve won %
      const secondServeWon = results[player].secondServeWonCount || 0;
      results[player].secondServeWonPercentage =
        Math.round((secondServeWon / second) * 100) || 0;

      // Return % Both Correct
      const totalReturnPointsWon = results[player].totalReturnPointsWon || 0;
      const totalReturnsIn = results[player].totalReturnsIn || 0;
      const totalReturns = results[player].totalReturns || 0;
      results[player].returnPointsWonPercentage =
        Math.round((totalReturnPointsWon / totalReturns) * 100) || 0;
      results[player].returnsInPercentage =
        Math.round((totalReturnsIn / totalReturns) * 100) || 0;

      // Points Won %
      const totalPointsWon = results[player].totalPointsWon;
      const totalPoints = results[player1].totalPoints;
      results[player].totalPointWonPercentage =
        Math.round((totalPointsWon / totalPoints) * 100) || 0;
    });

    // Add match summary
    // await Promise.all(
    //   players.map((player) =>
    //     addSummaryStats(db, results[player], currentMatchId, player)
    //   )
    // );

    // Built in count check!!!!

    // QUARANTINE

    // GOOD
    // console.log("CHECK CHECK CHECK");
    // console.log("Total Points Won:", results[player1].totalPointsWon + "/" + results[player1].totalPoints, "-", results[player1].totalPointWonPercentage + "%");
    // console.log("Unforced Errors:", results[player1].unforcedErrors);
    // console.log("Forced Errors:", results[player1].forcedErrors);

    // console.log("First Serve %:", results[player1].firstServePercentage);
    // console.log("First Serve Won:", results[player1].firstServeWonCount + "/" + results[player1].firstServeCount, "-", results[player1].firstServeWonPercentage + "%");
    // console.log("Second Serve Won %:", results[player1].secondServeWonCount + "/" + results[player1].secondServeCount, "-", results[player1].secondServeWonPercentage + "%");

    // console.log("Points Won Served T:", results[player1].pointsWonServedT, "/", results[player1].pointsServedT);
    // console.log("Points Won Served Body Backhand:", results[player1].pointsWonServedBodyBackhand, "/", results[player1].pointsServedBodyBackhand);
    // console.log("Points Won Served Forehand:", results[player1].pointsWonServedBodyForehand, "/", results[player1].pointsServedBodyForehand);
    // console.log("Points Won Served Wide:", results[player1].pointsWonServedWide, "/", results[player1].pointsServedWide);

    // console.log("Returns In: ", results[player1].totalReturnsIn, "/", results[player1].totalReturns);
    // console.log("Return Points Won: ", results[player1].totalReturnPointsWon, "/", results[player1].totalReturns);
    // console.log("Return Points Won %:", results[player1].returnPointsWonPercentage);
    // console.log("Returns In %:", results[player1].returnsInPercentage);

    // console.log("Returns Missed Wide: ", results[player1].returnErrorsWide, "/", results[player1].totalReturnErrors);
    // console.log("Returns Missed Body Backhand: ", results[player1].returnErrorsBodyBackhand, "/", results[player1].totalReturnErrors);
    // console.log("Returns Missed Body Forehand: ", results[player1].returnErrorsBodyForehand, "/", results[player1].totalReturnErrors);
    // console.log("Returns Missed T: ", results[player1].returnErrorsT, "/", results[player1].totalReturnErrors);

    // console.log("Errors in Net:", results[player1].totalErrorsNet);
    // console.log("Errors Long:", results[player1].totalErrorsLong);
    // console.log("Errors Wide:", results[player1].totalErrorsWide);

    // console.log("Rallies 1-5 Won:", results[player1].rallyLength1_5Won, "/", results[player1].rallyLength1_5);
    // console.log("Rallies 6-10 Won:", results[player1].rallyLength6_10Won, "/", results[player1].rallyLength6_10);
    // console.log("Rallies 11-15 Won:", results[player1].rallyLength11_15Won, "/", results[player1].rallyLength11_15);
    // console.log("Rallies 16+ Won:", results[player1].rallyLength16plusWon, "/", results[player1].rallyLength16plus);

    // // Player 2
    // console.log("CHECK CHECK CHECK");
    // console.log("Total Points Won:", results[player2].totalPointsWon + "/" + results[player2].totalPoints, "-", results[player2].totalPointWonPercentage + "%");
    // console.log("Unforced Errors:", results[player2].unforcedErrors);
    // console.log("Forced Errors:", results[player2].forcedErrors);

    // console.log("First Serve %:", results[player2].firstServePercentage);
    // console.log("First Serve Won:", results[player2].firstServeWonCount + "/" + results[player2].firstServeCount, "-", results[player2].firstServeWonPercentage + "%");
    // console.log("Second Serve Won %:", results[player2].secondServeWonCount + "/" + results[player2].secondServeCount, "-", results[player2].secondServeWonPercentage + "%");

    // console.log("Points Won Served T:", results[player2].pointsWonServedT, "/", results[player2].pointsServedT);
    // console.log("Points Won Served Body Backhand:", results[player2].pointsWonServedBodyBackhand, "/", results[player2].pointsServedBodyBackhand);
    // console.log("Points Won Served Forehand:", results[player2].pointsWonServedBodyForehand, "/", results[player2].pointsServedBodyForehand);
    // console.log("Points Won Served Wide:", results[player2].pointsWonServedWide, "/", results[player2].pointsServedWide);

    // console.log("Returns In: ", results[player2].totalReturnsIn, "/", results[player2].totalReturns);
    // console.log("Return Points Won: ", results[player2].totalReturnPointsWon, "/", results[player2].totalReturns);
    // console.log("Return Points Won %:", results[player2].returnPointsWonPercentage);
    // console.log("Return Points In %:", results[player2].returnsInPercentage);

    // console.log("Returns Missed Wide: ", results[player2].returnErrorsWide, "/", results[player2].totalReturnErrors);
    // console.log("Returns Missed Body Backhand: ", results[player2].returnErrorsBodyBackhand, "/", results[player2].totalReturnErrors);
    // console.log("Returns Missed Body Forehand: ", results[player2].returnErrorsBodyForehand, "/", results[player2].totalReturnErrors);
    // console.log("Returns Missed T: ", results[player2].returnErrorsT, "/", results[player2].totalReturnErrors);

    // console.log("Errors in Net:", results[player2].totalErrorsNet);
    // console.log("Errors Long:", results[player2].totalErrorsLong);
    // console.log("Errors Wide:", results[player2].totalErrorsWide);

    // console.log("Rallies 1-5 Won:", results[player2].rallyLength1_5Won, "/", results[player2].rallyLength1_5);
    // console.log("Rallies 6-10 Won:", results[player2].rallyLength6_10Won, "/", results[player2].rallyLength6_10);
    // console.log("Rallies 11-15 Won:", results[player2].rallyLength11_15Won, "/", results[player2].rallyLength11_15);
    // console.log("Rallies 16+ Won:", results[player2].rallyLength16plusWon, "/", results[player2].rallyLength16plus);

    console.log("Match summary:", results);
    return results;
  } catch (e) {
    console.error("Error getting documents: ", e);
    // In case of error, return default values for both players.
    const defaultStats = {
      unforcedErrors: 0,
      forcedErrors: 0,
      winners: 0,
      aces: 0,
      doubleFaults: 0,
      firstServeCount: 0,
      secondServeCount: 0,
      deucePoints: 0,
      deucePointsWon: 0,
      firstServePercentage: 0,
    };
    return {
      [player1]: defaultStats,
      [player2]: defaultStats,
    };
  }
}

export async function getLiveStats(currentMatchId, player1, player2) {
  const pointsCollection = collection(db, "points");

  // Define the list of players
  const players = [player1, player2];

  // Map each stat to a function that returns query conditions for a given player.
  // Note: For some stats like errors, the query might need to compare against the opponent.
  const statQueries = {
    unforcedErrors: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Point End", "==", "Unforced Error"),
      // Error is credited to the player who lost the point.
      where("Point Winner", "==", player === player1 ? player2 : player1),
    ],
    forcedErrors: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Point End", "==", "Forced Error"),
      where("Point Winner", "==", player === player1 ? player2 : player1),
    ],
    winners: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Point End", "==", "Winner"),
      // Winner is credited to the player who made the shot.
      where("Point Winner", "==", player),
    ],
    aces: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Point End", "==", "Ace"),
      where("Point Winner", "==", player),
    ],
    doubleFaults: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Serve", "==", "Double Fault"),
      // Double fault is an error, so the point is won by the opponent.
      where("Point Winner", "==", player === player1 ? player2 : player1),
    ],

    // First Serve count and %
    firstServeCount: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Serve", "==", "First Serve"),
      where("Server", "==", player),
    ],
    firstServeWonCount: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Serve", "==", "First Serve"),
      where("Server", "==", player),
      where("Point Winner", "==", player),
    ],

    // Second Serve count and %
    secondServeCount: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Serve", "==", "Second Serve"),
      where("Server", "==", player),
    ],
    secondServeWonCount: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Serve", "==", "Second Serve"),
      where("Server", "==", player),
      where("Point Winner", "==", player),
    ],

    // Deuce points are common to both players; however, points won at deuce are player-specific.
    deucePoints: (_) => [
      where("Match ID", "==", currentMatchId),
      where("Game Score", "==", "40-40"),
    ],
    deucePointsWon: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Game Score", "==", "40-40"),
      where("Point Winner", "==", player),
    ],

    // Rally Length
    rallyLength1_5: () => [
      where("Match ID", "==", currentMatchId),
      where("Rally Length", "==", "1-5"),
    ],
    rallyLength1_5Won: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Rally Length", "==", "1-5"),
      where("Point Winner", "==", player),
    ],
    rallyLength6_10: () => [
      where("Match ID", "==", currentMatchId),
      where("Rally Length", "==", "6-10"),
    ],
    rallyLength6_10Won: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Rally Length", "==", "6-10"),
      where("Point Winner", "==", player),
    ],
    rallyLength11_15: () => [
      where("Match ID", "==", currentMatchId),
      where("Rally Length", "==", "11-15"),
    ],
    rallyLength11_15Won: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Rally Length", "==", "11-15"),
      where("Point Winner", "==", player),
    ],
    rallyLength16plus: () => [
      where("Match ID", "==", currentMatchId),
      where("Rally Length", "==", "16+"),
    ],
    rallyLength16plusWon: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Rally Length", "==", "16+"),
      where("Point Winner", "==", player),
    ],

    // Points won by serve location
    pointsServedWide: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "Wide"),
      where("Server", "==", player),
    ],
    pointsWonServedWide: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "Wide"),
      where("Point Winner", "==", player),
      where("Server", "==", player),
    ],
    pointsServedBodyForehand: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "Body Forehand"),
      where("Server", "==", player),
    ],
    pointsWonServedBodyForehand: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "Body Forehand"),
      where("Point Winner", "==", player),
      where("Server", "==", player),
    ],
    pointsServedBodyBackhand: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "Body Backhand"),
      where("Server", "==", player),
    ],
    pointsWonServedBodyBackhand: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "Body Backhand"),
      where("Point Winner", "==", player),
      where("Server", "==", player),
    ],
    pointsServedT: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "T"),
      where("Server", "==", player),
    ],
    pointsWonServedT: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "T"),
      where("Point Winner", "==", player),
      where("Server", "==", player),
    ],

    // Deuce/Ad
    pointsServedWideDeuce: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "Wide"),
      where("Server", "==", player),
      where("Serve Side", "==", "Deuce"),
    ],
    pointsWonServedWideDeuce: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "Wide"),
      where("Point Winner", "==", player),
      where("Server", "==", player),
      where("Serve Side", "==", "Deuce"),
    ],
    pointsServedTDeuce: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "T"),
      where("Server", "==", player),
      where("Serve Side", "==", "Deuce"),
    ],
    pointsWonServedTDeuce: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "T"),
      where("Point Winner", "==", player),
      where("Server", "==", player),
      where("Serve Side", "==", "Deuce"),
    ],
    pointsServedWideAd: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "Wide"),
      where("Server", "==", player),
      where("Serve Side", "==", "Ad"),
    ],
    pointsWonServedWideAd: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "Wide"),
      where("Point Winner", "==", player),
      where("Server", "==", player),
      where("Serve Side", "==", "Ad"),
    ],
    pointsServedTAd: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "T"),
      where("Server", "==", player),
      where("Serve Side", "==", "Ad"),
    ],
    pointsWonServedTAd: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "T"),
      where("Point Winner", "==", player),
      where("Server", "==", player),
      where("Serve Side", "==", "Ad"),
    ],

    // Returns
    totalReturns: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Server", "==", player === player1 ? player2 : player1),
    ],
    totalReturnPointsWon: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Point Winner", "==", player === player1 ? player1 : player2),
    ],
    totalReturnsIn: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Point End", "!=", "Return Error"),
    ],
    totalReturnErrors: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Point End", "==", "Return Error"),
    ],
    // Return error by location
    returnErrorsWide: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Point End", "==", "Return Error"),
      where("Serve Location", "==", "Wide"),
    ],
    returnErrorsBodyForehand: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Point End", "==", ""),
      where("Serve Location", "==", "Body Forehand"),
    ],
    returnErrorsBodyBackhand: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Point End", "==", "Return Error"),
      where("Serve Location", "==", "Body Backhand"),
    ],
    returnErrorsT: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Point End", "==", "Return Error"),
      where("Serve Location", "==", "T"),
    ],

    // Count of errors by location
    totalErrorsNet: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Error Location", "==", "Net"),
      where("Point Winner", "==", player === player1 ? player2 : player1),
    ],
    totalErrorsWide: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Error Location", "==", "Wide"),
      where("Point Winner", "==", player === player1 ? player2 : player1),
    ],
    totalErrorsLong: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Error Location", "==", "Long"),
      where("Point Winner", "==", player === player1 ? player2 : player1),
    ],
    // total points won
    totalPointsWon: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Point Winner", "==", player),
    ],
    totalPoints: () => [where("Match ID", "==", currentMatchId)],
  };

  // Object to store results for both players.
  const results = {};

  // Array to hold all query promises along with player and stat info.
  const queryPromises = [];

  // Loop over each player and each stat.
  players.forEach((player) => {
    results[player] = {}; // initialize object for this player

    Object.keys(statQueries).forEach((statKey) => {
      const q = query(pointsCollection, ...statQueries[statKey](player));
      queryPromises.push(
        getDocs(q).then((snapshot) => {
          results[player][statKey] = snapshot.size;
        })
      );
    });
  });

  try {
    await Promise.all(queryPromises);

    // Calculate additional stats such as first serve percentage for each player.
    players.forEach((player) => {
      const first = results[player].firstServeCount || 0;
      const second = results[player].secondServeCount || 0;
      const doubleFaults = results[player].doubleFaults || 0;
      results[player].firstServePercentage =
        Math.round((first / (first + second + doubleFaults)) * 100) || 0;

      // First serve won %
      const firstServeWon = results[player].firstServeWonCount;
      results[player].firstServeWonPercentage =
        Math.round((firstServeWon / first) * 100) || 0;

      // Second Serve won %
      const secondServeWon = results[player].secondServeWonCount || 0;
      results[player].secondServeWonPercentage =
        Math.round((secondServeWon / second) * 100) || 0;

      // Return % Both Correct
      const totalReturnPointsWon = results[player].totalReturnPointsWon || 0;
      const totalReturnsIn = results[player].totalReturnsIn || 0;
      const totalReturns = results[player].totalReturns || 0;
      results[player].returnPointsWonPercentage =
        Math.round((totalReturnPointsWon / totalReturns) * 100) || 0;
      results[player].returnsInPercentage =
        Math.round((totalReturnsIn / totalReturns) * 100) || 0;

      // Points Won %
      const totalPointsWon = results[player].totalPointsWon;
      const totalPoints = results[player1].totalPoints;
      results[player].totalPointWonPercentage =
        Math.round((totalPointsWon / totalPoints) * 100) || 0;
    });

    console.log("Match summary:", results);
    return results;
  } catch (e) {
    console.error("Error getting documents: ", e);
    // In case of error, return default values for both players.
    const defaultStats = {
      unforcedErrors: 0,
      forcedErrors: 0,
      winners: 0,
      aces: 0,
      doubleFaults: 0,
      firstServeCount: 0,
      secondServeCount: 0,
      deucePoints: 0,
      deucePointsWon: 0,
      firstServePercentage: 0,
    };
    return {
      [player1]: defaultStats,
      [player2]: defaultStats,
    };
  }
}

export async function getPointsLost(currentMatchId, player2) {
  const pointsCollection = collection(db, "points");

  const pointsQuery = query(
    pointsCollection,
    where("Match ID", "==", currentMatchId),
    where("Point Winner", "==", player2),
    where("Point End", "==", "Unforced Error")
  );

  try {
    const querySnapshot = await getDocs(pointsQuery);
    const documents = []; // Or a more specific type

    querySnapshot.forEach((doc) => {
      documents.push({
        id: doc.id, // Include the document ID if you need it
        ...doc.data(), // Add the document data
      });
    });

    const fieldsToDrop = [
      "Serve",
      "Return",
      "Serve Location",
      "Stroke Direction",
      "Point Number",
      "Point Winner",
      "Point End",
      "Server",
      "Game Score",
      "Match ID",
      "id",
      "Match Score",
      "Rally Length",
      "OwnerID",
      "Serve Side",
      "Set"
      // "Stroke Intent",
    ];

    const filteredObjects = documents.map((obj) =>
      Object.fromEntries(
        Object.entries(obj).filter(([key]) => !fieldsToDrop.includes(key))
      )
    );

    function normalize(obj) {
      return JSON.stringify(
        Object.keys(obj)
          .sort()
          .reduce((acc, key) => {
            acc[key] = obj[key];
            return acc;
          }, {})
      );
    }

    const counter = new Map();

    filteredObjects.forEach((obj) => {
      const key = normalize(obj);
      counter.set(key, (counter.get(key) || 0) + 1);
    });

    const result = Array.from(counter.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([key, count]) => ({ obj: JSON.parse(key), count }));

    return result;
  } catch (e) {
    console.error("Error getting document: ", e);
    return 0;
  }
}

async function docWithFieldExists(db, collName, fieldName, value) {
  // 1. Build a reference to the collection
  const collRef = collection(db, collName);

  // 2. Build a query: “where fieldName == value”
  const q = query(collRef, where(fieldName, "==", value));

  // 3. Execute the query
  const snapshot = await getDocs(q);

  // 4. If the snapshot has any docs, at least one exists
  return !snapshot.empty; // true if ≥1 doc matched
}

async function addSummaryStats(db, data, matchId, player) {
  const playerOneDocRef = await addDoc(collection(db, "statistics"), {
    ...data,
    matchId: matchId,
    player: player,
    OwnerID: auth.currentUser?.uid,
  });
  console.log("Document written with ID: ", playerOneDocRef.id);
}

export async function fetchMatches() {
  const matchesRef = collection(db, "matches");
  const q = query(matchesRef, orderBy("Date", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      player1FirstName: data.player1FirstName,
      player1LastName: data.player1LastName,
      player2FirstName: data.player2FirstName,
      player2LastName: data.player2LastName,
      label: `${data.player1FirstName} vs ${
        data.player2FirstName
      } — ${data.Date.toDate().toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })}`,
    };
  });
}
