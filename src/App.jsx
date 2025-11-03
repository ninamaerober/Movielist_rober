import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import Footer from "./components/Footer";

const API_KEY = "3ae4907c";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("Avengers");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [bannerMovie, setBannerMovie] = useState(null);

  const fetchMovies = async (query) => {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
    const data = await response.json();
    if (data.Search) {
      setMovies(data.Search);
      setBannerMovie(data.Search[0]); 
    } else {
      setMovies([]);
      setBannerMovie(null);
    }
  };

  useEffect(() => {
    fetchMovies("Avengers");
  }, []);

  useEffect(() => {
    if (selectedGenre) fetchMovies(selectedGenre);
  }, [selectedGenre]);

  const openTrailer = (movieTitle) => {
    const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
      movieTitle + " trailer"
    )}`;
    window.open(youtubeSearchUrl, "_blank");
  };

  const getBannerImage = (posterUrl) =>
    posterUrl && posterUrl !== "N/A"
      ? posterUrl
      : "https://via.placeholder.com/1200x600?text=No+Image+Available";

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white">
      <Header selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} />

      <div className="flex justify-end items-center w-full max-w-7xl mx-auto px-6 mt-6">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={() => fetchMovies(searchTerm)}
        />
      </div>

      {bannerMovie && (
        <div
          className="relative flex items-end justify-start w-full h-[420px] mt-8 rounded-2xl overflow-hidden shadow-lg max-w-7xl mx-auto transition-all duration-300"
          style={{
            backgroundImage: `url(${getBannerImage(bannerMovie.Poster)})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-60" />
          <div className="relative z-10 p-8 max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold drop-shadow-md">
              {bannerMovie.Title}
            </h2>
            <p className="text-gray-300 mt-2 text-sm md:text-base">
              Released: {bannerMovie.Year}
            </p>
            <button
              onClick={() => openTrailer(bannerMovie.Title)}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
            >
              ▶ Watch Trailer
            </button>
          </div>
        </div>
      )}

      {/* 🎬 Movie Cards Section */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-10 flex flex-col items-center">
        {movies.length > 0 ? (
          <MovieList movies={movies} onSelectMovie={openTrailer} />
        ) : (
          <div className="text-center mt-16 text-gray-400 text-lg">
            🎥 No movies found. Try another search!
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
