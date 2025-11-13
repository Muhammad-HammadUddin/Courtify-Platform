import React, { useState } from "react";
import CourtCard from "./CourtCard";

const mockFavoriteCourts = [
  {
    id: 1,
    name: "Green Valley Football Court",
    location: "Downtown, City Center",
    rating: 4.8,
    reviews: 124,
    price: "$25/hour",
    image: "/football-court.jpg",
    sport: "Football",
    available: true,
  },
  {
    id: 2,
    name: "Tennis Paradise",
    location: "West End",
    rating: 4.9,
    reviews: 156,
    price: "$30/hour",
    image: "/outdoor-tennis-court.png",
    sport: "Tennis",
    available: true,
  },
  {
    id: 4,
    name: "Basketball Hub",
    location: "Sports Complex",
    rating: 4.7,
    reviews: 102,
    price: "$20/hour",
    image: "/outdoor-basketball-court.png",
    sport: "Basketball",
    available: true,
  },
];

export default function FavoriteCourts() {
  const [favorites, setFavorites] = useState(mockFavoriteCourts);

  const handleRemove = (id) => {
    setFavorites(favorites.filter((court) => court.id !== id));
  };

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold text-slate-900">
        Your Favorite Courts
      </h2>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((court) => (
            <div key={court.id} className="relative">
              <CourtCard court={court} />
              <button
                onClick={() => handleRemove(court.id)}
                className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full hover:bg-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-slate-500 text-lg">
            No favorite courts yet. Add some to get started!
          </p>
        </div>
      )}
    </div>
  );
}
