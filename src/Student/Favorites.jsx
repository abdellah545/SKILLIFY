import axios from "axios";
import React, { useEffect, useState } from "react";
import baseURL from "../BaseURL/BaseURL";
import { Link } from "react-router-dom";
import { getCookie } from "../Helper/CookiesHelper";
import style from "./MyCourses.module.css"; // Reuse the glassmorphic course grid CSS

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "SKILLIFY | Favorites";

    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`${baseURL}/users/favorite`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "SHA " + getCookie("AccessTokenStudent"),
          },
        });
        setFavorites(response.data.favorite || []);
      } catch (err) {
        console.error("Error fetching favorites", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return (
      <div className={style.loadingWrapper}>
        <div className="spinner-border" style={{ width: "4rem", height: "4rem", color: "#5151D3" }} role="status"></div>
        <p>Loading your favorite courses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={style.pageContainer}>
        <div className="alert alert-danger text-center fw-bold" style={{ borderRadius: 16 }}>
          Oops! Failed to load favorites: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className={style.pageContainer}>
      {/* ── Page Header ── */}
      <div className={style.pageHeader}>
        <h1 className={style.pageTitle}>Favorite Courses</h1>
        <p className={style.pageSubtitle}>
          Courses you've bookmarked to check out later.
        </p>
        <div className={style.headerActions}>
          <div className={style.statsChip}>
            <span>{favorites.length}</span> Saved Items
          </div>
        </div>
      </div>

      {/* ── Course Grid ── */}
      {favorites.length > 0 ? (
        <div className={style.courseGrid}>
          {favorites.map((course) => (
            <div key={course._id} className={style.courseCard}>
              <div className={style.cardImageWrapper}>
                <Link to={`/courseDetails/${course._id}`}>
                  <img
                    src={course.image || "https://picsum.photos/400/225"}
                    className={style.cardImage}
                    alt={course.title}
                  />
                </Link>
                <div className={style.cardOverlay}>
                  <span className={`${style.badge} ${style.availableBadge}`}>
                    <i className="fa-solid fa-heart me-1" style={{ color: "#dc2626" }}></i> Favorited
                  </span>
                </div>
              </div>
              
              <div className={style.cardBody}>
                <h3 className={style.cardTitle}>{course.title}</h3>
                <p className={style.cardDesc}>
                  {course.description || "No description provided for this course."}
                </p>
                
                <div className={style.cardMeta}>
                  <div className={style.cardMetaItem}>
                    <i className="fa-regular fa-clock" style={{ color: "#94a3b8" }}></i>
                    <span>Updated: {new Date(course.updatedAt).toLocaleDateString()}</span>
                  </div>
                  <div className={style.cardMetaItem}>
                    <i className="fas fa-users"></i>
                    <span>{course.students?.length || 0}</span>
                  </div>
                </div>

                <Link
                  to={`/courseDetails/${course._id}`}
                  className={style.viewCourseBtn}
                >
                  View Details <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={style.emptyState}>
          <div style={{ fontSize: "4rem", marginBottom: "16px" }}>❤️</div>
          <h4>No favorites yet!</h4>
          <p>You haven't added any courses to your favorites.</p>
          <Link to="/categories" className="btn mt-3" style={{ background: "#5151D3", color: "white", padding: "10px 24px", borderRadius: "10px", fontWeight: "bold" }}>
             Explore Courses
          </Link>
        </div>
      )}
    </div>
  );
}
