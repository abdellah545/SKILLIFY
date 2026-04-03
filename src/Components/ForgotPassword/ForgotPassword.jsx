import React, { useState } from "react";
import rigisterPhoto from "../../assets/register.png";
import "../Sign up/SignUp.css";
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
        { email },
        { headers: { "Content-Type": "application/json" } }
      );
      if (res.status === 201) {
        setCookie("ResetToken1", res.data.token);
        window.location.pathname = "/forgot-password/verify-code";
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-signup">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-9 col-lg-7">
            <div className="signup-wrapper d-flex flex-column flex-md-row">

              {/* Left image panel */}
              <div className="col-md-5 signup-image-container">
                <img src={rigisterPhoto} alt="Forgot Password" />
              </div>

              {/* Right form panel */}
              <div className="col-md-7 signup-form">
                {/* Icon */}
                <div className="text-center mb-3">
                  <div style={{
                    width: 64, height: 64, borderRadius: "50%",
                    background: "linear-gradient(135deg, #5151D3, #3b3bcf)",
                    display: "inline-flex", alignItems: "center",
                    justifyContent: "center", fontSize: "1.8rem", marginBottom: 12
                  }}>🔐</div>
                  <h1>Forgot Password?</h1>
                  <p className="subtitle">
                    Enter your email and we'll send you a reset code
                  </p>
                </div>

                <form onSubmit={handleSubmit} autoComplete="off">
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label-custom">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      className="form-input-custom"
                      placeholder="Enter your email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="signup-btn-form" disabled={loading}>
                    {loading ? (
                      <div className="spinner-border spinner-border-sm text-white" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : "Send Reset Code"}
                  </button>

                  <div className="text-center mt-3">
                    <Link to="/login" style={{ color: "#5151D3", fontSize: "0.9rem", fontWeight: 600, textDecoration: "none" }}>
                      ← Back to Login
                    </Link>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
