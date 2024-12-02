let users = [
  { email: "admin@gmail.com", password: "admin123", role: "admin" },
  { email: "customer1@gmail.com", password: "cust123", role: "customer" },
  { email: "customer2@gmail.com", password: "cust456", role: "customer" },
];
const form = document.getElementById('form')
const firstname_input = document.getElementById('firstname-input')
const email_input = document.getElementById('email-input')
const password_input = document.getElementById('password-input')
const repeat_password_input = document.getElementById('repeat-password-input')
const error_message = document.getElementById('error-message')

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let errors = []
  if (firstname_input) {
    // If we have a firstname input then we are in the signup
    errors = getSignupFormErrors(firstname_input.value, email_input.value, password_input.value, repeat_password_input.value)
    console.log("hmm")
    users.push({email: email_input.value, password: password_input.value, role: "customer"});
    console.log(users);
  }
  else {
    // If we don't have a firstname input then we are in the login
    errors = getLoginFormErrors(email_input.value, password_input.value)
  }
  if (errors.length > 0) {
    // If there are any errors
    e.preventDefault()
    error_message.innerText = errors.join(". ")
  }

  let currentUserRole = null;
  console.log(email_input.value)
  console.log(password_input.value)
  const user = users.find(
    (u) => u.email === email_input.value && u.password === password_input.value
  );

  if (user) {
    currentUserRole = user.role;
    localStorage.setItem("loggedInUser", email_input.value)
    console.log("Some more tesing")
    //document.getElementById(
    //  "message"
    //).textContent = `Login successful! Welcome, ${user.role}.`;
    //document.getElementById("message").style.color = "green";


    setTimeout(() => {
      if (currentUserRole === "admin") {
        window.location.href =
          "../Admin/Add Reservations/index.html?v=" + new Date().getTime(); // Ensures a fresh version
      } else {
        window.location.href =
          "../Customer/custDashboard/index.html?v=" + new Date().getTime(); // Redirect to customer page
      }
    }, 1000);
    console.log("DId it make it past?")
  } else {
    //document.getElementById("message").textContent =
    //  "Invalid email or password.";
    //document.getElementById("message").style.color = "red";
    currentUserRole = null; // Reset role on failed login
  }

})

function getSignupFormErrors(firstname, email, password, repeatPassword) {
  let errors = []

  if (firstname === '' || firstname == null) {
    errors.push('Firstname is required')
    firstname_input.parentElement.classList.add('incorrect')
  }
  if (email === '' || email == null) {
    errors.push('Email is required')
    email_input.parentElement.classList.add('incorrect')
  }
  if (password === '' || password == null) {
    errors.push('Password is required')
    password_input.parentElement.classList.add('incorrect')
  }
  if (password.length < 8) {
    errors.push('Password must have at least 8 characters')
    password_input.parentElement.classList.add('incorrect')
  }
  if (password !== repeatPassword) {
    errors.push('Password does not match repeated password')
    password_input.parentElement.classList.add('incorrect')
    repeat_password_input.parentElement.classList.add('incorrect')
  }


  return errors;
}

function getLoginFormErrors(email, password) {
  let errors = []

  if (email === '' || email == null) {
    errors.push('Email is required')
    email_input.parentElement.classList.add('incorrect')
  }
  if (password === '' || password == null) {
    errors.push('Password is required')
    password_input.parentElement.classList.add('incorrect')
  }

  return errors;
}

const allInputs = [firstname_input, email_input, password_input, repeat_password_input].filter(input => input != null)

allInputs.forEach(input => {
  input.addEventListener('input', () => {
    if (input.parentElement.classList.contains('incorrect')) {
      input.parentElement.classList.remove('incorrect')
      error_message.innerText = ''
    }
  })
})
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getSignupFormErrors,
    getLoginFormErrors,
    users, // Exporting users for potential testing purposes
  };
}