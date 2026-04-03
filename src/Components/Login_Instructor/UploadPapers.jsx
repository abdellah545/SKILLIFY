import axios from "axios";
import React, { useState, useRef } from "react";
import baseURL from "../../BaseURL/BaseURL";
import { getCookie } from "../../Helper/CookiesHelper";
import style from "./UploadPapers.module.css";
import Swal from "sweetalert2";

export default function UploadPapers() {
  const [cvFile, setCvFile] = useState(null);
  const [gradCertificateFile, setGradCertificateFile] = useState(null);
  const [idFile, setIdFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const cvRef = useRef(null);
  const gradRef = useRef(null);
  const idRef = useRef(null);

  const handleUploadPapers = async (e) => {
    e.preventDefault();
    
    if (!cvFile || !gradCertificateFile || !idFile) {
      Swal.fire("Incomplete", "Please upload all required papers.", "warning");
      return;
    }
    
    setLoading(true);

    const data = new FormData();
    data.append("CV", cvFile);
    data.append("Graduation_Certificate", gradCertificateFile);
    data.append("ID", idFile);

    try {
      await axios.post(
        `${baseURL}/instructors/uploadPapers`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "SHA " + getCookie("VerifiedLoginInstructorToken"),
          },
        }
      );
      window.location.pathname = "/pending";
    } catch (err) {
      console.log(err);
      Swal.fire("Error", "Failed to upload papers. Try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const getFileName = (file) => file ? file.name : null;

  return (
    <div className={style.pageContainer}>
      <div className={style.uploadCard}>
        <div className={style.header}>
          <h1 className={style.title}>Upload Your Papers</h1>
          <p className={style.subtitle}>We need these documents to verify your identity and qualifications.</p>
        </div>

        <form onSubmit={handleUploadPapers}>
          {/* CV Upload */}
          <div className={style.uploadGroup}>
            <label className={style.uploadLabel}>1. Curriculum Vitae (CV)</label>
            <input type="file" accept="image/*,.pdf" ref={cvRef} className={style.fileInput} onChange={(e) => setCvFile(e.target.files[0])} />
            <div className={`${style.dropZone} ${cvFile ? style.dropZoneActive : ''}`} onClick={() => cvRef.current.click()}>
              <div className={style.iconWrapper}>
                {cvFile ? <i className="fa-solid fa-check" style={{ color: '#16a34a' }}></i> : <i className="fa-solid fa-file-pdf"></i>}
              </div>
              <div>
                {cvFile ? <span className={style.fileName}>{getFileName(cvFile)}</span> : <span className={style.uploadPlaceholder}>Click to upload your CV</span>}
              </div>
            </div>
          </div>

          {/* Graduation Certificate Upload */}
          <div className={style.uploadGroup}>
            <label className={style.uploadLabel}>2. Graduation Certificate</label>
            <input type="file" accept="image/*,.pdf" ref={gradRef} className={style.fileInput} onChange={(e) => setGradCertificateFile(e.target.files[0])} />
            <div className={`${style.dropZone} ${gradCertificateFile ? style.dropZoneActive : ''}`} onClick={() => gradRef.current.click()}>
              <div className={style.iconWrapper}>
                {gradCertificateFile ? <i className="fa-solid fa-check" style={{ color: '#16a34a' }}></i> : <i className="fa-solid fa-graduation-cap"></i>}
              </div>
              <div>
                {gradCertificateFile ? <span className={style.fileName}>{getFileName(gradCertificateFile)}</span> : <span className={style.uploadPlaceholder}>Click to upload your certificate</span>}
              </div>
            </div>
          </div>

          {/* ID Upload */}
          <div className={style.uploadGroup}>
            <label className={style.uploadLabel}>3. National ID</label>
            <input type="file" accept="image/*,.pdf" ref={idRef} className={style.fileInput} onChange={(e) => setIdFile(e.target.files[0])} />
            <div className={`${style.dropZone} ${idFile ? style.dropZoneActive : ''}`} onClick={() => idRef.current.click()}>
              <div className={style.iconWrapper}>
                {idFile ? <i className="fa-solid fa-check" style={{ color: '#16a34a' }}></i> : <i className="fa-solid fa-id-card"></i>}
              </div>
              <div>
                {idFile ? <span className={style.fileName}>{getFileName(idFile)}</span> : <span className={style.uploadPlaceholder}>Click to upload your ID</span>}
              </div>
            </div>
          </div>

          <button type="submit" className={style.submitBtn} disabled={loading || !cvFile || !gradCertificateFile || !idFile}>
            {loading ? (
               <><div className="spinner-border spinner-border-sm text-white" role="status"></div> Uploading...</>
            ) : (
               <><i className="fa-solid fa-cloud-arrow-up"></i> Submit Documents</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
