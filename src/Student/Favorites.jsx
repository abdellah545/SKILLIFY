import axios from "axios";
import React, { useEffect, useState } from "react";
import baseURL from "../BaseURL/BaseURL";
import { Link } from "react-router-dom";
import { getCookie } from "../Helper/CookiesHelper";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]); // State to hold favorite courses

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
      })
      .catch((error) => {
        console.error("Error fetching favorites", error);
      });
  }, []);
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
