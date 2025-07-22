import React, { useState, useEffect } from "react";
import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationProvider } from "@/contexts/NotificationContext";

import ImprovedNavbar from "@/components/Navbar"; // Ensure this import is correct
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Opportunities from "./pages/Opportunities";
import DepartmentPage from "./pages/DepartmentPage";
import NotFound from "./pages/NotFound";
import OfferDetailPage from "./pages/OfferDetailPage";
import CandidateDashboard from "./pages/CandidateProfile";
import AuthenticationPage from "./pages/auth";
import MultiStepForm from "./pages/apply" // Ensure this import is correct
import CandidateProcess from "./pages/RecrutmentProcess"; // Ensure this import is correct

const queryClient = new QueryClient();

const App = () => {
  const location = useLocation();
  const hideNavbarOnRoutes = ["/auth"];

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

  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }, [isAuthenticated, currentUser]);

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
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <NotificationProvider>
          <Toaster />
          <Sonner />
          <div className="flex flex-col min-h-screen">
            {!hideNavbarOnRoutes.includes(location.pathname) && (
              <ImprovedNavbar
                isAuthenticated={isAuthenticated}
                mockUser={currentUser}
                onLogout={handleLogout}
              />
            )}

            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                {/* This is the crucial part: ensure onLoginSuccess is passed here */}
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

                <Route
                  path="/dashboard"
                  element={isAuthenticated ? <CandidateDashboard /> : <Navigate to="/auth" replace />}
                />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            {!hideNavbarOnRoutes.includes(location.pathname) && <Footer />}
          </div>
        </NotificationProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
