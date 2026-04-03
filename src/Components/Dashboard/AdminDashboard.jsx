import React, { useEffect, useState } from "react";
import style from "./AdminDashboard.module.css";
import LeftSidebar from "./LeftSidebar";
import axios from "axios";
import baseURL from "../../BaseURL/BaseURL";
import { Link } from "react-router-dom";
import { getCookie } from "../../Helper/CookiesHelper";

export default function AdminDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  const handleGetApplications = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${baseURL}/admin/applications`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "SHA_ADMIN " + getCookie("AccessTokenAdmin"),
        },
      });
      setApplications(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetApplications();
  }, []);

  const filtered = applications.filter((app) =>
    (app.name ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const getInitial = (name) => (name?.charAt(0) ?? "?").toUpperCase();

  const getStatusBadge = (app) => {
    if (app.rejected) return { label: "Rejected", color: "#ef4444", bg: "#fef2f2" };
    if (app.approved) return { label: "Approved", color: "#22c55e", bg: "#f0fdf4" };
    return { label: "Pending", color: "#f59e0b", bg: "#fffbeb" };
  };

  const avatarColors = ["#5151D3", "#8b5cf6", "#3b82f6", "#ec4899", "#14b8a6"];

  return (
    <div className={style.dashboardWrapper}>
      {/* ── Sidebar (Desktop) ── */}
      <aside className={style.sidebar}>
        <LeftSidebar />
      </aside>

      {/* ── Main Content ── */}
      <main className={style.mainContent}>

        {/* Mobile top bar */}
        <div className={style.mobileTopBar}>
          <button
            className={style.menuBtn}
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#leftOffcanvas"
            aria-controls="leftOffcanvas"
          >
            <i className="fa-solid fa-bars"></i>
          </button>
          <span className={style.mobileTitle}>Admin Dashboard</span>
        </div>

        {/* Header */}
        <div className={style.pageHeader}>
          <div>
            <h2 className={style.pageTitle}>Instructor Applications</h2>
            <p className={style.pageSubtitle}>
              Review and manage instructor submissions
            </p>
          </div>
          <div className={style.statsChip}>
            <span>{applications.length}</span> Total
          </div>
        </div>

        {/* Search */}
        <div className={style.searchBar}>
          <i className="fa-solid fa-magnifying-glass" style={{ color: "#94a3b8", marginRight: 10 }}></i>
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={style.searchInput}
          />
        </div>

        {/* Table / Cards */}
        {loading ? (
          <div className={style.loadingWrapper}>
            <div className="spinner-border" style={{ color: "#5151D3" }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p style={{ marginTop: 12, color: "#64748b" }}>Loading applications...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className={style.emptyState}>
            <div style={{ fontSize: "3rem", marginBottom: 12 }}>📋</div>
            <h4>No applications found</h4>
            <p>Try adjusting your search or check back later.</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className={style.tableWrapper}>
              <table className={style.table}>
                <thead>
                  <tr>
                    <th>Instructor</th>
                    <th>Status</th>
                    <th>Submitted</th>
                    <th>ID</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row, i) => {
                    const status = getStatusBadge(row);
                    return (
                      <tr key={row._id}>
                        <td>
                          <div className={style.nameCell}>
                            <div
                              className={style.avatar}
                              style={{ background: avatarColors[i % avatarColors.length] }}
                            >
                              {getInitial(row.name)}
                            </div>
                            <div>
                              <span className={style.nameText}>{row.name ?? "—"}</span>
                              <span className={style.emailText}>{row.email ?? ""}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={style.badge} style={{ color: status.color, background: status.bg }}>
                            {status.label}
                          </span>
                        </td>
                        <td className={style.dateText}>{formatDate(row.createdAt)}</td>
                        <td>
                          <span className={style.idChip}>{row._id?.slice(-8)}</span>
                        </td>
                        <td>
                          <Link to={`/instructor/${row._id}`} className={style.viewBtn}>
                            View <i className="fa-solid fa-arrow-right" style={{ fontSize: "0.75rem" }}></i>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className={style.cardGrid}>
              {filtered.map((row, i) => {
                const status = getStatusBadge(row);
                return (
                  <div key={row._id} className={style.card}>
                    <div className={style.cardHeader}>
                      <div
                        className={style.avatar}
                        style={{ background: avatarColors[i % avatarColors.length] }}
                      >
                        {getInitial(row.name)}
                      </div>
                      <div>
                        <span className={style.nameText}>{row.name ?? "—"}</span>
                        <span className={style.emailText}>{row.email ?? ""}</span>
                      </div>
                      <span className={style.badge} style={{ color: status.color, background: status.bg, marginLeft: "auto" }}>
                        {status.label}
                      </span>
                    </div>
                    <div className={style.cardFooter}>
                      <span className={style.dateText}>📅 {formatDate(row.createdAt)}</span>
                      <Link to={`/instructor/${row._id}`} className={style.viewBtn}>
                        View Details →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </main>

      {/* Mobile Offcanvas Sidebar */}
      <div
        className="offcanvas offcanvas-start"
        data-bs-backdrop="static"
        tabIndex="-1"
        id="leftOffcanvas"
        aria-labelledby="leftOffcanvasLabel"
      >
        <div className="offcanvas-header">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body p-0">
          <LeftSidebar />
        </div>
      </div>
    </div>
  );
}
