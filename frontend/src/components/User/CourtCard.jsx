import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function CourtCard({ court }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      {/* Image Container */}
      <div className="relative h-48 bg-slate-200 overflow-hidden group">
        <img
          src={court.image || "/placeholder.svg"}
          alt={court.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Availability Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              court.available
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {court.available ? "Available" : "Booked"}
          </span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 left-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        >
          <span>{isFavorite ? "❤️" : "🤍"}</span>
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-slate-900 text-lg mb-1">{court.name}</h3>
        <p className="text-slate-600 text-sm mb-3 flex items-center gap-1">
          📍 {court.location}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-yellow-400">⭐</span>
          <span className="font-semibold text-slate-900">{court.rating}</span>
          <span className="text-slate-500 text-sm">
            ({court.reviews} reviews)
          </span>
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-green-600">
            {court.price}
          </span>
          <button
            disabled={!court.available}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              court.available
                ? "bg-green-500 text-white hover:bg-green-600 active:scale-95"
                : "bg-slate-300 text-slate-500 cursor-not-allowed"
            }`}
          >
            <Link to={`/courts/${court.id}`}>
            Book Now</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
