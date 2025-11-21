import React from "react";
import PropTypes from "prop-types";
import { Modal, Button, Row, Col } from "react-bootstrap";

const API_URL = "https://myflix-api-0vxe.onrender.com";

export const MovieModal = ({ movie, user, token, setUser, onClose }) => {
  const isFavorite = user?.favoriteMovies?.includes(movie._id);

  const toggleFavorite = () => {
    if (!user || !token) return;

    const method = isFavorite ? "DELETE" : "POST";
    fetch(`${API_URL}/users/${user.username}/movies/${movie._id}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      })
      .catch((err) => {
        console.error("Toggle favorite error:", err);
      });
  };

  const imageUrl = movie.imageURL
    ? movie.imageURL.startsWith("http")
      ? movie.imageURL
      : `${API_URL}/img/${movie.imageURL}`
    : null;

  return (
    <Modal show={true} onHide={onClose} size="lg" centered>
      <Modal.Body>
        <Row>
          <Col md={5}>
            {imageUrl ? (
              <img src={imageUrl} alt={movie.title} style={{ width: "100%", borderRadius: "8px" }} />
            ) : (
              <div className="d-flex align-items-center justify-content-center bg-secondary text-white" style={{ height: "300px", borderRadius: "8px" }}>
                Image not available
              </div>
            )}
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
        <Button variant="secondary" onClick={onClose}>Close</Button>
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
