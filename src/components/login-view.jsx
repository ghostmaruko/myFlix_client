import React, { useState } from "react";
import { Container, Form, Button, Alert, Spinner, Card } from "react-bootstrap";

const API_URL = "https://myflix-api-0vxe.onrender.com";

export const LoginView = ({ onLoggedIn, onSwitchToSignup }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        setIsLoading(false);
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.user && data.token) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn && onLoggedIn(data.user, data.token);
        } else {
          setError("Login failed. Check your username and password.");
          setShake(true);
          setTimeout(() => setShake(false), 500);
        }
      })
      .catch((e) => {
        console.error("Login error:", e);
        setIsLoading(false);
        setError("Something went wrong. Try again later.");
        setShake(true);
        setTimeout(() => setShake(false), 500);
      });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <Card className={`p-4 shadow ${shake ? "shake" : ""}`} style={{ width: "100%", maxWidth: "400px" }}>
        <Card.Body>
          <h2 className="mb-4 text-center">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="loginUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="Enter Username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="loginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Enter Password" />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </Form>

          <div className="text-center">
            <small>
              Non hai un account?{" "}
              <Button variant="link" onClick={onSwitchToSignup} style={{ padding: 0 }}>
                Registrati
              </Button>
            </small>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};
