import { useState, useEffect } from "react";
import { MovieCard } from "./movie-card";
import { MovieView } from "./movie-view";
import { LoginView } from "./login-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (!token) return;

    fetch("https://movie-api-2025-9f90ce074c45.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }, // con bearer token accedo a rotte protette nel be (passport.authenticate("jwt"))
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesWithId = data.map((movie, index) => ({
          ...movie,
          _id: movie._id || index.toString(),
        }));
        console.log("Fetched movies:", moviesWithId);
        setMovies(moviesWithId);
      })
      .catch((error) => console.error("Fetch error:", error));
  }, [token]); // re-run quando cambia il token

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

  // setToken
  if (!user) {
    return (
      <LoginView
        onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }}
      />
    );
  }

  // Show a message if the movie list is empty
  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div className="main-view">
      <p>Welcome, {user.username}!</p>
      <button
        onClick={() => {
          setUser(null);
          setToken(null); // reset del token
        }}
      >
        Logout
      </button>

      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(movie) => setSelectedMovie(movie)}
        />
      ))}
    </div>
  );
};
