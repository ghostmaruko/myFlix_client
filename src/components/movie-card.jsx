import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

export const MovieCard = ({ movie, user, token, setUser }) => {
  const imageUrl = movie.imageURL || "/img/fallback.png";
  const isFavorite = user?.FavoriteMovies?.includes(movie._id);

  const toggleFavorite = () => {
    const method = isFavorite ? "DELETE" : "POST";

    fetch(
      `https://movie-api-2025-9f90ce074c45.herokuapp.com/users/${user.username}/movies/${movie._id}`,
      {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update favorites");
        return res.json();
      })
      .then((updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      })
      .catch((err) => console.error("Error updating favorites:", err));
  };

  return (
    <Card className="h-100 movie-card">
      <Link
        to={`/movies/${movie._id}`}
        state={{ movie }}
        className="text-decoration-none"
      >
        <Card.Img variant="top" src={imageUrl} alt={movie.title} />
      </Link>

      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title className="text-center">{movie.title}</Card.Title>
        {user && (
          <Button
            variant={isFavorite ? "danger" : "outline-primary"}
            onClick={toggleFavorite}
            className="mt-2"
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imageURL: PropTypes.string,
  }).isRequired,
  user: PropTypes.object,
  token: PropTypes.string,
  setUser: PropTypes.func,
};
