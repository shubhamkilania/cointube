import {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "./firebase-config.js";

// 🔵 Setup Recaptcha properly
window.onload = () => {
  window.recaptchaVerifier = new RecaptchaVerifier(
    "recaptcha-container",
    {
      size: "invisible"
    },
    auth
  );
};

// 📲 SEND OTP
const sendOtpBtn = document.getElementById("sendOtpBtn");

if (sendOtpBtn) {
  sendOtpBtn.addEventListener("click", async () => {
    const phoneNumber =
      document.getElementById("phoneNumber").value;

    if (!phoneNumber) {
      alert("Enter phone number");
      return;
    }

    try {
      const appVerifier = window.recaptchaVerifier;

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );

      window.confirmationResult = confirmationResult;

      alert("OTP Sent Successfully");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  });
}

// ✅ VERIFY OTP (THIS WAS MISSING)
const verifyBtn = document.getElementById("verifyBtn");

if (verifyBtn) {
  verifyBtn.addEventListener("click", async () => {
    const otp = document.getElementById("otpCode").value;

    if (!otp) {
      alert("Enter OTP");
      return;
    }

    try {
      const result = await window.confirmationResult.confirm(otp);

      alert("Registration Successful!");
      console.log("User:", result.user);
    } catch (error) {
      console.error(error);
      alert("Wrong OTP");
    }
  });
}

}
