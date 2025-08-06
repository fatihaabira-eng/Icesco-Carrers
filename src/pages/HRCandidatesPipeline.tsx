import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  Search, 
  Filter,
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
import CandidatePipeline from '@/components/CandidatePipeline';

interface Candidate {
  id: string;
  name: string;
  position: string;
  department: string;
  status: 'new' | 'under_review' | 'interview' | 'offer' | 'hired' | 'rejected';
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

const HRCandidatesPipeline: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [dateRange, setDateRange] = useState('year');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  // Mock candidate data
  const candidates: Candidate[] = [
    {
      id: 'CAND-001',
      name: 'Ahmed Hassan El-Masri',
      position: 'Senior Software Engineer',
      department: 'Digital Transformation',
      status: 'interview',
      score: 95,
      appliedDate: '2024-01-15',
      email: 'ahmed.elmasri@email.com',
      phone: '+212-6-1234-5678',
      location: 'Rabat, Morocco',
      nationality: 'Moroccan',
      experience: '8 years',
      skills: ['React', 'Node.js', 'Python', 'AI/ML'],
      education: 'PhD Computer Science - Cairo University',
      year: 2024,
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
      department: 'Communications',
      status: 'offer',
      score: 92,
      appliedDate: '2024-01-14',
      email: 'fatima.benali@email.com',
      phone: '+212-6-8765-4321',
      location: 'Casablanca, Morocco',
      nationality: 'Moroccan',
      experience: '6 years',
      skills: ['Digital Marketing', 'Strategy', 'Analytics'],
      education: 'Master Marketing - Mohammed V University',
      year: 2024,
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
      department: 'Education',
      status: 'hired',
      score: 89,
      appliedDate: '2024-01-13',
      email: 'omar.alrashid@email.com',
      phone: '+212-6-5555-1234',
      location: 'Amman, Jordan',
      nationality: 'Jordanian',
      experience: '10 years',
      skills: ['Program Management', 'Educational Design', 'Leadership'],
      education: 'PhD Education - University of Jordan',
      year: 2024,
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
      department: 'Finance',
      status: 'new',
      score: 87,
      appliedDate: '2024-01-20',
      email: 'sarah.johnson@email.com',
      phone: '+1-555-123-4567',
      location: 'New York, USA',
      nationality: 'American',
      experience: '5 years',
      skills: ['Financial Analysis', 'Excel', 'SAP'],
      education: 'MBA Finance - Harvard University',
      year: 2024,
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
    },
    {
      id: 'CAND-005',
      name: 'Mohammed Al-Zahra',
      position: 'Research Coordinator',
      department: 'Research',
      status: 'under_review',
      score: 91,
      appliedDate: '2024-01-18',
      email: 'mohammed.alzahra@email.com',
      phone: '+966-5-1234-5678',
      location: 'Riyadh, Saudi Arabia',
      nationality: 'Saudi',
      experience: '7 years',
      skills: ['Research', 'Data Analysis', 'Project Management'],
      education: 'PhD Research Methods - King Saud University',
      year: 2024,
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      aiScreeningScore: 87,
      aiRecommendations: [
        'Strong research background',
        'Excellent analytical skills',
        'Good project management experience',
        'Relevant international experience'
      ],
      resumeData: {
        extractedSkills: ['Research Methods', 'Data Analysis', 'Project Management', 'Statistical Analysis', 'Report Writing'],
        workExperience: [
          'Senior Research Coordinator at Research Institute (2020-2024)',
          'Research Analyst at University (2018-2020)',
          'Research Assistant at NGO (2016-2018)'
        ],
        education: [
          'PhD Research Methods - King Saud University (2018)',
          'Master Statistics - American University (2016)',
          'Bachelor Mathematics - King Fahd University (2014)'
        ],
        certifications: [
          'Project Management Professional (PMP)',
          'Statistical Analysis Certification',
          'Research Ethics Certification'
        ],
        languages: ['Arabic (Native)', 'English (Fluent)', 'French (Intermediate)'],
        parsedDate: '2024-01-18T14:30:00Z'
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
    candidate.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate KPIs
  const totalCandidates = filteredCandidates.length;
  const activeApplications = filteredCandidates.filter(c => ['new', 'under_review', 'interview', 'offer'].includes(c.status)).length;
  const interviewScheduled = filteredCandidates.filter(c => c.status === 'interview').length;
  const hired = filteredCandidates.filter(c => c.status === 'hired').length;

  const kpiCards = [
    {
      title: 'Total Candidates',
      value: totalCandidates,
      icon: Users,
      description: 'All applications received'
    },
    {
      title: 'Active Applications',
      value: activeApplications,
      icon: UserCheck,
      description: 'In progress applications'
    },
    {
      title: 'Interviews Scheduled',
      value: interviewScheduled,
      icon: Calendar,
      description: 'Candidates in interview phase'
    },
    {
      title: 'Hired',
      value: hired,
      icon: Award,
      description: 'Successfully hired candidates'
    }
  ];

  const handleViewProfile = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleCloseProfile = () => {
    setSelectedCandidate(null);
  };

  const handleStatusChange = (candidateId: string, newStatus: string, reason?: string) => {
    // Update the candidate status
    console.log(`Updating candidate ${candidateId} to status ${newStatus}${reason ? ` with reason: ${reason}` : ''}`);
    // In a real app, this would update the backend and refresh the data
  };

  return (
    <div className="space-y-8">
      {/* Candidate Profile Modal */}
      {selectedCandidate && (
        <CandidateProfile
          candidate={selectedCandidate}
          onClose={handleCloseProfile}
          onStatusChange={handleStatusChange}
        />
      )}

      {/* Header */}
      <DashboardHeader
        title="Candidate Pipeline"
        description="Visual pipeline view of candidates through the recruitment process"
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />

      {/* KPI Cards */}
      <DashboardSection
        title="Pipeline Overview"
        description="Key metrics for candidate pipeline management"
        icon={Users}
      >
        <KPICards cards={kpiCards} />
      </DashboardSection>

      {/* Pipeline View */}
      <DashboardSection
        title="Pipeline Management"
        description="Drag and drop candidates through recruitment stages"
        icon={Users}
      >
        {/* Search and Filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search candidates..."
              className="w-full pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Pipeline Component */}
        <CandidatePipeline
          candidates={filteredCandidates}
          onViewProfile={handleViewProfile}
          onStatusChange={handleStatusChange}
        />
      </DashboardSection>
    </div>
  );
};

export default HRCandidatesPipeline; 