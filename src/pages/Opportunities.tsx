import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import JobCard from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MapPin, Clock, Briefcase, GraduationCap } from "lucide-react";

// Mock job data
const allJobs = [
  {
    id: "job-001",
    title: "Senior Software Engineer",
    businessUnit: "Digital Transformation",
    location: "Rabat, Morocco",
    type: "Full-time",
    experience: "5+ years",
    programId: "science",
    urgent: true,
    description: "Lead development of educational technology platforms that impact millions of students across the Islamic world.",
    skills: ["React", "Node.js", "TypeScript", "MongoDB", "AWS", "Docker"],
  },
  {
    id: "job-002",
    title: "Education Program Manager",
    businessUnit: "Education",
    location: "Rabat, Morocco",
    type: "Full-time",
    experience: "3-5 years",
    programId: "science",
    description: "Design and implement innovative educational programs to enhance learning outcomes in member states.",
    skills: ["Program Management", "Educational Design", "Stakeholder Management", "Arabic", "French"],
  },
  {
    id: "job-003",
    title: "Data Analyst",
    businessUnit: "Science & Technology",
    location: "Rabat, Morocco",
    type: "Contract",
    experience: "2-4 years",
    programId: "science",
    description: "Analyze educational and scientific data to inform policy decisions and program improvements.",
    skills: ["Python", "SQL", "Tableau", "Statistics", "Research", "Data Visualization"],
  },
  {
    id: "job-004",
    title: "Cultural Heritage Specialist",
    businessUnit: "Culture & Heritage",
    location: "Rabat, Morocco",
    type: "Full-time",
    experience: "4-6 years",
    programId: "science",
    description: "Preserve and promote Islamic cultural heritage through innovative digital preservation techniques.",
    skills: ["Cultural Studies", "Digital Preservation", "Project Management", "Arabic", "Documentation"],
  },
  {
    id: "job-005",
    title: "Communications Coordinator",
    businessUnit: "Communications",
    location: "Rabat, Morocco",
    type: "Part-time",
    experience: "2-3 years",
    programId: "science",
    description: "Develop and execute communication strategies to promote ICESCO's mission and programs globally.",
    skills: ["Content Creation", "Social Media", "Public Relations", "Multilingual", "Design"],
  },
  {
    id: "job-006",
    title: "HR Business Partner",
    businessUnit: "Human Resources",
    location: "Rabat, Morocco",
    type: "Full-time",
    experience: "5+ years",
    programId: "science",
    description: "Support organizational development and employee engagement across diverse, multicultural teams.",
    skills: ["HR Strategy", "Employee Relations", "Talent Management", "Cross-cultural", "Leadership"],
  },
  {
    id: "job-007",
    title: "DevOps Engineer",
    businessUnit: "Digital Transformation",
    location: "Rabat, Morocco",
    type: "Full-time",
    experience: "3-5 years",
    programId: "science",
    urgent: true,
    description: "Build and maintain scalable infrastructure for educational technology platforms serving global audiences.",
    skills: ["AWS", "Kubernetes", "Docker", "CI/CD", "Monitoring", "Security"],
  },
  {
    id: "job-008",
    title: "Research Scientist",
    businessUnit: "Science & Technology",
    location: "Rabat, Morocco",
    type: "Full-time",
    experience: "PhD + 2 years",
    programId: "science",
    description: "Conduct cutting-edge research in emerging technologies to advance scientific knowledge in member states.",
    skills: ["Research", "AI/ML", "Publications", "Grant Writing", "Collaboration", "Innovation"],
  },
  {
    id: "job-009",
    title: "Youth Peace Ambassador Program (YPA)",
    businessUnit: "Youth Programs",
    location: "Rabat, Morocco",
    type: "Program",
    experience: "0-2 years",
    programId: "youth",
    description: "Join a transformative program to promote peace and leadership among youth in the Islamic world.",
    skills: ["Leadership", "Peacebuilding", "Communication", "Community Engagement"],
  },
  {
    id: "job-010",
    title: "Youth Professionals Program (YPP)",
    businessUnit: "Youth Programs",
    location: "Rabat, Morocco",
    type: "Program",
    experience: "0-2 years",
    programId: "youth",
    description: "Develop professional skills and networks through this youth-focused career development program.",
    skills: ["Professional Development", "Networking", "Career Planning", "Leadership"],
  },
  {
    id: "job-011",
    title: "Cultural Research Intern",
    businessUnit: "Culture & Heritage",
    location: "Rabat, Morocco",
    type: "Internship",
    experience: "0-1 years",
    programId: "internship",
    description: "Support research on Islamic cultural heritage as part of our internship program.",
    skills: ["Research", "Cultural Studies", "Documentation", "Arabic"],
  },
  {
    id: "job-012",
    title: "Technology Development Intern",
    businessUnit: "Digital Transformation",
    location: "Rabat, Morocco",
    type: "Internship",
    experience: "0-1 years",
    programId: "internship",
    description: "Assist in developing educational technology solutions as an intern.",
    skills: ["React", "JavaScript", "Web Development", "Teamwork"],
  },
  {
    id: "job-013",
    title: "Science Research Intern",
    businessUnit: "Science & Technology",
    location: "Rabat, Morocco",
    type: "Internship",
    experience: "0-1 years",
    programId: "internship",
    description: "Contribute to scientific research projects as part of our internship program.",
    skills: ["Research", "Data Analysis", "Scientific Writing", "Python"],
  },
  {
    id: "job-014",
    title: "Youth Leadership Training",
    businessUnit: "Youth Programs",
    location: "Rabat, Morocco",
    type: "Program",
    experience: "0-2 years",
    programId: "youth",
    description: "Participate in leadership training to empower youth in community development.",
    skills: ["Leadership", "Teamwork", "Community Engagement"],
  },
];

