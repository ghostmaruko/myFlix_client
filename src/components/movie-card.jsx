import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

export const MovieCard = ({ movie }) => {
  const imageUrl = movie.imageURL
    ? `https://movie-api-2025-9f90ce074c45.herokuapp.com/img/${movie.imageURL}`
    : null;

  return (
    <Link to={`/movies/${movie._id}`} className="text-decoration-none">
      <Card className="h-100 movie-card">
        {imageUrl ? (
          <Card.Img
            variant="top"
            src={imageUrl}
            alt={movie.title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/img/fallback.png"; // fallback locale
            }}
          />
        ) : (
          <div
            className="d-flex align-items-center justify-content-center bg-secondary text-white"
            style={{ height: "200px" }}
          >
            Image not available
          </div>
        )}
        <Card.Body>
          <Card.Title className="text-center">{movie.title}</Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imageURL: PropTypes.string,
  }).isRequired,
};
