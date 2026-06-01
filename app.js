import {
  auth,
  db,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  doc,
  setDoc
} from "./firebase-config.js";

let confirmationResult;

/* ---------------- STATUS ---------------- */
function status(msg, color = "#bbb") {
  const el = document.getElementById("statusText");
  if (el) {
    el.innerText = msg;
    el.style.color = color;
  }
}

/* ---------------- RECAPTCHA ---------------- */
function initRecaptcha() {
  if (window.recaptchaVerifier) return;

  window.recaptchaVerifier = new RecaptchaVerifier(
    auth,
    "recaptcha-container",
    {
      size: "invisible"
    }
  );

  window.recaptchaVerifier.render();
}

document.addEventListener("DOMContentLoaded", initRecaptcha);

/* ---------------- SEND OTP ---------------- */
document.getElementById("sendOtpBtn").addEventListener("click", async () => {

  const phone = document.getElementById("phoneNumber").value.trim();

  if (!phone) {
    status("Enter phone number", "red");
    return;
  }

  try {
    status("Sending OTP...", "#00b7ff");

    confirmationResult = await signInWithPhoneNumber(
      auth,
      phone,
      window.recaptchaVerifier
    );

    window.confirmationResult = confirmationResult;

    status("OTP sent ✔", "#00ff99");

  } catch (err) {
    console.error(err);
    status(err.message, "red");
  }

});

/* ---------------- VERIFY + REGISTER ---------------- */
document.getElementById("verifyBtn").addEventListener("click", async () => {

  const otp = document.getElementById("otpCode").value;
  const password = document.getElementById("password").value;
  const phone = document.getElementById("phoneNumber").value;
  const fullName = document.getElementById("fullName").value;
  const referral = document.getElementById("referralCode").value;

  if (!otp || !password) {
    status("Fill all fields", "red");
    return;
  }

  try {

    const result = await window.confirmationResult.confirm(otp);

    const user = result.user;

    await setDoc(doc(db, "users", phone), {
      fullName,
      phone,
      password,
      referral: referral || null,
      uid: user.uid,
      createdAt: new Date()
    });

    status("Registered Successfully 🎉", "#00ff99");

    localStorage.setItem("userLoggedIn", "true");

    setTimeout(() => {
      window.location.href = "home.html";
    }, 1000);

  } catch (err) {
    console.error(err);
    status(err.message, "red");
  }

});
