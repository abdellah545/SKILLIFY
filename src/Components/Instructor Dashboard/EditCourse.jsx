/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import InstructorLayout from "./InstructorLayout";
import TagsInput from "./TagsInput";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getCookie } from "../../Helper/CookiesHelper";
import baseURL from "../../BaseURL/BaseURL";
import Swal from "sweetalert2";
import dashStyle from "./InstructorDashboard.module.css";

export default function EditCourse() {
  const { id } = useParams();
  const [subtitle, setSubtitle] = useState("");
  const [topics, setTopics] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [accrued_skills, setAccrued_skills] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => { fetchCourseDetails(); }, [id]);

  const fetchCourseDetails = async () => {
    try {
      const res = await axios.get(`${baseURL}/instructors/courses/${id}`, {
        headers: { "Content-Type": "application/json", Authorization: "SHA " + getCookie("AccessTokenInstructor") },
      });
      const course = res.data;
      setSubtitle(course.subtitle ?? "");
      setTopics(Array.isArray(course.topics) ? course.topics : []);
      setKeywords(Array.isArray(course.keywords) ? course.keywords : []);
      setAccrued_skills(Array.isArray(course.accrued_skills) ? course.accrued_skills : []);
      setImagePreviewUrl(course.image ?? "");
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setImage(file);
      setFileName(file.name);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("subtitle", subtitle);
    formData.append("topics", JSON.stringify(topics));
    formData.append("keywords", JSON.stringify(keywords));
    formData.append("accrued_skills", JSON.stringify(accrued_skills));
    if (image) formData.append("image", image);
    try {
      await axios.patch(`${baseURL}/instructors/courses/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: "SHA " + getCookie("AccessTokenInstructor") },
      });
      Swal.fire({ title: "Success!", text: "Course updated successfully!", icon: "success", confirmButtonText: "OK" })
        .then(() => { window.location.pathname = "/instructor-dashboard"; });
    } catch (error) {
      console.error("Error updating course:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <InstructorLayout title="Edit Course">

      {/* Header */}
      <div className={dashStyle.pageHeader}>
        <div>
          <h2 className={dashStyle.pageTitle}>Edit Course</h2>
          <p className={dashStyle.pageSubtitle}>Update your course information</p>
        </div>
        <Link to="/instructor-dashboard" className={dashStyle.addBtn}
          style={{ background: "rgba(81,81,211,0.1)", color: "#5151D3", boxShadow: "none" }}>
          ← Back
        </Link>
      </div>

      {/* Form card */}
      <div style={{
        background: "white", borderRadius: 18, padding: "32px 28px",
        boxShadow: "0 6px 24px rgba(81,81,211,0.08)", border: "1px solid #f1f5f9"
      }}>
        <form onSubmit={handleSubmit}>

          {/* Image Upload */}
          <div style={{ marginBottom: 28 }}>
            <label style={{ fontWeight: 700, color: "#475569", fontSize: "0.9rem", display: "block", marginBottom: 10 }}>
              Course Image
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <input type="file" accept="image/*" id="courseImg" ref={fileInputRef}
                style={{ display: "none" }} onChange={handleImageChange} />
              <div
                onClick={() => fileInputRef.current.click()}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  border: "2px dashed #c7d2fe", borderRadius: 12,
                  padding: "12px 20px", cursor: "pointer", background: "#f8f8ff",
                  minWidth: 200
                }}
              >
                <i className="fa-solid fa-upload" style={{ color: "#5151D3", fontSize: "1.2rem" }}></i>
                <span style={{ color: fileName ? "#1e293b" : "#94a3b8", fontSize: "0.88rem", fontWeight: 500 }}>
                  {fileName || "Upload course image"}
                </span>
              </div>
              {imagePreviewUrl && (
                <img src={imagePreviewUrl} alt="Preview"
                  style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 12, border: "2px solid #e2e8f0" }} />
              )}
            </div>
          </div>

          {/* Fields grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
            <div>
              <label style={{ fontWeight: 700, color: "#475569", fontSize: "0.9rem" }}>Subtitle</label>
              <input type="text" placeholder="Enter subtitle" value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                style={{ width: "100%", border: "2px solid #e2e8f0", borderRadius: 10, padding: "10px 14px", fontSize: "0.95rem", background: "#f8fafc", outline: "none", marginTop: 6 }}
                onFocus={(e) => e.target.style.borderColor = "#5151D3"}
                onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
              />
            </div>
            <div>
              <label style={{ fontWeight: 700, color: "#475569", fontSize: "0.9rem" }}>Topics</label>
              <div style={{ marginTop: 6 }}><TagsInput value={topics} setValue={setTopics} placeholder="Add topics" /></div>
            </div>
            <div>
              <label style={{ fontWeight: 700, color: "#475569", fontSize: "0.9rem" }}>Keywords</label>
              <div style={{ marginTop: 6 }}><TagsInput value={keywords} setValue={setKeywords} placeholder="Add keywords" /></div>
            </div>
            <div>
              <label style={{ fontWeight: 700, color: "#475569", fontSize: "0.9rem" }}>Skills Accrued</label>
              <div style={{ marginTop: 6 }}><TagsInput value={accrued_skills} setValue={setAccrued_skills} placeholder="Add skills" /></div>
            </div>
          </div>

          {/* Submit */}
          <div style={{ marginTop: 28, display: "flex", justifyContent: "flex-start" }}>
            <button type="submit" disabled={loading} style={{
              background: "linear-gradient(135deg,#5151D3,#3b3bcf)", color: "white",
              border: "none", padding: "11px 28px", borderRadius: 10,
              fontSize: "0.95rem", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1, display: "flex", alignItems: "center", gap: 8
            }}>
              {loading
                ? <><div className="spinner-border spinner-border-sm text-white" role="status"></div> Updating...</>
                : <><i className="fa-solid fa-floppy-disk"></i> Update Course</>}
            </button>
          </div>
        </form>
      </div>
    </InstructorLayout>
  );
}
