/* eslint-disable */
import React, { useState, useEffect } from "react";
import rigisterPhoto from "../../assets/register.png";
import "./SignUp.css";
import "./Auth.css";
import axios from "axios";
import baseURL from "../../BaseURL/BaseURL";
import Swal from "sweetalert2";
import { deleteCookie, getCookie } from "../../Helper/CookiesHelper";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [seconds, setSeconds] = useState(300); // Set initial time to 300 seconds (5 minutes)
  const [otp, setOtp] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
      if (seconds === 0) {
        clearInterval(intervalId);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [seconds]);

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }

  const handleVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${baseURL}/users/verify`,
        { otp: String(otp) },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "SHA " + getCookie("SignupToken"),
          },
        }
      );

      deleteCookie("SignupToken");
      window.location.pathname = "/login";
      setLoading(false);
    } catch (err) {
      alert("Code is incorrect");
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    try {
      await axios.post(
        `${baseURL}/users/resendOTP`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "SHA " + getCookie("SignupToken"),
          },
        }
      );
      Swal.fire("Success", "OTP resent successfully!", "success");
      setResendLoading(false);
      setSeconds(300); // Reset the timer to 5 minutes after resend
    } catch (error) {
      Swal.fire("Error", "Failed to resend OTP", "error");
      setResendLoading(false);
    }
  };

  return (
    <section className="section-signup p-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10 p-0">
            <img src={rigisterPhoto} alt="" className="w-100 h-100" />
          </div>
          <div className="col-lg-6 col-md-8 col-sm-10 p-0">
            <div className="signup-form p-3">
              <form onSubmit={handleVerification}>
                <h1 className="text-center py-5">SignUp Verification</h1>
                <h3 className="text-center">Please check your gmail</h3>
                <p className="text-center mt-3 mb-3">
                  The 4-digit verification code will expire in 5 minutes
                </p>
                <div className="d-flex justify-content-evenly pt-5">
                  <input
                    type="text"
                    className="code"
                    maxLength={4}
                    placeholder="****"
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <div className="d-flex justify-content-center mt-4">
                  <button
                    type="submit"
                    onClick={handleVerification}
                    className="verify-btn"
                  >
                    {loading ? (
                      <>
                        <div className="d-flex justify-content-center">
                          <div
                            className="spinner-border text-white"
                            role="status"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      "Verify"
                    )}
                  </button>
                </div>
                <div className="d-flex justify-content-center align-items-center mt-5">
                  <div>
                    {seconds === 0 ? (
                      <button
                        onClick={handleResendOTP}
                        className="resend-code-btn"
                        style={{ marginRight: "10px" }}
                      >
                        {resendLoading ? "Resending..." : "Resend Code"}
                      </button>
                    ) : (
                      <button
                        className="resend-code-btn"
                        style={{
                          color: "white",
                          pointerEvents: "none",
                          opacity: "0.5",
                          cursor: "not-allowed",
                        }}
                        disabled
                      >
                        Resend Code in {formatTime(seconds)}
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
