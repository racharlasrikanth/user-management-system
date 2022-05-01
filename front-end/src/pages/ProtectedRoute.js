import React from 'react'
import { Navigate } from 'react-router-dom';
import { useGlobalContext } from "./../context";

const ProtectedRoute = ({ children, ...rest }) => {
  const { user } = useGlobalContext();
  return user ? children : <Navigate to="/" />
}

export default ProtectedRoute;