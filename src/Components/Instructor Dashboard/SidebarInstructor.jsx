import React, { useState } from "react";
import ReactDOM from "react-dom";
import sideStyle from "../Dashboard/LeftSidebar.module.css";
import style from "./InstructorDashboard.module.css";
import logo from "../../assets/icon-logo.png";
import { Link } from "react-router-dom";
import { deleteCookie, getCookie } from "../../Helper/CookiesHelper";

export default function SidebarInstructor({ onClose }) {
  const [showImageModal, setShowImageModal] = useState(false);
  const handleClose = () => { if (onClose) onClose(); };

  const handleLogout = () => {
    deleteCookie("AccessTokenInstructor");
    deleteCookie("InstructorImage");
    deleteCookie("InstructorName");
    deleteCookie("InstructorExperience");
    deleteCookie("InstructorBio");
    deleteCookie("InstructorTitle");
    deleteCookie("VerifiedSignupInstructorToken");
    deleteCookie("VerifiedLoginInstructorToken");
    deleteCookie("LoginInstructorToken");
    handleClose();
    window.location.pathname = "/";
  };

  const isActive = (path) => window.location.pathname === path ||
    window.location.pathname.startsWith(path + "/");

  const navItems = [
    { to: "/instructor-dashboard",             icon: "fa-solid fa-house",       label: "My Courses",  exact: true },
    { to: "/instructor-dashboard/add-course",  icon: "fa-solid fa-folder-plus", label: "Add Course"  },
    { to: "/instructor-dashboard/edit-profile",icon: "fa-solid fa-user-pen",    label: "Edit Profile"},
  ];

  const instructorName = sessionStorage.getItem("InstructorName") || getCookie("InstructorName") || "Instructor";
  const instructorImage = sessionStorage.getItem("InstructorImage") || getCookie("InstructorImage");
  const instructorTitle = sessionStorage.getItem("InstructorTitle") || getCookie("InstructorTitle") || "";

  return (
    <>
      <div className={sideStyle.sidebar}>
        {/* Profile section */}
        <div className={sideStyle.brand}>
          <div
            className={style.imageWrapper}
            onClick={() => setShowImageModal(true)}
            style={{ marginBottom: 4 }}
          >
            {instructorImage ? (
              <img
                src={instructorImage}
                alt="Instructor"
                className={style.profileImage}
                style={{ border: "3px solid rgba(81,81,211,0.5)", boxShadow: "0 0 20px rgba(81,81,211,0.3)" }}
              />
            ) : (
              <div style={{
                width: 72, height: 72, borderRadius: "50%",
                background: "linear-gradient(135deg,#5151D3,#3b3bcf)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.8rem", color: "white", fontWeight: 700
              }}>
                {instructorName.charAt(0).toUpperCase()}
              </div>
            )}
            <div className={style.imageOverlay}>
              <span className={style.overlayText}>View</span>
            </div>
          </div>

          <span className={sideStyle.brandName} style={{ fontSize: "1rem" }}>
            {instructorName}
          </span>
          {instructorTitle && (
            <span className={sideStyle.adminTag}>{instructorTitle}</span>
          )}
        </div>

        <hr className={sideStyle.divider} />

        {/* Navigation */}
        <nav className={sideStyle.nav}>
          {navItems.map((item) => {
            const active = item.exact
              ? window.location.pathname === item.to
              : isActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={handleClose}
                className={`${sideStyle.navItem} ${active ? sideStyle.active : ""}`}
              >
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <button className={sideStyle.logoutBtn} onClick={handleLogout}>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
          <span>Log Out</span>
        </button>
      </div>

      {/* Image Modal — rendered via Portal to escape overflow:hidden */}
      {showImageModal && ReactDOM.createPortal(
        <div
          onClick={() => setShowImageModal(false)}
          style={{
            position: "fixed", top: 0, left: 0,
            width: "100vw", height: "100vh",
            background: "rgba(0,0,0,0.82)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            zIndex: 99999,
            backdropFilter: "blur(4px)",
          }}
        >
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", marginBottom: 16 }}>
            Click anywhere to close
          </p>

          {instructorImage ? (
            <img
              src={instructorImage}
              alt={instructorName}
              onClick={(e) => e.stopPropagation()}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
              style={{
                maxWidth: "min(360px, 85vw)",
                maxHeight: "70vh",
                borderRadius: 16,
                boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
                objectFit: "cover",
                border: "3px solid rgba(255,255,255,0.15)",
              }}
            />
          ) : null}

          {/* Fallback avatar */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              display: instructorImage ? "none" : "flex",
              width: 160, height: 160, borderRadius: "50%",
              background: "linear-gradient(135deg,#5151D3,#3b3bcf)",
              alignItems: "center", justifyContent: "center",
              fontSize: "4rem", color: "white", fontWeight: 800,
              boxShadow: "0 20px 60px rgba(81,81,211,0.4)",
            }}
          >
            {instructorName.charAt(0).toUpperCase()}
          </div>

          <p style={{ color: "white", fontWeight: 700, fontSize: "1.1rem", marginTop: 18 }}>
            {instructorName}
          </p>
          {instructorTitle && (
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.85rem", margin: 0 }}>
              {instructorTitle}
            </p>
          )}
        </div>,
        document.body
      )}
    </>
  );
}
