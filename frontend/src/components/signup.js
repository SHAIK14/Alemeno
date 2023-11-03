import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const formData = {
    username,
    email,
    password,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/signup",
        formData
      );
      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        alert("Account created successfully!");
        navigate("/login");
      }
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Sign Up</button>
        <p className="exists">
          Already have an account?
          <Link className="existslink" to="/">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
