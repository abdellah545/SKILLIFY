import React, { useEffect, useState } from "react";
import rigisterPhoto from "../../assets/register.png";
import "../Sign up/SignUp.css";
import axios from "axios";
import { Link } from "react-router-dom";
import baseURL from "../../BaseURL/BaseURL";
import { deleteCookie, getCookie, setCookie } from "../../Helper/CookiesHelper";

export default function VerifyCode() {
  const [otp, setOtp] = useState("");
  const [seconds, setSeconds] = useState(60);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (seconds <= 0) return;
    const intervalId = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [seconds]);

  const handleResetCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${baseURL}/users/verifyResetPassword`,
        { otp: String(otp) },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "SHA " + getCookie("ResetToken1"),
          },
        }
      );
      if (res.status === 200) {
        deleteCookie("ResetToken1");
        setCookie("ResetToken2", res.data.token);
        window.location.pathname = "/forgot-password/verify-code/reset-password";
      }
    } catch (err) {
      alert(err.response?.data?.message || "Invalid code");
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
                <img src={rigisterPhoto} alt="Verify Code" />
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
                  }}>📧</div>
                  <h1>Verify Code</h1>
                  <p className="subtitle">
                    Enter the 6-digit code sent to your email
                  </p>
                </div>

                <form onSubmit={handleResetCode} autoComplete="off">
                  <div className="mb-3">
                    <label htmlFor="otp" className="form-label-custom">Verification Code</label>
                    <input
                      id="otp"
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      className="form-input-custom text-center"
                      style={{ letterSpacing: "0.3em", fontSize: "1.3rem" }}
                      placeholder="------"
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                  </div>

                  {/* Timer */}
                  <div className="text-center mb-3">
                    {seconds > 0 ? (
                      <span style={{ color: "#64748b", fontSize: "0.9rem" }}>
                        Code expires in <strong style={{ color: seconds < 15 ? "#ef4444" : "#5151D3" }}>
                          {String(Math.floor(seconds / 60)).padStart(2, "0")}:{String(seconds % 60).padStart(2, "0")}
                        </strong>
                      </span>
                    ) : (
                      <Link to="/forgot-password" style={{ color: "#5151D3", fontSize: "0.9rem", fontWeight: 600, textDecoration: "none" }}>
                        Resend Code
                      </Link>
                    )}
                  </div>

                  <button type="submit" className="signup-btn-form" disabled={loading}>
                    {loading ? (
                      <div className="spinner-border spinner-border-sm text-white" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : "Verify Code"}
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
