import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAxUg2SvTSXMacfSwNnBfQPRRyq1nTvM6c",
  authDomain: "cointube-1411.firebaseapp.com",
  databaseURL: "https://cointube-1411-default-rtdb.firebaseio.com",
  projectId: "cointube-1411",
  storageBucket: "cointube-1411.firebasestorage.app",
  messagingSenderId: "539469111589",
  appId: "1:539469111589:web:88d18bf7eeda371f27bacc",
  measurementId: "G-DLW9DDEKM0"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export {
  app,
  auth,
  db,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  doc,
  setDoc,
  getDoc
};
