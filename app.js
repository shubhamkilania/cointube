import {
  auth,
  db,
  createUserWithEmailAndPassword,
  doc,
  setDoc
} from "./firebase-config.js";

function status(msg, color = "#bbb") {
  const el = document.getElementById("statusText");

  if (el) {
    el.innerText = msg;
    el.style.color = color;
  }
}

const registerBtn = document.getElementById("registerBtn");

if (registerBtn) {

  registerBtn.addEventListener("click", async () => {

    const fullName =
      document.getElementById("fullName").value.trim();

    const email =
      document.getElementById("email").value.trim();

    const password =
      document.getElementById("password").value;

    const referral =
      document.getElementById("referralCode").value.trim();

    if (!fullName || !email || !password) {
      status("Fill all required fields", "red");
      return;
    }

    try {

      status("Creating account...", "#00b7ff");

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        fullName,
        email,
        referral: referral || "",
        uid: user.uid,
        coins: 0,
        createdAt: new Date()
      });

      localStorage.setItem(
        "userLoggedIn",
        "true"
      );

      localStorage.setItem(
        "userEmail",
        email
      );

      status(
        "Registration Successful 🎉",
        "#00ff99"
      );

      setTimeout(() => {
        window.location.href = "home.html";
      }, 1000);

    } catch (error) {

      console.error(error);

      status(
        error.message,
        "red"
      );
    }

  });

} else {

  console.error(
    "registerBtn not found in HTML"
  );

}
