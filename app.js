import {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber
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

/* ---------------- SAFE RECAPTCHA INIT ---------------- */
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

/* wait until DOM fully ready */
document.addEventListener("DOMContentLoaded", () => {
  initRecaptcha();
});

/* ---------------- SEND OTP ---------------- */
document.getElementById("sendOtpBtn").addEventListener("click", async () => {
  const phone = document.getElementById("phoneNumber").value;

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

/* ---------------- VERIFY OTP ---------------- */
document.getElementById("verifyBtn").addEventListener("click", async () => {
  const otp = document.getElementById("otpCode").value;

  if (!otp) {
    status("Enter OTP", "red");
    return;
  }

  if (!window.confirmationResult) {
    status("Send OTP first", "red");
    return;
  }

  try {
    const result = await window.confirmationResult.confirm(otp);

    status("Login Successful 🎉", "#00ff99");

    localStorage.setItem("userLoggedIn", "true");

    window.location.href = "home.html";

  } catch (err) {
    console.error(err);
    status("Wrong OTP ❌", "red");
  }
});
