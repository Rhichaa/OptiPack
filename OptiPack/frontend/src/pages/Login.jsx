import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Please enter email and password.");
      return;
    }

    setLoading(true);

    try {
      console.log("Trying to login...");

      const res = await axios.post("https://localhost:49331/api/Auth/login", {
        email: form.email,
        password: form.password,
      });

      console.log("Login success:", res.data);

      localStorage.setItem("token", res.data.token);

      navigate("/app");
    } catch (err) {
      console.error(err);

      // Prevent React crash:
      const backendMsg =
        err.response?.data?.title ||
        err.response?.data ||
        "Invalid credentials";

      setError(backendMsg.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f7fb",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "24px 28px",
          borderRadius: 12,
          width: 360,
          boxShadow: "0 8px 24px rgba(15,23,42,0.12)",
        }}
      >
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
          Login
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={{ marginBottom: 10 }}>
            <label style={{ fontSize: 13 }}>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              style={{
                width: "100%",
                padding: "8px 10px",
                borderRadius: 8,
                border: "1px solid #d1d5db",
                marginTop: 4,
              }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13 }}>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              style={{
                width: "100%",
                padding: "8px 10px",
                borderRadius: 8,
                border: "1px solid #d1d5db",
                marginTop: 4,
              }}
            />
          </div>

          {error && (
            <p style={{ color: "red", fontSize: 12, marginBottom: 8 }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "9px 12px",
              borderRadius: 8,
              border: "none",
              background: "#4f46e5",
              color: "#fff",
              fontSize: 14,
              cursor: loading ? "not-allowed" : "pointer",
              marginBottom: 8,
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div style={{ fontSize: 12, marginTop: 4 }}>
          <Link to="/forgot-password" style={{ color: "#4f46e5" }}>
            Forgot password?
          </Link>
        </div>

        <div style={{ fontSize: 12, marginTop: 6 }}>
          New user?{" "}
          <Link to="/signup" style={{ color: "#4f46e5" }}>
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;







