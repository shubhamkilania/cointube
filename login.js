import { db, doc, getDoc } from "./firebase-config.js";

document.querySelector(".login-btn").addEventListener("click", async () => {

  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value;

  if (!phone || !password) {
    alert("Enter phone and password");
    return;
  }

  try {

    const ref = doc(db, "users", phone);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      alert("User not found");
      return;
    }

    const data = snap.data();

    if (data.password === password) {

      alert("Login successful 🎉");

      localStorage.setItem("userLoggedIn", "true");

      window.location.href = "home.html";

    } else {
      alert("Wrong password ❌");
    }

  } catch (err) {
    console.error(err);
    alert(err.message);
  }

});
