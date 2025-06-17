import { useState } from "react";
import "./style.css";

function FormValidation() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validateInput = (name, value) => {
    let errorMsg = "";

    if (name === "username" && value.length < 6) {
      errorMsg = "Username must be at least 6 characters";
    } else if (name === "email" && !emailRegex.test(value)) {
      errorMsg = "Invalid email address";
    } else if (name === "password" && value.length < 5) {
      errorMsg = "Password must be at least 5 characters";
    }

    setErrors((prev) => ({
      ...prev,
      [name]: errorMsg,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateInput(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.entries(data).forEach(([key, value]) => {
      validateInput(key, value);

      if (key === "username" && value.length < 6) {
        newErrors[key] = "Username must be at least 6 characters";
      } else if (key === "email" && !emailRegex.test(value)) {
        newErrors[key] = "Invalid email address";
      } else if (key === "password" && value.length < 5) {
        newErrors[key] = "Password must be at least 5 characters";
      }
    });

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    if (!hasErrors) {
      console.log("Form submitted successfully:", data);
      // Perform actual submission logic here
    } else {
      console.log("Validation errors:", newErrors);
    }
  };

  return (
    <div className="form-container">
      <h1>Form Validation</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter Your Username"
            value={data.username}
            onChange={handleChange}
          />
          <span>{errors.username}</span>
        </div>

        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Your Email"
            value={data.email}
            onChange={handleChange}
          />
          <span>{errors.email}</span>
        </div>

        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Your Password"
            value={data.password}
            onChange={handleChange}
          />
          <span>{errors.password}</span>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FormValidation;
