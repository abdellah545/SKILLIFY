import React, { useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import style from "./Profile.module.css";
import { getCookie, setCookie } from "../Helper/CookiesHelper";
import baseURL from "../BaseURL/BaseURL";

export default function UpdateProfile() {
  document.title = "SKILLIFY | Update Profile";

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState(getCookie("userName") || "");
  const [phone, setPhone] = useState(getCookie("phone") || "");
  const [password, setPassword] = useState("");
  const [github, setGithub] = useState(getCookie("github") || "");
  const [linkedin, setLinkedin] = useState(getCookie("linkedin") || "");
  
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [githubError, setGithubError] = useState("");
  const [linkedinError, setLinkedinError] = useState("");
  
  const [showPass, setShowPass] = useState(false);
  const fileInputRef = useRef(null);

  const currentImage = sessionStorage.getItem("userImage");

  const validatePassword = (password) => {
    if (!password) return true; // Only validate if user is trying to change it
    const passwordPattern = /^(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*[0-9]).{6,}$/;
    return passwordPattern.test(password);
  };

  const validateGithub = (github) => {
    if (!github) return true;
    const githubPattern = /^https:\/\/github\.com\/[A-Za-z0-9_-]+$/;
    return githubPattern.test(github);
  };

  const validateLinkedin = (linkedin) => {
    if (!linkedin) return true;
    const linkedinPattern = /^https:\/\/(www\.)?linkedin\.com\/.*$/;
    return linkedinPattern.test(linkedin);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
      setImageFile(null);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value && !validatePassword(e.target.value)) {
      setPasswordError("Min 6 characters, one uppercase, one number, and one special character.");
    } else {
      setPasswordError("");
    }
  };

  const handleGithubChange = (e) => {
    setGithub(e.target.value);
    if (e.target.value && !validateGithub(e.target.value)) {
      setGithubError("Format: https://github.com/username");
    } else {
      setGithubError("");
    }
  };

  const handleLinkedinChange = (e) => {
    setLinkedin(e.target.value);
    if (e.target.value && !validateLinkedin(e.target.value)) {
      setLinkedinError("Format: https://linkedin.com/in/username");
    } else {
      setLinkedinError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(password) || !validateGithub(github) || !validateLinkedin(linkedin)) {
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    if (password) formData.append("password", password);
    formData.append("github", github);
    formData.append("linkedin", linkedin);
    
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await axios.patch(
        `${baseURL}/users/updateProfile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "SHA " + getCookie("AccessTokenStudent"),
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully.",
        confirmButtonText: "Awesome!",
        customClass: {
          confirmButton: 'btn btn-primary'
        }
      }).then(() => {
        if (response.data.image) sessionStorage.setItem("userImage", response.data.image);
        if (response.data.name) setCookie("userName", response.data.name);
        if (response.data.github) setCookie("github", response.data.github);
        if (response.data.linkedin) setCookie("linkedin", response.data.linkedin);
        if (response.data.phone) setCookie("phone", response.data.phone);
        window.location.pathname = "/profile";
      });
    } catch (error) {
      console.error("There was an error updating the profile!", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error?.response?.data?.message || "An unexpected error occurred."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.pageContainer}>
      <div className={style.pageHeader}>
        <h1 className={style.pageTitle}>Update Profile</h1>
        <p className={style.pageSubtitle}>Keep your personal details and professional links up to date.</p>
      </div>

      <div className={style.formCard}>
        <form onSubmit={handleSubmit}>
          
          <div className={style.imageUploadGroup}>
            <div className={style.imagePreview}>
              {selectedImage ? (
                <img src={selectedImage} alt="Selected profile" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
              ) : currentImage ? (
                <img src={currentImage} alt="Current profile" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
              ) : (
                <i className="fa-solid fa-user"></i>
              )}
            </div>
            <div className={style.fileInputWrapper}>
              <label className={style.formLabel}>Profile Photo</label>
              <div 
                className={style.fileInputLabel}
                onClick={() => fileInputRef.current.click()}
              >
                <i className="fa-solid fa-camera"></i> Change Photo
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className={style.fileInput}
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div className={style.formGroup}>
            <label htmlFor="name" className={style.formLabel}>Full Name</label>
            <input
              type="text"
              id="name"
              className={style.formInput}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className={style.formGroup}>
            <label htmlFor="phone" className={style.formLabel}>Phone Number</label>
            <input
              type="text"
              id="phone"
              className={style.formInput}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className={style.formGroup}>
            <label htmlFor="password" className={style.formLabel}>New Password (Optional)</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPass ? "text" : "password"}
                id="password"
                className={style.formInput}
                value={password}
                onChange={handlePasswordChange}
                placeholder="Leave blank to keep current password"
                style={{ paddingRight: "40px" }}
              />
              <span 
                onClick={() => setShowPass(!showPass)} 
                style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", cursor: "pointer", opacity: 0.6 }}
              >
                {showPass ? "🙈" : "👁️"}
              </span>
            </div>
            {passwordError && <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "6px" }}>{passwordError}</p>}
          </div>

          <div className={style.formGroup}>
            <label htmlFor="github" className={style.formLabel}>GitHub Profile</label>
            <input
              type="text"
              id="github"
              className={style.formInput}
              value={github}
              onChange={handleGithubChange}
              placeholder="https://github.com/username"
            />
            {githubError && <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "6px" }}>{githubError}</p>}
          </div>

          <div className={style.formGroup}>
            <label htmlFor="linkedin" className={style.formLabel}>LinkedIn Profile</label>
            <input
              type="text"
              id="linkedin"
              className={style.formInput}
              value={linkedin}
              onChange={handleLinkedinChange}
              placeholder="https://linkedin.com/in/username"
            />
            {linkedinError && <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "6px" }}>{linkedinError}</p>}
          </div>

          <div style={{ display: "flex", gap: "16px", marginTop: "32px" }}>
            <Link to="/profile" className="btn" style={{ flex: 1, padding: "14px", background: "#f1f5f9", color: "#475569", fontWeight: 700, borderRadius: "12px" }}>
              Cancel
            </Link>
            <button
              type="submit"
              className={style.submitBtn}
              disabled={loading || passwordError || githubError || linkedinError}
              style={{ flex: 2 }}
            >
              {loading ? (
                <><div className="spinner-border spinner-border-sm"></div> Saving...</>
              ) : (
                <><i className="fa-solid fa-floppy-disk"></i> Save Changes</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
