import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import baseURL from "../BaseURL/BaseURL";
import { getCookie } from "../Helper/CookiesHelper";
import { useForm } from "react-hook-form";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCourses, setTotalCourses] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const limit = 6;
  const fetchCourses = useCallback(() => {
    document.title = "SKILLIFY | Categories";
    setLoading(true);
    const url = `${baseURL}/users/courses/?page=${currentPage}&limit=${limit}`;
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "SHA " + getCookie("AccessTokenStudent"),
        },
      })
      .then((response) => {
        setCourses(response.data.searchResults); // This ensures that only the current page's courses are displayed
        setTotalCourses(response.data.total);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        setError(error);
        setLoading(false);
      });
  }, [currentPage, limit]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(totalCourses / limit)) {
      setCurrentPage(newPage);
    }
  };

  if (loading)
    return (
      <div className="redirect">
        <div className="loader"></div>
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;
  if (!courses.length)
    return <div className="text-center fw-bold fs-1">No courses found!</div>;

  return (
    <div className="container my-5 pb-5">
      <h1 className="text-center fw-bold mb-3" style={{ color: "#5151D3" }}>
        SKILLIFY Courses
      </h1>
      <hr />
      <div className="d-flex justify-content-between">
        <p className="text-center fw-bold" style={{ color: "#5151D3" }}>
          Explore the SKILLIFY Courses, learn from the best.
        </p>
        <p className="fw-bold">Total Courses: {totalCourses}</p>
      </div>
      <hr />
      <div className="row">
        {courses.map((course) => (
          <div key={course._id} className="col-lg-4 col-md-6 col-sm-12 mb-3">
            <div className="card">
              <Link
                to={`/courseDetails/${course._id}`}
                style={{ textDecoration: "none" }}
              >
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
              </Link>
              <div className="card-body p-2">
                <h3
                  className="card-title text-center fw-bold"
                  style={{ color: "#5151D3" }}
                >
                  {course.title}
                </h3>
                {course.available ? (
                  <p className="card-text text-center text-success">
                    Available <i className="fas fa-check"></i>
                  </p>
                ) : (
                  <p className="card-text text-center text-danger">
                    Not Available <i className="fas fa-times"></i>
                  </p>
                )}
                <div className="card-text mb-1">
                  <div className="row">
                    <div className="col-12 text-truncate">
                      {course.description}
                    </div>
                  </div>
                </div>
                <p className="card-footer d-flex justify-content-between align-items-center bg-white">
                  <div>
                    <i
                      className="fas fa-users"
                      style={{ color: "#5151D3" }}
                    ></i>{" "}
                    <span style={{ color: "#5151D3" }}>Users: </span>
                    {course.students?.length || 0}
                  </div>
                  <div>
                    <i className="fas fa-star" style={{ color: "#5151D3" }}></i>
                    <span style={{ color: "#5151D3" }}>Rating: </span>
                    {course.rating || 0}
                  </div>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center align-items-center ">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn-primary"
          style={{ marginRight: "5px" }}
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage * limit >= totalCourses}
          className="btn btn-primary"
          style={{ marginLeft: "5px" }}
        >
          <i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}
