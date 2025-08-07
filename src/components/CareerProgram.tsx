import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Lightbulb, Users } from "lucide-react";
import HeroSection from "./HeroSection";

const programs = [
  {
    id: "science",
    title: "ICESCO Positions",
    description:
      "Fostering your career innovation to address global challenges and opportunities.",
    icon: Lightbulb,
    color: "bg-green-500",
  },
  {
    id: "youth",
    title: "Youth Programs",
    description:
      "Empowering young leaders through peacebuilding and professional development opportunities: Youth Peace Ambassador Program (YPA) / Youth Professionals Program (YPP).",
    icon: GraduationCap,
    color: "bg-blue-500",
  },
  {
    id: "internship",
    title: "Internship Program",
    description:
      "Preserving, promoting, and celebrating the rich cultural heritage and diversity of the Islamic civilization through hands-on internships.",
    icon: Users,
    color: "bg-purple-500",
  },
];

export default function ProgramSelection() {
  const navigate = useNavigate();

  const handleProgramSelect = (programId: string) => {
    console.log(`Navigating to /opportunities?program=${programId}`); //
    navigate(`/opportunities?program=${programId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        title="Start your journey at ICESCO"
        subtitle=""
        background={{
          type: "video",
          src: "https://videos.pexels.com/video-files/3141208/3141208-uhd_2560_1440_25fps.mp4",
        }}
        showVideo={true}
      />
      {/* Program Cards Section */}
      <section className="bg-muted/30">
        <div className="container mx-auto px-4 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => {
              const Icon = program.icon;
              return (
                <Card key={index} className="card-hover">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <CardTitle className="text-xl">{program.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{program.description}</p>
                    <div className="flex justify-between items-center text-sm">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleProgramSelect(program.id)}
                      >
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}