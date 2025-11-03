function Header({ selectedGenre, setSelectedGenre }) {
  const genres = ["Action", "Comedies", "K-Dramas", "Horror", "Romance", "Hollywood"];

  return (
    <header className="bg-gradient-to-r from-gray-800 via-gray-600 to-gray-900 text-white w-full p-4 flex flex-col md:flex-row items-center justify-between shadow-lg">
      
      {/* Logo and Title */}
      <div className="flex items-center gap-3 mb-3 md:mb-0">
        <img 
          src="logomovie.png" 
          alt="Logo" 
          className="w-15 h-15 rounded-lg  hover:scale-105 transition-transform"
        />
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-400">
          CineHub
        </h1>
      </div>

      {/* Navigation Genres */}
      <nav className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm md:text-base font-medium">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(selectedGenre === genre ? "" : genre)}
            className={`relative transition-all duration-300 px-3 py-1 rounded-lg ${
              selectedGenre === genre
                ? "text-yellow-400 font-semibold after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-yellow-400"
                : "text-gray-300 hover:text-white hover:scale-105"
            }`}
          >
            {genre}
          </button>
        ))}
      </nav>
    </header>
  );
}

export default Header;
