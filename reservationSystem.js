let reservations = [];

// Function to add a new reservation
function addReservation(prompt, log) {
    const name = prompt("Enter your name: ");
    const date = prompt("Enter reservation date in the format (YYYY-MM-DD): ");
    const time = prompt("Enter reservation time in the format (HH:MM): ");
    const guests = parseInt(prompt("Enter the number of guests: "));

    if (!/^[A-Za-z]+$/.test(name)) {
        log("Invalid name, please only use alphabetical letters");
        return;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        log("Invalid date, please use the format YYYY-MM-DD");
        return;
    }
    if (!/^([0-1]\d|2[0-3]):([0-5]\d)$/.test(time)) {
        log("Invalid time, please use the format HH:MM");
        return;
    }
    if (isNaN(guests) || guests < 1) {
        log("Invalid number of guests, please enter a number greater than 1");
        return;
    }

    const reservation = {
        id: reservations.length + 1,
        name: name,
        date: date,
        time: time,
        guests: guests,
    };

    reservations.push(reservation);

    log("Reservation added successfully");
}

// Function to view all reservations
function viewReservations(log) {
    if (reservations.length === 0) {
        log("No reservations found");
        return;
    }

    let reservationList = "Reservation list:\n";
    reservations.forEach((reservation) => {
        reservationList += `Name: ${reservation.name}, Guests: ${reservation.guests}, Date: ${reservation.date}, Time: ${reservation.time}\n`;
    });

    log(reservationList);
}

// Function to sort reservations based on user choice
function sortReservations(prompt, log) {
    const sortBy = prompt("Please enter date, time, or guests to select the sort by field: ").toLowerCase();

    switch (sortBy) {
        case "date":
            reservations.sort((a, b) => new Date(a.date) - new Date(b.date));
            log("Reservations sorted by date");
            break;
        case "time":
            reservations.sort((a, b) => a.time.localeCompare(b.time));
            log("Reservations sorted by time");
            break;
        case "guests":
            reservations.sort((a, b) => a.guests - b.guests);
            log("Reservations sorted by guests");
            break;
        default:
            log("Invalid option, please enter date, time, or guests");
            return;
    }
    viewReservations(log);
}

// Export the functions and reservations array for testing
module.exports = { addReservation, viewReservations, sortReservations, reservations };
