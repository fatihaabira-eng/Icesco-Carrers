import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import JobRecommendations from "@/components/JobRecommendations";
import StatusUpdateDemo from "@/components/StatusUpdateDemo";
import heroImage from "@/assets/icesco-hero-main.jpg";
import JobCard from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Users, 
  Globe, 
  Heart, 
  Target, 
  Award,
  MapPin,
  Play,
  ArrowRight,
  CheckCircle,
  Briefcase,
  GraduationCap,
  TrendingUp
} from "lucide-react";

// Mock data for featured jobs
const featuredJobs = [
  {
    title: "Senior Software Engineer",
    department: "Digital Transformation",
    location: "Rabat, Morocco",
    type: "Full-time",
    experience: "5+ years",
    urgent: true,
    description: "Lead development of educational technology platforms that impact millions of students across the Islamic world.",
    skills: ["React", "Node.js", "TypeScript", "MongoDB", "AWS", "Docker"]
  },
  {
    title: "Education Program Manager",
    department: "Education",
    location: "Remote",
    type: "Full-time", 
    experience: "3-5 years",
    description: "Design and implement innovative educational programs to enhance learning outcomes in member states.",
    skills: ["Program Management", "Educational Design", "Stakeholder Management", "Arabic", "French"]
  },
  {
    title: "Data Analyst",
    department: "Science & Technology",
    location: "Rabat, Morocco",
    type: "Contract",
    experience: "2-4 years",
    description: "Analyze educational and scientific data to inform policy decisions and program improvements.",
    skills: ["Python", "SQL", "Tableau", "Statistics", "Research", "Data Visualization"]
  }
];

// Mock testimonial data
const testimonials = [
  {
    name: "Dr. Salim M. AlMalik",
    role: "Director‑General of ICESCO",
    country: "Morocco",
    quote: "At ICESCO, we do not just prepare for the future — we shape it. We empower youth, champion innovation, and build bridges between cultures.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b765?w=200&h=200&fit=crop&crop=face"
  },
  {
    name: "Hassan Benali",
    role: "Digital Innovation Lead",
    country: "Morocco",
    quote: "The diversity and collaborative spirit at ICESCO is incredible. I work with colleagues from 30+ countries, each bringing unique perspectives to our mission.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
  }
];

const benefits = [
  {
    icon: Globe,
    title: "Global Impact",
    description: "Work on projects that affect 1.8 billion people across 57 member states"
  },
  {
    icon: Users,
    title: "Diverse Teams",
    description: "Collaborate with colleagues from 30+ nationalities and cultures"
  },
  {
    icon: Heart,
    title: "Work-Life Balance",
    description: "Flexible schedules, remote options, and comprehensive wellness programs"
  },
  {
    icon: GraduationCap,
    title: "Learning & Development",
    description: "Language training, leadership programs, and continuous skill development"
  },
  {
    icon: Target,
    title: "Mission-Driven",
    description: "Meaningful work advancing education, science, and culture"
  },
  {
    icon: Award,
    title: "Competitive Benefits",
    description: "International salary packages, health coverage, and career progression"
  }
];

const careerPaths = [
  {
    title: "Graduate & Internship Programs",
    description: "Kickstart your career with structured programs designed for recent graduates and students.",
    icon: GraduationCap,
    duration: "6-12 months",
    openings: "15 positions"
  },
  {
    title: "Professional Development",
    description: "Advance your expertise with leadership training, cross-cultural assignments, and skill development.",
    icon: TrendingUp,
    duration: "Ongoing",
    openings: "Multiple tracks"
  },
  {
    title: "Leadership Tracks",
    description: "Shape the future of ICESCO through strategic leadership roles and executive development programs.",
    icon: Briefcase,
    duration: "2-3 years",
    openings: "Senior level"
  }
];

