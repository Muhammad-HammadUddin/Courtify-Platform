"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axios";
import { API_PATH } from "@/utils/apiPath";
import { checkUserRole } from "@/utils/auth";

import { toast } from "react-toastify";
import { Loader2, Calendar, Clock, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
 
const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelData, setCancelData] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
   // reason state
  useEffect(()=>{
    

    checkUserRole("user", navigate, setLoading);

  

  },[navigate])
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axiosInstance.get(API_PATH.BOOKINGS.GET_BOOKINGS_BY_USER, {
        withCredentials: true,
      });
      setBookings(res.data.bookings || []);
    } catch (e) {
      toast.error("Could not load bookings");
    } finally {
      setLoading(false);
    }
  };

  const handlePayAdvance = async (booking) => {
    try {
      const res = await axiosInstance.post(
        API_PATH.PAYMENTS.CREATE,
        {
          booking_id: booking.id,
          court_name: booking.court_name || booking.court.name,
          amount: 500,
          currency: "PKR",
          payment_method: "card",
        },
        { withCredentials: true }
      );

      if (res.data.url) window.location.href = res.data.url;
      else toast.error("Payment URL not found");
    } catch (err) {
      toast.error("Payment failed");
    }
  };

  const handleConfirmCancel = async () => {
    if (!cancelReason.trim()) {
      toast.error("Please enter a reason for cancellation");
      return;
    }

    try {
      console.log(cancelData.id)
      await axiosInstance.put(
        API_PATH.BOOKINGS.CANCEL_BOOKING(cancelData.id),
        { cancellation_reason: cancelReason }, // send reason
        { withCredentials: true }
      );
      toast.success("Booking cancelled");
      fetchBookings();
    } catch {
      toast.error("Failed to cancel booking");
    } finally {
      setCancelData(null);
      setCancelReason("");
    }
  };

  if (loading)
    return (
      <div className="w-full flex justify-center py-20">
        <Loader2 className="animate-spin h-10 w-10 text-gray-600" />
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-gray-500 text-lg">No bookings yet.</p>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="p-5 bg-white shadow hover:shadow-lg border rounded-2xl transition-all duration-300"
            >
              <h2 className="text-2xl font-semibold text-slate-900">
                {booking.court_name || booking.court?.name}
              </h2>

              <div className="flex items-center gap-4 mt-2 text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span>{booking.booking_date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span>
                    {booking.start_time} - {booking.end_time}
                  </span>
                </div>
              </div>

              <div className="mt-3">
                <span
                  className={`px-3 py-1 text-sm rounded-full font-semibold ${
                    booking.booking_status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : booking.booking_status === "approved"
                      ? "bg-blue-100 text-blue-700"
                      : booking.booking_status === "confirmed"
                      ? "bg-green-100 text-green-700"
                      : booking.booking_status === "cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {booking.booking_status === "pending"
                    ? "Pending"
                    : booking.booking_status === "approved"
                    ? "Awaiting Advance Payment"
                    : booking.booking_status === "confirmed"
                    ? "Advance Paid ✔"
                    : booking.booking_status === "cancelled"
                    ? "Cancelled"
                    : "Unknown"}
                </span>
              </div>

              <div className="mt-3 space-y-1">
                <p className="font-semibold text-gray-800 flex items-center gap-1">
                  <CreditCard className="w-4 h-4 text-green-600" />
                  Total: Rs {booking.total_amount || booking.amount}
                </p>
                {(booking.booking_status === "approved" ||
                  booking.booking_status === "confirmed") && (
                  <p className="text-gray-700 font-medium">
                    Remaining Cash: Rs {booking.remaining_cash ?? "0"}
                  </p>
                )}
              </div>

              {booking.booking_status === "approved" && (
                <div className="flex gap-3 mt-4">
                  <button
                    className="flex-1 bg-blue-50 text-blue-700 py-2 rounded-lg font-semibold hover:bg-blue-100 transition shadow-sm"
                    onClick={() => handlePayAdvance(booking)}
                  >
                    Pay Advance
                  </button>
                  <button
                    className="flex-1 bg-red-50 text-red-700 py-2 rounded-lg font-semibold hover:bg-red-100 transition shadow-sm"

                    onClick={() => setCancelData(booking)}
                  >
                    Cancel Booking
                  </button>
                </div>
              )}

              {booking.booking_status === "confirmed" && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm font-semibold flex items-center gap-2">
                  ✔ Advance Payment Received — Your booking is confirmed.
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* CANCEL MODAL */}
      {cancelData && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-80 shadow-xl animate-slide-up">
            <h2 className="text-lg font-bold mb-2">Cancel Booking?</h2>
            <p className="text-gray-600 mb-2">
              Are you sure you want to cancel this booking?
            </p>

            <textarea
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder="Reason for cancellation..."
              className="w-full border rounded-lg p-2 mb-4 text-sm"
            />

            <div className="flex gap-3">
              <button
                className="flex-1 bg-gray-200 py-2 rounded-lg font-semibold hover:bg-gray-300"
                onClick={() => {
                  setCancelData(null);
                  setCancelReason("");
                }}
              >
                No
              </button>
              <button
                className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700"
                onClick={handleConfirmCancel}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
