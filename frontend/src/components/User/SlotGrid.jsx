import React from "react";
import { Button } from "@/components/ui/button";

export function SlotGrid({ slots, onSlotSelect, selectedSlot }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 animate-in fade-in duration-300">
      {slots.map((slot) => (
        <Button
          key={slot.id}
          onClick={() => !slot.isBooked && onSlotSelect(slot)}
          disabled={slot.isBooked}
          variant={selectedSlot?.id === slot.id ? "default" : "outline"}
          className={`w-full py-6 text-sm font-medium transition-all duration-200 ${
            slot.isBooked
              ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
              : selectedSlot?.id === slot.id
              ? "bg-accent text-accent-foreground hover:bg-accent/90 shadow-md scale-105"
              : "bg-white text-foreground hover:bg-primary/10 border border-border hover:border-primary hover:scale-105"
          }`}
        >
          <div className="flex flex-col gap-1">
            <span>{slot.startTime}</span>
            {slot.isBooked && <span className="text-xs">Booked</span>}
          </div>
        </Button>
      ))}
    </div>
  );
}
