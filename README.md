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
  <img src="./src\assets\Interface\landing-page/landing.jpeg" width="35%" />
</p>

## 🧑‍🏫 Instructor Panel

<p align="center">
  <img src="./src/assets/Interface/Instructor-dashboard/inst-signup.png" width="45%" />
  <img src="./src/assets/Interface/Instructor-dashboard/inst-login.png" width="45%" />
</p>

<p align="center">
  <img src="./src/assets/Interface/Instructor-dashboard/inst-add-course.png" width="45%" />
  <img src="./src/assets/Interface/Instructor-dashboard/inst-dash.png" width="45%" />
</p>

<p align="center">
  <img src="./src/assets/Interface/Instructor-dashboard/inst-course-cont.png" width="45%" />
  <img src="./src/assets/Interface/Instructor-dashboard/inst-edit-course.png" width="45%" />
</p>

<p align="center">
  <img src="./src/assets/Interface/Instructor-dashboard/inst-edit-profile.png" width="45%" />
</p>

## 👨‍🎓 User Panel

<p align="center">
  <img src="./src/assets/Interface/user/user-signup.png" width="45%" />
  <img src="./src/assets/Interface/user/user-login.png" width="45%" />
</p>

<p align="center">
  <img src="./src/assets/Interface/user/user-cart.png" width="45%" />
  <img src="./src/assets/Interface/user/user-course-cont.png" width="45%" />
</p>

<p align="center">
  <img src="./src/assets/Interface/user/user-courses.png" width="45%" />
  <img src="./src/assets/Interface/user/user-profile.png" width="45%" />
</p>

## 🛡️ Admin Panel

<p align="center">
  <img src="./src/assets/Interface/admin-dashboard/admin-dash.png" width="60%" />
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
