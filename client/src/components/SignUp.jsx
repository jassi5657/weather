import React from "react";
import "./login.css"; // Make sure to include your CSS file
import { useAddUserMutation } from "../api/userSlice/userSlice";
import {notification} from "antd";
import { Link } from "react-router-dom";



const SignUp = () => {

  const [addUser] = useAddUserMutation()



  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(event.target); // Get form data
    const data = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      // Call the addUser  mutation with the form data
      const response = await addUser(data).unwrap();
      notification.success({ message: "User  Created Successfully" });
      // Optionally navigate to another page here
      navigate("/");
    } catch (error) {
      console.error('Failed to add user:', error);
      notification.error({ message: "Error creating user" });
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
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Your username"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your email"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          minLength="6"
          required
        />
        <p>Password must be at least 6 characters</p>

        <button type="submit">Sign Up</button>

        <p className="text-white">Already User? <span className="text-white"><Link to="/login">Login</Link></span></p>

      </form>
    </div>
  );
};

export default SignUp;
