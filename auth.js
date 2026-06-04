import { supabase } from "./supabase.js";

export async function registerUser(email, password){

  const { data, error } =
  await supabase.auth.signUp({
    email,
    password
  });

  if(error){
    throw error;
  }

  return data;
}

export async function loginUser(email, password){

  const { data, error } =
  await supabase.auth.signInWithPassword({
    email,
    password
  });

  if(error){
    throw error;
  }

  return data;
}

export async function logoutUser(){

  await supabase.auth.signOut();

}

export async function getCurrentUser(){

  const {
    data: { user }
  } =
  await supabase.auth.getUser();

  return user;
}
