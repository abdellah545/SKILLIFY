import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import baseURL from "../../BaseURL/BaseURL";
import { getCookie } from "../../Helper/CookiesHelper";

export default function UploadPapers() {
  const [CV, setCv] = useState(null);
  const [Graduation_Certificate, setGraduationCertificate] = useState(null);
  const [ID, setId] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUploadPapers = async (e) => {
    e.preventDefault();
    setError(true);
    setLoading(true);

    const data = new FormData();
    data.append("CV", CV);
    data.append("Graduation_Certificate", Graduation_Certificate);
    data.append("ID", ID);

    try {
      const res = await axios.post(
        `${baseURL}/instructors/uploadPapers`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization:
              "SHA " + getCookie("VerifiedLoginInstructorToken"),
          },
        }
      );
      window.location.pathname = "/pending";

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      <section className="section-signup p-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12 col-md-12 col-sm-12 p-0">
              <div className="signup-form p-5 border rounded">
                <div className="container">
                  <div className="row justify-content-center">
                    <br />
                    <h1 className="text-center mt-3">Upload Your Papers</h1>
                    <div>
                      <form onSubmit={handleUploadPapers}>
                        <div className="text-center d-flex justify-content-center align-items-center flex-column">
                          <div className="mb-3">
                            <label
                              htmlFor="cv"
                              className="fw-bold"
                              style={{ fontSize: "20px", color: "#0d6efd" }}
                            >
                              CV
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              className="email-login my-3"
                              id="cv"
                              placeholder="Enter your email"
                              required
                              onChange={(e) => setCv(e.target.files[0])}
                            />
                          </div>
                          <hr className="w-50" />
                          <div className="mb-3">
                            <label
                              htmlFor="graduationCertificate"
                              className="fw-bold"
                              style={{ fontSize: "20px", color: "#0d6efd" }}
                            >
                              Graduation Certificate
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              className="email-login my-3"
                              id="graduationCertificate"
                              placeholder="Enter your email"
                              required
                              onChange={(e) =>
                                setGraduationCertificate(e.target.files[0])
                              }
                            />
                          </div>
                          <hr className="w-50" />
                          <div className="mb-3">
                            <label
                              htmlFor="id"
                              className="fw-bold"
                              style={{ fontSize: "20px", color: "#0d6efd" }}
                            >
                              ID
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              className="email-login my-3"
                              id="id"
                              placeholder="Enter your email"
                              required
                              onChange={(e) => setId(e.target.files[0])}
                            />
                          </div>
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                          <button
                            type="submit"
                            className="signup-login-btn w-25 fs-5"
                          >
                            {loading ? (
                              <div className="d-flex justify-content-center">
                                <div
                                  className="spinner-border text-white"
                                  role="status"
                                >
                                  <span className="sr-only">Loading...</span>
                                </div>
                              </div>
                            ) : (
                              <>Upload</>
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                    <br />

                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
