import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Users, 
  Lightbulb,
  Shield,
  Eye,
  Handshake,
  ArrowRight,
  Globe,
  TrendingUp,
  Award,
  Clock,
  MapPin,
  Target,
  BookOpen

} from "lucide-react";
import { Link } from "react-router-dom";
import icescoBackground from "@/assets/icesco-leadership.jfif";
import icescoTeam from "@/assets/icesco-team.jfif";
import icescoTeam2 from "@/assets/icesco-team-2.jfif";
import icescoTeam3 from "@/assets/icesco-team-3.jfif";
import educationalExcelence from "@/assets/education-icesco.jpeg";
import diversityImage from "@/assets/diversity.png";
import science from "@/assets/science-advance.webp";
import careerImage from "@/assets/career-growth.jfif";

const coreValues = [
  {
    icon: Handshake,
    title: "Solidarity",
    description: "Working together across cultures and borders to achieve common goals for humanity."
  },
  {
    icon: Users,
    title: "Coexistence",
    description: "Celebrating diversity and fostering peaceful relationships between all peoples."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Pioneering new approaches to education, science, and cultural preservation."
  },
  {
    icon: Shield,
    title: "Leadership",
    description: "Leading by example in promoting excellence and sustainable development."
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "Maintaining open, honest, and accountable practices in all our endeavors."
  }
];

const benefits = [
  {
    icon: TrendingUp,
    title: "Competitive Salaries",
    description: "International compensation packages with performance incentives"
  },
  {
    icon: Heart,
    title: "Health Coverage",
    description: "Comprehensive medical, dental, and wellness benefits"
  },
  {
    icon: Clock,
    title: "Work-Life Balance",
    description: "Flexible schedules, remote work options, and generous leave policies"
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "Contribute to projects that reach 1.8 billion people worldwide"
  },
  {
    icon: Award,
    title: "Career Growth",
    description: "Professional development, training, and leadership opportunities"
  },
  {
    icon: MapPin,
    title: "International Exposure",
    description: "Work across 53 member states with multicultural teams"
  }
];

