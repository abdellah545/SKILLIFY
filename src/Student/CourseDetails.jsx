import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import baseURL from "../BaseURL/BaseURL";
import { useParams } from "react-router-dom";
import "../Components/loading.css";
import { getCookie, setCookie } from "../Helper/CookiesHelper";
import Modal from "react-bootstrap/Modal";
import style from "./Categories.module.css";
import logo from "../assets/icon-logo.png";
import { Button } from "react-bootstrap";

export default function CourseDetails() {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addloading, setAddLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [courseContent, setCourseContent] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loadingContent, setLoadingContent] = useState(false);

  const { id } = useParams();

  const fetchCourseContent = async () => {
    setLoadingContent(true);
    const token = getCookie("AccessTokenStudent");
    console.log("Token:", token); // Debugging: Log the token to the console

    try {
      const response = await axios.get(
        `${baseURL}/users/courses/content/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "SHA " + token,
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
    const fetchCourseDetails = async () => {
      const token = getCookie("AccessTokenStudent");
      console.log("Token:", token); // Debugging: Log the token to the console

      try {
        const response = await axios.get(`${baseURL}/users/courses/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "SHA " + token,
          },
        });
        setCourse(response.data);
        setLoading(false);

        const courses = JSON.parse(getCookie("courses") || "[]");
        setIsPurchased(courses.includes(id));

        const cart = JSON.parse(getCookie("cart") || "[]");
        setIsInCart(cart.includes(id));

        const favoriteIds = JSON.parse(getCookie("favorites") || "[]");
        setIsFavorite(favoriteIds.includes(id));

        // Fetch course content only if the course is purchased
        if (courses.includes(id)) {
          fetchCourseContent();
        }
      } catch (err) {
        setError("Failed to fetch course details");
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

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

  const handleAddToCart = async (e) => {
    setAddLoading(true);
    e.preventDefault();
    const token = getCookie("AccessTokenStudent");
    console.log("Token:", token); // Debugging: Log the token to the console

    try {
      await axios.post(
        `${baseURL}/users/cart/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "SHA " + token,
          },
        }
      );
      Swal.fire("Success", "Course added to cart successfully", "success").then(
        () => {
          window.location.reload();
        }
      );
      setAddLoading(false);
      const cart = JSON.parse(getCookie("cart") || "[]");

      if (!cart.includes(id)) {
        cart.push(id);
        setCookie("cart", JSON.stringify(cart));
      }
    } catch (err) {
      console.error(err);
      Swal.fire(
        "Error",
        "You already bought this course before, or is already in your cart",
        "error"
      );
      setAddLoading(false);
    }
  };

  const toggleFavorite = async () => {
    let favorites = JSON.parse(getCookie("favorites") || "[]");
    const token = getCookie("AccessTokenStudent");
    console.log("Token:", token); // Debugging: Log the token to the console

    if (isFavorite) {
      const index = favorites.indexOf(id);
      if (index > -1) {
        favorites.splice(index, 1);
      }
      setCookie("favorites", JSON.stringify(favorites));
      setIsFavorite(false);

      try {
        await axios.delete(`${baseURL}/users/favorite/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "SHA " + token,
          },
        });
        Swal.fire(
          "Success",
          "Course removed from favorites successfully",
          "success"
        ).then(() => {
          window.location.reload();
        });
      } catch (err) {
        console.error(err);
        Swal.fire(
          "Error",
          "Failed to remove the course from favorites",
          "error"
        );
      }
    } else {
      favorites.push(id);
      setCookie("favorites", JSON.stringify(favorites));
      setIsFavorite(true);

      try {
        await axios.post(
          `${baseURL}/users/favorite/${id}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "SHA " + token,
            },
          }
        );
        Swal.fire(
          "Success",
          "Course added to favorites successfully",
          "success"
        ).then(() => {
          window.location.reload();
        });
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "The Course is already in your favorites", "error");
      }
    }
  };

  if (loading)
    return (
      <div className="redirect">
        <div className="loader"></div>
      </div>
    );

  if (error) return <div>Error: {error.toString()}</div>;

  if (!course) return <div>No course found!</div>;

  return (
    <>
      <div className="container-fluid my-5">
        <div className="row">
          <div className="col-lg-7 col-md-12 col-sm-12">
            <h1 className="text-center fw-bold" style={{ color: "#5151D3" }}>
              {course.title}
            </h1>
            <p className="text-center fs-5 fw-bold text-muted">
              Here you are on the right path to becoming a hero in your field by
              enabling you to achieve your goals.
            </p>
            <hr />
            <p
              className="text-center fs-5 fw-bold"
              style={{ color: "#5151D3" }}
            >
              This course created by:{" "}
              <span className="text-capitalize text-muted">
                {course.instructorId?.name || "Unknown"}
              </span>
            </p>
            <div className="row">
              <div className="col-lg-6 text-center">
                <p className="fs-5 fw-bold" style={{ color: "#5151D3" }}>
                  Last Updated:{" "}
                  <span className="text-muted">
                    {new Date(course.updatedAt).toLocaleDateString()}
                  </span>
                </p>
              </div>
              <div className="col-lg-6 text-center">
                <p className="fs-5 fw-bold" style={{ color: "#5151D3" }}>
                  Course Duration:{" "}
                  <span className="text-muted">{course.duration} hours</span>
                </p>
              </div>
              <div className="col-lg-6 text-center">
                <p className="fs-5 fw-bold" style={{ color: "#5151D3" }}>
                  Language:{" "}
                  <span className="text-muted text-capitalize">
                    {course.language}
                  </span>
                </p>
              </div>
              <div className="col-lg-6 text-center">
                <p className="fs-5 fw-bold" style={{ color: "#5151D3" }}>
                  Language Level:{" "}
                  <span className="text-muted text-capitalize">
                    {course.level}
                  </span>
                </p>
              </div>
            </div>
            <hr />
            <h1
              className="text-center mt-3 fw-bold"
              style={{ color: "#5151D3" }}
            >
              Course Content
            </h1>

            {isPurchased ? (
              loadingContent ? (
                <div className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
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
              )
            ) : (
              <div className="text-center fw-bold fs-5">No Content Yet , Purchase course to see content</div>
            )}
          </div>
          <div
            className="col-lg-5 text-center d-flex justify-content-center"
            style={{ height: "450px" }}
          >
            <div className="card">
              <img
                src={course.image || "https://picsum.photos/200"}
                className="img-fluid"
                alt={course.title}
                style={{ height: "250px", width: "100%" }}
              />
              <div className="card-body">
                <h3 className="card-title fw-bold">
                  Price:{" "}
                  <span style={{ color: "#5151D3" }}>${course.price}</span>
                </h3>
                <p>{course.description}</p>
                <button
                  onClick={!isInCart && !isPurchased ? handleAddToCart : null}
                  className="btn btn-primary w-75 fw-bold"
                  disabled={isInCart || isPurchased || addloading}
                >
                  {isInCart
                    ? "Already in your cart"
                    : isPurchased
                    ? "Purchase Complete"
                    : addloading
                    ? "Adding..."
                    : "Add to Cart"}
                </button>

                <div className="mt-3 d-flex justify-content-end">
                  <button
                    className="border-0 bg-white"
                    onClick={toggleFavorite}
                    style={{ color: isFavorite ? "red" : "gray" }}
                  >
                    <i
                      className={`fa${
                        isFavorite ? "-solid" : "-regular"
                      } fa-heart fs-1`}
                    ></i>
                  </button>
                </div>
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
