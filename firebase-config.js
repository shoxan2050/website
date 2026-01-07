// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { 
  getAuth, 
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

import {
  getDatabase,
  ref,
  set,
  get,
  child
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

const firebaseConfig = {
  // BU YERGA FIREBASE CONSOLEDAN KO‘CHIRILGAN CONFIG NI QO‘YING!!!
  apiKey: "SIZNING_TO‘G‘RI_API_KEY",
  authDomain: "sizningloyihangiz.firebaseapp.com",
  databaseURL: "https://sizningloyihangiz-default-rtdb.firebaseio.com",
  projectId: "sizningloyihangiz",
  storageBucket: "sizningloyihangiz.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export {
  auth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  database,
  ref,
  set,
  get,
  child
};
