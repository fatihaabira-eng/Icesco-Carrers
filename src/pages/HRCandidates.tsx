import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Users, 
  Search, 
  Filter,
  Plus,
  Eye,
  MessageSquare,
  Calendar,
  UserCheck,
  Clock,
  Target,
  Award,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { format } from 'date-fns';
import DashboardHeader from '@/components/DashboardHeader';
import KPICards from '@/components/KPICards';
import DashboardSection from '@/components/DashboardSection';
import CandidateProfile from '@/components/CandidateProfile';

interface Candidate {
  id: string;
  name: string;
  position: string;
  businessUnit: string;
  status: 'new' | 'shortlisted' | 'technical_interview' | 'negotiation_salary' | 'committee_interview' | 'rejected_by_icesco' | 'declined_by_candidate';
  score: number;
  appliedDate: string;
  avatar?: string;
  email: string;
  phone: string;
  location: string;
  nationality: string;
  experience: string;
  skills: string[];
  education: string;
  year: number;
  videoUrl?: string;
  aiScreeningScore: number;
  aiRecommendations: string[];
  resumeUrl?: string;
  resumeData?: {
    extractedSkills: string[];
    workExperience: string[];
    education: string[];
    certifications: string[];
    languages: string[];
    parsedDate: string;
  };
}

const stages = [
  { id: 'new', title: 'New', color: 'bg-gray-100 text-gray-800' },
  { id: 'shortlisted', title: 'Shortlisted', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'technical_interview', title: 'Technical Interview', color: 'bg-blue-100 text-blue-800' },
  { id: 'negotiation_salary', title: 'Negotiation Salary', color: 'bg-purple-100 text-purple-800' },
  { id: 'committee_interview', title: 'Committee Interview', color: 'bg-teal-100 text-teal-800' },
  { id: 'rejected_by_icesco', title: 'Rejected by ICESCO', color: 'bg-red-100 text-red-800' },
  { id: 'declined_by_candidate', title: 'Declined by Candidate', color: 'bg-orange-100 text-orange-800' },
] as const;

