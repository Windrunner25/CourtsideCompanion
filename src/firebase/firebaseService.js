import { collection, addDoc } from "firebase/firestore";
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
    const matchRef =  doc(collection(db, "matches", matchID), {
      points: gamePoints,
    });
    const docRef = await addDoc(collection(matchRef, "games"), {
      points: gamePoints,
      timestamp: new Date(), // Optional: add timestamp for ordering
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function addMatch(matchDetailsObj) {
  try {
    // Destructure the matchDetailsObj
    const { player1FirstName, player1LastName, player1Team, player2FirstName, player2LastName, player2Team, IndoorsOutdoors, date } = matchDetailsObj;

    const docRef = await addDoc(collection(db, "match"), {
      player1FirstName,
      player1LastName,
      player1Team, 
      player2FirstName,
      player2LastName,
      player2Team,
      IndoorsOutdoors,
      date,
    });

    console.log("Document written with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
}
