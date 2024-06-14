import React, { useState } from "react";
import registerPhoto from "../../assets/register.png";
import "../Sign up/SignUp.css";
import "../Login/Login.css";
import axios from "axios";
import style from "./InstructorSignUp.module.css";
import baseURL from "../../BaseURL/BaseURL";
import { setCookie } from "../../Helper/CookiesHelper";

export default function InstructorSignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [experience, setExperience] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSignUpInstructor(e) {
    e.preventDefault();
    setError(true);
    setLoading(true);

    // Password validation
    const passwordPattern = /^(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*[0-9]).{6,}$/;
    if (!passwordPattern.test(password)) {
      setError(true);
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("image", image);
    formData.append("title", title);
    formData.append("experience", experience);
    formData.append("bio", bio);

    try {
      const res = await axios.post(`${baseURL}/instructors/signup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Use multipart/form-data for file uploads
        },
      });

      if (res.status === 201) {
        setCookie("VerifiedSignupInstructorToken", res.data.token);
        window.location.pathname = "/AuthSignUpInstructor";
        setLoading(false);
      } else {
        console.log("Error");
      }
    } catch (err) {
      setEmailError(err.response.status === 400 ? true : false);
      console.log(err.response);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section-signup p-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-10 col-sm-12 p-0">
            <img src={registerPhoto} alt="" className="w-100 h-100" />
          </div>
          <div className="col-lg-6 col-md-10 col-sm-12 p-0">
            <div className="signup-form p-3">
              <form onSubmit={handleSignUpInstructor} className="pt-0">
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
                          placeholder="Enter your password"
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
                            *Password must contain at least one special character
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
                      <div
                        className={`d-flex flex-column w-100 align-items-center ${style.fileInputContainer}`}
                      >
                        <label
                          htmlFor="image"
                          className={`pb-2 ${style.customFileInputLabel}`}
                        >
                          Image
                        </label>
                        <input
                          type="file"
                          name="image"
                          id="image"
                          className="password text-center"
                          onChange={(e) => setImage(e.target.files[0])}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-8 col-sm-10">
                      <div className="d-flex flex-column w-100 align-items-center">
                        <label htmlFor="title" className="pb-2">
                          Title
                        </label>
                        <input
                          type="text"
                          name="title"
                          id="title"
                          className="text-center username"
                          placeholder="Enter your title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                        />
                        {title === "" && error && (
                          <p style={{ color: "red", fontSize: "14px" }}>
                            *Title is required
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-8 col-sm-10">
                      <div className="d-flex flex-column w-100 align-items-center">
                        <label htmlFor="experience" className="pb-2">
                          Years Of Experience
                        </label>
                        <input
                          type="text"
                          name="experience"
                          id="experience"
                          className="text-center username"
                          placeholder="Enter your experience"
                          value={experience}
                          onChange={(e) => setExperience(e.target.value)}
                          required
                        />
                        {experience === "" && error && (
                          <p style={{ color: "red", fontSize: "14px" }}>
                            *Experience is required
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-8 col-sm-10">
                      <div className="d-flex flex-column w-100 align-items-center">
                        <label htmlFor="Bio" className="pb-2">
                          Bio
                        </label>
                        <textarea
                          type="text"
                          name="Bio"
                          id="Bio"
                          className="bio"
                          placeholder="Enter your Bio"
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          required
                        ></textarea>
                        {bio === "" && error && (
                          <p style={{ color: "red", fontSize: "14px" }}>
                            *Bio is required
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
                          <div
                            className="spinner-border text-light"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        ) : (
                          "Sign Up"
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
