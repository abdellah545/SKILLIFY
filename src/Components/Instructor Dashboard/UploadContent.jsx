import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import style from "./AddCourse.module.css";
import SidebarInstructor from "./SidebarInstructor";
import { getCookie } from "../../Helper/CookiesHelper";
import baseURL from "../../BaseURL/BaseURL";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/icon-logo.png";

export default function UploadContent() {
  const { id } = useParams(); // Extract the course ID from the URL
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState("");
  const [courseContent, setCourseContent] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loadingContent, setLoadingContent] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [error, setError] = useState(null);

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingUpload(true);

    const formData = new FormData();
    formData.append("video", video);
    formData.append("title", title);

    try {
      const response = await axios.post(
        `${baseURL}/instructors/courses/content/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "SHA " + getCookie("AccessTokenInstructor"),
          },
        }
      );

      Swal.fire({
        title: "Success",
        text: "Content uploaded successfully!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error("Error uploading content:", error);
      alert("An error occurred while uploading content");
    } finally {
      setLoadingUpload(false);
    }
  };

  const fetchCourseContent = async () => {
    setLoadingContent(true);
    try {
      const response = await axios.get(
        `${baseURL}/instructors/courses/content/${id}`,
        {
          headers: {
            Authorization: "SHA " + getCookie("AccessTokenInstructor"),
          },
        }
      );
      setCourseContent(response.data);
      setLoadingContent(false);
    } catch (error) {
      console.error("Error fetching course content:", error);
      setError(error);
      setLoadingContent(false);
    }
  };

  useEffect(() => {
    fetchCourseContent();
  }, []);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVideo(null);
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
              className={`container-fluid ${style.scrollableContainer} p-5 py-3`}
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
                Upload Content
              </h2>
              <hr />
              <div className="container">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3 w-50 mx-auto">
                    <label htmlFor="video" className="form-label fw-bold">
                      Video
                    </label>
                    <input
                      type="file"
                      accept="video/*" // Only accept video files
                      className={`form-control mt-1 mx-auto ${style.input}`}
                      id="video"
                      onChange={handleVideoChange}
                      required
                      style={{
                        border: "2px solid #5151D3",
                        borderRadius: "5px",
                        color: "#5151D3",
                      }}
                    />
                  </div>

                  <div className="mb-3 w-50 mx-auto">
                    <label htmlFor="title" className="form-label fw-bold">
                      Title
                    </label>
                    <input
                      type="text"
                      className={`mt-1 mx-auto ${style.input}`}
                      id="title"
                      placeholder="Session + Number (ex: Session 1)"
                      value={title}
                      onChange={handleTitleChange}
                      required
                      style={{
                        border: "2px solid #5151D3",
                        borderRadius: "5px",
                        color: "#5151D3",
                      }}
                    />
                  </div>

                  <div className="mb-3 w-50 mx-auto d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-primary w-50"
                      disabled={loadingUpload}
                    >
                      {loadingUpload ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        "Upload"
                      )}
                    </button>
                  </div>
                </form>

                <hr />
                <h1
                  className="text-center mt-3 fw-bold"
                  style={{ color: "#5151D3" }}
                >
                  Course Content
                </h1>

                {loadingContent ? (
                  <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : error ? (
                  <div className="text-center text-danger">
                    Error: {error.message}
                  </div>
                ) : courseContent.length === 0 ? (
                  <div className="text-center fw-bold fs-1">No Content Yet</div>
                ) : (
                  <div className="list-group w-75 mx-auto">
                    {courseContent.map((content) => (
                      <div
                        key={content._id}
                        className="list-group-item list-group-item-action d-flex align-items-center"
                        onClick={() => handleVideoClick(content)}
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          src={logo}
                          alt={content.title}
                          style={{
                            width: "80px",
                            height: "45px",
                            marginRight: "15px",
                            objectFit: "cover",
                          }}
                        />
                        <div>
                          <h5 className="mb-1">{content.title}</h5>
                          <small className="text-muted">
                            {formatDate(content.createdAt)}
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedVideo && (
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedVideo.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <video controls className="w-100">
              <source src={selectedVideo.media} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
