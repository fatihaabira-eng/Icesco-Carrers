// ProtectedManpowerRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { UserRole } from "../config/routesConfig";

interface ProtectedManpowerRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole | UserRole[];
}

export const ProtectedManpowerRoute = ({ 
  children, 
  requiredRole 
}: ProtectedManpowerRouteProps) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/manpower/auth" replace />;
  }

  if (requiredRole) {
    const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!user || !allowedRoles.includes(user.role as UserRole)) {
      return <Navigate to="/manpower/unauthorized" replace />;
    }
  }

  return <>{children}</>;
};