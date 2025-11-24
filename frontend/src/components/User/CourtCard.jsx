import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import axiosInstance from "@/utils/axios";
import { API_PATH } from "@/utils/apiPath";
import { toast } from "react-toastify";

export default function CourtCard({
  court,
  isFav = false,
  onAddFavourite,
  onRemoveFavourite,
}) {
  const canBook = !court.maintenance;

  const [rating, setRating] = useState(0); // current user rating
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [averageRating, setAverageRating] = useState(court.average_rating || 0);
  const [reviewsCount, setReviewsCount] = useState(court.reviews?.length || 0);

  // Fetch current user's rating for this court
  const fetchMyRating = async () => {
    try {
      const res = await axiosInstance.get(API_PATH.REVIEWS.MY_REVIEWS, { withCredentials: true });
      const myCourtReview = res.data.reviews.find(r => r.court_id === court.id);
      if (myCourtReview && myCourtReview.rating) setRating(myCourtReview.rating);
    } catch (err) {
      console.log("Error fetching rating", err);
    }
  };

  // Fetch average rating from backend
  const fetchAverageRating = async () => {
    try {
      const res = await axiosInstance.get(API_PATH.REVIEWS.BY_COURT(court.id), { withCredentials: true });
      setAverageRating(res.data.average_rating || 0);
      setReviewsCount(res.data.reviews?.length || 0);
    } catch (err) {
      console.log("Error fetching average rating", err);
    }
  };

  useEffect(() => {
    fetchMyRating();
    fetchAverageRating();
  }, []);

  const handleRate = async (rate) => {
    try {
      setLoading(true);
      await axiosInstance.post(
        API_PATH.REVIEWS.GIVE_RATING,
        { court_id: court.id, rating: rate },
        { withCredentials: true }
      );
      setRating(rate);
      toast.success(`You rated ${court.name} ${rate} ⭐`);
      fetchAverageRating(); // update average after rating
    } catch (err) {
      toast.error("Failed to submit rating");
    } finally {
      setLoading(false);
    }
  };

  const handleFavouriteClick = () => {
    if (isFav) {
      onRemoveFavourite?.();
    } else {
      onAddFavourite?.();
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 relative">
      {/* Image Container */}
      <div className="relative h-48 bg-slate-200 overflow-hidden group">
        <img
          src={court.image_url || "/placeholder.svg"}
          alt={court.name || "Court Image"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Maintenance Badge */}
        {court.maintenance && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Maintenance
          </div>
        )}

        {/* Favourite Button */}
        <button
          onClick={handleFavouriteClick}
          className="absolute top-3 left-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        >
          <span className={`${isFav ? "text-red-500" : "text-gray-400"} text-lg`}>
            {isFav ? "❤️" : "🤍"}
          </span>
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="font-bold text-slate-900 text-lg">{court.name || "Unnamed Court"}</h3>
        <p className="text-slate-600 text-sm flex items-center gap-1">
          📍 {court.location || "Location not available"}
        </p>

        {court.description && (
          <p className="text-slate-500 text-sm">{court.description}</p>
        )}

        {/* Current User Rating */}
        <div className="flex items-center gap-1">
          {[1,2,3,4,5].map(star => (
            <Star
              key={star}
              className={`w-5 h-5 cursor-pointer ${
                (hoverRating || rating) >= star ? "text-yellow-400" : "text-gray-300"
              }`}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => handleRate(star)}
            />
          ))}
          {loading && <span className="text-sm text-slate-500 ml-2">Saving...</span>}
        </div>

        {/* Average Rating Display */}
        <div className="flex items-center gap-2 text-sm text-slate-600 mt-1">
          <span className="text-yellow-400">⭐</span>
          <span className="font-semibold">{averageRating}</span>
          {reviewsCount > 0 && <span>({reviewsCount} reviews)</span>}
        </div>

        {/* Price and Book Button */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold text-green-600">
            Rs {court.hourly_rate ?? "N/A"}
          </span>
          <button
            disabled={!canBook}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              canBook
                ? "bg-green-500 text-white hover:bg-green-600 active:scale-95"
                : "bg-slate-300 text-slate-500 cursor-not-allowed"
            }`}
          >
            <Link to={`/courts/${court.id}`}>Book Now</Link>
          </button>
        </div>

        <div className="flex justify-between text-sm text-slate-500 mt-1">
          <span>Open: {court.opening_time || "-"}</span>
          <span>Close: {court.closing_time || "-"}</span>
        </div>
      </div>
    </div>
  );
}
