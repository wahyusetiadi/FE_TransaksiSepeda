import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie"; // Uncomment if you're using cookies

const ProtectedLayout = () => {
  const token = localStorage.getItem("token"); // or Cookies.get("token") if using cookies

  if (!token || !isTokenValid(token)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

function isTokenValid(token) {
  try {
    const decoded = JSON.parse(atob(token.split(".")[1]));
    const expirationTime = decoded.exp * 1000;
    return Date.now() < expirationTime;
  } catch (error) {
    console.error("Token validation error:", error);
    return false;
  }
}

export default ProtectedLayout;
