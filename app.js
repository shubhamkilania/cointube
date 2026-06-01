import {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "./firebase-config.js";

let confirmationResult;

// ✅ INIT RECAPTCHA PROPERLY
window.onload = async () => {
  window.recaptchaVerifier = new RecaptchaVerifier(
    "recaptcha-container",
    {
      size: "invisible"
    },
    auth
  );

  await window.recaptchaVerifier.render();
};

// 📢 STATUS
function status(msg, color = "#fff") {
  const el = document.getElementById("statusText");
  if (el) {
    el.innerText = msg;
    el.style.color = color;
  }
}

// 📲 SEND OTP
document.getElementById("sendOtpBtn").addEventListener("click", async () => {
  const phone = document.getElementById("phoneNumber").value;

  if (!phone) {
    status("Enter phone number", "red");
    return;
  }

  try {
    status("Sending OTP...", "#00b7ff");

    const appVerifier = window.recaptchaVerifier;

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

// ✅ VERIFY OTP
document.getElementById("verifyBtn").addEventListener("click", async () => {
  const otp = document.getElementById("otpCode").value;

  if (!otp) {
    status("Enter OTP", "red");
    return;
  }

  try {
    const result = await window.confirmationResult.confirm(otp);

    status("Login Successful 🎉", "#00ff99");

    console.log("User:", result.user);

  } catch (err) {
    console.error(err);
    status("Wrong OTP ❌", "red");
  }
});
