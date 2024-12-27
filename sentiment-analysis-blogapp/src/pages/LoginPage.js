import React, { useState } from "react";
import axios from "axios";
import "../styles/LoginPage.css";

const handleRegister=()=>{
  window.location.href = "/register"; // Redirect to Register Page
}

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/auth/login", { email, password });
      alert("Login Successful!");
      window.location.href = "/home"; // Redirect to Home Page
    } catch (error) {
      alert("Login Failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <button type="button" onClick={handleRegister}>Register Here</button>
    </div>
  );
};

export default LoginPage;
