import React from "react";
import { useState, useEffect } from "react";

import rigisterPhoto from "../../assets/register.png";
import "../Sign up/SignUp.css";
import "../Login/Login.css";
import axios from "axios";
import { Link } from "react-router-dom";
import baseURL from "../../BaseURL/BaseURL";
import { setCookie } from "../../Helper/CookiesHelper";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    // Trim username before checking
    const trimmedUsername = username.trim();

    // Check if both username and password are 'admin'
    if (
      trimmedUsername !== "seifabdellah@gmail.com" ||
      password !== "Password123@"
    ) {
      alert("Invalid username or password. Please try again.");
      setLoading(false); // Ensure loading is reset if credentials are wrong
      return; // Stop the function if the validation fails
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${baseURL}/admin/login`,
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);

      setCookie("AccessTokenAdminLogin", res.data.token);
      window.location.pathname = "/admin-auth";
      setLoading(false);
    } catch (err) {
      console.log("error", err);
      setLoading(false);
    }
  }
  return (
    <section className="section-signup">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-7">
            <div className="signup-wrapper d-flex flex-column flex-md-row">
              {/* Left decorative panel */}
              <div
                className="col-md-5 d-none d-md-flex flex-column align-items-center justify-content-center"
                style={{
                  background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                  padding: "40px 30px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "4rem", marginBottom: "20px" }}>🛡️</div>
                <h2 style={{ color: "#fff", fontWeight: 800, fontSize: "1.5rem" }}>Admin Portal</h2>
                <p style={{ color: "#94a3b8", marginTop: "12px", fontSize: "0.95rem", lineHeight: 1.6 }}>
                  Secure access for administrators only. Manage users, courses, and platform settings.
                </p>
                <div style={{ marginTop: "30px", display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
                  {["Users", "Courses", "Analytics", "Settings"].map((tag) => (
                    <span key={tag} style={{ background: "rgba(255,255,255,0.1)", color: "#60a5fa", borderRadius: "50px", padding: "4px 14px", fontSize: "0.8rem", fontWeight: 600 }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right form panel */}
              <div className="col-md-7 signup-form">
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "10px", background: "linear-gradient(135deg, #1e293b, #0f172a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>
                    🛡️
                  </div>
                  <h1 style={{ margin: 0, fontSize: "1.8rem" }}>Admin Login</h1>
                </div>
                <p className="subtitle">Restricted access — authorized personnel only</p>

                <form onSubmit={handleLogin} autoComplete="off">
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label-custom">Username / Email</label>
                    <input
                      id="username"
                      type="text"
                      placeholder="Enter your admin username"
                      className="form-input-custom"
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="form-label-custom">Password</label>
                    <input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      className="form-input-custom"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="signup-btn-form"
                    disabled={loading}
                    style={{ marginTop: 0 }}
                  >
                    {loading ? (
                      <div className="spinner-border spinner-border-sm text-white" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : "Login as Admin"}
                  </button>

                  <p style={{ marginTop: "20px", textAlign: "center", color: "#94a3b8", fontSize: "0.85rem" }}>
                    Not an admin?{" "}
                    <Link to="/login" style={{ color: "#5151D3", fontWeight: 600, textDecoration: "none" }}>
                      Student Login
                    </Link>
                    {" · "}
                    <Link to="/login-instructor" style={{ color: "#5151D3", fontWeight: 600, textDecoration: "none" }}>
                      Instructor Login
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
