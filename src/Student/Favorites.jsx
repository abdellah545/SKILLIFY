import axios from "axios";
import React, { useEffect, useState } from "react";
import baseURL from "../BaseURL/BaseURL";
import { Link } from "react-router-dom";
import { getCookie } from "../Helper/CookiesHelper";
import "../Components/loading.css"; // Ensure this CSS file contains the styles for the loading spinner

export default function Favorites() {
  const [favorites, setFavorites] = useState([]); // State to hold favorite courses
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to manage errors

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "SKILLIFY | Favorites";

    const headers = {
      "Content-Type": "application/json",
      Authorization: "SHA " + getCookie("AccessTokenStudent"),
    };

    axios
      .get(`${baseURL}/users/favorite`, { headers })
      .then((response) => {
        setFavorites(response.data.favorite); // Assuming the response has a 'favorite' array
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching favorites", error);
        setError(error); // Set error state
        setLoading(false); // Set loading to false after error
      });
  }, []);

  if (loading)
    return (
      <div className="redirect">
        <div className="loader"></div>
      </div>
    ); // Loading message
  if (error) return <div>Error: {error.message}</div>;
  if (!favorites.length)
    return <div className="text-center fw-bold fs-1">No favorite courses found!</div>;

  return (
    <>
      <div className="container py-5">
        <div className="row">
          <div className="col-12">
            <h1 style={{ color: "#5151D3" }}>Favorite Courses</h1>
          </div>
          <hr />

          {favorites.map((course) => (
            <div className="col-lg-4 col-md-6 col-sm-12" key={course._id}>
              <div className="card mb-3">
                <Link to={`/courseDetails/${course._id}`}>
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
                      alt={course.title}
                      style={{
                        objectFit: "cover",
                        height: "250px",
                        width: "100%",
                      }}
                    />
                  </div>
                </Link>
                <div className="card-body">
                  <h3
                    className="card-title text-center fw-bold"
                    style={{ color: "#5151D3" }}
                  >
                    {course.title}
                  </h3>
                  <p className="card-text col-12 text-truncate">
                    {course.description}
                  </p>
                </div>
                <div className="card-footer">
                  <small className="text-muted">
                    <span style={{ color: "#5151D3" }}>Last updated: </span>
                    {new Date(course.updatedAt).toLocaleString()}
                  </small>
                  <br />
                  <small className="text-muted">
                    <i
                      className="fas fa-users"
                      style={{ color: "#5151D3" }}
                    ></i>{" "}
                    <span style={{ color: "#5151D3" }}>Users: </span>
                    {course.students?.length || 0}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
