import { useState, useEffect } from "react";
import { MovieCard } from "./movie-card";
import { MovieView } from "./movie-view";
import { LoginView } from "./login-view";
import { SignupView } from "./signup-view";
import Button from "react-bootstrap/Button";

export const MainView = () => {
  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(storedToken);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    if (!token) return;

    fetch("https://movie-api-2025-9f90ce074c45.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesWithId = data.map((movie, index) => ({
          ...movie,
          _id: movie._id || index.toString(),
        }));
        setMovies(moviesWithId);
      })
      .catch((error) => console.error("Fetch error:", error));
  }, [token]);

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

  if (!user) {
    return showLogin ? (
      <LoginView
        onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", token);
        }}
        onSwitchToSignup={() => setShowLogin(false)}
      />
    ) : (
      <SignupView
        onSignedUp={(user) => {
          // Dopo la registrazione, mostra login
          setShowLogin(true);
        }}
        onSwitchToLogin={() => setShowLogin(true)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div className="main-view">
      <p>Welcome, {user.username}!</p>
      <Button
        variant="primary"
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      >
        Logout
      </Button>

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
