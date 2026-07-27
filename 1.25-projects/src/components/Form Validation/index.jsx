import { useState } from "react";
import "./style.css";

function FormValidation() {
  const MIN_USERNAME_LENGTH = 3;
  const MIN_PASSWORD_LENGTH = 6;
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateField(name, value) {
    switch (name) {
      case "username":
        return value.trim().length < MIN_USERNAME_LENGTH
          ? `Username must be at least ${MIN_USERNAME_LENGTH} characters`
          : "";
      case "email":
        return !EMAIL_REGEX.test(value) ? "Invalid email format" : "";
      case "password":
        return value.length < MIN_PASSWORD_LENGTH
          ? `Password must be at least ${MIN_PASSWORD_LENGTH} characters`
          : "";
      default:
        return "";
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  }

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
            <span>{errors.username}</span>
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
            <span>{errors.email}</span>
          </div>
          <div className="form-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePassword}
              placeholder="Enter your password"
              name="password"
            />
            <span>{errors.password}</span>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default FormValidation;
