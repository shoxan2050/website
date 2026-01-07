// firebase.js  (BROWSER UCHUN TO‘G‘RI VARIANT)

// Firebase SDK (CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCy8SLCFTgc_mB8B4JJqrUGsX5Lr2NUuPo",
  authDomain: "space0411-a00b1.firebaseapp.com",
  projectId: "space0411-a00b1",
  storageBucket: "space0411-a00b1.firebasestorage.app",
  messagingSenderId: "1018550863390",
  appId: "1:1018550863390:web:d023ce44fbe8ce7171d00f"
};

// Initialize
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// EXPORT (MUHIM!)
export { auth };
