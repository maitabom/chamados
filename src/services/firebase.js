// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEiy0bHFE3xSduDLYJMSgvJsIWY-CVjEU",
  authDomain: "react-ticket-d06fb.firebaseapp.com",
  projectId: "react-ticket-d06fb",
  storageBucket: "react-ticket-d06fb.appspot.com",
  messagingSenderId: "916963153999",
  appId: "1:916963153999:web:ae508bed0c49e45fbd323a",
  measurementId: "G-CN5DFX555F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getFirestore(app);
const storage = getStorage(app);

export { auth, database, storage, analytics };
