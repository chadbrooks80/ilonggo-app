// /client/src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds

    if (decodedToken.exp < currentTime) {
      return <Navigate to="/" />; // Redirect to login if token is expired
    }
  } catch (error) {
    return <Navigate to="/" />; // Redirect to login if token is invalid
  }

  return children;
};

export default ProtectedRoute;
