import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import baseURL from "../BaseURL/BaseURL";
import { getCookie } from "../Helper/CookiesHelper";
import style from "./MyCourses.module.css"; // Reuse the glassmorphic course grid CSS

export default function Categories() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCourses, setTotalCourses] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const limit = 6;
  const pageCount = Math.ceil(totalCourses / limit);

  const fetchCourses = useCallback(
    (isSubmit = false) => {
      document.title = "SKILLIFY | Courses";
      if (isSubmit) setLoading(true);
      const url = `${baseURL}/users/courses/?page=${currentPage}&limit=${limit}`;
      axios
        .get(url, {
          headers: {
            Authorization: "SHA " + getCookie("AccessTokenStudent"),
          },
        })
        .then((response) => {
          setCourses(response.data.searchResults || []);
          setTotalCourses(response.data.total || 0);
          setLoading(false);
          setIsSubmitting(false);
        })
        .catch((error) => {
          console.error("There was an error!", error);
          setError(error);
          setLoading(false);
          setIsSubmitting(false);
        });
    },
    [currentPage, limit]
  );

  useEffect(() => {
    fetchCourses(isSubmitting);
  }, [fetchCourses, isSubmitting]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(totalCourses / limit)) {
      setCurrentPage(newPage);
      setIsSubmitting(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading && !courses.length) {
    return (
      <div className={style.loadingWrapper}>
        <div className="spinner-border" style={{ width: "4rem", height: "4rem", color: "#5151D3" }} role="status"></div>
        <p>Loading course catalog...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={style.pageContainer}>
        <div className="alert alert-danger text-center fw-bold" style={{ borderRadius: 16 }}>
          Oops! {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className={style.pageContainer}>
      {/* ── Page Header ── */}
      <div className={style.pageHeader}>
        <h1 className={style.pageTitle}>SKILLIFY Courses</h1>
        <p className={style.pageSubtitle}>
          Explore our vast catalog of expert-led courses and learn from the best.
        </p>
        <div className={style.headerActions}>
          <div className={style.statsChip}>
            <span>{totalCourses}</span> Available Courses
          </div>
        </div>
      </div>

      {loading && isSubmitting && (
         <div className="text-center mb-4"><div className="spinner-border text-primary" role="status"></div></div>
      )}

      {/* ── Course Grid ── */}
      {courses.length > 0 ? (
        <>
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
                    View Details <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pageCount > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginTop: '40px' }}>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || loading}
                style={{ 
                  width: '44px', height: '44px', borderRadius: '50%', border: 'none',
                  background: currentPage === 1 ? '#f1f5f9' : '#5151D3',
                  color: currentPage === 1 ? '#94a3b8' : 'white',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s'
                }}
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              
              <span style={{ fontWeight: 700, color: '#1e293b', fontSize: '1rem' }}>
                Page {currentPage} of {pageCount}
              </span>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= pageCount || loading}
                style={{ 
                  width: '44px', height: '44px', borderRadius: '50%', border: 'none',
                  background: currentPage >= pageCount ? '#f1f5f9' : '#5151D3',
                  color: currentPage >= pageCount ? '#94a3b8' : 'white',
                  cursor: currentPage >= pageCount ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s'
                }}
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          )}
        </>
      ) : (
        <div className={style.emptyState}>
          <div style={{ fontSize: "4rem", marginBottom: "16px" }}>📚</div>
          <h4>No courses available right now!</h4>
          <p>Please check back later.</p>
        </div>
      )}
    </div>
  );
}
