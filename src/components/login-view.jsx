import React, { use, useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here
    const data = {
      username: username,
      password: password,
    };
    fetch("https://movie-api-2025-9f90ce074c45.herokuapp.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Login failed");
        }
        return response.json(); // ✅ Passaggio fondamentale
      })
      .then((userData) => {
        console.log("Login success:", userData);
        onLoggedIn(userData.user); // oppure `onLoggedIn(username)` se preferisci
      })
      .catch((error) => {
        alert("Login failed: " + error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        <button type="submit">Login</button>
      </label>
    </form>
  );
};
