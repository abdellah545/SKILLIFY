import React from "react";
import style from "./LeftSidebar.module.css";
import logo from "../../assets/icon-logo.png";
import { Link } from "react-router-dom";
import { deleteCookie } from "../../Helper/CookiesHelper";

export default function LeftSidebar() {
  const handleLogout = () => {
    deleteCookie("AccessTokenAdmin");
    window.location.pathname = "/";
  };
  return (
    <>
      <div className={`${style.sidebar}`}>
        <div className={`${style.sidebar_content}`}>
          <div className="row">
            <div className="col-lg-12 text-center mt-3">
              <div className="d-flex flex-column align-items-center">
                <img
                  src={logo}
                  style={{
                    width: "120px",
                    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
                    borderRadius: "50%",
                  }}
                  alt=""
                />
                <div className="row text-center mt-5 flex-column">
                  <span className="fw-bold fs-5" style={{ color: "#5151D3" }}>
                    <i class="fa-regular fa-user"></i> user : admin
                  </span>
                </div>
                <hr style={{ width: "80%" }} />
                <div className="col-lg-12 text-center mt-5">
                  <ul className="list-unstyled">
                    {window.location.pathname === "/admin-dashboard" ? (
                      <>
                        <Link
                          to="/admin-dashboard"
                          style={{
                            textDecoration: "none",
                            color: "#5151D3",
                          }}
                          className={`${style.list}`}
                        >
                          <li
                            className={`mb-3 fw-bold`}
                            style={{
                              backgroundColor: "rgba(81, 81, 211, 0.3)",
                              padding: "10px",
                            }}
                          >
                            <i class="fa-solid fa-house"></i> Applications
                          </li>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/admin-dashboard"
                          style={{
                            textDecoration: "none",
                            color: "#5151D3",
                          }}
                          className={`${style.list}`}
                        >
                          <li className={`mb-3 fw-bold`}>
                            <i class="fa-solid fa-house"></i> Applications
                          </li>
                        </Link>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${style.log_out} text-center mb-3`}>
          <button
            className="btn text-danger fw-bold fs-4"
            onClick={handleLogout}
          >
            <i class="fa-solid fa-arrow-right-from-bracket"></i> Log Out
          </button>
        </div>
      </div>
    </>
  );
}
