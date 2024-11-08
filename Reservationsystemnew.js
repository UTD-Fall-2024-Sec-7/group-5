let reservations = [];

function addReservation() {
    const name = prompt("Enter your name: ");
    const date = prompt("Enter reservation date in the format (YYYY-MM-DD): ");
    const time = prompt("Enter reservation time in the format (HH:MM): ");
    const guestsInput = prompt("Enter the number of guests: ");
    const guests = parseInt(guestsInput);

    try {
        if (!name) throw "Name cannot be empty";
        if (!/^[A-Za-z]+$/.test(name)) throw "Invalid name, please only use alphabetical letters";
        if (!date) throw "Date cannot be empty";
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw "Invalid date, please use the format YYYY-MM-DD";
        if (!time) throw "Time cannot be empty";
        if (!/^([0-1]\d|2[0-3]):([0-5]\d)$/.test(time)) throw "Invalid time, please use the format HH:MM";
        if (!guestsInput || isNaN(guests) || guests < 1) throw "Invalid number of guests, please enter a number greater than 1";
    } catch (error) {
        console.log(error);
        return;
    }

    const reservation = { id: reservations.length + 1, name, date, time, guests };
    reservations.push(reservation);
    console.log("Reservation added successfully");
}

function viewReservations() {
    if (reservations.length === 0) {
        console.log("No reservations found");
        return;
    }

    console.log("Reservation list:");

    let reservationList = "";

    for (let i = 0; i < reservations.length; i++) {
        const reservation = reservations[i];
        reservationList += `Name: ${reservation.name}, Guests: ${reservation.guests}, Date: ${reservation.date}, Time: ${reservation.time}\n`;
    }

    console.log(reservationList);
}

function sortReservations() {
    const sortBy = prompt("Please enter 'date', 'time', or 'guests' to select the sort by field: ").toLowerCase();

    try {
        switch (sortBy) {
            case "date":
                reservations.sort((a, b) => new Date(a.date) - new Date(b.date));
                console.log("Reservations sorted by date");
                break;
            case "time":
                reservations.sort((a, b) => a.time.localeCompare(b.time));
                console.log("Reservations sorted by time");
                break;
            case "guests":
                reservations.sort((a, b) => a.guests - b.guests);
                console.log("Reservations sorted by guests");
                break;
            default:
                throw "Invalid option, please enter 'date', 'time', or 'guests'";
        }
    } catch (error) {
        console.log(error);
        return;
    }

    viewReservations();
}

function reservationSystem() {
    let selection = "";

    while (selection !== "4") {
        selection = prompt("Choose an option:\n1. Add Reservation\n2. View Reservations\n3. Sort Reservations\n4. Exit\n");

        switch (selection) {
            case "1":
                addReservation();
                break;
            case "2":
                viewReservations();
                break;
            case "3":
                sortReservations();
                break;
            case "4":
                console.log("Exiting");
                break;
            default:
                console.log("Invalid choice, please enter a number between 1 and 4.");
        }
    }
}

reservationSystem();
