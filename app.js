import {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "./firebase-config.js";

window.recaptchaVerifier = new RecaptchaVerifier(
  auth,
  "recaptcha-container",
  {
    size: "normal"
  }
);

const sendOtpBtn =
  document.getElementById("sendOtpBtn");

if (sendOtpBtn) {

  sendOtpBtn.addEventListener(
    "click",
    async () => {

      const phoneNumber =
        document.getElementById(
          "phoneNumber"
        ).value;

      if (!phoneNumber) {

        alert(
          "Enter phone number"
        );

        return;
      }

      try {

        const appVerifier =
          window.recaptchaVerifier;

        const confirmationResult =
          await signInWithPhoneNumber(
            auth,
            phoneNumber,
            appVerifier
          );

        window.confirmationResult =
          confirmationResult;

        alert(
          "OTP Sent Successfully"
        );

      } catch (error) {

        console.error(error);

        alert(
          error.message
        );

      }

    }
  );

}
  );

}
