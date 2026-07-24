import { useState } from "react";
import "./style.css";

function FormValidation() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  function validateData(event) {
    const { name } = event.target;

    switch (name) {
      case username:
        username.length < 3
          ? setError("Username must be at least 3 characters")
          : "";

        break;
      case email:
        email.test("/^[^\s@]+@[^\s@]+\.[^\s@]+$/")
          ? setError("Invalid email format")
          : "";

        break;
      case password:
        password < 6 ? setError("password must be at least 6 characters") : "";

        break;

      default:
        break;
    }
  }

  function handleUsername(event) {
    setUsername(event.target.value);
  }
  function handleEmail(event) {
    setUserEmail(event.target.value);
  }
  function handlePassword(event) {
    setUserPassword(event.target.value);
  }

  function onSubmit() {}

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
            <span></span>
          </div>
          <div className="form-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              onChange={validateData}
              placeholder="Enter your email"
              value={email}
              name="email"
            />
            <span></span>
          </div>
          <div className="form-wrapper">
            <label htmlFor="username">Password</label>
            <input
              type="text"
              id="password"
              value={password}
              onChange={validateData}
              password="Enter your password"
              name="password"
            />
            <span></span>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default FormValidation;
