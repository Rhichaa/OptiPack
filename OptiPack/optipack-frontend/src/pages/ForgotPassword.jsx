import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/auth.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleReset = () => {
    alert("Password reset link has been sent to: " + email);
  };

  return (
    <div className="auth-container">
      <div className="auth-card small-card">
        <h2 className="auth-title">Forgot Password?</h2>
        <p className="auth-text">
          Enter your registered email address to receive a password reset link.
        </p>

        <label className="auth-label">Registered Email</label>
        <input
          type="email"
          className="auth-input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handleReset} className="auth-button">
          Send Reset Link
        </button>

        <p className="auth-footer">
          <Link to="/" className="auth-link">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
