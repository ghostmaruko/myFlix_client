import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

const API_URL = "https://myflix-api-0vxe.onrender.com";

export const SignupView = ({ onSignedUp, onSwitchToLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    const body = { username, password, email, birthday };
    console.log("Signup body:", body); // log per debug

    fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.message || "Signup failed");
          });
        }
        return res.json();
      })
      .then((user) => {
        console.log("Signup success:", user);
        setSuccessMessage("Account created successfully! You can now log in.");
        setUsername("");
        setPassword("");
        setEmail("");
        setBirthday("");
        if (onSignedUp) onSignedUp();
      })
      .catch((err) => {
        console.error("Signup error:", err);
        setErrorMessage(err.message);
      });
  };

  return (
    <div className="signup-view">
      <h2 className="mb-4">Sign Up</h2>

      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="signupUsername" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
            autoComplete="username"
          />
        </Form.Group>

        <Form.Group controlId="signupPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
            autoComplete="new-password"
          />
        </Form.Group>

        <Form.Group controlId="signupEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
            autoComplete="email"
          />
        </Form.Group>

        <Form.Group controlId="signupBirthday" className="mb-3">
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </Form.Group>

        <div className="d-flex gap-2">
          <Button type="submit" variant="primary">
            Sign Up
          </Button>
          <Button variant="secondary" onClick={onSwitchToLogin}>
            Back to Login
          </Button>
        </div>
      </Form>
    </div>
  );
};
