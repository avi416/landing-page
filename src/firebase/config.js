import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";



// Firebase Config שלך (מתוקן)
const firebaseConfig = {
  apiKey: "AIzaSyAYhgyJW4JGakTqrtQ-bC0rSgO0AwlL1Q4",
  authDomain: "osrhat-43b99.firebaseapp.com",
  projectId: "osrhat-43b99",
  storageBucket: "osrhat-43b99.appspot.com",
  messagingSenderId: "340141482942",
  appId: "1:340141482942:web:6f2f2a345b13586f910fef",
  measurementId: "G-7YYDFGPY3D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// הפעלת השירותים שאתה צריך:
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// לא צריך Analytics ב-VITE כי הוא נתקע עם SSR.
