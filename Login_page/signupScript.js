// Import users from users.js
import users from "./users.js";

// Global variable to track user role
let currentUserRole = null;

// Handle login form submission
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value; 
  localStorage.setItem("loggedInUser", email)

  // Find user in the imported users array
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  window.location.href =
          "../Customer/custDashboard/index.html?v=" + new Date().getTime(); // Redirect to customer page
});
