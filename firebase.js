// 1. Firebase core
import { initializeApp } from "firebase/app";

// 2. Firebase AUTH
import { getAuth } from "firebase/auth";

// 3. Config (seniki)
const firebaseConfig = {
  apiKey: "AIzaSyCy8SLCFTgc_mB8B4JJqrUGsX5Lr2NUuPo",
  authDomain: "space0411-a00b1.firebaseapp.com",
  projectId: "space0411-a00b1",
  storageBucket: "space0411-a00b1.firebasestorage.app",
  messagingSenderId: "1018550863390",
  appId: "1:1018550863390:web:d023ce44fbe8ce7171d00f",
};

// 4. App
const app = initializeApp(firebaseConfig);

// 5. AUTH ISHGA TUSHDI 🔐
const auth = getAuth(app);
