// dummyCourts.js

// Dummy court data


// Generate time slots for a given day
export function generateTimeSlots(openTime, closeTime) {
    const slots = [];
    const [openHour] = openTime.split(":").map(Number);
    const [closeHour] = closeTime.split(":").map(Number);

    for (let hour = openHour; hour < closeHour; hour++) {
        const startTime = `${String(hour).padStart(2, "0")}:00`;
        const endTime = `${String(hour + 1).padStart(2, "0")}:00`;

        // Randomly mark some slots as booked (30% chance)


        slots.push({
            id: `${startTime}-${endTime}`,
            startTime,
            endTime,

        });
    }

    return slots;
}

// Get next 7 days starting from today
export function getNext7Days() {
    const days = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        days.push(date.toISOString().split("T")[0]);
    }
    return days;
}

// Format date to readable label
export function getDateLabel(dateStr, index) {
    if (index === 0) return "Today";
    if (index === 1) return "Tomorrow";

    const date = new Date(dateStr);
    const options = { weekday: "short", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
}

// Booking state object helper
export function createBookingState(courtId, date, startTime) {
    return {
        courtId,
        date,
        startTime,
    };
}