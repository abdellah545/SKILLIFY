import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./Profile.module.css";
import { getCookie } from "../Helper/CookiesHelper";

export default function Profile() {
  document.title = "SKILLIFY | Profile";

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // "en-GB" formats the date as DD/MM/YYYY
  };

  const createdAt = formatDate(getCookie("createdAt"));
  const updatedAt = formatDate(getCookie("updatedAt"));

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "https://165.232.129.48:3000/users/mycourses",
          {
            headers: {
              Authorization: "SHA " + getCookie("AccessTokenStudent"),
            },
          }
        );
        setCourses(response.data.courses);
      } catch (error) {
        setError("Failed to fetch courses");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const groupByCategory = (courses) => {
    return courses.reduce((acc, course) => {
      const category = course.category || "Uncategorized"; // Replace with actual category field
      if (!acc[category]) acc[category] = [];
      acc[category].push(course);
      return acc;
    }, {});
  };

  const categorizedCourses = groupByCategory(courses);

  if (loading)
    return (
      <div className="redirect">
        <div className="loader"></div>
      </div>
    ); // Loading message

  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <section className={`my-5 container`}>
        <div className="row justify-content-between">
          <div className="col-lg-5 col-md-12">
            <div className={`row ${style.profile_info}`}>
              <div className="col-lg-3 col-md-3">
                <img
                  src={sessionStorage.getItem("userImage")}
                  alt="Profile"
                  className="img-fluid"
                  width={"250px"}
                  // height={100}
                />
              </div>
              <div className="col-lg-9 col-md-9">
                <h4 className="fw-bold">{getCookie("userName")}</h4>
                <p className="fw-bold" style={{ color: "#5151D3" }}>
                  Gender :{" "}
                  <span style={{ color: "black" }}>{getCookie("gender")}</span>
                </p>
                <hr />
                <p className="fw-bold" style={{ color: "#5151D3" }}>
                  Phone :{" "}
                  <span style={{ color: "black" }}>{getCookie("phone")}</span>
                </p>
              </div>
              <hr />
              <h4 className="fw-bold" style={{ color: "#5151D3" }}>
                Contact Info :
              </h4>
              <hr className="w-50" />
              <p className="fw-bold" style={{ color: "#5151D3" }}>
                <i
                  className="fa-regular fa-envelope fw-bold"
                  style={{ color: "#5151D3" }}
                ></i>{" "}
                Email Address :{" "}
                <span style={{ color: "black" }}>
                  <a
                    href={`mailto:${getCookie("userEmail")}}?subject=Contact`}
                    className="link"
                  >
                    {getCookie("userEmail")}
                  </a>
                </span>
              </p>
              <p className="fw-bold" style={{ color: "#5151D3" }}>
                <i
                  className="fa-brands fa-whatsapp fw-bold"
                  style={{ color: "#5151D3" }}
                ></i>{" "}
                WhatsApp :{" "}
                <span style={{ color: "black" }}>
                  <a
                    href={`https://wa.me/${getCookie("phone")}`}
                    className="link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {getCookie("phone")}
                  </a>
                </span>
              </p>
              <hr />
              <p className="fw-bold" style={{ color: "#5151D3" }}>
                Created At : <span style={{ color: "black" }}>{createdAt}</span>
              </p>
              <p className="fw-bold" style={{ color: "#5151D3" }}>
                Updated At : <span style={{ color: "black" }}>{updatedAt}</span>
              </p>
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className={`row ${style.profile_info}`}>
              <h3 className="fw-bold" style={{ color: "#5151D3" }}>
                Courses
              </h3>
              {Object.keys(categorizedCourses).map((category) => (
                <div key={category} className="my-4">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th style={{ color: "#5151D3", textAlign: "center" }}>
                          Title
                        </th>
                        <th style={{ color: "#5151D3", textAlign: "center" }}>
                          Duration
                        </th>
                        <th style={{ color: "#5151D3", textAlign: "center" }}>
                          Status
                        </th>
                        <th style={{ color: "#5151D3", textAlign: "center" }}>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {categorizedCourses[category].length > 0 ? (
                        categorizedCourses[category].map((course) => (
                          <tr key={course._id}>
                            <td style={{ textAlign: "center" }}>
                              {course.title}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {course.duration} hours
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {course.available ? "Available" : "Not Available"}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <a
                                href={`/courseDetails/${course._id}`}
                                className="btn btn-primary"
                              >
                                View Details
                              </a>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center">
                            No courses available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
