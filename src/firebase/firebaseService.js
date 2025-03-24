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
} from "firebase/firestore";
import db from "./init.js"; // Ensure your Firebase is correctly initialized

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

console.log("listening");

export async function getUnforcedErrors(currentMatchId, player2) {
  const pointsCollection = collection(db, "points");
  const q = query(
    pointsCollection,
    where("matchId", "==", currentMatchId),
    where("Point End", "==", "Unforced Error"),
    where("Point Winner", "==", player2)
  );
  try {
    const querySnapshot = await getDocs(q);
    const count = querySnapshot.size;
    console.log("Finley hit ", count, "unforced errors");
    return count;
  } catch (e) {
    console.error("Error getting document: ", e);
    return 0;
  }
}

export async function getForcedErrors(currentMatchId, player2) {
  const pointsCollection = collection(db, "points");
  const q = query(
    pointsCollection,
    where("matchId", "==", currentMatchId),
    where("Point End", "==", "Forced Error"),
    where("Point Winner", "==", player2)
  );
  try {
    const querySnapshot = await getDocs(q);
    const count = querySnapshot.size;
    console.log("Finley hit ", count, "forced errors");
    return count;
  } catch (e) {
    console.error("Error getting document: ", e);
    return 0;
  }
}

export async function getWinners(currentMatchId, player1) {
  const pointsCollection = collection(db, "points");
  const q = query(
    pointsCollection,
    where("matchId", "==", currentMatchId),
    where("Point End", "==", "Winner"),
    where("Point Winner", "==", player1)
  );
  try {
    const querySnapshot = await getDocs(q);
    const count = querySnapshot.size;
    console.log("Finley hit ", count, "winners");
    return count;
  } catch (e) {
    console.error("Error getting document: ", e);
    return 0;
  }
}
