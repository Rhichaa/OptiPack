import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import "../styles/auth.css";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("https://localhost:49331/api/Auth/register", {
          fullname,
          email,
          username,
          password,
          avatarUrl: "",
          role: "User",
      });



      if (res.status === 200) {
        alert("Registration successful!");
        navigate("/login");
      }

    } catch (err) {
      console.error(err);
      setError(err.response?.data || "Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">OptiPack</h1>
        <p className="auth-subtitle">Create your account to get started</p>

        <form className="auth-form" onSubmit={handleRegister}>

          {/* Full Name */}
          <div className="auth-field">
            <label>Full Name</label>
            <div className="auth-input-wrapper">
              <span className="auth-icon">👤</span>
              <input
                type="text"
                className="auth-input"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Username */}
          <div className="auth-field">
            <label>Username</label>
            <div className="auth-input-wrapper">
              <span className="auth-icon">👤</span>
              <input
                type="text"
                className="auth-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="auth-field">
            <label>Email</label>
            <div className="auth-input-wrapper">
              <span className="auth-icon">📧</span>
              <input
                type="email"
                className="auth-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="auth-field">
            <label>Password</label>
            <div className="auth-input-wrapper">
              <span className="auth-icon">🔒</span>
              <input
                type="password"
                className="auth-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="auth-field">
            <label>Confirm Password</label>
            <div className="auth-input-wrapper">
              <span className="auth-icon">🔒</span>
              <input
                type="password"
                className="auth-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && <p className="error-text">{error}</p>}

          <button className="auth-btn">Register</button>

          <p className="auth-footer-text">
            Already have an account?{" "}
            <Link to="/login" className="auth-link">Login</Link>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Signup;
