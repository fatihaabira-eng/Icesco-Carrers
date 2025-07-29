import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PersonalizedDashboard from "@/components/PersonalizedDashboard";

interface UserData {
  fullName: string;
  email: string;
  profilePhoto?: string;
  hasData?: boolean;
}

export default function JobRecommendations() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<"cv" | "questionnaire" | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [isCheckingUserData, setIsCheckingUserData] = useState(true); // Start with true to check auth status

  // Check for existing user session on component mount
  useEffect(() => {
     const handleStorageChange = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      checkUserData(parsedUser);
    } else {
      setIsCheckingUserData(false); // No user found, checking complete
    }
     if (!storedUser && user) {
        // User was logged out from another tab
        setUser(null);
      }}
      window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [user]);
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    setIsCheckingUserData(true);
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      checkUserData(parsedUser);
    } else {
      setUser(null);
      setIsCheckingUserData(false);
    }
  };
  // Check for existing user data
  const checkUserData = (userData: UserData) => {
    setIsCheckingUserData(true);
    // Simulate API call to check if user has existing data
    setTimeout(() => {
      // Replace this with actual API call
      const userHasData = true; // Change this based on actual data check
      const updatedUser = { ...userData, hasData: userHasData };
      setUser(updatedUser);
      setIsCheckingUserData(false);
    }, 500);
  };

  const handleGetStarted = () => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      navigate("/auth", { state: { from: "/job-recommendations" } });
      return;
    }
    setIsModalOpen(true);
  };


  const handleSelectAction = (action: "cv" | "questionnaire") => {
    setSelectedAction(action);
    setIsModalOpen(false);
    // In a real app, you would save the action and proceed to dashboard
  };

  const handleBackFromDashboard = () => {
    setSelectedAction(null);
  };

  // Loading state while checking user data
  if (isCheckingUserData) {
    return (
      <section className="section-padding bg-muted/50">
        <div className="max-w-7xl mx-auto container-padding text-center">
          <p>Loading your data...</p>
        </div>
      </section>
    );
  }

  // If user is logged in and has data, show dashboard immediately
  if (user?.hasData) {
    return (
      <PersonalizedDashboard
        user={{ name: user.fullName, email: user.email }}
        onBack={handleBackFromDashboard}
        openCV={selectedAction === "cv"}
        openQuestionnaire={selectedAction === "questionnaire"}
      />
    );
  }

  // Show the get started section only if:
  // - User is not logged in, or
  // - User is logged in but has no data
  return (
    <section className="section-padding bg-muted/50">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center space-y-6">
          <h2 className="font-title text-3xl md:text-4xl font-bold text-foreground">
            Get Tailored Job Recommendations
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover opportunities that match your skills, experience, and career aspirations.
            Let us help you find your perfect role at ICESCO.
          </p>

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleGetStarted} size="lg" className="btn-hero">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="font-title text-2xl">Choose Your Path</DialogTitle>
                <DialogDescription>
                  How would you like to get personalized job recommendations?
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <Card
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleSelectAction("cv")}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Upload className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Upload Your CV</CardTitle>
                        <p className="text-sm text-muted-foreground">Quick and accurate matching</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Upload your resume and we'll analyze your skills and experience to recommend the best opportunities.
                    </p>
                  </CardContent>
                </Card>

                <Card
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleSelectAction("questionnaire")}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-secondary-dark" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Answer Questions</CardTitle>
                        <p className="text-sm text-muted-foreground">Tell us about yourself</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Answer a few questions about your background, interests, and career goals for personalized suggestions.
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Takes about 5 minutes
                    </p>
                  </CardContent>
                </Card>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}