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
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Star
} from 'lucide-react';
import { format } from 'date-fns';

interface Candidate {
  id: string;
  name: string;
  position: string;
  businessUnit: string;
  unitType: 'sector' | 'center' | 'support';
  stage: 'technical_interview' | 'negotiation_salary' | 'committee_interview' | 'rejected_by_icesco' | 'declined_by_candidate';
  stageDate: string;
  email: string;
  phone: string;
  experience: string;
  education: string;
  location: string;
  appliedDate: string;
  skills: string[];
  languages: string[];
  summary: string;
  workExperience: {
    company: string;
    position: string;
    duration: string;
    description: string;
  }[];
  qualifications: {
    degree: string;
    institution: string;
    year: string;
    grade?: string;
  }[];
  avatar: string;
}

const candidatesData: Candidate[] = [
  {
    id: 'CAND-001',
    name: 'Dr. Ahmed Al-Mansouri',
    position: 'Education Program Manager',
    businessUnit: 'ED',
    unitType: 'sector',
    stage: 'negotiation_salary',
    stageDate: '2025-01-25',
    email: 'ahmed.almansouri@example.com',
    phone: '+212-555-0123',
    experience: '8 years',
    education: 'PhD in Educational Leadership',
    location: 'Rabat, Morocco',
    appliedDate: '2025-01-15',
    skills: ['Educational Leadership', 'Program Management', 'Curriculum Development', 'Team Leadership', 'Strategic Planning'],
    languages: ['Arabic (Native)', 'French (Fluent)', 'English (Advanced)'],
    summary: 'Experienced education professional with 8+ years in program management and educational leadership. Proven track record in developing and implementing educational initiatives.',
    workExperience: [
      {
        company: 'Ministry of Education, Morocco',
        position: 'Senior Education Program Coordinator',
        duration: '2020 - Present',
        description: 'Led educational reform initiatives, managed cross-functional teams, and developed curriculum frameworks for secondary education.'
      },
      {
        company: 'UNESCO Regional Office',
        position: 'Education Program Officer',
        duration: '2017 - 2020',
        description: 'Coordinated international education programs, facilitated stakeholder meetings, and conducted program evaluations.'
      }
    ],
    qualifications: [
      {
        degree: 'PhD in Educational Leadership',
        institution: 'University of Rabat',
        year: '2017',
        grade: 'Magna Cum Laude'
      },
      {
        degree: 'Master in Education Management',
        institution: 'Mohammed V University',
        year: '2014',
        grade: 'Distinction'
      }
    ],
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
  },
  {
    id: 'CAND-002',
    name: 'Prof. Fatima Al-Zahra',
    position: 'Education Program Manager',
    businessUnit: 'ED',
    unitType: 'sector',
    stage: 'committee_interview',
    stageDate: '2025-01-24',
    email: 'fatima.alzahra@example.com',
    phone: '+966-555-0124',
    experience: '12 years',
    education: 'PhD in Educational Sciences',
    location: 'Riyadh, Saudi Arabia',
    appliedDate: '2025-01-12',
    skills: ['Curriculum Design', 'Educational Research', 'Teacher Training', 'Assessment Development', 'Quality Assurance'],
    languages: ['Arabic (Native)', 'English (Fluent)', 'French (Intermediate)'],
    summary: 'Distinguished educator with 12+ years of experience in curriculum development and educational research. Published researcher with expertise in modern pedagogical approaches.',
    workExperience: [
      {
        company: 'King Saud University',
        position: 'Professor of Education',
        duration: '2018 - Present',
        description: 'Teaching undergraduate and graduate courses, conducting research, and supervising doctoral dissertations in educational sciences.'
      },
      {
        company: 'Saudi Ministry of Education',
        position: 'Curriculum Development Specialist',
        duration: '2013 - 2018',
        description: 'Designed national curriculum standards, led teacher training programs, and evaluated educational outcomes.'
      }
    ],
    qualifications: [
      {
        degree: 'PhD in Educational Sciences',
        institution: 'King Saud University',
        year: '2013',
        grade: 'Summa Cum Laude'
      },
      {
        degree: 'Master in Curriculum and Instruction',
        institution: 'King Saud University',
        year: '2009',
        grade: 'First Class Honors'
      }
    ],
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
  },
  {
    id: 'CAND-003',
    name: 'Dr. Omar Al-Kindi',
    position: 'Curriculum Development Specialist',
    businessUnit: 'ED',
    unitType: 'sector',
    stage: 'technical_interview',
    stageDate: '2025-01-23',
    email: 'omar.alkindi@example.com',
    phone: '+971-555-0125',
    experience: '6 years',
    education: 'Master in Educational Technology',
    location: 'Dubai, UAE',
    appliedDate: '2025-01-10',
    skills: ['Curriculum Design', 'Educational Technology', 'Learning Management Systems', 'Digital Content Creation', 'Project Management'],
    languages: ['Arabic (Native)', 'English (Fluent)', 'Urdu (Conversational)'],
    summary: 'Innovative curriculum specialist with expertise in educational technology and digital learning solutions. Experienced in designing modern, technology-enhanced curricula.',
    workExperience: [
      {
        company: 'UAE Ministry of Education',
        position: 'Curriculum Design Specialist',
        duration: '2019 - Present',
        description: 'Developed digital curricula for K-12 education, integrated technology solutions, and trained educators on new methodologies.'
      },
      {
        company: 'Emirates Education Foundation',
        position: 'Learning Technology Coordinator',
        duration: '2017 - 2019',
        description: 'Implemented e-learning platforms, created digital content, and provided technical support for educational initiatives.'
      }
    ],
    qualifications: [
      {
        degree: 'Master in Educational Technology',
        institution: 'UAE University',
        year: '2017',
        grade: 'Distinction'
      },
      {
        degree: 'Bachelor in Computer Science',
        institution: 'American University of Sharjah',
        year: '2015',
        grade: 'Magna Cum Laude'
      }
    ],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
  },
  {
    id: 'CAND-004',
    name: 'Ms. Aisha Hassan',
    position: 'Educational Technology Coordinator',
    businessUnit: 'ED',
    unitType: 'sector',
    stage: 'rejected_by_icesco',
    stageDate: '2025-01-22',
    email: 'aisha.hassan@example.com',
    phone: '+20-555-0126',
    experience: '5 years',
    education: 'Master in Educational Technology',
    location: 'Cairo, Egypt',
    appliedDate: '2025-01-08',
    skills: ['Educational Technology', 'LMS Administration', 'Digital Learning', 'Training & Development', 'Technical Support'],
    languages: ['Arabic (Native)', 'English (Advanced)', 'French (Basic)'],
    summary: 'Dynamic educational technology coordinator with 5+ years of experience in implementing and managing digital learning solutions in educational institutions.',
    workExperience: [
      {
        company: 'Cairo International School',
        position: 'IT Coordinator',
        duration: '2020 - Present',
        description: 'Managed school technology infrastructure, trained teachers on digital tools, and coordinated online learning initiatives.'
      },
      {
        company: 'Egyptian Ministry of Education',
        position: 'Educational Technology Assistant',
        duration: '2018 - 2020',
        description: 'Supported technology integration projects, maintained learning management systems, and provided technical training.'
      }
    ],
    qualifications: [
      {
        degree: 'Master in Educational Technology',
        institution: 'Cairo University',
        year: '2018',
        grade: 'Very Good'
      },
      {
        degree: 'Bachelor in Information Technology',
        institution: 'Ain Shams University',
        year: '2016',
        grade: 'Good'
      }
    ],
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9'
  },
  {
    id: 'CAND-005',
    name: 'Dr. Khalil Al-Rashid',
    position: 'Early Childhood Education Specialist',
    businessUnit: 'ED',
    unitType: 'sector',
    stage: 'declined_by_candidate',
    stageDate: '2025-01-20',
    email: 'khalil.alrashid@example.com',
    phone: '+965-555-0127',
    experience: '10 years',
    education: 'PhD in Early Childhood Development',
    location: 'Kuwait City, Kuwait',
    appliedDate: '2025-01-05',
    skills: ['Early Childhood Development', 'Child Psychology', 'Curriculum Design', 'Parent Engagement', 'Research & Evaluation'],
    languages: ['Arabic (Native)', 'English (Fluent)'],
    summary: 'Dedicated early childhood education specialist with 10+ years of experience in child development, curriculum design, and educational research.',
    workExperience: [
      {
        company: 'Kuwait University',
        position: 'Assistant Professor',
        duration: '2020 - Present',
        description: 'Teaching early childhood education courses, conducting research on child development, and supervising student teachers.'
      },
      {
        company: 'Ministry of Education, Kuwait',
        position: 'Early Childhood Program Coordinator',
        duration: '2015 - 2020',
        description: 'Developed early childhood education standards, trained kindergarten teachers, and evaluated program effectiveness.'
      }
    ],
    qualifications: [
      {
        degree: 'PhD in Early Childhood Development',
        institution: 'Kuwait University',
        year: '2015',
        grade: 'Excellent'
      },
      {
        degree: 'Master in Child Psychology',
        institution: 'Kuwait University',
        year: '2011',
        grade: 'Distinction'
      }
    ],
    avatar: 'https://images.unsplash.com/photo-1506794778202-d4c4ae5a3686'
  }
];

