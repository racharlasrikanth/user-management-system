import React from 'react';
import { Navigate } from "react-router-dom";
import { useUserContext } from '../context/userContext';

const PublicRoutes = ({ children }) => {

  const { user } = useUserContext();

  return user ? <Navigate to="/" /> : children;
}

export default PublicRoutes;