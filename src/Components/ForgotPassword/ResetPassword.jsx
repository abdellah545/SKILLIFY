import React, { useState } from "react";
import rigisterPhoto from "../../assets/register.png";
import "../Sign up/SignUp.css";
import axios from "axios";
import { Link } from "react-router-dom";
import baseURL from "../../BaseURL/BaseURL";
import { deleteCookie, getCookie } from "../../Helper/CookiesHelper";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showRePass, setShowRePass] = useState(false);

  const passwordPattern = /^(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*[0-9]).{6,}$/;

  const handleReset = async (e) => {
    e.preventDefault();
    setError(true);
    if (!passwordPattern.test(password)) { setLoading(false); return; }
    if (password !== repassword) return;

    setLoading(true);
    try {
      const res = await axios.post(
        `${baseURL}/users/changePassword`,
        { password },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "SHA " + getCookie("ResetToken2"),
          },
        }
      );
      if (res.status === 200) {
        deleteCookie("ResetToken2");
        window.location.pathname = "/login";
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (field) => ({
    position: "relative",
  });

  return (
    <section className="section-signup">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-9 col-lg-7">
            <div className="signup-wrapper d-flex flex-column flex-md-row">

              {/* Left image panel */}
              <div className="col-md-5 signup-image-container">
                <img src={rigisterPhoto} alt="Reset Password" />
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
                  }}>🔑</div>
                  <h1>Reset Password</h1>
                  <p className="subtitle">Choose a strong new password</p>
                </div>

                <form onSubmit={handleReset} autoComplete="off">
                  {/* New Password */}
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label-custom">New Password</label>
                    <div style={{ position: "relative" }}>
                      <input
                        id="password"
                        type={showPass ? "text" : "password"}
                        className="form-input-custom"
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ paddingRight: 40 }}
                      />
                      <span
                        onClick={() => setShowPass(!showPass)}
                        style={{
                          position: "absolute", right: 12, top: "50%",
                          transform: "translateY(-50%)", cursor: "pointer",
                          color: "#94a3b8", fontSize: "1rem"
                        }}
                      >{showPass ? "🙈" : "👁️"}</span>
                    </div>
                    {error && !passwordPattern.test(password) && (
                      <p className="error-text">*Min 6 chars, 1 uppercase, 1 number, 1 special char</p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-3">
                    <label htmlFor="repassword" className="form-label-custom">Confirm Password</label>
                    <div style={{ position: "relative" }}>
                      <input
                        id="repassword"
                        type={showRePass ? "text" : "password"}
                        className="form-input-custom"
                        placeholder="Re-enter new password"
                        value={repassword}
                        onChange={(e) => setRepassword(e.target.value)}
                        required
                        style={{ paddingRight: 40 }}
                      />
                      <span
                        onClick={() => setShowRePass(!showRePass)}
                        style={{
                          position: "absolute", right: 12, top: "50%",
                          transform: "translateY(-50%)", cursor: "pointer",
                          color: "#94a3b8", fontSize: "1rem"
                        }}
                      >{showRePass ? "🙈" : "👁️"}</span>
                    </div>
                    {error && password !== repassword && (
                      <p className="error-text">*Passwords do not match</p>
                    )}
                  </div>

                  <button type="submit" className="signup-btn-form" disabled={loading}>
                    {loading ? (
                      <div className="spinner-border spinner-border-sm text-white" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : "Reset Password"}
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
