// authentication.js
// This file contains utility functions for authentication and role checking

import { useSelector } from "react-redux";

/**
 * Custom hook to check if a user is authenticated using Redux state
 * @returns {boolean} - True if user is authenticated, false otherwise
 */
export const useAuth = () => {
  const { isLogin } = useSelector((state) => state.auth);
  return isLogin;
};

/**
 * Custom hook to get the user's role from Redux state
 * @returns {Object} - Object containing isAdmin and role properties
 */
export const useUserRole = () => {
  const { isAdmin, user } = useSelector((state) => state.auth);
  return {
    isAdmin,
    role: user?.role || undefined,
    user,
  };
};
