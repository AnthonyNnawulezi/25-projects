import { useState } from "react";
import {
  auth,
  loginUsingEmailAndPassword,
  registerUsingEmailAndPassword,
} from "../../firebase-config";
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
        <label htmlFor="">Email:</label>
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
        <label htmlFor="">Password:</label>
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
        <label htmlFor="">Email:</label>
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
        <label htmlFor="">Password:</label>
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

  const [user, loading, error] = useAuthState(auth);

  console.log(registerData);

  function registerUser() {
    const { name, email, password } = registerData;
    // call login function from firebase-config
    registerUsingEmailAndPassword(name, email, password);
  }

  function loginUser() {
    const { email, password } = loginData;
    loginUsingEmailAndPassword(email, password);
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
      {user && <Todo authInfo={{ user, loading, error }} />}
    </div>
  );
}

export default UnAuthPage;
