import {
  auth,
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

/* ---------------- RECAPTCHA FIX (IMPORTANT) ---------------- */
function initRecaptcha() {
  if (window.recaptchaVerifier) return;

  window.recaptchaVerifier = new RecaptchaVerifier(
    auth,
    "recaptcha-container",
    {
      size: "invisible",
      callback: () => {
        console.log("reCAPTCHA solved");
      }
    }
  );

  window.recaptchaVerifier.render();
}

/* run after DOM ready */
document.addEventListener("DOMContentLoaded", () => {
  initRecaptcha();
});

/* ---------------- SEND OTP ---------------- */
document.getElementById("sendOtpBtn").addEventListener("click", async () => {
  const phone = document.getElementById("phoneNumber").value.trim();

  if (!phone) {
    status("Enter phone number", "red");
    return;
  }

  try {
    status("Sending OTP...", "#00b7ff");

    if (!window.recaptchaVerifier) {
      status("reCAPTCHA not ready, refresh page", "red");
      return;
    }

    confirmationResult = await signInWithPhoneNumber(
      auth,
      phone,
      window.recaptchaVerifier
    );

    window.confirmationResult = confirmationResult;

    status("OTP sent successfully ✔", "#00ff99");

  } catch (err) {
    console.error(err);
    status(err.message, "red");
  }
});

/* ---------------- VERIFY OTP + REGISTER ---------------- */
document.getElementById("verifyBtn").addEventListener("click", async () => {

  const otp = document.getElementById("otpCode").value;
  const password = document.getElementById("password").value;
  const phone = document.getElementById("phoneNumber").value;
  const fullName = document.getElementById("fullName").value;
  const referral = document.getElementById("referralCode").value;

  if (!otp) {
    status("Enter OTP", "red");
    return;
  }

  if (!password) {
    status("Set password", "red");
    return;
  }

  if (!window.confirmationResult) {
    status("Send OTP first", "red");
    return;
  }

  try {

    // verify OTP
    const result = await window.confirmationResult.confirm(otp);

    const user = result.user;

    status("Saving user...", "#00b7ff");

    // save to Firestore
    await setDoc(doc(db, "users", phone), {
      fullName: fullName,
      phone: phone,
      password: password,
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
