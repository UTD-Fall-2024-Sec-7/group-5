// Function to handle Account navigation
function handleAccount() {
  window.location.href = "account.html";
}

// Function to handle Notification navigation
function handleNotification() {
  window.location.href = "notifications.html";
}

// Function to handle History navigation
function handleHistory() {
  window.location.href = "../custHistory/index.html";
}

// Function to handle Sign Out
function handleSignOut() {
  localStorage.removeItem("userSession");
  window.location.href = "../../Login_page/login.html";
}

// Check login status only on protected pages
function checkLoginStatus() {
  const userSession = localStorage.getItem("userSession");
  // Get the current page name
  const currentPage = window.location.pathname.split("/").pop();

  // Only redirect if we're on a protected page and there's no session
  if (
    !userSession &&
    currentPage !== "login.html" &&
    currentPage !== "index.html" &&
    currentPage !== ""
  ) {
    window.location.href = "login.html";
  }

  // If we're on login page and user is already logged in, redirect to index
  if (userSession && currentPage === "login.html") {
    window.location.href = "index.html";
  }
}

// Run check when page loads
document.addEventListener("DOMContentLoaded", checkLoginStatus);
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    handleAccount,
    handleNotification,
    handleHistory,
    handleSignOut,
    checkLoginStatus,
  };
}