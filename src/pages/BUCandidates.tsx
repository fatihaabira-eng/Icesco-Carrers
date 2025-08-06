import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CommitteeEvaluation from '@/components/CommitteeEvaluation';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Users,
  Search,
  Eye,
  Download,
  FileText,
  Clock,
  TrendingUp,
  UserCheck,
  Award
} from 'lucide-react';

// Sample data for candidates
const candidatesData = [
  {
    id: 'CAND-001',
    name: "Alice Thompson",
    email: "alice.thompson@example.com",
    position: "Senior Frontend Developer",
    jobOffer: "Senior Frontend Developer",
    status: "Shortlisted",
    applyingDate: "2025-02-10",
    appliedDate: "2025-02-10",
    currentStage: "Committee Evaluation",
    cvUrl: "/sample-cv.pdf",
    phase: "Technical Interview",
    score: 85,
    avatar: "/api/placeholder/80/80",
    introVideo: "/api/placeholder/video.mp4",
    cv: "/api/placeholder/cv.pdf",
    coverLetter: "/api/placeholder/cover.pdf",
    qualifications: "Bachelor's in Computer Science, 5+ years experience",
    totalExperience: "5 years",
    currentCtc: "75,000 MAD",
    expectedCtc: "95,000 MAD",
    languages: ["English (Fluent)", "French (Intermediate)", "Arabic (Basic)"],
    keySkills: ["React", "TypeScript", "Node.js", "UI/UX Design"],
    education: [
      { degree: "Bachelor in Computer Science", institution: "MIT University", year: "2019" },
      { degree: "Frontend Development Certificate", institution: "Google", year: "2020" }
    ],
    experience: [
      { 
        role: "Frontend Developer", 
        company: "Tech Corp", 
        duration: "2020-Present", 
        description: "Developed responsive web applications using React and TypeScript"
      },
      { 
        role: "Junior Developer", 
        company: "StartupXYZ", 
        duration: "2019-2020", 
        description: "Built user interfaces and improved user experience"
      }
    ]
  },
  {
    id: 'CAND-002',
    name: "Bob Wilson",
    email: "bob.wilson@example.com",
    position: "Product Manager",
    jobOffer: "Product Manager",
    status: "Under Review",
    applyingDate: "2025-02-12",
    appliedDate: "2025-02-12",
    currentStage: "Committee Evaluation",
    cvUrl: "/sample-cv.pdf",
    phase: "Initial Review",
    score: 78,
    avatar: "/api/placeholder/80/80",
    introVideo: "/api/placeholder/video.mp4",
    cv: "/api/placeholder/cv.pdf",
    coverLetter: "/api/placeholder/cover.pdf",
    qualifications: "MBA, 8+ years in product management",
    totalExperience: "8 years",
    currentCtc: "95,000 MAD",
    expectedCtc: "120,000 MAD",
    languages: ["English (Native)", "French (Fluent)", "Arabic (Intermediate)"],
    keySkills: ["Product Strategy", "Team Leadership", "Data Analysis", "Agile"],
    education: [
      { degree: "MBA", institution: "Harvard Business School", year: "2018" },
      { degree: "Bachelor in Business", institution: "UCLA", year: "2016" }
    ],
    experience: [
      { 
        role: "Senior Product Manager", 
        company: "BigTech Inc", 
        duration: "2020-Present", 
        description: "Led product development for mobile applications"
      },
      { 
        role: "Product Manager", 
        company: "Growth Co", 
        duration: "2018-2020", 
        description: "Managed product roadmap and cross-functional teams"
      }
    ]
  },
  // Add similar structure for other candidates...
  {
    id: 'CAND-003',
    name: "Carol Davis",
    email: "carol.davis@example.com",
    position: "UX Designer",
    jobOffer: "UX Designer",
    status: "Interviewed",
    applyingDate: "2025-02-08",
    appliedDate: "2025-02-08",
    currentStage: "Committee Evaluation",
    cvUrl: "/sample-cv.pdf",
    phase: "Final Review",
    score: 92,
    avatar: "/api/placeholder/80/80",
    introVideo: "/api/placeholder/video.mp4",
    cv: "/api/placeholder/cv.pdf",
    coverLetter: "/api/placeholder/cover.pdf",
    qualifications: "Master's in Design, 6+ years experience",
    totalExperience: "6 years",
    currentCtc: "70,000 MAD",
    expectedCtc: "85,000 MAD",
    languages: ["English (Fluent)", "French (Native)", "Arabic (Basic)"],
    keySkills: ["UI/UX Design", "Figma", "User Research", "Prototyping"],
    education: [
      { degree: "Master in UX Design", institution: "Design Institute", year: "2019" }
    ],
    experience: [
      { 
        role: "Senior UX Designer", 
        company: "Design Studio", 
        duration: "2021-Present", 
        description: "Led design projects for web and mobile applications"
      }
    ]
  }
];