const BUCandidates: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [jobOfferFilter, setJobOfferFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [selectedCV, setSelectedCV] = useState<Candidate | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const filteredCandidates = candidatesData.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.businessUnit.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || candidate.stage.toLowerCase().replace("_", "").includes(statusFilter.toLowerCase());
    const matchesJobOffer = jobOfferFilter === "all" || candidate.position.toLowerCase().includes(jobOfferFilter.toLowerCase());

    return matchesSearch && matchesStatus && matchesJobOffer;
  });

  const getStageColor = (stage: string) => {
    const colorMap: { [key: string]: string } = {
      'technical_interview': 'bg-purple-100 text-purple-800',
      'negotiation_salary': 'bg-blue-100 text-blue-800',
      'committee_interview': 'bg-orange-100 text-orange-800',
      'rejected_by_icesco': 'bg-red-100 text-red-800',
      'declined_by_candidate': 'bg-gray-100 text-gray-800'
    };
    return colorMap[stage] || 'bg-gray-100 text-gray-800';
  };

  const handleCVView = (candidate: Candidate) => {
    console.log("Opening modal for candidate:", candidate);
    setSelectedCV(candidate);
    setIsCVModalOpen(true);
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCandidates = filteredCandidates.slice(startIndex, endIndex);

  return (
    <div className="space-y-8">
      {/* Header with Date Filter */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Candidates</h1>
          <p className="text-muted-foreground">
            View Job Applicants
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
                  placeholder="Search candidates by name, position, or business unit..."
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
                  <SelectItem value="technical_interview">Technical Interview</SelectItem>
                  <SelectItem value="negotiation_salary">Negotiation Salary</SelectItem>
                  <SelectItem value="committee_interview">Committee Interview</SelectItem>
                  <SelectItem value="rejected_by_icesco">Rejected by ICESCO</SelectItem>
                  <SelectItem value="declined_by_candidate">Declined by Candidate</SelectItem>
                </SelectContent>
              </Select>

              <Select value={jobOfferFilter} onValueChange={setJobOfferFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Job Offer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Jobs</SelectItem>
                  <SelectItem value="education program manager">Education Program Manager</SelectItem>
                  <SelectItem value="curriculum development specialist">Curriculum Development Specialist</SelectItem>
                  <SelectItem value="educational technology coordinator">Educational Technology Coordinator</SelectItem>
                  <SelectItem value="early childhood education specialist">Early Childhood Education Specialist</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Candidates Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Business Unit</TableHead>
                  <TableHead className="font-semibold">Position</TableHead>
                  <TableHead className="font-semibold">Candidate Name</TableHead>
                  <TableHead className="font-semibold">Years of Experience</TableHead>
                  <TableHead className="font-semibold">Degree</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Applied Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentCandidates.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground h-24">
                      No candidates found.
                    </TableCell>
                  </TableRow>
                ) : (
                  currentCandidates.map((candidate) => (
                    <TableRow key={candidate.id} className="hover:bg-muted/50 transition-colors">
                      <TableCell>{candidate.businessUnit}</TableCell>
                      <TableCell>{candidate.position}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <img
                            src={candidate.avatar}
                            alt={`${candidate.name}'s avatar`}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span className="font-medium">{candidate.name}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCVView(candidate)}
                            className="text-primary hover:text-primary ml-2"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>{candidate.experience}</TableCell>
                      <TableCell>{candidate.education}</TableCell>
                      <TableCell>
                        <Badge className={getStageColor(candidate.stage)}>
                          {candidate.stage.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Badge>
                      </TableCell>
                      <TableCell>{format(new Date(candidate.appliedDate), 'MMM d, yyyy')}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredCandidates.length)} of {filteredCandidates.length} candidates
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="w-8 h-8"
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}

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
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader className="border-b pb-4">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold">
                Candidate CV - {selectedCV?.name}
              </DialogTitle>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download CV
              </Button>
            </div>
          </DialogHeader>
          
          <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6">
            {selectedCV && (
              <div className="space-y-6">
                {/* Header Section */}
                <div className="flex items-start space-x-6">
                  <img
                    src={selectedCV.avatar}
                    alt={`${selectedCV.name}'s avatar`}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-foreground">{selectedCV.name}</h2>
                    <p className="text-lg text-muted-foreground mb-3">{selectedCV.position}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedCV.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedCV.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedCV.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Applied: {format(new Date(selectedCV.appliedDate), 'MMM d, yyyy')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Professional Summary */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <Star className="h-5 w-5 mr-2 text-primary" />
                    Professional Summary
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{selectedCV.summary}</p>
                </div>

                {/* Skills & Languages */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Core Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCV.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCV.languages.map((language, index) => (
                        <Badge key={index} variant="outline">{language}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Work Experience */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2 text-primary" />
                    Work Experience
                  </h3>
                  <div className="space-y-4">
                    {selectedCV.workExperience.map((job, index) => (
                      <div key={index} className="border-l-2 border-primary/20 pl-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-foreground">{job.position}</h4>
                            <p className="text-primary font-medium">{job.company}</p>
                          </div>
                          <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                            {job.duration}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{job.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2 text-primary" />
                    Education & Qualifications
                  </h3>
                  <div className="space-y-4">
                    {selectedCV.qualifications.map((edu, index) => (
                      <div key={index} className="border-l-2 border-primary/20 pl-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-foreground">{edu.degree}</h4>
                            <p className="text-primary font-medium">{edu.institution}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded block mb-1">
                              {edu.year}
                            </span>
                            {edu.grade && (
                              <span className="text-xs text-green-600 font-medium">{edu.grade}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Application Status */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-3">Application Status</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Current Stage:</span>
                      <div className="mt-1">
                        <Badge className={getStageColor(selectedCV.stage)}>
                          {selectedCV.stage.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Stage Date:</span>
                      <p className="font-medium mt-1">{format(new Date(selectedCV.stageDate), 'MMMM d, yyyy')}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BUCandidates;