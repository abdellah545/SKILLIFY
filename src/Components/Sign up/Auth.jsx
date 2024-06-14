import React, { useState, useEffect } from "react";
import axios from "axios";
import rigisterPhoto from "../../assets/register.png";
import "./SignUp.css";
import "./Auth.css";
import baseURL from "../../BaseURL/BaseURL";
import { deleteCookie, getCookie, setCookie } from "../../Helper/CookiesHelper";
import Swal from "sweetalert2";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [seconds, setSeconds] = useState(300); // Set initial time to 5 minutes for consistency with previous components
  const [otp, setOtp] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds > 0) {
        setSeconds((seconds) => seconds - 1);
      } else {
        clearInterval(intervalId); // Clear interval if the timer reaches zero
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
        `${baseURL}/users/verifyLogin`,
        { otp: String(otp) },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "SHA " + getCookie("LoginToken"),
          },
        }
      );

      // Set cookies with an expiration. Assuming you want these to last for 1 day
      const oneDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
      setCookie("AccessTokenStudent", res.data.token, oneDay);
      setCookie("userName", res.data.user.name, oneDay);
      setCookie("userEmail", res.data.user.email, oneDay);
      setCookie("userImage", res.data.user.image, oneDay);
      setCookie("phone", res.data.user.phone, oneDay);
      setCookie("gender", res.data.user.gender, oneDay);
      setCookie("createdAt", res.data.user.createdAt, oneDay);
      setCookie("updatedAt", res.data.user.updatedAt, oneDay);

      // Serialize and store the arrays in cookies
      setCookie("favorites", JSON.stringify(res.data.user.favorite), oneDay);
      setCookie("wishlist", JSON.stringify(res.data.user.wishlist), oneDay);
      setCookie("courses", JSON.stringify(res.data.user.courses), oneDay);
      setCookie("cart", JSON.stringify(res.data.user.cart), oneDay);
      deleteCookie("LoginToken");
      window.location.pathname = "/categories";
      setLoading(false);
    } catch (err) {
      Swal.fire("Error", "Invalid OTP", "error");
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    try {
      await axios.post(
        `${baseURL}/users/login/resendOTP`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "SHA " + sessionStorage.getItem("LoginToken"),
          },
        }
      );
      Swal.fire("Success", "OTP resent successfully!", "success");
      setSeconds(300); // Reset the timer to 5 minutes
      setResendLoading(false);
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
                <h1 className="text-center py-5">Login Verification</h1>
                <p className="text-center mt-3 mb-5">
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
                <div>
                  {seconds === 0 ? (
                    <button
                      type="button"
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