const impactStories = [
  {
    title: "Educational Excellence",
    description: "Transforming education systems across the Islamic world through innovative curricula and teacher training programs.",
    image: educationalExcelence
  },
  {
    title: "Cultural Preservation",
    description: "Protecting and promoting Islamic heritage through digital archives and cultural exchange initiatives.",
    image: icescoBackground
  },
  {
    title: "Scientific Advancement",
    description: "Fostering scientific research and collaboration to address global challenges in health, environment, and technology.",
    image: science
  }
];

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStory, setCurrentStory] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentStory((prev) => (prev + 1) % impactStories.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${icescoBackground})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70"></div>
        </div>
        
        <div className={`relative z-10 max-w-4xl mx-auto text-center px-6 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h1 className="text-5xl md:text-7xl font-title text-white mb-6 animate-fade-in">
            Working at ICESCO
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed font-title">
            Empowering Minds, Uniting Cultures, Shaping the Future
          </p>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 hover-scale"
            asChild
          >
            <Link to="/opportunities">
              Join Our Team
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>

        {/* Animated scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Work with Us */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={`space-y-6 transform transition-all duration-700 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Work with Us
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At ICESCO, every role contributes to our mission of advancing education, science, 
                and culture across the Islamic world. Our team of dedicated professionals works 
                collaboratively to create lasting impact in communities spanning 53 member states.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Join a diverse, multicultural environment where innovation meets tradition, 
                and where your expertise helps shape the future of over 1.8 billion people worldwide.
              </p>
              <div className="flex gap-4 mt-8">
                <Badge className="bg-primary/10 text-primary px-4 py-2">53 Member States</Badge>
                <Badge className="bg-secondary/20 text-secondary-dark px-4 py-2">1.8B People Reached</Badge>
                <Badge className="bg-accent/10 text-accent px-4 py-2">25+ Years Impact</Badge>
              </div>
            </div>
            
            <div className={`transform transition-all duration-700 delay-300 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img 
                    src={icescoTeam3} 
                    alt="ICESCO team collaboration" 
                    className="rounded-lg shadow-lg hover-scale w-full h-48 object-cover"
                  />
                  <img 
                    src={icescoTeam} 
                    alt="ICESCO innovation center" 
                    className="rounded-lg shadow-lg hover-scale w-full h-32 object-cover"
                  />
                </div>
                <div className="space-y-4 mt-8">
                  <img 
                    src={icescoTeam} 
                    alt="ICESCO cultural programs" 
                    className="rounded-lg shadow-lg hover-scale w-full h-32 object-cover"
                  />
                  <img 
                    src={icescoTeam2} 
                    alt="ICESCO global reach" 
                    className="rounded-lg shadow-lg hover-scale w-full h-48 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
       <section className="section-padding bg-gradient-to-br from-primary/5 to-secondary/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Guiding Principles
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            These core values shape our culture and guide every decision we make at ICESCO.
          </p>
        </div>

        <div className="flex gap-6 overflow-x-auto lg:overflow-visible lg:grid lg:grid-cols-5 px-2 hide-scrollbar">
          {coreValues.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="min-w-[280px] lg:min-w-0"
            >
              <Card className="backdrop-blur-md bg-white/70 dark:bg-black/40 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/30 hover:-translate-y-1">
                <CardContent className="p-8 text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>


      {/* Benefits & Wellbeing */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Your Wellbeing Matters
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We invest in our people with comprehensive benefits and a supportive work environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className={`group p-6 rounded-lg border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Development */}
      <section className="section-padding bg-muted/30">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Grow With Us
            </h2>
            <div className="space-y-6">
              {/* Item 1 */}
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 bg-[#d3aa44] rounded-full flex items-center justify-center mt-1 shadow-md group-hover:scale-110 transition">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">Mentorship Programs</h3>
                  <p className="text-muted-foreground">Connect with senior leaders and industry experts who guide your professional journey.</p>
                </div>
              </div>
              {/* Item 2 */}
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 bg-[#d3aa44] rounded-full flex items-center justify-center mt-1 shadow-md group-hover:scale-110 transition">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">Skills Development</h3>
                  <p className="text-muted-foreground">Access training programs, certifications, and continuous learning opportunities.</p>
                </div>
              </div>
              {/* Item 3 */}
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 bg-[#d3aa44] rounded-full flex items-center justify-center mt-1 shadow-md group-hover:scale-110 transition">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">International Exposure</h3>
                  <p className="text-muted-foreground">Work on global projects and collaborate with teams across countries and cultures.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Image and Quote */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src={careerImage}
                alt="Career Growth"
                className="w-full h-96 object-cover rounded-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md p-6 rounded-b-2xl">
                <blockquote className="text-lg text-foreground italic mb-4">
                  "Working at ICESCO has been transformative. The mentorship I received and the
                  international projects I've been part of have shaped me both professionally and personally."
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Sarah Ahmed</p>
                    <p className="text-sm text-muted-foreground">Senior Program Manager</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

      {/* Working for Humanity */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Make a Humanitarian Impact
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every project at ICESCO contributes to building a better world through education, science, and cultural understanding.
            </p>
          </div>

          <div className="space-y-12">
            {impactStories.map((story, index) => (
              <Card 
                key={index} 
                className={`overflow-hidden ${
                  currentStory === index ? 'ring-2 ring-primary/20' : ''
                } transition-all duration-500`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-foreground mb-4">{story.title}</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">{story.description}</p>
                    <div className="mt-6">
                      <Badge className="bg-primary/10 text-primary">
                        <Target className="w-4 h-4 mr-2" />
                        Global Impact Initiative
                      </Badge>
                    </div>
                  </div>
                  <div className="relative">
                    <img 
                      src={story.image} 
                      alt={story.title}
                      className="w-full h-64 lg:h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Diversity & Inclusion */}
      <section className="section-padding bg-gradient-to-r from-primary/5 to-primary/9">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Diversity Is Our Strength
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <img 
                src={diversityImage} 
                alt="Diverse ICESCO team" 
                className="w-full h-96 object-cover rounded-2xl shadow-xl hover-scale"
              />
            </div>
            
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                At ICESCO, we celebrate the rich tapestry of cultures, backgrounds, and perspectives 
                that our team brings. Our inclusive environment fosters innovation, creativity, and 
                meaningful collaboration across all levels of the organization.
              </p>
              
              <blockquote className="border-l-4 border-primary pl-6 italic text-lg text-foreground">
                "Our diversity is not just a statistic—it's our superpower. When people from different 
                cultures and backgrounds come together with a shared mission, extraordinary things happen."
              </blockquote>
              
              <div className="bg-white/50 rounded-lg p-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary">30+</div>
                    <div className="text-sm text-muted-foreground">Nationalities</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary">15+</div>
                    <div className="text-sm text-muted-foreground">Languages</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary">50%</div>
                    <div className="text-sm text-muted-foreground">Women in Leadership</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="max-w-4xl mx-auto container-padding text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Be Part of the Mission
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Join us in shaping a brighter future for education, science, and culture across the Islamic world.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 hover-scale"
            asChild
          >
            <Link to="/opportunities">
              View Opportunities
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}