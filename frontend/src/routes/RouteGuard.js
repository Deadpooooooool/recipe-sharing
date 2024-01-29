// RouteGuard.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useUserStore from '../store/userStore';

const RouteGuard = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const isAdmin = useUserStore((state) => state.isAdmin);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAdmin()) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default RouteGuard;
