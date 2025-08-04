import React, { useState } from "react";
import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

import ImprovedNavbar from "@/components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Opportunities from "./pages/Opportunities";
import DepartmentPage from "./pages/DepartmentPage";
import NotFound from "./pages/NotFound";
import OfferDetailPage from "./pages/OfferDetailPage";
import CandidateDashboard from "./pages/CandidateProfile";
import AuthenticationPage from "./pages/auth";
import MultiStepForm from "./pages/apply";
import CandidateProcess from "./pages/RecrutmentProcess";
import ManpowerDashboard from "./pages/ManpowerDashboard";
import ManpowerPortal from "./pages/ManpowerPortal";
import ManpowerAuth from "./pages/ManpowerAuth";
import CVTechPage from "./pages/CVTechPage";
import RecruitmentRequestForm from "./pages/RecruitmentRequestForm";

const queryClient = new QueryClient();

// Protected Route Component for Manpower System
const ProtectedManpowerRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/manpower/auth" replace />;
  }
  
  return <>{children}</>;
};

// Role-based Redirect Component
const ManpowerRoleRedirect = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/manpower/auth" replace />;
  }
  
  switch (user.role) {
    case 'hr':
      return <Navigate to="/manpower/hr" replace />;
    case 'committee':
      return <Navigate to="/manpower/committee" replace />;
    case 'director':
      return <Navigate to="/manpower/director" replace />;
    default:
      return <Navigate to="/manpower/auth" replace />;
  }
};

const AppContent = () => {
  const location = useLocation();
  const hideNavbarOnRoutes = ["/auth"];
  const isManpowerRoute = location.pathname.startsWith('/manpower');

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const storedAuth = localStorage.getItem('isAuthenticated');
      return storedAuth ? JSON.parse(storedAuth) : false;
    } catch (error) {
      console.error("Failed to parse isAuthenticated from localStorage", error);
      return false;
    }
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('currentUser');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse currentUser from localStorage", error);
      return null;
    }
  });

  const handleLoginSuccess = (userData: any) => {
    setIsAuthenticated(true);
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {!hideNavbarOnRoutes.includes(location.pathname) && !isManpowerRoute && (
        <ImprovedNavbar
          isAuthenticated={isAuthenticated}
          mockUser={currentUser}
          onLogout={handleLogout}
        />
      )}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/auth"
            element={<AuthenticationPage onLoginSuccess={handleLoginSuccess} />}
          />
          <Route path="/details" element={<OfferDetailPage />} />
          <Route path="/steps" element={<MultiStepForm />} />
          <Route path="/process" element={<CandidateProcess />} />
          <Route path="/about" element={<About />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/departments/:department" element={<DepartmentPage />} />
          <Route path="/manpower-dashboard" element={<ManpowerDashboard />} />
          <Route path="/recruitment-request" element={<RecruitmentRequestForm />} />

          {/* Manpower Portal Routes */}
          <Route path="/manpower/auth" element={<ManpowerAuth />} />
          <Route path="/manpower" element={<ManpowerRoleRedirect />} />
          <Route 
            path="/manpower/hr" 
            element={
              <ProtectedManpowerRoute>
                <ManpowerPortal defaultRole="hr" />
              </ProtectedManpowerRoute>
            } 
          />
          <Route 
            path="/manpower/hr/cvtech" 
            element={
              <ProtectedManpowerRoute>
                <CVTechPage />
              </ProtectedManpowerRoute>
            } 
          />
          <Route 
            path="/manpower/committee" 
            element={
              <ProtectedManpowerRoute>
                <ManpowerPortal defaultRole="committee" />
              </ProtectedManpowerRoute>
            } 
          />
          <Route 
            path="/manpower/director" 
            element={
              <ProtectedManpowerRoute>
                <ManpowerPortal defaultRole="director" />
              </ProtectedManpowerRoute>
            } 
          />
          
          {/* Legacy route redirect */}
          <Route path="/manpower-portal" element={<Navigate to="/manpower" replace />} />

          <Route
            path="/dashboard"
            element={isAuthenticated ? <CandidateDashboard /> : <Navigate to="/auth" replace />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!hideNavbarOnRoutes.includes(location.pathname) && !isManpowerRoute && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <NotificationProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <AppContent />
          </AuthProvider>
        </NotificationProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
