import React, { useEffect, useState } from "react";
import style from "./AdminDashboard.module.css";
import LeftSidebar from "./LeftSidebar";
import axios from "axios";
import baseURL from "../../BaseURL/BaseURL";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getCookie } from "../../Helper/CookiesHelper";

export default function InstructorPapers() {
  const { id } = useParams();
  const [application, setApplication] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get(`${baseURL}/admin/applications`, {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "SHA_ADMIN " + getCookie("AccessTokenAdmin"),
          },
        });
        // Find the specific application by id
        const specificApp = res.data.find((app) => app._id === id);
        setApplication(specificApp);
      } catch (err) {
        console.error("Error fetching applications", err);
      }
    };

    fetchApplications();
  }, [id]);

  if (!application) {
    return (
      <div className="redirect">
        <div class="loader"></div>
      </div>
    );
  }

  async function handleRejection() {
    try {
      const response = await axios.patch(
        `${baseURL}/admin/applications/reject/${id}`,
        {
          comment: "please provide the latest id available",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "SHA_ADMIN " + getCookie("AccessTokenAdmin"),
          },
        }
      );

      Swal.fire("Success", "Application rejected successfully", "success");
      window.location.pathname = "/admin-dashboard";
      // Optionally, redirect or fetch data again to update the UI
    } catch (error) {
      console.error("Failed to reject the application:", error);
      Swal.fire("Error", "Failed to reject the application", "error");
    }
  }

  async function handleAcceptance() {
    try {
      const response = await axios.patch(
        `${baseURL}/admin/applications/approve/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "SHA_ADMIN " + getCookie("AccessTokenAdmin"),
          },
        }
      );
      Swal.fire("Success", "Application accepted successfully", "success");
      setTimeout(() => {
        window.location.pathname = "/admin-dashboard";
      }, 2000);
    } catch (error) {
      console.error("Failed to accept the application:", error);
      Swal.fire("Error", "Failed to accept the application", "error");
    }
  }

  const handleBackToDashboard = () => {
    window.location.pathname = "/admin-dashboard";
  };

  return (
    <>
      <div className={`${style.padding} position-relative ${style.content}`}>
        <div className="row">
          <div className="col-lg-2 d-none d-lg-block p-0">
            <LeftSidebar />
          </div>

          <div className={`col-lg-10 col-md-12 p-0`}>
            <div className={`${style.scrollableContainer} py-5 container`}>
              <div className="row text-center">
                <h1 className="text-start" style={{ color: "#5151D3" }}>
                  Verification
                </h1>
                <hr />
                <h5 style={{ color: "#5151D3" }}>{application.name}</h5>
                <hr style={{ width: "50%", margin: "auto" }} />
                <br />

                <div className="row">
                  {application.CV && application.ID ? (
                    <>
                      <div className="col-lg-6 col-md-12 text-center mb-3">
                        <h1 className="" style={{ color: "#5151D3" }}>
                          Perrsonal ID
                        </h1>

                        <button className={`${style.btn_paper} mx-auto`}>
                          <a
                            href={application.ID}
                            download
                            target="_blank"
                            rel="noreferrer"
                          >
                            <h1>
                              <i
                                class="fa-solid fa-file"
                                style={{ color: "#5151D3", fontSize: "50px" }}
                              ></i>
                            </h1>
                          </a>
                        </button>
                      </div>

                      <div className="col-lg-6 col-md-12 text-center mb-3">
                        <h1 className="" style={{ color: "#5151D3" }}>
                          CV
                        </h1>

                        <button className={`${style.btn_paper} mx-auto`}>
                          <a
                            href={application.CV}
                            download
                            target="_blank"
                            rel="noreferrer"
                          >
                            <h1>
                              <i
                                class="fa-solid fa-file"
                                style={{ color: "#5151D3", fontSize: "50px" }}
                              ></i>
                            </h1>
                          </a>
                        </button>
                      </div>
                      <h5 className="mt-3 fw-bold">
                        Click the file to open it
                      </h5>
                      <hr />
                      <div className="row">
                        <div className="col-lg-6 col-md-12">
                          <button
                            onClick={handleAcceptance}
                            className={`${style.accept_reject_btn} w-75 mx-auto mb-3`}
                          >
                            Accept
                          </button>
                        </div>

                        <div className="col-lg-6 col-md-12">
                          <button
                            className={`${style.accept_reject_btn} w-75 mx-auto mb-3`}
                            onClick={handleRejection}
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="col-lg-12 col-md-12 text-center mb-3">
                        <h1
                          className="text-center"
                          style={{ color: "#5151D3" }}
                        >
                          No files found for this application
                        </h1>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <button
                          className={`${style.accept_reject_btn} w-75 mx-auto mb-3`}
                          onClick={handleRejection}
                        >
                          Reject
                        </button>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <button
                          onClick={handleBackToDashboard}
                          className={`${style.accept_reject_btn} w-75 mx-auto mb-3`}
                        >
                          Back to Dashboard
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
