import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getCookie } from "../Helper/CookiesHelper";
import baseURL from "../BaseURL/BaseURL";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "SKILLIFY | My Courses";

    const fetchCourses = async () => {
      setLoading(true); // Set loading to true before the request
      try {
        const response = await axios.get(`${baseURL}/users/mycourses`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "SHA " + getCookie("AccessTokenStudent"),
          },
        });
        setCourses(response.data.courses);
        setLoading(false); // Set loading to false after the response is received
      } catch (error) {
        console.error("Error fetching the courses:", error);
        setError(error);
        setLoading(false); // Set loading to false if an error occurs
      }
    };

    fetchCourses();
  }, []);

  if (loading)
    return (
      <div className="redirect">
        <div className="loader"></div>
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;
  if (!courses.length) return <div className="text-center fw-bold fs-1">No courses found!</div>;

  return (
    <div className="container my-5 pb-5">
      <h1 className="text-center fw-bold mb-3" style={{ color: "#5151D3" }}>
        Your SKILLIFY Courses
      </h1>
      <hr />
      <div className="d-flex justify-content-between">
        <p className="text-center fw-bold" style={{ color: "#5151D3" }}>
          Explore the SKILLIFY Courses, learn from the best.
        </p>
        <p className="fw-bold">Total Courses: {courses.length}</p>
      </div>
      <hr />
      <div className="row">
        {courses.length > 0 ? (
          courses.map((course) => (
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
                      src={course.image || "https://picsum.photos/200"}
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
                      <i
                        className="fas fa-star"
                        style={{ color: "#5151D3" }}
                      ></i>
                      <span style={{ color: "#5151D3" }}>Rating: </span>
                      {course.rating || 0}
                    </div>
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No courses available</p>
        )}
      </div>
    </div>
  );
}
