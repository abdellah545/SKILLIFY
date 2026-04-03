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

  const isActive = (path) => window.location.pathname === path;

  const navItems = [
    { to: "/admin-dashboard", icon: "fa-solid fa-house", label: "Applications" },
  ];

  return (
    <div className={style.sidebar}>
      {/* Brand */}
      <div className={style.brand}>
        <img src={logo} alt="Skillify Logo" className={style.logo} />
        <span className={style.brandName}>SKILLIFY</span>
        <span className={style.adminTag}>Admin</span>
      </div>

      <hr className={style.divider} />

      {/* Nav */}
      <nav className={style.nav}>
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`${style.navItem} ${isActive(item.to) ? style.active : ""}`}
          >
            <i className={item.icon}></i>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <button className={style.logoutBtn} onClick={handleLogout}>
        <i className="fa-solid fa-arrow-right-from-bracket"></i>
        <span>Log Out</span>
      </button>
    </div>
  );
}
