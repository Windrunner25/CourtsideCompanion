import { collection, addDoc, updateDoc, doc, arrayUnion} from "firebase/firestore";
import db from "./init.js"; // Ensure your Firebase is correctly initialized

// export async function addUser(data) {
//   try {
//     const docRef = await addDoc(collection(db, "players"), data);
//     console.log("Document written with ID: ", docRef.id);
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// }

export async function addPointToFirebase(currentPoint, matchID) {
  try {
    const currentMatchRef = doc(db, "match", matchID);

    const docRef = await updateDoc(currentMatchRef, {
      points: arrayUnion(...currentPoint),
      timestamp: new Date(),
    });
    console.log("Document written with ID: ", currentMatchRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function addMatch(matchDetailsObj) {
  try {
    // Destructure the matchDetailsObj
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
