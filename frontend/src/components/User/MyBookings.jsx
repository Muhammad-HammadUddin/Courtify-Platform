import { API_PATH } from "@/utils/apiPath";
<<<<<<< Updated upstream
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
=======
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { 
  Loader2, 
  Calendar, 
  Clock, 
  CreditCard, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  DollarSign,
  MapPin,
  Zap,
  TrendingUp,
  X
} from "lucide-react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelData, setCancelData] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const [processingPayment, setProcessingPayment] = useState(null);
  
  useEffect(() => {
    fetchBookings();
  }, []);
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelClick = (booking) => {
    setSelectedBooking(booking);
    setCancellationReason("");
    setCancelModalOpen(true);
=======
  const handlePayAdvance = async (booking) => {
    try {
      setProcessingPayment(booking.id);
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

      if (res.data.url) {
        toast.success("Redirecting to payment...");
        setTimeout(() => {
          window.location.href = res.data.url;
        }, 1000);
      } else {
        toast.error("Payment URL not found");
      }
    } catch (err) {
      toast.error("Payment failed");
    } finally {
      setProcessingPayment(null);
    }
>>>>>>> Stashed changes
  };

  const handleConfirmCancel = async () => {
    if (!cancellationReason.trim()) {
      toast.warn("Please enter a cancellation reason");
      return;
    }

    try {
      await axiosInstance.put(
<<<<<<< Updated upstream
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
=======
        API_PATH.BOOKINGS.CANCEL_BOOKING(cancelData.id),
        { cancellation_reason: cancelReason },
        { withCredentials: true }
      );
      toast.success("Booking cancelled successfully");
      fetchBookings();
    } catch {
>>>>>>> Stashed changes
      toast.error("Failed to cancel booking");
    }
  };

<<<<<<< Updated upstream
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
=======
  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        bg: "bg-gradient-to-r from-yellow-100 to-amber-100",
        text: "text-yellow-700",
        icon: <AlertCircle className="w-4 h-4" />,
        label: "Pending Approval",
        border: "border-yellow-300"
      },
      approved: {
        bg: "bg-gradient-to-r from-blue-100 to-cyan-100",
        text: "text-blue-700",
        icon: <Clock className="w-4 h-4" />,
        label: "Awaiting Payment",
        border: "border-blue-300"
      },
      confirmed: {
        bg: "bg-gradient-to-r from-green-100 to-emerald-100",
        text: "text-green-700",
        icon: <CheckCircle2 className="w-4 h-4" />,
        label: "Confirmed ✓",
        border: "border-green-300"
      },
      completed: {
        bg: "bg-gradient-to-r from-green-100 to-emerald-100",
        text: "text-green-700",
        icon: <CheckCircle2 className="w-4 h-4" />,
        label: "Completed ✓",
        border: "border-green-300"
      },
      cancelled: {
        bg: "bg-gradient-to-r from-red-100 to-rose-100",
        text: "text-red-700",
        icon: <XCircle className="w-4 h-4" />,
        label: "Cancelled",
        border: "border-red-300"
      },
       rejected: {
        bg: "bg-gradient-to-r from-red-100 to-rose-100",
        text: "text-red-700",
        icon: <XCircle className="w-4 h-4" />,
        label: "Rejected",
        border: "border-red-300"
      },
      
    };
    return configs[status] || configs.pending;
  };

  if (loading) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20 space-y-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="h-12 w-12 text-green-600" />
        </motion.div>
        <p className="text-gray-600 font-medium">Loading your bookings...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          My Bookings
        </h1>
        <p className="text-gray-600">
          Manage and track all your court bookings in one place
        </p>
      </motion.div>

      {/* Bookings Grid */}
      {bookings.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-lg p-12 text-center border-2 border-dashed border-gray-300"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-4"
          >
            <Calendar className="w-16 h-16 mx-auto text-gray-400" />
          </motion.div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No bookings yet</h3>
          <p className="text-gray-500">Start booking your favorite courts to see them here!</p>
        </motion.div>
      ) : (
        <div className="grid gap-6">
          <AnimatePresence>
            {bookings.map((booking, index) => {
              const statusConfig = getStatusConfig(booking.booking_status);
              
              return (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 ${statusConfig.border}`}
                >
                  {/* Status Banner */}
                  <div className={`${statusConfig.bg} px-6 py-3 flex items-center justify-between`}>
                    <div className={`flex items-center gap-2 ${statusConfig.text} font-semibold`}>
                      {statusConfig.icon}
                      <span>{statusConfig.label}</span>
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-xs bg-white/50 backdrop-blur-sm px-3 py-1 rounded-full"
                    >
                      ID: #{booking.id}
                    </motion.div>
                  </div>

                  <div className="p-6 space-y-4">
                    {/* Court Name */}
                    <div className="flex items-start justify-between">
                      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <MapPin className="w-6 h-6 text-green-600" />
                        {booking.court_name || booking.court?.name}
                      </h2>
                    </div>

                    {/* Date and Time Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-3 bg-blue-50 p-4 rounded-xl border border-blue-200"
                      >
                        <div className="bg-blue-500 p-2 rounded-lg">
                          <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 font-medium">Booking Date</p>
                          <p className="text-sm font-bold text-gray-900">{booking.booking_date}</p>
                        </div>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-3 bg-orange-50 p-4 rounded-xl border border-orange-200"
                      >
                        <div className="bg-orange-500 p-2 rounded-lg">
                          <Clock className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 font-medium">Time Slot</p>
                          <p className="text-sm font-bold text-gray-900">
                            {booking.start_time} - {booking.end_time}
                          </p>
                        </div>
                      </motion.div>
                    </div>

                    {/* Payment Info */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-green-600" />
                          <span className="font-bold text-gray-800">Payment Details</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Total Amount:</span>
                          <span className="font-bold text-gray-900">
                            Rs {booking.total_amount || booking.amount}
                          </span>
                        </div>
                        {(booking.booking_status === "approved" || booking.booking_status === "confirmed") && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Remaining Cash:</span>
                            <span className="font-bold text-orange-600">
                              Rs {booking.remaining_cash ?? "0"}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {booking.booking_status === "approved" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-3 pt-2"
                      >
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-bold hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={() => handlePayAdvance(booking)}
                          disabled={processingPayment === booking.id}
                        >
                          {processingPayment === booking.id ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              >
                                <Loader2 className="w-5 h-5" />
                              </motion.div>
                              Processing...
                            </>
                          ) : (
                            <>
                              <CreditCard className="w-5 h-5" />
                              Pay Advance
                            </>
                          )}
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 bg-gradient-to-r from-red-600 to-rose-600 text-white py-3 rounded-xl font-bold hover:from-red-700 hover:to-rose-700 transition-all shadow-lg flex items-center justify-center gap-2"
                          onClick={() => setCancelData(booking)}
                        >
                          <XCircle className="w-5 h-5" />
                          Cancel Booking
                        </motion.button>
                      </motion.div>
                    )}

                    {/* Confirmed Message */}
                    {booking.booking_status === "confirmed" && (
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 rounded-xl flex items-center gap-3 shadow-lg"
                      >
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <CheckCircle2 className="w-6 h-6" />
                        </motion.div>
                        <div>
                          <p className="font-bold">Booking Confirmed!</p>
                          <p className="text-sm text-green-50">
                            Your advance payment has been received. See you at the court!
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Cancel Modal */}
      <AnimatePresence>
        {cancelData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => {
              setCancelData(null);
              setCancelReason("");
            }}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white p-6 relative">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setCancelData(null);
                    setCancelReason("");
                  }}
                  className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full"
                >
                  <X className="w-5 h-5" />
                </motion.button>
                <XCircle className="w-12 h-12 mb-3" />
                <h2 className="text-2xl font-bold">Cancel Booking</h2>
                <p className="text-red-100 text-sm mt-1">
                  Are you sure you want to cancel this booking?
                </p>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">Court:</p>
                  <p className="font-bold text-gray-900">
                    {cancelData.court_name || cancelData.court?.name}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">Date & Time:</p>
                  <p className="font-semibold text-gray-800">
                    {cancelData.booking_date} • {cancelData.start_time} - {cancelData.end_time}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Reason for Cancellation *
                  </label>
                  <textarea
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    placeholder="Please tell us why you're cancelling..."
                    className="w-full border-2 border-gray-200 rounded-xl p-3 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all resize-none"
                    rows="4"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-bold hover:bg-gray-300 transition-all"
                    onClick={() => {
                      setCancelData(null);
                      setCancelReason("");
                    }}
                  >
                    Keep Booking
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-gradient-to-r from-red-600 to-rose-600 text-white py-3 rounded-xl font-bold hover:from-red-700 hover:to-rose-700 transition-all shadow-lg"
                    onClick={handleConfirmCancel}
                  >
                    Yes, Cancel
                  </motion.button>
                </div>
>>>>>>> Stashed changes
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
<<<<<<< Updated upstream
}
=======
};

export default MyBookings;
>>>>>>> Stashed changes
