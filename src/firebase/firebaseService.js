import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import db from "../firebase/init"; // Assuming you have a Firebase initialization file

export const addFormData = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "formData"), data);
    return docRef.id; // Return the document ID if needed
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error; // Let the calling component handle the error
  }
};

async function addMatch(player1Id, player2Id, points) {
  try {
    const matchDocRef = await addDoc(collection(db, "matches"), {
      player1Id: player1Id,
      player2Id: player2Id,
      points: points,
      date: serverTimestamp(),
      summary: {
        // Initialize the summary; you'll update this after the match
        player1Score: 0,
        player2Score: 0,
        sets: [],
      },
    });
    console.log("Match added with ID: ", matchDocRef.id);
    //Update the player's matchId array here
    //Remember to handle errors appropriately!
  } catch (error) {
    console.error("Error adding match: ", error);
  }
}

//Example usage
const points = [
  {
    serverId: "player1Id",
    winnerId: "player2Id",
    score: "0-15",
    type: "forehand winner",
  },
  {
    serverId: "player2Id",
    winnerId: "player1Id",
    score: "15-15",
    type: "backhand winner",
  },
];

addMatch("player1Id", "player2Id", points);
