/**
 * Retrieves reservations from localStorage.
 * @returns {Array} Array of reservation objects.
 */
function getReservations() {
  return JSON.parse(localStorage.getItem("reservations")) || [];
}

/**
 * Saves reservations to localStorage.
 * @param {Array} reservations - Array of reservation objects.
 */
function saveReservations(reservations) {
  localStorage.setItem("reservations", JSON.stringify(reservations));
}

/**
 * Formats a Date object to YYYY-MM-DD.
 * @param {Date} date - Date object.
 * @returns {string} Formatted date string.
 */
function formatDate(date) {
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  return `${year}-${month}-${day}`;
}

/**
 * Adds exactly 30 days to a date.
 * @param {Date} date - Original date.
 * @returns {Date} New date, 30 days later.
 */
function addThirtyDays(date) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + 30);
  return newDate;
}

/**
 * Sets the min and max attributes for the date input to enforce a 30-day window.
 */
function setDateConstraints() {
  const dateInput = document.getElementById("date");
  if (!dateInput) return;

  const today = new Date();
  const thirtyDaysLater = addThirtyDays(today);

  dateInput.min = formatDate(today);
  dateInput.max = formatDate(thirtyDaysLater);
}

/**
 * Renders the reservation list on list.html.
 */
function renderReservationList() {
  const reservationList = document.getElementById("reservationList");
  if (!reservationList) return;

  const reservations = getReservations();
  reservationList.innerHTML = "";

  if (reservations.length === 0) {
    reservationList.innerHTML = "<li>No reservations found.</li>";
    return;
  }

  reservations.forEach((res, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <div>
                <strong>${res.firstName} ${res.lastName}</strong><br/>
                ${res.location} - Party of ${res.partySize}<br/>
                ${res.date} at ${res.time}<br/>
                Email: ${res.email}<br/>
                Phone: ${res.phone}
            </div>
            <div>
                <button onclick="removeReservation(${index})">Delete</button>
            </div>
        `;
    reservationList.appendChild(li);
  });
}

/**
 * Adds a new reservation.
 */
function addReservation() {
  const form = document.getElementById("reservationForm");
  if (!form) return;

  const reservation = {
    location: form.location.value.trim(),
    partySize: form.partySize.value,
    firstName: form.firstName.value.trim(),
    lastName: form.lastName.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    date: form.date.value,
    time: form.time.value,
  };

  // Basic validation
  if (
    !reservation.location ||
    !reservation.partySize ||
    !reservation.firstName ||
    !reservation.lastName ||
    !reservation.email ||
    !reservation.phone ||
    !reservation.date ||
    !reservation.time
  ) {
    alert("Please fill in all fields.");
    return;
  }

  // Validate date is within allowed range
  const today = new Date();
  const thirtyDaysLater = addThirtyDays(today);
  const selectedDate = new Date(reservation.date);

  if (selectedDate < today || selectedDate > thirtyDaysLater) {
    alert("Please select a date within the next 30 days.");
    return;
  }

  const reservations = getReservations();
  reservations.push(reservation);
  saveReservations(reservations);
  alert("Reservation added successfully!");
  
  var params = {
    to_name : document.getElementById("firstName").value,
    date : document.getElementById("date").value,
    time : document.getElementById("time").value,
    to_email : document.getElementById("email").value
  }
  
  emailjs.send("service_ntlyj2e", "template_gm23asd", params)

  form.reset();

  // Re-render calendar if on calendar.html
  if (window.location.pathname.includes("calendar.html")) {
    renderCalendar(currentYear, currentMonth);
  }
}

/**
 * Removes a reservation.
 * @param {number} index - Index of the reservation to remove.
 */
function removeReservation(index) {
  if (!confirm("Are you sure you want to delete this reservation?")) return;

  const reservations = getReservations();
  if (index < 0 || index >= reservations.length) {
    alert("Invalid reservation index.");
    return;
  }

  reservations.splice(index, 1);
  saveReservations(reservations);
  renderReservationList();
  alert("Reservation deleted successfully!");

  // Re-render calendar if on calendar.html
  if (window.location.pathname.includes("calendar.html")) {
    renderCalendar(currentYear, currentMonth);
  }
}

// Calendar Rendering Variables
let currentYear, currentMonth;

/**
 * Renders the calendar for the specified month and year.
 * @param {number} year - The year to render.
 * @param {number} month - The month to render (0-11).
 */
function renderCalendar(year, month) {
  currentYear = year;
  currentMonth = month;

  const calendar = document.getElementById("calendar");
  const monthYear = document.getElementById("monthYear");
  if (!calendar || !monthYear) return;

  // Clear existing calendar
  calendar.innerHTML = "";

  // Set month and year header
  const options = { year: "numeric", month: "long" };
  const date = new Date(year, month);
  monthYear.textContent = date.toLocaleDateString(undefined, options);

  // Add day labels
  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  dayLabels.forEach((day) => {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("day-label");
    dayDiv.textContent = day;
    calendar.appendChild(dayDiv);
  });

  const firstDay = getFirstDayOfMonth(year, month);
  const lastDay = getLastDayOfMonth(year, month);
  const daysInMonth = lastDay.getDate();
  const firstDayIndex = firstDay.getDay();

  // Add blank cells for days before the first day
  for (let i = 0; i < firstDayIndex; i++) {
    const blankDiv = document.createElement("div");
    blankDiv.classList.add("blank");
    calendar.appendChild(blankDiv);
  }

  // Add day cells
  for (let day = 1; day <= daysInMonth; day++) {
    const dateObj = new Date(year, month, day);
    const dateString = formatDate(dateObj);

    const dayDiv = document.createElement("div");
    dayDiv.classList.add("day-cell");
    dayDiv.textContent = day;

    const reservations = getReservations();
    const isReserved = reservations.some((res) => res.date === dateString);

    // Highlight days with reservations
    if (isReserved) {
      dayDiv.classList.add("reserved");
      dayDiv.title = "Reserved";
    }

    // Define allowed date range
    const today = new Date();
    const thirtyDaysLater = addThirtyDays(today);

    if (dateObj < today || dateObj > thirtyDaysLater) {
      dayDiv.classList.add("disabled");
    } else {
      // Add click event to show reservations for the day in the Reservations Panel
      dayDiv.addEventListener("click", () => {
        renderReservationsForDate(dateString);
      });
    }

    calendar.appendChild(dayDiv);
  }
}

/**
 * Gets the first day of the specified month.
 * @returns {Date} Date object representing the first day.
 */
function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1);
}

/**
 * Gets the last day of the specified month.
 * @returns {Date} Date object representing the last day.
 */
function getLastDayOfMonth(year, month) {
  return new Date(year, month + 1, 0);
}

/**
 * Initializes the calendar navigation buttons.
 */
function initCalendarNavigation() {
  const prevButton = document.getElementById("prevMonth");
  const nextButton = document.getElementById("nextMonth");

  if (!prevButton || !nextButton) return;

  prevButton.addEventListener("click", () => {
    let newMonth = currentMonth - 1;
    let newYear = currentYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }

    renderCalendar(newYear, newMonth);
  });

  nextButton.addEventListener("click", () => {
    let newMonth = currentMonth + 1;
    let newYear = currentYear;
    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }

    renderCalendar(newYear, newMonth);
  });
}
function renderReservationList() {
  const reservationTableBody = document.querySelector(
    "#reservationTable tbody"
  );
  if (!reservationTableBody) return;

  const reservations = getReservations();
  reservationTableBody.innerHTML = "";

  if (reservations.length === 0) {
    const row = reservationTableBody.insertRow();
    const cell = row.insertCell(0);
    cell.colSpan = 8;
    cell.textContent = "No reservations found.";
    cell.style.textAlign = "center";
    return;
  }

  reservations.forEach((res, index) => {
    const row = reservationTableBody.insertRow();

    let cell = row.insertCell(0);
    cell.textContent = `${res.firstName} ${res.lastName}`;
    cell.setAttribute("data-label", "Guest Name");

    cell = row.insertCell(1);
    cell.textContent = res.location;
    cell.setAttribute("data-label", "Location");

    cell = row.insertCell(2);
    cell.textContent = res.partySize;
    cell.setAttribute("data-label", "Party Size");

    cell = row.insertCell(3);
    cell.textContent = res.date;
    cell.setAttribute("data-label", "Date");

    cell = row.insertCell(4);
    cell.textContent = res.time;
    cell.setAttribute("data-label", "Time");

    cell = row.insertCell(5);
    cell.textContent = res.email;
    cell.setAttribute("data-label", "Email");

    cell = row.insertCell(6);
    cell.textContent = res.phone;
    cell.setAttribute("data-label", "Phone");

    cell = row.insertCell(7);
    cell.setAttribute("data-label", "Actions");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    deleteButton.onclick = () => removeReservation(index);

    cell.appendChild(deleteButton);
  });
}

/**
 * Initializes event listeners based on the current page.
 */
function initializePage() {
  const currentPage = window.location.pathname.split("/").pop();

  if (currentPage === "index.html" || currentPage === "") {
    // Add Reservation Page
    const addButton = document.getElementById("addReservation");
    if (addButton) {
      addButton.addEventListener("click", addReservation);
    }
  } else if (currentPage === "list.html") {
    // Manage Reservations Page
    renderReservationList();
  } else if (currentPage === "calendar.html") {
    // Calendar View Page
    const today = new Date();
    currentYear = today.getFullYear();
    currentMonth = today.getMonth();
    renderCalendar(currentYear, currentMonth);
    initCalendarNavigation();
  }
}

/**
 * Renders reservations in the Reservations Panel for a specific date.
 * @param {string} dateString - The selected date in YYYY-MM-DD format.
 */
function renderReservationsForDate(dateString) {
  const reservationsList = document.getElementById("reservationsList");
  if (!reservationsList) return;

  const reservations = getReservations().filter(
    (res) => res.date === dateString
  );
  reservationsList.innerHTML = "";

  if (reservations.length === 0) {
    reservationsList.innerHTML = `<p>No reservations on ${dateString}.</p>`;
    return;
  }

  const ul = document.createElement("ul");
  reservations.forEach((res) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <strong>${res.firstName} ${res.lastName}</strong><br/>
            ${res.time} - ${res.location} (Party of ${res.partySize})<br/>
            Email: ${res.email}<br/>
            Phone: ${res.phone}
        `;
    ul.appendChild(li);
  });
  reservationsList.appendChild(ul);
}

// Initialization on DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  setDateConstraints();
  initializePage();
});
// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Select the Logout button by its ID
  const logoutButton = document.getElementById("logoutButton");

  // Check if the Logout button exists on the page
  if (logoutButton) {
    // Add a click event listener to the Logout button
    logoutButton.addEventListener("click", function () {
      // Optional: Perform any cleanup operations here
      // For example, clearing user data from localStorage or sessionStorage
      // localStorage.clear();
      // sessionStorage.clear();

      // Redirect to the logout placeholder page
      // Replace 'logout.html' with the actual logout URL when available
      window.location.href = "../../Login_page/login.html";
    });
  }
});
