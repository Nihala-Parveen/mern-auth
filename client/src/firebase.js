// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCp1RjCrGbnABkeBw7PFBBnLVD-oRBzL44",
  authDomain: "mern-auth-7b00e.firebaseapp.com",
  projectId: "mern-auth-7b00e",
  storageBucket: "mern-auth-7b00e.appspot.com",
  messagingSenderId: "1071663781538",
  appId: "1:1071663781538:web:6ca9577cc42a5dcddfe9fb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);