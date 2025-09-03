// Main view component
import { useState } from "react";
// Importing components
import { MovieCard } from "./movie-card";
import { MovieView } from "./movie-view";
// Importing images
const lotrImage = new URL("../img/lotr.jpg", import.meta.url).href;
const matrixImage = new URL("../img/matrix.jpg", import.meta.url).href;
const inceptionImage = new URL("../img/inception.jpg", import.meta.url).href;
const starWarsImage = new URL("../img/star_wars.jpg", import.meta.url).href;
const pulpFictionImage = new URL("../img/pulp_fiction.jpg", import.meta.url)
  .href;
const theGodfatherImage = new URL("../img/the_godfather.jpg", import.meta.url)
  .href;
const forrestGumpImage = new URL("../img/forrest_gump.jpg", import.meta.url)
  .href;
const theDarkKnightImage = new URL(
  "../img/the_dark_knight.jpg",
  import.meta.url
).href;
const interstellarImage = new URL("../img/interstellar.jpg", import.meta.url)
  .href;
const gladiatorImage = new URL("../img/gladiator.jpg", import.meta.url).href;
const silenceOfLambsImage = new URL(
  "../img/silence_of_lambs.jpg",
  import.meta.url
).href;

// MainView component
export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "The Lord of the Rings",
      description:
        "Epic fantasy adventure based on the novel by J.R.R. Tolkien.",
      genre: { name: "Fantasy", description: "Epic fantasy adventure." },
      director: { name: "Peter Jackson", bio: "New Zealand filmmaker" },
      year: 2001,
      actors: ["Elijah Wood", "Ian McKellen"],
      imageURL: lotrImage,
      featured: true,
    },
    {
      id: 2,
      title: "The Matrix",
      description: "A hacker discovers the shocking truth about reality.",
      genre: { name: "Sci-Fi", description: "Science fiction thriller." },
      director: { name: "Lana Wachowski", bio: "American director" },
      year: 1999,
      actors: ["Keanu Reeves", "Laurence Fishburne"],
      imageURL: matrixImage,
      featured: true,
    },
    {
      id: 3,
      title: "Inception",
      description: "A skilled thief enters dreams to steal secrets.",
      genre: { name: "Sci-Fi", description: "Science fiction thriller." },
      director: {
        name: "Christopher Nolan",
        bio: "British-American filmmaker",
      },
      year: 2010,
      actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Kate Winslet"],
      imageURL: inceptionImage,
      featured: false,
    },
    {
      id: 4,
      title: "Star Wars: A New Hope",
      description: "A young farmer joins a rebellion against an evil empire.",
      genre: { name: "Sci-Fi", description: "Science fiction adventure." },
      director: { name: "George Lucas", bio: "American filmmaker" },
      year: 1977,
      actors: ["Mark Hamill", "Harrison Ford", "Carrie Fisher"],
      imageURL: starWarsImage,
      featured: true,
    },
    {
      id: 5,
      title: "Pulp Fiction",
      description:
        "A series of interconnected stories set in the criminal underworld of Los Angeles.",
      genre: { name: "Crime", description: "Crime drama." },
      director: {
        name: "Quentin Tarantino",
        bio: "American director and screenwriter",
      },
      year: 1994,
      actors: ["John Travolta", "Samuel L. Jackson", "Uma Thurman"],
      imageURL: pulpFictionImage,
      featured: false,
    },
    {
      id: 6,
      title: "The Godfather",
      description:
        "The aging patriarch of an organized crime dynasty transfers control to his reluctant son.",
      genre: { name: "Crime", description: "Crime drama." },
      director: { name: "Francis Ford Coppola", bio: "American filmmaker" },
      year: 1972,
      actors: ["Marlon Brando", "Al Pacino", "James Caan"],
      imageURL: theGodfatherImage,
      featured: false,
    },
    {
      id: 7,
      title: "Forrest Gump",
      description:
        "Historical events unfold through the perspective of an Alabamaan named Forrest Gump.",
      genre: { name: "Drama", description: "Drama / Romance" },
      director: { name: "Robert Zemeckis", bio: "American filmmaker" },
      year: 1994,
      actors: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
      imageURL: forrestGumpImage,
      featured: false,
    },
    {
      id: 8,
      title: "The Dark Knight",
      description: "Joker emerges from his past and causes chaos on Gotham.",
      genre: { name: "Action", description: "Superhero / Action" },
      director: {
        name: "Christopher Nolan",
        bio: "British-American filmmaker",
      },
      year: 2008,
      actors: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
      imageURL: theDarkKnightImage,
      featured: false,
    },
    {
      id: 9,
      title: "Interstellar",
      description: "A team of explorers travel through a wormhole in space.",
      genre: { name: "Sci-Fi", description: "Science fiction adventure." },
      director: {
        name: "Christopher Nolan",
        bio: "British-American filmmaker",
      },
      year: 2014,
      actors: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
      imageURL: interstellarImage,
      featured: false,
    },
    {
      id: 10,
      title: "Gladiator",
      description: "A former Roman General seeks vengeance after betrayal.",
      genre: { name: "Action", description: "Historical action drama." },
      director: { name: "Ridley Scott", bio: "British filmmaker" },
      year: 2000,
      actors: ["Russell Crowe", "Joaquin Phoenix", "Connie Nielsen"],
      imageURL: gladiatorImage,
      featured: false,
    },
    {
      id: 11,
      title: "The Silence of the Lambs",
      description:
        "A young FBI cadet seeks help from a killer to catch another.",
      genre: {
        name: "Thriller",
        description: "Psychological thriller / Crime",
      },
      director: { name: "Jonathan Demme", bio: "American filmmaker" },
      year: 1991,
      actors: ["Jodie Foster", "Anthony Hopkins", "Scott Glenn"],
      imageURL: silenceOfLambsImage,
      featured: false,
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div className="main-view">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(movie) => setSelectedMovie(movie)}
        />
      ))}
    </div>
  );
};
