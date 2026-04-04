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

## 🖼️ Project Screenshots

## Landing Page

<p align="center">
  <img src="./src/assets/Interface/landing/landing.jpeg" width="35%" />
</p>

## 🧑‍🏫 Instructor Panel

Instructors can register and log in to their accounts, create and manage courses, upload learning materials, edit course details, and organize course sessions through a dedicated dashboard.

<p align="center">
  <img src="./src/assets/Interface/Instructor-dashboard/inst-signup.png" width="45%" />
  <img src="./src/assets/Interface/Instructor-dashboard/inst-login.png" width="45%" />
</p>

<p align="center">
  <sub><b>Instructor Sign Up</b> | <b>Instructor Login</b></sub>
</p>

<br/>

<p align="center">
  <img src="./src/assets/Interface/Instructor-dashboard/inst-add-course.png" width="45%" />
  <img src="./src/assets/Interface/Instructor-dashboard/inst-dash.png" width="45%" />
</p>

<p align="center">
  <sub><b>Add Course</b> | <b>Instructor Dashboard</b></sub>
</p>

<br/>

<p align="center">
  <img src="./src/assets/Interface/Instructor-dashboard/inst-course-cont.png" width="45%" />
  <img src="./src/assets/Interface/Instructor-dashboard/inst-edit-course.png" width="45%" />
</p>

<p align="center">
  <sub><b>Course Content</b> | <b>Edit Course</b></sub>
</p>

<br/>

<p align="center">
  <img src="./src/assets/Interface/Instructor-dashboard/inst-edit-profile.png" width="45%" />
</p>

<p align="center">
  <sub><b>Edit Profile</b></sub>
</p>

## 👨‍🎓 User Panel

Users can create accounts, explore all available courses published by instructors, view course details, add courses to favourites or cart, complete purchases, access enrolled courses, and manage their personal profile.

<p align="center">
  <img src="./src/assets/Interface/user/user-signup.png" width="45%" />
  <img src="./src/assets/Interface/user/user-login.png" width="45%" />
</p>

<p align="center">
  <sub><b>User Sign Up</b> | <b>User Login</b></sub>
</p>

<br/>

<p align="center">
  <img src="./src/assets/Interface/user/user-cart.png" width="45%" />
  <img src="./src/assets/Interface/user/user-course-cont.png" width="45%" />
</p>

<p align="center">
  <sub><b>User Cart</b> | <b>User Course Content</b></sub>
</p>

<br/>

<p align="center">
  <img src="./src/assets/Interface/user/user-courses.png" width="45%" />
  <img src="./src/assets/Interface/user/user-profile.png" width="45%" />
</p>

<p align="center">
  <sub><b>User Courses</b> | <b>User Profile</b></sub>
</p>

## 🛡️ Admin Panel

Admins are responsible for reviewing instructor applications and deciding whether submitted instructors should be accepted or rejected before accessing the platform as course publishers.

<p align="center">
  <img src="./src/assets/Interface/admin-dashboard/admin-dash.png" width="60%" />
</p>

<p align="center">
  <sub><b>Admin Dashboard</b></sub>
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
