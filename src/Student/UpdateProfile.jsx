import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import style from "./Profile.module.css";
import { getCookie, setCookie } from "../Helper/CookiesHelper";

export default function UpdateProfile() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [password, setPassword] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);  // Loading state

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
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Set loading state

    const formData = new FormData();
    formData.append("password", password);
    formData.append("github", text);
    if (selectedImage) {
      formData.append("image", selectedImage);
      setCookie("userImage", selectedImage);  // Save selected image in cookie
    }

    try {
      const response = await axios.patch(
        "https://165.232.129.48:3000/users/updateProfile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "SHA " + getCookie("AccessTokenStudent"),
          },
        }
      );

      setCookie("userImage", response.data.image);
      console.log(response.data);

      // Show success message with SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Profile Updated',
        text: 'Your profile has been updated successfully.',
        confirmButtonText: 'OK'
      }).then(() => {
        window.location.reload();  // Reload the page on OK click
      });
    } catch (error) {
      console.error("There was an error updating the profile!", error);
    } finally {
      setLoading(false);  // Reset loading state
    }
  };

  return (
    <>
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
                    className={style["selected_image"]}
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
                  className={style["input_field"]}
                />
                <hr />

                <label htmlFor="github" className={style.label}>
                  Github
                </label>
                <input
                  type="text"
                  id="github"
                  name="github"
                  placeholder="https://github.com/username"
                  value={text}
                  onChange={handleTextChange}
                  className={style["input_field"]}
                />

                <hr />

                <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
                  {loading ? "Updating..." : "Update Profile"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
