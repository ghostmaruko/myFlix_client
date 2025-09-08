import React, { useState } from "react";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";

export const SignupView = ({ onSignedUp, onSwitchToLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const data = { username, password, email, birthday };

    fetch("https://movie-api-2025-9f90ce074c45.herokuapp.com/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        if (data.username) {
          onSignedUp(data);
        } else {
          setError("Signup failed. Check your details.");
          setPassword("");
          setShake(true);
          setTimeout(() => setShake(false), 500);
        }
      })
      .catch((e) => {
        console.error("Signup error:", e);
        setIsLoading(false);
        setError("Something went wrong. Try again later.");
        setShake(true);
        setTimeout(() => setShake(false), 500);
        setPassword("");
      });
  };

  return (
    <Container style={{ maxWidth: "400px", marginTop: "50px" }} className={shake ? "shake" : ""}>
      <h2 className="mb-4">Registrati</h2>
      <Form onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form.Group className="mb-3" controlId="signupUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter Username"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="signupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter Password"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="signupEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter Email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="signupBirthday">
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mb-3" disabled={isLoading}>
          {isLoading ? (
            <>
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />{" "}
              Signing up...
            </>
          ) : (
            "Sign Up"
          )}
        </Button>
      </Form>

      <div className="text-center">
        <small>
          Hai già un account?{" "}
          <Button variant="link" onClick={onSwitchToLogin} style={{ padding: 0 }}>
            Login qui
          </Button>
        </small>
      </div>
    </Container>
  );
};
