import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Search, 
  Filter,
  Users,
  UserCheck,
  UserX,
  Briefcase,
  CheckCircle,
  FileText,
  Award,
  Building,
  Target,
  Settings,
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
import DashboardHeader from '@/components/DashboardHeader';
import KPICards from '@/components/KPICards';
import DashboardSection from '@/components/DashboardSection';

interface Position {
  id: string;
  title: string;
  businessUnit: string;
  unitType: 'sector' | 'center' | 'support';
  status: 'requested' | 'approved' | 'published' | 'closed';
  requestedDate: string;
  approvedDate?: string;
  publishedDate?: string;
  closingDate?: string;
  positions: number;
  appliedCandidates: number;
  shortlistedCandidates: number;
  interviewedCandidates: number;
  selectedCandidates: number;
  offersSent: number;
  approvedOffers: number;
  declinedOffers: number;
  hiredCandidates: number;
}

interface Candidate {
  id: string;
  name: string;
  position: string;
  businessUnit: string;
  unitType: 'sector' | 'center' | 'support';
  stage: 'applied' | 'shortlisted' | 'interviewed' | 'selected' | 'offer_sent' | 'offer_approved' | 'offer_declined' | 'hired';
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
}

const BUManpowerManagement: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2025');
  const [dateRange, setDateRange] = useState('year');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  // Mock data for education-related positions
  const positions: Position[] = [
    {
      id: 'POS-001',
      title: 'Education Program Manager',
      businessUnit: 'Education Sector',
      unitType: 'sector',
      status: 'published',
      requestedDate: '2025-01-10',
      approvedDate: '2025-01-15',
      publishedDate: '2025-01-20',
      closingDate: '2025-02-20',
      positions: 2,
      appliedCandidates: 45,
      shortlistedCandidates: 12,
      interviewedCandidates: 8,
      selectedCandidates: 3,
      offersSent: 3,
      approvedOffers: 2,
      declinedOffers: 1,
      hiredCandidates: 2
    },
    {
      id: 'POS-002',
      title: 'Curriculum Development Specialist',
      businessUnit: 'Education Sector',
      unitType: 'sector',
      status: 'published',
      requestedDate: '2025-01-08',
      approvedDate: '2025-01-12',
      publishedDate: '2025-01-18',
      closingDate: '2025-02-18',
      positions: 1,
      appliedCandidates: 32,
      shortlistedCandidates: 8,
      interviewedCandidates: 5,
      selectedCandidates: 2,
      offersSent: 2,
      approvedOffers: 1,
      declinedOffers: 1,
      hiredCandidates: 1
    },
    {
      id: 'POS-003',
      title: 'Educational Technology Coordinator',
      businessUnit: 'Education Sector',
      unitType: 'sector',
      status: 'approved',
      requestedDate: '2025-01-05',
      approvedDate: '2025-01-10',
      positions: 1,
      appliedCandidates: 28,
      shortlistedCandidates: 6,
      interviewedCandidates: 4,
      selectedCandidates: 1,
      offersSent: 1,
      approvedOffers: 0,
      declinedOffers: 0,
      hiredCandidates: 0
    },
    {
      id: 'POS-004',
      title: 'Higher Education Policy Analyst',
      businessUnit: 'Education Sector',
      unitType: 'sector',
      status: 'requested',
      requestedDate: '2025-01-15',
      positions: 1,
      appliedCandidates: 0,
      shortlistedCandidates: 0,
      interviewedCandidates: 0,
      selectedCandidates: 0,
      offersSent: 0,
      approvedOffers: 0,
      declinedOffers: 0,
      hiredCandidates: 0
    },
    {
      id: 'POS-005',
      title: 'Early Childhood Education Specialist',
      businessUnit: 'Education Sector',
      unitType: 'sector',
      status: 'published',
      requestedDate: '2025-01-12',
      approvedDate: '2025-01-18',
      publishedDate: '2025-01-25',
      closingDate: '2025-02-25',
      positions: 1,
      appliedCandidates: 24,
      shortlistedCandidates: 7,
      interviewedCandidates: 3,
      selectedCandidates: 1,
      offersSent: 1,
      approvedOffers: 1,
      declinedOffers: 0,
      hiredCandidates: 1
    },
    {
      id: 'POS-006',
      title: 'Vocational Training Coordinator',
      businessUnit: 'Education Sector',
      unitType: 'sector',
      status: 'published',
      requestedDate: '2025-01-20',
      approvedDate: '2025-01-25',
      publishedDate: '2025-02-01',
      closingDate: '2025-03-01',
      positions: 2,
      appliedCandidates: 38,
      shortlistedCandidates: 10,
      interviewedCandidates: 6,
      selectedCandidates: 2,
      offersSent: 2,
      approvedOffers: 1,
      declinedOffers: 1,
      hiredCandidates: 1
    }
  ];

  // Enhanced mock data for education-related candidates with CV details
  const candidates: Candidate[] = [
    {
      id: 'CAND-001',
      name: 'Dr. Ahmed Al-Mansouri',
      position: 'Education Program Manager',
      businessUnit: 'Education Sector',
      unitType: 'sector',
      stage: 'hired',
      stageDate: '2025-01-25',
      email: 'ahmed.almansouri@example.com',
      phone: '+212-555-0123',
      experience: '8 years in educational program management',
      education: 'PhD in Educational Leadership, University of Rabat',
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
      ]
    },
    {
      id: 'CAND-002',
      name: 'Prof. Fatima Al-Zahra',
      position: 'Education Program Manager',
      businessUnit: 'Education Sector',
      unitType: 'sector',
      stage: 'offer_approved',
      stageDate: '2025-01-24',
      email: 'fatima.alzahra@example.com',
      phone: '+966-555-0124',
      experience: '12 years in curriculum development',
      education: 'PhD in Educational Sciences, King Saud University',
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
      ]
    },
    {
      id: 'CAND-003',
      name: 'Dr. Omar Al-Kindi',
      position: 'Curriculum Development Specialist',
      businessUnit: 'Education Sector',
      unitType: 'sector',
      stage: 'hired',
      stageDate: '2025-01-23',
      email: 'omar.alkindi@example.com',
      phone: '+971-555-0125',
      experience: '6 years in curriculum design',
      education: 'Master in Educational Technology, UAE University',
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
      ]
    },
    {
      id: 'CAND-004',
      name: 'Ms. Aisha Hassan',
      position: 'Educational Technology Coordinator',
      businessUnit: 'Education Sector',
      unitType: 'sector',
      stage: 'selected',
      stageDate: '2025-01-22',
      email: 'aisha.hassan@example.com',
      phone: '+20-555-0126',
      experience: '5 years in educational technology',
      education: 'Master in Educational Technology, Cairo University',
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
      ]
    },
    {
      id: 'CAND-005',
      name: 'Dr. Khalil Al-Rashid',
      position: 'Early Childhood Education Specialist',
      businessUnit: 'Education Sector',
      unitType: 'sector',
      stage: 'hired',
      stageDate: '2025-01-20',
      email: 'khalil.alrashid@example.com',
      phone: '+965-555-0127',
      experience: '10 years in early childhood education',
      education: 'PhD in Early Childhood Development, Kuwait University',
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
      ]
    }
  ];

  const filterDataByDate = (data: any[]) => {
    if (selectedYear === 'all') return data;
    return data.filter(item => new Date(item.requestedDate || item.stageDate).getFullYear() === parseInt(selectedYear));
  };

  // Filter for sectors only
  const filteredPositions = filterDataByDate(positions.filter(p => p.unitType === 'sector'));
  const filteredCandidates = filterDataByDate(candidates.filter(c => c.unitType === 'sector'));

  // Calculate KPIs for sectors only
  const calculateKPIs = () => {
    const totalRequested = filteredPositions.length;
    const totalApproved = filteredPositions.filter(p => p.status === 'approved' || p.status === 'published').length;
    const totalPublished = filteredPositions.filter(p => p.status === 'published').length;
    const totalApplied = filteredCandidates.length;
    const totalShortlisted = filteredCandidates.filter(c => ['shortlisted', 'interviewed', 'selected', 'offer_sent', 'offer_approved', 'offer_declined', 'hired'].includes(c.stage)).length;
    const totalInterviewed = filteredCandidates.filter(c => ['interviewed', 'selected', 'offer_sent', 'offer_approved', 'offer_declined', 'hired'].includes(c.stage)).length;
    const totalSelected = filteredCandidates.filter(c => ['selected', 'offer_sent', 'offer_approved', 'offer_declined', 'hired'].includes(c.stage)).length;
    const totalOffersSent = filteredCandidates.filter(c => ['offer_sent', 'offer_approved', 'offer_declined', 'hired'].includes(c.stage)).length;
    const totalApprovedOffers = filteredCandidates.filter(c => ['offer_approved', 'hired'].includes(c.stage)).length;
    const totalDeclinedOffers = filteredCandidates.filter(c => c.stage === 'offer_declined').length;
    const totalHired = filteredCandidates.filter(c => c.stage === 'hired').length;

    return [
      { title: 'Applied Candidates', value: totalApplied, icon: Users, description: 'Total applications received' },
      { title: 'Shortlisted Candidates', value: totalShortlisted, icon: UserCheck, description: 'Candidates shortlisted' },
      { title: 'Interviewed Candidates', value: totalInterviewed, icon: Award, description: 'Candidates interviewed' },
      { title: 'Selected Candidates', value: totalSelected, icon: CheckCircle, description: 'Candidates selected' },
      { title: 'Offers Sent', value: totalOffersSent, icon: FileText, description: 'Job offers sent' },
      { title: 'Approved Offers', value: totalApprovedOffers, icon: UserCheck, description: 'Offers accepted' },
      { title: 'Declined Offers', value: totalDeclinedOffers, icon: UserX, description: 'Offers declined' },
      { title: 'Hired Candidates', value: totalHired, icon: Award, description: 'Successfully hired' }
    ];
  };

  const kpiCards = calculateKPIs();

  // Pagination logic
  const filteredCandidatesForTable = filteredCandidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.businessUnit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCandidatesForTable.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCandidates = filteredCandidatesForTable.slice(startIndex, endIndex);

  const getStageColor = (stage: string) => {
    const colorMap: { [key: string]: string } = {
      'applied': 'bg-blue-100 text-blue-800',
      'shortlisted': 'bg-yellow-100 text-yellow-800',
      'interviewed': 'bg-purple-100 text-purple-800',
      'selected': 'bg-orange-100 text-orange-800',
      'offer_sent': 'bg-indigo-100 text-indigo-800',
      'offer_approved': 'bg-green-100 text-green-800',
      'offer_declined': 'bg-red-100 text-red-800',
      'hired': 'bg-green-100 text-green-800'
    };
    return colorMap[stage] || 'bg-gray-100 text-gray-800';
  };

  const getUnitTypeIcon = (unitType: string) => {
    switch (unitType) {
      case 'sector':
        return <Target className="h-4 w-4" />;
      case 'center':
        return <Building className="h-4 w-4" />;
      case 'support':
        return <Settings className="h-4 w-4" />;
      default:
        return <Building className="h-4 w-4" />;
    }
  };

  const handleViewCV = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsCVModalOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <DashboardHeader
        title="BU Manpower Management"
        description="Manage recruitment for Education Sector"
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />

      {/* Education Sector Overview KPI Cards */}
      <DashboardSection
        title="Education Sector Overview"
        description="Key metrics for Education Sector"
        icon={Target}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {kpiCards.map((card, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <card.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
                  <p className="text-2xl font-bold">{card.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </DashboardSection>

      {/* Candidates Data Table */}
      <DashboardSection
        title="Candidates Data"
        description="Detailed view of all candidates in Education Sector"
        icon={Users}
      >
        {/* Search */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search candidates by name, position, or business unit..."
              className="w-full pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Candidates Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Business Unit</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>University</TableHead>
                  <TableHead>Application Status</TableHead>
                  <TableHead>Application Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentCandidates.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground h-24">
                      No candidates found.
                    </TableCell>
                  </TableRow>
                ) : (
                  currentCandidates.map((candidate) => (
                    <TableRow key={candidate.id}>
                      <TableCell className="font-medium">{candidate.name}</TableCell>
                      <TableCell>{candidate.position}</TableCell>
                      <TableCell>{candidate.businessUnit}</TableCell>
                      <TableCell>{candidate.experience}</TableCell>
                      <TableCell>{candidate.education}</TableCell>
                      <TableCell>
                        <Badge className={getStageColor(candidate.stage)}>
                          {candidate.stage.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Badge>
                      </TableCell>
                      <TableCell>{format(new Date(candidate.stageDate), 'MMM d, yyyy')}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewCV(candidate)}
                          className="text-primary hover:text-primary"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View CV
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredCandidatesForTable.length)} of {filteredCandidatesForTable.length} candidates
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
      </DashboardSection>

      {/* CV Modal */}
      <Dialog open={isCVModalOpen} onOpenChange={setIsCVModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader className="border-b pb-4">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold">
                Candidate CV - {selectedCandidate?.name}
              </DialogTitle>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download CV
              </Button>
            </div>
          </DialogHeader>
          
          <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6">
            {selectedCandidate && (
              <div className="space-y-6">
                {/* Header Section */}
                <div className="flex items-start space-x-6">
                  <div className="w-24 h-24 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">
                      {selectedCandidate.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-foreground">{selectedCandidate.name}</h2>
                    <p className="text-lg text-muted-foreground mb-3">{selectedCandidate.position}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedCandidate.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedCandidate.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedCandidate.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Applied: {format(new Date(selectedCandidate.appliedDate), 'MMM d, yyyy')}</span>
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
                  <p className="text-muted-foreground leading-relaxed">{selectedCandidate.summary}</p>
                </div>

                {/* Skills & Languages */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Core Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCandidate.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCandidate.languages.map((language, index) => (
                        <Badge key={index} variant="outline">{language}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Work Experience */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <Briefcase className="h-5 w-5 mr-2 text-primary" />
                    Work Experience
                  </h3>
                  <div className="space-y-4">
                    {selectedCandidate.workExperience.map((job, index) => (
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
                    {selectedCandidate.qualifications.map((edu, index) => (
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
                        <Badge className={getStageColor(selectedCandidate.stage)}>
                          {selectedCandidate.stage.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Stage Date:</span>
                      <p className="font-medium mt-1">{format(new Date(selectedCandidate.stageDate), 'MMMM d, yyyy')}</p>
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

export default BUManpowerManagement;