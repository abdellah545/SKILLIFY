import React, { useState } from "react";
import rigisterPhoto from "../../assets/register.png";
import "../Sign up/SignUp.css";
import "../Login/Login.css";
import axios from "axios";
import { Link } from "react-router-dom";
import baseURL from "../../BaseURL/BaseURL";
import { setCookie } from "../../Helper/CookiesHelper";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${baseURL}/users/requestPasswordReset`,
        {
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 201) {
        setCookie("ResetToken1", res.data.token);
        window.location.pathname = "/forgot-password/verify-code";
        setLoading(false);
      }
    } catch (err) {
      alert(err.response.data.message);
      setLoading(false);
    }
  };
  return (
    <>
      <section className="section-signup p-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8 col-sm-10 p-0">
              <img src={rigisterPhoto} alt="" className="w-100 h-100" />
            </div>
            <div className="col-lg-6 col-md-8 col-sm-10 p-0">
              <div className="signup-form py-5">
                <form action="" className="w-75 mx-auto">
                  <h1 className="text-center my-2">Forgot Password ?</h1>
                  <div className="d-flex justify-content-center align-items-center mb-3">
                    <p className="text-center my-5 fs-4">
                      Enter your email associated with your account and we will
                      send you a code to reset your password
                    </p>
                  </div>
                  <div className="mb-2">
                    <input
                      type="email"
                      className="email-login my-3 text-center"
                      // value={email}
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email address"
                      required
                    />
                  </div>

                  <div className="d-flex justify-content-center align-items-center w-100">
                    <Link
                      to="/forgot-password/verify-code"
                      className="signup-login-btn w-100 text-center fs-5"
                      onClick={handleSubmit}
                    >
                      {loading ? (
                        <div className="d-flex justify-content-center mb-3">
                          <div class="spinner-border text-white" role="status">
                            <span class="sr-only">Loading...</span>
                          </div>
                        </div>
                      ) : (
                        "Send Code"
                      )}
                    </Link>
                  </div>
                  <br />
                  <div className="d-flex justify-content-center align-items-center">
                    <Link
                      to="/login"
                      className="text-decoration-underline fs-5"
                      style={{ color: "blue" }}
                    >
                      Back to Login
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