const BUCandidates: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [jobOfferFilter, setJobOfferFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [selectedCV, setSelectedCV] = useState<any>(null);

  const filteredCandidates = candidatesData.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.jobOffer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || candidate.status.toLowerCase().replace(" ", "").includes(statusFilter.toLowerCase());
    const matchesJobOffer = jobOfferFilter === "all" || candidate.jobOffer.toLowerCase().includes(jobOfferFilter.toLowerCase());

    return matchesSearch && matchesStatus && matchesJobOffer;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Under Review':
        return <Badge className="bg-yellow-100 text-yellow-800">Under Review</Badge>;
      case 'Shortlisted':
        return <Badge className="bg-blue-100 text-blue-800">Shortlisted</Badge>;
      case 'Interviewed':
        return <Badge className="bg-purple-100 text-purple-800">Interviewed</Badge>;
      case 'Hired':
        return <Badge className="bg-green-100 text-green-800">Hired</Badge>;
      case 'Rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  const handleCVView = (candidate: any) => {
    console.log("Opening modal for candidate:", candidate); // Debug log
    setSelectedCV(candidate);
    setIsCVModalOpen(true);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-8">
      {/* Header with Date Filter */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Candidates</h1>
          <p className="text-muted-foreground">
            View and manage job applicants
          </p>
        </div>
        
      </div>

     

      {/* Candidates Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">All Candidates</CardTitle>
              <p className="text-sm text-muted-foreground">
                View and manage candidate applications
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search candidates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="underreview">Under Review</SelectItem>
                  <SelectItem value="shortlisted">Shortlisted</SelectItem>
                  <SelectItem value="interviewed">Interviewed</SelectItem>
                  <SelectItem value="hired">Hired</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              <Select value={jobOfferFilter} onValueChange={setJobOfferFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Job Offer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Jobs</SelectItem>
                  <SelectItem value="frontend">Frontend Developer</SelectItem>
                  <SelectItem value="product">Product Manager</SelectItem>
                  <SelectItem value="ux">UX Designer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Candidates Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold text-center">Name</TableHead>
                  <TableHead className="font-semibold text-center">Job Offer</TableHead>
                  <TableHead className="font-semibold text-center">Status</TableHead>
                  <TableHead className="font-semibold text-center">Applying Date</TableHead>
                  <TableHead className="font-semibold text-center">CV</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCandidates.map((candidate) => (
                  <TableRow key={candidate.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium text-center">
                      <div className="flex items-center justify-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span>{candidate.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{candidate.jobOffer}</TableCell>
                    <TableCell className="text-center">{getStatusBadge(candidate.status)}</TableCell>
                    
                    
                    <TableCell className="text-center">{candidate.applyingDate}</TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCVView(candidate)}
                        className="text-primary hover:text-primary"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                     
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredCandidates.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
              <p>No candidates found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* CV Modal */}
          <Dialog open={isCVModalOpen} onOpenChange={setIsCVModalOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] overflow-hidden p-0">
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle className="text-xl font-bold">
              Committee Evaluation - {selectedCV?.name || 'Loading...'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="overflow-y-auto max-h-[calc(95vh-80px)]">
            {selectedCV ? (
              <CommitteeEvaluation candidateData={selectedCV} />
            ) : (
              <div className="p-6">
                <p>Loading candidate data...</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BUCandidates;