import React, { useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import style from "./EditProfile.module.css";
import SidebarInstructor from "./SidebarInstructor";
import baseURL from "../../BaseURL/BaseURL";
import { getCookie, setCookie } from "../../Helper/CookiesHelper";

export default function EditProfile() {
  const [file, setFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null); // Create a ref for the file input

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    if (file) {
      formData.append("image", file);
    }
    formData.append("title", title);
    formData.append("password", password);

    try {
      const res = await axios.patch(
        `${baseURL}/instructors/updateProfile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization:
              "SHA " + getCookie("AccessTokenInstructor"),
          },
        }
      );

      Swal.fire("Success", "Profile updated successfully", "success");
      setCookie("InstructorImage", res.data.image);
      setCookie("InstructorTitle", res.data.title);
      

      setLoading(false);

      // Reset all fields and file input

      setTimeout(() => {
        setFile(null);
        setImagePreviewUrl("");
        setTitle("");
        setPassword("");
        fileInputRef.current.value = ""; // Reset the file input using the ref
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update profile", "error");
      setLoading(false);
    }
  };

  return (
    <>
      <div className={style.content}>
        <div className="row g-0">
          <div className="col-lg-2 d-none d-lg-block">
            <SidebarInstructor />
          </div>
          <div className="col-lg-10 p-0">
            <div
              className={`container-fluid ${style.scrollableContainer} py-3`}
            >
              <button
                className={`d-lg-none w-50 mx-auto mb-3 ${style.toggle_left_btn}`}
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#leftOffcanvas"
                aria-controls="leftOffcanvas"
              >
                Side Bar
              </button>
              <h2
                className="text-center mt-3 fw-bold"
                style={{ color: "#5151D3" }}
              >
                Edit Profile
              </h2>

              <hr />
              <h1
                className="text-center py-3 fw-bold"
                style={{ color: "#5151D3" }}
              >
                You must fill the following fields
              </h1>
              <div className="container">
                <form onSubmit={handleEditProfile}>
                  <div className="mb-3 w-50 mx-auto">
                    <label
                      htmlFor="profileImage"
                      className="form-label fw-bold"
                    >
                      Profile Image
                    </label>
                    <input
                      type="file"
                      className={`form-control mt-1 mx-auto ${style.input}`}
                      id="profileImage"
                      ref={fileInputRef} // Attach the ref to the file input
                      onChange={handleImageChange}
                      style={{
                        border: "2px solid #5151D3",
                        borderRadius: "5px",
                        color: "#5151D3",
                      }}
                    />
                    {imagePreviewUrl && (
                      <div className="mt-3">
                        <img
                          src={imagePreviewUrl}
                          alt="Profile Preview"
                          className="img-thumbnail d-block mx-auto"
                          style={{
                            borderRadius: "50%",
                            width: "200px",
                            height: "200px",
                          }}
                          onLoad={() => URL.revokeObjectURL(imagePreviewUrl)}
                        />
                      </div>
                    )}
                  </div>
                  <hr />
                  <div className="mb-3 w-50 mx-auto">
                    <label
                      htmlFor="title"
                      className="form-label fw-bold d-block"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      className={`${style.input}`}
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <hr />
                  <div className="mb-3 w-50 mx-auto">
                    <label
                      htmlFor="password"
                      className="form-label fw-bold d-block"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className={`${style.input}`}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <hr />
                  <div className="mb-3 w-50 mx-auto text-center">
                    <button
                      type="submit"
                      className="btn w-50 fw-bold"
                      style={{ backgroundColor: "#5151D3", color: "white" }}
                      disabled={loading}
                    >
                      {loading ? "Updating..." : "Update"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div
          className="offcanvas offcanvas-start"
          data-bs-backdrop="static"
          tabIndex="-1"
          id="leftOffcanvas"
          aria-labelledby="leftOffcanvasLabel"
        >
          <div className="offcanvas-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body p-0">
            <SidebarInstructor />
          </div>
        </div>
      </div>
    </>
  );
}
