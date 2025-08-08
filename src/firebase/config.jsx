// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth   } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKdPGU6Pn-Z3li5rrGWCHNkjMUY3b8GRA",
  authDomain: "react-lvl2-f25c8.firebaseapp.com",
  projectId: "react-lvl2-f25c8", 
  storageBucket: "react-lvl2-f25c8.firebasestorage.app",
  messagingSenderId: "122818998458",
  appId: "1:122818998458:web:f7fb45fd1f23b60080d283"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);