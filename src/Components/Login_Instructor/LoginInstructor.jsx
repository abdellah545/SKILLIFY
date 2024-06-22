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
    <section className="section-signup p-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10 p-0">
            <img src={rigisterPhoto} alt="" className="w-100 h-100" />
          </div>
          <div className="col-lg-6 col-md-8 col-sm-10 p-0">
            <div className="signup-form p-3">
              <h1 className="text-center my-2">Welcome, Instructor</h1>
              <div className="d-flex justify-content-center align-items-center mb-5">
                <p className="text-center mt-3 mx-3">Do you want to sign up ?</p>
                <Link to="/register-instructor">
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
                {emailError && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "14px",
                      textAlign: "center",
                    }}
                  >
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
                  {handleLogin && (
                    <>
                      <Link
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
