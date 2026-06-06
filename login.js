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

const {
  data,
  error
} =
await supabase.auth.signInWithPassword({
  email,
  password
});

if(error) throw error;

const user =
data.user;

const {
  data: profile,
  error: profileError
} =
await supabase
.from("profiles")
.select("*")
.eq("id", user.id)
.maybeSingle();

if(profileError){

  console.error(profileError);

}

if(!profile){

  status.innerText =
  "Profile not found. Contact support.";

  return;

}

status.innerText =
"Login successful";

setTimeout(()=>{

  window.location.href =
  "home.html";

},500);

}catch(err){
  
console.error(err);

status.innerText =
err.message;

}

});

