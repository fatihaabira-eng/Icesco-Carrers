import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Briefcase,
  Search,
  Eye,
  Download,
  FileText,
  Calendar,
  MapPin,
  Clock,
  Building,
  Users,
  DollarSign,
  Mail,
  Phone,
  GraduationCap,
  Star
} from 'lucide-react';
import { format } from 'date-fns';

// Enhanced data structure to include candidate information
interface JobOffer {
  id: number;
  reference: string;
  jobTitle: string;
  closingDate: string;
  bu: string;
  location: string;
  publishedDate: string;
  positions: number;
  status: string;
  shortlisted: number;
  applied: number;
  hired: number;
  rejected: number;
  description: string;
  candidates?: Candidate[];
}

interface Candidate {
  id: string;
  name: string;
  position: string;
  businessUnit: string;
  stage: string;
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

// Sample candidates data
const sampleCandidates: Candidate[] = [
  {
    id: 'CAND-001',
    name: 'Dr. Ahmed Al-Mansouri',
    position: 'Senior Frontend Developer',
    businessUnit: 'Technology',
    stage: 'hired',
    stageDate: '2025-01-25',
    email: 'ahmed.almansouri@example.com',
    phone: '+212-555-0123',
    experience: '8 years in software development',
    education: 'PhD in Computer Science, University of Rabat',
    location: 'Rabat, Morocco',
    appliedDate: '2025-01-15',
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
    languages: ['Arabic (Native)', 'French (Fluent)', 'English (Advanced)'],
    summary: 'Experienced software developer with 8+ years in full-stack development. Proven track record in building scalable web applications.',
    workExperience: [
      {
        company: 'Tech Solutions Inc.',
        position: 'Senior Frontend Developer',
        duration: '2020 - Present',
        description: 'Led frontend development team, implemented modern React applications, and improved performance by 40%.'
      },
      {
        company: 'Digital Innovations',
        position: 'Full Stack Developer',
        duration: '2017 - 2020',
        description: 'Developed full-stack applications using React, Node.js, and MongoDB. Collaborated with cross-functional teams.'
      }
    ],
    qualifications: [
      {
        degree: 'PhD in Computer Science',
        institution: 'University of Rabat',
        year: '2017',
        grade: 'Magna Cum Laude'
      },
      {
        degree: 'Master in Software Engineering',
        institution: 'Mohammed V University',
        year: '2014',
        grade: 'Distinction'
      }
    ]
  },
  {
    id: 'CAND-002',
    name: 'Sarah Johnson',
    position: 'Product Manager',
    businessUnit: 'Product',
    stage: 'shortlisted',
    stageDate: '2025-01-20',
    email: 'sarah.johnson@example.com',
    phone: '+1-555-0124',
    experience: '6 years in product management',
    education: 'MBA in Business Administration, Stanford University',
    location: 'San Francisco, USA',
    appliedDate: '2025-01-10',
    skills: ['Product Strategy', 'Agile', 'Data Analysis', 'User Research', 'Roadmapping'],
    languages: ['English (Native)', 'Spanish (Fluent)'],
    summary: 'Results-driven product manager with 6+ years of experience in leading cross-functional teams and delivering successful products.',
    workExperience: [
      {
        company: 'Product Innovations',
        position: 'Senior Product Manager',
        duration: '2021 - Present',
        description: 'Led product strategy for B2B SaaS platform, increased user engagement by 60% and revenue by 45%.'
      },
      {
        company: 'StartupCorp',
        position: 'Product Manager',
        duration: '2019 - 2021',
        description: 'Managed product roadmap, conducted user research, and coordinated with engineering teams for product launches.'
      }
    ],
    qualifications: [
      {
        degree: 'MBA in Business Administration',
        institution: 'Stanford University',
        year: '2019',
        grade: 'Distinction'
      },
      {
        degree: 'Bachelor in Computer Science',
        institution: 'UC Berkeley',
        year: '2017',
        grade: 'Magna Cum Laude'
      }
    ]
  }
];

const offersData: JobOffer[] = [
  {
    id: 1,
    reference: "shs25003",
    jobTitle: "Senior Frontend Developer",
    closingDate: "2025-02-15",
    bu: "Technology",
    location: "New York",
    publishedDate: "2025-01-15",
    positions: 2,
    status: "Active",
    shortlisted: 12,
    applied: 45,
    hired: 1,
    rejected: 8,
    description: "We are seeking a Senior Frontend Developer to join our dynamic technology team. The ideal candidate will have extensive experience in React, TypeScript, and modern web development practices.",
    candidates: [sampleCandidates[0]]
  },
  {
    id: 2,
    reference: "shs25004",
    jobTitle: "Product Manager",
    closingDate: "2025-02-20",
    bu: "Product",
    location: "San Francisco",
    publishedDate: "2025-01-10",
    positions: 1,
    status: "Active",
    shortlisted: 8,
    applied: 32,
    hired: 0,
    rejected: 5,
    description: "Looking for an experienced Product Manager to drive product strategy and execution. Must have strong analytical skills and experience with agile methodologies.",
    candidates: [sampleCandidates[1]]
  },
  {
    id: 3,
    reference: "shs25005",
    jobTitle: "UX Designer",
    closingDate: "2025-01-30",
    bu: "Design",
    location: "Remote",
    publishedDate: "2025-01-05",
    positions: 1,
    status: "Closed",
    shortlisted: 15,
    applied: 67,
    hired: 1,
    rejected: 12,
    description: "We need a creative UX Designer to enhance user experience across our digital products. Experience with design systems and user research is essential.",
    candidates: []
  },
  {
    id: 4,
    reference: "shs25006",
    jobTitle: "Data Scientist",
    closingDate: "2025-03-01",
    bu: "Technology",
    location: "Austin",
    publishedDate: "2025-02-01",
    positions: 1,
    status: "Draft",
    shortlisted: 0,
    applied: 0,
    hired: 0,
    rejected: 0,
    description: "Join our data science team to develop machine learning models and drive data-driven insights. PhD in relevant field preferred.",
    candidates: []
  }
];

const BUOffers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<JobOffer | null>(null);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  const filteredOffers = offersData.filter((offer) => {
    const matchesSearch = 
      offer.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.bu.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || offer.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesDepartment = departmentFilter === "all" || offer.bu.toLowerCase() === departmentFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'Closed':
        return <Badge className="bg-red-100 text-red-800">Closed</Badge>;
      case 'Draft':
        return <Badge className="bg-yellow-100 text-yellow-800">Draft</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

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

  const handleViewDetails = (offer: JobOffer) => {
    setSelectedOffer(offer);
    setIsDetailsModalOpen(true);
  };

  const handleViewCV = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsCVModalOpen(true);
  };

  // Generate unique departments for filter
  const uniqueDepartments = Array.from(new Set(offersData.map(offer => offer.bu)));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Positions</h1>
          <p className="text-muted-foreground">
            Manage and track all job postings
          </p>
        </div>
        
      </div>

     

      {/* Job Offers Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">All Job Positions</CardTitle>
              <p className="text-sm text-muted-foreground">
                View and manage job postings
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
                  placeholder="Search offers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>

              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {uniqueDepartments.map(dept => (
                    <SelectItem key={dept} value={dept.toLowerCase()}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Job Offers Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Reference</TableHead>
                  <TableHead className="font-semibold">Job Title</TableHead>
                  <TableHead className="font-semibold">Department</TableHead>
                  <TableHead className="font-semibold">Location</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Applicants</TableHead>
                  <TableHead className="font-semibold">Posted Date</TableHead>
                  <TableHead className="font-semibold">Closing Date</TableHead>
                  <TableHead className="font-semibold text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOffers.map((offer) => (
                  <TableRow key={offer.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-mono text-sm text-primary font-medium">
                      {offer.reference}
                    </TableCell>
                    <TableCell className="font-medium">{offer.jobTitle}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span>{offer.bu}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{offer.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(offer.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{offer.applied}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{offer.publishedDate}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{offer.closingDate}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-primary hover:text-primary"
                          onClick={() => handleViewDetails(offer)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredOffers.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Briefcase className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
              <p>No job offers found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Job Details Modal */}
     <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
  <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
    <DialogHeader className="border-b pb-4">
      <div className="flex items-center justify-between">
        <DialogTitle className="text-xl font-bold">
          Candidate CV - Dr. Ahmed Al-Mansouri
        </DialogTitle>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Download CV
        </Button>
      </div>
    </DialogHeader>
    
    <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-start space-x-6">
          <div className="w-24 h-24 bg-primary/10 rounded-lg flex items-center justify-center">
            <span className="text-2xl font-bold text-primary">
              DA
            </span>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground">Dr. Ahmed Al-Mansouri</h2>
            <p className="text-lg text-muted-foreground mb-3">Education Program Manager</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>ahmed.almansouri@example.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>+212-555-0123</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>Rabat, Morocco</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Applied: Jan 15, 2025</span>
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
          <p className="text-muted-foreground leading-relaxed">
            Experienced education professional with 8+ years in program management and educational leadership. 
            Proven track record in developing and implementing educational initiatives across multiple countries 
            in the MENA region. Expert in curriculum development, stakeholder management, and strategic planning 
            for educational reform programs.
          </p>
        </div>

        {/* Skills & Languages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Core Skills</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Educational Leadership</Badge>
              <Badge variant="secondary">Program Management</Badge>
              <Badge variant="secondary">Curriculum Development</Badge>
              <Badge variant="secondary">Team Leadership</Badge>
              <Badge variant="secondary">Strategic Planning</Badge>
              <Badge variant="secondary">Project Management</Badge>
              <Badge variant="secondary">Stakeholder Management</Badge>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Languages</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Arabic (Native)</Badge>
              <Badge variant="outline">French (Fluent)</Badge>
              <Badge variant="outline">English (Advanced)</Badge>
              <Badge variant="outline">Spanish (Intermediate)</Badge>
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
            <div className="border-l-2 border-primary/20 pl-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-foreground">Senior Education Program Coordinator</h4>
                  <p className="text-primary font-medium">Ministry of Education, Morocco</p>
                </div>
                <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                  2020 - Present
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Led educational reform initiatives across 15 regions, managed cross-functional teams of 25+ professionals, 
                and developed comprehensive curriculum frameworks for secondary education. Successfully implemented digital 
                learning solutions reaching over 50,000 students.
              </p>
            </div>
            
            <div className="border-l-2 border-primary/20 pl-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-foreground">Education Program Officer</h4>
                  <p className="text-primary font-medium">UNESCO Regional Office</p>
                </div>
                <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                  2017 - 2020
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Coordinated international education programs across North Africa, facilitated high-level stakeholder 
                meetings with government officials, and conducted comprehensive program evaluations. Managed a budget 
                of $2.5M and delivered training to 500+ educators.
              </p>
            </div>

            <div className="border-l-2 border-primary/20 pl-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-foreground">Education Specialist</h4>
                  <p className="text-primary font-medium">World Bank Group</p>
                </div>
                <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                  2015 - 2017
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Developed educational policy recommendations for emerging economies, conducted field research in 8 countries, 
                and authored 12 policy briefs on education reform. Collaborated with international development partners 
                on capacity building initiatives.
              </p>
            </div>
          </div>
        </div>

        {/* Education */}
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <GraduationCap className="h-5 w-5 mr-2 text-primary" />
            Education & Qualifications
          </h3>
          <div className="space-y-4">
            <div className="border-l-2 border-primary/20 pl-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-foreground">PhD in Educational Leadership</h4>
                  <p className="text-primary font-medium">University of Rabat</p>
                </div>
                <div className="text-right">
                  <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded block mb-1">
                    2017
                  </span>
                  <span className="text-xs text-green-600 font-medium">Magna Cum Laude</span>
                </div>
              </div>
            </div>

            <div className="border-l-2 border-primary/20 pl-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-foreground">Master in Education Management</h4>
                  <p className="text-primary font-medium">Mohammed V University</p>
                </div>
                <div className="text-right">
                  <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded block mb-1">
                    2014
                  </span>
                  <span className="text-xs text-green-600 font-medium">Distinction</span>
                </div>
              </div>
            </div>

            <div className="border-l-2 border-primary/20 pl-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-foreground">Bachelor in Educational Sciences</h4>
                  <p className="text-primary font-medium">Hassan II University</p>
                </div>
                <div className="text-right">
                  <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded block mb-1">
                    2012
                  </span>
                  <span className="text-xs text-green-600 font-medium">First Class Honors</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Application Status */}
        <div className="bg-muted/50 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Application Status</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Current Stage:</span>
              <div className="mt-1">
                <Badge className="bg-green-100 text-green-800">
                  Hired
                </Badge>
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">Stage Date:</span>
              <p className="font-medium mt-1">January 25, 2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DialogContent>
</Dialog>

     
    </div>
  );
};

export default BUOffers;