export const MovieView = ({ movie, onBackClick }) => {
  console.log(movie.title, movie.imageURL);
  
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
    </div>
  );
};
