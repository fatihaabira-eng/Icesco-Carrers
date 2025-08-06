import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import JobCard from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, MapPin, Clock, Briefcase, GraduationCap } from "lucide-react";

// Mock job data
const allJobs = [
  {
    id: "job-001",
    title: "Senior Software Engineer",
    businessUnit: "Digital Transformation",
    location: "Rabat, Morocco",
    type: "Full-time",
    experience: "5+ years",
    urgent: true,
    description: "Lead development of educational technology platforms that impact millions of students across the Islamic world.",
    skills: ["React", "Node.js", "TypeScript", "MongoDB", "AWS", "Docker"]
  },
  {
    id: "job-002",
    title: "Education Program Manager",
    businessUnit: "Education",
    location: "Rabat, Morocco",
    type: "Full-time",
    experience: "3-5 years",
    description: "Design and implement innovative educational programs to enhance learning outcomes in member states.",
    skills: ["Program Management", "Educational Design", "Stakeholder Management", "Arabic", "French"]
  },
  {
    id: "job-003",
    title: "Data Analyst",
    businessUnit: "Science & Technology",
    location: "Rabat, Morocco",
    type: "Contract",
    experience: "2-4 years",
    description: "Analyze educational and scientific data to inform policy decisions and program improvements.",
    skills: ["Python", "SQL", "Tableau", "Statistics", "Research", "Data Visualization"]
  },
  {
    id: "job-004",
    title: "Cultural Heritage Specialist",
    businessUnit: "Culture & Heritage",
    location: "Rabat, Morocco",
    type: "Full-time",
    experience: "4-6 years",
    description: "Preserve and promote Islamic cultural heritage through innovative digital preservation techniques.",
    skills: ["Cultural Studies", "Digital Preservation", "Project Management", "Arabic", "Documentation"]
  },
  {
    id: "job-005",
    title: "Communications Coordinator",
    businessUnit: "Communications",
    location: "Rabat, Morocco",
    type: "Part-time",
    experience: "2-3 years",
    description: "Develop and execute communication strategies to promote ICESCO's mission and programs globally.",
    skills: ["Content Creation", "Social Media", "Public Relations", "Multilingual", "Design"]
  },
  {
    id: "job-006",
    title: "HR Business Partner",
    businessUnit: "Human Resources",
    location: "Rabat, Morocco",
    type: "Full-time",
    experience: "5+ years",
    description: "Support organizational development and employee engagement across diverse, multicultural teams.",
    skills: ["HR Strategy", "Employee Relations", "Talent Management", "Cross-cultural", "Leadership"]
  },
  {
    id: "job-007",
    title: "DevOps Engineer",
    businessUnit: "Digital Transformation",
    location: "Rabat, Morocco",
    type: "Full-time",
    experience: "3-5 years",
    urgent: true,
    description: "Build and maintain scalable infrastructure for educational technology platforms serving global audiences.",
    skills: ["AWS", "Kubernetes", "Docker", "CI/CD", "Monitoring", "Security"]
  },
  {
    id: "job-008",
    title: "Research Scientist",
    businessUnit: "Science & Technology",
    location: "Rabat, Morocco",
    type: "Full-time",
    experience: "PhD + 2 years",
    description: "Conduct cutting-edge research in emerging technologies to advance scientific knowledge in member states.",
    skills: ["Research", "AI/ML", "Publications", "Grant Writing", "Collaboration", "Innovation"]
  }
];

const businessUnits = [
  "Digital Transformation",
  "Education", 
  "Science & Technology",
  "Culture & Heritage",
  "Communications",
  "Human Resources"
];

const experienceLevels = [
  "Technician Bac +2",
  "Bachelor Bac +3",
  "Engineer & Master's Degree", 
  "PhD",
];

const contractTypes = [
  "Full-time",
  "Part-time", 
  "Contract",
  "Internship"
];

const locations = [
  "Rabat, Morocco",
];

