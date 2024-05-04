import React from "react";
import style from "./EditCourse.module.css";
import SidebarInstructor from "./SidebarInstructor";

export default function EditCourse() {
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
                Edit Course
              </h2>
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
