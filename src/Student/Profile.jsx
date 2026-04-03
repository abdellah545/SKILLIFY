/* eslint-disable */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import style from "./Profile.module.css";
import { getCookie } from "../Helper/CookiesHelper";
import baseURL from "../BaseURL/BaseURL";

export default function Profile() {
  document.title = "SKILLIFY | Profile";

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const createdAt = formatDate(getCookie("createdAt"));
  const updatedAt = formatDate(getCookie("updatedAt"));
  
  const userName = getCookie("userName") || "Student";
  const userImage = sessionStorage.getItem("userImage");
  const userEmail = getCookie("userEmail") || "No email provided";
  const phone = getCookie("phone") || "N/A";
  const gender = getCookie("gender") || "N/A";
  const github = getCookie("github") || "N/A";
  const linkedin = getCookie("linkedin") || "N/A";

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${baseURL}/users/mycourses`, {
          headers: {
            Authorization: "SHA " + getCookie("AccessTokenStudent"),
          },
        });
        setCourses(response.data.courses || []);
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
      const category = course.category || "Uncategorized";
      if (!acc[category]) acc[category] = [];
      acc[category].push(course);
      return acc;
    }, {});
  };

  const categorizedCourses = groupByCategory(courses);

  if (loading) {
    return (
      <div className={style.loadingWrapper}>
        <div className="spinner-border" style={{ width: "3rem", height: "3rem", color: "#5151D3" }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading Profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={style.pageContainer}>
        <div className="alert alert-danger text-center fw-bold" role="alert" style={{ borderRadius: 16 }}>
          Oops! Something went wrong: {error}
        </div>
      </div>
    );
  }

  return (
    <div className={style.pageContainer}>
      {/* ── Page Header ── */}
      <div className={style.pageHeader}>
        <h1 className={style.pageTitle}>Student Profile</h1>
        <p className={style.pageSubtitle}>Manage your personal information and view enrolled courses.</p>
      </div>

      <div className={style.contentWrapper}>
        
        {/* ── Left Column: Profile Card ── */}
        <aside className={style.profileCard}>
          <div className={style.profileAvatarWrapper}>
            {userImage ? (
              <img src={userImage} alt="Profile" className={style.profileAvatar} />
            ) : (
              <div className={style.avatarFallback}>
                {userName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          
          <h2 className={style.profileName}>{userName}</h2>
          <p className={style.profileRole}>Registered Student</p>

          <div className={style.infoList}>
            <div className={style.infoItem}>
               <div className={style.infoIcon}><i className="fa-solid fa-envelope"></i></div>
               <div className={style.infoDetails}>
                 <div className={style.infoLabel}>Email</div>
                 <div className={style.infoValue} title={userEmail}>{userEmail}</div>
               </div>
            </div>

            <div className={style.infoItem}>
               <div className={style.infoIcon}><i className="fa-solid fa-phone"></i></div>
               <div className={style.infoDetails}>
                 <div className={style.infoLabel}>Phone</div>
                 <div className={style.infoValue}>{phone}</div>
               </div>
            </div>

            <div className={style.infoItem}>
               <div className={style.infoIcon}><i className="fa-solid fa-venus-mars"></i></div>
               <div className={style.infoDetails}>
                 <div className={style.infoLabel}>Gender</div>
                 <div className={style.infoValue}>{gender}</div>
               </div>
            </div>

            <div className={style.infoItem}>
               <div className={style.infoIcon}><i className="fa-brands fa-github"></i></div>
               <div className={style.infoDetails}>
                 <div className={style.infoLabel}>GitHub</div>
                 <div className={style.infoValue} title={github}>{github}</div>
               </div>
            </div>

            <div className={style.infoItem}>
               <div className={style.infoIcon}><i className="fa-brands fa-linkedin-in"></i></div>
               <div className={style.infoDetails}>
                 <div className={style.infoLabel}>LinkedIn</div>
                 <div className={style.infoValue} title={linkedin}>{linkedin}</div>
               </div>
            </div>

            <div className={style.infoItem}>
               <div className={style.infoIcon}><i className="fa-solid fa-calendar-days"></i></div>
               <div className={style.infoDetails}>
                 <div className={style.infoLabel}>Joined</div>
                 <div className={style.infoValue}>{createdAt}</div>
               </div>
            </div>
          </div>

          <Link to="/updateProfile" className={style.editProfileBtn}>
            <i className="fa-solid fa-user-pen"></i> Edit Profile
          </Link>
        </aside>

        {/* ── Right Column: Courses Section ── */}
        <main className={style.coursesSection}>
          <div className={style.sectionHeader}>
             <div className={style.sectionIcon}><i className="fa-solid fa-graduation-cap"></i></div>
             <h2 className={style.sectionTitle}>Enrolled Courses</h2>
          </div>

          {Object.keys(categorizedCourses).length > 0 ? (
            Object.keys(categorizedCourses).map((category) => (
              <div key={category} className={style.categoryGroup}>
                <h3 className={style.categoryTitle}>{category}</h3>
                <div className={style.courseList}>
                  {categorizedCourses[category].map((course) => (
                    <div key={course._id} className={style.courseItem}>
                      <div className={style.courseInfo}>
                        <div className={style.courseName}>{course.title}</div>
                        <div className={style.courseMeta}>
                           <div className={style.courseMetaItem}>
                             <i className="fa-regular fa-clock"></i> {course.duration} hours
                           </div>
                           <div className={style.courseMetaItem}>
                             {course.available ? (
                               <span className={`${style.badge} ${style.availableBadge}`}>Available</span>
                             ) : (
                               <span className={`${style.badge} ${style.unavailableBadge}`}>Unavailable</span>
                             )}
                           </div>
                        </div>
                      </div>
                      <Link to={`/courseDetails/${course._id}`} className={style.viewBtn}>
                        View Details <i className="fa-solid fa-arrow-right"></i>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
             <div className="text-center p-5">
               <div style={{ fontSize: "3rem", marginBottom: 16 }}>📚</div>
               <h5 style={{ fontWeight: 700, color: "#1e293b" }}>No active courses</h5>
               <p style={{ color: "#64748b" }}>You haven't enrolled in any courses yet.</p>
               <Link to="/" className="btn" style={{ background: "rgba(81, 81, 211, 0.1)", color: "#5151D3", fontWeight: 700, borderRadius: 8, padding: "8px 24px" }}>
                 Find a Course
               </Link>
             </div>
          )}
        </main>

      </div>
    </div>
  );
}
