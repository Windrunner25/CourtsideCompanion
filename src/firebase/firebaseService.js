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
} from "firebase/firestore";
import db from "./init.js";

// export async function addGameToFirebase(gamePoints, matchID) {
//   try {
//     const currentMatchRef = doc(db, "match", matchID);

//     const docRef = await updateDoc(currentMatchRef, {
//       points: arrayUnion(...gamePoints),
//       timestamp: new Date(),
//     });
//     console.log("Document written with ID: ", currentMatchRef.id);
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// }

export async function addPointToFirebase(pointData, matchId) {
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
      date,
    } = matchDetailsObj;

    const docRef = await addDoc(collection(db, "matches"), {
      player1FirstName,
      player1LastName,
      player1Team,
      player2FirstName,
      player2LastName,
      player2Team,
      IndoorsOutdoors,
      date,
    });

    console.log("Match logged with:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
}

// const matchesCollection = collection(db, "matches");

// export function listenForMatchUpdates(callback) {
//   return onSnapshot(matchesCollection, (snapshot) => {
//     snapshot.docChanges().forEach((change) => {
//       if (change.type === "added") {
//         console.log("New match added: ", change.doc.data());
//         callback(change.doc.data()); // Pass the new match data to a callback function
//       }
//     });
//   });
// }


// Attempt 1 at a summary statistics function
// export async function getMatchSummary(currentMatchId, player1, player2) {
//   const pointsCollection = collection(db, "points");
//   console.log(
//     "Searching for points won by",
//     player1,
//     "in match",
//     currentMatchId,
//     "against",
//     player2
//   );

//   const unforcedErrorQuery = query(
//     pointsCollection,
//     where("Match ID", "==", currentMatchId),
//     where("Point End", "==", "Unforced Error"),
//     where("Point Winner", "==", player2)
//   );

//   const forcedErrorQuery = query(
//     pointsCollection,
//     where("Match ID", "==", currentMatchId),
//     where("Point End", "==", "Forced Error"),
//     where("Point Winner", "==", player2)
//   );

//   const winnerQuery = query(
//     pointsCollection,
//     where("Match ID", "==", currentMatchId),
//     where("Point End", "==", "Winner"),
//     where("Point Winner", "==", player1)
//   );

//   const aceQuery = query(
//     pointsCollection,
//     where("Match ID", "==", currentMatchId),
//     where("Serve", "==", "Ace"),
//     where("Point Winner", "==", player1)
//   );

//   const doubleFaultsQuery = query(
//     pointsCollection,
//     where("Match ID", "==", currentMatchId),
//     where("Serve", "==", "Double Fault"),
//     where("Point Winner", "==", player2)
//   );

//   const firstServeCountQuery = query(
//     pointsCollection,
//     where("Match ID", "==", currentMatchId),
//     where("Serve", "==", "First Serve"),
//     where("Server", "==", player1)
//   );

//   const secondServeCountQuery = query(
//     pointsCollection,
//     where("Match ID", "==", currentMatchId),
//     where("Serve", "==", "Second Serve"),
//     where("Server", "==", player1)
//   );

//   const deucePointsQuery = query(
//     pointsCollection,
//     where("Match ID", "==", currentMatchId),
//     where("Game Score", "==", "40-40")
//   );

//   const deucePointsWonQuery = query(
//     pointsCollection,
//     where("Match ID", "==", currentMatchId),
//     where("Game Score", "==", "40-40"),
//     where("Point Winner", "==", player1)
//   );

//   try {
//     const [
//       unforcedErrorSnapshot,
//       forcedErrorSnapshot,
//       winnerSnapshot,
//       aceSnapshot,
//       doubleFaultsSnapshot,
//       firstServeCountSnapshot,
//       secondServeCountSnapshot,
//       deucePointsSnapshot,
//       deucePointsWonSnapshot,
//     ] = await Promise.all([
//       getDocs(unforcedErrorQuery),
//       getDocs(forcedErrorQuery),
//       getDocs(winnerQuery),
//       getDocs(aceQuery),
//       getDocs(doubleFaultsQuery),
//       getDocs(firstServeCountQuery),
//       getDocs(secondServeCountQuery),
//       getDocs(deucePointsQuery),
//       getDocs(deucePointsWonQuery),
//     ]);

//     const unforcedErrors = unforcedErrorSnapshot.size;
//     const forcedErrors = forcedErrorSnapshot.size;
//     const winners = winnerSnapshot.size;
//     const aces = aceSnapshot.size;
//     const doubleFaults = doubleFaultsSnapshot.size;
//     const firstServeCount = firstServeCountSnapshot.size;
//     const secondServeCount = secondServeCountSnapshot.size;
//     const deucePoints = deucePointsSnapshot.size;
//     const deucePointsWon = deucePointsWonSnapshot.size;
//     const firstServePercentage =
//       (firstServeCount / (firstServeCount + secondServeCount)) * 100;

//     console.log(player1, " hit ", unforcedErrors, "unforced errors");
//     console.log(player1, " hit ", forcedErrors, "forced errors");
//     console.log(player1, " hit ", winners, "winners");
//     console.log(player1, " hit ", doubleFaults, "double faults");
//     console.log(player1, " hit ", aces, "aces");
//     console.log(player1, "hit", firstServeCount, "first serves");
//     console.log(player1, "hit", secondServeCount, "second serves");
//     console.log(
//       player1,
//       " had a first serve percentage of ",
//       firstServePercentage
//     );
//     console.log(player1, " played ", deucePoints, " deuce points");
//     console.log(player1, " won ", deucePointsWon, " deuce points");

//     return {
//       unforcedErrors,
//       forcedErrors,
//       winners,
//       aces,
//       doubleFaults,
//       firstServePercentage,
//       deucePoints,
//       deucePointsWon,
//     };
//   } catch (e) {
//     console.error("Error getting documents: ", e);
//     return {
//       unforcedErrors: 0,
//       forcedErrors: 0,
//       winners: 0,
//       aces: 0,
//       doubleFaults: 0,
//       firstServePercentage: 0,
//       deucePoints: 0,
//       deucePointsWon: 0,
//     };
//   }
// }

// Attempt 2 at a summary statistics function
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
      where("Point Winner", "==", player === player1 ? player2 : player1)
    ],
    forcedErrors: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Point End", "==", "Forced Error"),
      where("Point Winner", "==", player === player1 ? player2 : player1)
    ],
    winners: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Point End", "==", "Winner"),
      // Winner is credited to the player who made the shot.
      where("Point Winner", "==", player)
    ],
    aces: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Serve", "==", "Ace"),
      where("Point Winner", "==", player)
    ],
    doubleFaults: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Serve", "==", "Double Fault"),
      // Double fault is an error, so the point is won by the opponent.
      where("Point Winner", "==", player === player1 ? player2 : player1)
    ],
    firstServeCount: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Serve", "==", "First Serve"),
      where("Server", "==", player)
    ],
    secondServeCount: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Serve", "==", "Second Serve"),
      where("Server", "==", player)
    ],
    // Deuce points are common to both players; however, points won at deuce are player-specific.
    deucePoints: (_) => [
      where("Match ID", "==", currentMatchId),
      where("Game Score", "==", "40-40")
    ],
    deucePointsWon: (player) => [
      where("Match ID", "==", currentMatchId),
      where("Game Score", "==", "40-40"),
      where("Point Winner", "==", player)
    ],
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
      results[player].firstServePercentage =
        (first / (first + second)) * 100 || 0;
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
