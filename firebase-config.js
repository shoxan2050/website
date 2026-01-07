// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { 
  getAuth, 
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAYbHeM6nDZgIdYBbxtxQvx4S0npE8lRwk",
  authDomain: "requered.firebaseapp.com",
  databaseURL: "https://requered-default-rtdb.firebaseio.com",
  projectId: "requered",
  storageBucket: "requered.appspot.com",
  messagingSenderId: "190052300320",
  appId: "1:190052300320:web:c81b8280922d86e9312e45"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
  auth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
};
