import { useState } from "react";
import "./style.css";

function FormValidation() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  function handleValidate(event) {}
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
              onChange={handleValidation}
              value={username}
            />
            <span></span>
          </div>
          <div className="form-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              onChange={handleValidation}
              placeholder="Enter your email"
              value={email}
            />
            <span></span>
          </div>
          <div className="form-wrapper">
            <label htmlFor="username">Password</label>
            <input
              type="text"
              id="password"
              value={password}
              onChange={handleValidation}
              password="Enter your password"
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
