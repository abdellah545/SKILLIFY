import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import style from "./Profile.module.css";
import { getCookie, setCookie } from "../Helper/CookiesHelper";
import baseURL from "../BaseURL/BaseURL";

export default function UpdateProfile() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [password, setPassword] = useState("");
  const [github, setGithub] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [githubError, setGithubError] = useState("");

  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*[0-9]).{6,}$/;
    return passwordPattern.test(password);
  };

  const validateGithub = (github) => {
    const githubPattern = /^https:\/\/github\.com\/[A-Za-z0-9_-]+$/;
    return githubPattern.test(github);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (!validatePassword(e.target.value)) {
      setPasswordError("Password must be at least 6 characters, contain one uppercase letter, one number, and one special character.");
    } else {
      setPasswordError("");
    }
  };

  const handleGithubChange = (e) => {
    setGithub(e.target.value);
    if (!validateGithub(e.target.value)) {
      setGithubError("GitHub URL must be in the format: https://github.com/username");
    } else {
      setGithubError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(true);

    if (!validatePassword(password) || !validateGithub(github)) {
      setError(true);
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("password", password);
    formData.append("github", github);
    if (selectedImage) {
      formData.append("image", selectedImage);
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

      const updatedImage = response.data.image;
      sessionStorage.setItem("userImage", response.data.image);

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully.",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.reload();
        sessionStorage.setItem("userImage", response.data.image);
      });
    } catch (error) {
      console.error("There was an error updating the profile!", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12">
          <h1 className={`text-center fw-bold ${style.header}`}>
            Update Profile
          </h1>
        </div>
        <div className="col-lg-6 col-md-12">
          <form onSubmit={handleSubmit}>
            <div className={`row py-5 flex-column ${style.profile_info}`}>
              <label htmlFor="image" className={style.label}>
                Profile Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className={style.input_field}
              />
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="Selected"
                  className={style.selected_image}
                  style={{ width: "200px" }}
                />
              )}

              <hr />

              <label htmlFor="password" className={style.label}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
                className={style.input_field}
              />
              {passwordError && (
                <p style={{ color: "red", fontSize: "12px" }}>{passwordError}</p>
              )}
              <hr />

              <label htmlFor="github" className={style.label}>
                GitHub
              </label>
              <input
                type="text"
                id="github"
                name="github"
                placeholder="https://github.com/username"
                value={github}
                onChange={handleGithubChange}
                className={style.input_field}
              />
              {githubError && (
                <p style={{ color: "red", fontSize: "12px" }}>{githubError}</p>
              )}

              <hr />

              <button
                type="submit"
                className="btn btn-primary mt-3"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
