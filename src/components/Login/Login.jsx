import React, { useState } from "react";
import axios from "axios"; 
import "./Login.css";
import { Assets } from "../../utils/assets.js";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const loginData = {
      email,
      password,
    };

    console.log("Form Submitted:", loginData);

    try {

        const response = await axios.post("https://example.com/api/login", loginData);
  
        // Assuming the server sends a response like:
        // { message: "Login successful", username: "JohnDoe"}

        if (response.data.username) {

          localStorage.setItem("username", response.data.username);
          console.log("Username stored in localStorage:", response.data.username);
  
          alert("Login successful!");
          navigate("/home"); 
          
        } else {
          alert("Login failed. Username not received.");
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("Login failed. Please try again.");
      }
    };

  return (
    <div className="login-container">
      <div className="header">
        <img
          src={Assets.logo} // Logo imported from assets
          alt="Web Plus Academy"
          className="logo"
        />
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update state on input change
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update state on input change
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Login
        </button>
      </form>
      <div className="footer">
        <span>Don't have an account?</span>
        <a href="/signup" className="register-link">
          Signup
        </a>
      </div>
    </div>
  );
};

export default LoginForm;
