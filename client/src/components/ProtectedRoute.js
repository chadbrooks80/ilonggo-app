// /client/src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    console.log("no token");
    return <Navigate to="/" />;
  } else {
    console.log("there is token")
  }

  return children;
};

export default ProtectedRoute;
