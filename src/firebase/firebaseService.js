import { collection, addDoc, updateDoc, doc, arrayUnion, onSnapshot } from "firebase/firestore";
import db from "./init.js"; // Ensure your Firebase is correctly initialized

// export async function addUser(data) {
//   try {
//     const docRef = await addDoc(collection(db, "players"), data);
//     console.log("Document written with ID: ", docRef.id);
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// }

export async function addGameToFirebase(gamePoints, matchID) {
  try {
    const currentMatchRef = doc(db, "match", matchID);

    const docRef = await updateDoc(currentMatchRef, {
      points: arrayUnion(...gamePoints),
      timestamp: new Date(),
    });
    console.log("Document written with ID: ", currentMatchRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

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

