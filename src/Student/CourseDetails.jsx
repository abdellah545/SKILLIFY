import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import baseURL from "../BaseURL/BaseURL";
import { useParams } from "react-router-dom";
import "../Components/loading.css";
import { getCookie, setCookie } from "../Helper/CookiesHelper";

export default function CourseDetails() {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addloading, setAddLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`${baseURL}/users/courses/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "SHA " + getCookie("AccessTokenStudent"),
          },
        });
        setCourse(response.data);
        setLoading(false);

        // Check if the id is in the purchased array
        const courses = JSON.parse(getCookie("courses") || "[]");
        setIsPurchased(courses.includes(id));

        // Check if the id is in the cart array
        const cart = JSON.parse(getCookie("cart") || "[]");
        setIsInCart(cart.includes(id));

        const favoriteIds = JSON.parse(
          getCookie("favorites") || "[]"
        );
        setIsFavorite(favoriteIds.includes(id)); // Check if the id is in the favorites array
      } catch (err) {
        setError("Failed to fetch course details");
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  if (loading)
    return (
      <div className="redirect">
        <div class="loader"></div>
      </div>
    ); // Loading message
  if (error) return <div>Error: {error}</div>;
  if (!course) return <div>No course found!</div>;

  const handleAddToCart = async (e) => {
    setAddLoading(true);
    e.preventDefault();
    try {
      await axios.post(
        `${baseURL}/users/cart/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "SHA " + getCookie("AccessTokenStudent"),
          },
        }
      );
      Swal.fire("Success", "Course added to cart successfully", "success");
      setAddLoading(false);
      // Retrieve the existing cart from sessionStorage or initialize a new one
      const cart = JSON.parse(getCookie("cart") || "[]");

      // Add the current course ID to the cart array
      if (!cart.includes(id)) {
        // Check if the course ID is not already in the cart
        cart.push(id);
        setCookie("cart", JSON.stringify(cart)); // Update the cart in sessionStorage
      }
      setTimeout(() => {
        window.location.reload();
      }, 500);
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

    if (isFavorite) {
      // Remove from favorites
      const index = favorites.indexOf(id);
      if (index > -1) {
        favorites.splice(index, 1); // Remove the course from array
      }
      setCookie("favorites", JSON.stringify(favorites));
      setIsFavorite(false);

      try {
        await axios.delete(`${baseURL}/users/favorite/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "SHA " + getCookie("AccessTokenStudent"),
          },
        });
        Swal.fire(
          "Success",
          "Course removed from favorites successfully",
          "success"
        );
      } catch (err) {
        console.error(err);
        Swal.fire(
          "Error",
          "Failed to remove the course from favorites",
          "error"
        );
      }
    } else {
      // Add to favorites
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
              Authorization:
                "SHA " + getCookie("AccessTokenStudent"),
            },
          }
        );
        Swal.fire(
          "Success",
          "Course added to favorites successfully",
          "success"
        );
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "The Course is already in your favorites", "error");
      }
    }
  };

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
          </div>
          <div className="col-lg-5 text-center d-flex justify-content-center">
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
    </>
  );
}
