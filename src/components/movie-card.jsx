import React from "react";
import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  // URL completo per l'immagine
  const imageUrl = movie.imageURL
    ? `https://movie-api-2025-9f90ce074c45.herokuapp.com/img/${movie.imageURL}`
    : null;

  return (
    <div className="movie-card" onClick={() => onMovieClick(movie)}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={movie.title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/img/fallback.png"; // immagine di fallback locale
          }}
        />
      ) : (
        <div className="image-fallback">Image not available</div>
      )}
      <h3>{movie.title}</h3>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    imageURL: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
