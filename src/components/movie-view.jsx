import React from "react";
import PropTypes from "prop-types";
import { useParams, Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m._id === movieId);

  if (!movie) return <div>Movie not found</div>;

  const { title, description, genre, director, imageURL, year, actors } = movie;

  return (
    <div className="movie-view">
      <div className="movie-poster">
        <img
          src={
            imageURL.startsWith("http")
              ? imageURL
              : `https://movie-api-2025-9f90ce074c45.herokuapp.com/img/${imageURL}`
          }
          alt={title}
        />
      </div>

      <div className="movie-details">
        <h2>{title}</h2>
        <p>{description}</p>
        <p>
          <strong>Genre:</strong> {genre.name} - {genre.description}
        </p>
        <p>
          <strong>Director:</strong> {director.name} - {director.bio}
        </p>
        <p>
          <strong>Year:</strong> {year}
        </p>
        <p>
          <strong>Actors:</strong> {actors.join(", ")}
        </p>
      </div>

      <div className="mt-3">
        <Link to="/">
          <button>Back to Movies</button>
        </Link>
      </div>
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      genre: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
      }),
      director: PropTypes.shape({
        name: PropTypes.string,
        bio: PropTypes.string,
      }),
      imageURL: PropTypes.string,
      year: PropTypes.number,
      actors: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
};
