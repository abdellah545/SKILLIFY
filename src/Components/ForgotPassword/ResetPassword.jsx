import React, { useState } from "react";
import rigisterPhoto from "../../assets/register.png";
import "../Sign up/SignUp.css";
import "../Login/Login.css";
import axios from "axios";
import { Link } from "react-router-dom";
import baseURL from "../../BaseURL/BaseURL";
import { deleteCookie, getCookie } from "../../Helper/CookiesHelper";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    let flag = true;
    e.preventDefault();
    setLoading(true);
    if (password !== repassword) {
      flag = false;
    } else flag = true;
    if (flag) {
      try {
        const res = await axios.post(
          `${baseURL}/users/changePassword`,
          {
            password: password,
          },
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
          setLoading(false);
        }
      } catch (err) {
        alert(err.response.data.message);
        setLoading(false);
      }
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
                  <h1 className="text-center my-2">Reset Password</h1>
                  <div className="d-flex justify-content-center align-items-center mb-5">
                    <p className="text-center mb-3 fs-4">Enter new password</p>
                  </div>
                  <div className="mb-1">
                    <input
                      type="password"
                      className="email-login my-3"
                      value={password}
                      id="password"
                      placeholder="Enter new password"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="email-login my-3 text-center"
                      value={repassword}
                      id="password"
                      placeholder="Re-enter new password"
                      required
                      onChange={(e) => setRepassword(e.target.value)}
                    />
                  </div>
                  
                  <div className="d-flex justify-content-center align-items-center w-100">
                    <Link
                      to="/login"
                      className="signup-login-btn w-100 fs-5 text-center"
                      onClick={handleReset}
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
                        "Submit"
                      )}
                    </Link>
                  </div>
                  <br />
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
