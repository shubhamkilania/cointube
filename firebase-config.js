<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
