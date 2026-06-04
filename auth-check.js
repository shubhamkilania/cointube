import { supabase } from "./supabase.js";

try{

  const {
    data: { session },
    error
  } = await supabase.auth.getSession();

  if(error){
    throw error;
  }

  if(!session){
    window.location.href = "login.html";
  }

}catch(err){

  console.error(err);

  window.location.href = "login.html";

}
