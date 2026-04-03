import React, { useState, useRef } from "react";
import registerPhoto from "../../assets/register.png";
import "../Sign up/SignUp.css";
import axios from "axios";
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
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  async function handleSignUpInstructor(e) {
    e.preventDefault();
    setError(true);
    setLoading(true);

    const passwordPattern = /^(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*[0-9]).{6,}$/;
    if (!passwordPattern.test(password)) {
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
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.status === 201) {
        setCookie("VerifiedSignupInstructorToken", res.data.token);
        window.location.pathname = "/AuthSignUpInstructor";
      } else {
        console.log("Error");
      }
    } catch (err) {
      setEmailError(err.response?.status === 400);
      console.log(err.response);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section-signup">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-11 col-lg-10">
            <div className="signup-wrapper d-flex flex-column flex-md-row">

              {/* Left image panel */}
              <div className="col-md-5 signup-image-container">
                <img src={registerPhoto} alt="Register" />
              </div>

              {/* Right form panel */}
              <div className="col-md-7 signup-form">
                <form onSubmit={handleSignUpInstructor} autoComplete="off">
                  <h1 className="text-center">Instructor Sign Up</h1>
                  <p className="text-center subtitle">Join SKILLIFY as an instructor</p>

                  <div className="row g-2 mb-2">
                    <div className="col-6">
                      <label htmlFor="name" className="form-label-custom">Full Name</label>
                      <input id="name" type="text" placeholder="Your name" value={name}
                        onChange={(e) => setName(e.target.value)} required className="form-input-custom" />
                      {name === "" && error && <p className="error-text">*Name is required</p>}
                    </div>
                    <div className="col-6">
                      <label htmlFor="email" className="form-label-custom">Email</label>
                      <input id="email" type="email" placeholder="Your email" value={email}
                        onChange={(e) => setEmail(e.target.value)} required className="form-input-custom" />
                      {emailError && <p className="error-text">*Email already exists</p>}
                    </div>
                  </div>

                  <div className="row g-2 mb-2">
                    <div className="col-6">
                      <label htmlFor="password" className="form-label-custom">Password</label>
                      <input id="password" type="password" placeholder="Your password" value={password}
                        onChange={(e) => setPassword(e.target.value)} required className="form-input-custom" />
                      {error && !/^(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*[0-9]).{6,}$/.test(password) && (
                        <p className="error-text">*Min 6 chars, 1 uppercase, 1 number, 1 special char</p>
                      )}
                    </div>
                    <div className="col-6">
                      <label htmlFor="title" className="form-label-custom">Title</label>
                      <input id="title" type="text" placeholder="e.g. Web Developer" value={title}
                        onChange={(e) => setTitle(e.target.value)} required className="form-input-custom" />
                      {title === "" && error && <p className="error-text">*Title is required</p>}
                    </div>
                  </div>

                  <div className="row g-2 mb-2">
                    <div className="col-6">
                      <label htmlFor="experience" className="form-label-custom">Years of Experience</label>
                      <input id="experience" type="text" placeholder="e.g. 5" value={experience}
                        onChange={(e) => setExperience(e.target.value)} required className="form-input-custom" />
                      {experience === "" && error && <p className="error-text">*Required</p>}
                    </div>
                    <div className="col-6">
                      <label htmlFor="image" className="form-label-custom">Profile Image</label>
                      <input
                        type="file" accept="image/*" id="image"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={(e) => {
                          setImage(e.target.files[0]);
                          setFileName(e.target.files[0]?.name || "");
                        }}
                      />
                      <div
                        className="form-input-custom d-flex align-items-center gap-2"
                        style={{ cursor: "pointer", padding: "8px 12px" }}
                        onClick={() => fileInputRef.current.click()}
                      >
                        <span style={{
                          background: "linear-gradient(135deg, #5151D3, #3b3bcf)",
                          color: "white",
                          padding: "4px 12px",
                          borderRadius: "6px",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                          flexShrink: 0,
                        }}>Upload</span>
                        <span style={{
                          color: fileName ? "#1e293b" : "#94a3b8",
                          fontSize: "0.82rem",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}>
                          {fileName || "No file chosen"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-2">
                    <label htmlFor="Bio" className="form-label-custom">Bio</label>
                    <textarea id="Bio" className="form-input-custom" placeholder="Tell us about yourself"
                      value={bio} onChange={(e) => setBio(e.target.value)} required
                      rows={2} style={{ resize: "none" }} />
                    {bio === "" && error && <p className="error-text">*Bio is required</p>}
                  </div>

                  <button type="submit" className="signup-btn-form">
                    {loading ? (
                      <div className="spinner-border spinner-border-sm text-white" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : "Sign Up as Instructor"}
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
