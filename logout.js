import { supabase } from "./supabase.js";

await supabase.auth.signOut();

window.location.href = "login.html";
