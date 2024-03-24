import React from "react";
import Home from "./Components/Home/Home";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";

import Dashboard from "./Components/Dashboard/Dashboard";
import Layout from "./Components/Layout/Layout";
import SignUp from "./Components/Sign up/SignUp";
import Login from "./Components/Login/Login";
import Auth from "./Components/Sign up/Auth";
import AuthSignup from "./Components/Sign up/AuthSignup";


//========================= COOKIES =========================
const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};
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
const getCookie = (name) => {
  const cookieName = `${name}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }

  return null;
};
//========================= COOKIES =========================


// ========================= PROTECTED ROUTE =========================
const isAuthenticated = () => {
  return cookieExists("token") ? true : false;
}

const ProtectedRoute = ({ element }) => {
  const isAuth = isAuthenticated();

  // If authenticated, render the element, else redirect to login
  return isAuth ? element : <Navigate to="/login" />;
};
// ========================= PROTECTED ROUTE =========================
export default function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/Auth", element: <Auth /> },
        { path: "/register", element: <SignUp /> },
        { path: "/AuthSignup", element: <AuthSignup /> },
        { path: "/dashboard", element: <ProtectedRoute element={<Dashboard />} />  },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
