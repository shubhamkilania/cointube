import { supabase } from "./supabase.js";

document
.getElementById("loginBtn")
.addEventListener("click", async () => {

  const email =
    document.getElementById("email")
    .value.trim();

  const password =
    document.getElementById("password")
    .value;

  const status =
    document.getElementById("statusText");

  if(!email || !password){

    status.innerText =
      "Enter email and password";

    return;

  }

  try{

    status.innerText =
      "Logging in...";

    const { error } =
    await supabase.auth.signInWithPassword({
      email,
      password
    });

    if(error) throw error;

    status.innerText =
      "Login successful";

    window.location.href =
      "home.html";

  }catch(err){

    console.error(err);

    status.innerText =
      err.message;

  }

});
