import React from "react";
import { Link } from "react-router-dom";
import style from "./Pending.module.css";

export default function MainPending(props) {
  return (
    <div className={style.pageContainer}>
      <div className={style.statusCard}>
        <div className={style.contentWrapper}>
          
          <div className={style.imageWrapper}>
            {props.photo ? (
              <img src={props.photo} alt="Status icon" className={style.statusImage} />
            ) : (
              <i className="fa-solid fa-circle-exclamation" style={{ fontSize: "4rem", color: "#64748b" }}></i>
            )}
          </div>
          
          <h1 className={style.title}>{props.title}</h1>
          
          <p className={style.statusText}>{props.status}</p>
          <p className={style.messageText}>{props.message}</p>
          
          <Link to={props.path} style={{ textDecoration: 'none' }}>
            <button className={style.actionBtn}>
              {props.button || "Continue"}
            </button>
          </Link>
          
        </div>
      </div>
    </div>
  );
}
