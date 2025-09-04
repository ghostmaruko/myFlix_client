import PropTypes from "prop-types";
import { MovieCard } from "./movie-card";

export const MovieView = ({ movie, movies, onBackClick, onMovieClick }) => {
  console.log(movie.title, movie.imageURL);

  const similarMovies = movies.filter(
    (m) => m.genre.name === movie.genre.name && m._id !== movie._id
  );

  return (
    <div className="movie-view">
      <img src={movie.imageURL} alt={movie.title} />

      <h2>
        {movie.title} ({movie.year})
      </h2>
      <p>
        <strong>Description:</strong> {movie.description}
      </p>
      <p>
        <strong>Genre:</strong> {movie.genre.name} – {movie.genre.description}
      </p>
      <p>
        <strong>Director:</strong> {movie.director.name} – {movie.director.bio}
      </p>
      <p>
        <strong>Actors:</strong> {movie.actors.join(", ")}
      </p>
      {movie.featured && (
        <p>
          <strong>🌟 Featured Movie!</strong>
        </p>
      )}
      <button onClick={onBackClick}>Back</button>

      {similarMovies.length > 0 && (
        <>
          <hr />
          <h3>Similar Movies:</h3>
          <div className="similar-movies">
            {similarMovies.map((m) => (
              <MovieCard key={m._id} movie={m} onMovieClick={onMovieClick} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// PropTypes
MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    imageURL: PropTypes.string,
    genre: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
    }),
    director: PropTypes.shape({
      name: PropTypes.string,
      bio: PropTypes.string,
    }),
    actors: PropTypes.arrayOf(PropTypes.string),
    year: PropTypes.number,
    featured: PropTypes.bool,
  }).isRequired,
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      genre: PropTypes.shape({
        name: PropTypes.string,
      }),
    })
  ).isRequired,
  onBackClick: PropTypes.func.isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
