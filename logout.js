import { supabase } from "./supabase.js";

async function logout(){

try{

```
await supabase.auth.signOut();

window.location.href =
"login.html";
```

}catch(err){

```
console.error(err);
```

}

}

window.logout = logout;

const logoutBtn =
document.getElementById(
"logoutBtn"
);

if(logoutBtn){

logoutBtn.addEventListener(
"click",
logout
);

}
