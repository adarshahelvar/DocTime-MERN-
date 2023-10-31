import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <AuthContextProvider>
        <ToastContainer
          theme="dark"
          position="bottom-center"
          autoClose={3000}
          closeOnClick
          pauseOnHover={false}
        />
        <App />
      </AuthContextProvider>
    </React.StrictMode>
  </BrowserRouter>
);