const HRCandidates: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2025');
  const [dateRange, setDateRange] = useState('year');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCandidate, setExpandedCandidate] = useState<string | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  // Mock candidate data with avatar images
  const candidates: Candidate[] = [
    {
      id: 'CAND-001',
      name: 'Ahmed Hassan El-Masri',
      position: 'Senior Software Engineer',
      businessUnit: 'Digital Transformation',
      status: 'technical_interview',
      score: 95,
      appliedDate: '2025-01-15',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      email: 'ahmed.elmasri@email.com',
      phone: '+212-6-1234-5678',
      location: 'Rabat, Morocco',
      nationality: 'Moroccan',
      experience: '8 years',
      skills: ['React', 'Node.js', 'Python', 'AI/ML'],
      education: 'PhD Computer Science - Cairo University',
      year: 2025,
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      aiScreeningScore: 92,
      aiRecommendations: [
        'Strong technical background',
        'Excellent communication skills',
        'Relevant experience in educational technology',
        'Good cultural fit for ICESCO'
      ],
      resumeData: {
        extractedSkills: ['JavaScript', 'React', 'Node.js', 'Python', 'Machine Learning', 'AWS', 'Docker', 'Git'],
        workExperience: [
          'Senior Software Engineer at TechCorp (2020-2024)',
          'Full Stack Developer at StartupXYZ (2018-2020)',
          'Software Engineer at BigTech Inc (2016-2018)'
        ],
        education: [
          'PhD Computer Science - Cairo University (2016)',
          'MSc Software Engineering - Alexandria University (2014)',
          'BSc Computer Science - Ain Shams University (2012)'
        ],
        certifications: [
          'AWS Certified Solutions Architect',
          'Google Cloud Professional Developer',
          'Microsoft Azure Developer Associate'
        ],
        languages: ['Arabic (Native)', 'English (Fluent)', 'French (Intermediate)'],
        parsedDate: '2024-01-15T12:00:00Z'
      }
    },
    {
      id: 'CAND-002',
      name: 'Fatima Al-Zahra Benali',
      position: 'Marketing Manager',
      businessUnit: 'Communications',
      status: 'negotiation_salary',
      score: 92,
      appliedDate: '2025-01-14',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      email: 'fatima.benali@email.com',
      phone: '+212-6-8765-4321',
      location: 'Casablanca, Morocco',
      nationality: 'Moroccan',
      experience: '6 years',
      skills: ['Digital Marketing', 'Strategy', 'Analytics'],
      education: 'Master Marketing - Mohammed V University',
      year: 2025,
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      aiScreeningScore: 88,
      aiRecommendations: [
        'Strong marketing expertise',
        'Excellent analytical skills',
        'Good understanding of MENA market',
        'Leadership potential'
      ],
      resumeData: {
        extractedSkills: ['Digital Marketing', 'Social Media Marketing', 'Google Analytics', 'SEO', 'Content Strategy', 'Brand Management'],
        workExperience: [
          'Marketing Manager at BrandAgency (2021-2024)',
          'Digital Marketing Specialist at E-commerceCo (2019-2021)',
          'Marketing Assistant at RetailCorp (2018-2019)'
        ],
        education: [
          'Master Marketing - Mohammed V University (2018)',
          'Bachelor Business Administration - Hassan II University (2016)'
        ],
        certifications: [
          'Google Ads Certification',
          'Facebook Blueprint Certification',
          'HubSpot Marketing Certification'
        ],
        languages: ['Arabic (Native)', 'English (Fluent)', 'French (Fluent)'],
        parsedDate: '2024-01-14T11:30:00Z'
      }
    },
    {
      id: 'CAND-003',
      name: 'Omar Khalil Al-Rashid',
      position: 'Education Program Manager',
      businessUnit: 'Education',
      status: 'committee_interview',
      score: 89,
      appliedDate: '2025-01-13',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      email: 'omar.alrashid@email.com',
      phone: '+212-6-5555-1234',
      location: 'Amman, Jordan',
      nationality: 'Jordanian',
      experience: '10 years',
      skills: ['Program Management', 'Educational Design', 'Leadership'],
      education: 'PhD Education - University of Jordan',
      year: 2025,
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      aiScreeningScore: 85,
      aiRecommendations: [
        'Extensive education experience',
        'Strong program management skills',
        'Excellent stakeholder management',
        'Proven track record in educational reform'
      ],
      resumeData: {
        extractedSkills: ['Program Management', 'Curriculum Development', 'Educational Technology', 'Stakeholder Management', 'Project Planning'],
        workExperience: [
          'Education Program Director at UNESCO (2020-2024)',
          'Senior Education Consultant at World Bank (2018-2020)',
          'Education Program Manager at NGO (2016-2018)'
        ],
        education: [
          'PhD Education - University of Jordan (2016)',
          'Master Educational Leadership - American University (2014)',
          'Bachelor Education - Jordan University (2012)'
        ],
        certifications: [
          'PMP Certification',
          'Educational Leadership Certification',
          'Curriculum Design Certification'
        ],
        languages: ['Arabic (Native)', 'English (Fluent)', 'French (Intermediate)'],
        parsedDate: '2024-01-13T10:15:00Z'
      }
    },
    {
      id: 'CAND-004',
      name: 'Sarah Johnson',
      position: 'Financial Analyst',
      businessUnit: 'Finance',
      status: 'new',
      score: 87,
      appliedDate: '2025-01-20',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
      email: 'sarah.johnson@email.com',
      phone: '+1-555-123-4567',
      location: 'New York, USA',
      nationality: 'American',
      experience: '5 years',
      skills: ['Financial Analysis', 'Excel', 'SAP'],
      education: 'MBA Finance - Harvard University',
      year: 2025,
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      aiScreeningScore: 83,
      aiRecommendations: [
        'Strong financial background',
        'Excellent analytical skills',
        'International experience',
        'Good technical skills'
      ],
      resumeData: {
        extractedSkills: ['Financial Analysis', 'Excel', 'SAP', 'Budgeting', 'Financial Modeling', 'Risk Assessment'],
        workExperience: [
          'Financial Analyst at Fortune500 (2021-2024)',
          'Junior Analyst at InvestmentBank (2019-2021)',
          'Finance Intern at ConsultingFirm (2018-2019)'
        ],
        education: [
          'MBA Finance - Harvard University (2019)',
          'Bachelor Economics - Stanford University (2017)'
        ],
        certifications: [
          'CFA Level 1',
          'Excel Expert Certification',
          'SAP Financials Certification'
        ],
        languages: ['English (Native)', 'Spanish (Intermediate)'],
        parsedDate: '2024-01-20T09:45:00Z'
      }
    }
  ];

  // Filter data based on selected year
  const filterDataByDate = (data: Candidate[]) => {
    if (selectedYear === 'all') return data;
    return data.filter(item => item.year === parseInt(selectedYear));
  };

  const filteredCandidates = filterDataByDate(candidates).filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.businessUnit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate KPIs
  const totalCandidates = filteredCandidates.length;
  const activeApplications = filteredCandidates.filter(c => ['new', 'shortlisted', 'technical_interview', 'negotiation_salary', 'committee_interview'].includes(c.status)).length;
  const interviewScheduled = filteredCandidates.filter(c => ['technical_interview', 'committee_interview'].includes(c.status)).length;
  const hired = filteredCandidates.filter(c => c.status === 'committee_interview').length;

  const kpiCards = [
    {
      title: 'Active Published Positions',
      value: totalCandidates,
      icon: Users,
      description: 'All applications received'
    },
    {
      title: 'Applied Candidates',
      value: activeApplications,
      icon: UserCheck,
      description: 'In progress applications'
    },
    {
      title: 'Shortlisted for Interviews',
      value: interviewScheduled,
      icon: Calendar,
      description: 'Candidates in interview phase'
    },
    {
      title: 'Scheduled Interviews',
      value: hired,
      icon: Award,
      description: ''
    }
  ];

  const getStatusColor = (status: string) => {
    return stages.find(stage => stage.id === status)?.color || 'bg-gray-100 text-gray-800';
  };

  const handleStageChange = (candidateId: string, newStatus: Candidate['status']) => {
    console.log(`Updating candidate ${candidateId} to status ${newStatus}`);
  };

  const toggleExpanded = (candidateId: string) => {
    setExpandedCandidate(expandedCandidate === candidateId ? null : candidateId);
  };

  const handleViewProfile = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleCloseProfile = () => {
    setSelectedCandidate(null);
  };

  const handleStatusChange = (candidateId: string, newStatus: string, reason?: string) => {
    console.log(`Updating candidate ${candidateId} to status ${newStatus}${reason ? ` with reason: ${reason}` : ''}`);
  };

  return (
    <div className="space-y-8">
      {selectedCandidate && (
        <CandidateProfile
          candidate={selectedCandidate}
          onClose={handleCloseProfile}
          onStatusChange={handleStatusChange}
        />
      )}

      <DashboardHeader
        title="Candidates Overview"
        description="Manage and track candidate applications through the recruitment pipeline"
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />

      <DashboardSection
        title="Candidates Information Management"
        description="Track candidate progress through the recruitment pipeline"
        icon={Users}
      >
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search candidates..."
              className="w-full pl-10 bg-white shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="bg-white shadow-sm hover:bg-gray-50">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-[50px] font-bold text-gray-900"></TableHead>
                  <TableHead className="font-bold text-gray-900">Candidate Name</TableHead>
                  <TableHead className="font-bold text-gray-900">Degree</TableHead>
                  <TableHead className="font-bold text-gray-900">Years of Experience</TableHead>
                  <TableHead className="font-bold text-gray-900">Applied Date</TableHead>
                  <TableHead className="font-bold text-gray-900">Status</TableHead>
                  <TableHead className="font-bold text-gray-900">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCandidates.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-gray-500 py-8">
                      No candidates found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCandidates.map((candidate) => (
                    <React.Fragment key={candidate.id}>
                      <TableRow className="hover:bg-gray-50 transition-colors">
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleExpanded(candidate.id)}
                            aria-label={expandedCandidate === candidate.id ? 'Collapse details' : 'Expand details'}
                          >
                            {expandedCandidate === candidate.id ? (
                              <ChevronUp className="h-4 w-4 text-gray-600" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-gray-600" />
                            )}
                          </Button>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                              {candidate.avatar ? (
                                <img
                                  src={candidate.avatar}
                                  alt={candidate.name}
                                  className="w-10 h-10 rounded-full object-cover"
                                />
                              ) : (
                                <span className="text-sm font-medium text-gray-600">
                                  {candidate.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              )}
                            </div>
                            <div className="font-medium text-gray-700">{candidate.name}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-600">{candidate.education}</TableCell>
                        <TableCell className="text-gray-600">{candidate.experience}</TableCell>
                        <TableCell className="text-gray-600">{format(new Date(candidate.appliedDate), 'PPP')}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(candidate.status)}`}
                          >
                            {stages.find(stage => stage.id === candidate.status)?.title}
                          </span>
                        </TableCell>
                        {/* <TableCell>
                          <Badge className={`${getStatusColor(candidate.status)} bg-opacity-50`}>
                            {candidate.score}%
                          </Badge>
                        </TableCell> */}
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleViewProfile(candidate)}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="text-gray-600 hover:text-gray-900"
                            >
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="text-gray-600 hover:text-gray-900"
                            >
                              <Calendar className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      {expandedCandidate === candidate.id && (
                        <TableRow>
                          <TableCell colSpan={8} className="p-0">
                            <div className="p-4 bg-gray-50">
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div>
                                  <h4 className="font-semibold text-gray-800 mb-2">Contact Information</h4>
                                  <div className="space-y-1 text-sm text-gray-600">
                                    <div><strong>Email:</strong> {candidate.email}</div>
                                    <div><strong>Phone:</strong> {candidate.phone}</div>
                                    <div><strong>Nationality:</strong> {candidate.nationality}</div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-800 mb-2">Education</h4>
                                  <div className="text-sm text-gray-600">{candidate.education}</div>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-800 mb-2">Skills</h4>
                                  <div className="flex flex-wrap gap-1">
                                    {candidate.skills.map((skill, index) => (
                                      <Badge key={index} variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                                        {skill}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </DashboardSection>
    </div>
  );
};

export default HRCandidates;