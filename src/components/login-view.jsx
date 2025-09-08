import React, { useState } from "react";
import { Form, Button, Container, Spinner } from "react-bootstrap";

export const LoginView = ({ onLoggedIn, onSwitchToSignUp }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // stato per il loading

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(""); //reset error
    setIsLoading(true); //attiva spinner

    const data = { username, password };

    fetch("https://movie-api-2025-9f90ce074c45.herokuapp.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false); //disattiva spinner
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          setError("Login failed. Please check your username and password");
        }
      })
      .catch((e) => {
        console.error("Login error:", e);
        setIsLoading(false);
        setError("Something went wrong. Please try again later");
      });
  };

  return (
    <Container style={{ maxWidth: "400px", marginTop: "50px" }}>
      <h2 className="mb-4">Login</h2>
      <Form onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form.Group className="mb-3" controlId="loginUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter Username"
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="loginPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter Password"
          ></Form.Control>
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="w-100"
          disabled={"isLoading"}
        >
          {isLoading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />{" "}
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </Button>
      </Form>

      <div className="text-center">
        <small>
          Non hai un account?{" "}
          <Button
            variant="link"
            onClick={onSwitchToSignUp}
            style={{ padding: 0 }}
          >
            Clicca qui per registrati
          </Button>
        </small>
      </div>
    </Container>
  );
};
