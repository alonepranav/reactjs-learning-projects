import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBStduAYIQefQdT2F9O1DuMHnaepi2wnmU",
  authDomain: "react-contact-book-app.firebaseapp.com",
  projectId: "react-contact-book-app",
  storageBucket: "react-contact-book-app.appspot.com",
  messagingSenderId: "126586211505",
  appId: "1:126586211505:web:e6e174957cad5afcaee690",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
