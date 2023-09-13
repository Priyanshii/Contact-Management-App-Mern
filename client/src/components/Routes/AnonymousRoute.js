import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const AnonymousRoute = ({ children }) => {
  const { email } = useSelector((store) => store.user.userData)
  
  return email ? <Navigate to="/" replace/> : children;
};