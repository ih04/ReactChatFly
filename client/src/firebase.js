// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHrajjlaXgJfuBR6LbxruspnUWyW71Ngc",
  authDomain: "chatr-b037d.firebaseapp.com",
  projectId: "chatr-b037d",
  storageBucket: "chatr-b037d.appspot.com",
  // storageBucket: "chatr-b037d.firebasestorage.app",
  messagingSenderId: "825544780245",
  appId: "1:825544780245:web:e7544d54f35b519d2a355c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export {db,app,auth};