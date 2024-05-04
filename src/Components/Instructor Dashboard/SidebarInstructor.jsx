import React from "react";
import style from "./InstructorDashboard.module.css";
import logo from "../../assets/icon-logo.png";
import { Link } from "react-router-dom";
import { deleteCookie, getCookie } from "../../Helper/CookiesHelper";

export default function SidebarInstructor() {
  const handleLogout = () => {
    deleteCookie("AccessTokenInstructor");
    deleteCookie("InstructorImage");
    deleteCookie("InstructorName");

    window.location.pathname = "/";
  };
  return (
    <>
      <div className={`${style.sidebar}`}>
        <div className={`${style.sidebar_content}`}>
          <div className="row">
            <div className="col-lg-12 text-center mt-3">
              <div className="d-flex flex-column align-items-center">
                <img
                  src={getCookie("InstructorImage")}
                  style={{
                    width: "120px",
                    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
                    borderRadius: "50%",
                  }}
                  alt=""
                />
                <h4 className="mt-3" style={{ color: "#5151D3" }}>
                  {getCookie("InstructorName")}
                </h4>
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
                            <i class="fa-solid fa-house"></i> My Courses
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
                            <i class="fa-solid fa-house"></i> My Courses
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
                            <i class="fa-solid fa-folder-plus"></i> Add Course
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
                            <i class="fa-solid fa-folder-plus"></i> Add Course
                          </li>
                        </Link>
                      </>
                    )}

                    {window.location.pathname ===
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
                            <i class="fa-solid fa-pen-to-square"></i> Edit
                            Course
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
                            <i class="fa-solid fa-pen-to-square"></i> Edit
                            Course
                          </li>
                        </Link>
                      </>
                    )}

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
                            <i class="fa-solid fa-user-pen"></i> Edit Profile
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
                            <i class="fa-solid fa-user-pen"></i> Edit Profile
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
            <i class="fa-solid fa-arrow-right-from-bracket"></i> Log Out
          </button>
        </div>
      </div>
    </>
  );
}
