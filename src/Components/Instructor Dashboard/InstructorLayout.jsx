import React, { useState } from "react";
import ReactDOM from "react-dom";
import SidebarInstructor from "./SidebarInstructor";
import dashStyle from "./InstructorDashboard.module.css";

/**
 * Shared layout wrapper for all instructor dashboard pages.
 * Handles sidebar (desktop sticky + mobile drawer with auto-close).
 *
 * Props:
 *  - title: string — page title shown in mobile top bar
 *  - children: ReactNode
 */
export default function InstructorLayout({ title, children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu  = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className={dashStyle.dashboardWrapper}>

      {/* ── Sidebar (Desktop only) ── */}
      <aside className={dashStyle.sidebarWrap}>
        <SidebarInstructor onClose={closeMenu} />
      </aside>

      {/* ── Main Content ── */}
      <main className={dashStyle.mainContent}>

        {/* Mobile top bar */}
        <div className={dashStyle.mobileTopBar}>
          <button
            className={dashStyle.menuBtn}
            onClick={openMenu}
            aria-label="Open sidebar"
          >
            <i className="fa-solid fa-bars"></i>
          </button>
          <span className={dashStyle.mobileTitle}>{title}</span>
        </div>

        {children}
      </main>

      {/* ── Mobile Drawer (Portal) ── */}
      {isMenuOpen && ReactDOM.createPortal(
        <div
          onClick={closeMenu}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 9000,
            backdropFilter: "blur(2px)",
            display: "flex",
          }}
        >
          {/* Drawer panel */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 240, height: "100%",
              background: "transparent",
              boxShadow: "4px 0 24px rgba(0,0,0,0.3)",
              overflowY: "auto",
              animation: "slideInLeft 0.22s ease",
            }}
          >
            <SidebarInstructor onClose={closeMenu} />
          </div>

          {/* Close hint on the right */}
          <div style={{
            flex: 1, display: "flex", alignItems: "flex-start",
            justifyContent: "flex-end", padding: "16px"
          }}>
            <button
              onClick={closeMenu}
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "none", color: "white",
                width: 36, height: 36, borderRadius: "50%",
                cursor: "pointer", fontSize: "1.1rem",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}
            >✕</button>
          </div>
        </div>,
        document.body
      )}

      {/* Slide-in animation */}
      <style>{`
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
