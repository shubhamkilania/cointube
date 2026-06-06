import { supabase } from "./supabase.js";

const publicPages = [
"login.html",
"register.html",
"reset.html",
""
];

const currentPage =
window.location.pathname
.split("/")
.pop();

const {
data: { session }
} = await supabase.auth.getSession();

if(!session){

if(
!publicPages.includes(
currentPage
)
){

```
window.location.href =
"login.html";
```

}

}else{

if(
currentPage === "login.html" ||
currentPage === "register.html"
){

```
window.location.href =
"home.html";
```

}

}
