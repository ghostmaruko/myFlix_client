import React, { useState, useEffect } from "react";
import { MovieCard } from "./movie-card";
import { MovieView } from "./movie-view";
import { LoginView } from "./login-view";
import { SignupView } from "./signup-view";
import { Navbar, Nav, Container, Button } from "react-bootstrap";


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
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

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

  if (!user) {
    return showLogin ? (
      <LoginView
        onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }}
        onSwitchToSignup={() => setShowLogin(false)}
      />
    ) : (
      <SignupView
        onSignedUp={(user) => setUser(user)}
        onSwitchToLogin={() => setShowLogin(true)}
      />
    );
  }

  if (selectedMovie) {
    return (
      <>
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-3">
          <Container>
            <Navbar.Brand>Welcome, {user.username}</Navbar.Brand>
            <Nav className="ms-auto">
              <Button variant="outline-light" className="me-2">
                Film preferiti
              </Button>
              <Button variant="outline-light" onClick={handleLogout}>
                Logout
              </Button>
            </Nav>
          </Container>
        </Navbar>
        <MovieView
          movie={selectedMovie}
          movies={movies}
          onBackClick={() => setSelectedMovie(null)}
          onMovieClick={(movie) => setSelectedMovie(movie)}
        />
      </>
    );
  }

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-3">
        <Container>
          <Navbar.Brand>Welcome, {user.username}</Navbar.Brand>
          <Nav className="ms-auto">
            <Button variant="outline-light" className="me-2">
              Film preferiti
            </Button>
            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Container>
      </Navbar>

      <div className="movies-grid">
        {movies.length === 0 ? (
          <div>The list is empty!</div>
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onMovieClick={(movie) => setSelectedMovie(movie)}
            />
          ))
        )}
      </div>
    </>
  );
};
