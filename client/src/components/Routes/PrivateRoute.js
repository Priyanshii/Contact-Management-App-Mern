import React from "react";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const userData = localStorage.getItem("contact-app-user");
  
  return userData ? children : <Navigate to="/login" replace/>
};