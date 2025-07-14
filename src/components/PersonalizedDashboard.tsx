import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import JobCard from "@/components/JobCard";
import { Upload, FileText, CheckCircle, User, Briefcase, MapPin, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PersonalizedDashboardProps {
  user: { name: string; email: string };
  onBack: () => void;
  openCV?: boolean;
  openQuestionnaire?: boolean;
}


// Mock personalized job recommendations
const personalizedJobs = [
  {
    title: "Senior Software Engineer",
    department: "Digital Transformation",
    location: "Rabat, Morocco",
    type: "Full-time",
    experience: "5+ years",
    urgent: true,
    description: "Perfect match for your React and TypeScript expertise. Lead development of educational platforms.",
    skills: ["React", "TypeScript", "Node.js", "AWS", "Docker"],
    matchScore: 95
  },
  {
    title: "DevOps Engineer",
    department: "Digital Transformation", 
    location: "Remote",
    type: "Full-time",
    experience: "3-5 years",
    description: "Your cloud infrastructure experience makes you ideal for this role in educational technology.",
    skills: ["AWS", "Kubernetes", "Docker", "CI/CD", "Monitoring"],
    matchScore: 88
  },
  {
    title: "Technical Lead",
    department: "Digital Transformation",
    location: "Rabat, Morocco",
    type: "Full-time", 
    experience: "5+ years",
    description: "Leadership opportunity combining your technical skills with team management experience.",
    skills: ["Leadership", "Full-stack", "Architecture", "Mentoring"],
    matchScore: 82
  }
];

export default function PersonalizedDashboard({ user, onBack, openCV, openQuestionnaire }: PersonalizedDashboardProps) {
  const [showCVUpload, setShowCVUpload] = useState(false);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [questionnaireComplete, setQuestionnaireComplete] = useState(false);
  const { toast } = useToast();
  
  const handleCVUpload = () => {
    // Simulate file upload
    setTimeout(() => {
      setUploadComplete(true);
      setShowCVUpload(false);
      toast({
        title: "CV Uploaded Successfully",
        description: "We've analyzed your CV and updated your recommendations!",
      });
    }, 2000);
  };
  useEffect(() => {
  if (openCV) setShowCVUpload(true);
  if (openQuestionnaire) setShowQuestionnaire(true);
    }, []);
  const handleQuestionnaireSubmit = () => {
    // Simulate questionnaire processing
    setTimeout(() => {
      setQuestionnaireComplete(true);
      setShowQuestionnaire(false);
      toast({
        title: "Profile Updated",
        description: "Your answers have been saved and recommendations updated!",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-7xl mx-auto container-padding py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-title text-3xl md:text-4xl font-bold text-foreground">
                Hi {user.name.split(' ')[0]},
              </h1>
              <p className="text-xl text-muted-foreground mt-2">
                Your personalized site and job recommendations are ready.
              </p>
            </div>
            <Button variant="outline" onClick={onBack}>
              Back to Home
            </Button>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setShowCVUpload(true)}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    {uploadComplete ? <CheckCircle className="w-6 h-6 text-green-500" /> : <Upload className="w-6 h-6 text-primary" />}
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      {uploadComplete ? "CV Uploaded" : "Upload Your CV"}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {uploadComplete ? "Analysis complete" : "Get accurate matching"}
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setShowQuestionnaire(true)}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                    {questionnaireComplete ? <CheckCircle className="w-6 h-6 text-green-500" /> : <FileText className="w-6 h-6 text-secondary-dark" />}
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      {questionnaireComplete ? "Profile Complete" : "Complete Profile"}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {questionnaireComplete ? "All set!" : "Tell us about yourself"}
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Profile Recommendations */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="font-title text-2xl md:text-3xl font-bold text-foreground">
              Profile Recommendations
            </h2>
            <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              {personalizedJobs.length} matches
            </div>
          </div>

          <div className="grid gap-6">
            {personalizedJobs.map((job, index) => (
              <div key={index} className="relative">
                <JobCard {...job} />
                <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                  {job.matchScore}% match
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CV Upload Modal */}
        <Dialog open={showCVUpload} onOpenChange={setShowCVUpload}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-title text-2xl">Upload Your CV</DialogTitle>
              <DialogDescription>
                Upload your resume to get the most accurate job recommendations.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-6">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground mb-4">
                  Drag and drop your CV here, or click to browse
                </p>
                <Button onClick={handleCVUpload} className="btn-hero">
                  Select File
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Questionnaire Modal */}
        <Dialog open={showQuestionnaire} onOpenChange={setShowQuestionnaire}>
          <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-title text-2xl">Complete Your Profile</DialogTitle>
              <DialogDescription>
                Help us understand your background and preferences.
              </DialogDescription>
            </DialogHeader>
            
            <form className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-2">0-2 years</SelectItem>
                    <SelectItem value="2-5">2-5 years</SelectItem>
                    <SelectItem value="5+">5+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="interests">Areas of Interest</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech">Digital Transformation</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="science">Science & Technology</SelectItem>
                    <SelectItem value="culture">Culture & Heritage</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Key Skills</Label>
                <Textarea
                  id="skills"
                  placeholder="List your key skills and technologies..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="goals">Career Goals</Label>
                <Textarea
                  id="goals"
                  placeholder="Tell us about your career aspirations..."
                  rows={3}
                />
              </div>

              <Button type="button" onClick={handleQuestionnaireSubmit} className="w-full btn-hero">
                Save Profile
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}