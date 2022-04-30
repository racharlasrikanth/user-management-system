import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, ...rest }) => {
  const user = "some user";
  return user ? children : <Navigate to="/" />
}

export default ProtectedRoute;