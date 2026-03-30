import React, { useState, useEffect } from "react";
import axios from "axios";
import rigisterPhoto from "../../assets/register.png";
import "../Sign up/SignUp.css";
import "../Sign up/Auth.css";
import baseURL from "../../BaseURL/BaseURL";
import { deleteCookie, getCookie, setCookie } from "../../Helper/CookiesHelper";
import Swal from "sweetalert2";
export default function AuthAdmin() {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");

  const handleVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${baseURL}/admin/verifyLogin`,
        { otp: String(otp) },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "SHA_ADMIN " + getCookie("AccessTokenAdminLogin"),
          },
        }
      );
      window.location.pathname = "/admin-dashboard";
      setCookie("AccessTokenAdmin", res.data.token);
      deleteCookie("AccessTokenAdminLogin");
      setLoading(false);
    } catch (err) {
      Swal.fire("Error", "Invalid OTP", "error");
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
