let coins = 0;

function toggleMenu() {
const sidebar = document.getElementById("sidebar");

```
if (sidebar) {
    sidebar.classList.toggle("active");
}
```

}

function generateReferralCode(name) {

```
let firstPart = name
    .replace(/[^a-zA-Z]/g, "")
    .substring(0, 5)
    .toUpperCase();

let randomPart =
    Math.floor(1000 + Math.random() * 9000);

return firstPart + randomPart;
```

}

function registerUser() {

```
let fullName =
    document.getElementById("fullName").value;

let phoneNumber =
    document.getElementById("phoneNumber").value;

let password =
    document.getElementById("password").value;

let confirmPassword =
    document.getElementById("confirmPassword").value;

let referralCodeUsed =
    document.getElementById("referralCode").value;

if (
    fullName === "" ||
    phoneNumber === "" ||
    password === "" ||
    confirmPassword === ""
) {
    alert("Please fill all fields");
    return;
}

if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
}

let myReferralCode =
    generateReferralCode(fullName);

localStorage.setItem(
    "myReferralCode",
    myReferralCode
);

localStorage.setItem(
    "fullName",
    fullName
);

localStorage.setItem(
    "phoneNumber",
    phoneNumber
);

localStorage.setItem(
    "referredBy",
    referralCodeUsed
);

alert(
    "Registration Successful!\n\nYour Referral Code: " +
    myReferralCode
);

window.location.href =
    "dashboard.html";
```

}

function copyReferralCode() {

```
let code =
    document.getElementById(
        "myReferralCode"
    ).innerText;

navigator.clipboard.writeText(code);

alert("Referral Code Copied!");
```

}

window.onload = function () {

```
let referralElement =
    document.getElementById(
        "myReferralCode"
    );

if (referralElement) {

    referralElement.innerText =
        localStorage.getItem(
            "myReferralCode"
        ) || "No Code";
}
```

};

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
