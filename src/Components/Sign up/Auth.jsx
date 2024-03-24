import React, { useState, useEffect } from "react";
import rigisterPhoto from "../../assets/register.png";
import "./SignUp.css";
import "./Auth.css";
import { Link } from "react-router-dom";

import axios from "axios";

export default function Auth() {
  const setCookie = (name, value, days) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  };




  const [seconds, setSeconds] = useState(120); // Initial time in seconds
  const [otp, setOtp] = useState("");


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
  

  const handleVerification = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://training-center-lkgs.onrender.com/users/verifyLogin",
        {
          otp: String(otp),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "SHA " + sessionStorage.getItem("Verifiedtoken"),
          },
        }
      );
      if (res.status === 200) {
        setCookie("token", res.data.token, 30);
        sessionStorage.removeItem("Verifiedtoken");
        sessionStorage.setItem("userName", res.data.name);
        window.location.pathname = "";
        // window.location.pathname = "/categories";
      }
    } catch (err) {
      alert("Code is incorrect");
      console.log(err);
    }
  };

  const resendCode = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post("https://training-center.onrender.com/users/resendOTP",
      {
        otp: String(otp),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "SHA " + sessionStorage.getItem("Verifiedtoken"),
        },
      }
      );
      if (res.status === 200) {
        setCookie("token", res.data.token, 30);
        sessionStorage.removeItem("Verifiedtoken");
        sessionStorage.setItem("userName", res.data.name);
        window.location.pathname = "";
        setSeconds(120);
      }
      console.log(res);
    }catch(err){
      alert("Code is incorrect");
      console.log(err);
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
                  The 4-digit verification code will expire in 2 minutes
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
                    Verify
                  </button>
                </div>
                <div className="d-flex justify-content-center mt-5">
                  <div>
                    {seconds === 0 && (
                      <button
                        onClick={resendCode}
                        className="resend-code-btn"
                        style={{ marginRight: "10px" }}
                      >
                        Resend Code
                      </button>
                    )}
                    {seconds !== 0 && (
                      <button
                        className="resend-code-btn"
                        style={{
                          color: "gray",
                          backgroundColor: "white",
                          marginRight: "10px",
                          cursor: "not-allowed",
                        }}
                        disabled
                      >
                        Resend Code
                      </button>
                    )}
                  </div>
                  <div>{seconds} seconds</div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
