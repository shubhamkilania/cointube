import {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "./firebase-config.js";

let timerInterval;

// 🔵 Recaptcha setup
window.onload = () => {
  window.recaptchaVerifier = new RecaptchaVerifier(
    "recaptcha-container",
    {
      size: "invisible"
    },
    auth
  );
};

// 📢 Status function
function setStatus(msg, color = "#bbb") {
  const el = document.getElementById("statusText");
  if (el) {
    el.innerText = msg;
    el.style.color = color;
  }
}

// ⏳ Timer function (60 sec)
function startTimer(duration = 60) {
  let time = duration;

  const btn = document.getElementById("sendOtpBtn");
  btn.disabled = true;

  timerInterval = setInterval(() => {
    setStatus(`Wait ${time}s before resending OTP`, "#ffcc00");

    time--;

    if (time < 0) {
      clearInterval(timerInterval);
      btn.disabled = false;
      setStatus("You can resend OTP now", "#00ff99");
    }
  }, 1000);
}

// 📲 SEND OTP
document.getElementById("sendOtpBtn").addEventListener("click", async () => {
  const phoneNumber = document.getElementById("phoneNumber").value;

  if (!phoneNumber) {
    setStatus("Enter phone number", "red");
    return;
  }

  try {
    setStatus("Sending OTP...", "#00b7ff");

    const appVerifier = window.recaptchaVerifier;

    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      appVerifier
    );

    window.confirmationResult = confirmationResult;

    setStatus("OTP sent successfully ✔", "#00ff99");

    startTimer(60); // 🔥 start 60 sec timer
  } catch (error) {
    console.error(error);
    setStatus(error.message, "red");
  }
});

// ✅ VERIFY OTP
document.getElementById("verifyBtn").addEventListener("click", async () => {
  const otp = document.getElementById("otpCode").value;

  if (!otp) {
    setStatus("Enter OTP", "red");
    return;
  }

  try {
    const result = await window.confirmationResult.confirm(otp);

    setStatus("Verified Successfully 🎉", "#00ff99");

    console.log("User:", result.user);
  } catch (error) {
    console.error(error);
    setStatus("Wrong OTP ❌", "red");
  }
});

}
