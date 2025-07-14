import { useState } from "react";
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
import LoginModal from "@/components/LoginModal";
import PersonalizedDashboard from "@/components/PersonalizedDashboard";

export default function JobRecommendations() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [selectedAction, setSelectedAction] = useState<"cv" | "questionnaire" | null>(null);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  // Track if dashboard should be shown
  const [showDashboard, setShowDashboard] = useState(false);

  const handleGetStarted = () => {
    setIsModalOpen(true);
  };

  const handleSelectAction = (action: "cv" | "questionnaire") => {
    setSelectedAction(action);
    setIsModalOpen(false);

    if (!user) {
      setShowLogin(true);
    } else {
      setShowDashboard(true); // Already logged in
    }
  };

  const handleLoginSuccess = (userData: { name: string; email: string }) => {
    setUser(userData);
    setShowLogin(false);
    setShowDashboard(true);
  };

  const handleBackFromDashboard = () => {
    setShowDashboard(false);
    setSelectedAction(null);
    setUser(null);
  };

  if (showDashboard && user) {
    return (
      <PersonalizedDashboard
        user={user}
        onBack={handleBackFromDashboard}
        openCV={selectedAction === "cv"}
        openQuestionnaire={selectedAction === "questionnaire"}
      />
    );
  }

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
                    <p className="text-xs text-primary mt-2 font-medium">
                      *Requires login with Google or LinkedIn
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

          <LoginModal
            isOpen={showLogin}
            onClose={() => setShowLogin(false)}
            onSuccess={handleLoginSuccess}
          />
        </div>
      </div>
    </section>
  );
}
