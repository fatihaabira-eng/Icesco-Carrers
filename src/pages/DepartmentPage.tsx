import { useParams } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import JobCard from "@/components/JobCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Monitor, 
  Users, 
  BookOpen, 
  Microscope, 
  Palette, 
  MessageSquare,
  ArrowRight,
  Target,
  Award,
  TrendingUp
} from "lucide-react";

// Department configurations
const departmentConfig = {
  "digital-transformation": {
    background: {
      type: "video", // or "image"
      src: "https://videos.pexels.com/video-files/3141208/3141208-uhd_2560_1440_25fps.mp4"
    },
    name: "Digital Transformation",
    icon: Monitor,
    description: "Leading ICESCO's digital evolution with cutting-edge technology solutions that enhance education, science, and cultural programs across the Islamic world.",
    color: "primary",
    stats: [
      { label: "Digital Platforms", value: "15+", icon: Monitor },
      { label: "Users Reached", value: "2M+", icon: Users },
      { label: "Countries Served", value: "57", icon: Target }
    ],
    mission: "To harness the power of technology in transforming educational and cultural experiences, making ICESCO's programs more accessible, efficient, and impactful.",
    keyFocus: [
      "Educational Technology Platforms",
      "Data Analytics & AI",
      "Cloud Infrastructure",
      "Digital Learning Solutions",
      "Cybersecurity & Privacy",
      "Mobile Applications"
    ],
    jobs: [
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
        title: "DevOps Engineer",
        department: "Digital Transformation",
        location: "Remote",
        type: "Full-time",
        experience: "3-5 years",
        urgent: true,
        description: "Build and maintain scalable infrastructure for educational technology platforms serving global audiences.",
        skills: ["AWS", "Kubernetes", "Docker", "CI/CD", "Monitoring", "Security"]
      },
      {
        title: "UX/UI Designer",
        department: "Digital Transformation",
        location: "Rabat, Morocco",
        type: "Full-time",
        experience: "3-5 years",
        description: "Design intuitive user experiences for educational platforms used by millions of learners worldwide.",
        skills: ["Figma", "User Research", "Prototyping", "Design Systems", "Accessibility", "Mobile Design"]
      }
    ]
  },
  "hr": {
    background: {
      type: "video", // or "image"
      src: "/media/digital-transformation-hero.jpg"
    },
    name: "Human Resources",
    icon: Users,
    description: "Building a diverse, inclusive, and high-performing global workforce that drives ICESCO's mission forward.",
    color: "secondary",
    stats: [
      { label: "Employees", value: "500+", icon: Users },
      { label: "Nationalities", value: "30+", icon: Target },
      { label: "Languages", value: "15+", icon: MessageSquare }
    ],
    mission: "To attract, develop, and retain world-class talent while fostering an inclusive culture that celebrates diversity and promotes excellence.",
    keyFocus: [
      "Talent Acquisition & Management",
      "Employee Development",
      "Diversity & Inclusion",
      "Performance Management",
      "Cross-cultural Teams",
      "Compensation & Benefits"
    ],
    jobs: [
      {
        title: "HR Business Partner",
        department: "Human Resources",
        location: "Rabat, Morocco",
        type: "Full-time",
        experience: "5+ years",
        description: "Support organizational development and employee engagement across diverse, multicultural teams.",
        skills: ["HR Strategy", "Employee Relations", "Talent Management", "Cross-cultural", "Leadership"]
      }
    ]
  },
  "education": {
    background: {
      type: "video", // or "image"
      src: "/media/digital-transformation-hero.jpg"
    },
    name: "Education",
    icon: BookOpen,
    description: "Advancing educational excellence and innovation across the Islamic world through comprehensive programs and initiatives.",
    color: "primary",
    stats: [
      { label: "Programs", value: "25+", icon: BookOpen },
      { label: "Students Impacted", value: "1M+", icon: Users },
      { label: "Partner Institutions", value: "200+", icon: Award }
    ],
    mission: "To enhance educational quality, accessibility, and outcomes across member states through innovative programs and capacity building.",
    keyFocus: [
      "Curriculum Development",
      "Teacher Training",
      "Educational Technology",
      "Quality Assurance",
      "Research & Development",
      "International Cooperation"
    ],
    jobs: [
      {
        title: "Education Program Manager",
        department: "Education",
        location: "Remote",
        type: "Full-time",
        experience: "3-5 years",
        description: "Design and implement innovative educational programs to enhance learning outcomes in member states.",
        skills: ["Program Management", "Educational Design", "Stakeholder Management", "Arabic", "French"]
      }
    ]
  },
  "science": {
    background: {
      type: "video", // or "image"
      src: "/media/digital-transformation-hero.jpg"
    },
    name: "Science & Technology",
    icon: Microscope,
    description: "Promoting scientific research, innovation, and technological advancement across the Islamic world.",
    color: "accent",
    stats: [
      { label: "Research Projects", value: "50+", icon: Microscope },
      { label: "Scientific Papers", value: "100+", icon: BookOpen },
      { label: "Innovation Labs", value: "10+", icon: TrendingUp }
    ],
    mission: "To foster scientific excellence and technological innovation that addresses global challenges and advances human knowledge.",
    keyFocus: [
      "Scientific Research",
      "Innovation & Technology Transfer",
      "STEM Education",
      "Research Capacity Building",
      "Scientific Cooperation",
      "Emerging Technologies"
    ],
    jobs: [
      {
        title: "Data Analyst",
        department: "Science & Technology",
        location: "Rabat, Morocco",
        type: "Contract",
        experience: "2-4 years",
        description: "Analyze educational and scientific data to inform policy decisions and program improvements.",
        skills: ["Python", "SQL", "Tableau", "Statistics", "Research", "Data Visualization"]
      },
      {
        title: "Research Scientist",
        department: "Science & Technology",
        location: "Tunis, Tunisia",
        type: "Full-time",
        experience: "PhD + 2 years",
        description: "Conduct cutting-edge research in emerging technologies to advance scientific knowledge in member states.",
        skills: ["Research", "AI/ML", "Publications", "Grant Writing", "Collaboration", "Innovation"]
      }
    ]
  },
  "culture": {
    background: {
      type: "video", // or "image"
      src: "/media/digital-transformation-hero.jpg"
    },
    name: "Culture & Heritage",
    icon: Palette,
    description: "Preserving, promoting, and celebrating the rich cultural heritage of the Islamic world.",
    color: "secondary",
    stats: [
      { label: "Heritage Sites", value: "100+", icon: Palette },
      { label: "Cultural Programs", value: "30+", icon: Award },
      { label: "Artifacts Preserved", value: "10K+", icon: Target }
    ],
    mission: "To safeguard cultural heritage and promote intercultural dialogue while fostering creativity and cultural expression.",
    keyFocus: [
      "Cultural Heritage Preservation",
      "Arts & Creative Industries",
      "Intercultural Dialogue",
      "Digital Cultural Archives",
      "Cultural Education",
      "Traditional Arts Promotion"
    ],
    jobs: [
      {
        title: "Cultural Heritage Specialist",
        department: "Culture & Heritage",
        location: "Cairo, Egypt",
        type: "Full-time",
        experience: "4-6 years",
        description: "Preserve and promote Islamic cultural heritage through innovative digital preservation techniques.",
        skills: ["Cultural Studies", "Digital Preservation", "Project Management", "Arabic", "Documentation"]
      }
    ]
  },
  "communications": {
    background: {
      type: "video", // or "image"
      src: "/media/digital-transformation-hero.jpg"
    },
    name: "Communications",
    icon: MessageSquare,
    description: "Amplifying ICESCO's voice and impact through strategic communication and public engagement.",
    color: "primary",
    stats: [
      { label: "Media Reach", value: "50M+", icon: MessageSquare },
      { label: "Social Followers", value: "1M+", icon: Users },
      { label: "Languages", value: "10+", icon: Target }
    ],
    mission: "To effectively communicate ICESCO's mission, achievements, and impact to global audiences through innovative communication strategies.",
    keyFocus: [
      "Strategic Communications",
      "Digital Marketing",
      "Public Relations",
      "Content Creation",
      "Brand Management",
      "Stakeholder Engagement"
    ],
    jobs: [
      {
        title: "Communications Coordinator",
        department: "Communications",
        location: "Remote",
        type: "Part-time",
        experience: "2-3 years",
        description: "Develop and execute communication strategies to promote ICESCO's mission and programs globally.",
        skills: ["Content Creation", "Social Media", "Public Relations", "Multilingual", "Design"]
      }
    ]
  }
};

