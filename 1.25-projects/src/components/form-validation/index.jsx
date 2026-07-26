import { useState } from "react";
import "./style.css";

function FormValidation() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleFormChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateInput(name, value);
  }

  function validateInput(name, value) {
    switch (name) {
      case "username":
        setErrors((prev) => ({
          ...prev,
          username:
            value.length < 3 ? "Username must be at least 3 characters" : "",
        }));

        break;
      case "email":
        setErrors((prev) => ({
          ...prev,
          email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            ? ""
            : "invalid email address!",
        }));

        break;
      case "password":
        setErrors((prev) => ({
          ...prev,
          password:
            value.length < 5 ? "Password must be at least 5 characters" : "",
        }));

        break;

      default:
        break;
    }
  }

  console.log(formData);

  function handleSubmit(event) {
    event.preventDefault();
    const validateErrors = {};

    Object.keys(formData).forEach((dataItem) => {
      validateInput(dataItem, formData[dataItem]);
      if (errors[dataItem]) {
        validateErrors[dataItem] = errors[dataItem];
      }
    });

    setErrors((prev) => ({
      ...prev,
      ...validateErrors,
    }));

    if (Object.values(validateErrors).every((error) => error === "")) {
      //perform form submition logic
    } else {
      // there is error please fix
    }
  }

  return (
    <div>
      <h1>Simple Form Validation</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={formData.username}
            name="username"
            onChange={handleFormChange}
          />
          <span>{errors.username}</span>
        </div>
        <div className="input-wrapper">
          <label htmlFor="email">Eamil</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={formData.email}
            name="email"
            onChange={handleFormChange}
          />
          <span>{errors.email}</span>
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={formData.password}
            name="password"
            onChange={handleFormChange}
          />
          <span>{errors.password}</span>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FormValidation;
