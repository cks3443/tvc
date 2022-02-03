import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYmKkcMZZgySg12ZsYFQulMqZkPQZfZKs",
  authDomain: "tofelvoca.firebaseapp.com",
  projectId: "tofelvoca",
  storageBucket: "tofelvoca.appspot.com",
  messagingSenderId: "1046939454823",
  appId: "1:1046939454823:web:843b13a834693a8769b3c2",
  measurementId: "G-B0QF39Q3SN",
};

initializeApp(firebaseConfig);

export const db = getFirestore();
