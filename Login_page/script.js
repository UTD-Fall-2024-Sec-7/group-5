// Import users from users.js
import users from "./users.js";

// Global variable to track user role
let currentUserRole = null;

// Handle login form submission
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  
  localStorage.setItem("loggedInUser", username)
  
  // Find user in the imported users array
  const user = users.find(
    (u) => u.email === username && u.password === password
  );

  if (user) {
    currentUserRole = user.role;
    document.getElementById(
      "message"
    ).textContent = `Login successful! Welcome, ${user.role}.`;
    document.getElementById("message").style.color = "green";

    // Redirect based on role
    setTimeout(() => {
      if (currentUserRole === "admin") {
        window.location.href =
          "../Admin/Add Reservations/index.html?v=" + new Date().getTime(); // Ensures a fresh version
      } else {
        window.location.href =
          "../Customer/custDashboard/index.html?v=" + new Date().getTime(); // Redirect to customer page
      }
    }, 1000); // Delay for user feedback
  } else {
    document.getElementById("message").textContent =
      "Invalid username or password.";
    document.getElementById("message").style.color = "red";
    currentUserRole = null; // Reset role on failed login
  }
});
