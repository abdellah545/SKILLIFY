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

    // Check if both username and password are 'admin'
    if (username !== "admin" || password !== "admin") {
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

      setCookie("AccessTokenAdmin", res.data);
      window.location.pathname = "/admin-dashboard";
      setLoading(false);
    } catch (err) {
      console.log("error", err);
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
              <h1 className="text-center my-2">Welcome</h1>
              <form onSubmit={handleLogin} className="d-flex flex-column mt-5">
                <br />
                <div className="mb-4 w-75 m-auto">
                  <div className="text-center">
                    <label htmlFor="email">Username</label>
                  </div>
                  <input
                    placeholder="Enter your username"
                    type="text"
                    className="email-login text-center"
                    id="username"
                    aria-describedby="emailHelp"
                    onChange={(e) => setUsername(e.target.value)}
                    // onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

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
                <div className="d-flex justify-content-center mt-4">
                  {handleLogin && (
                    <>
                      <button
                        type="submit"
                        className="login-form-btn text-center text-white fs-5"
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="d-flex justify-content-center">
                            <div
                              className="spinner-border text-white"
                              role="status"
                            >
                              <span className="sr-only">Loading...</span>
                            </div>
                          </div>
                        ) : (
                          "Login"
                        )}
                      </button>
                    </>
                  )}
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
