import { supabase } from "./supabase.js";

export async function createUser(userData){

  const { error } =
  await supabase
  .from("users")
  .insert([userData]);

  if(error){
    throw error;
  }

}

export async function getUser(email){

  const { data, error } =
  await supabase
  .from("users")
  .select("*")
  .eq("email", email)
  .single();

  if(error){
    return null;
  }

  return data;
}

export async function updateCoins(
  email,
  coins
){

  await supabase
  .from("users")
  .update({
    coins: coins
  })
  .eq("email", email);

}

export async function updateVideos(
  email,
  count
){

  await supabase
  .from("users")
  .update({
    videos_watched: count
  })
  .eq("email", email);

}

export async function getLeaderboard(){

  const { data } =
  await supabase
  .from("users")
  .select("*")
  .order("coins", {
    ascending:false
  });

  return data || [];

}
