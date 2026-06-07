
import { supabase } from "./supabase.js";

const urlParams =
new URLSearchParams(
window.location.search
);

let referredBy =
urlParams.get("ref") ||
"SHUB1411";

function generateReferralCode(username){

const firstPart =
username
.replace(/[^a-zA-Z]/g,"")
.substring(0,4)
.toUpperCase();

const randomPart =
Date.now()
.toString()
.slice(-4);

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

const {
data,
error
} =
await supabase.auth.signUp({
email,
password
});

if(error) throw error;

if(!data.user){

status.innerText =
"Check your email and verify your account.";

return;

}

const referralCode =
generateReferralCode(username);

let inviter = null;

const {
data: inviterProfile
} =
await supabase
.from("profiles")
.select("*")
.eq(
"referral_code",
referredBy
)
.maybeSingle();

if(!inviterProfile){

referredBy =
"SHUB1411";

const {
data: defaultProfile
} =
await supabase
.from("profiles")
.select("*")
.eq(
"referral_code",
"SHUB1411"
)
.maybeSingle();

inviter = defaultProfile;

}else{

inviter = inviterProfile;

}

if(inviter){

await supabase
.from("profiles")
.update({

coins:
(inviter.coins || 0) + 100,

referrals:
(inviter.referrals || 0) + 1

})
.eq(
"id",
inviter.id
);

}

const {
error: profileError
} =
await supabase
.from("profiles")
.insert({

id:
data.user.id,

username:
username,

coins:100,

money:0,

videos_watched:0,

referrals:0,

referral_code:
referralCode,

referred_by:
referredBy

});

if(profileError)
throw profileError;

status.innerText =
"Account created successfully!";

setTimeout(()=>{

window.location.href =
"login.html";

},1500);

}catch(err){

console.error(err);

status.innerText =
err.message;

}

});

