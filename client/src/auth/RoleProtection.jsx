// RouteProtection.js
// This file contains route protection components

import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth, useUserRole } from "./authentication.js";

/**
 * PrivateRoute - Protects routes that require authentication
 * @param {Object} props - Component props
 * @param {string} props.allowedRole - Role allowed to access the route ('admin', 'user', or 'both')
 * @returns {JSX.Element} - Renders the child component if authorized, otherwise redirects
 */
export const PrivateRoute = ({ allowedRole = "both" }) => {
  const isAuthenticated = useAuth();
  const { isAdmin } = useUserRole();
  const location = useLocation();

  // If not authenticated, redirect to login with return URL
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role-based access
  if (allowedRole === "admin" && !isAdmin) {
    // Authenticated but not admin, redirect to forbidden page
    return <Navigate to={"/dashboard"} replace />;
  }

  if (allowedRole === "user" && isAdmin) {
    // Authenticated but not a regular user (is admin instead), redirect to forbidden page
    return <Navigate to={"/dashboard"} replace />;
  }

  // User is authenticated and has appropriate role, render the protected component
  return <Outlet />;
};

/**
 * PublicRoute - Used for routes that don't require authentication
 * @returns {JSX.Element} - Renders the child component
 */
export const PublicRoute = () => {
  return <Outlet />;
};

/**
 * GuestOnlyRoute - For routes that should only be accessible by non-authenticated users
 * (like login or registration pages)
 * @returns {JSX.Element} - Renders the child component if user is not authenticated,
 *                         otherwise redirects to dashboard
 */
export const GuestOnlyRoute = () => {
  const isAuthenticated = useAuth();

  if (isAuthenticated) {
    // If already logged in, redirect to appropriate dashboard
    return <Navigate to={"/dashboard"} replace />;
  }

  return <Outlet />;
};
