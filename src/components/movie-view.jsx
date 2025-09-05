import PropTypes from "prop-types";

export const MovieView = ({ movie, movies, onBackClick, onMovieClick }) => {
  if (!movie) return null;

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
      <button onClick={onBackClick}>Back</button>
      <div>
        <button
          onClick={() => {
            setUser(null);
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
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
  }).isRequired,
  movies: PropTypes.array.isRequired,
  onBackClick: PropTypes.func.isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
