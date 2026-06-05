import { supabase } from "./supabase.js";

function generateReferralCode(username){

  const firstPart =
    username
    .replace(/[^a-zA-Z]/g,"")
    .substring(0,4)
    .toUpperCase();

  const randomPart =
    Math.floor(
      1000 + Math.random() * 9000
    );

  return firstPart + randomPart;
}

document
.getElementById("registerBtn")
.addEventListener("click", async () => {

  const username =
    document.getElementById("username")
    .value.trim();

  const email =
    document.getElementById("email")
    .value.trim();

  const password =
    document.getElementById("password")
    .value;

  const referredBy =
    document.getElementById("referral")
    .value.trim();

  const status =
    document.getElementById("statusText");

  if(!username || !email || !password){
    status.innerText =
      "Fill all required fields";
    return;
  }

  try{

    status.innerText =
      "Creating account...";

    const { data, error } =
    await supabase.auth.signUp({
      email,
      password
    });

    if(error) throw error;

  const referralCode =
  generateReferralCode(username);

await supabase
.from("profiles")
.insert({

  id: data.user.id,

  username: username,

  coins: 0,

  money: 0,

  videos_watched: 0,

  referrals: 0,

  referral_code: referralCode

});

    status.innerText =
      "Account created. Check your email for verification.";

  }catch(err){

    console.error(err);

    status.innerText =
      err.message;

  }

});
