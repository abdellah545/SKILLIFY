import React from "react";
import { useState, useEffect } from "react";

import rigisterPhoto from "../../assets/register.png";
import "../Sign up/SignUp.css";
import "./Login.css";
import axios from "axios";
import { Link } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email)) {
      setEmailError(true);
    }
    setError(true);

    try {
      const res = await axios.post(
        "https://training-center-lkgs.onrender.com/users/login",
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
        sessionStorage.setItem("Verifiedtoken", res.data.token);
        window.location.pathname = "/Auth";
        // console.log(res.data);

      }
    } catch (err) {
      console.log("error");
    }
  }
  return (
    <section className="section-signup p-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10 p-0">
            <img src={rigisterPhoto} alt="" className="w-100 h-100" />
          </div>
          <div className="col-lg-6 col-md-8 col-sm-10 p-0">
            <div className="signup-form p-3">
              <form onSubmit={submit}>
                <h1 className="text-center my-2">Welcome</h1>
                <div className="d-flex justify-content-center align-items-center mb-5">
                  <p className="text-center mt-3 mx-3">First time here ?</p>
                  <Link to="/register">
                    <button className="signup-login-btn">Sign Up</button>
                  </Link>
                </div>
                <br />
                <div className="mb-4 w-75 m-auto">
                  <div className="text-center">
                    <label htmlFor="email">Email</label>
                  </div>
                  <input
                    placeholder="Enter your email"
                    type="email"
                    className="email-login text-center"
                    id="email"
                    aria-describedby="emailHelp"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {emailError && (
                  <p style={{ color: "red", fontSize: "14px" }}>
                    *Email is incorrect
                  </p>
                )}
                <div className="mb-4 w-75 m-auto">
                  <div className="text-center">
                    <label htmlFor="password" className="">
                      Password
                    </label>
                  </div>
                  <input
                    placeholder="Enter your password"
                    type="password"
                    className="password-login text-center"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error && emailError && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "14px",
                      textAlign: "center",
                    }}
                  >
                    *Email or password is incorrect
                  </p>
                )}
                <div className="d-flex justify-content-center mt-4">
                  <button type="submit" className="login-form-btn signup-login-btn">
                    Login
                  </button>
                </div>

                <br />
                <br />
                <div>
                  <p className="text-center fs-5 fw-800">or</p>
                </div>
                <br />
                <div className="d-flex justify-content-center align-items-center">
                  Login with Google
                  <button className="mx-3 login-google">
                    <img
                      src="https://img.icons8.com/color/48/000000/google-logo.png"
                      alt=""
                    />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
