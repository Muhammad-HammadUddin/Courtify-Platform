import React from "react";

const mockBookings = [
  {
    id: 1,
    courtName: "Green Valley Football Court",
    date: "Nov 3, 2025",
    time: "6:00 PM - 7:30 PM",
    duration: "1.5 hours",
    price: "$37.50",
    status: "confirmed",
  },
  {
    id: 2,
    courtName: "Badminton Arena Pro",
    date: "Nov 5, 2025",
    time: "7:00 PM - 8:00 PM",
    duration: "1 hour",
    price: "$15.00",
    status: "confirmed",
  },
  {
    id: 3,
    courtName: "Tennis Paradise",
    date: "Nov 8, 2025",
    time: "5:30 PM - 6:30 PM",
    duration: "1 hour",
    price: "$30.00",
    status: "pending",
  },
];

export default function MyBookings() {
  return (
    <div className="space-y-4 p-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">My Bookings</h2>

      {mockBookings.map((booking) => (
        <div
          key={booking.id}
          className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {booking.courtName}
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-500">Date & Time</p>
                  <p className="font-semibold text-slate-900">
                    📅 {booking.date}
                  </p>
                  <p className="font-semibold text-slate-900">
                    🕐 {booking.time}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500">Duration</p>
                  <p className="font-semibold text-slate-900">
                    ⏱️ {booking.duration}
                  </p>
                  <p className="text-green-600 font-bold text-lg mt-1">
                    {booking.price}
                  </p>
                </div>
              </div>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-4 ${
                booking.status === "confirmed"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {booking.status === "confirmed" ? "✓ Confirmed" : "⏳ Pending"}
            </span>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-300 transition-colors">
              Reschedule
            </button>
            <button className="flex-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200 transition-colors">
              Cancel Booking
            </button>
          </div>
        </div>
      ))}

      {mockBookings.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-slate-500 text-lg">
            No bookings yet. Start booking courts now!
          </p>
        </div>
      )}
    </div>
  );
}
