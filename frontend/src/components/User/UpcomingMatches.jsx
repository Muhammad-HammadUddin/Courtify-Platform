"use client";

import { useState } from "react";
import { MatchCard } from "./MatchCard";
import { MatchForm } from "./MatchForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const SPORT_ICONS = {
  Football: "⚽",
  Tennis: "🎾",
  Cricket: "🏏",
  Basketball: "🏀",
  Badminton: "🏸",
  Volleyball: "🏐",
  Swimming: "🏊",
  Running: "🏃",
};

function UpcomingMatches() {
  const [matches, setMatches] = useState([
    {
      id: "1",
      sport: "Football",
      location: "Central Park, NYC",
      dateTime: "2025-11-15 10:00 AM",
      message: "5v5 Friendly Match - Beginners Welcome",
      whatsappNumber: "+1234567890",
      icon: SPORT_ICONS.Football,
    },
    {
      id: "2",
      sport: "Tennis",
      location: "Riverside Courts, LA",
      dateTime: "2025-11-16 4:00 PM",
      message: "Looking for doubles partner",
      whatsappNumber: "+1987654321",
      icon: SPORT_ICONS.Tennis,
    },
    {
      id: "3",
      sport: "Cricket",
      location: "Sports Complex, SF",
      dateTime: "2025-11-17 6:00 PM",
      message: "T20 Match - Players needed",
      whatsappNumber: "+1555666777",
      icon: SPORT_ICONS.Cricket,
    },
    {
      id: "4",
      sport: "Basketball",
      location: "Downtown Court, Boston",
      dateTime: "2025-11-14 7:00 PM",
      message: "Pickup game - all levels",
      whatsappNumber: "+1222333444",
      icon: SPORT_ICONS.Basketball,
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const handleAddMatch = (newMatch) => {
    const match = {
      ...newMatch,
      id: Date.now().toString(),
      icon: SPORT_ICONS[newMatch.sport] || "🎯",
    };
    setMatches([match, ...matches]);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-2">
              Community Matches
            </h1>
            <p className="text-lg text-muted-foreground">
              Find your next game and connect with local sports enthusiasts
            </p>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 self-start sm:self-auto"
          >
            <Plus className="w-5 h-5" />
            Post a Match
          </Button>
        </div>
      </div>

      {/* Form Section */}
      {showForm && (
        <div className="max-w-7xl mx-auto mb-12 animate-in fade-in slide-in-from-top-4 duration-300">
          <MatchForm
            onSubmit={handleAddMatch}
            onCancel={() => setShowForm(false)}
            sports={Object.keys(SPORT_ICONS)}
          />
        </div>
      )}

      {/* Matches Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.length > 0 ? (
            matches.map((match) => <MatchCard key={match.id} match={match} />)
          ) : (
            <div className="text-center py-12 col-span-full">
              <p className="text-xl text-muted-foreground mb-4">
                No matches posted yet. Be the first to post!
              </p>
              <Button onClick={() => setShowForm(true)} variant="outline" size="lg">
                Post a Match
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UpcomingMatches;