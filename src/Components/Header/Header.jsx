import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import 'animate.css';
import { useCart } from '../../Student/CartContext';

export default function Header() {
  const [loading, setLoading] = useState(false);
  const { cart, favorites } = useCart(); // Access cart and favorites from context

  const deleteCookie = (name) => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  };

  const cookieExists = (name) => {
    const cookieName = `${name}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) === 0) {
        return true; // Cookie found
      }
    }

    return false; // Cookie not found
  };

  const getCookie = (name) => {
    const cookieName = `${name}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }

    return null;
  };

  const handleLogout = () => {
    setLoading(true);
    deleteCookie('AccessTokenStudent');
    deleteCookie('cart');
    deleteCookie('wishlist');
    deleteCookie('favorites');
    deleteCookie('userName');
    deleteCookie('courses');
    deleteCookie('userEmail');
    deleteCookie('userImage');
    deleteCookie('phone');
    deleteCookie('gender');
    deleteCookie('createdAt');
    deleteCookie('updatedAt');
    deleteCookie('github');
    sessionStorage.clear();
    setLoading(false);
    window.location.pathname = '/';
  };

  return (
    <div
      className="sticky-top"
      style={{ boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)' }}
    >
      <nav className="navbar navbar-expand-lg p-1">
        <div className="container">
          <Link
            className="navbar-brand animate__animated animate__pulse animate__infinite"
            id="navbar-link"
            to="/"
          >
            SKILLIFY
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-5 mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active fw-bold"
                  id="nav-link"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {cookieExists('AccessTokenStudent') ? (
                <li className="nav-item">
                  <Link
                    className="nav-link fw-bold"
                    id="nav-link"
                    aria-current="page"
                    to="/categories"
                  >
                    Categories
                  </Link>
                </li>
              ) : null}
            </ul>

            {!cookieExists('AccessTokenStudent') ? (
              <div className="d-flex ms-auto">
                <div className="dropdown login-btn">
                  <button
                    className="btn border-0 dropdown-toggle text-white fw-bold"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Login
                  </button>
                  <ul className="dropdown-menu">
                    <li className="">
                      <Link className="dropdown-item" to="/login-admin">
                        As an admin
                      </Link>
                    </li>
                    <hr className="dropdown-divider" />
                    <li className="">
                      <Link className="dropdown-item" to="/login">
                        As a student
                      </Link>
                    </li>
                    <hr className="dropdown-divider" />
                    <li>
                      <Link className="dropdown-item" to="/login-instructor">
                        As an instructor
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="dropdown signup-btn">
                  <button
                    className="btn btn-transparent border-0 dropdown-toggle fw-bold"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    SignUp
                  </button>
                  <ul className="dropdown-menu">
                    <li className="">
                      <Link className="dropdown-item" to="/register">
                        As a student
                      </Link>
                    </li>
                    <hr className="dropdown-divider" />
                    <li>
                      <Link className="dropdown-item" to="/register-instructor">
                        Apply to be an instructor
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="logout-user-container d-flex ms-auto align-items-center justify-content-between">
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav me-4 me-md-0 mb-2 mb-lg-0">
                    {cookieExists('AccessTokenStudent') && (
                      <>
                        <li className="nav-item me-1">
                          <Link
                            className="nav-link fw-bold"
                            id="nav-link"
                            to="/student-courses"
                          >
                            My Courses
                          </Link>
                        </li>
                        <li className="nav-item me-2 position-relative">
                          <Link
                            className="nav-link fw-bold"
                            id="nav-link"
                            to="/cart"
                          >
                            <i className="fa-solid fa-cart-shopping"></i>
                            <span className="badge bg-danger position-absolute top-1 start-99 translate-middle" style={{fontSize: '10px'}}>
                              {cart.length}
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item me-2 position-relative">
                          <Link
                            className="nav-link fw-bold"
                            id="nav-link"
                            to="/favorites"
                          >
                            <i className="fa-solid fa-heart"></i>
                            <span className="badge bg-danger position-absolute top-1 start-99 translate-middle" style={{fontSize: '10px'}}>
                              {favorites.length}
                            </span>
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
                <div
                  className="vr me-1 d-none d-md-block"
                  style={{ color: '#5151d3' }}
                ></div>
                <div className="dropdown bg-white cursor-pointer">
                  <button
                    className="btn border-0 dropdown-toggle d-flex align-items-center"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ color: '#5151d3' }}

                  >
                    <img
                      src={sessionStorage.getItem("userImage")}
                      alt="userImage"
                      width={30}
                      height={30}
                      className="me-2 rounded-circle"
                    />
                    <span
                      className="fw-bold"
                    >
                      {getCookie('userName')}
                    </span>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li className="">
                      <Link className="dropdown-item" to="/profile">
                        Profile
                      </Link>
                    </li>
                    <li className="">
                      <Link className="dropdown-item" to="/updateProfile">
                        Update Profile
                      </Link>
                    </li>
                    <hr className="dropdown-divider" />
                    <li>
                      <button
                        className="dropdown-item logout-btn"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
