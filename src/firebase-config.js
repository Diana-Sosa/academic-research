// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsWlYFzFqHU4mm1MIeIrJdyUvNESJ7TtA",
  authDomain: "busquedas-a.firebaseapp.com",
  projectId: "busquedas-a",
  storageBucket: "busquedas-a.firebasestorage.app",
  messagingSenderId: "654303871349",
  appId: "1:654303871349:web:cf9dacaa8807ba153b133c",
  measurementId: "G-480FWJ96QE"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
