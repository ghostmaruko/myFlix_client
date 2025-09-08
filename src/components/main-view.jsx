import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { MovieCard } from "./movie-card";
import { MovieView } from "./movie-view";
import { LoginView } from "./login-view";
import { SignupView } from "./signup-view";
import { ProfileView } from "./profile-view";
import { NavigationBar } from "./navigation-bar";
import { Container } from "react-bootstrap";


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

  useEffect(() => {
    if (!token) return;

    fetch("https://movie-api-2025-9f90ce074c45.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
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
              ) : (
                <div className="movies-grid">
                  {movies.length === 0 ? (
                    <div>The list is empty!</div>
                  ) : (
                    movies.map((movie) => (
                      <MovieCard key={movie._id} movie={movie} />
                    ))
                  )}
                </div>
              )
            }
          />

          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <LoginView
                  onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                  }}
                />
              )
            }
          />

          <Route
            path="/signup"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <SignupView onSignedUp={() => setUser(null)} />
              )
            }
          />

          <Route
            path="/movies/:movieId"
            element={
              !user ? <Navigate to="/login" /> : <MovieView movies={movies} />
            }
          />

          {/* <Route
            path="/profile"
            element={
              !user ? (
                <Navigate to="/login" />
              ) : (
                <ProfileView user={user} token={token} movies={movies} />
              )
            }
          /> */}
        </Routes>
      </Container>
    </>
  );
};
