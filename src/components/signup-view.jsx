import { useState } from "react";

export const SignupView = ({ onBackToLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = { username, password, email, birthday };

    fetch("https://movie-api-2025-9f90ce074c45.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Signup successful! You can now log in.");
          if (onBackToLogin) onBackToLogin();
        } else {
          alert("Signup failed!");
        }
      })
      .catch((error) => {
        console.error("Signup error:", error);
        alert("Signup failed: network error");
      });
  };

  return (
    <form className="pixel-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>

      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3"
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
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label>
        Birthday:
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </label>

      <button type="submit">Submit</button>

      {onBackToLogin && (
        <button type="button" className="back-btn" onClick={onBackToLogin}>
          Indietro
        </button>
      )}
    </form>
  );
};
