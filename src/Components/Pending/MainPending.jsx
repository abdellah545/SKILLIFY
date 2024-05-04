import React from "react";
import "../Sign up/SignUp.css";
import "../Login/Login.css";
import { Link } from "react-router-dom";
import pending from "../../assets/pending.png";

export default function MainPending(props) {
  return (
    <>
      <section className="section-signup p-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12 col-md-12 col-sm-12 p-0">
              <div className="signup-form p-5 border rounded">
                <form action="" >
                  <div className="container">
                    <div className="row justify-content-center">
                      <div className="image d-flex justify-content-center border rounded w-auto p-1">
                        <img src={props.photo} alt="" />
                      </div>
                      <br />
                      <h1 className="text-center mt-3">{props.title}</h1>
                      <div>
                        <p className="text-center my-5 fs-4">{props.status}</p>
                        <p className="text-center fs-4">{props.message}</p>
                      </div>
                      <br />
                      <div className="d-flex justify-content-center align-items-center">
                        <Link to={props.path} className="">
                          <button className="signup-login-btn w-100 fs-5">
                            {props.button}
                          </button>
                        </Link>
                      </div>
                      <br />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
