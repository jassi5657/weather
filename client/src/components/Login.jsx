import React, { useState } from "react";
import "./login.css"; // Make sure to include your CSS file
import { notification } from "antd";
import { useLoginMutation } from "../api/userSlice/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate()

const [login] = useLoginMutation()

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await login({ email, password }).unwrap();
    // Assuming the token is returned in the response
    const token = response.token; // Adjust based on your API response structure
    localStorage.setItem('token', token); // Store token in local storage
    localStorage.setItem('email', email); // Store email in local storage
    notification.success({ message: 'Login successful!' });
    // Redirect or perform any other action after successful login
    navigate("/")
    
  } catch (err) {
    setError(err.data?.message || 'Login failed. Please try again.');
  }
};
  return (
    <div>
      <header>
        <div className="logo">
          <img src="logo.png" alt="Logo" />
        </div>
        <h1>Hi, welcome back!</h1>
        <p>
          First time here? <span className="text-white">Sign up for free</span>
        </p>
      </header>
      <form onSubmit={handleSubmit}>
        
        <input 
          type="email" 
          name="email" 
          placeholder="Your email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          minLength="6" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p>Password must be at least 6 characters</p>

        {error && <p className="error">{error}</p>} {/* Display error message */}

        <button type="submit">Sign in</button>

        <p className="text-white">New User? <span><Link to="/signup">Sign Up</Link></span></p>
        
      </form>
    </div>
  );
};

export default Login;