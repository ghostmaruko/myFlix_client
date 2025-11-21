import React, { useState } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { MovieCard } from "./movie-card";

const API_URL = "https://myflix-api-0vxe.onrender.com";

export const ProfileView = ({ user, token, movies, setUser }) => {
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birthday?.slice(0, 10) || "");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const favoriteMovies = movies.filter((m) =>
    user.favoriteMovies?.includes(m._id)
  );

  const handleUpdate = (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    fetch(`${API_URL}/users/${user.username}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        email,
        birthday,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Update failed");
        return res.json();
      })
      .then((updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setSuccessMessage("Profile updated successfully!");
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("Could not update profile.");
      });
  };

  const handleDeregister = () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;

    fetch(`${API_URL}/users/${user.username}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Delete failed");
        localStorage.clear();
        window.location.href = "/signup"; // redirect
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("Could not delete account.");
      });
  };

  return (
    <div className="profile-view">
      <h2 className="mb-4">Profile</h2>

      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      <Form onSubmit={handleUpdate} className="mb-4">
        <Row>
          <Col md={6}>
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank to keep current"
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="formBirthday" className="mb-3">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex gap-2">
          <Button type="submit" variant="primary">
            Update Profile
          </Button>

          <Button variant="danger" onClick={handleDeregister}>
            Delete Account
          </Button>
        </div>
      </Form>

      <h4 className="mt-5">Favorite Movies</h4>
      <Row className="mt-3 g-4">
        {favoriteMovies.length === 0 ? (
          <p>No favorite movies added.</p>
        ) : (
          favoriteMovies.map((movie) => (
            <Col key={movie._id} xs={12} sm={6} md={4} lg={3}>
              <MovieCard movie={movie} user={user} token={token} setUser={setUser} />
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};
