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

/* ---------------- INIT RECAPTCHA (FIXED SAFE VERSION) ---------------- */
function initRecaptcha() {
  if (window.recaptchaVerifier) return;

  window.recaptchaVerifier = new RecaptchaVerifier(
    "recaptcha-container",
    {
      size: "invisible",
      callback: () => {
        console.log("reCAPTCHA solved");
      }
    },
    auth
  );

  window.recaptchaVerifier.render();
}

/* run after page load */
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

    const appVerifier = window.recaptchaVerifier;

    if (!appVerifier) {
      status("reCAPTCHA not ready, refresh page", "red");
      return;
    }

    confirmationResult = await signInWithPhoneNumber(
      auth,
      phone,
      appVerifier
    );

    window.confirmationResult = confirmationResult;

    status("OTP sent successfully ✔", "#00ff99");

  } catch (err) {
    console.error(err);
    status(err.message, "red");
  }
});

/* ---------------- VERIFY OTP + REGISTER USER ---------------- */
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

    // save user in Firestore
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
