// import {
//   collection,
//   addDoc,
//   serverTimestamp
// } from "firebase/firestore";

// import db from "./init";

// const collectionRef = collection(db, "players");

// const addPlayer = async (name) => {
//   await addDoc(collectionRef, {
//     name,
//     createdAt: serverTimestamp(),
//   });
// };

// export { addPlayer };
//

import { collection, addDoc } from "firebase/firestore";
import db from "./init.js"; // Ensure your Firebase is correctly initialized

export async function addUser(data) {
  try {
    const docRef = await addDoc(collection(db, "players"), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function addGameToFirebase(gamePoints) {
  try {
    const docRef = await addDoc(collection(db, "matches"), {
      points: gamePoints,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

