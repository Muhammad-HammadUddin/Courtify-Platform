import { API_PATH } from "@/utils/apiPath";
import axiosInstance from "@/utils/axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [cancellationReason, setCancellationReason] = useState("");

  const fetchBookings = async () => {
    try {
      const response = await axiosInstance.get(API_PATH.BOOKINGS.GET_BOOKINGS_BY_USER, { withCredentials: true });
      setBookings(response.data.bookings);
      console.log(response.data.bookings)
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelClick = (booking) => {
    setSelectedBooking(booking);
    setCancellationReason("");
    setCancelModalOpen(true);
  };

  const handleConfirmCancel = async () => {
    if (!cancellationReason.trim()) {
      toast.warn("Please enter a cancellation reason");
      return;
    }

    try {
      await axiosInstance.put(
        API_PATH.BOOKINGS.CANCEL_BOOKING(selectedBooking.id),
        { cancellation_reason: cancellationReason },
        { withCredentials: true }
      );

      toast.success("Booking cancelled successfully");
      setCancelModalOpen(false);
      setSelectedBooking(null);
      fetchBookings(); // Refetch bookings to get updated status & reason
    } catch (err) {
      console.error(err);
      toast.error("Failed to cancel booking");
    }
  };

  if (loading) return <p className="text-center py-12">Loading bookings...</p>;

  return (
    <div className="space-y-4 p-6">
      <ToastContainer position="top-right" autoClose={3000} />

      <h2 className="text-2xl font-bold text-slate-900 mb-6">My Bookings</h2>

      {bookings.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-slate-500 text-lg">No bookings yet. Start booking courts now!</p>
        </div>
      )}

      {bookings.map((booking) => (
  <div
    key={booking.id}
    className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
  >
    <div className="flex items-start justify-between mb-4">
      <div className="flex-1">
        <h3 className="text-lg font-bold text-slate-900 mb-1">{booking.court.name}</h3>
        <p className="text-slate-500 text-sm mb-2">{booking.court.location}</p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-slate-500">Date & Time</p>
            <p className="font-semibold text-slate-900">📅 {booking.booking_date}</p>
            <p className="font-semibold text-slate-900">🕐 {booking.start_time} - {booking.end_time}</p>
          </div>
          <div>
            <p className="text-slate-500">Duration</p>
            <p className="font-semibold text-slate-900">⏱️ 1 hour</p>
            <p className="text-green-600 font-bold text-lg mt-1">Total: {booking.total_amount}</p>
            <p className="text-blue-600 font-semibold mt-1">Remaining: {booking.remaining_cash}</p>
            {booking.cancellation_reason && (
              <p className="text-red-600 text-sm mt-1">Reason: {booking.cancellation_reason}</p>
            )}
          </div>
        </div>
      </div>

      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-4 ${
          booking.booking_status === "confirmed"
            ? "bg-green-100 text-green-700"
            : booking.booking_status === "cancelled"
            ? "bg-red-100 text-red-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {booking.booking_status === "confirmed"
          ? "✓ Confirmed"
          : booking.booking_status === "cancelled"
          ? "✖ Cancelled"
          : "⏳ Pending"}
      </span>
    </div>

    {/* Buttons hidden if cancelled */}
    {booking.booking_status !== "cancelled" && (
      <div className="flex gap-3">
        <button className="flex-1 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-300 transition-colors">
          Pay Advance
        </button>
        <button
          className="flex-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200 transition-colors"
          onClick={() => handleCancelClick(booking)}
        >
          Cancel Booking
        </button>
      </div>
    )}
  </div>
))}


      {/* Cancellation Modal */}
      <AnimatePresence>
        {cancelModalOpen && selectedBooking && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl border-t-4 border-red-500"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2 className="text-2xl font-bold mb-3 text-red-600">Cancel Booking</h2>
              <p className="mb-2 text-gray-700">
                Court: <span className="font-medium">{selectedBooking.court.name}</span><br/>
                Date: <span className="font-medium">{selectedBooking.booking_date}</span><br/>
                Time: <span className="font-medium">{selectedBooking.start_time} - {selectedBooking.end_time}</span>
              </p>
              <textarea
                className="w-full border rounded-lg p-2 mb-4"
                placeholder="Enter cancellation reason"
                value={cancellationReason}
                onChange={(e) => setCancellationReason(e.target.value)}
              />
              <div className="flex justify-end gap-4">
                <button
                  onClick={handleConfirmCancel}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all"
                >
                  Confirm Cancel
                </button>
                <button
                  onClick={() => setCancelModalOpen(false)}
                  className="px-4 py-2 border rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
