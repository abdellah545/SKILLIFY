import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InstructorLayout from "./InstructorLayout";
import style from "./InstructorDashboard.module.css";
import axios from "axios";
import { getCookie } from "../../Helper/CookiesHelper";
import baseURL from "../../BaseURL/BaseURL";

export default function InstructorDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${baseURL}/instructors/courses`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "SHA " + getCookie("AccessTokenInstructor"),
          },
        });
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filtered = courses.filter((c) =>
    (c.title ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <InstructorLayout title="My Courses">

      {/* Header */}
      <div className={style.pageHeader}>
        <div>
          <h2 className={style.pageTitle}>My Courses</h2>
          <p className={style.pageSubtitle}>Manage and update your courses</p>
        </div>
        <div className={style.headerActions}>
          <span className={style.statsChip}>
            <span>{courses.length}</span> Courses
          </span>
          <Link to="/instructor-dashboard/add-course" className={style.addBtn}>
            <i className="fa-solid fa-plus"></i> Add Course
          </Link>
        </div>
      </div>

      {/* Search */}
      <div className={style.searchBar}>
        <i className="fa-solid fa-magnifying-glass" style={{ color: "#94a3b8", marginRight: 10 }}></i>
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={style.searchInput}
        />
      </div>

      {/* Content */}
      {loading ? (
        <div className={style.loadingWrapper}>
          <div className="spinner-border" style={{ color: "#5151D3" }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading your courses...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className={style.emptyState}>
          <div style={{ fontSize: "3rem", marginBottom: 12 }}>📚</div>
          <h4>{courses.length === 0 ? "No courses yet" : "No results found"}</h4>
          <p>{courses.length === 0 ? "Start by adding your first course!" : "Try adjusting your search."}</p>
          {courses.length === 0 && (
            <Link to="/instructor-dashboard/add-course" className={style.addBtn} style={{ marginTop: 16 }}>
              <i className="fa-solid fa-plus"></i> Add Your First Course
            </Link>
          )}
        </div>
      ) : (
        <div className={style.courseGrid}>
          {filtered.map((course) => (
            <div key={course._id} className={style.courseCard}>
              <div className={style.cardImageWrapper}>
                <img src={course.image} alt={course.title} className={style.cardImage} />
                <div className={style.cardOverlay}>
                  <span className={style.ratingBadge}>⭐ {course.rating || 0}</span>
                </div>
              </div>
              <div className={style.cardBody}>
                <h3 className={style.cardTitle}>{course.title}</h3>
                <p className={style.cardDesc}>{course.description}</p>
                <div className={style.cardMeta}>
                  <span><i className="fas fa-users" style={{ marginRight: 5 }}></i>{course.students?.length || 0} students</span>
                  <span><i className="fas fa-star" style={{ marginRight: 5 }}></i>{course.rating || 0} rating</span>
                </div>
                <div className={style.cardActions}>
                  <Link to={`/instructor-dashboard/edit-course/${course._id}`} className={style.editBtn}>
                    <i className="fa-solid fa-pen-to-square"></i> Edit
                  </Link>
                  <Link to={`/instructor-dashboard/upload-content/${course._id}`} className={style.viewBtn}>
                    <i className="fa-solid fa-eye"></i> Content
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </InstructorLayout>
  );
}
