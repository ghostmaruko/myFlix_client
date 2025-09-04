// Main view component
import { useState, useEffect } from "react";
// Importing components
import { MovieCard } from "./movie-card";
import { MovieView } from "./movie-view";

// MainView component
export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Fetch movies from API
  useEffect(() => {
    fetch("https://movie-api-2025-9f90ce074c45.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched movies:", data);
        setMovies(data);
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  // If a movie is selected, show the MovieView
  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        movies={movies}
        onBackClick={() => setSelectedMovie(null)}
        onMovieClick={(movie) => setSelectedMovie(movie)}
      />
    );
  }

  // If no movies, show a message
  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  // Main view with list of movies
  return (
    <div className="main-view">
      {movies.map((movie) => (
        <MovieCard
          key={movie.title} // usa il titolo come key
          movie={movie}
          onMovieClick={(movie) => setSelectedMovie(movie)}
        />
      ))}
    </div>
  );
};
