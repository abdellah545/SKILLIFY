import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import InstructorLayout from "./InstructorLayout";
import axios from "axios";
import baseURL from "../../BaseURL/BaseURL";
import TagsInput from "./TagsInput";
import Swal from "sweetalert2";
import { getCookie } from "../../Helper/CookiesHelper";
import dashStyle from "./InstructorDashboard.module.css";

export default function AddCourse() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("");
  const [availability, setAvailability] = useState("");
  const [updateEligibility, setUpdateEligibility] = useState("");
  const [topics, setTopics] = useState([]);
  const [prerequisites, setPrerequisites] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [accrued_skills, setAccrued_skills] = useState([]);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) { setFileName(file.name); setImage(file); setImagePreviewUrl(URL.createObjectURL(file)); }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${baseURL}/instructors/courses/add`,
        { title, subtitle, image, description, price, duration, language, level, available: availability, update_eligibility: updateEligibility, topics, prerequisite: prerequisites, keywords, skills_accrued: accrued_skills },
        { headers: { "Content-Type": "multipart/form-data", Authorization: "SHA " + getCookie("AccessTokenInstructor") } }
      );
      Swal.fire({ icon: "success", title: "Course added successfully!" })
        .then(() => { window.location.pathname = "/instructor-dashboard"; });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Failed to add course", text: err?.response?.data?.message || "Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { width: "100%", border: "2px solid #e2e8f0", borderRadius: 10, padding: "10px 14px", fontSize: "0.92rem", background: "#f8fafc", outline: "none", transition: "border-color 0.2s", color: "#1e293b" };
  const labelStyle = { fontWeight: 700, color: "#475569", fontSize: "0.88rem", display: "block", marginBottom: 6 };
  const Field = ({ label, children }) => <div style={{ display: "flex", flexDirection: "column" }}><label style={labelStyle}>{label}</label>{children}</div>;

  return (
    <InstructorLayout title="Add Course">

      {/* Header */}
      <div className={dashStyle.pageHeader}>
        <div>
          <h2 className={dashStyle.pageTitle}>Add New Course</h2>
          <p className={dashStyle.pageSubtitle}>Fill in the details to publish a new course</p>
        </div>
        <Link to="/instructor-dashboard" className={dashStyle.addBtn}
          style={{ background: "rgba(81,81,211,0.1)", color: "#5151D3", boxShadow: "none" }}>
          ← Back
        </Link>
      </div>

      <form onSubmit={handleAddCourse}>

        {/* Basic Info */}
        <div style={{ background: "white", borderRadius: 18, padding: "24px", boxShadow: "0 6px 24px rgba(81,81,211,0.07)", border: "1px solid #f1f5f9", marginBottom: 20 }}>
          <h5 style={{ fontWeight: 700, color: "#1e293b", marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
            <i className="fa-solid fa-circle-info" style={{ color: "#5151D3" }}></i> Basic Information
          </h5>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 16 }}>
            <Field label="Course Title">
              <input style={inputStyle} type="text" placeholder="Enter title" onChange={(e) => setTitle(e.target.value)} required
                onFocus={(e) => e.target.style.borderColor = "#5151D3"} onBlur={(e) => e.target.style.borderColor = "#e2e8f0"} />
            </Field>
            <Field label="Subtitle">
              <input style={inputStyle} type="text" placeholder="Enter subtitle" onChange={(e) => setSubtitle(e.target.value)}
                onFocus={(e) => e.target.style.borderColor = "#5151D3"} onBlur={(e) => e.target.style.borderColor = "#e2e8f0"} />
            </Field>
            <Field label="Price ($)">
              <input style={inputStyle} type="text" placeholder="e.g. 49.99" onChange={(e) => setPrice(e.target.value)}
                onFocus={(e) => e.target.style.borderColor = "#5151D3"} onBlur={(e) => e.target.style.borderColor = "#e2e8f0"} />
            </Field>
            <Field label="Duration (hours)">
              <input style={inputStyle} type="number" placeholder="e.g. 10" min={1} onChange={(e) => setDuration(e.target.value)}
                onFocus={(e) => e.target.style.borderColor = "#5151D3"} onBlur={(e) => e.target.style.borderColor = "#e2e8f0"} />
            </Field>
            <Field label="Language">
              <input style={inputStyle} type="text" placeholder="e.g. English" onChange={(e) => setLanguage(e.target.value)}
                onFocus={(e) => e.target.style.borderColor = "#5151D3"} onBlur={(e) => e.target.style.borderColor = "#e2e8f0"} />
            </Field>
            <Field label="Level">
              <select style={{ ...inputStyle, cursor: "pointer" }} onChange={(e) => setLevel(e.target.value)}
                onFocus={(e) => e.target.style.borderColor = "#5151D3"} onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}>
                <option value="">Select level</option>
                <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
              </select>
            </Field>
          </div>
          <div style={{ marginTop: 16 }}>
            <label style={labelStyle}>Description</label>
            <textarea style={{ ...inputStyle, minHeight: 90, resize: "vertical" }} placeholder="Describe your course..."
              onChange={(e) => setDescription(e.target.value)} required
              onFocus={(e) => e.target.style.borderColor = "#5151D3"} onBlur={(e) => e.target.style.borderColor = "#e2e8f0"} />
          </div>
        </div>

        {/* Image & Settings */}
        <div style={{ background: "white", borderRadius: 18, padding: "24px", boxShadow: "0 6px 24px rgba(81,81,211,0.07)", border: "1px solid #f1f5f9", marginBottom: 20 }}>
          <h5 style={{ fontWeight: 700, color: "#1e293b", marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
            <i className="fa-solid fa-image" style={{ color: "#5151D3" }}></i> Course Image & Settings
          </h5>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 16, alignItems: "start" }}>
            <div>
              <label style={labelStyle}>Course Image</label>
              <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
              <div onClick={() => fileInputRef.current.click()}
                style={{ display: "flex", alignItems: "center", gap: 10, border: "2px dashed #c7d2fe", borderRadius: 10, padding: "11px 16px", cursor: "pointer", background: "#f8f8ff" }}>
                <i className="fa-solid fa-upload" style={{ color: "#5151D3" }}></i>
                <span style={{ color: fileName ? "#1e293b" : "#94a3b8", fontSize: "0.85rem" }}>{fileName || "Upload course image"}</span>
              </div>
              {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" style={{ marginTop: 10, width: 80, height: 80, objectFit: "cover", borderRadius: 10, border: "2px solid #e2e8f0" }} />}
            </div>
            <div>
              <label style={labelStyle}>Availability</label>
              <div style={{ display: "flex", gap: 20, padding: "11px 0" }}>
                {["true", "false"].map((val) => (
                  <label key={val} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontWeight: 600, color: "#475569" }}>
                    <input type="radio" name="availability" value={val} onChange={(e) => setAvailability(e.target.value)} style={{ accentColor: "#5151D3" }} />
                    {val === "true" ? "Available" : "Unavailable"}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label style={labelStyle}>Update Eligibility</label>
              <div style={{ display: "flex", gap: 20, padding: "11px 0" }}>
                {["true", "false"].map((val) => (
                  <label key={val} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontWeight: 600, color: "#475569" }}>
                    <input type="radio" name="updateEligibility" value={val} onChange={(e) => setUpdateEligibility(e.target.value)} style={{ accentColor: "#5151D3" }} />
                    {val === "true" ? "Yes" : "No"}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div style={{ background: "white", borderRadius: 18, padding: "24px", boxShadow: "0 6px 24px rgba(81,81,211,0.07)", border: "1px solid #f1f5f9", marginBottom: 24 }}>
          <h5 style={{ fontWeight: 700, color: "#1e293b", marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
            <i className="fa-solid fa-tags" style={{ color: "#5151D3" }}></i> Tags & Skills
          </h5>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 16 }}>
            <Field label="Topics"><TagsInput value={topics} setValue={setTopics} placeholder="Add topics (Enter)" /></Field>
            <Field label="Prerequisites"><TagsInput value={prerequisites} setValue={setPrerequisites} placeholder="Add prerequisites (Enter)" /></Field>
            <Field label="Keywords"><TagsInput value={keywords} setValue={setKeywords} placeholder="Add keywords (Enter)" /></Field>
            <Field label="Skills Accrued"><TagsInput value={accrued_skills} setValue={setAccrued_skills} placeholder="Add skills (Enter)" /></Field>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <button type="submit" disabled={loading} style={{
            background: "linear-gradient(135deg,#5151D3,#3b3bcf)", color: "white", border: "none",
            padding: "12px 32px", borderRadius: 12, fontSize: "0.95rem", fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1,
            display: "flex", alignItems: "center", gap: 8, boxShadow: "0 4px 14px rgba(81,81,211,0.3)"
          }}>
            {loading ? <><div className="spinner-border spinner-border-sm text-white" role="status"></div> Adding...</> : <><i className="fa-solid fa-plus"></i> Add Course</>}
          </button>
        </div>
      </form>
    </InstructorLayout>
  );
}
