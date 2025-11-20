import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SlotGrid } from "../components/User/SlotGrid.jsx";
import { PageHeader } from "../components/User/PageHeader.jsx";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "@/utils/axios.js";
import { API_PATH } from "@/utils/apiPath";
import { generateTimeSlots, getNext7Days, getDateLabel } from "../lib/dummydata.js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BookingPage() {
  const { id } = useParams();
  const [court, setCourt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextDays = getNext7Days();
  const [selectedDate, setSelectedDate] = useState(nextDays[0]);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch court details
  useEffect(() => {
    const fetchCourt = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(API_PATH.COURT.COURT_BY_ID(id), { withCredentials: true });
        const courtData = res.data.court;
        setCourt(courtData);

        if (courtData) {
          setSlots(generateTimeSlots(courtData.opening_time, courtData.closing_time));
        }
      } catch (err) {
        console.error("Failed to fetch court details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourt();
  }, [id]);

  // Fetch bookings for this court
  useEffect(() => {
    const fetchBookings = async () => {
      if (!court) return;
      try {
        const res = await axiosInstance.get(API_PATH.BOOKINGS.GET_BOOKINGS_BY_COURT(court.id), { withCredentials: true });
        const booked = res.data.bookings.map(b => ({
          date: b.booking_date,
          startTime: b.start_time,
          endTime: b.end_time,
        }));
        setBookedSlots(booked);
        console.log(bookedSlots)
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      }
    };
    fetchBookings();
  }, [court]);

  // Update slots when date or court changes
  useEffect(() => {
    if (court && selectedDate) {
      setSlots(generateTimeSlots(court.opening_time, court.closing_time));
      setSelectedSlot(null);
    }
  }, [court, selectedDate]);

  if (loading) return <div className="text-center py-20 text-slate-500">Loading court details...</div>;
  if (!court) return <p className="text-center py-20 text-red-500">Court not found</p>;

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setIsModalOpen(true);
  };

  const handleConfirmBooking = async () => {
    if (isSubmitting || !selectedSlot) return;
    setIsSubmitting(true);

    try {
      await axiosInstance.post(
        API_PATH.BOOKINGS.CREATE_BOOKING,
        {
          court_id: court.id,
          booking_date: selectedDate,
          start_time: selectedSlot.startTime,
          end_time: selectedSlot.endTime,
        },
        { withCredentials: true }
      );

      toast.success("Booking request submitted successfully! ✅");

      // Close modal & clear selection
      setIsModalOpen(false);
      setSelectedSlot(null);

      // Refresh booked slots
      const res = await axiosInstance.get(API_PATH.BOOKINGS.GET_BOOKINGS_BY_COURT(court.id), { withCredentials: true });
      const booked = res.data.bookings.map(b => ({
        date: b.booking_date,
        startTime: b.start_time,
        endTime: b.end_time,
      }));
      setBookedSlots(booked);

    } catch (err) {
      console.error("Failed to create booking:", err);
      toast.error("Failed to submit booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFavorite = () => setIsFavorite(!isFavorite);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={3000} />

      <PageHeader title={court.name} subtitle={`Booking slots for ${court.location}`} />

      <div className="flex justify-between items-center mb-4">
        <Link to="/">
          <Button variant="ghost" className="text-green-600 hover:text-white hover:bg-green-500 transition-colors">← Back to Courts</Button>
        </Link>
        <button onClick={toggleFavorite} className="text-2xl">{isFavorite ? "❤️" : "🤍"}</button>
      </div>

      {/* Court Info */}
      <Card className="mb-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 border-l-4 border-green-500">
        <CardHeader>
          <CardTitle>Court Details</CardTitle>
          <CardDescription>{court.description || "No additional details provided."}</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 md:grid-cols-3 items-center">
          <div className="p-2 bg-green-100 rounded-lg text-green-800 font-semibold">Type: {court.type}</div>
          <div className="p-2 bg-yellow-100 rounded-lg text-yellow-800 font-semibold">Price: Rs {court.hourly_rate}</div>
          <div className="p-2 bg-blue-100 rounded-lg text-blue-800 font-semibold">Location: {court.location}</div>
          {court.maintenance && <div className="p-2 bg-red-100 rounded-lg text-red-800 font-semibold col-span-full">⚠️ Under Maintenance</div>}
        </CardContent>
      </Card>

      {/* Time Slots */}
      <Card className="mb-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Select a Time Slot</CardTitle>
          <CardDescription>Available slots in the next 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedDate} onValueChange={setSelectedDate}>
            <TabsList className="grid grid-cols-4 sm:grid-cols-7 gap-1 mb-4">
              {nextDays.map((day, index) => (
                <TabsTrigger key={day} value={day} className="hover:bg-green-500 hover:text-white transition-colors">
                  {getDateLabel(day, index)}
                </TabsTrigger>
              ))}
            </TabsList>

            {nextDays.map((day) => (
              <TabsContent key={day} value={day}>
                <SlotGrid
                  slots={slots}
                  onSlotSelect={handleSlotSelect}
                  selectedSlot={selectedSlot}
                  bookedSlots={bookedSlots}
                  selectedDate={day}
                />
              </TabsContent>
            ))}
          </Tabs>

          {/* Booking Modal */}
          <AnimatePresence>
            {selectedSlot && isModalOpen && (
              <motion.div
                className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl border-t-4 border-green-500"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                >
                  <h2 className="text-2xl font-bold mb-3 text-green-600">Confirm Booking</h2>
                  <p className="mb-4 text-gray-700">
                    Court: <span className="font-medium">{court.name}</span><br/>
                    Date: <span className="font-medium">{selectedDate}</span><br/>
                    Time: <span className="font-medium">{selectedSlot.startTime} - {selectedSlot.endTime}</span>
                  </p>
                  <div className="flex justify-end gap-4 mt-4">
                    <Button
                      onClick={handleConfirmBooking}
                      className="bg-green-600 hover:bg-green-700 transition-all transform active:scale-95"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Booking..." : "Confirm"}
                    </Button>
                    <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}
