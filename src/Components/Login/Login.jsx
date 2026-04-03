/* eslint-disable */
import React from "react";
import { useState, useEffect } from "react";

import rigisterPhoto from "../../assets/register.png";
import "../Sign up/SignUp.css";
import "./Login.css";
import axios from "axios";
import { Link } from "react-router-dom";
import baseURL from "../../BaseURL/BaseURL";
import { setCookie } from "../../Helper/CookiesHelper";

import { useForm } from "react-hook-form";
export default function Login() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setEmailError(false);
    setPasswordError(false);
    if (!/^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email)) {
      setEmailError(true);
    }
    setLoading(true);
    try {
      const res = await axios.post(
        `${baseURL}/users/login`,
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
        // sessionStorage.setItem("LoginToken", res.data.token);
        setCookie("LoginToken", res.data.token);
        window.location.pathname = "/Auth";
        setLoading(false);
        // console.log(res.data);
      }
    } catch (err) {
      console.error("Login error", err.response || err);
      if (err.response && err.response.status === 401) {
        const message = err.response.data.message;
        if (message.includes("email")) setEmailError(true);
        if (message.includes("password")) setPasswordError(true);
      }
      setLoading(false);
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
                <img src={rigisterPhoto} alt="Login" />
              </div>
              <div className="col-md-6 signup-form">
                <h1 className="text-center">Welcome Back</h1>
                <p className="text-center subtitle">Sign in to continue your learning journey</p>

                <div className="text-center mb-4">
                  <span style={{ color: '#64748b', fontSize: '0.95rem' }}>First time here?</span>{" "}
                  <Link to="/register">
                    <button className="signup-login-btn ms-2">Sign Up</button>
                  </Link>
                </div>

                <form onSubmit={handleLogin} autoComplete="off">
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label-custom">Email</label>
                    <input
                      placeholder="Enter your email"
                      type="email"
                      className="form-input-custom"
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && <p className="error-text">*Invalid email address</p>}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label-custom">Password</label>
                    <input
                      placeholder="Enter your password"
                      type="password"
                      className="form-input-custom"
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordError && <p className="error-text">*Incorrect password</p>}
                  </div>

                  <div className="text-end mb-3">
                    <Link to="/forgot-password" style={{ color: '#5151D3', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 500 }}>
                      Forgot your password?
                    </Link>
                  </div>

                  <Link
                    to="/Auth"
                    onClick={handleLogin}
                    className="login-form-btn"
                  >
                    {loading ? (
                      <div className="spinner-border spinner-border-sm text-white" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : "Login"}
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
