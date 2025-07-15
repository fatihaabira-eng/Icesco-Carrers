import HeroSection from "@/components/HeroSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Globe, 
  Users, 
  BookOpen, 
  Lightbulb,
  Target,
  Award,
  Heart,
  TrendingUp
} from "lucide-react";
import icesco_background from "@/assets/about-icesco.jpg";

const stats = [
  { label: "Member States", value: "57", icon: Globe },
  { label: "Languages Spoken", value: "15+", icon: Users },
  { label: "Countries Represented", value: "30+", icon: Globe },
  { label: "Years of Impact", value: "25+", icon: Award }
];

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "Every role contributes to advancing education, science, and culture across the Islamic world."
  },
  {
    icon: Users,
    title: "Inclusive Diversity",
    description: "Celebrating different perspectives, cultures, and backgrounds in everything we do."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Pioneering new approaches to solve complex challenges in education and development."
  },
  {
    icon: Heart,
    title: "Collaboration",
    description: "Working together across borders and disciplines to achieve common goals."
  },
  {
    icon: TrendingUp,
    title: "Excellence",
    description: "Striving for the highest standards in all our programs and initiatives."
  },
  {
    icon: BookOpen,
    title: "Learning",
    description: "Commitment to continuous learning and professional development for all team members."
  }
];

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title="About ICESCO"
        subtitle="The Islamic World Educational, Scientific and Cultural Organization - where purpose meets career."
        primaryButtonText="Join Our Mission"
        secondaryButtonText="Our Impact"
        background={{
          type: "image",
          src: icesco_background
        }}
      />

      {/* Mission & Vision */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-title text-3xl md:text-4xl font-bold text-foreground">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                ICESCO works to strengthen cooperation among Member States in the fields of education, 
                science, technology, and culture. We promote dialogue between civilizations and contribute 
                to achieving peace and security in the world.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                As a career destination, ICESCO offers unique opportunities to work on projects that 
                create lasting impact across 57 member states, reaching over 1.8 billion people worldwide.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center">
                  <CardHeader className="pb-2">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding bg-muted/30">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center space-y-6 mb-16">
            <h2 className="font-title text-3xl md:text-4xl font-bold text-foreground">
              Our Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These core values guide everything we do and shape the culture of our organization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="card-hover">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Working at ICESCO */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-title text-3xl md:text-4xl font-bold text-foreground">
                Working at ICESCO
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Badge className="bg-primary/10 text-primary">Global Reach</Badge>
                  <p className="text-muted-foreground">
                    Work on projects that span continents and impact millions of lives across the Islamic world.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className="bg-secondary/20 text-secondary-dark">Cultural Diversity</Badge>
                  <p className="text-muted-foreground">
                    Collaborate with colleagues from over 30 countries, each bringing unique perspectives and expertise.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className="bg-accent/10 text-accent">Career Growth</Badge>
                  <p className="text-muted-foreground">
                    Access comprehensive professional development, language training, and leadership programs.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className="bg-primary/10 text-primary">Work-Life Balance</Badge>
                  <p className="text-muted-foreground">
                    Enjoy flexible working arrangements, comprehensive benefits, and a supportive work environment.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-secondary/20 rounded-2xl p-8">
              <h3 className="font-title text-2xl font-bold text-foreground mb-6">
                Employee Benefits
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Competitive international salary packages</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Comprehensive health and wellness coverage</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Professional development and training opportunities</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Flexible work arrangements and remote options</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Language learning and cultural exchange programs</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">International assignment opportunities</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}