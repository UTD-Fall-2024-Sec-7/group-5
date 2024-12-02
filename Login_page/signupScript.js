// Import users from users.js
import users from "./users.js";

// Global variable to track user role
let currentUserRole = null;

function saveUser(users) {
  localStorage.setItem("newUsers", JSON.stringify(users));
}

// Handle login form submission
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value; 
  localStorage.setItem("loggedInUser", email)
  localStorage.setItem("loggedInUser", email)

  let newUsers = JSON.parse(localStorage.getItem("newUsers")) || [];

  // Find user in the imported users array
  const user = users.find(
    (u) => u.username === username || u.email === email
  );
  const user2 = newUsers.find(
    (u) => u.email === username && u.password === password
  );
  if(user || user2)
  {
    document.getElementById("message").textContent =
      "User already exists.";
    document.getElementById("message").style.color = "red";
    currentUserRole = null; // Reset role on failed login
  }
  else
  {
    const newUser = {
      username: username, password: password, role: "customer", email: email
    };
    newUsers.push(newUser)
    saveUser(newUsers)
    window.location.href =
          "../Customer/custDashboard/index.html?v=" + new Date().getTime(); // Redirect to customer page
  }
});
module.exports = { saveUser, handleLogin };
module.exports = { saveUser, handleLogin };