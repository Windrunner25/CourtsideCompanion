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
      matchId: matchId,
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

const matchesCollection = collection(db, "matches");

export function listenForMatchUpdates(callback) {
  return onSnapshot(matchesCollection, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        console.log("New match added: ", change.doc.data());
        callback(change.doc.data()); // Pass the new match data to a callback function
      }
    });
  });
}

export async function getMatchSummary(currentMatchId, player1, player2) {
  const pointsCollection = collection(db, "points");

  const unforcedErrorQuery = query(
    pointsCollection,
    where("matchId", "==", currentMatchId),
    where("Point End", "==", "Unforced Error"),
    where("Point Winner", "==", player2)
  );

  const forcedErrorQuery = query(
    pointsCollection,
    where("matchId", "==", currentMatchId),
    where("Point End", "==", "Forced Error"),
    where("Point Winner", "==", player2)
  );

  const winnerQuery = query(
    pointsCollection,
    where("matchId", "==", currentMatchId),
    where("Point End", "==", "Winner"),
    where("Point Winner", "==", player1)
  );

  const aceQuery = query(
    pointsCollection,
    where("matchId", "==", currentMatchId),
    where("Point End", "==", "Ace"),
    where("Point Winner", "==", player1)
  );

  try {
    const [
      unforcedErrorSnapshot,
      forcedErrorSnapshot,
      winnerSnapshot,
      aceSnapshot,
    ] = await Promise.all([
      getDocs(unforcedErrorQuery),
      getDocs(forcedErrorQuery),
      getDocs(winnerQuery),
      getDocs(aceQuery),
    ]);

    const unforcedErrors = unforcedErrorSnapshot.size;
    const forcedErrors = forcedErrorSnapshot.size;
    const winners = winnerSnapshot.size;
    const aces = aceSnapshot.size;

    console.log("Finley hit ", unforcedErrors, "unforced errors");
    console.log("Finley hit ", forcedErrors, "forced errors");
    console.log("Finley hit ", winners, "winners");
    console.log("Finley hit ", aces, "aces");

    return { unforcedErrors, forcedErrors, winners, aces };
  } catch (e) {
    console.error("Error getting documents: ", e);
    return { unforcedErrors: 0, forcedErrors: 0, winners: 0, aces: 0 };
  }
}

export async function getPointsLost(currentMatchId, player2) {
  const pointsCollection = collection(db, "points");

  const pointsQuery = query(
    pointsCollection,
    where("matchId", "==", currentMatchId),
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
    console.log(documents);

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
      "matchId",
      "id",
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

// export async function getForcedErrors(currentMatchId, player2) {
//   const pointsCollection = collection(db, "points");
//   const q = query(
//     pointsCollection,
//     where("matchId", "==", currentMatchId),
//     where("Point End", "==", "Forced Error"),
//     where("Point Winner", "==", player2)
//   );
//   try {
//     const querySnapshot = await getDocs(q);
//     const count = querySnapshot.size;
//     console.log("Finley hit ", count, "forced errors");
//     return count;
//   } catch (e) {
//     console.error("Error getting document: ", e);
//     return 0;
//   }
// }

// export async function getWinners(currentMatchId, player1) {
//   const pointsCollection = collection(db, "points");
//   const q = query(
//     pointsCollection,
//     where("matchId", "==", currentMatchId),
//     where("Point End", "==", "Winner"),
//     where("Point Winner", "==", player1)
//   );
//   try {
//     const querySnapshot = await getDocs(q);
//     const count = querySnapshot.size;
//     console.log("Finley hit ", count, "winners");
//     return count;
//   } catch (e) {
//     console.error("Error getting document: ", e);
//     return 0;
//   }
// }