export default function Opportunities() {
  const [searchParams] = useSearchParams();
  const [searchKeyword, setSearchKeyword] = useState(searchParams.get("keyword") || "");
  const [filteredJobs, setFilteredJobs] = useState(allJobs);
  const [selectedBusinessUnits, setSelectedBusinessUnits] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("relevance");

  // Filter jobs based on search and filters
  useEffect(() => {
    let filtered = allJobs;

    // Keyword search
    if (searchKeyword) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        job.businessUnit.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        job.description.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchKeyword.toLowerCase()))
      );
    }

    // Business Unit filter
    if (selectedBusinessUnits.length > 0) {
      filtered = filtered.filter(job => selectedBusinessUnits.includes(job.businessUnit));
    }

    // Experience filter
    if (selectedExperience.length > 0) {
      filtered = filtered.filter(job => {
        return selectedExperience.some(exp => {
          if (exp.includes("Entry") && (job.experience.includes("0-") || job.experience.includes("1-") || job.experience.includes("2-"))) return true;
          if (exp.includes("Mid") && (job.experience.includes("2-") || job.experience.includes("3-") || job.experience.includes("4-") || job.experience.includes("5"))) return true;
          if (exp.includes("Senior") && job.experience.includes("5+")) return true;
          return false;
        });
      });
    }

    // Contract type filter
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(job => selectedTypes.includes(job.type));
    }

    // Location filter
    if (selectedLocations.length > 0) {
      filtered = filtered.filter(job => selectedLocations.includes(job.location));
    }

    // Sort
    if (sortBy === "newest") {
      // For demo, just reverse the order
      filtered = [...filtered].reverse();
    } else if (sortBy === "urgent") {
      filtered = [...filtered].sort((a, b) => (b.urgent ? 1 : 0) - (a.urgent ? 1 : 0));
    }

    setFilteredJobs(filtered);
  }, [searchKeyword, selectedBusinessUnits, selectedExperience, selectedTypes, selectedLocations, sortBy]);

  const handleFilterChange = (category: string, value: string, checked: boolean) => {
    switch (category) {
      case "businessUnits":
        setSelectedBusinessUnits(prev => 
          checked ? [...prev, value] : prev.filter(item => item !== value)
        );
        break;
      case "experience":
        setSelectedExperience(prev => 
          checked ? [...prev, value] : prev.filter(item => item !== value)
        );
        break;
      case "types":
        setSelectedTypes(prev => 
          checked ? [...prev, value] : prev.filter(item => item !== value)
        );
        break;
      case "locations":
        setSelectedLocations(prev => 
          checked ? [...prev, value] : prev.filter(item => item !== value)
        );
        break;
    }
  };

  const clearAllFilters = () => {
    setSelectedBusinessUnits([]);
    setSelectedExperience([]);
    setSelectedTypes([]);
    setSelectedLocations([]);
    setSearchKeyword("");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title="Career Opportunities"
        subtitle="Discover meaningful roles that advance education, science, and culture across the Islamic world."
        // primaryButtonText="View All Roles"
        // secondaryButtonText="Join Talent Pool"
        background={{
          type: "video",
          src: "https://videos.pexels.com/video-files/3141208/3141208-uhd_2560_1440_25fps.mp4"
        }}
      />

      {/* Search and Filters */}
      <section className="py-8 bg-muted/30 border-b">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search by role, business unit, skills..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            {/* Sort */}
            <div className="lg:w-48">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Most Relevant</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="urgent">Urgent First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters Display */}
          {(selectedBusinessUnits.length > 0 || selectedExperience.length > 0 || selectedTypes.length > 0 || selectedLocations.length > 0) && (
            <div className="mt-4 flex flex-wrap gap-2 items-center">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {[...selectedBusinessUnits, ...selectedExperience, ...selectedTypes, ...selectedLocations].map((filter, index) => (
                <span key={index} className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">
                  {filter}
                </span>
              ))}
              <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-xs">
                Clear All
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Business Unit Filter */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Briefcase className="w-5 h-5" />
                    Business Unit
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {businessUnits.map((unit) => (
                    <div key={unit} className="flex items-center space-x-2">
                      <Checkbox
                        id={unit}
                        checked={selectedBusinessUnits.includes(unit)}
                        onCheckedChange={(checked) => 
                          handleFilterChange("businessUnits", unit, checked as boolean)
                        }
                      />
                      <label htmlFor={unit} className="text-sm cursor-pointer">
                        {unit}
                      </label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Experience Filter */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <GraduationCap className="w-5 h-5" />
                    Level of Studies
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {experienceLevels.map((level) => (
                    <div key={level} className="flex items-center space-x-2">
                      <Checkbox
                        id={level}
                        checked={selectedExperience.includes(level)}
                        onCheckedChange={(checked) => 
                          handleFilterChange("experience", level, checked as boolean)
                        }
                      />
                      <label htmlFor={level} className="text-sm cursor-pointer">
                        {level}
                      </label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Contract Type Filter */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Clock className="w-5 h-5" />
                    Position Type
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {contractTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={type}
                        checked={selectedTypes.includes(type)}
                        onCheckedChange={(checked) => 
                          handleFilterChange("types", type, checked as boolean)
                        }
                      />
                      <label htmlFor={type} className="text-sm cursor-pointer">
                        {type}
                      </label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Location Filter */}
              
            </div>

            {/* Jobs List */}
            <div className="lg:col-span-3">
              <div className="mb-6 flex justify-between items-center">
                <p className="text-muted-foreground">
                  Showing {filteredJobs.length} of {allJobs.length} opportunities
                </p>
              </div>

              {filteredJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {filteredJobs.map((job, index) => (
                    <JobCard key={index} {...job} />
                  ))}
                </div>
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No opportunities found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your search criteria or clearing some filters.
                    </p>
                    <Button variant="outline" onClick={clearAllFilters}>
                      Clear All Filters
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How to Apply Section */}
      <section className="section-padding bg-muted/30">
        <div className="max-w-4xl mx-auto container-padding text-center">
          <h2 className="font-title text-3xl md:text-4xl font-bold text-foreground mb-8">
            How to Apply
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-primary font-bold text-lg">1</span>
              </div>
              <h3 className="font-semibold text-lg">Find Your Role</h3>
              <p className="text-muted-foreground text-sm">
                Browse our opportunities and find positions that match your skills and interests.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-primary font-bold text-lg">2</span>
              </div>
              <h3 className="font-semibold text-lg">Submit Application</h3>
              <p className="text-muted-foreground text-sm">
                Apply online with your CV, cover letter, and any required documents.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-primary font-bold text-lg">3</span>
              </div>
              <h3 className="font-semibold text-lg">Join Our Team</h3>
              <p className="text-muted-foreground text-sm">
                Complete our interview process and start making a global impact with ICESCO.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}