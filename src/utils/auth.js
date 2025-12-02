
const defaultAdmin = {
  userId: 1,
  name: "Admin",
  email: "admin@filmify.com",
  password: "admin123",
  role: "admin",
};

let existingUsers = JSON.parse(localStorage.getItem("users")) || [];

if (existingUsers.length === 0) {
  localStorage.setItem("users", JSON.stringify([defaultAdmin]));
}
else if (!existingUsers.some(u => u.role === "admin")) {
  existingUsers.unshift(defaultAdmin);
  localStorage.setItem("users", JSON.stringify(existingUsers));
}



export function isAdmin() {
  const user = getCurrentUser();
  return user && user.role === "admin";
}

export function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

export function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

export function registerUser(name, email, password) {
  const users = getUsers();

  if (users.find(u => u.email === email)) {
    return { success: false, message: "Email already registered" };
  }

  const newUser = {
    userId: Date.now(),
    name,
    email,
    password,
    role: "user",
  };

  users.push(newUser);
  saveUsers(users);

  return { success: true };
}

export function loginUser(email, password) {
  const users = getUsers();

  const found = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!found) return { success: false };

  localStorage.setItem("currentUser", JSON.stringify(found));
  return { success: true, user: found };
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser")) || null;
}

export function logoutUser() {
  localStorage.removeItem("currentUser");
}
