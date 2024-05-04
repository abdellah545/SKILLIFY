import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import HomeImage from "../../assets/home-page.png";
import Swal from "sweetalert2";
import { cookieExists } from "../../Helper/CookiesHelper";
export default function Home() {
  function handleGetStarted() {
    if (cookieExists("AccessTokenStudent")) {
      window.location.pathname = "/categories";
    } else {
      Swal.fire("Error", "Please login to continue", "error");
    }
  }
  return (
    <div className="main__page position-relative">
      <div className="main-page p-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8 col-sm-10 p-3 d-flex align-items-center flex-column justify-content-evenly">
              <h1 className="text-center">LEARN ON YOUR OWN SCHEDULE</h1>
              <p className="text-center">
                Learn from the comfort of your home. Our courses are designed to
                help you learn on your own schedule.
              </p>

              <button className="home-btn" onClick={handleGetStarted}>
                Get Started
              </button>
            </div>
            <div className="col-lg-6 col-md-8 col-sm-10 p-3">
              <img src={HomeImage} className="img-fluid" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