export default function DepartmentPage() {
  const { department } = useParams<{ department: string }>();
  const config = department ? departmentConfig[department as keyof typeof departmentConfig] : null;

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Department Not Found</h1>
          <p className="text-muted-foreground">The department you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const IconComponent = config.icon;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title={config.name}
        subtitle={config.description}
        primaryButtonText={`Explore ${config.name} Roles`}
        secondaryButtonText="Learn More"
        background={config.background}
      />

      {/* Department Overview */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 bg-${config.color}/10 rounded-xl flex items-center justify-center`}>
                  <IconComponent className={`w-8 h-8 text-${config.color}`} />
                </div>
                <h2 className="font-title text-3xl md:text-4xl font-bold text-foreground">
                  Our Mission
                </h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {config.mission}
              </p>
              <div className="space-y-3">
                <h3 className="font-semibold text-xl text-foreground">Key Focus Areas:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {config.keyFocus.map((focus, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className={`w-2 h-2 bg-${config.color} rounded-full`}></div>
                      <span className="text-muted-foreground text-sm">{focus}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {config.stats.map((stat, index) => (
                <Card key={index} className="text-center">
                  <CardHeader className="pb-2">
                    <div className={`w-12 h-12 bg-${config.color}/10 rounded-full flex items-center justify-center mx-auto`}>
                      <stat.icon className={`w-6 h-6 text-${config.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-3xl font-bold text-${config.color}`}>{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EVP Section - Reused from homepage */}
      <section className="section-padding bg-muted/30">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-title text-3xl md:text-4xl font-bold text-foreground">
                Why Join {config.name}?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Badge className={`bg-${config.color}/10 text-${config.color}`}>Global Impact</Badge>
                  <p className="text-muted-foreground">
                    Your work directly contributes to advancing {config.name.toLowerCase()} across 57 member states, affecting millions of lives.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className="bg-secondary/20 text-secondary-dark">Innovation</Badge>
                  <p className="text-muted-foreground">
                    Work with cutting-edge tools and methodologies in a forward-thinking environment.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className="bg-accent/10 text-accent">Collaboration</Badge>
                  <p className="text-muted-foreground">
                    Join a diverse team of experts from around the world, sharing knowledge and best practices.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className={`bg-${config.color}/10 text-${config.color}`}>Growth</Badge>
                  <p className="text-muted-foreground">
                    Access comprehensive professional development opportunities and career advancement paths.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-secondary/20 rounded-2xl p-8">
              <h3 className="font-title text-2xl font-bold text-foreground mb-6">
                Department Benefits
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className={`w-2 h-2 bg-${config.color} rounded-full`}></div>
                  <span className="text-muted-foreground">Specialized training and certification programs</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className={`w-2 h-2 bg-${config.color} rounded-full`}></div>
                  <span className="text-muted-foreground">Access to international conferences and workshops</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className={`w-2 h-2 bg-${config.color} rounded-full`}></div>
                  <span className="text-muted-foreground">Collaborative projects with leading institutions</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className={`w-2 h-2 bg-${config.color} rounded-full`}></div>
                  <span className="text-muted-foreground">Mentorship from industry experts</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className={`w-2 h-2 bg-${config.color} rounded-full`}></div>
                  <span className="text-muted-foreground">Flexible work arrangements and remote options</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center space-y-6 mb-12">
            <h2 className="font-title text-3xl md:text-4xl font-bold text-foreground">
              Current Openings in {config.name}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join our team and make a meaningful impact in {config.name.toLowerCase()}.
            </p>
          </div>

          {config.jobs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {config.jobs.map((job, index) => (
                  <JobCard key={index} {...job} />
                ))}
              </div>
              
              <div className="text-center">
                <Button variant="outline" size="lg">
                  View All {config.name} Opportunities
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <div className={`w-16 h-16 bg-${config.color}/10 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <IconComponent className={`w-8 h-8 text-${config.color}`} />
                </div>
                <h3 className="text-lg font-semibold mb-2">No Current Openings</h3>
                <p className="text-muted-foreground mb-4">
                  We don't have any open positions in {config.name} right now, but new opportunities are added regularly.
                </p>
                <Button variant="outline">
                  Join Our Talent Pool
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Why Work at ICESCO - Reused section */}
      <section className="section-padding bg-muted/30">
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
            {[
              {
                icon: Target,
                title: "Global Impact",
                description: "Work on projects that affect 1.8 billion people across 57 member states"
              },
              {
                icon: Users,
                title: "Diverse Teams",
                description: "Collaborate with colleagues from 30+ nationalities and cultures"
              },
              {
                icon: Award,
                title: "Mission-Driven",
                description: "Meaningful work advancing education, science, and culture"
              }
            ].map((benefit, index) => (
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
    </div>
  );
}