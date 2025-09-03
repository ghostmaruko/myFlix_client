export const MovieCard = ({ movie, onMovieClick }) => {
  console.log(movie.title, movie.imageURL);

  return (
    <div className="movie-card" onClick={() => onMovieClick(movie)}>
      <img src={movie.imageURL} alt={movie.title} width="200" />

      <h3>{movie.title}</h3>
    </div>
  );
};


