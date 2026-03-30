import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from './Student/CartContext';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { cookieExists } from "./Helper/CookiesHelper"; // Ensure correct import path

const root = ReactDOM.createRoot(document.getElementById("root"));

// Check if the 'AccessTokenStudent' cookie exists
const hasAccessToken = cookieExists("AccessTokenStudent");

// Conditional rendering based on cookie existence
root.render(
  hasAccessToken ? (
    <CartProvider>
      <App />
    </CartProvider>
  ) : (
    <React.Fragment>
      <App />
    </React.Fragment>
  )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
