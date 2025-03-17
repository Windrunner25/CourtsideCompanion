// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBl31EdhrFmMUucsWOcQnwXvXpM2Fu9JX4",
  authDomain: "tennisense-test.firebaseapp.com",
  projectId: "tennisense-test",
  storageBucket: "tennisense-test.firebasestorage.app",
  messagingSenderId: "1073495077195",
  appId: "1:1073495077195:web:427aad4cf6b6eadde6b8ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
export default db;

// export async function writeDataToFirestore(data, collectionName) {
//   try {
//     const docRef = await addDoc(collection(db, collectionName), data);
//     console.log("Document written with ID: ", docRef.id);
//     return docRef.id;
//   } catch (e) {
//     console.error("Error adding document: ", e);
//     return null;
//   }
// }


// //This is an example function to demonstrate how to use this.  You would not include
// //this function in your firebaseService.js file unless you want to use it inside
// //firebaseService.js

// export async function writeExampleData(){
//     const newData = {
//         name: "Example Data",
//         value: 123,
//         date: new Date()
//       };
//     return writeDataToFirestore(newData, "yourCollectionName");
// }
