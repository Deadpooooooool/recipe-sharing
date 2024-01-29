import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/HomePage';
import UserProfile from '../pages/ProfilePage';
import AdminDashboard from '../pages/AdminDashboard';
import LoginPage from '../pages/LoginPage';
import RecipeDetail from '../components/RecipeDetail';
import Register from '../pages/Register';
import useUserStore from '../store/userStore'; // Import your user store

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile/:userId" element={<UserProfile />} />
      <Route path="/recipes/:id" element={<RecipeDetail />} />
      <Route path="/admin/dashboard" element={<AdminRouteGuard><AdminDashboard /></AdminRouteGuard>} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

export default AllRoutes;

// AdminRouteGuard component
const AdminRouteGuard = ({ children }) => {
  const { isAuthenticated, isAdmin } = useUserStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return isAdmin ? children : <Navigate to="/home" replace />;
};
