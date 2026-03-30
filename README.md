# SKILLIFY | Training Center

Secured web application that provides online courses through a multi-role platform for instructors, users, and admins.

## 📌 Overview

SKILLIFY is an online learning platform where instructors can publish and manage courses, users can explore and purchase courses, and admins can review instructor applications before granting publishing access.

## 🚀 Key Features

- Secure authentication using JSON Web Tokens (JWT)
- Role-based authorization for Admin, Instructor, and User
- Instructor application review workflow
- Course creation, editing, and content management
- Browse, favourite, and purchase courses
- Shopping cart and checkout flow
- User profile management
- Logging system for monitoring user and system actions
- Protection against common vulnerabilities such as XSS, CSRF, and injection attacks

## 🔐 Security

### Authentication
- JWT-based authentication is used to secure user sessions and protected routes.

### Authorization
- Role-Based Access Control (RBAC) ensures each role can only access the features assigned to it.

### Penetration Testing
- The application was tested against common web vulnerabilities.
- Security mitigations were applied to strengthen the system and reduce attack risks.

## 🧑‍🏫 Instructor Panel

Instructors can register and log in to their accounts, create and manage courses, upload learning materials, edit course details, and organize course sessions through a dedicated dashboard.

<p align="center">
  <img src="./src/assets/Instructor-dashboard/signup-instructor.png" width="45%" />
  <img src="./src/assets/Instructor-dashboard/login-instructor.png" width="45%" />
</p>

<p align="center">
  <sub><b>Instructor Sign Up</b> | <b>Instructor Login</b></sub>
</p>

<br/>

<p align="center">
  <img src="./src/assets/Instructor-dashboard/add-course.png" width="45%" />
  <img src="./src/assets/Instructor-dashboard/instructor-dashboard.png" width="45%" />
</p>

<p align="center">
  <sub><b>Add New Course</b> | <b>Instructor Dashboard / My Courses</b></sub>
</p>

<br/>

<p align="center">
  <img src="src/assets/Instructor-dashboard/course-content.png" width="45%" />
  <img src="./src/assets/Instructor-dashboard/edit-course.png" width="45%" />
</p>

<p align="center">
  <sub><b>Manage Course Content</b> | <b>Edit Course Details</b></sub>
</p>

<br/>

<p align="center">
  <img src="./src/assets/Instructor-dashboard/update-course-content.png" width="60%" />
</p>

<p align="center">
  <sub><b>Upload and Preview Course Sessions</b></sub>
</p>

## 👨‍🎓 User Panel

Users can create accounts, explore all available courses published by instructors, view course details, add courses to favourites or cart, complete purchases, access enrolled courses, and manage their personal profile.

<p align="center">
  <img src="./src/assets/user/sign-up-user.png" width="45%" />
  <img src="./src/assets/user/skillify-courses.png" width="45%" />
</p>

<p align="center">
  <sub><b>User Sign Up</b> | <b>Browse All Available Courses</b></sub>
</p>

<br/>

<p align="center">
  <img src="./src/assets/user/course-details.png" width="45%" />
  <img src="./src/assets/user/favorites.png" width="45%" />
</p>

<p align="center">
  <sub><b>Course Details & Purchase Flow</b> | <b>Favourite Courses</b></sub>
</p>

<br/>

<p align="center">
  <img src="./src/assets/user/cart.png" width="45%" />
  <img src="./src/assets/user/user-courses.png" width="45%" />
</p>

<p align="center">
  <sub><b>Shopping Cart & Checkout</b> | <b>User Enrolled Courses</b></sub>
</p>

<br/>

<p align="center">
  <img src="./src/assets/user/user-profile.png" width="45%" />
  <img src="./src/assets/user/update-profile.png" width="45%" />
</p>

<p align="center">
  <sub><b>User Profile</b> | <b>Update Profile</b></sub>
</p>

## 🛡️ Admin Panel

Admins are responsible for reviewing instructor applications and deciding whether submitted instructors should be accepted or rejected before accessing the platform as course publishers.

<p align="center">
  <img src="./src/assets/admin-dashboard/admin-login.png" width="45%" />
  <img src="./src/assetsadmin-dashboard/admin-dashboard.png" width="45%" />
</p>

<p align="center">
  <sub><b>Admin Login</b> | <b>Admin Dashboard</b></sub>
</p>

<br/>

<p align="center">
  <img src="./src/assets/admin-dashboard/admin-accept-reject.png" width="60%" />
</p>

<p align="center">
  <sub><b>Instructor Application Review (Accept / Reject)</b></sub>
</p>

## 🛠️ Built With

- React
- Node.js
- Express
- MongoDB

## 👥 Roles

- **Instructor**: Creates, edits, and manages courses and course content
- **User**: Browses, favourites, purchases, and accesses enrolled courses
- **Admin**: Reviews instructor submissions and controls approval workflow
