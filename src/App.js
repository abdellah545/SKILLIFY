import React, { Suspense, lazy } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// ── Globals ──
import Layout from "./Components/Layout/Layout";
// Home loaded eagerly since it's the main landing page and fastest to render
import Home from "./Components/Home/Home";

// ── Lazy Loading Components for Ultimate Performance ──
// This technique (Code Splitting) reduces the initial JS bundle size dramatically.

// Dashboard & Layouts
const AdminDashboard = lazy(() => import("./Components/Dashboard/AdminDashboard"));
const InstructorPapers = lazy(() => import("./Components/Dashboard/InstructorPapers"));
const InstructorDashboard = lazy(() => import("./Components/Instructor Dashboard/InstructorDashboard"));

// Auth & Login
const LoginAdmin = lazy(() => import("./Components/Login_Admin/LoginAdmin"));
const AuthAdmin = lazy(() => import("./Components/Login_Admin/AuthAdmin"));
const Login = lazy(() => import("./Components/Login/Login"));
const Auth = lazy(() => import("./Components/Sign up/Auth"));
const SignUp = lazy(() => import("./Components/Sign up/SignUp"));
const AuthSignup = lazy(() => import("./Components/Sign up/AuthSignup"));
const ForgotPassword = lazy(() => import("./Components/ForgotPassword/ForgotPassword"));
const VerifyCode = lazy(() => import("./Components/ForgotPassword/VerifyCode"));
const ResetPassword = lazy(() => import("./Components/ForgotPassword/ResetPassword"));
const LoginInstructor = lazy(() => import("./Components/Login_Instructor/LoginInstructor"));
const AuthLoginInstructor = lazy(() => import("./Components/Login_Instructor/AuthLoginInstructor"));
const InstructorSignUp = lazy(() => import("./Components/SignUp_Instructor/InstructorSignUp"));
const AuthSignUpInstructor = lazy(() => import("./Components/SignUp_Instructor/AuthSignUpInstructor"));

// Pending & Verifications
const Pending = lazy(() => import("./Components/Pending/Pending"));
const Confirmation = lazy(() => import("./Components/Pending/Confirmation"));
const Rejection = lazy(() => import("./Components/Pending/Rejection"));
const UploadPapers = lazy(() => import("./Components/Login_Instructor/UploadPapers"));

// Instructor Operations
const AddCourse = lazy(() => import("./Components/Instructor Dashboard/AddCourse"));
const EditProfile = lazy(() => import("./Components/Instructor Dashboard/EditProfile"));
const EditCourse = lazy(() => import("./Components/Instructor Dashboard/EditCourse"));
const UploadContent = lazy(() => import("./Components/Instructor Dashboard/UploadContent"));

// Student Operations
const MyCourses = lazy(() => import("./Student/MyCourses"));
const CourseDetails = lazy(() => import("./Student/CourseDetails"));
const Categories = lazy(() => import("./Student/Categories"));
const Cart = lazy(() => import("./Student/Cart"));
const Favorites = lazy(() => import("./Student/Favorites"));
const Profile = lazy(() => import("./Student/Profile"));
const UpdateProfile = lazy(() => import("./Student/UpdateProfile"));

// Loader Component for Suspense Fallback
const PageLoader = () => (
  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', gap: '20px', background: '#f8fafc' }}>
    <div className="spinner-border" style={{ width: '4rem', height: '4rem', color: '#5151D3' }} role="status"></div>
    <span style={{ color: '#64748b', fontWeight: 600, fontSize: '1.2rem' }}>Loading SKILLIFY...</span>
  </div>
);

export default function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "", element: <Home /> },
        { path: "/login-admin", element: <LoginAdmin /> },
        { path: "/admin-auth", element: <AuthAdmin /> },
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
        { path: "/forgot-password/verify-code/reset-password", element: <ResetPassword /> },
        { path: "/pending", element: <Pending /> },
        { path: "/UploadPapers", element: <UploadPapers /> },
        { path: "/confirmation", element: <Confirmation /> },
        { path: "/rejection", element: <Rejection /> },
        { path: "/categories", element: <Categories /> },
        { path: "/student-courses", element: <MyCourses /> },
        { path: "/profile", element: <Profile /> },
        { path: "/updateProfile", element: <UpdateProfile /> },
        { path: "/favorites", element: <Favorites /> },
        { path: "/cart", element: <Cart /> },
        { path: "/courseDetails/:id", element: <CourseDetails /> },
      ],
    },
    { path: "/admin-dashboard", element: <AdminDashboard /> },
    { path: "/instructor/:id", element: <InstructorPapers /> },
    { path: "/instructor-dashboard", element: <InstructorDashboard /> },
    { path: "/instructor-dashboard/add-course", element: <AddCourse /> },
    { path: "/instructor-dashboard/edit-profile", element: <EditProfile /> },
    { path: "/instructor-dashboard/edit-course/:id", element: <EditCourse /> },
    { path: "/instructor-dashboard/upload-content/:id", element: <UploadContent /> },
  ]);

  return (
    <>
      <div style={{
        padding: "10px",
        background: "#1e293b",
        color: "white",
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        justifyContent: "center",
        borderBottom: "2px solid #5151D3",
        position: "relative",
        zIndex: 99999
      }}>
        <strong style={{ alignSelf: "center", marginRight: "10px", color: "#60a5fa" }}>Dev Nav:</strong>
        <a href="/" style={{ color: "white", textDecoration: "none", fontSize: "14px", padding: "4px 8px", background: "#334155", borderRadius: "4px" }}>Home</a>
        <a href="/login" style={{ color: "white", textDecoration: "none", fontSize: "14px", padding: "4px 8px", background: "#334155", borderRadius: "4px" }}>Login</a>
        <a href="/register" style={{ color: "white", textDecoration: "none", fontSize: "14px", padding: "4px 8px", background: "#334155", borderRadius: "4px" }}>Sign Up</a>
        <a href="/login-admin" style={{ color: "white", textDecoration: "none", fontSize: "14px", padding: "4px 8px", background: "#334155", borderRadius: "4px" }}>Admin Login</a>
        <a href="/login-instructor" style={{ color: "white", textDecoration: "none", fontSize: "14px", padding: "4px 8px", background: "#334155", borderRadius: "4px" }}>Inst. Login</a>
        <a href="/admin-dashboard" style={{ color: "white", textDecoration: "none", fontSize: "14px", padding: "4px 8px", background: "#334155", borderRadius: "4px" }}>Admin Dash</a>
        <a href="/instructor-dashboard" style={{ color: "white", textDecoration: "none", fontSize: "14px", padding: "4px 8px", background: "#334155", borderRadius: "4px" }}>Inst. Dash</a>
        <a href="/student-courses" style={{ color: "white", textDecoration: "none", fontSize: "14px", padding: "4px 8px", background: "#334155", borderRadius: "4px" }}>My Courses</a>
        <a href="/profile" style={{ color: "white", textDecoration: "none", fontSize: "14px", padding: "4px 8px", background: "#334155", borderRadius: "4px" }}>Profile</a>
        <a href="/categories" style={{ color: "white", textDecoration: "none", fontSize: "14px", padding: "4px 8px", background: "#334155", borderRadius: "4px" }}>Categories</a>
        <a href="/cart" style={{ color: "white", textDecoration: "none", fontSize: "14px", padding: "4px 8px", background: "#334155", borderRadius: "4px" }}>Cart</a>
      </div>
      
      {/* Suspense Wrapper manages loading state for Lazy Components */}
      <Suspense fallback={<PageLoader />}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}
