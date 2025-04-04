// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBenFq7Yci7ytDXW1OOmiEm3ggixNBNLpE",
  authDomain: "dreamfoodx.firebaseapp.com",
  projectId: "dreamfoodx",
  storageBucket: "dreamfoodx.firebasestorage.app",
  messagingSenderId: "492605294142",
  appId: "1:492605294142:web:0964654d4382c7aa75336f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
