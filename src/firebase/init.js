// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBl31EdhrFmMUucsWOcQnwXvXpM2Fu9JX4",
  authDomain: "tennisense-test.firebaseapp.com",
  projectId: "tennisense-test",
  storageBucket: "tennisense-test.firebasestorage.app",
  messagingSenderId: "1073495077195",
  appId: "1:1073495077195:web:427aad4cf6b6eadde6b8ce",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();


const loginEmailPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return true;
  } catch (error) {
    console.error("Error signing in with email and password:", error);
    throw error;
  }
};

export { auth, loginEmailPassword, provider, signInWithPopup }; 
export default db;