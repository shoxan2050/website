// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { 
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { 
  getDatabase,
  ref,
  set,
  get,
  child
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAYbHeM6nDZgIdYBbxtxQvx4S0npE8lRwk",
  authDomain: "requered.firebaseapp.com",
  databaseURL: "https://requered-default-rtdb.firebaseio.com",
  projectId: "requered",
  storageBucket: "requered.firebasestorage.app",
  messagingSenderId: "190052300320",
  appId: "1:190052300320:web:c81b8280922d86e9312e45"
};

// Firebase start
const app = initializeApp(firebaseConfig);

// AUTH + DATABASE
const auth = getAuth(app);
const database = getDatabase(app);

// EXPORT
export {
  auth,
  onAuthStateChanged,
  database,
  ref,
  set,
  get,
  child
};
