import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

export default function PublicRoute(props) {
  const location = useLocation();
  const token = localStorage.getItem("token");

  if (token && props.restricted) {
    return <Navigate to="basic/home" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
