// Save user
export function saveUser(user) {
  localStorage.setItem(
    "cointube_user",
    JSON.stringify(user)
  );
}

// Get user
export function getUser() {
  return JSON.parse(
    localStorage.getItem("cointube_user")
  );
}

// Update coins
export function updateCoins(amount) {

  let user = getUser();

  if (!user) return;

  user.coins += amount;

  saveUser(user);
}

// Logout
export function logout() {
  localStorage.removeItem("cointube_user");
}
