import React from "react";
import { Button } from "@/components/ui/button";

export function SlotGrid({ slots, onSlotSelect, selectedSlot, bookedSlots = [], selectedDate }) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {slots.map(slot => {
        // Assign the selected date to each slot for comparison
        const slotWithDate = { ...slot, date: selectedDate };

        const isBooked = bookedSlots.some(
          b => b.date === slotWithDate.date && b.startTime === slotWithDate.startTime
        );

        return (
          <button
            key={slot.startTime}
            disabled={isBooked}
            onClick={() => onSlotSelect(slotWithDate)}
            className={`px-3 py-1 rounded-lg transition-all ${
              isBooked
                ? "bg-red-200 text-red-700 cursor-not-allowed"
                : selectedSlot?.startTime === slot.startTime
                ? "bg-green-500 text-white"
                : "bg-green-100 hover:bg-green-300"
            }`}
          >
            {slot.startTime} - {slot.endTime}
          </button>
        );
      })}
    </div>
  );
}
