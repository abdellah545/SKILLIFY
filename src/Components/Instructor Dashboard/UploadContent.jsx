import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import InstructorLayout from "./InstructorLayout";
import { getCookie } from "../../Helper/CookiesHelper";
import baseURL from "../../BaseURL/BaseURL";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import dashStyle from "./InstructorDashboard.module.css";

export default function UploadContent() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [videoName, setVideoName] = useState("");
  const [title, setTitle] = useState("");
  const [courseContent, setCourseContent] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loadingContent, setLoadingContent] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const videoInputRef = useRef(null);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) { setVideo(file); setVideoName(file.name); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingUpload(true);
    const formData = new FormData();
    formData.append("video", video);
    formData.append("title", title);
    try {
      await axios.post(`${baseURL}/instructors/courses/content/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: "SHA " + getCookie("AccessTokenInstructor") },
      });
      Swal.fire({ title: "Success", text: "Content uploaded successfully!", icon: "success" })
        .then(() => window.location.reload());
    } catch (error) {
      console.error("Error uploading content:", error);
      alert("An error occurred while uploading content");
    } finally {
      setLoadingUpload(false);
    }
  };

  const fetchCourseContent = async () => {
    setLoadingContent(true);
    try {
      const res = await axios.get(`${baseURL}/instructors/courses/content/${id}`, {
        headers: { Authorization: "SHA " + getCookie("AccessTokenInstructor") },
      });
      setCourseContent(res.data);
    } catch (error) {
      console.error("Error fetching course content:", error);
    } finally {
      setLoadingContent(false);
    }
  };

  useEffect(() => { fetchCourseContent(); }, []);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" });

  const inputStyle = { width: "100%", border: "2px solid #e2e8f0", borderRadius: 10, padding: "10px 14px", fontSize: "0.95rem", background: "#f8fafc", outline: "none" };

  return (
    <InstructorLayout title="Course Content">

      {/* Header */}
      <div className={dashStyle.pageHeader}>
        <div>
          <h2 className={dashStyle.pageTitle}>Course Content</h2>
          <p className={dashStyle.pageSubtitle}>Upload and manage course videos</p>
        </div>
        <Link to="/instructor-dashboard" className={dashStyle.addBtn}
          style={{ background: "rgba(81,81,211,0.1)", color: "#5151D3", boxShadow: "none" }}>
          ← Back
        </Link>
      </div>

      {/* Upload form */}
      <div style={{ background: "white", borderRadius: 18, padding: "28px 24px", boxShadow: "0 6px 24px rgba(81,81,211,0.08)", border: "1px solid #f1f5f9", marginBottom: 28 }}>
        <h4 style={{ fontWeight: 700, color: "#1e293b", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
          <i className="fa-solid fa-cloud-arrow-up" style={{ color: "#5151D3" }}></i> Upload New Video
        </h4>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontWeight: 700, color: "#475569", fontSize: "0.9rem", display: "block", marginBottom: 8 }}>Video File</label>
              <input type="file" accept=".mkv,.mp4,.avi,.mov,.wmv,.flv,.webm" ref={videoInputRef} style={{ display: "none" }} onChange={handleVideoChange} required />
              <div onClick={() => videoInputRef.current.click()}
                style={{ display: "flex", alignItems: "center", gap: 10, border: "2px dashed #c7d2fe", borderRadius: 10, padding: "11px 16px", cursor: "pointer", background: "#f8f8ff" }}>
                <i className="fa-solid fa-video" style={{ color: "#5151D3" }}></i>
                <span style={{ color: videoName ? "#1e293b" : "#94a3b8", fontSize: "0.85rem" }}>{videoName || "Choose video file"}</span>
              </div>
            </div>
            <div>
              <label htmlFor="contentTitle" style={{ fontWeight: 700, color: "#475569", fontSize: "0.9rem", display: "block", marginBottom: 8 }}>Session Title</label>
              <input type="text" id="contentTitle" placeholder="e.g. Session 1 – Introduction" value={title} onChange={(e) => setTitle(e.target.value)} required style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = "#5151D3"} onBlur={(e) => e.target.style.borderColor = "#e2e8f0"} />
            </div>
          </div>
          <button type="submit" disabled={loadingUpload} style={{
            background: "linear-gradient(135deg,#5151D3,#3b3bcf)", color: "white", border: "none",
            padding: "10px 24px", borderRadius: 10, fontSize: "0.9rem", fontWeight: 700,
            cursor: loadingUpload ? "not-allowed" : "pointer", opacity: loadingUpload ? 0.7 : 1,
            display: "flex", alignItems: "center", gap: 8
          }}>
            {loadingUpload
              ? <><div className="spinner-border spinner-border-sm text-white" role="status"></div> Uploading...</>
              : <><i className="fa-solid fa-upload"></i> Upload Video</>}
          </button>
        </form>
      </div>

      {/* Content list */}
      <div style={{ background: "white", borderRadius: 18, padding: "24px", boxShadow: "0 6px 24px rgba(81,81,211,0.08)", border: "1px solid #f1f5f9" }}>
        <h4 style={{ fontWeight: 700, color: "#1e293b", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
          <i className="fa-solid fa-film" style={{ color: "#5151D3" }}></i>
          Existing Content
          <span style={{ marginLeft: "auto", background: "rgba(81,81,211,0.1)", color: "#5151D3", padding: "3px 12px", borderRadius: 50, fontSize: "0.82rem", fontWeight: 700 }}>
            {courseContent.length} videos
          </span>
        </h4>
        {loadingContent ? (
          <div style={{ textAlign: "center", padding: 40 }}>
            <div className="spinner-border" style={{ color: "#5151D3" }} role="status"></div>
          </div>
        ) : courseContent.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 20px", color: "#64748b" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>🎬</div>
            <h5 style={{ color: "#1e293b", fontWeight: 700 }}>No content yet</h5>
            <p style={{ fontSize: "0.9rem" }}>Upload your first video to get started.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {courseContent.map((content, i) => (
              <div key={content._id} onClick={() => { setSelectedVideo(content); setShowModal(true); }}
                style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 16px", borderRadius: 12, cursor: "pointer", border: "1px solid #f1f5f9", background: "#fafbff", transition: "all 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#f0f4ff"; e.currentTarget.style.borderColor = "#c7d2fe"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#fafbff"; e.currentTarget.style.borderColor = "#f1f5f9"; }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", flexShrink: 0, background: "linear-gradient(135deg,#5151D3,#3b3bcf)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.85rem" }}>{i + 1}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontWeight: 600, color: "#1e293b", fontSize: "0.92rem" }}>{content.title}</p>
                  <p style={{ margin: 0, fontSize: "0.78rem", color: "#94a3b8" }}>{formatDate(content.createdAt)}</p>
                </div>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(81,81,211,0.1)", color: "#5151D3", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem" }}>
                  <i className="fa-solid fa-play"></i>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <Modal show={showModal} onHide={() => { setShowModal(false); setSelectedVideo(null); }} centered size="lg">
          <Modal.Header closeButton style={{ borderBottom: "1px solid #f1f5f9" }}>
            <Modal.Title style={{ fontWeight: 700, color: "#1e293b", fontSize: "1.1rem" }}>{selectedVideo.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ padding: 0, background: "#000", borderRadius: "0 0 8px 8px" }}>
            <video controls className="w-100" style={{ display: "block", maxHeight: "70vh" }}>
              <source src={selectedVideo.media} type="video/mp4" />
            </video>
          </Modal.Body>
          <Modal.Footer style={{ borderTop: "1px solid #f1f5f9" }}>
            <Button onClick={() => { setShowModal(false); setSelectedVideo(null); }}
              style={{ background: "#5151D3", border: "none", borderRadius: 8, padding: "8px 20px" }}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}
    </InstructorLayout>
  );
}
