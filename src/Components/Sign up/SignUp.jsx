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
    <section className="section-signup">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="signup-wrapper d-flex flex-column flex-md-row">
              <div className="col-md-6 signup-image-container">
                <img src={registerPhoto} alt="Register" />
              </div>
              <div className="col-md-6 signup-form">
                <form onSubmit={handleSignUp} autoComplete="off">
                  <h1 className="text-center">Sign Up</h1>
                  <p className="text-center subtitle">Welcome onboard with us!</p>
                  
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label-custom">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="form-input-custom"
                    />
                    {name === "" && error && <p className="error-text">*Name is required</p>}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label-custom">Email</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="form-input-custom"
                    />
                    {emailError && <p className="error-text">*This email already exists</p>}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label-custom">Password</label>
                    <input
                      id="password"
                      type="password"
                      placeholder="Enter your Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="form-input-custom"
                    />
                    {error && !validatePassword(password) && (
                      <p className="error-text">*Password must be at least 6 characters, contain 1 uppercase letter, 1 number, and 1 special character.</p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label-custom">Phone</label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="form-input-custom"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="gender" className="form-label-custom">Gender</label>
                    <select
                      id="gender"
                      className="form-input-custom"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="PREFER NOT TO SAY">Prefer not to say</option>
                    </select>
                  </div>

                  <button type="submit" className="signup-btn-form">
                    {loading ? (
                      <div className="spinner-border spinner-border-sm text-white" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : "Sign Up"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
