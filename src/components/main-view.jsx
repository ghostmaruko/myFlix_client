import { useState, useEffect } from "react";
import { MovieCard } from "./movie-card";
import { MovieView } from "./movie-view";
import { LoginView } from "./login-view";
import { SignupView } from "./signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [view, setView] = useState("login"); // login o signup

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

  // Vista del singolo film
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

  // Login / Signup per utenti non autenticati
  if (!user) {
    return (
      <>
        {view === "login" ? (
          <>
            <LoginView
              onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
              }}
            />
            <p className="form-footer">
              Non hai un account?{" "}
              <button type="button" onClick={() => setView("signup")}>
                Registrati qui
              </button>
            </p>
          </>
        ) : (
          <>
            <SignupView onBackToLogin={() => setView("login")} />
            <p className="form-footer">
              Hai già un account?{" "}
              <button onClick={() => setView("login")}>Torna al login</button>
            </p>
          </>
        )}
      </>
    );
  }

  // Lista film per utenti loggati
  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <>
      {/* Navbar */}
      <div className="navbar">
        <div className="user-info">Welcome, {user.username}</div>
        <div>
          <button
            onClick={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
              setView("login");
            }}
          >
            Logout
          </button>
          <button style={{ marginLeft: "10px" }}>Favorites</button>
        </div>
      </div>

      {/* Griglia di film */}
      <div className="main-view">
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onMovieClick={(movie) => setSelectedMovie(movie)}
          />
        ))}
      </div>
    </>
  );
};
