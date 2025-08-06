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

import { getAuth } from "firebase/auth";
import { auth } from "@/firebase/init";

import db from "./init.js";

export async function addPointToFirebase(pointData, isGuest) {
  if (!isGuest) {
    try {
      const docRef = await addDoc(collection(db, "points"), {
        ...pointData,
      });
      console.log("Point added with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding point: ", e);
    }
  } else {
    console.log("Point was not added because user is a guest");
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

export async function getSetBySet(currentMatchId, player1, player2) {
  const pointsCollection = collection(db, "points");

  // Define the list of players and sets
  const players = [player1, player2];
  const sets = [1, 2, 3];

  // Map each stat to a function that returns query conditions for a given player.
  // Note: For some stats like errors, the query might need to compare against the opponent.
  const statQueries = {
    unforcedErrors: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Point End", "==", "Unforced Error"),
      // Error is credited to the player who lost the point.
      where("Point Winner", "==", player === player1 ? player2 : player1),
      where("Set", "==", set),
    ],
    forcedErrors: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Point End", "==", "Forced Error"),
      where("Point Winner", "==", player === player1 ? player2 : player1),
      where("Set", "==", set),
    ],
    winners: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Point End", "==", "Winner"),
      // Winner is credited to the player who made the shot.
      where("Point Winner", "==", player),
      where("Set", "==", set),
    ],
    aces: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Point End", "==", "Ace"),
      where("Point Winner", "==", player),
      where("Set", "==", set),
    ],
    doubleFaults: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Serve", "==", "Double Fault"),
      where("Point Winner", "==", player === player1 ? player2 : player1),
      where("Set", "==", set),
    ],

    // First Serve count and %
    firstServeCount: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Serve", "==", "First Serve"),
      where("Server", "==", player),
      where("Set", "==", set),
    ],
    firstServeWonCount: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Serve", "==", "First Serve"),
      where("Server", "==", player),
      where("Point Winner", "==", player),
      where("Set", "==", set),
    ],

    // Second Serve count and %
    secondServeCount: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Serve", "==", "Second Serve"),
      where("Server", "==", player),
      where("Set", "==", set),
    ],
    secondServeWonCount: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Serve", "==", "Second Serve"),
      where("Server", "==", player),
      where("Point Winner", "==", player),
      where("Set", "==", set),
    ],

    // Deuce points are common to both players; however, points won at deuce are player-specific.
    deucePoints: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Game Score", "==", "40-40"),
      where("Set", "==", set),
    ],
    deucePointsWon: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Game Score", "==", "40-40"),
      where("Point Winner", "==", player),
      where("Set", "==", set),
    ],

    // Rally Length
    rallyLength1_5: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Rally Length", "==", "1-5"),
      where("Set", "==", set),
    ],
    rallyLength1_5Won: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Rally Length", "==", "1-5"),
      where("Point Winner", "==", player),
      where("Set", "==", set),
    ],
    rallyLength6_10: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Rally Length", "==", "6-10"),
      where("Set", "==", set),
    ],
    rallyLength6_10Won: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Rally Length", "==", "6-10"),
      where("Point Winner", "==", player),
      where("Set", "==", set),
    ],
    rallyLength11_15: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Rally Length", "==", "11-15"),
      where("Set", "==", set),
    ],
    rallyLength11_15Won: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Rally Length", "==", "11-15"),
      where("Point Winner", "==", player),
      where("Set", "==", set),
    ],
    rallyLength16plus: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Rally Length", "==", "16+"),
      where("Set", "==", set),
    ],
    rallyLength16plusWon: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Rally Length", "==", "16+"),
      where("Point Winner", "==", player),
      where("Set", "==", set),
    ],

    // Points won by serve location
    pointsServedWide: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "Wide"),
      where("Server", "==", player),
      where("Set", "==", set),
    ],
    pointsWonServedWide: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "Wide"),
      where("Point Winner", "==", player),
      where("Server", "==", player),
      where("Set", "==", set),
    ],
    pointsServedBodyForehand: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "Body Forehand"),
      where("Server", "==", player),
      where("Set", "==", set),
    ],
    pointsWonServedBodyForehand: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "Body Forehand"),
      where("Point Winner", "==", player),
      where("Server", "==", player),
      where("Set", "==", set),
    ],
    pointsServedBodyBackhand: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "Body Backhand"),
      where("Server", "==", player),
      where("Set", "==", set),
    ],
    pointsWonServedBodyBackhand: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "Body Backhand"),
      where("Point Winner", "==", player),
      where("Server", "==", player),
      where("Set", "==", set),
    ],
    pointsServedT: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "T"),
      where("Server", "==", player),
      where("Set", "==", set),
    ],
    pointsWonServedT: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "T"),
      where("Point Winner", "==", player),
      where("Server", "==", player),
      where("Set", "==", set),
    ],
    pointsWonServedWideDeuce: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "Wide"),
      where("Point Winner", "==", player),
      where("Server", "==", player),
      where("Serve Side", "==", "Deuce"),
      where("Set", "==", set),
    ],
    pointsWonServedTDeuce: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "T"),
      where("Point Winner", "==", player),
      where("Server", "==", player),
      where("Serve Side", "==", "Deuce"),
      where("Set", "==", set),
    ],
    pointsWonServedWideAd: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "Wide"),
      where("Point Winner", "==", player),
      where("Server", "==", player),
      where("Serve Side", "==", "Ad"),
      where("Set", "==", set),
    ],
    pointsWonServedTAd: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "T"),
      where("Point Winner", "==", player),
      where("Server", "==", player),
      where("Serve Side", "==", "Ad"),
      where("Set", "==", set),
    ],

    // Returns
    totalReturns: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Set", "==", set),
    ],
    totalReturnWinners: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Point End", "==", "Return Winner"),
      where("Set", "==", set),
    ],
    totalReturnPointsWon: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Point Winner", "==", player === player1 ? player1 : player2),
      where("Set", "==", set),
    ],
    totalReturnsIn: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Point End", "in", [
        "Return Winner",
        "Unforced Error",
        "Forced Error",
        "Winner",
      ]),
      where("Set", "==", set),
    ],
    totalReturnErrors: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Point End", "==", "Return Error"),
      where("Set", "==", set),
    ],

    // Return error by location
    returnErrorsWide: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Point End", "==", "Return Error"),
      where("Serve Location", "==", "Wide"),
      where("Set", "==", set),
    ],
    returnsWide: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "Wide"),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Set", "==", set),
    ],
    returnErrorsWideAd: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Point End", "==", "Return Error"),
      where("Serve Location", "==", "Wide"),
      where("Set", "==", set),
      where("Serve Side", "==", "Ad"),
    ],
    returnErrorsWideDeuce: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Point End", "==", "Return Error"),
      where("Serve Location", "==", "Wide"),
      where("Set", "==", set),
      where("Serve Side", "==", "Deuce"),
    ],
    returnErrorsBodyForehand: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Point End", "==", "Return Error"),
      where("Serve Location", "==", "Body Forehand"),
      where("Set", "==", set),
    ],
    returnsBodyForehand: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "Body Forehand"),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Set", "==", set),
    ],
    returnErrorsBodyBackhand: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Point End", "==", "Return Error"),
      where("Serve Location", "==", "Body Backhand"),
      where("Set", "==", set),
    ],
    returnsBodyBackhand: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "Body Backhand"),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Set", "==", set),
    ],
    returnErrorsT: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Point End", "==", "Return Error"),
      where("Serve Location", "==", "T"),
      where("Set", "==", set),
    ],
    returnsT: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "T"),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Set", "==", set),
    ],
    returnErrorsTDeuce: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Point End", "==", "Return Error"),
      where("Serve Location", "==", "T"),
      where("Set", "==", set),
      where("Serve Side", "==", "Deuce"),
    ],
    returnErrorsTAd: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Point End", "==", "Return Error"),
      where("Serve Location", "==", "T"),
      where("Set", "==", set),
      where("Serve Side", "==", "Ad"),
    ],

    // Count of errors by location
    totalErrorsNet: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Error Location", "==", "Net"),
      where("Point Winner", "==", player === player1 ? player2 : player1),
      where("Set", "==", set),
    ],
    totalErrorsWide: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Error Location", "==", "Wide"),
      where("Point Winner", "==", player === player1 ? player2 : player1),
      where("Set", "==", set),
    ],
    totalErrorsLong: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Error Location", "==", "Long"),
      where("Point Winner", "==", player === player1 ? player2 : player1),
      where("Set", "==", set),
    ],
    // total points won
    totalPointsWon: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Point Winner", "==", player),
      where("Set", "==", set),
    ],
    totalPoints: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Set", "==", set),
    ],
  };

  // Object to store results for both players.
  const results = {};

  // Array to hold all query promises along with player and stat info.
  const queryPromises = [];

  // Loop over each player and each stat.
  players.forEach((player) => {
    results[player] = {
      whole: {},
    };

    sets.forEach((set) => {
      results[player][`set${set}`] = {}; // initialize object for this set

      Object.keys(statQueries).forEach((statKey) => {
        const q = query(pointsCollection, ...statQueries[statKey](player, set));

        queryPromises.push(
          getDocs(q).then((snapshot) => {
            const count = snapshot.size;
            results[player][`set${set}`][statKey] = count;

            results[player]["whole"][statKey] =
              (results[player]["whole"][statKey] || 0) + count;
          })
        );
      });
    });
  });

  try {
    await Promise.all(queryPromises);

    // Calculate additional stats such as first serve percentage for each player.
    players.forEach((player) => {
      // Loop through sets for each player
      const sets = ["whole", "set1", "set2", "set3"];

      sets.forEach((set) => {
        const first = results[player][set].firstServeCount || 0;
        const second = results[player][set].secondServeCount || 0;
        const doubleFaults = results[player][set].doubleFaults || 0;
        results[player][set].firstServePercentage =
          Math.round((first / (first + second + doubleFaults)) * 100) || 0;

        // First Serve won %
        const firstServeWon = results[player][set].firstServeWonCount || 0;
        results[player][set].firstServeWonPercentage =
          Math.round((firstServeWon / first) * 100) || 0;

        // Second Serve won %
        const secondServeWon = results[player][set].secondServeWonCount || 0;
        results[player][set].secondServeWonPercentage =
          Math.round((secondServeWon / second) * 100) || 0;

        // Return %
        const totalReturnPointsWon =
          results[player][set].totalReturnPointsWon || 0;
        const totalReturnsIn = results[player][set].totalReturnsIn || 0;
        const totalReturns = results[player][set].totalReturns || 0;
        results[player][set].returnPointsWonPercentage =
          Math.round((totalReturnPointsWon / totalReturns) * 100) || 0;
        results[player][set].returnsInPercentage =
          Math.round((totalReturnsIn / totalReturns) * 100) || 0;

        // Points Won %
        const totalPointsWon = results[player][set].totalPointsWon || 0;
        const totalPoints = results[player][set].totalPoints || 0;
        results[player][set].totalPointWonPercentage =
          Math.round((totalPointsWon / totalPoints) * 100) || 0;
      });
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

export async function storeStatsToSummaryCollection(
  currentMatchId,
  player1,
  player2
) {
  const pointsCollection = collection(db, "points");

  // Define the list of players and sets
  const players = [player1, player2];
  const sets = [1, 2, 3];

  // Map each stat to a function that returns query conditions for a given player.
  // Note: For some stats like errors, the query might need to compare against the opponent.
  const statQueries = {
    unforcedErrors: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Point End", "==", "Unforced Error"),
      // Error is credited to the player who lost the point.
      where("Point Winner", "==", player === player1 ? player2 : player1),
      where("Set", "==", set),
    ],
    forcedErrors: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Point End", "==", "Forced Error"),
      where("Point Winner", "==", player === player1 ? player2 : player1),
      where("Set", "==", set),
    ],
    winners: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Point End", "==", "Winner"),
      // Winner is credited to the player who made the shot.
      where("Point Winner", "==", player),
      where("Set", "==", set),
    ],
    aces: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Point End", "==", "Ace"),
      where("Point Winner", "==", player),
      where("Set", "==", set),
    ],
    doubleFaults: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Serve", "==", "Double Fault"),
      where("Point Winner", "==", player === player1 ? player2 : player1),
      where("Set", "==", set),
    ],

    // First Serve count and %
    firstServeCount: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Serve", "==", "First Serve"),
      where("Server", "==", player),
      where("Set", "==", set),
    ],
    firstServeWonCount: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Serve", "==", "First Serve"),
      where("Server", "==", player),
      where("Point Winner", "==", player),
      where("Set", "==", set),
    ],

    // Second Serve count and %
    secondServeCount: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Serve", "==", "Second Serve"),
      where("Server", "==", player),
      where("Set", "==", set),
    ],
    secondServeWonCount: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Serve", "==", "Second Serve"),
      where("Server", "==", player),
      where("Point Winner", "==", player),
      where("Set", "==", set),
    ],

    // Deuce points are common to both players; however, points won at deuce are player-specific.
    deucePoints: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Game Score", "==", "40-40"),
      where("Set", "==", set),
    ],
    deucePointsWon: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Game Score", "==", "40-40"),
      where("Point Winner", "==", player),
      where("Set", "==", set),
    ],

    // Rally Length
    rallyLength1_5: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Rally Length", "==", "1-5"),
      where("Set", "==", set),
    ],
    rallyLength1_5Won: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Rally Length", "==", "1-5"),
      where("Point Winner", "==", player),
      where("Set", "==", set),
    ],
    rallyLength6_10: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Rally Length", "==", "6-10"),
      where("Set", "==", set),
    ],
    rallyLength6_10Won: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Rally Length", "==", "6-10"),
      where("Point Winner", "==", player),
      where("Set", "==", set),
    ],
    rallyLength11_15: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Rally Length", "==", "11-15"),
      where("Set", "==", set),
    ],
    rallyLength11_15Won: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Rally Length", "==", "11-15"),
      where("Point Winner", "==", player),
      where("Set", "==", set),
    ],
    rallyLength16plus: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Rally Length", "==", "16+"),
      where("Set", "==", set),
    ],
    rallyLength16plusWon: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Rally Length", "==", "16+"),
      where("Point Winner", "==", player),
      where("Set", "==", set),
    ],

    // Points won by serve location
    pointsServedWide: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "Wide"),
      where("Server", "==", player),
      where("Set", "==", set),
    ],
    pointsWonServedWide: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "Wide"),
      where("Point Winner", "==", player),
      where("Server", "==", player),
      where("Set", "==", set),
    ],
    pointsServedBodyForehand: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "Body Forehand"),
      where("Server", "==", player),
      where("Set", "==", set),
    ],
    pointsWonServedBodyForehand: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "Body Forehand"),
      where("Point Winner", "==", player),
      where("Server", "==", player),
      where("Set", "==", set),
    ],
    pointsServedBodyBackhand: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "Body Backhand"),
      where("Server", "==", player),
      where("Set", "==", set),
    ],
    pointsWonServedBodyBackhand: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "Body Backhand"),
      where("Point Winner", "==", player),
      where("Server", "==", player),
      where("Set", "==", set),
    ],
    pointsServedT: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "T"),
      where("Server", "==", player),
      where("Set", "==", set),
    ],
    pointsWonServedT: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "T"),
      where("Point Winner", "==", player),
      where("Server", "==", player),
      where("Set", "==", set),
    ],
    pointsWonServedWideDeuce: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "Wide"),
      where("Point Winner", "==", player),
      where("Server", "==", player),
      where("Serve Side", "==", "Deuce"),
      where("Set", "==", set),
    ],
    pointsWonServedTDeuce: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "T"),
      where("Point Winner", "==", player),
      where("Server", "==", player),
      where("Serve Side", "==", "Deuce"),
      where("Set", "==", set),
    ],
    pointsWonServedWideAd: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "Wide"),
      where("Point Winner", "==", player),
      where("Server", "==", player),
      where("Serve Side", "==", "Ad"),
      where("Set", "==", set),
    ],
    pointsWonServedTAd: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "T"),
      where("Point Winner", "==", player),
      where("Server", "==", player),
      where("Serve Side", "==", "Ad"),
      where("Set", "==", set),
    ],

    // Returns
    totalReturns: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Set", "==", set),
    ],
    totalReturnWinners: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Point End", "==", "Return Winner"),
      where("Set", "==", set),
    ],
    totalReturnPointsWon: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Point Winner", "==", player === player1 ? player1 : player2),
      where("Set", "==", set),
    ],
    totalReturnsIn: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Point End", "in", [
        "Return Winner",
        "Unforced Error",
        "Forced Error",
        "Winner",
      ]),
      where("Set", "==", set),
    ],
    totalReturnErrors: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Point End", "==", "Return Error"),
      where("Set", "==", set),
    ],

    // Return error by location
    returnErrorsWide: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Point End", "==", "Return Error"),
      where("Serve Location", "==", "Wide"),
      where("Set", "==", set),
    ],
    returnsWide: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "Wide"),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Set", "==", set),
    ],
    returnErrorsWideAd: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Point End", "==", "Return Error"),
      where("Serve Location", "==", "Wide"),
      where("Set", "==", set),
      where("Serve Side", "==", "Ad"),
    ],
    returnErrorsWideDeuce: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Point End", "==", "Return Error"),
      where("Serve Location", "==", "Wide"),
      where("Set", "==", set),
      where("Serve Side", "==", "Deuce"),
    ],
    returnErrorsBodyForehand: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Point End", "==", "Return Error"),
      where("Serve Location", "==", "Body Forehand"),
      where("Set", "==", set),
    ],
    returnsBodyForehand: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "Body Forehand"),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Set", "==", set),
    ],
    returnErrorsBodyBackhand: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Point End", "==", "Return Error"),
      where("Serve Location", "==", "Body Backhand"),
      where("Set", "==", set),
    ],
    returnsBodyBackhand: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "Body Backhand"),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Set", "==", set),
    ],
    returnErrorsT: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Point End", "==", "Return Error"),
      where("Serve Location", "==", "T"),
      where("Set", "==", set),
    ],
    returnsT: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Serve Location", "==", "T"),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Set", "==", set),
    ],
    returnErrorsTDeuce: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Point End", "==", "Return Error"),
      where("Serve Location", "==", "T"),
      where("Set", "==", set),
      where("Serve Side", "==", "Deuce"),
    ],
    returnErrorsTAd: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Server", "==", player === player1 ? player2 : player1),
      where("Point End", "==", "Return Error"),
      where("Serve Location", "==", "T"),
      where("Set", "==", set),
      where("Serve Side", "==", "Ad"),
    ],

    // Count of errors by location
    totalErrorsNet: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Error Location", "==", "Net"),
      where("Point Winner", "==", player === player1 ? player2 : player1),
      where("Set", "==", set),
    ],
    totalErrorsWide: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Error Location", "==", "Wide"),
      where("Point Winner", "==", player === player1 ? player2 : player1),
      where("Set", "==", set),
    ],
    totalErrorsLong: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Error Location", "==", "Long"),
      where("Point Winner", "==", player === player1 ? player2 : player1),
      where("Set", "==", set),
    ],
    // total points won
    totalPointsWon: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Point Winner", "==", player),
      where("Set", "==", set),
    ],
    totalPoints: (player, set) => [
      where("Match ID", "==", currentMatchId),
      where("Set", "==", set),
    ],
  };

  // Object to store results for both players.
  const results = {};

  // Array to hold all query promises along with player and stat info.
  const queryPromises = [];

  // Loop over each player and each stat.
  players.forEach((player) => {
    results[player] = {
      whole: {},
    };

    sets.forEach((set) => {
      results[player][`set${set}`] = {}; // initialize object for this set

      Object.keys(statQueries).forEach((statKey) => {
        const q = query(pointsCollection, ...statQueries[statKey](player, set));

        queryPromises.push(
          getDocs(q).then((snapshot) => {
            const count = snapshot.size;
            results[player][`set${set}`][statKey] = count;

            results[player]["whole"][statKey] =
              (results[player]["whole"][statKey] || 0) + count;
          })
        );
      });
    });
  });

  try {
    await Promise.all(queryPromises);

    // Calculate additional stats such as first serve percentage for each player.
    players.forEach((player) => {
      // Loop through sets for each player
      const sets = ["whole", "set1", "set2", "set3"];

      sets.forEach((set) => {
        const first = results[player][set].firstServeCount || 0;
        const second = results[player][set].secondServeCount || 0;
        const doubleFaults = results[player][set].doubleFaults || 0;
        results[player][set].firstServePercentage =
          Math.round((first / (first + second + doubleFaults)) * 100) || 0;

        // First Serve won %
        const firstServeWon = results[player][set].firstServeWonCount || 0;
        results[player][set].firstServeWonPercentage =
          Math.round((firstServeWon / first) * 100) || 0;

        // Second Serve won %
        const secondServeWon = results[player][set].secondServeWonCount || 0;
        results[player][set].secondServeWonPercentage =
          Math.round((secondServeWon / second) * 100) || 0;

        // Return %
        const totalReturnPointsWon =
          results[player][set].totalReturnPointsWon || 0;
        const totalReturnsIn = results[player][set].totalReturnsIn || 0;
        const totalReturns = results[player][set].totalReturns || 0;
        results[player][set].returnPointsWonPercentage =
          Math.round((totalReturnPointsWon / totalReturns) * 100) || 0;
        results[player][set].returnsInPercentage =
          Math.round((totalReturnsIn / totalReturns) * 100) || 0;

        // Points Won %
        const totalPointsWon = results[player][set].totalPointsWon || 0;
        const totalPoints = results[player][set].totalPoints || 0;
        results[player][set].totalPointWonPercentage =
          Math.round((totalPointsWon / totalPoints) * 100) || 0;
      });
    });

    // Add match summary
    await Promise.all(
      players.map((player) =>
        addSummaryStats(db, results[player], currentMatchId, player)
      )
    );

    console.log("Match has been successfully stored. Results stored:", results);
    // return results;
  } catch (e) {
    console.error("Error getting documents or storing data: ", e);
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
    const documents = [];

    querySnapshot.forEach((doc) => {
      documents.push({
        id: doc.id,
        ...doc.data(),
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
      "Set",
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
      finalScore: data.finalScore,
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

export async function getPlayerList() {
  const playersRef = collection(db, "players");
  const q = query(playersRef, orderBy("playerName", "asc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      playerName: data.playerName,
      label: data.playerName,
    };
  });
}

export async function checkIfPlayerExists(playerName) {
  const playerExists = await docWithFieldExists(
    db,
    "players",
    "playerName",
    playerName
  );
  return playerExists;
}

export async function addPlayerToPlayersCollection(playerName) {
  try {
    const docRef = await addDoc(collection(db, "players"), {
      playerName,
    });

    console.log("Added Player to Player Collection with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
}

export async function addFinalScoreToMatch(object) {
  const matchRef = doc(db, "matches");
  await updateDoc(matchRef, {
    matchScore: object.matchScore,
  });
  console.log("Match score updated successfully");
}

export async function fetchWinnersOfPoints(matchId) {
  const pointsRef = collection(db, "points");
  const q = query(pointsRef, where("Match ID", "==", matchId));
  const snapshot = await getDocs(q);

  // Sort by Point Number
  const sorted = snapshot.docs.sort((a, b) => {
    return (a.data()["Point Number"] ?? 0) - (b.data()["Point Number"] ?? 0);
  });

  const pointWinners = sorted.map((doc) => doc.data()["Point Winner"]);
  console.log("Point Winner", pointWinners);

  return pointWinners;
}

export async function fetchScoreChangePoints(matchId) {
  const pointsRef = collection(db, "points");
  const q = query(pointsRef, where("Match ID", "==", matchId));
  const snapshot = await getDocs(q);

  const sortedDocs = snapshot.docs.sort((a, b) => {
    return (a.data()["Point Number"] ?? 0) - (b.data()["Point Number"] ?? 0);
  });

  const seenScores = new Set();
  const scoreChangePoints = [];

  for (const doc of sortedDocs) {
    const data = doc.data();
    const pointNumber = data["Point Number"];
    const matchScore = data["Match Score"]?.trim();

    // Skip if score is already recorded
    if (matchScore && !seenScores.has(matchScore)) {
      scoreChangePoints.push({ pointNumber, matchScore });
      seenScores.add(matchScore);
    }
  }

  console.log("Score Change Points:", scoreChangePoints);
  return scoreChangePoints;
}

export async function testAuth() {
  console.log("Testing auth...");
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not signed in");
  } else {
    console.log("User is signed in:", user.uid);
  }

  const matchesRef = collection(db, "matches");
  const q = query(
    matchesRef,
    where("OwnerID", "==", user.uid),
  );

  console.log("Query successful:", q);
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      finalScore: data.finalScore,
      player1FirstName: data.player1FirstName,
      player1LastName: data.player1LastName,
      player2FirstName: data.player2FirstName,
      player2LastName: data.player2LastName,
      label: `${data.player1FirstName} vs ${data.player2FirstName}${
                data.Date && data.Date.toDate
                  ? " — " +
                    data.Date.toDate().toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })
                  : ""
              }`,
    };    
  });
  // try {
  //   const snapshot = await getDocs(q);

  //   snapshot.docs.forEach((doc) => {
  //     const data = doc.data();
  //     console.log({
  //       id: doc.id,
  //       finalScore: data.finalScore,
  //       player1FirstName: data.player1FirstName,
  //       player1LastName: data.player1LastName,
  //       player2FirstName: data.player2FirstName,
  //       player2LastName: data.player2LastName,
  //       label: `${data.player1FirstName} vs ${data.player2FirstName}${
  //         data.Date && data.Date.toDate
  //           ? " — " +
  //             data.Date.toDate().toLocaleDateString("en-US", {
  //               weekday: "short",
  //               month: "short",
  //               day: "numeric",
  //               hour: "numeric",
  //               minute: "2-digit",
  //             })
  //           : ""
  //       }`,
  //     });
  //   });
  // } catch (error) {
  //   console.error("Error fetching documents:", error);
  // }
}
