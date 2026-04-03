import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getCookie } from "../Helper/CookiesHelper";
import baseURL from "../BaseURL/BaseURL";
import style from "./MyCourses.module.css";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "SKILLIFY | My Courses";

    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseURL}/users/mycourses`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "SHA " + getCookie("AccessTokenStudent"),
          },
        });
        setCourses(response.data.courses || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the courses:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className={style.loadingWrapper}>
        <div className="spinner-border" style={{ width: "3rem", height: "3rem", color: "#5151D3" }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading your learning journey...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={style.pageContainer}>
        <div className="alert alert-danger text-center fw-bold" role="alert" style={{ borderRadius: 16 }}>
          Oops! Something went wrong: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className={style.pageContainer}>
      {/* ── Page Header ── */}
      <div className={style.pageHeader}>
        <h1 className={style.pageTitle}>Your Courses</h1>
        <p className={style.pageSubtitle}>
          Explore the SKILLIFY Courses, learn from the best, and achieve your goals.
        </p>
        <div className={style.headerActions}>
          <div className={style.statsChip}>
            <span>{courses.length}</span> Total Enrolled
          </div>
        </div>
      </div>

      {/* ── Course Grid ── */}
      {courses.length > 0 ? (
        <div className={style.courseGrid}>
          {courses.map((course) => (
            <div key={course._id} className={style.courseCard}>
              <div className={style.cardImageWrapper}>
                <img
                  src={course.image || "https://picsum.photos/400/225"}
                  className={style.cardImage}
                  alt={course.title}
                />
                <div className={style.cardOverlay}>
                  {course.available ? (
                    <span className={`${style.badge} ${style.availableBadge}`}>
                      <i className="fas fa-check me-1"></i> Available
                    </span>
                  ) : (
                    <span className={`${style.badge} ${style.unavailableBadge}`}>
                      <i className="fas fa-lock me-1"></i> Unavailable
                    </span>
                  )}
                </div>
              </div>
              
              <div className={style.cardBody}>
                <h3 className={style.cardTitle}>{course.title}</h3>
                <p className={style.cardDesc}>
                  {course.description || "No description provided for this course."}
                </p>
                
                <div className={style.cardMeta}>
                  <div className={style.cardMetaItem}>
                    <i className="fas fa-users"></i>
                    <span>{course.students?.length || 0} Students</span>
                  </div>
                  <div className={style.cardMetaItem}>
                    <i className="fas fa-star" style={{ color: "#fbbf24" }}></i>
                    <span>{course.rating || "0.0"} Rating</span>
                  </div>
                </div>

                <Link
                  to={`/courseDetails/${course._id}`}
                  className={style.viewCourseBtn}
                >
                  Continue Learning <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={style.emptyState}>
          <div style={{ fontSize: "4rem", marginBottom: "16px" }}>📚</div>
          <h4>No courses found!</h4>
          <p>You haven't enrolled in any courses yet. Start your journey today!</p>
          <Link to="/" className="btn mt-3" style={{ background: "#5151D3", color: "white", padding: "10px 24px", borderRadius: "10px", fontWeight: "bold" }}>
             Browse Courses
          </Link>
        </div>
      )}
    </div>
  );
}
