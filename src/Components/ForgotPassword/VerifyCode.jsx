import React, { useEffect, useState } from "react";
import rigisterPhoto from "../../assets/register.png";
import "../Sign up/SignUp.css";
import "../Login/Login.css";
import axios from "axios";
import { Link } from "react-router-dom";
import baseURL from "../../BaseURL/BaseURL";
import { deleteCookie, getCookie, setCookie } from "../../Helper/CookiesHelper";

export default function VerifyCode() {
  const [otp, setOtp] = useState("");
  const [seconds, setSeconds] = useState(10);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Set up an interval to decrement the timer every second
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);
    // Clear the interval when the component unmounts or when seconds reach 0
    if (seconds === 0) {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [seconds]);

  const handleResetCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${baseURL}/users/verifyResetPassword`,
        {
          otp: String(otp),
        },
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
        window.location.pathname =
          "/forgot-password/verify-code/reset-password";
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
                  <h1 className="text-center my-2">Verification</h1>
                  <div className="d-flex justify-content-center align-items-center mb-5">
                    <p className="text-center my-5 fs-4">
                      Enter the code received on your email
                    </p>
                  </div>
                  <div className="mb-2">
                    <input
                      type="password"
                      className="email-login my-3 text-center"
                      id="password"
                      placeholder="Enter Code"
                      required
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </div>
                  <div className="d-flex justify-content-center align-items-center w-100">
                    <Link
                      to="/forgot-password/verify-code/reset-password"
                      className="signup-login-btn w-100 fs-5 text-center"
                      onClick={handleResetCode}
                    >
                      {loading ? (
                        <div className="d-flex justify-content-center mb-3">
                          <div
                            class="spinner-border text-white"
                            role="status"
                          >
                            <span class="sr-only">Loading...</span>
                          </div>
                        </div>
                      ) : (
                        "Verify Code"
                      )}
                    </Link>
                  </div>
                  <br />
                  <div className="d-flex justify-content-center mt-5">
                    <div>
                      <Link
                        to="/login"
                        className="text-decoration-underline fs-5"
                        style={{ color: "blue" }}
                      >
                        Back to Login
                      </Link>
                    </div>
                    
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
