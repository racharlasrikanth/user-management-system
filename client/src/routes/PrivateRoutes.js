import React from 'react';
import { Navigate } from "react-router-dom";
import { useUserContext } from '../context/userContext';

const PrivateRoutes = ({ children }) => {

  const { user } = useUserContext();

  return (
    user ? children : <Navigate to="/login" />
  )
}

export default PrivateRoutes;