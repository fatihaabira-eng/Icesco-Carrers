import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  Briefcase, 
  Calendar, 
  TrendingUp,
  UserCheck,
  Clock,
  Target,
  Award,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  Building,
  GraduationCap,
  CheckSquare,
  Square,
  FileText,
  Filter
} from 'lucide-react';
import GlobalAnalyticsDashboard from '@/components/GlobalAnalyticsDashboard';
import JobMatchingModule from '@/components/JobMatchingModule';

const HRDashboard: React.FC = () => {
  const [activeSector, setActiveSector] = useState('all');
  const [selectedVacancy, setSelectedVacancy] = useState<string | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState('2024');
  const [dateRange, setDateRange] = useState('year');

  // Mock data for vacancies
  const vacancies = [
    {
      id: 'VAC-001',
      title: 'Senior Software Engineer',
      department: 'Digital Transformation',
      location: 'Rabat, Morocco',
      type: 'Full-time',
      applications: 45,
      status: 'Active',
      closingDate: '2024-02-10',
      description: 'Lead development of educational technology platforms',
      requirements: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS'],
      salary: 'Competitive',
      experience: '5+ years',
      year: 2024
    },
    {
      id: 'VAC-002',
      title: 'Marketing Manager',
      department: 'Communications',
      location: 'Remote',
      type: 'Full-time',
      applications: 32,
      status: 'Active',
      closingDate: '2024-02-08',
      description: 'Design and implement innovative marketing strategies',
      requirements: ['Digital Marketing', 'Strategy', 'Analytics', 'Arabic', 'French'],
      salary: 'Competitive',
      experience: '3-5 years',
      year: 2024
    },
    {
      id: 'VAC-003',
      title: 'Education Program Manager',
      department: 'Education',
      location: 'Rabat, Morocco',
      type: 'Contract',
      applications: 18,
      status: 'Draft',
      closingDate: null,
      description: 'Design and implement innovative educational programs',
      requirements: ['Program Management', 'Educational Design', 'Stakeholder Management'],
      salary: 'Competitive',
      experience: '3-5 years',
      year: 2023
    }
  ];

  // Mock data for candidates
  const candidates = [
    {
      id: 'CAND-001',
      name: 'Ahmed Hassan El-Masri',
      position: 'Senior Software Engineer',
      department: 'Digital Transformation',
      degree: 'PhD Computer Science',
      phase: 'Technical Interview',
      decision: 'pending',
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
      degree: 'Master Marketing',
      phase: 'Final Interview',
      decision: 'pending',
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
      degree: 'PhD Education',
      phase: 'HR Interview',
      decision: 'pending',
      score: 89,
      appliedDate: '2024-01-13',
      email: 'omar.alrashid@email.com',
      phone: '+212-6-5555-1234',
      nationality: 'Jordanian',
      experience: '10 years',
      skills: ['Program Management', 'Educational Design', 'Leadership'],
      education: 'PhD Education - University of Jordan',
      year: 2023
    }
  ];

  // Mock data for interviews
  const scheduledInterviews = [
    {
      id: 'INT-001',
      candidate: 'Ahmed Hassan El-Masri',
      position: 'Senior Software Engineer',
      date: '2024-01-25',
      time: '10:00 AM',
      type: 'Technical',
      interviewer: 'Dr. Mohammed',
      year: 2024
    },
    {
      id: 'INT-002',
      candidate: 'Fatima Al-Zahra Benali',
      position: 'Marketing Manager',
      date: '2024-01-26',
      time: '2:00 PM',
      type: 'Final',
      interviewer: 'Ms. Fatima',
      year: 2024
    }
  ];

  const proposedInterviews = [
    {
      id: 'INT-003',
      candidate: 'Omar Khalil Al-Rashid',
      position: 'Education Program Manager',
      date: '2024-01-27',
      time: '11:00 AM',
      type: 'HR',
      interviewer: 'Mr. Hassan',
      year: 2023
    }
  ];

  // Mock data for shortlist
  const shortlistCandidates = [
    {
      id: 'SHORT-001',
      name: 'Ahmed Hassan El-Masri',
      position: 'Senior Software Engineer',
      score: 95,
      status: 'Ready for offer',
      year: 2024
    },
    {
      id: 'SHORT-002',
      name: 'Fatima Al-Zahra Benali',
      position: 'Marketing Manager',
      score: 92,
      status: 'Final review',
      year: 2024
    }
  ];

  const getDecisionColor = (decision: string) => {
    switch (decision) {
      case 'hired':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'declined':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'Technical Interview':
        return 'bg-blue-100 text-blue-800';
      case 'Final Interview':
        return 'bg-green-100 text-green-800';
      case 'HR Interview':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const sectors = [
    { id: 'all', label: 'All Units' },
    { id: 'sector', label: 'Sectors' },
    { id: 'center', label: 'Centers' },
    { id: 'support', label: 'Support Units' }
  ];

  const years = [
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
    { value: 'all', label: 'All Years' }
  ];

  const dateRanges = [
    { value: 'year', label: 'This Year' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'month', label: 'This Month' },
    { value: 'week', label: 'This Week' }
  ];

  const handleVacancyClick = (vacancyId: string) => {
    setSelectedVacancy(vacancyId);
    // Here you would typically navigate to a detailed view or open a modal
    console.log('Vacancy clicked:', vacancyId);
  };

  const handleCandidateClick = (candidateId: string) => {
    setSelectedCandidate(candidateId);
    // Here you would typically navigate to a detailed view or open a modal
    console.log('Candidate clicked:', candidateId);
  };

  // Filter data based on selected year and date range
  const filterDataByDate = (data: any[]) => {
    if (selectedYear === 'all') return data;
    return data.filter(item => item.year === parseInt(selectedYear));
  };

  const filteredVacancies = filterDataByDate(vacancies);
  const filteredCandidates = filterDataByDate(candidates);
  const filteredScheduledInterviews = filterDataByDate(scheduledInterviews);
  const filteredProposedInterviews = filterDataByDate(proposedInterviews);
  const filteredShortlistCandidates = filterDataByDate(shortlistCandidates);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">HR Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of recruitment activities and candidate pipeline
          </p>
        </div>
      </div>

      {/* Date Filter */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Filter className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Date Filter</CardTitle>
              <p className="text-sm text-muted-foreground">
                Filter dashboard data by year or date range
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Year:</span>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {years.map(year => (
                    <SelectItem key={year.value} value={year.value}>
                      {year.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Range:</span>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {dateRanges.map(range => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ICESCO Vacancies KPIs Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">ICESCO Vacancies</CardTitle>
              <p className="text-sm text-muted-foreground">
                Overview of open positions and recruitment metrics across all organizational units
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-0 shadow-none">
              <CardContent className="p-6 text-center">
                <div className="flex flex-col items-center space-y-3">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-muted-foreground">Open Positions</p>
                    <p className="text-3xl font-bold text-primary">{filteredVacancies.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-none">
              <CardContent className="p-6 text-center">
                <div className="flex flex-col items-center space-y-3">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-muted-foreground">Requested Positions</p>
                    <p className="text-3xl font-bold text-primary">18</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-none">
              <CardContent className="p-6 text-center">
                <div className="flex flex-col items-center space-y-3">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-muted-foreground">Approved Positions</p>
                    <p className="text-3xl font-bold text-primary">12</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-none">
              <CardContent className="p-6 text-center">
                <div className="flex flex-col items-center space-y-3">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-muted-foreground">Total Candidates</p>
                    <p className="text-3xl font-bold text-primary">{filteredCandidates.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Job Matching Module */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Job Matching & Analytics</CardTitle>
              <p className="text-sm text-muted-foreground">
                AI-powered candidate matching and recruitment analytics
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <JobMatchingModule />
        </CardContent>
      </Card>

      {/* Vacancy Offers Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Vacancy Offers</CardTitle>
              <p className="text-sm text-muted-foreground">
                Manage and track open positions across all organizational units
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Sector Toggle Buttons */}
          <div className="flex space-x-2 mb-6">
            {sectors.map((sector) => (
              <Button
                key={sector.id}
                variant={activeSector === sector.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveSector(sector.id)}
              >
                {sector.label}
              </Button>
            ))}
          </div>

          {/* Vacancies Table */}
          <div className="space-y-4">
            {filteredVacancies
              .filter(vacancy => {
                if (activeSector === 'all') return true;
                // Filter logic based on department type
                if (activeSector === 'sector' && vacancy.department.includes('Sector')) return true;
                if (activeSector === 'center' && vacancy.department.includes('Center')) return true;
                if (activeSector === 'support' && vacancy.department.includes('Department')) return true;
                return false;
              })
              .map((vacancy) => (
                <div
                  key={vacancy.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => handleVacancyClick(vacancy.id)}
                >
                  <div className="flex-1">
                    <div className="font-medium">{vacancy.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {vacancy.department} • {vacancy.location} • {vacancy.type}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{vacancy.applications} applications</span>
                    </div>
                    <Badge className={vacancy.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                      {vacancy.status}
                    </Badge>
                    {vacancy.closingDate && (
                      <div className="text-sm text-muted-foreground">
                        Closes {vacancy.closingDate}
                      </div>
                    )}
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Candidates Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Candidates</CardTitle>
              <p className="text-sm text-muted-foreground">
                Track candidate progress through the recruitment pipeline
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCandidates.map((candidate) => (
              <div
                key={candidate.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => handleCandidateClick(candidate.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-sm font-medium">
                      {candidate.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium">{candidate.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {candidate.position} • {candidate.department}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {candidate.degree}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Badge className={getPhaseColor(candidate.phase)}>
                    {candidate.phase}
                  </Badge>
                  <Badge className={getDecisionColor(candidate.decision)}>
                    {candidate.decision === 'pending' ? 'Pending' : candidate.decision}
                  </Badge>
                  <div className="text-sm text-muted-foreground">
                    Score: {candidate.score}%
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interview Calendar Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Interview Calendar</CardTitle>
              <p className="text-sm text-muted-foreground">
                Scheduled and proposed interviews
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="scheduled" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="scheduled">Scheduled Interviews</TabsTrigger>
              <TabsTrigger value="proposed">Proposed Interviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="scheduled" className="space-y-4">
              {filteredScheduledInterviews.map((interview) => (
                <div
                  key={interview.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-lg bg-green-100">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium">{interview.candidate}</div>
                      <div className="text-sm text-muted-foreground">
                        {interview.position}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{interview.date}</div>
                    <div className="text-sm text-muted-foreground">
                      {interview.time} • {interview.type}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {interview.interviewer}
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="proposed" className="space-y-4">
              {filteredProposedInterviews.map((interview) => (
                <div
                  key={interview.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-lg bg-yellow-100">
                      <Clock className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div>
                      <div className="font-medium">{interview.candidate}</div>
                      <div className="text-sm text-muted-foreground">
                        {interview.position}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{interview.date}</div>
                    <div className="text-sm text-muted-foreground">
                      {interview.time} • {interview.type}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {interview.interviewer}
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* To-Do List Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <CheckSquare className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">To-Do List</CardTitle>
              <p className="text-sm text-muted-foreground">
                Shortlisted candidates requiring action
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredShortlistCandidates.map((candidate) => (
              <div
                key={candidate.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <Square className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">{candidate.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {candidate.position}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge className="bg-blue-100 text-blue-800">
                    {candidate.status}
                  </Badge>
                  <div className="text-sm text-muted-foreground">
                    Score: {candidate.score}%
                  </div>
                  <Button size="sm" variant="outline">
                    Take Action
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HRDashboard; 