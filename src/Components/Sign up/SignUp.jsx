import React, { useState } from "react";
import registerPhoto from "../../assets/register.png";
import "./SignUp.css";
import axios from "axios";
import baseURL from "../../BaseURL/BaseURL";
import { setCookie } from "../../Helper/CookiesHelper";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*[0-9]).{6,}$/;
    return passwordPattern.test(password);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(true);
    setLoading(true);

    if (!validatePassword(password)) {
      setError(true);
      setLoading(false);
      return;
    }

    const data = { name, email, password, phone, gender };

    try {
      const res = await axios.post(`${baseURL}/users/signup`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 201) {
        setCookie("SignupToken", res.data.token);
        window.location.pathname = "/AuthSignup";
        setLoading(false);
      }
    } catch (err) {
      if (err.response.status === 400) {
        setEmailError(true);
      }
      console.log(err.response);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-signup p-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-10 col-sm-12 p-0">
            <img src={registerPhoto} alt="" className="w-100 h-100" />
          </div>
          <div className="col-lg-6 col-md-10 col-sm-12 p-0">
            <div className="signup-form p-3">
              <form onSubmit={handleSignUp} className="pt-5">
                <h1 className="text-center">Sign Up!</h1>
                <p className="text-center mt-3">Welcome onboard with us!</p>
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-8 col-sm-10">
                      <div className="d-flex flex-column w-100 align-items-center">
                        <label htmlFor="name" className="pb-2">
                          Full Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          placeholder="Enter your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="username text-center"
                        />
                        {name === "" && error && (
                          <p style={{ color: "red", fontSize: "14px" }}>
                            *Name is required
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-8 col-sm-10">
                      <div className="d-flex flex-column w-100 align-items-center">
                        <label htmlFor="email" className="pb-2">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          placeholder="Enter your Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="email text-center"
                        />
                        {email === "" && error && (
                          <p style={{ color: "red", fontSize: "14px" }}>
                            *Invalid email format
                          </p>
                        )}
                        {emailError && (
                          <p style={{ color: "red", fontSize: "14px" }}>
                            *This email already exists
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-8 col-sm-10">
                      <div className="d-flex flex-column w-100 align-items-center">
                        <label htmlFor="password" className="pb-2">
                          Password
                        </label>
                        <input
                          id="password"
                          type="password"
                          placeholder="Enter your Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="password text-center"
                        />
                        {password === "" && error && (
                          <p style={{ color: "red", fontSize: "12px" }}>
                            *Password is required
                          </p>
                        )}
                        {!/^(?=.*[A-Z])/.test(password) && error && (
                          <p style={{ color: "red", fontSize: "12px" }}>
                            *Password must contain at least one uppercase letter
                          </p>
                        )}
                        {!/^(?=.*[@$!%*?&])/.test(password) && error && (
                          <p style={{ color: "red", fontSize: "12px" }}>
                            *Password must contain at least one special
                            character
                          </p>
                        )}
                        {!/^(?=.*[0-9])/.test(password) && error && (
                          <p style={{ color: "red", fontSize: "12px" }}>
                            *Password must contain at least one number
                          </p>
                        )}
                        {!/^.{6,}$/.test(password) && error && (
                          <p style={{ color: "red", fontSize: "12px" }}>
                            *Password must be at least 6 characters
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-8 col-sm-10">
                      <div className="d-flex flex-column w-100 align-items-center">
                        <label htmlFor="phone" className="pb-2">
                          Phone
                        </label>
                        <input
                          id="phone"
                          type="text"
                          placeholder="Enter your phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          className="phone text-center"
                        />
                        {phone === "" && error && (
                          <p style={{ color: "red", fontSize: "14px" }}>
                            *Phone is required
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-8 col-sm-10">
                      <div className="d-flex flex-column w-100 align-items-center">
                        <label htmlFor="gender" className="pb-2">
                          Gender
                        </label>
                        <select
                          id="gender"
                          className="text-center"
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          required
                        >
                          <option value="">Select Gender</option>
                          <option value="MALE">Male</option>
                          <option value="FEMALE">Female</option>
                          <option value="PREFER NOT TO SAY">
                            Prefer not to say
                          </option>
                        </select>
                        {gender === "" && error && (
                          <p style={{ color: "red", fontSize: "14px" }}>
                            *Gender is required
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="signup-btn-form m-auto fs-5 text-center text-white"
                      >
                        {loading ? (
                          <div className="d-flex justify-content-center">
                            <div
                              className="spinner-border text-white"
                              role="status"
                            >
                              <span className="sr-only">Loading...</span>
                            </div>
                          </div>
                        ) : (
                          <>Sign Up</>
                        )}
                      </button>
                    </div>
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
