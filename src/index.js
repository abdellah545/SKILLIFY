/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from './Student/CartContext';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { cookieExists } from "./Helper/CookiesHelper"; // Ensure correct import path

import { disableBackendDependency } from "./mockBackend";

// Globally disable all backend interactions for UI preview
disableBackendDependency();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.Fragment>
    <CartProvider>
      <App />
    </CartProvider>
  </React.Fragment>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