export default function Home() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchKeyword) params.set("keyword", searchKeyword);
    if (selectedDepartment) params.set("department", selectedDepartment);
    navigate(`/opportunities?${params.toString()}`);
  };

  const handleExploreOpportunities = () => {
    navigate("/opportunities");
  };

  const handleJoinMission = () => {
    navigate("/about");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title="Shape the Future with ICESCO"
        subtitle="Empowering innovation and excellence in education, science, and culture across the Islamic world."
        primaryButtonText="Explore Opportunities"
        secondaryButtonText="Life in ICESCO"
        onPrimaryClick={handleExploreOpportunities}
        onSecondaryClick={handleJoinMission}
        background={{
          type: "video",
          src: "https://videos.pexels.com/video-files/3246359/3246359-uhd_2560_1440_25fps.mp4"
        }}
        showVideo={true}
        showSearch={true}
      />

      {/* Job Recommendations */}
      {/* <JobRecommendations /> */}

      {/* EVP + Testimonials */}
      <section className="section-padding bg-background">
  <div className="max-w-7xl mx-auto container-padding">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
      {/* Testimonial Video/Image */}
      <div className="flex flex-col justify-center">
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl group">
  <iframe
    className="absolute inset-0 w-full h-full"
    src="https://www.youtube.com/embed/gqCKxEaPgOM?autoplay=1&mute=1&loop=1&playlist=gqCKxEaPgOM"
    title="اليوم الأول من ملتقى شباب المعرفة للعالم الإسلامي بالإيسيسكو"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
  ></iframe>

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

          {/* Optional Overlay Button – only visible if you want to trigger something */}
          <Button
            size="sm"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 hidden group-hover:flex"
          >
            <Play className="w-4 h-4 mr-2" />
            Play Story
          </Button>

          {/* Text overlay */}
          {/* <div className="absolute bottom-4 left-4 text-white">
            <p className="font-semibold">{testimonials[0].name}</p>
            <p className="text-sm opacity-90">{testimonials[0].role}</p>
          </div> */}
        </div>
      </div>

      {/* EVP Text */}
      <div className="flex flex-col justify-center space-y-6">
        <div className="space-y-4">
          <h2 className="font-title text-3xl md:text-4xl font-bold text-foreground">
            Why joining ICESCO Family?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            At ICESCO, we empower individuals to make a global impact while fostering personal and professional growth. Join a diverse, mission-driven organization where your work contributes to advancing education, science, and culture across the Islamic world.
          </p>
        </div>
        
        <blockquote className="border-l-4 border-primary pl-6 italic text-muted-foreground">
          "At ICESCO, we do not just prepare for the future — we shape it. We empower youth, champion innovation, and build bridges between cultures."
          <footer className="mt-2 text-sm font-title font-bold text-foreground">
            — Dr. Salim M. AlMalik, Director‑General of ICESCO
          </footer>
        </blockquote>

        {/* <div className="grid grid-cols-1 gap-4 pt-4">
          <div className="text-center p-4 bg-primary/5 rounded-lg">
            <p className="text-2xl font-bold text-primary">53</p>
            <p className="text-sm text-muted-foreground">Member States</p>
          </div>
        </div> */}
      </div>
    </div>
  </div>
</section>

      {/* Featured Opportunities */}
      <section className="section-padding bg-muted/30">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center space-y-6 mb-12">
            <h2 className="font-title text-3xl md:text-4xl font-bold text-foreground">
              Featured Opportunities
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover our most sought-after positions and join teams making a global impact.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto bg-background rounded-xl shadow-lg p-6 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search by keyword, role, or skill..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="w-full"
                  />
                </div>
                {/* <div className="sm:w-48">
                  <Select value={searchCategory} onValueChange={setSearchCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="digital">Digital Transformation</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="science">Science & Technology</SelectItem>
                      <SelectItem value="culture">Culture & Heritage</SelectItem>
                      <SelectItem value="hr">Human Resources</SelectItem>
                    </SelectContent>
                  </Select>
                </div> */}
                <Button onClick={handleSearch} className="sm:w-auto">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* Job Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredJobs.map((job, index) => (
              <JobCard key={index} {...job} />
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" onClick={handleExploreOpportunities}>
              View All Opportunities
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Work at ICESCO */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center space-y-6 mb-16">
            <h2 className="font-title text-3xl md:text-4xl font-bold text-foreground">
              Why Work at ICESCO?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join a global community of professionals dedicated to advancing education, science, and culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center card-hover">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Career Paths & Programs */}
      <section className="section-padding bg-muted/30">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center space-y-6 mb-16">
            <h2 className="font-title text-3xl md:text-4xl font-bold text-foreground">
              Career Paths & Programs
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Whether you're starting your career or advancing to leadership, we have programs designed for your growth.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {careerPaths.map((path, index) => (
              <Card key={index} className="card-hover">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <path.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <Badge variant="outline" className="text-xs">
                        {path.openings}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{path.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{path.description}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Duration: {path.duration}</span>
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="section-padding bg-[#0b787f]">
        <div className="max-w-4xl mx-auto container-padding text-center">
          <div className="space-y-6">
            <h2 className="font-title text-3xl md:text-4xl font-bold text-white">
              Stay Connected
            </h2>
            <p className="font-sans text-xl text-white/90">
              Join our talent community and be the first to know about new opportunities, events, and insights from ICESCO.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
              />
              <Button variant="secondary" className="sm:w-auto">
                Subscribe
              </Button>
            </div>
            
            <p className="text-sm text-white/70">
              By subscribing, you agree to receive career updates and opportunities from ICESCO.
            </p>
          </div>
        </div>
      </section>

      {/* Demo Component for Testing */}
      {/* <StatusUpdateDemo /> */}
    </div>
  );
}