import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";


export const MovieCard = ({ movie }) => {
  const imageUrl = movie.imageURL
    ? `https://movie-api-2025-9f90ce074c45.herokuapp.com/img/${movie.imageURL}`
    : null;

  return (
    <Link to={`/movies/${movie._id}`} className="movie-card text-decoration-none">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={movie.title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/img/fallback.png"; // fallback locale
          }}
        />
      ) : (
        <div className="image-fallback">Image not available</div>
      )}
      <h3>{movie.title}</h3>
    </Link>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imageURL: PropTypes.string,
  }).isRequired
};
