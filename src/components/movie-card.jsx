import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { MovieModal } from "./movie-modal";


export const MovieCard = ({ movie, user, token, setUser }) => {
  const [showModal, setShowModal] = useState(false);

  const imageUrl = movie.imageURL
    ? movie.imageURL.startsWith("http")
      ? movie.imageURL
      : `https://movie-api-2025-9f90ce074c45.herokuapp.com/img/${movie.imageURL}`
    : null;

  return (
    <>
      <Card className="movie-card" onClick={() => setShowModal(true)}>
        {imageUrl ? (
          <Card.Img
            src={imageUrl}
            alt={movie.title}
            className="movie-cover"
            style={{ cursor: "pointer", borderRadius: "8px", objectFit: "cover", height: "300px" }}
          />
        ) : (
          <div
            className="d-flex align-items-center justify-content-center bg-secondary text-white"
            style={{ height: "300px", borderRadius: "8px" }}
          >
            Image not available
          </div>
        )}
      </Card>

      {showModal && (
        <MovieModal
          movie={movie}
          user={user}
          token={token}
          setUser={setUser}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  user: PropTypes.object,
  token: PropTypes.string,
  setUser: PropTypes.func,
};
