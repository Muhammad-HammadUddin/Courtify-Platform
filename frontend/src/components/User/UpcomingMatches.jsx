"use client";

import { useState, useEffect } from "react";
import { MatchCard } from "./MatchCard";
import { MatchForm } from "./MatchForm";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import axiosInstance from "@/utils/axios";
import { API_PATH } from "@/utils/apiPath";
import { toast } from "react-toastify";

// ------------------------------------
// Inline Confirm Modal
// ------------------------------------
function ConfirmModal({ open, onClose, onConfirm, message }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <p className="mb-4 text-lg">{message || "Are you sure?"}</p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="destructive" onClick={onConfirm}>Confirm</Button>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------
// UpcomingMatches Component
// ------------------------------------
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

export default function UpcomingMatches() {
  const [matches, setMatches] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [matchToDelete, setMatchToDelete] = useState(null);

  // Current user
  const [currentUserId, setCurrentUserId] = useState(null);

  // ------------------------------------
  // Fetch current user
  // ------------------------------------
  const fetchCurrentUser = async () => {
    try {
      const res = await axiosInstance.get("/users/current", { withCredentials: true });
      setCurrentUserId(res.data.user.id);
    } catch (err) {
      console.error(err);
      toast.error("Failed to get current user");
    }
  };

  // ------------------------------------
  // Fetch matches
  // ------------------------------------
  const fetchMatches = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(API_PATH.MatchMaking.GET_MATCHES, { withCredentials: true });
      setMatches(res.data.matches || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch matches");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
    fetchMatches();
  }, []);

  // ------------------------------------
  // Add new match
  // ------------------------------------
  const handleAddMatch = async (matchData) => {
    try {
      const res = await axiosInstance.post(API_PATH.MatchMaking.CREATE_MATCH, matchData, {
        withCredentials: true,
      });
      toast.success(res.data.message || "Match created!");
      setMatches((prev) => [
        ...prev,
        { id: res.data.match_id, ...matchData, user_id: currentUserId },
      ]);
      setShowForm(false);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to create match");
    }
  };

  // ------------------------------------
  // Open modal before deletion
  // ------------------------------------
  const confirmDeleteMatch = (id) => {
    setMatchToDelete(id);
    setModalOpen(true);
  };

  // ------------------------------------
  // Delete match after confirming
  // ------------------------------------
  const handleDeleteMatch = async () => {
    if (!matchToDelete) return;

    try {
      const res = await axiosInstance.delete(
        API_PATH.MatchMaking.DELETE_MATCH(matchToDelete),
        { withCredentials: true }
      );
      toast.success(res.data.message || "Match deleted");
      setMatches((prev) => prev.filter((m) => m.id !== matchToDelete));
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to delete match");
    } finally {
      setModalOpen(false);
      setMatchToDelete(null);
    }
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
        {loading ? (
          <div className="text-center py-12 text-slate-500">Loading matches...</div>
        ) : matches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((match) => (
              <div key={match.id} className="relative">
                <MatchCard match={match} />
                {match.user_id === currentUserId && (
                  <Button
                    onClick={() => confirmDeleteMatch(match.id)}
                    size="sm"
                    variant="destructive"
                    className="absolute top-2 right-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground mb-4">
              No matches posted yet. Be the first to post!
            </p>
            <Button onClick={() => setShowForm(true)} variant="outline" size="lg">
              Post a Match
            </Button>
          </div>
        )}
      </div>

      {/* Confirm Delete Modal */}
      <ConfirmModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDeleteMatch}
        message="Are you sure you want to delete this match?"
      />
    </div>
  );
}
