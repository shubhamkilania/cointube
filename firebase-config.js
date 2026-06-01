import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";

import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "PASTE_YOUR_REAL_API_KEY_HERE",
  authDomain: "cointube-1411.firebaseapp.com",
  projectId: "cointube-1411",
  storageBucket: "cointube-1411.firebasestorage.app",
  messagingSenderId: "539469111589",
  appId: "1:539469111589:web:88d18bf7eeda371f27bacc"
};

// INIT APP
const app = initializeApp(firebaseConfig);

// SERVICES
const auth = getAuth(app);
const db = getFirestore(app);

// EXPORTS
export {
  auth,
  db,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  doc,
  setDoc,
  getDoc
};
  getDoc
};
