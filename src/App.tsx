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
import ManpowerDashboard from "./pages/ManPowerDashboard";
import ManpowerPortal from "./pages/ManpowerPortal";
import ManpowerAuth from "./pages/ManpowerAuth";
import RecruitmentRequestForm from "./pages/RecruitmentRequestForm";
import Record from "./pages/record";
import CreateJobOfferForm from "./components/CreateJobOfferForm";
import VacanciesListView from "./components/VacanciesListView";

// New HR-specific components
import HRPortalLayout from "./components/HRPortalLayout";
import BUPortalLayout from "./components/BUPortalLayout";
import HRDashboard from "./pages/HRDashboard";
import BUDashboard from "./pages/BUDashboard";
import BUOffers from "./pages/BUOffers";
import HRAnalytics from "./pages/HRAnalytics";
import HRCandidates from "./pages/HRCandidates";
import HRResumeLibrary from "./pages/HRResumeLibrary";
import HRInterviews from "./pages/HRInterviews";
import HRJobOffers from "./pages/HRJobOffers";
import HRDepartments from "./pages/HRDepartments";
import BUInterviews from "./pages/BUInterviews";
import BUCandidates from "./pages/BUCandidates";
import BUManPowerManagement from "./pages/BUManPowerManagement";

import HRCandidatesPipeline from "./pages/HRCandidatesPipeline";
import ScheduleInterview from "./pages/ScheduleInterview";
import InterviewManagement from "./pages/InterviewManagement";
import JobMatchingModule from "./components/JobMatchingModule";
import CandidateAssessmentScore from "./components/CandidateAssessmentScore";
import BUManpowerManagement from "./components/BUManpowerManagement";

