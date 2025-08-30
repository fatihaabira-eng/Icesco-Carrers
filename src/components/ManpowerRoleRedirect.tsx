// components/ManpowerRoleRedirect.tsx
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ManpowerRoleRedirect = () => {
  const { isAuthenticated, user } = useAuth();

 

  if (!isAuthenticated) {
    return <Navigate to="/manpower/auth" replace />;
  }

  // Redirect based on user role
  switch (user.role) {
    case 'recruitment':
      return <Navigate to="/manpower/hr/dashboard" replace />;
    case 'committee':
      return <Navigate to="/manpower/home" replace />;
    case 'business unit':
      return <Navigate to="/manpower/director/bu-manpower-management" replace />;
    default:
      return <Navigate to="/manpower/auth" replace />;
  }
};

export default ManpowerRoleRedirect;