import { supabase } from "./supabase.js";

const publicPages = [
  "login.html",
  "register.html",
  "reset.html"
];

const currentPage =
window.location.pathname
.split("/")
.pop();

if(!publicPages.includes(currentPage)){

  const {
    data:{ session }
  } = await supabase.auth.getSession();

  if(!session){
    window.location.href = "login.html";
  }

}
