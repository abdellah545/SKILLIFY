import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Home from "./Components/Home/Home";
import AdminDashboard from "./Components/Dashboard/AdminDashboard";
import Layout from "./Components/Layout/Layout";
import LoginAdmin from "./Components/Login_Admin/LoginAdmin";
import SignUp from "./Components/Sign up/SignUp";
import Login from "./Components/Login/Login";
import Auth from "./Components/Sign up/Auth";
import AuthSignup from "./Components/Sign up/AuthSignup";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import VerifyCode from "./Components/ForgotPassword/VerifyCode";
import ResetPassword from "./Components/ForgotPassword/ResetPassword";
import LoginInstructor from "./Components/Login_Instructor/LoginInstructor";
import AuthLoginInstructor from "./Components/Login_Instructor/AuthLoginInstructor";
import InstructorSignUp from "./Components/SignUp_Instructor/InstructorSignUp";
import AuthSignUpInstructor from "./Components/SignUp_Instructor/AuthSignUpInstructor";
import Pending from "./Components/Pending/Pending";
import Confirmation from "./Components/Pending/Confirmation";
import Rejection from "./Components/Pending/Rejection";
import UploadPapers from "./Components/Login_Instructor/UploadPapers";
import InstructorDashboard from "./Components/Instructor Dashboard/InstructorDashboard";
import AddCourse from "./Components/Instructor Dashboard/AddCourse";
import MyCourses from "./Student/MyCourses";
import CourseDetails from "./Student/CourseDetails";
import Categories from "./Student/Categories";
import Cart from "./Student/Cart";
import EditProfile from "./Components/Instructor Dashboard/EditProfile";
import EditCourse from "./Components/Instructor Dashboard/EditCourse";
import InstructorPapers from "./Components/Dashboard/InstructorPapers";
import Favorites from "./Student/Favorites";
import Profile from "./Student/Profile";
import UpdateProfile from "./Student/UpdateProfile";
import UploadContent from "./Components/Instructor Dashboard/UploadContent";

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
  if (cookieExists("AccessTokenAdmin")) {
    return true;
  } // Placeholder, implement your logic here
};

// Define a higher-order component for protected routes for admin
const ProtectedRoute = ({ element, path }) => {
  if (!isAuthenticated()) {
    // Redirect to login if not authenticated
    return <Navigate to="/login-admin" replace />;
  }
  return <>{element}</>;
};

const isAuthenticatedStudent = () => {
  if (cookieExists("AccessTokenStudent")) {
    return true;
  } // Placeholder, implement your logic here
};

// Define a higher-order component for protected routes for student
const ProtectedRouteStudent = ({ element, path }) => {
  if (!isAuthenticatedStudent()) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }
  return <>{element}</>;
};

const isAuthenticatedInstructor = () => {
  if (cookieExists("AccessTokenInstructor")) {
    return true;
  } // Placeholder, implement your logic here
};

// Define a higher-order component for protected routes for instructor
const ProtectedRouteInstructor = ({ element, path }) => {
  if (!isAuthenticatedInstructor()) {
    // Redirect to login if not authenticated
    return <Navigate to="/login-instructor" replace />;
  }
  return <>{element}</>;
};
// ========================= PROTECTED ROUTE =========================
export default function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "", element: <Home /> },
        { path: "/login-admin", element: <LoginAdmin /> },
        { path: "/login", element: <Login /> },
        { path: "/Auth", element: <Auth /> },
        { path: "/register", element: <SignUp /> },
        { path: "/AuthSignup", element: <AuthSignup /> },
        { path: "/login-instructor", element: <LoginInstructor /> },
        { path: "/AuthLoginInstructor", element: <AuthLoginInstructor /> },
        { path: "/register-instructor", element: <InstructorSignUp /> },
        { path: "/AuthSignUpInstructor", element: <AuthSignUpInstructor /> },
        { path: "/forgot-password", element: <ForgotPassword /> },
        { path: "/forgot-password/verify-code", element: <VerifyCode /> },
        {
          path: "/forgot-password/verify-code/reset-password",
          element: <ResetPassword />,
        },
        { path: "/pending", element: <Pending /> },
        { path: "/UploadPapers", element: <UploadPapers /> },
        { path: "/confirmation", element: <Confirmation /> },
        { path: "/rejection", element: <Rejection /> },
        { path: "/categories", element: <Categories /> },
        {
          path: "/student-courses",
          element: (
            <ProtectedRouteStudent
              element={<MyCourses />}
              path="/student-courses"
            />
          ),
        },
        {
          path: "/profile",
          element: (
            <ProtectedRouteStudent element={<Profile />} path="/profile" />
          ),
        },
        {
          path: "/updateProfile",
          element: (
            <ProtectedRouteStudent
              element={<UpdateProfile />}
              path="/updateProfile"
            />
          ),
        },
        {
          path: "/favorites",
          element: (
            <ProtectedRouteStudent element={<Favorites />} path="/favorites" />
          ),
        },
        {
          path: "/cart",
          element: <ProtectedRouteStudent element={<Cart />} path="/cart" />,
        },
        {
          path: "/courseDetails/:id",
          element: (
            <ProtectedRouteStudent
              element={<CourseDetails />}
              path="/courseDetails"
            />
          ),
        },
      ],
    },
    // Define the admin-dashboard route separately without Layout
    {
      path: "/admin-dashboard",
      element: (
        <ProtectedRoute element={<AdminDashboard />} path="/admin-dashboard" />
      ),
    },
    {
      path: "/instructor/:id",
      element: <InstructorPapers />,
    },
    {
      path: "/instructor-dashboard",
      element: (
        <ProtectedRouteInstructor
          element={<InstructorDashboard />}
          path="/instructor-dashboard"
        />
      ),
    },
    {
      path: "/instructor-dashboard/add-course",
      element: (
        <ProtectedRouteInstructor
          element={<AddCourse />}
          path="/instructor-dashboard/add-course"
        />
      ),
    },
    {
      path: "/instructor-dashboard/edit-profile",
      element: (
        <ProtectedRouteInstructor
          element={<EditProfile />}
          path="/instructor-dashboard/edit-profile"
        />
      ),
    },
    {
      path: "/instructor-dashboard/edit-course/:id",
      element: (
        <ProtectedRouteInstructor
          element={<EditCourse />}
          path="/instructor-dashboard/edit-course/:id"
        />
      ),
    },
    {
      path: "/instructor-dashboard/upload-content/:id",
      element: (
        <ProtectedRouteInstructor
          element={<UploadContent />}
          path="/instructor-dashboard/upload-content/:id"
        />
      ),
    },
  ]);
  return (
    <>
      {" "}
      <RouterProvider router={router} />
    </>
  );
}
