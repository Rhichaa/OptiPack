// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import api from "../services/api";

// function Login() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ username: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!form.username || !form.password) {
//       setError("Please enter username and password.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await api.post("/auth/login", {
//         username: form.username,
//         password: form.password,
//       });

//       // Save token
//       localStorage.setItem("user", JSON.stringify(response.data));

//       // localStorage.setItem("token", response.data.token);

//       // Navigate to dashboard
//       navigate("/");
//     } catch (err) {
//       if (err.response) {
//         setError(err.response.data.message || "Invalid username or password");
//       } else {
//         setError("Server not reachable");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // FIX: Handle input change properly
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.username || !form.password) {
      setError("Please enter username and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        username: form.username,
        password: form.password,
      });

      // Save user (no token returned from backend)
      localStorage.setItem("user", JSON.stringify(response.data));

      navigate("/");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Invalid username or password");
      } else {
        setError("Server not reachable");
      }
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
        <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>
          Login with your username and password.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div style={{ marginBottom: 10 }}>
            <label style={{ fontSize: 13 }}>Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter your username"
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

          {/* Button */}
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

        <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>
          <Link
            to="/forgot-password"
            style={{ color: "#4f46e5", textDecoration: "none" }}
          >
            Forgot password?
          </Link>
        </div>

        <div style={{ fontSize: 12, color: "#6b7280", marginTop: 6 }}>
          New user?{" "}
          <Link to="/signup" style={{ color: "#4f46e5", textDecoration: "none" }}>
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
