import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  nationality: string;
  experience: string;
  skills: string[];
  education: string;
  year: number;
}

const stages = [
  { id: 'new', title: 'New Applications', color: 'bg-blue-100' },
  { id: 'under_review', title: 'Under Review', color: 'bg-yellow-100' },
  { id: 'interview', title: 'Interview', color: 'bg-purple-100' },
  { id: 'offer', title: 'Offer', color: 'bg-orange-100' },
  { id: 'hired', title: 'Hired', color: 'bg-green-100' },
  { id: 'rejected', title: 'Rejected', color: 'bg-red-100' },
] as const;

const HRCandidates: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [dateRange, setDateRange] = useState('year');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCandidate, setExpandedCandidate] = useState<string | null>(null);

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
      nationality: 'Moroccan',
      experience: '8 years',
      skills: ['React', 'Node.js', 'Python', 'AI/ML'],
      education: 'PhD Computer Science - Cairo University',
      year: 2024
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
      nationality: 'Moroccan',
      experience: '6 years',
      skills: ['Digital Marketing', 'Strategy', 'Analytics'],
      education: 'Master Marketing - Mohammed V University',
      year: 2024
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
      nationality: 'Jordanian',
      experience: '10 years',
      skills: ['Program Management', 'Educational Design', 'Leadership'],
      education: 'PhD Education - University of Jordan',
      year: 2024
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
      nationality: 'American',
      experience: '5 years',
      skills: ['Financial Analysis', 'Excel', 'SAP'],
      education: 'MBA Finance - Harvard University',
      year: 2024
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'interview':
        return 'bg-blue-100 text-blue-800';
      case 'offer':
        return 'bg-green-100 text-green-800';
      case 'hired':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'new':
        return 'bg-gray-100 text-gray-800';
      case 'under_review':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStageChange = (candidateId: string, newStatus: Candidate['status']) => {
    // In a real app, this would update the backend
    console.log(`Updating candidate ${candidateId} to status ${newStatus}`);
  };

  const toggleExpanded = (candidateId: string) => {
    setExpandedCandidate(expandedCandidate === candidateId ? null : candidateId);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <DashboardHeader
        title="Candidates"
        description="Manage and track candidate applications through the recruitment pipeline"
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        dateRange={dateRange}
        setDateRange={setDateRange}
      >
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Candidate
        </Button>
      </DashboardHeader>

      {/* KPI Cards */}
      <DashboardSection
        title="Candidate Overview"
        description="Key metrics for candidate management and recruitment pipeline"
        icon={Users}
      >
        <KPICards cards={kpiCards} />
      </DashboardSection>

      {/* Candidates Management */}
      <DashboardSection
        title="Candidate Management"
        description="Track candidate progress through the recruitment pipeline"
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

        {/* Candidates Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Applied Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCandidates.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center text-muted-foreground">
                      No candidates found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCandidates.map((candidate) => (
                    <React.Fragment key={candidate.id}>
                      <TableRow>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleExpanded(candidate.id)}
                            aria-label={expandedCandidate === candidate.id ? 'Collapse details' : 'Expand details'}
                          >
                            {expandedCandidate === candidate.id ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                              {candidate.avatar ? (
                                <img
                                  src={candidate.avatar}
                                  alt={candidate.name}
                                  className="w-10 h-10 rounded-full"
                                />
                              ) : (
                                <span className="text-sm font-medium">
                                  {candidate.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              )}
                            </div>
                            <div>
                              <div className="font-medium">{candidate.name}</div>
                              <div className="text-sm text-muted-foreground">{candidate.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{candidate.position}</TableCell>
                        <TableCell>{candidate.department}</TableCell>
                        <TableCell>{format(new Date(candidate.appliedDate), 'PPP')}</TableCell>
                        <TableCell>
                          <Select
                            value={candidate.status}
                            onValueChange={(value) => handleStageChange(candidate.id, value as Candidate['status'])}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {stages.map((stage) => (
                                <SelectItem key={stage.id} value={stage.id}>
                                  {stage.title}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(candidate.status)}>
                            {candidate.score}%
                          </Badge>
                        </TableCell>
                        <TableCell>{candidate.experience}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Calendar className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      {expandedCandidate === candidate.id && (
                        <TableRow>
                          <TableCell colSpan={9} className="p-0">
                            <div className="p-4 bg-muted/20">
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div>
                                  <h4 className="font-semibold mb-2">Contact Information</h4>
                                  <div className="space-y-1 text-sm">
                                    <div><strong>Email:</strong> {candidate.email}</div>
                                    <div><strong>Phone:</strong> {candidate.phone}</div>
                                    <div><strong>Nationality:</strong> {candidate.nationality}</div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">Education</h4>
                                  <div className="text-sm">{candidate.education}</div>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">Skills</h4>
                                  <div className="flex flex-wrap gap-1">
                                    {candidate.skills.map((skill, index) => (
                                      <Badge key={index} variant="secondary" className="text-xs">
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