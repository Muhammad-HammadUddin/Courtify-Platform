import React, { useState } from "react";
import CourtCard from "./CourtCard.jsx"; // Make sure this path matches your file name

const mockCourts = [
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
    name: "Badminton Arena Pro",
    location: "North District",
    rating: 4.6,
    reviews: 89,
    price: "$15/hour",
    image: "/badminton-court.png",
    sport: "Badminton",
    available: true,
  },
  {
    id: 3,
    name: "Tennis Paradise",
    location: "West End",
    rating: 4.9,
    reviews: 156,
    price: "$30/hour",
    image: "/outdoor-tennis-court.png",
    sport: "Tennis",
    available: false,
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
  {
    id: 5,
    name: "Volleyball Court Elite",
    location: "Beach Area",
    rating: 4.5,
    reviews: 67,
    price: "$18/hour",
    image: "/outdoor-volleyball-court.png",
    sport: "Volleyball",
    available: true,
  },
  {
    id: 6,
    name: "Cricket Ground Premium",
    location: "Outskirts",
    rating: 4.8,
    reviews: 143,
    price: "$35/hour",
    image: "/cricket-ground.jpg",
    sport: "Cricket",
    available: true,
  },
];

export default function SearchCourts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSport, setSelectedSport] = useState("all");

  const sports = [
    "all",
    "Football",
    "Badminton",
    "Tennis",
    "Basketball",
    "Volleyball",
    "Cricket",
  ];

  const filteredCourts = mockCourts.filter((court) => {
    const matchesSearch =
      court.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      court.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSport =
      selectedSport === "all" || court.sport === selectedSport;
    return matchesSearch && matchesSport;
  });

  return (
    <div className="space-y-6 p-6">
      {/* Search Bar */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search courts by name, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-10 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <span className="absolute left-3 top-3.5 text-slate-400">🔍</span>
        </div>
        <button className="px-6 py-3 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 font-medium text-slate-700 transition-colors">
          🎛️ Filter
        </button>
      </div>

      {/* Sport Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {sports.map((sport) => (
          <button
            key={sport}
            onClick={() => setSelectedSport(sport)}
            className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
              selectedSport === sport
                ? "bg-green-500 text-white shadow-md"
                : "bg-white text-slate-700 border border-slate-300 hover:border-green-500"
            }`}
          >
            {sport}
          </button>
        ))}
      </div>

      {/* Courts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourts.map((court) => (
          <CourtCard key={court.id} court={court} />
        ))}
      </div>

      {filteredCourts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500 text-lg">
            No courts found matching your search.
          </p>
        </div>
      )}
    </div>
  );
}
