<script type="module">
...
</script>
 import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "cointube-1411.firebaseapp.com",
  databaseURL: "https://cointube-1411-default-rtdb.firebaseio.com",
  projectId: "cointube-1411",
  storageBucket: "cointube-1411.firebasestorage.app",
  messagingSenderId: "539469111589",
  appId: "1:539469111589:web:88d18bf7eeda371f27bacc"
};

const app = initializeApp(firebaseConfig);

export { app };
