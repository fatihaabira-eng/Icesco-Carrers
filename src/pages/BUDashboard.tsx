import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
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

const BUDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState('2025');
  const [dateFrom, setDateFrom] = useState('2025-01-01');
  const [dateTo, setDateTo] = useState('2025-12-31');
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data for offers
  const offersData = [
    {
      id: 'OFFER-001',
      jobTitle: 'Senior Software Engineer',
      department: 'Digital Transformation',
      location: 'Rabat, Morocco',
      status: 'Active',
      applied: 45,
      closingDate: '2025-02-10',
      createdDate: '2025-01-15'
    },
    {
      id: 'OFFER-002',
      jobTitle: 'Marketing Manager',
      department: 'Communications',
      location: 'Remote',
      status: 'Active',
      applied: 32,
      closingDate: '2025-02-08',
      createdDate: '2025-01-12'
    },
    {
      id: 'OFFER-003',
      jobTitle: 'Education Program Manager',
      department: 'Education',
      location: 'Rabat, Morocco',
      status: 'Closed',
      applied: 18,
      closingDate: '2025-01-20',
      createdDate: '2025-01-01'
    }
  ];

  // Mock data for candidates
  const candidatesData = [
    {
      id: 'CAND-001',
      name: 'Ahmed Hassan El-Masri',
      position: 'Senior Software Engineer',
      status: 'In Review',
      applyingDate: '2025-01-15',
      phase: 'Technical Interview',
      score: 95
    },
    {
      id: 'CAND-002',
      name: 'Fatima Al-Zahra Benali',
      position: 'Marketing Manager',
      status: 'Shortlisted',
      applyingDate: '2025-01-14',
      phase: 'Final Interview',
      score: 92
    },
    {
      id: 'CAND-003',
      name: 'Omar Khalil Al-Rashid',
      position: 'Education Program Manager',
      status: 'Hired',
      applyingDate: '2025-01-13',
      phase: 'Completed',
      score: 89
    }
  ];

  // Mock data for interviews
  const interviewsData = [
    {
      id: 'INT-001',
      candidate: 'Ahmed Hassan El-Masri',
      position: 'Senior Software Engineer',
      dateTime: 'Jan 25, 2025 - 10:00 AM',
      status: 'Scheduled',
      interviewer: 'Dr. Mohammed'
    },
    {
      id: 'INT-002',
      candidate: 'Fatima Al-Zahra Benali',
      position: 'Marketing Manager',
      dateTime: 'Jan 26, 2025 - 2:00 PM',
      status: 'Scheduled',
      interviewer: 'Ms. Fatima'
    },
    {
      id: 'INT-003',
      candidate: 'Omar Khalil Al-Rashid',
      position: 'Education Program Manager',
      dateTime: 'Jan 20, 2025 - 11:00 AM',
      status: 'Completed',
      interviewer: 'Mr. Hassan'
    }
  ];

  const years = [
    { value: '2025', label: '2025' },
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
    { value: 'all', label: 'All Years' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'Closed':
        return <Badge className="bg-red-100 text-red-800">Closed</Badge>;
      case 'Draft':
        return <Badge className="bg-yellow-100 text-yellow-800">Draft</Badge>;
      case 'Hired':
        return <Badge className="bg-green-100 text-green-800">Hired</Badge>;
      case 'In Review':
        return <Badge className="bg-blue-100 text-blue-800">In Review</Badge>;
      case 'Shortlisted':
        return <Badge className="bg-purple-100 text-purple-800">Shortlisted</Badge>;
      case 'Scheduled':
        return <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>;
      case 'Completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  // Navigation handlers
  const handleViewAllOffers = () => {
    navigate('/manpower/director/offers');
  };

  const handleViewAllCandidates = () => {
    navigate('/manpower/director/candidates');
  };

  const handleViewAllInterviews = () => {
    navigate('/manpower/director/interviews');
  };

  return (
    <div className="space-y-8">
      {/* Header with Date Filter */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of recruitment activities and key metrics
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">From:</span>
            <Input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-40"
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">To:</span>
            <Input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-40"
            />
          </div>
        </div>
      </div>

      {/* KPI Cards */}
       <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Key Performance Indicators</CardTitle>
              <p className="text-sm text-muted-foreground">
                Overview of recruitment activities and candidate pipeline
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
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-muted-foreground">Requested Positions</p>
                    <p className="text-3xl font-bold text-primary">12</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-none">
              <CardContent className="p-6 text-center">
                <div className="flex flex-col items-center space-y-3">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-muted-foreground">Published Positions</p>
                    <p className="text-3xl font-bold text-primary">{offersData.filter(o => o.status === 'Active').length}</p>
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
                    <p className="text-lg font-bold text-muted-foreground">Applied Candidates</p>
                    <p className="text-3xl font-bold text-primary">{offersData.reduce((sum, o) => sum + o.applied, 0)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-none">
              <CardContent className="p-6 text-center">
                <div className="flex flex-col items-center space-y-3">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-muted-foreground">Scheduled Interviews</p>
                    <p className="text-3xl font-bold text-primary">{interviewsData.filter(i => i.status === 'Scheduled').length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Summary Sections */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Job Offers */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">Recent Job Positions</CardTitle>
                <p className="text-sm text-muted-foreground">Latest position openings</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {offersData.slice(0, 3).map((offer) => (
                <div
                  key={offer.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div>
                    <div className="font-medium">{offer.jobTitle}</div>
                    <div className="text-sm text-muted-foreground">
                      {offer.applied} applications
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {getStatusBadge(offer.status)}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" size="sm" onClick={handleViewAllOffers} className="w-full">
                View All Offers
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Candidates */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">Recent Applied Candidates</CardTitle>
                <p className="text-sm text-muted-foreground">Latest applications received</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {candidatesData.slice(0, 3).map((candidate) => (
                <div
                  key={candidate.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
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
                        {candidate.applyingDate}
                      </div>
                    </div>
                  </div>
                  {getStatusBadge(candidate.status)}
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" size="sm" onClick={handleViewAllCandidates} className="w-full">
                View All Candidates
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Statistics */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">Quick Statistics</CardTitle>
                <p className="text-sm text-muted-foreground">Key metrics overview</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <span className="text-sm text-muted-foreground">Active Offers</span>
                <span className="font-medium text-primary">{offersData.filter(o => o.status === 'Active').length}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <span className="text-sm text-muted-foreground">Closed Offers</span>
                <span className="font-medium text-primary">{offersData.filter(o => o.status === 'Closed').length}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <span className="text-sm text-muted-foreground">Hired Candidates</span>
                <span className="font-medium text-primary">{candidatesData.filter(c => c.status === 'Hired').length}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <span className="text-sm text-muted-foreground">Completed Interviews</span>
                <span className="font-medium text-primary">{interviewsData.filter(i => i.status === 'Completed').length}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <span className="text-sm text-muted-foreground">Total Applications</span>
                <span className="font-medium text-primary">{offersData.reduce((sum, o) => sum + o.applied, 0)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Interviews */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Upcoming Interviews</CardTitle>
              <p className="text-sm text-muted-foreground">
                Scheduled interview sessions
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {interviewsData.map((interview) => (
              <div
                key={interview.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{interview.candidate}</div>
                    <div className="text-sm text-muted-foreground">
                      {interview.position}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {interview.dateTime}
                    </div>
                  </div>
                </div>
                {getStatusBadge(interview.status)}
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Button variant="outline" size="sm" onClick={handleViewAllInterviews} className="w-full">
              View All Interviews
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BUDashboard;