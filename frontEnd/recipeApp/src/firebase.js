/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyCCettvk183_Q4WLnYmkmRO0MPGtYN3sI8",
  authDomain: "recipe-app-b5f0d.firebaseapp.com",
  projectId: "recipe-app-b5f0d",
  storageBucket: "recipe-app-b5f0d.appspot.com",
  messagingSenderId: "102485845247",
  appId: "1:102485845247:web:403b905fa9e86d8f3cd8ca",
  measurementId: "G-JH93J80Q7T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async (navigateProp) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log(result);
    navigateProp("/recipePage", { replace: true });
  } catch (err) {
    console.log(err);
  }
};
