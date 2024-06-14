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
    <section className="section-signup p-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10 p-0">
            <img src={rigisterPhoto} alt="" className="w-100 h-100" />
          </div>
          <div className="col-lg-6 col-md-8 col-sm-10 p-0">
            <div className="signup-form p-3">
              <h1 className="text-center my-2">Welcome Back</h1>
              <div className="d-flex justify-content-center align-items-center mb-5">
                <p className="text-center mt-3 mx-3">First time here ?</p>
                <Link to="/register">
                  <button className="signup-login-btn">Sign Up</button>
                </Link>
              </div>
              <form onSubmit={handleLogin}>
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
                {/* {emailError && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "14px",
                      textAlign: "center",
                    }}
                  >
                    *Email is incorrect
                  </p>
                )} */}
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

                {passwordError && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "14px",
                      textAlign: "center",
                    }}
                  >
                    *Password is incorrect
                  </p>
                )}

                <div className="d-flex justify-content-center mt-4">
                  {handleLogin && (
                    <>
                      <Link
                        to="/Auth"
                        type="submit"
                        onClick={handleLogin}
                        className="login-form-btn text-center text-white fs-5"
                      >
                        {loading ? (
                          <>
                            <div className="d-flex justify-content-center">
                              <div
                                class="spinner-border text-white"
                                role="status"
                              >
                                <span class="sr-only">Loading...</span>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>Login</>
                        )}
                      </Link>
                    </>
                  )}
                </div>
                <div className="d-flex justify-content-center align-items-center mt-3">
                  <Link
                    to="/forgot-password"
                    className="text-decoration-underline fs-5"
                    style={{ color: "blue" }}
                  >
                    Forgot your password ?
                  </Link>
                </div>
                <br />

                <br />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
