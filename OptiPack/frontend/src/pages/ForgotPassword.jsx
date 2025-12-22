import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/auth.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleReset = (e) => {
    e.preventDefault(); // Prevents page reload
    // For now, we keep the logic simple as requested
    console.log("Reset link sent to: " + email);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Forgot Password?</h2>
        <p className="auth-subtitle">
          Enter your registered email address to receive a password reset link.
        </p>

        <form className="auth-form" onSubmit={handleReset}>
          <div className="input-group">
            <label>Registered Email</label>
            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-btn">
            Send Reset Link
          </button>
        </form>

        <p className="auth-footer">
          Remembered your password? 
          <Link to="/login" className="auth-link">Back to Login</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;