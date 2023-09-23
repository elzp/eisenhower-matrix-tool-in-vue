// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGRSzY6QNI4GqbHE9_EUJAWPmE1NJ52c0",
  authDomain: "matrix-of-tasks.firebaseapp.com",
  projectId: "matrix-of-tasks",
  storageBucket: "matrix-of-tasks.appspot.com",
  messagingSenderId: "153985622363",
  appId: "1:153985622363:web:282b681edfbdaa83133a7e",
  measurementId: "G-X4WZ22WEP8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
getAnalytics(app);
