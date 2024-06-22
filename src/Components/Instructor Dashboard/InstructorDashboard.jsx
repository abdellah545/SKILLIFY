import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./InstructorDashboard.module.css";
import SidebarInstructor from "./SidebarInstructor";
import axios from "axios";
import { getCookie } from "../../Helper/CookiesHelper";
import baseURL from "../../BaseURL/BaseURL";

export default function InstructorDashboard() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${baseURL}/instructors/courses`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "SHA " + getCookie("AccessTokenInstructor"),
          },
        });
        setCourses(response.data);
      } catch (error) {
        console.error("There was an error fetching the courses!", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      <div className={`${style.content}`}>
        <div className="row g-0">
          <div className="col-lg-2 d-none d-lg-block">
            <SidebarInstructor />
          </div>
          <div className="col-lg-10 p-0">
            <div className={`col-lg-12 p-0 ${style.scrollableContainer}`}>
              <div className="row pt-3 mx-2 g-0">
                <button
                  className={`d-lg-none w-50 mx-auto mb-3 ${style.toggle_left_btn}`}
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#leftOffcanvas"
                  aria-controls="leftOffcanvas"
                >
                  Side Bar
                </button>
                <h1
                  className="text-center fw-bold"
                  style={{ color: "#5151D3" }}
                >
                  My Courses
                </h1>
                <hr />
                {courses.length > 0 ? (
                  courses.map((course) => (
                    <div
                      key={course.id}
                      className="col-lg-4 col-md-6 col-sm-12 mb-3 g-2"
                    >
                      <div className="card">
                        <div
                          className="card-img"
                          style={{
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
                          }}
                        >
                          <img
                            src={course.image}
                            className="img-fluid"
                            alt={course.title}
                            style={{
                              objectFit: "cover",
                              height: "250px",
                              width: "100%",
                            }}
                          />
                        </div>
                        <div className="card-body p-2 ">
                          <h3
                            className="card-title text-center fw-bold"
                            style={{ color: "#5151D3" }}
                          >
                            {course.title}
                          </h3>
                          <div className="card-text mb-1">
                            <div className="row">
                              <div className="col-12 text-truncate">
                                {course.description}
                              </div>
                            </div>
                          </div>
                          <hr />
                          <div className="card-text mb-3">
                            <div className="row">
                              <div className="col-6">
                                <Link
                                  to={`/instructor-dashboard/edit-course/${course._id}`}
                                  style={{ textDecoration: "none" }}
                                >
                                  <button className="btn btn-primary w-100">
                                    <i className="fa-solid fa-pen-to-square"></i>{" "}
                                    Edit Course
                                  </button>
                                </Link>
                              </div>
                              <div className="col-6">
                                <Link
                                  to={`/instructor-dashboard/upload-content/${course._id}`}
                                  style={{ textDecoration: "none" }}
                                >
                                  <button className="btn btn-primary w-100">
                                    <i className="fa-solid fa-eye"></i>{" "}
                                    View Content
                                  </button>
                                </Link>
                              </div>
                            </div>
                          </div>
                          <p className="card-footer d-flex justify-content-between align-items-center mb-0 bg-white">
                            <div>
                              <i
                                className="fas fa-users"
                                style={{ color: "#5151D3" }}
                              ></i>
                              <span style={{ color: "#5151D3" }}> Users: </span>
                              {course.students?.length || 0}
                            </div>
                            <div>
                              <i
                                className="fas fa-star"
                                style={{ color: "#5151D3" }}
                              ></i>
                              <span style={{ color: "#5151D3" }}>
                                {" "}
                                Rating:{" "}
                              </span>
                              {course.rating || 0}
                            </div>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center">
                    <p className="mt-3 fw-bold fs-1">No courses yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        className={`d-lg-none ${style.toggle_left_btn}`}
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#leftOffcanvas"
        aria-controls="leftOffcanvas"
      >
        <i className="fa-solid fa-right-long fs-4"></i>
      </button>
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
    </>
  );
}
