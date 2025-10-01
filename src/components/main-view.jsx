import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { MovieCard } from "./movie-card";
import { MovieView } from "./movie-view";
import { LoginView } from "./login-view";
import { SignupView } from "./signup-view";
import { ProfileView } from "./profile-view";
import { NavigationBar } from "./navigation-bar";
import { Container, Row, Col } from "react-bootstrap";

export const MainView = () => {
  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [movies, setMovies] = useState([]);
  const [showSignup, setShowSignup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!token) return;

    fetch("https://movie-api-2025-9f90ce074c45.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched movies:", data); // Controlla i campi disponibili
        const moviesWithId = data.map((movie, index) => ({
          ...movie,
          _id: movie._id || index.toString(),
        }));
        setMovies(moviesWithId);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [token]);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  // Lista filtrata: protegge contro campi mancanti
  const filteredMovies = movies.filter((movie) =>
    ((movie.Title || movie.title || "").toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <NavigationBar user={user} onLogout={handleLogout} />

      <Container className="mt-4">
        <Routes>
          <Route
            path="/"
            element={
              !user ? (
                <Navigate to="/login" />
              ) : movies.length === 0 ? (
                <div className="text-center">The list is empty!</div>
              ) : (
                <>
                  {/* Search bar */}
                  <input
                    type="text"
                    placeholder="Search movies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-control mb-3"
                  />

                  <Row className="g-4">
                    {filteredMovies.map((movie) => (
                      <Col key={movie._id} xs={12} sm={6} md={4} lg={3}>
                        <MovieCard
                          key={movie._id}
                          movie={movie}
                          user={user}
                          token={token}
                          setUser={setUser}
                        />
                      </Col>
                    ))}
                  </Row>

                  {filteredMovies.length === 0 && (
                    <div className="text-center mt-3">
                      No movies found for "{searchTerm}"
                    </div>
                  )}
                </>
              )
            }
          />

          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" />
              ) : showSignup ? (
                <SignupView
                  onSignedUp={() => setShowSignup(false)}
                  onSwitchToLogin={() => setShowSignup(false)}
                />
              ) : (
                <LoginView
                  onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                  }}
                  onSwitchToSignup={() => setShowSignup(true)}
                />
              )
            }
          />

          <Route
            path="/movies/:movieId"
            element={
              !user ? <Navigate to="/login" /> : <MovieView movies={movies} />
            }
          />

          <Route
            path="/profile"
            element={
              !user ? (
                <Navigate to="/login" />
              ) : (
                <ProfileView user={user} token={token} movies={movies} />
              )
            }
          />
        </Routes>
      </Container>
    </>
  );
};
