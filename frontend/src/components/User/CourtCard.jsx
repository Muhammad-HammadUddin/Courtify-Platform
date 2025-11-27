import React from "react";
import { Link } from "react-router-dom";
<<<<<<< Updated upstream
=======
import { Star, MapPin, Clock, DollarSign, Heart, Zap, Award, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "@/utils/axios";
import { API_PATH } from "@/utils/apiPath";
import { toast } from "react-toastify";
>>>>>>> Stashed changes

export default function CourtCard({
  court,
  isFav = false,
  onAddFavourite,
  onRemoveFavourite,
}) {
  const canBook = !court.maintenance;

<<<<<<< Updated upstream
  // Handle heart click
=======
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [averageRating, setAverageRating] = useState(court.average_rating || 0);
  const [reviewsCount, setReviewsCount] = useState(court.reviews?.length || 0);
  const [isHovered, setIsHovered] = useState(false);
  const [showRatingTooltip, setShowRatingTooltip] = useState(false);

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
     
      fetchAverageRating();
    } catch (err) {
      toast.error("Failed to submit rating");
    } finally {
      setLoading(false);
    }
  };

>>>>>>> Stashed changes
  const handleFavouriteClick = () => {
    if (isFav) {
      onRemoveFavourite?.();
      toast.info("Removed from favorites");
    } else {
      onAddFavourite?.();
      toast.success("Added to favorites ❤️");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 relative group"
    >
      {/* Image Container with Parallax Effect */}
      <div className="relative h-56 bg-gradient-to-br from-green-100 to-emerald-100 overflow-hidden">
        <motion.img
          src={court.image_url || "/placeholder.svg"}
          alt={court.name || "Court Image"}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.4 }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Maintenance Badge with Animation */}
        <AnimatePresence>
          {court.maintenance && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-1"
            >
              <Zap className="w-3 h-3" />
              Maintenance
            </motion.div>
          )}
        </AnimatePresence>

        {/* Favourite Button with Heart Animation */}
        <motion.button
          whileHover={{ scale: 1.2, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleFavouriteClick}
          className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all"
        >
          <Heart
            className={`w-5 h-5 transition-all ${
              isFav ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
        </motion.button>

        {/* Price Badge - Animated on Hover */}
        <motion.div
          initial={{ x: -100 }}
          animate={{ x: isHovered ? 0 : -100 }}
          className="absolute bottom-4 left-0 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-r-full shadow-lg flex items-center gap-2"
        >
          <DollarSign className="w-4 h-4" />
          <span className="font-bold text-lg">Rs {court.hourly_rate ?? "N/A"}</span>
          <span className="text-xs opacity-80">/hour</span>
        </motion.div>

        {/* Average Rating Badge */}
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: isHovered ? 0 : -100 }}
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg flex items-center gap-1"
        >
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="font-bold text-sm">{averageRating.toFixed(1)}</span>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="p-5 space-y-3">
        {/* Title with Gradient */}
        <motion.h3
          layout
          className="font-bold text-gray-900 text-xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
        >
          {court.name || "Unnamed Court"}
        </motion.h3>

<<<<<<< Updated upstream
=======
        {/* Location with Icon */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-gray-600 text-sm"
        >
          <MapPin className="w-4 h-4 text-green-500" />
          <span>{court.location || "Location not available"}</span>
        </motion.div>

>>>>>>> Stashed changes
        {/* Description */}
        {court.description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0.7 }}
            className="text-gray-500 text-sm line-clamp-2"
          >
            {court.description}
          </motion.p>
        )}

<<<<<<< Updated upstream
        {/* Rating & Reviews */}
        {court.rating != null && (
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span className="text-yellow-400">⭐</span>
            <span className="font-semibold">{court.rating}</span>
            {court.reviews != null && <span>({court.reviews} reviews)</span>}
          </div>
        )}

        {/* Price and Book Button */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold text-green-600">
            Rs {court.hourly_rate ?? "N/A"}
=======
        {/* Interactive Star Rating */}
        <div className="relative">
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-500 mr-2 font-medium">Your Rating:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.div
                key={star}
                whileHover={{ scale: 1.3, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
              >
                <Star
                  className={`w-5 h-5 cursor-pointer transition-all ${
                    (hoverRating || rating) >= star
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                  onMouseEnter={() => {
                    setHoverRating(star);
                    setShowRatingTooltip(true);
                  }}
                  onMouseLeave={() => {
                    setHoverRating(0);
                    setShowRatingTooltip(false);
                  }}
                  onClick={() => handleRate(star)}
                />
              </motion.div>
            ))}
            <AnimatePresence>
              {loading && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="ml-2"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Rating Tooltip */}
          <AnimatePresence>
            {showRatingTooltip && hoverRating > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute -top-8 left-0 bg-gray-900 text-white text-xs px-2 py-1 rounded"
              >
                Rate {hoverRating} star{hoverRating > 1 ? "s" : ""}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Average Rating Display with Icon */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-orange-50 px-3 py-2 rounded-lg border border-yellow-200"
        >
          <Award className="w-4 h-4 text-yellow-500" />
          <span className="text-sm font-semibold text-gray-700">
            {averageRating.toFixed(1)}
>>>>>>> Stashed changes
          </span>
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          {reviewsCount > 0 && (
            <span className="text-xs text-gray-500">({reviewsCount} reviews)</span>
          )}
        </motion.div>

        {/* Operating Hours */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-1 text-xs text-gray-600"
          >
            <Clock className="w-3 h-3 text-green-500" />
            <span className="font-medium">{court.opening_time || "-"}</span>
          </motion.div>
          <div className="text-xs text-gray-400">to</div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-1 text-xs text-gray-600"
          >
            <Clock className="w-3 h-3 text-red-500" />
            <span className="font-medium">{court.closing_time || "-"}</span>
          </motion.div>
        </div>

<<<<<<< Updated upstream
        {/* Opening & Closing Time */}
        <div className="flex justify-between text-sm text-slate-500 mt-1">
          <span>Open: {court.opening_time || "-"}</span>
          <span>Close: {court.closing_time || "-"}</span>
        </div>
=======
        {/* Book Button with Animation */}
        <motion.div
          whileHover={{ scale: canBook ? 1.02 : 1 }}
          whileTap={{ scale: canBook ? 0.98 : 1 }}
        >
          <Link to={canBook ? `/courts/${court.id}` : "#"}>
            <button
              disabled={!canBook}
              className={`w-full py-3 rounded-xl font-bold transition-all relative overflow-hidden ${
                canBook
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg hover:shadow-xl"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              {canBook && (
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                  style={{ opacity: 0.2 }}
                />
              )}
              <span className="relative z-10 flex items-center justify-center gap-2">
                {canBook ? (
                  <>
                    <TrendingUp className="w-4 h-4" />
                    Book Now
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    Under Maintenance
                  </>
                )}
              </span>
            </button>
          </Link>
        </motion.div>
>>>>>>> Stashed changes
      </div>

      {/* Hover Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        style={{
          boxShadow: "0 0 30px rgba(16, 185, 129, 0.3)",
        }}
      />
    </motion.div>
  );
}