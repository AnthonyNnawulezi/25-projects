import { useState } from "react";
import "./style.css";

function FormValidation() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  function validateData(event) {
    const value = event.target.value;

    switch (name) {
      case "username":
        username.length < 3
          ? setError("username must be at least 3 characters")
          : "";

        break;
      case "email":
        "/^[^\s@]+@[^\s@]+\.[^\s@]+$/".test(value)
          ? setError("Invalid email format")
          : "";

        break;
      case "password":
        password < 6 ? setError("password must be at least 6 characters") : "";

        break;

      default:
        break;
    }
  }

  function handleUsername(event) {
    setUsername(event.target.value);
    validateData(event);
  }
  function handleEmail(event) {
    setEmail(event.target.value);
    validateData(event);
  }
  function handlePassword(event) {
    setPassword(event.target.value);
    validateData(event);
  }

  function onSubmit(key, value) {}

  return (
    <div>
      <h1>Simple Form Validation</h1>
      <div className="form-container">
        <form action="" onSubmit={onSubmit} method="post">
          <div className="form-wrapper">
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              onChange={handleUsername}
              value={username}
              name="username"
            />
            <span>{error}</span>
          </div>
          <div className="form-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              onChange={handleEmail}
              placeholder="Enter your email"
              value={email}
              name="email"
            />
            <span>{error}</span>
          </div>
          <div className="form-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="number"
              id="password"
              value={password}
              onChange={handlePassword}
              password="Enter your password"
              name="password"
            />
            <span>{error}</span>
          </div>
          <button type="button">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default FormValidation;
