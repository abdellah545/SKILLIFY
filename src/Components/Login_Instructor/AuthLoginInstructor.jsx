import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import rigisterPhoto from "../../assets/register.png";
import "../Sign up/SignUp.css";
import "../Sign up/Auth.css";
import baseURL from "../../BaseURL/BaseURL";
import { deleteCookie, getCookie, setCookie } from "../../Helper/CookiesHelper";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [seconds, setSeconds] = useState(300); // Initial time in seconds set to 5 minutes
  const [otp, setOtp] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
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
        `${baseURL}/instructors/login/verify`,
        { otp: String(otp) },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "SHA " + getCookie("LoginInstructorToken"),
          },
        }
      );
      setCookie("VerifiedLoginInstructorToken", res.data.token);
      if (
        !res.data.user.CV ||
        !res.data.user.ID ||
        !res.data.user.Graduation_Certificate
      ) {
        window.location.pathname = "/UploadPapers";
      } else if (res.data.user.rejected === true) {
        window.location.pathname = "/rejection";
      } else if (
        res.data.user.rejected === false &&
        res.data.user.papers_confirmed === false
      ) {
        window.location.pathname = "/pending";
      } else {
        // Navigation and session storage management here
        deleteCookie("LoginInstructorToken");
        setCookie("AccessTokenInstructor", res.data.token);
        setCookie("InstructorName", res.data.user.name);
        setCookie("InstructorImage", res.data.user.image);
        window.location.pathname = "/instructor-dashboard";
        setLoading(false);
      }
    } catch (err) {
      Swal.fire("Error", "Failed to verify OTP", "error");
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    try {
      await axios.post(
        `${baseURL}/instructors/login/resendOTP`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "SHA " + sessionStorage.getItem("LoginInstructorToken"),
          },
        }
      );
      Swal.fire("Success", "OTP sent successfully", "success");
      setSeconds(300); // Reset the timer
      setResendLoading(false);
    } catch (error) {
      Swal.fire("Error", "Failed to send OTP", "error");
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
                <h1 className="text-center py-5">Login Verification</h1>
                <h3 className="text-center">Please check your gmail</h3>
                <p className="text-center mt-3 m3-5">
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
                  <button type="submit" className="verify-btn">
                    {loading ? "Verifying..." : "Verify"}
                  </button>
                </div>
              </form>
              <div className="d-flex justify-content-center align-items-center mt-5">
                {seconds === 0 ? (
                  <button onClick={handleResendOTP} className="resend-code-btn">
                    {resendLoading ? "Resending..." : "Resend Code"}
                  </button>
                ) : (
                  <button
                    className="resend-code-btn"
                    disabled
                    style={{
                      cursor: "not-allowed",
                      opacity: "0.5",
                      pointerEvents: "none",
                    }}
                  >
                    Resend Code in {formatTime(seconds)}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
