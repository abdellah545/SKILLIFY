import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import HomeImage from "../../assets/home-page.png";
export default function Home() {
  const cookieExists = (name) => {
    const cookieName = `${name}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");

    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) === 0) {
        return true; // Cookie found
      }
    }

    return false; // Cookie not found
  };
  return (
    <div className="main__page position-relative">
      <div className="main-page p-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8 col-sm-10 p-3 d-flex align-items-center flex-column justify-content-evenly">
              <h1 className="text-center">LEARN ON YOUR OWN SCHEDULE</h1>
              <p className="text-center">
                Learn from the comfort of your home. Our courses are designed
                to help you learn on your own schedule.
              </p>
              <h2 className="text-center">EXPAND YOUR SKILLS</h2>
              <p className="text-center">
                Expand your skills by choosing from 200 different course and
                enjoy the variations of our content.
              </p>
              { !cookieExists("token") &&<Link to="/login">
                <button className="home-btn">Get Started</button>
              </Link>}
              { cookieExists("token") &&<Link to="/dashboard">
                <button className="home-btn">Get Started</button>
              </Link>}
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
