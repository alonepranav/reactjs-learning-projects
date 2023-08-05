import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDlTKgVMLsmFpsTOvCltrOJzzNF6IXH4rU",
  authDomain: "pranav-react-firebase-crud-app.firebaseapp.com",
  projectId: "pranav-react-firebase-crud-app",
  storageBucket: "pranav-react-firebase-crud-app.appspot.com",
  messagingSenderId: "424013607712",
  appId: "1:424013607712:web:713547a0d8e217ac5c9d45",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
