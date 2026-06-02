import {
auth,
signInWithEmailAndPassword
} from "./firebase-config.js";

function status(msg, color = "#bbb") {
const el = document.getElementById("statusText");

if (el) {
el.innerText = msg;
el.style.color = color;
}
}

document
.getElementById("loginBtn")
.addEventListener("click", async () => {

const email =
document.getElementById("email").value.trim();

const password =
document.getElementById("password").value;

if (!email || !password) {

```
status(
  "Enter email and password",
  "red"
);

return;
```

}

try {

```
status(
  "Logging in...",
  "#00b7ff"
);

const userCredential =
  await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

console.log(
  userCredential.user
);

localStorage.setItem(
  "userLoggedIn",
  "true"
);

status(
  "Login Successful 🎉",
  "#00ff99"
);

setTimeout(() => {

  window.location.href =
    "home.html";

}, 1000);
```

} catch (error) {

```
console.error(error);

status(
  error.message,
  "red"
);
```

}

});

