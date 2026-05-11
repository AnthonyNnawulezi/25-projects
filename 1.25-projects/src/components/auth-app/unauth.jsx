import { useState } from "react";
import {
  auth,
  loginUsingEmailAndPassword,
  registerUsingEmailAndPassword,
} from "../../firebase-config/";
import { useAuthState } from "react-firebase-hooks/auth";
import Todo from "../todo";

function Registration({ formData, setFormData, registerUser }) {
  return (
    <div className="register">
      <div className="input-wrapper">
        <label htmlFor="name">Full Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div className="input-wrapper">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          id="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
      </div>

      <button onClick={registerUser}>Register</button>
    </div>
  );
}
function Login({ formData, setFormData, loginUser }) {
  return (
    <div className="login">
      <div className="input-wrapper">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div className="input-wrapper">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          id="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
      </div>
      <button onClick={loginUser}>Login</button>
    </div>
  );
}

function UnAuthPage() {
  const [activeTab, setActiveTab] = useState(false); // false = Register, true = Login
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const [user, loading, authError] = useAuthState(auth);

  console.log(registerData);

  function registerUser() {
    setError(""); // Clear previous errors
    const { name, email, password } = registerData;

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    registerUsingEmailAndPassword(name, email, password)
      .then(() => {
        setError("");
        setRegisterData({ name: "", email: "", password: "" });
      })
      .catch((err) => {
        setError(err.message || "Registration failed");
      });
  }

  function loginUser() {
    setError(""); // Clear previous errors
    const { email, password } = loginData;

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    loginUsingEmailAndPassword(email, password)
      .then(() => {
        setError("");
        setLoginData({ email: "", password: "" });
      })
      .catch((err) => {
        setError(err.message || "Login failed");
      });
  }

  return (
    <div className="unauth-page">
      <div className="tab-buttons">
        <button onClick={() => setActiveTab(false)} className="">
          Register
        </button>
        <button onClick={() => setActiveTab(true)} className="">
          Login
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="tab-content">
        {activeTab ? (
          <Login
            formData={loginData}
            setFormData={setLoginData}
            loginUser={loginUser}
          />
        ) : (
          <Registration
            formData={registerData}
            setFormData={setRegisterData}
            registerUser={registerUser}
          />
        )}
      </div>
      {user && <Todo authInfo={{ user, loading, error: authError }} />}
    </div>
  );
}

export default UnAuthPage;
