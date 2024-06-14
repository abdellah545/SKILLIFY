import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./InstructorDashboard.module.css";
import logo from "../../assets/icon-logo.png";
import courseImg from "../../assets/course.png";
import SidebarInstructor from "./SidebarInstructor";
import axios from "axios";
import { getCookie } from "../../Helper/CookiesHelper";
import baseURL from "../../BaseURL/BaseURL";

export default function InstructorDashboard() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/instructors/courses`,

          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "SHA " + getCookie("AccessTokenInstructor"),
            },
          }
        );
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
                {courses.length > 0 ? (
                  courses.map((course) => (
                    <div
                      key={course.id}
                      className="col-lg-3 col-md-12 col-sm-12"
                    >
                      <div className="card p-0">
                        <img
                          src={courseImg}
                          className="card-img img-fluid"
                          alt=""
                        />
                        <div className="card-body">
                          <h5 className="card-title text-center">
                            {course.title}
                          </h5>
                          <p className="card-text">{course.description}</p>
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
        <i class="fa-solid fa-right-long fs-4"></i>
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
