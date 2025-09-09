// movie-modal.js
import React from "react";
import PropTypes from "prop-types";
import { Modal, Button, Row, Col } from "react-bootstrap";

export const MovieModal = ({ movie, user, token, setUser, onClose }) => {
  const isFavorite = user?.FavoriteMovies?.includes(movie._id);

  const toggleFavorite = () => {
    if (!user || !token) return;

    const method = isFavorite ? "DELETE" : "POST";
    fetch(
      `https://movie-api-2025-9f90ce074c45.herokuapp.com/users/${user.username}/movies/${movie._id}`,
      {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      })
      .catch((err) => console.error(err));
  };

  return (
    <Modal show={true} onHide={onClose} size="lg" centered>
      <Modal.Body>
        <Row>
          <Col md={5}>
            <img
              src={movie.imageURL}
              alt={movie.title}
              style={{ width: "100%", borderRadius: "8px" }}
            />
          </Col>
          <Col md={7}>
            <h3>{movie.title}</h3>
            <p><strong>Genre:</strong> {movie.genre?.name}</p>
            <p><strong>Director:</strong> {movie.director?.name}</p>
            <p><strong>Year:</strong> {movie.year}</p>
            <p><strong>Actors:</strong> {movie.actors?.join(", ")}</p>
            <p>{movie.description}</p>

            {user && (
              <Button variant={isFavorite ? "danger" : "primary"} onClick={toggleFavorite}>
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </Button>
            )}
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

MovieModal.propTypes = {
  movie: PropTypes.object.isRequired,
  user: PropTypes.object,
  token: PropTypes.string,
  setUser: PropTypes.func,
  onClose: PropTypes.func.isRequired,
};
