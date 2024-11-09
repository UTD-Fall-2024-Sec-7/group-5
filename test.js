const { addReservation, viewReservations, sortReservations, reservations } = require('./reservationSystem');

describe("Reservation System", () => {
    let mockPrompt;
    let mockLog;

    beforeEach(() => {
        // Reset reservations before each test
        reservations.length = 0;

        // Mock prompt and log
        mockPrompt = jest.fn();
        mockLog = jest.fn();
    });

    test("should add a reservation with valid inputs", () => {
        mockPrompt.mockReturnValueOnce("John")   // name
                  .mockReturnValueOnce("2024-12-01") // date
                  .mockReturnValueOnce("12:00")  // time
                  .mockReturnValueOnce("3");     // guests

        addReservation(mockPrompt, mockLog);

        expect(reservations).toHaveLength(1);
        expect(reservations[0]).toEqual({
            id: 1,
            name: "John",
            date: "2024-12-01",
            time: "12:00",
            guests: 3,
        });
        expect(mockLog).toHaveBeenCalledWith("Reservation added successfully");
    });

    test("should reject reservation with invalid name", () => {
        mockPrompt.mockReturnValueOnce("John123") // Invalid name
                  .mockReturnValueOnce("2024-12-01")
                  .mockReturnValueOnce("12:00")
                  .mockReturnValueOnce("3");

        addReservation(mockPrompt, mockLog);

        expect(reservations).toHaveLength(0);
        expect(mockLog).toHaveBeenCalledWith("Invalid name, please only use alphabetical letters");
    });

    test("should view reservations", () => {
        // Add a mock reservation
        reservations.push({ id: 1, name: "Alice", date: "2024-12-01", time: "15:00", guests: 2 });

        viewReservations(mockLog);

        expect(mockLog).toHaveBeenCalledWith(expect.stringContaining("Name: Alice"));
    });

    test("should show 'No reservations found' when no reservations exist", () => {
        viewReservations(mockLog);

        expect(mockLog).toHaveBeenCalledWith("No reservations found");
    });

    test("should sort reservations by date", () => {
        reservations.push(
            { id: 1, name: "Alice", date: "2024-12-02", time: "14:00", guests: 2 },
            { id: 2, name: "Bob", date: "2024-12-01", time: "12:00", guests: 4 }
        );

        mockPrompt.mockReturnValueOnce("date");

        sortReservations(mockPrompt, mockLog);
        
        expect(mockLog).toHaveBeenCalledWith("Reservations sorted by date");
        expect(reservations[0].name).toBe("Bob");
        expect(reservations[1].name).toBe("Alice");
    });

    test("should sort reservations by time", () => {
        reservations.push(
            { id: 1, name: "Alice", date: "2024-12-01", time: "15:00", guests: 2 },
            { id: 2, name: "Bob", date: "2024-12-01", time: "12:00", guests: 4 }
        );

        mockPrompt.mockReturnValueOnce("time");

        sortReservations(mockPrompt, mockLog);

        expect(mockLog).toHaveBeenCalledWith("Reservations sorted by time");
        expect(reservations[0].name).toBe("Bob");
        expect(reservations[1].name).toBe("Alice");
    });

    test("should sort reservations by number of guests", () => {
        reservations.push(
            { id: 1, name: "Alice", date: "2024-12-01", time: "15:00", guests: 5 },
            { id: 2, name: "Bob", date: "2024-12-01", time: "12:00", guests: 2 }
        );

        mockPrompt.mockReturnValueOnce("guests");

        sortReservations(mockPrompt, mockLog);

        expect(mockLog).toHaveBeenCalledWith("Reservations sorted by guests");
        expect(reservations[0].name).toBe("Bob");
        expect(reservations[1].name).toBe("Alice");
    });
});
