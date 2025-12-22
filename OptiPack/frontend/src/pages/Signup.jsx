import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/auth.css";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("https://localhost:49331/api/Auth/register", {
        fullname: formData.fullname,
        email: formData.email,
        username: formData.username,
        password: formData.password,
        avatarUrl: "",
        role: "User",
      });

      if (res.status === 200) {
        alert("Registration successful!");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed. Try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Join OptiPack to manage your inventory</p>

        <form className="auth-form" onSubmit={handleRegister}>
          
          <div className="input-group">
            <label>Full Name</label>
            <input
              name="fullname"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullname}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Username</label>
            <input
              name="username"
              type="text"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="name@company.com"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>

          {error && <p className="error-text" style={{ color: 'red', fontSize: '14px', marginBottom: '10px' }}>{error}</p>}

          <button type="submit" className="auth-btn">Register</button>

          <p className="auth-footer">
            Already have an account?{" "}
            <Link to="/login" className="auth-link">Login</Link>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Signup;