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

/* ---------------- INIT RECAPTCHA (FIXED) ---------------- */
function setupRecaptcha() {
  if (window.recaptchaVerifier) return;

  window.recaptchaVerifier = new RecaptchaVerifier(
    "recaptcha-container",
    {
      size: "invisible",
      callback: () => {
        console.log("reCAPTCHA verified");
      }
    },
    auth
  );

  window.recaptchaVerifier.render();
}

/* Run immediately (better than window.onload) */
setupRecaptcha();

/* ---------------- SEND OTP ---------------- */
document.getElementById("sendOtpBtn").addEventListener("click", async () => {
  const phone = document.getElementById("phoneNumber").value;

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

    console.log("User:", result.user);

    // optional login state
    localStorage.setItem("userLoggedIn", "true");

    // redirect
    window.location.href = "home.html";

  } catch (err) {
    console.error(err);
    status("Wrong OTP ❌", "red");
  }
});
