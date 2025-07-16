import { useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Opportunities from "./pages/Opportunities";
import DepartmentPage from "./pages/DepartmentPage";
import NotFound from "./pages/NotFound";
import OfferDetailPage from "./pages/OfferDetailPage";
import CandidateDashboard from "./pages/CandidateProfile";
import AuthenticationPage from "./pages/auth";

const queryClient = new QueryClient();

const App = () => {
  const location = useLocation();
  const hideNavbarOnRoutes = ["/auth"]; // Add more paths here if needed

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="flex flex-col min-h-screen">
          {/* Only show Navbar if not in auth route */}
          {!hideNavbarOnRoutes.includes(location.pathname) && <Navbar />}

          <main className="flex-1">
            <Routes>
              <Route path="/details" element={<OfferDetailPage />} />
              <Route path="/auth" element={<AuthenticationPage />} />
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<CandidateDashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/opportunities" element={<Opportunities />} />
              <Route path="/departments/:department" element={<DepartmentPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Optional: Hide footer on auth route too */}
          {!hideNavbarOnRoutes.includes(location.pathname) && <Footer />}
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
