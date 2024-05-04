import React, { useState } from "react";
import style from "./AddCourse.module.css";
import SidebarInstructor from "./SidebarInstructor";
import axios from "axios";
import baseURL from "../../BaseURL/BaseURL";
import TagsInput from "./TagsInput";
import Swal from "sweetalert2";
import { getCookie } from "../../Helper/CookiesHelper";

export default function AddCourse() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("");
  const [availability, setAvailability] = useState("");
  const [updateEligibility, setUpdateEligibility] = useState("");
  const [topics, setTopics] = useState([]);
  const [prerequisites, setPrerequisites] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [accrued_skills, setAccrued_skills] = useState([]);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  // Event handler for file input changes
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("");
    }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${baseURL}/instructors/courses/add`,
        {
          title: title,
          subtitle: subtitle,
          image: image,
          description: description,
          price: price,
          duration: duration,
          language: language,
          level: level,
          available: availability,
          update_eligibility: updateEligibility,
          topics: topics,
          prerequisite: prerequisites,
          keywords: keywords,
          skills_accrued: accrued_skills,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization:
              "SHA " + getCookie("AccessTokenInstructor"),
          },
        }
      );
      Swal.fire({
        position: "Center",
        icon: "success",
        title: "Course added successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      setLoading(false);
      // console.log(res.data);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  return (
    <>
      <div className={`${style.content}`}>
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
                Add Course
              </h2>

              <form onSubmit={handleAddCourse}>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="col-lg-12">
                      <label htmlFor="title" className="fw-bold fs-6 d-block">
                        Title
                      </label>
                      <input
                        type="text"
                        className={`mt-1 ${style.input}`}
                        id="title"
                        placeholder="Enter title"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <br />
                    <div className="col-lg-12">
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
                        onChange={(e) => setSubtitle(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 d-flex justify-content-center align-items-center mt-3">
                    <input
                      type="file"
                      class={`custom_file_input ${style.custom_file_input}`}
                      id="customFile"
                      onClick={handleFileChange}
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                    <label
                      htmlFor="customFile"
                      class={`custom_file_label fw-bold w-100 ${style.custom_file_label}`}
                    >
                      <i
                        class="fa-solid fa-upload fs-3"
                        style={{ color: "#5151D3" }}
                      ></i>
                      {"  "}
                      Upload course image
                    </label>
                    {fileName && ( // Display the file name if a file is selected
                      <div
                        className={`mt-2 text-center ${style.fileNameDisplay}`}
                      >
                        {fileName}
                      </div>
                    )}
                  </div>
                  <div className="col-lg-12 mt-3">
                    <label
                      htmlFor="description"
                      className="fw-bold fs-6 d-block"
                    >
                      Description
                    </label>
                    <input
                      type="text"
                      className={`mt-1 ${style.input}`}
                      id="description"
                      placeholder="Enter description"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="col-lg-6 mt-3">
                    <label htmlFor="duration" className="fw-bold fs-6 d-block">
                      Duration (in hours)
                    </label>
                    <input
                      type="number"
                      className={`mt-1 ${style.input}`}
                      id="duration"
                      placeholder="Enter duration"
                      onChange={(e) => setDuration(e.target.value)}
                      min={1}
                    />
                  </div>
                  <div className="col-lg-6 mt-3">
                    <label htmlFor="price" className="fw-bold fs-6 d-block">
                      Price
                    </label>
                    <input
                      type="text"
                      className={`mt-1 ${style.input}`}
                      id="price"
                      placeholder="Enter price"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="col-lg-6 mt-3">
                    <label htmlFor="language" className="fw-bold fs-6 d-block">
                      Language
                    </label>
                    <input
                      type="text"
                      className={`mt-1 ${style.input}`}
                      id="language"
                      placeholder="Enter language"
                      onChange={(e) => setLanguage(e.target.value)}
                    />
                  </div>
                  <div className="col-lg-6 mt-3">
                    <label htmlFor="level" className="fw-bold fs-6 d-block">
                      Level
                    </label>
                    <input
                      type="text"
                      className={`mt-1 ${style.input}`}
                      id="level"
                      placeholder="Enter level"
                      onChange={(e) => setLevel(e.target.value)}
                    />
                  </div>
                  <div className="col-lg-6 mt-3 text-center">
                    <label
                      htmlFor="availability"
                      className="fw-bold fs-6 d-block"
                    >
                      Availability
                    </label>
                    <input
                      type="radio"
                      name="availability"
                      id="availabilityYes"
                      value="true"
                      onChange={(e) => setAvailability(e.target.value)}
                    />
                    <label
                      htmlFor="availabilityYes"
                      className="me-3 ms-1 fw-bold fs-5"
                    >
                      True
                    </label>{" "}
                    &nbsp;{" "}
                    <input
                      type="radio"
                      name="availability"
                      id="availabilityNo"
                      value="false"
                      onChange={(e) => setAvailability(e.target.value)}
                    />
                    <label
                      htmlFor="availabilityNo"
                      className="me-3 ms-1 fw-bold fs-5"
                    >
                      False
                    </label>
                  </div>
                  <div className="col-lg-6 mt-3 text-center">
                    <label
                      htmlFor="updateEligibility"
                      className="fw-bold fs-6 d-block"
                    >
                      Update-Eligibilty
                    </label>
                    <input
                      type="radio"
                      name="updateEligibility"
                      id="updateEligibilityYes"
                      value="true"
                      onChange={(e) => setUpdateEligibility(e.target.value)}
                    />
                    <label
                      htmlFor="updateEligibilityYes"
                      className="me-3 ms-1 fw-bold fs-5"
                    >
                      True
                    </label>{" "}
                    &nbsp;{" "}
                    <input
                      type="radio"
                      name="updateEligibility"
                      id="updateEligibilityNo"
                      value="false"
                      onChange={(e) => setUpdateEligibility(e.target.value)}
                    />
                    <label
                      htmlFor="updateEligibilityNo"
                      className="me-3 ms-1 fw-bold fs-5"
                    >
                      False
                    </label>
                  </div>
                  <div className="col-lg-12">
                    <label htmlFor="topics" className="fw-bold fs-6 d-block">
                      Topics
                    </label>
                    <TagsInput
                      value={topics}
                      setValue={setTopics}
                      placeholder="Add topics"
                    />
                  </div>
                  <div className="col-lg-12 mt-3">
                    <label
                      htmlFor="prerequisite"
                      className="fw-bold fs-6 d-block"
                    >
                      Prerequisite
                    </label>
                    <TagsInput
                      value={prerequisites}
                      setValue={setPrerequisites}
                      placeholder="Add prerequisites"
                    />
                  </div>
                  <div className="col-lg-12 mt-3">
                    <label
                      htmlFor="accrued_skills"
                      className="fw-bold fs-6 d-block"
                    >
                      Accrued skills
                    </label>
                    <TagsInput
                      value={accrued_skills}
                      setValue={setAccrued_skills}
                      placeholder="Add accrued skills"
                    />
                  </div>
                  <div className="col-lg-12 mt-3">
                    <label htmlFor="keywords" className="fw-bold fs-6 d-block">
                      Keywords
                    </label>
                    <TagsInput
                      value={keywords}
                      setValue={setKeywords}
                      placeholder="Add keywords"
                    />
                  </div>
                </div>
                <div className="col-lg-12 mt-3 text-center">
                  <button
                    type="submit"
                    style={{ backgroundColor: "#5151D3" }}
                    className={`btn fw-bold text-white fs-4 ${style.btn}`}
                  >
                    {loading ? "Loading..." : "Add Course"}
                  </button>
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
