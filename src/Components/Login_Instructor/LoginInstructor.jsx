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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email)) {
      setEmailError(true);
    }
    setError(true);
    setLoading(true);
    try {
      const res = await axios.post(
        `${baseURL}/instructors/login`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      if (res.status === 200) {
        setCookie("LoginInstructorToken", res.data.token);
        window.location.pathname = "/AuthLoginInstructor";
        setLoading(false);
        // console.log(res.data);
      }
    } catch (err) {
      console.log("error");
      setLoading(false);
    }
  }
  return (
    <section className="section-signup">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="signup-wrapper d-flex flex-column flex-md-row">
              <div className="col-md-6 signup-image-container">
                <img src={rigisterPhoto} alt="Instructor Login" />
              </div>
              <div className="col-md-6 signup-form">
                <h1 className="text-center">Instructor Login</h1>
                <p className="text-center subtitle">Welcome back! Continue inspiring students.</p>

                <div className="text-center mb-4">
                  <span style={{ color: '#64748b', fontSize: '0.95rem' }}>New instructor?</span>{" "}
                  <Link to="/register-instructor">
                    <button className="signup-login-btn ms-2">Sign Up</button>
                  </Link>
                </div>

                <form onSubmit={handleLogin} autoComplete="off">
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label-custom">Email</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="form-input-custom"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    {emailError && <p className="error-text">*Invalid email address</p>}
                  </div>

                  <div className="mb-3">
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

                  <div className="text-end mb-3">
                    <Link to="/forgot-password" style={{ color: '#5151D3', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 500 }}>
                      Forgot your password?
                    </Link>
                  </div>

                  <button type="submit" className="signup-btn-form">
                    {loading ? (
                      <div className="spinner-border spinner-border-sm text-white" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : "Login"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
