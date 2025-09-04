// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAYbHeM6nDZgIdYBbxtxQvx4S0npE8lRwk",
  authDomain: "requered.firebaseapp.com",
  databaseURL: "https://requered-default-rtdb.firebaseio.com",
  projectId: "requered",
  storageBucket: "requered.firebasestorage.app",
  messagingSenderId: "190052300320",
  appId: "1:190052300320:web:c81b8280922d86e9312e45",
  measurementId: "G-8HMEKXL9G3"
};

// Firebase'ni ishga tushirish
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, set, get, child };
