import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SlotGrid } from "../components/User/SlotGrid.jsx";
import { PageHeader } from "../components/User/PageHeader.jsx";
import { COURTS, generateTimeSlots, getNext7Days, getDateLabel } from "../lib/dummydata.js";
import { motion, AnimatePresence } from "framer-motion";

export default function BookingPage() {
  const { id } = useParams();
  const court = COURTS.find((c) => c.id === id);

  const nextDays = getNext7Days();
  const [selectedDate, setSelectedDate] = useState(nextDays[0]);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (court && selectedDate) {
      setSlots(generateTimeSlots(court.openTime, court.closeTime));
      setSelectedSlot(null);
    }
  }, [court, selectedDate]);

  if (!court) return <p>Court not found</p>;

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setIsModalOpen(true);
  };

  const handleConfirmBooking = () => {
    alert(`✅ Booked ${court.name} on ${selectedDate} from ${selectedSlot.startTime} to ${selectedSlot.endTime}`);
    setIsModalOpen(false);
    setSelectedSlot(null);
    setSlots(generateTimeSlots(court.openTime, court.closeTime));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <PageHeader title={court.name} subtitle={`Booking slots for ${court.location}`} />

      <Link to="/">
        <Button variant="ghost" className="mb-4">← Back to Courts</Button>
      </Link>

      <Card className="mb-8 shadow-md">
        <CardHeader>
          <CardTitle>Court Timing</CardTitle>
          <CardDescription>
            Open: {court.openTime} | Close: {court.closeTime}
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="mb-8 shadow-md">
        <CardHeader>
          <CardTitle>Select a Time Slot</CardTitle>
          <CardDescription>Choose from available slots in the next 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedDate} onValueChange={setSelectedDate}>
            <TabsList className="grid grid-cols-4 sm:grid-cols-7 gap-1 mb-4">
              {nextDays.map((day, index) => (
                <TabsTrigger key={day} value={day}>{getDateLabel(day, index)}</TabsTrigger>
              ))}
            </TabsList>

            {nextDays.map((day) => (
              <TabsContent key={day} value={day}>
                <SlotGrid slots={slots} onSlotSelect={handleSlotSelect} selectedSlot={selectedSlot} />
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
                  className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                >
                  <h2 className="text-xl font-semibold mb-2">Confirm Booking</h2>
                  <p className="mb-4 text-gray-700">
                    Court: <span className="font-medium">{court.name}</span><br/>
                    Date: <span className="font-medium">{selectedDate}</span><br/>
                    Time: <span className="font-medium">{selectedSlot.startTime} - {selectedSlot.endTime}</span>
                  </p>
                  <div className="flex justify-end gap-4 mt-4">
                    <Button onClick={handleConfirmBooking} className="bg-green-600 hover:bg-green-700">Confirm</Button>
                    <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Map Section */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Location</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64 rounded-md overflow-hidden">
            <iframe
              title="Court Location"
              width="100%"
              height="100%"
              className="border-0"
              src={`https://www.google.com/maps?q=${encodeURIComponent(court.location)}&output=embed`}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
