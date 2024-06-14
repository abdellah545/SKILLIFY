import React, { useState, useRef } from "react";
import style from "./EditCourse.module.css";
import SidebarInstructor from "./SidebarInstructor";
import TagsInput from "./TagsInput";

export default function EditCourse() {
  const [subtitle, setSubtitle] = useState("");
  const [topics, setTopics] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [accrued_skills, setAccrued_skills] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreviewUrl(URL.createObjectURL(file));
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
                Edit Course
              </h2>
              <hr />
              <form>
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-lg-12 d-flex justify-content-center align-items-center mt-3">
                      <div className="col-lg-6">
                        <input
                          type="file"
                          accept="image/*" // Only accept image files
                          className={`custom_file_input ${style.custom_file_input}`}
                          id="customFile"
                          ref={fileInputRef}
                          onChange={handleImageChange}
                        />
                        <label
                          htmlFor="customFile"
                          className={`custom_file_label fw-bold w-100 ${style.custom_file_label}`}
                        >
                          <i
                            className="fa-solid fa-upload fs-3"
                            style={{ color: "#5151D3" }}
                          ></i>
                          {"  "}
                          Upload course image
                        </label>
                        {imagePreviewUrl && (
                          <div className="mt-3 text-center">
                            <img
                              src={imagePreviewUrl}
                              alt="Course Preview"
                              className="img-thumbnail d-block mx-auto"
                              style={{
                                borderRadius: "5px",
                                width: "200px",
                                height: "200px",
                              }}
                              onLoad={() =>
                                URL.revokeObjectURL(imagePreviewUrl)
                              }
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <br />
                    </div>

                    <div className="col-lg-5 col-md-12 col-sm-12">
                      <label
                        htmlFor="subtitle"
                        className="fw-bold fs-6 d-block"
                      >
                        Subtitle
                      </label>
                      <input
                        type="text"
                        className={`mt-1 ${style.input}`}
                        id="subtitle"
                        placeholder="Enter subtitle"
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                      />
                    </div>

                    <div>
                      <br />
                    </div>
                    <div className="col-lg-5 col-md-12 col-sm-12">
                      <label htmlFor="topics" className="fw-bold fs-6 d-block">
                        Topics
                      </label>
                      <TagsInput
                        value={topics}
                        setValue={setTopics}
                        placeholder="Add topics"
                      />
                    </div>

                    <div>
                      <br />
                    </div>

                    <div className="col-lg-5 col-md-12 col-sm-12">
                      <label
                        htmlFor="keywords"
                        className="fw-bold fs-6 d-block"
                      >
                        Keywords
                      </label>
                      <TagsInput
                        value={keywords}
                        setValue={setKeywords}
                        placeholder="Add keywords"
                      />
                    </div>
                    <div>
                      <br />
                    </div>
                    <div className="col-lg-5 col-md-12 col-sm-12">
                      <label
                        htmlFor="skillsAccrued"
                        className="fw-bold fs-6 d-block"
                      >
                        Skills Accrued
                      </label>
                      <TagsInput
                        value={accrued_skills}
                        setValue={setAccrued_skills}
                        placeholder="Add skills accrued"
                      />
                    </div>
                  </div>
                </div>
              </form>
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
