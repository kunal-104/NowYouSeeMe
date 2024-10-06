// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore functions
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0dBVaSH-tdnhm2Rro8Fry2ejt6KQcjqc",
  authDomain: "nowyouseeme-ead00.firebaseapp.com",
  projectId: "nowyouseeme-ead00",
  storageBucket: "nowyouseeme-ead00.appspot.com",
  messagingSenderId: "869351343949",
  appId: "1:869351343949:web:f940d0aa3ddf85ae879904"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);


export { db }; // Export the db for use in other files