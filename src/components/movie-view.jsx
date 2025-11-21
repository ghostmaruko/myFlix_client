import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";

const API_URL = "https://myflix-api-0vxe.onrender.com";

export const MovieView = () => {
  const location = useLocation();
  const movie = location.state?.movie;

  if (!movie) return <div className="text-center mt-5">Loading movie...</div>;

  const { title, description, genre, director, imageURL, year, actors } = movie;

  const posterUrl = imageURL
    ? imageURL.startsWith("http")
      ? imageURL
      : `${API_URL}/img/${imageURL}`
    : null;

  return (
    <Container className="mt-4">
      <Row className="g-4">
        <Col md={4}>
          <Card>
            {posterUrl ? (
              <Card.Img variant="top" src={posterUrl} alt={title} />
            ) : (
              <div
                className="d-flex align-items-center justify-content-center bg-secondary text-white"
                style={{ height: "400px", borderRadius: "8px" }}
              >
                Image not available
              </div>
            )}
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>{title} ({year})</Card.Title>
              <Card.Text>{description}</Card.Text>
            </Card.Body>
            <ListGroup variant="flush">
              {genre && <ListGroup.Item><strong>Genre:</strong> {genre.name} - {genre.description}</ListGroup.Item>}
              {director && <ListGroup.Item><strong>Director:</strong> {director.name} - {director.bio}</ListGroup.Item>}
              {actors?.length > 0 && <ListGroup.Item><strong>Actors:</strong> {actors.join(", ")}</ListGroup.Item>}
            </ListGroup>
            <Card.Body className="mt-2">
              <Link to="/"><Button variant="primary">Back to Movies</Button></Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