// Committee-specific components
import CommitteePortalLayout from "./components/CommitteePortalLayout";
import CommitteeDashboard from "./pages/CommitteeDashboard";
import CommitteeInterviews from "./pages/CommitteeInterviews";
import CommitteeCandidates from "./pages/CommitteeCandidates";
import CareerProgram from "./components/CareerProgram";

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
    case 'recruitment':
      return <Navigate to="/manpower/hr" replace />;
    case 'committee':
      return <Navigate to="/manpower/committee" replace />;
    case 'business unit':
      return <Navigate to="/manpower/director/bu-manpower-management" replace />;
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
          <Route path="/offer/:id" element={<OfferDetailPage />} />
          <Route path="/details" element={<OfferDetailPage />} />
          <Route path="/apply" element={<MultiStepForm />} />
          <Route path="/steps" element={<MultiStepForm />} />
          <Route path="/process" element={<CandidateProcess />} />
          <Route path="/about" element={<About />} />
          <Route path="/record" element={<Record />} />
          <Route path="/programs" element={<CareerProgram />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/business-units/:businessUnit" element={<DepartmentPage />} />
          <Route path="/manpower-dashboard" element={<ManpowerDashboard />} />
          <Route path="/recruitment-request" element={<RecruitmentRequestForm />} />
          

          {/* Manpower Portal Routes */}
          <Route path="/manpower/auth" element={<ManpowerAuth />} />
          <Route path="/manpower" element={<ManpowerRoleRedirect />} />
          
          {/* HR Portal Routes with Sidebar Layout */}
          <Route 
            path="/manpower/hr" 
            element={
              <ProtectedManpowerRoute>
                <HRPortalLayout>
                  <BUManpowerManagement />
                </HRPortalLayout>
              </ProtectedManpowerRoute>
            } 
          />
          <Route 
            path="/manpower/hr/analytics" 
            element={
              <ProtectedManpowerRoute>
                <HRPortalLayout>
                  <HRAnalytics />
                </HRPortalLayout>
              </ProtectedManpowerRoute>
            } 
          />
          <Route 
            path="/manpower/hr/candidates" 
            element={
              <ProtectedManpowerRoute>
                <HRPortalLayout>
                  <HRCandidates />
                </HRPortalLayout>
              </ProtectedManpowerRoute>
            } 
          />
          <Route 
            path="/manpower/hr/resume-library" 
            element={
              <ProtectedManpowerRoute>
                <HRPortalLayout>
                  <HRResumeLibrary />
                </HRPortalLayout>
              </ProtectedManpowerRoute>
            } 
          />
          <Route 
            path="/manpower/hr/interviews" 
            element={
              <ProtectedManpowerRoute>
                <HRPortalLayout>
                  <HRInterviews />
                </HRPortalLayout>
              </ProtectedManpowerRoute>
            } 
          />
          <Route 
            path="/manpower/hr/job-offers" 
            element={
              <ProtectedManpowerRoute>
                <HRPortalLayout>
                  <HRJobOffers />
                </HRPortalLayout>
              </ProtectedManpowerRoute>
            } 
          />
          <Route 
            path="/manpower/hr/assessment-scores" 
            element={
              <ProtectedManpowerRoute>
                <HRPortalLayout>
                  <CandidateAssessmentScore />
                </HRPortalLayout>
              </ProtectedManpowerRoute>
            } 
          />
          <Route 
            path="/manpower/hr/dashboard" 
            element={
              <ProtectedManpowerRoute>
                <HRPortalLayout>
                  <HRDashboard />
                </HRPortalLayout>
              </ProtectedManpowerRoute>
            } 
          />

          
          {/* Additional HR Routes for Sub-items */}
          <Route 
            path="/manpower/hr/candidates/pipeline" 
            element={
              <ProtectedManpowerRoute>
                <HRPortalLayout>
                  <HRCandidatesPipeline />
                </HRPortalLayout>
              </ProtectedManpowerRoute>
            } 
          />
          <Route 
            path="/manpower/hr/interviews/schedule" 
            element={
              <ProtectedManpowerRoute>
                <HRPortalLayout>
                  <ScheduleInterview />
                </HRPortalLayout>
              </ProtectedManpowerRoute>
            } 
          />
          <Route 
            path="/manpower/hr/interviews/management" 
            element={
              <ProtectedManpowerRoute>
                <HRPortalLayout>
                  <InterviewManagement />
                </HRPortalLayout>
              </ProtectedManpowerRoute>
            } 
          />
          <Route 
            path="/manpower/hr/candidates/matching" 
            element={
              <ProtectedManpowerRoute>
                <HRPortalLayout>
                  <JobMatchingModule />
                </HRPortalLayout>
              </ProtectedManpowerRoute>
            } 
          />
          
          {/* Legacy Manpower Portal Routes (for other roles) */}
          <Route path="/manpower/create-offer" element={<VacanciesListView />} />
         
          <Route 
            path="/manpower/committee" 
            element={
              <ProtectedManpowerRoute>
                <CommitteePortalLayout />
              </ProtectedManpowerRoute>
            } 
          >
            <Route index element={<BUManpowerManagement />} />
            <Route path="interviews" element={<CommitteeInterviews />} />
            <Route path="candidates" element={<CommitteeCandidates />} />
            <Route path="*" element={<div style={{ padding: '20px', backgroundColor: 'lightblue', border: '2px solid blue' }}>
              <h2>Committee Fallback Route Hit</h2>
              <p>This means the route is working but no specific route matched.</p>
            </div>} />
          </Route>
          <Route 
            path="/manpower/bu" 
            element={
              <ProtectedManpowerRoute>
                <BUPortalLayout>
                  <BUDashboard />
                </BUPortalLayout>
              </ProtectedManpowerRoute>
            } 
          />
            <Route 
            path="/manpower/director/interviews" 
            element={
              <ProtectedManpowerRoute>
                <BUPortalLayout>
                  <BUInterviews/>
                </BUPortalLayout>
              </ProtectedManpowerRoute>
            } 
          />
          <Route 
            path="/manpower/director/candidates" 
            element={
              <ProtectedManpowerRoute>
                <BUPortalLayout>
                  <BUCandidates/>
                </BUPortalLayout>
              </ProtectedManpowerRoute>
            } 
          />
          
            <Route 
            path="/manpower/director/offers" 
            element={
              <ProtectedManpowerRoute>
                <BUPortalLayout>
                  <BUOffers/>
                </BUPortalLayout>
              </ProtectedManpowerRoute>
            } 
          />

          <Route 
            path="/manpower/director/bu-manpower-management" 
            element={
              <ProtectedManpowerRoute>
                <BUPortalLayout>
                  <BUManPowerManagement/>
                </BUPortalLayout>
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
