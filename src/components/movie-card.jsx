import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div className="movie-card" onClick={() => onMovieClick(movie)}>
      {/* Immagine del film */}
      <img src={movie.imageURL} alt={movie.title} />

      {/* Titolo overlay */}
      <h3>{movie.title}</h3>
    </div>
  );
};

// PropTypes
/* MovieCard.propTypes = {
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
  onMovieClick: PropTypes.func.isRequired,
};
 */
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageURL: PropTypes.string,
    // _id: PropTypes.string,  // <- rimuovi o rendi opzionale
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
