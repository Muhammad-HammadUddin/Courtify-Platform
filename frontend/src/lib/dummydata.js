// dummyCourts.js

// Dummy court data
export const COURTS = [
  {
    id: "1",
    name: "Elite Badminton Court",
    location: "Model Town, Lahore",
    openTime: "08:00",
    closeTime: "22:00",
    thumbnail: "/badminton-court-indoor.jpg",
  },
  {
    id: "2",
    name: "Premium Squash Complex",
    location: "DHA, Lahore",
    openTime: "07:00",
    closeTime: "23:00",
    thumbnail: "/squash-court-professional.jpg",
  },
  {
    id: "3",
    name: "Valley Tennis Center",
    location: "Cavalry Ground, Lahore",
    openTime: "06:00",
    closeTime: "21:00",
    thumbnail: "/outdoor-tennis-court.png",
  },
  {
    id: "4",
    name: "Urban Sports Arena",
    location: "Gulberg, Lahore",
    openTime: "09:00",
    closeTime: "22:00",
    thumbnail: "/multi-sport-facility.jpg",
  },
  {
    id: "5",
    name: "Riverside Badminton Club",
    location: "Thokar Niaz Baig, Lahore",
    openTime: "08:00",
    closeTime: "21:00",
    thumbnail: "/badminton-club.jpg",
  },
  {
    id: "6",
    name: "Championship Court Hub",
    location: "Race Course Park, Lahore",
    openTime: "07:00",
    closeTime: "23:00",
    thumbnail: "/sports-center-championship.jpg",
  },
];

// Generate time slots for a given day
export function generateTimeSlots(openTime, closeTime) {
  const slots = [];
  const [openHour] = openTime.split(":").map(Number);
  const [closeHour] = closeTime.split(":").map(Number);

  for (let hour = openHour; hour < closeHour; hour++) {
    const startTime = `${String(hour).padStart(2, "0")}:00`;
    const endTime = `${String(hour + 1).padStart(2, "0")}:00`;

    // Randomly mark some slots as booked (30% chance)
    const isBooked = Math.random() < 0.3;

    slots.push({
      id: `${startTime}-${endTime}`,
      startTime,
      endTime,
      isBooked,
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
