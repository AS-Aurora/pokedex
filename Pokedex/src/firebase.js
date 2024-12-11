import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGhI-TMFhnPUT69VdGhNepd1oYMO2EVi8",
  authDomain: "pokelist-45fe6.firebaseapp.com",
  projectId: "pokelist-45fe6",
  storageBucket: "pokelist-45fe6.firebasestorage.app",
  messagingSenderId: "901372678200",
  appId: "1:901372678200:web:bff52b61ec9827164c16cd",
  measurementId: "G-Q1MXMPFKVZ",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, doc, setDoc, getDoc, updateDoc, auth, provider, signInWithPopup, signOut };
