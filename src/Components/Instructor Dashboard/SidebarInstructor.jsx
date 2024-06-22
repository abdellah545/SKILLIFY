import React, { useState } from "react";
import style from "./InstructorDashboard.module.css";
import logo from "../../assets/icon-logo.png";
import { Link } from "react-router-dom";
import { deleteCookie, getCookie } from "../../Helper/CookiesHelper";

export default function SidebarInstructor() {
  const [showImageModal, setShowImageModal] = useState(false);

  const handleLogout = () => {
    deleteCookie("AccessTokenInstructor");
    deleteCookie("InstructorImage");
    deleteCookie("InstructorName");
    deleteCookie("VerifiedSignupInstructorToken");
    deleteCookie("LoginInstructorToken")

    window.location.pathname = "/";
  };

  const handleImageClick = () => {
    setShowImageModal(true);
  };

  const closeModal = () => {
    setShowImageModal(false);
  };

  return (
    <>
      <div className={`${style.sidebar}`}>
        <div className={`${style.sidebar_content}`}>
          <div className="row">
            <div className="col-lg-12 text-center mt-3">
              <div className="d-flex flex-column align-items-center">
                <div className={style.imageWrapper} onClick={handleImageClick}>
                  <img
                    src={getCookie("InstructorImage")}
                    className={style.profileImage}
                    alt=""
                  />
                  <div className={style.imageOverlay}>
                    <span className={style.overlayText}>View Image</span>
                  </div>
                </div>

                <Link
                  to="/instructor-profile"
                  style={{ textDecoration: "none" }}
                >
                  <h4 className="mt-3" style={{ color: "#5151D3" }}>
                    {getCookie("InstructorName")}
                  </h4>
                </Link>
                <div className="col-lg-12 text-center mt-5">
                  <ul className="list-unstyled">
                    {window.location.pathname === "/instructor-dashboard" ? (
                      <>
                        <Link
                          to="/instructor-dashboard"
                          style={{
                            textDecoration: "none",
                            color: "#5151D3",
                          }}
                          className={`${style.list}`}
                        >
                          <li
                            className={`mb-3 fw-bold`}
                            style={{
                              backgroundColor: "rgba(81, 81, 211, 0.3)",
                              padding: "10px",
                            }}
                          >
                            <i className="fa-solid fa-house"></i> My Courses
                          </li>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/instructor-dashboard"
                          style={{
                            textDecoration: "none",
                            color: "#5151D3",
                          }}
                          className={`${style.list}`}
                        >
                          <li
                            className={`mb-3 fw-bold`}
                            style={{ padding: "10px" }}
                          >
                            <i className="fa-solid fa-house"></i> My Courses
                          </li>
                        </Link>
                      </>
                    )}

                    {window.location.pathname ===
                    "/instructor-dashboard/add-course" ? (
                      <>
                        <Link
                          to="/instructor-dashboard/add-course"
                          style={{
                            textDecoration: "none",
                            color: "#5151D3",
                          }}
                          className={`${style.list}`}
                        >
                          <li
                            className={`mb-3 fw-bold`}
                            style={{
                              backgroundColor: "rgba(81, 81, 211, 0.3)",
                              padding: "10px",
                            }}
                          >
                            <i className="fa-solid fa-folder-plus"></i> Add
                            Course
                          </li>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/instructor-dashboard/add-course"
                          style={{
                            textDecoration: "none",
                            color: "#5151D3",
                          }}
                          className={`${style.list}`}
                        >
                          <li
                            className={`mb-3 fw-bold`}
                            style={{ padding: "10px" }}
                          >
                            <i className="fa-solid fa-folder-plus"></i> Add
                            Course
                          </li>
                        </Link>
                      </>
                    )}

                    {/* {window.location.pathname ===
                    "/instructor-dashboard/edit-course" ? (
                      <>
                        <Link
                          to="/instructor-dashboard/edit-course"
                          style={{
                            textDecoration: "none",
                            color: "#5151D3",
                          }}
                          className={`${style.list}`}
                        >
                          <li
                            className={`mb-3 fw-bold`}
                            style={{
                              backgroundColor: "rgba(81, 81, 211, 0.3)",
                              padding: "10px",
                            }}
                          >
                            <i className="fa-solid fa-pen-to-square"></i> Edit Course
                          </li>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/instructor-dashboard/edit-course"
                          style={{ textDecoration: "none", color: "#5151D3" }}
                          className={`${style.list}`}
                        >
                          <li
                            className={`mb-3 fw-bold`}
                            style={{ padding: "10px" }}
                          >
                            <i className="fa-solid fa-pen-to-square"></i> Edit Course
                          </li>
                        </Link>
                      </>
                    )} */}

                    {window.location.pathname ===
                    "/instructor-dashboard/edit-profile" ? (
                      <>
                        <Link
                          to="/instructor-dashboard/edit-profile"
                          style={{
                            textDecoration: "none",
                            color: "#5151D3",
                          }}
                          className={`${style.list}`}
                        >
                          <li
                            className={`mb-3 fw-bold`}
                            style={{
                              backgroundColor: "rgba(81, 81, 211, 0.3)",
                              padding: "10px",
                            }}
                          >
                            <i className="fa-solid fa-user-pen"></i> Edit
                            Profile
                          </li>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/instructor-dashboard/edit-profile"
                          style={{ textDecoration: "none", color: "#5151D3" }}
                          className={`${style.list}`}
                        >
                          <li
                            className={`mb-3 fw-bold`}
                            style={{ padding: "10px" }}
                          >
                            <i className="fa-solid fa-user-pen"></i> Edit
                            Profile
                          </li>
                        </Link>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${style.log_out} text-center mb-3`}>
          <button
            className="btn text-danger fw-bold fs-4"
            onClick={handleLogout}
          >
            <i className="fa-solid fa-arrow-right-from-bracket"></i> Log Out
          </button>
        </div>
      </div>

      {showImageModal && (
        <div className={style.modal} onClick={closeModal}>
          <img
            src={getCookie("InstructorImage")}
            alt="Instructor"
            className={style.modalImage}
          />
        </div>
      )}
    </>
  );
}
