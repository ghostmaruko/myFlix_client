import React from "react";
import PropTypes from "prop-types";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);

  if (!movie) return <div className="text-center mt-5">Movie not found</div>;

  const { title, description, genre, director, imageURL, year, actors } = movie;

  const posterUrl = imageURL?.startsWith("http")
    ? imageURL
    : `https://movie-api-2025-9f90ce074c45.herokuapp.com/img/${imageURL}`;

  return (
    <Container className="mt-4">
      <Row className="g-4">
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src={posterUrl} alt={title} />
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>
                {title} ({year})
              </Card.Title>
              <Card.Text>{description}</Card.Text>
            </Card.Body>
            <ListGroup variant="flush">
              {genre && (
                <ListGroup.Item>
                  <strong>Genre:</strong> {genre.name} - {genre.description}
                </ListGroup.Item>
              )}
              {director && (
                <ListGroup.Item>
                  <strong>Director:</strong> {director.name} - {director.bio}
                </ListGroup.Item>
              )}
              {actors && actors.length > 0 && (
                <ListGroup.Item>
                  <strong>Actors:</strong> {actors.join(", ")}
                </ListGroup.Item>
              )}
            </ListGroup>
            <Card.Body className="mt-2">
              <Link to="/">
                <Button variant="primary">Back to Movies</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
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