const businessUnits = [
  "Education",
  "Science & Technology",
  "Culture & Heritage",
  "Communications",
  "Human Resources",
  "Digital Transformation",
];

const experienceLevels = [
  "Technician Bac +2",
  "Bachelor Bac +3",
  "Master's Degree",
  "PhD",
];

const contractTypes = ["Full-time", "Part-time", "Contract", "Internship", "Program"];

const locations = ["Rabat, Morocco"];

export default function Opportunities() {
  const [searchParams] = useSearchParams();
  const programId = searchParams.get("program") || "";
  const [searchKeyword, setSearchKeyword] = useState(searchParams.get("keyword") || "");
  const [filteredJobs, setFilteredJobs] = useState(allJobs);
  const [selectedBusinessUnits, setSelectedBusinessUnits] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("relevance");

  // Filter jobs based on program, search, and other filters
  useEffect(() => {
    console.log("Program ID from query:", programId);
    let filtered = allJobs;

    // Program ID filter (highest priority)
    if (programId) {
      filtered = filtered.filter((job) => job.programId === programId);
      console.log("After programId filter:", filtered.map((job) => job.title));

      // Specific filtering for youth and internship programs
      if (programId === "youth") {
        filtered = filtered.filter((job) =>
          ["Youth Peace Ambassador Program (YPA)", "Youth Professionals Program (YPP)"].includes(job.title)
        );
        console.log("After youth program filter:", filtered.map((job) => job.title));
      } else if (programId === "internship") {
        filtered = filtered.filter((job) => job.type === "Internship");
        console.log("After internship type filter:", filtered.map((job) => job.title));
      }
    }

    // Keyword search
    if (searchKeyword) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          job.businessUnit.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          job.description.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          job.skills.some((skill) => skill.toLowerCase().includes(searchKeyword.toLowerCase()))
      );
      console.log("After keyword filter:", filtered.map((job) => job.title));
    }

    // Business Unit filter
    if (selectedBusinessUnits.length > 0) {
      filtered = filtered.filter((job) => selectedBusinessUnits.includes(job.businessUnit));
      console.log("After business unit filter:", filtered.map((job) => job.title));
    }

    // Experience filter
    if (selectedExperience.length > 0) {
      filtered = filtered.filter((job) => {
        return selectedExperience.some((exp) => {
          if (exp === "Technician Bac +2" && (job.experience.includes("0-1") || job.experience.includes("0-2") || job.experience.includes("2"))) return true;
          if (exp === "Bachelor Bac +3" && (job.experience.includes("2-3") || job.experience.includes("2-4") || job.experience.includes("3"))) return true;
          if (exp === "Engineer & Master's Degree" && (job.experience.includes("3-5") || job.experience.includes("4-6") || job.experience.includes("5"))) return true;
          if (exp === "PhD" && job.experience.includes("PhD")) return true;
          return false;
        });
      });
      console.log("After experience filter:", filtered.map((job) => job.title));
    }

    // Contract type filter
    if (selectedTypes.length > 0) {
      filtered = filtered.filter((job) => selectedTypes.includes(job.type));
      console.log("After contract type filter:", filtered.map((job) => job.title));
    }

    // Location filter
    if (selectedLocations.length > 0) {
      filtered = filtered.filter((job) => selectedLocations.includes(job.location));
      console.log("After location filter:", filtered.map((job) => job.title));
    }

    // Sort
    if (sortBy === "newest") {
      filtered = [...filtered].sort((a, b) => parseInt(b.id.split('-')[1]) - parseInt(a.id.split('-')[1]));
      console.log("After newest sort:", filtered.map((job) => job.title));
    } else if (sortBy === "urgent") {
      filtered = [...filtered].sort((a, b) => (b.urgent ? 1 : 0) - (a.urgent ? 1 : 0));
      console.log("After urgent sort:", filtered.map((job) => job.title));
    }

    setFilteredJobs(filtered);
    console.log("Final filtered jobs:", filtered.map((job) => job.title));
  }, [
    programId,
    searchKeyword,
    selectedBusinessUnits,
    selectedExperience,
    selectedTypes,
    selectedLocations,
    sortBy,
  ]);

  const handleFilterChange = (category: string, value: string, checked: boolean) => {
    switch (category) {
      case "businessUnits":
        setSelectedBusinessUnits((prev) =>
          checked ? [...prev, value] : prev.filter((item) => item !== value)
        );
        break;
      case "experience":
        setSelectedExperience((prev) =>
          checked ? [...prev, value] : prev.filter((item) => item !== value)
        );
        break;
      case "types":
        setSelectedTypes((prev) =>
          checked ? [...prev, value] : prev.filter((item) => item !== value)
        );
        break;
      case "locations":
        setSelectedLocations((prev) =>
          checked ? [...prev, value] : prev.filter((item) => item !== value)
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
      <HeroSection
        title="Career Opportunities"
        subtitle="Discover meaningful roles that advance education, science, and culture across the Islamic world."
        background={{
          type: "video",
          src: "https://videos.pexels.com/video-files/3141208/3141208-uhd_2560_1440_25fps.mp4",
        }}
      />
      <section className="py-8 bg-muted/30 border-b">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="flex flex-col lg:flex-row gap-6">
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
          {(selectedBusinessUnits.length > 0 ||
            selectedExperience.length > 0 ||
            selectedTypes.length > 0 ||
            selectedLocations.length > 0) && (
            <div className="mt-4 flex flex-wrap gap-2 items-center">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {[...selectedBusinessUnits, ...selectedExperience, ...selectedTypes, ...selectedLocations].map(
                (filter, index) => (
                  <span key={index} className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">
                    {filter}
                  </span>
                )
              )}
              <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-xs">
                Clear All
              </Button>
            </div>
          )}
        </div>
      </section>
      <section className="section-padding">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-6">
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
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <MapPin className="w-5 h-5" />
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {locations.map((location) => (
                    <div key={location} className="flex items-center space-x-2">
                      <Checkbox
                        id={location}
                        checked={selectedLocations.includes(location)}
                        onCheckedChange={(checked) =>
                          handleFilterChange("locations", location, checked as boolean)
                        }
                      />
                      <label htmlFor={location} className="text-sm cursor-pointer">
                        {location}
                      </label>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
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