// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth   } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyAUy7hFcNi-hCzqK_5nq7in_FRisr8mi_c",
  authDomain: "streact2025.firebaseapp.com",
  projectId: "streact2025",
  storageBucket: "streact2025.firebasestorage.app",
  messagingSenderId: "9356589485",
  appId: "1:9356589485:web:90249b80e279669ebb4924"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);