import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import InstructorLayout from "./InstructorLayout";
import baseURL from "../../BaseURL/BaseURL";
import { getCookie, setCookie } from "../../Helper/CookiesHelper";
import dashStyle from "./InstructorDashboard.module.css";

export default function EditProfile() {
  const [file, setFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [experience, setExperience] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const f = e.target.files?.[0];
    if (f) { setFile(f); setFileName(f.name); setImagePreviewUrl(URL.createObjectURL(f)); }
  };

  const validatePassword = (p) => /^(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*[0-9]).{6,}$/.test(p);

  const handleEditProfile = async (e) => {
    e.preventDefault();
    if (!validatePassword(password)) { setPasswordError(true); return; }
    setPasswordError(false);
    setLoading(true);
    const formData = new FormData();
    if (file) formData.append("image", file);
    formData.append("title", title);
    formData.append("password", password);
    formData.append("experience", experience);
    formData.append("bio", bio);
    formData.append("name", name);
    try {
      const res = await axios.patch(`${baseURL}/instructors/updateProfile`, formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: "SHA " + getCookie("AccessTokenInstructor") },
      });
      Swal.fire("Success", "Profile updated successfully", "success").then(() => {
        sessionStorage.setItem("InstructorImage", res.data.image);
        sessionStorage.setItem("InstructorName", res.data.name);
        setCookie("InstructorTitle", res.data.title);
        setCookie("InstructorExperience", res.data.experience);
        setCookie("InstructorBio", res.data.bio);
        window.location.pathname = "/instructor-dashboard";
      });
    } catch (err) {
      Swal.fire("Error", "Failed to update profile", "error");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { width: "100%", border: "2px solid #e2e8f0", borderRadius: 10, padding: "10px 14px", fontSize: "0.92rem", background: "#f8fafc", outline: "none", transition: "border-color 0.2s", color: "#1e293b" };
  const labelStyle = { fontWeight: 700, color: "#475569", fontSize: "0.88rem", display: "block", marginBottom: 6 };

  const currentName = sessionStorage.getItem("InstructorName") || getCookie("InstructorName") || "Instructor";
  const currentImage = sessionStorage.getItem("InstructorImage") || getCookie("InstructorImage");

  return (
    <InstructorLayout title="Edit Profile">

      {/* Header */}
      <div className={dashStyle.pageHeader}>
        <div>
          <h2 className={dashStyle.pageTitle}>Edit Profile</h2>
          <p className={dashStyle.pageSubtitle}>Update your instructor profile information</p>
        </div>
        <Link to="/instructor-dashboard" className={dashStyle.addBtn}
          style={{ background: "rgba(81,81,211,0.1)", color: "#5151D3", boxShadow: "none" }}>
          ← Back
        </Link>
      </div>

      <form onSubmit={handleEditProfile}>

        {/* Current profile preview */}
        <div style={{ background: "white", borderRadius: 18, padding: "20px 24px", boxShadow: "0 6px 24px rgba(81,81,211,0.07)", border: "1px solid #f1f5f9", marginBottom: 20, display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
          {imagePreviewUrl ? (
            <img src={imagePreviewUrl} alt="Preview" style={{ width: 72, height: 72, borderRadius: "50%", objectFit: "cover", border: "3px solid rgba(81,81,211,0.3)", flexShrink: 0 }} />
          ) : currentImage ? (
            <img src={currentImage} alt="Current" style={{ width: 72, height: 72, borderRadius: "50%", objectFit: "cover", border: "3px solid rgba(81,81,211,0.3)", flexShrink: 0 }} onError={(e) => e.target.style.display = "none"} />
          ) : (
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,#5151D3,#3b3bcf)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", color: "white", fontWeight: 800, flexShrink: 0 }}>
              {currentName.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p style={{ margin: 0, fontWeight: 700, color: "#1e293b", fontSize: "1.05rem" }}>{currentName}</p>
            <p style={{ margin: "2px 0 0", color: "#64748b", fontSize: "0.83rem" }}>{getCookie("InstructorTitle") || "Instructor"}</p>
            {getCookie("InstructorExperience") && <p style={{ margin: "2px 0 0", color: "#94a3b8", fontSize: "0.78rem" }}>{getCookie("InstructorExperience")} years of experience</p>}
          </div>
        </div>

        {/* Form fields */}
        <div style={{ background: "white", borderRadius: 18, padding: "24px", boxShadow: "0 6px 24px rgba(81,81,211,0.07)", border: "1px solid #f1f5f9", marginBottom: 20 }}>
          <h5 style={{ fontWeight: 700, color: "#1e293b", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
            <i className="fa-solid fa-user-pen" style={{ color: "#5151D3" }}></i> Profile Details
          </h5>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 16 }}>
            {/* Photo */}
            <div>
              <label style={labelStyle}>Profile Image</label>
              <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleImageChange} />
              <div onClick={() => fileInputRef.current.click()}
                style={{ display: "flex", alignItems: "center", gap: 10, border: "2px dashed #c7d2fe", borderRadius: 10, padding: "11px 14px", cursor: "pointer", background: "#f8f8ff" }}>
                <i className="fa-solid fa-camera" style={{ color: "#5151D3" }}></i>
                <span style={{ color: fileName ? "#1e293b" : "#94a3b8", fontSize: "0.85rem" }}>{fileName || "Change profile photo"}</span>
              </div>
            </div>
            {/* Name */}
            <div>
              <label htmlFor="epName" style={labelStyle}>Full Name</label>
              <input id="epName" style={inputStyle} type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} required
                onFocus={(e) => e.target.style.borderColor = "#5151D3"} onBlur={(e) => e.target.style.borderColor = "#e2e8f0"} />
            </div>
            {/* Title */}
            <div>
              <label htmlFor="epTitle" style={labelStyle}>Title</label>
              <input id="epTitle" style={inputStyle} type="text" placeholder="e.g. Web Developer" value={title} onChange={(e) => setTitle(e.target.value)} required
                onFocus={(e) => e.target.style.borderColor = "#5151D3"} onBlur={(e) => e.target.style.borderColor = "#e2e8f0"} />
            </div>
            {/* Experience */}
            <div>
              <label htmlFor="epExp" style={labelStyle}>Years of Experience</label>
              <input id="epExp" style={inputStyle} type="text" placeholder="e.g. 5" value={experience} onChange={(e) => setExperience(e.target.value)} required
                onFocus={(e) => e.target.style.borderColor = "#5151D3"} onBlur={(e) => e.target.style.borderColor = "#e2e8f0"} />
            </div>
            {/* Password */}
            <div>
              <label htmlFor="epPass" style={labelStyle}>New Password</label>
              <div style={{ position: "relative" }}>
                <input id="epPass" style={{ ...inputStyle, paddingRight: 40 }} type={showPass ? "text" : "password"}
                  placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} required
                  onFocus={(e) => e.target.style.borderColor = "#5151D3"} onBlur={(e) => e.target.style.borderColor = "#e2e8f0"} />
                <span onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", cursor: "pointer" }}>
                  {showPass ? "🙈" : "👁️"}
                </span>
              </div>
              {passwordError && !validatePassword(password) && (
                <p style={{ color: "#ef4444", fontSize: "0.78rem", marginTop: 4 }}>*Min 6 chars, 1 uppercase, 1 number, 1 special char</p>
              )}
            </div>
            {/* Bio */}
            <div style={{ gridColumn: "1 / -1" }}>
              <label htmlFor="epBio" style={labelStyle}>Bio</label>
              <textarea id="epBio" style={{ ...inputStyle, minHeight: 90, resize: "vertical" }} placeholder="Tell students about yourself..."
                value={bio} onChange={(e) => setBio(e.target.value)} required
                onFocus={(e) => e.target.style.borderColor = "#5151D3"} onBlur={(e) => e.target.style.borderColor = "#e2e8f0"} />
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <button type="submit" disabled={loading} style={{
            background: "linear-gradient(135deg,#5151D3,#3b3bcf)", color: "white", border: "none",
            padding: "12px 32px", borderRadius: 12, fontSize: "0.95rem", fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1,
            display: "flex", alignItems: "center", gap: 8, boxShadow: "0 4px 14px rgba(81,81,211,0.3)"
          }}>
            {loading ? <><div className="spinner-border spinner-border-sm text-white" role="status"></div> Updating...</> : <><i className="fa-solid fa-floppy-disk"></i> Save Changes</>}
          </button>
        </div>
      </form>
    </InstructorLayout>
  );
}
