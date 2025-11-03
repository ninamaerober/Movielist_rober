import { useState, useEffect } from "react";

function MovieCard({ movie }) {
  const [details, setDetails] = useState(null);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const API_KEY = "3ae4907c";

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&t=${movie.Title}`
      );
      const data = await response.json();
      if (data.Response === "True") setDetails(data);
    };
    fetchDetails();
  }, [movie.Title]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.some((fav) => fav.Title === movie.Title));
  }, [movie.Title]);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      favorites = favorites.filter((fav) => fav.Title !== movie.Title);
    } else {
      favorites.push(movie);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  const openTrailer = () => {
    const query = encodeURIComponent(`${movie.Title} trailer`);
    const youtubeUrl = `https://www.youtube.com/results?search_query=${query}`;
    window.open(youtubeUrl, "_blank");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating || !feedback.trim()) {
      alert("Please select a rating and enter feedback.");
      return;
    }
    alert(`✅ Thank you for your feedback!\n\nRating: ${rating}⭐\nMessage: ${feedback}`);
    setRating(0);
    setFeedback("");
    setShowModal(false);
  };

  return (
    <>
      {/* Movie Card */}
      <div
        className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl shadow-lg p-3 text-center 
        transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer relative group"
        onClick={() => setShowModal(true)}
      >
        {/* Favorite Heart */}
        <button
          onClick={toggleFavorite}
          className="absolute bottom-1 right-1 -translate-x-2 text-2xl transition-transform duration-100 hover:scale-110"
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>

        {/* Poster */}
        <div className="overflow-hidden rounded-lg mb-3">
          <img
            src={
              details?.Poster && details.Poster !== "N/A"
                ? details.Poster
                : "https://via.placeholder.com/300x450?text=No+Image"
            }
            alt={movie.Title}
            className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        {/* Title & Info */}
        <h2 className="font-bold text-lg text-white truncate">{details?.Title || movie.Title}</h2>
        <p className="text-sm text-gray-400">{details?.Genre || "N/A"}</p>
        <p className="text-sm text-gray-500">{movie.Year}</p>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-gray-900 text-gray-200 rounded-xl shadow-2xl w-full md:w-3/4 lg:w-1/2 max-h-[90vh] overflow-y-auto p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-gray-400 hover:text-white text-2xl"
            >
              &times;
            </button>

            {/* Movie Info */}
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={
                  details?.Poster && details.Poster !== "N/A"
                    ? details.Poster
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={details?.Title}
                className="w-full md:w-1/3 rounded-lg shadow-md"
              />

              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-3 text-white">{details?.Title}</h2>
                <p><span className="font-semibold text-blue-400">Genre:</span> {details?.Genre || "N/A"}</p>
                <p><span className="font-semibold text-blue-400">Country:</span> {details?.Country || "N/A"}</p>
                <p><span className="font-semibold text-blue-400">Release:</span> {details?.Released || "N/A"}</p>
                <p><span className="font-semibold text-blue-400">Director:</span> {details?.Director || "N/A"}</p>
                <p><span className="font-semibold text-blue-400">Cast:</span> {details?.Actors || "N/A"}</p>
                <p><span className="font-semibold text-blue-400">IMDb Rating:</span> ⭐ {details?.imdbRating || "N/A"}</p>

                <button
                  onClick={openTrailer}
                  className="mt-4 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow-md transition"
                >
                  🎬 Watch Trailer
                </button>
              </div>
            </div>

            {/* Feedback Section */}
            <form onSubmit={handleSubmit} className="mt-6 bg-gray-800 p-5 rounded-lg">
              <h3 className="font-semibold text-lg text-center mb-3 text-white">
                Rate & Review
              </h3>

              {/* Stars */}
              <div className="flex justify-center mb-3 space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-3xl ${
                      star <= rating ? "text-yellow-400" : "text-gray-500 hover:text-yellow-400"
                    } transition-colors`}
                  >
                    ★
                  </button>
                ))}
              </div>

              {/* Feedback Box */}
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full border border-gray-700 bg-gray-900 rounded-md p-2 text-sm text-white focus:ring-2 focus:ring-blue-500"
                placeholder="Write your feedback..."
                rows={3}
              />

              <button
                type="submit"
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition font-semibold"
              >
                Submit Feedback
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default MovieCard;
