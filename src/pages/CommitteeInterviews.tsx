import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  MessageSquare
} from 'lucide-react';
import { format } from 'date-fns';
import DashboardHeader from '@/components/DashboardHeader';
import KPICards from '@/components/KPICards';
import DashboardSection from '@/components/DashboardSection';

interface ProposedInterview {
  id: string;
  candidateName: string;
  position: string;
  proposedDate: string;
  proposedTime: string;
  status: 'pending' | 'accepted' | 'declined' | 'rescheduled';
  businessUnit: string;
  candidateEmail: string;
  candidatePhone: string;
  experience: string;
  education: string;
  proposedBy: string;
  proposedDateRequest: string;
  notes?: string;
}

interface ScheduledInterview {
  id: string;
  candidateName: string;
  position: string;
  scheduledDate: string;
  scheduledTime: string;
  status: 'upcoming' | 'completed';
  businessUnit: string;
  candidateEmail: string;
  candidatePhone: string;
  experience: string;
  education: string;
  interviewType: 'in-person' | 'virtual';
  location?: string;
  meetingLink?: string;
  notes?: string;
}

const CommitteeInterviews: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [dateRange, setDateRange] = useState('year');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('proposed');

  // Mock data for proposed interviews
  const proposedInterviews: ProposedInterview[] = [
    {
      id: 'PROP-001',
      candidateName: 'Alice Smith',
      position: 'Senior Software Engineer',
      proposedDate: '2024-02-15',
      proposedTime: '10:00 AM',
      status: 'pending',
      businessUnit: 'Digital Transformation',
      candidateEmail: 'alice.smith@example.com',
      candidatePhone: '+1-555-0123',
      experience: '5 years',
      education: 'Master in Computer Science',
      proposedBy: 'HR Department',
      proposedDateRequest: '2024-02-10',
      notes: 'Candidate has strong technical background and relevant experience.'
    },
    {
      id: 'PROP-002',
      candidateName: 'Bob Johnson',
      position: 'Marketing Manager',
      proposedDate: '2024-02-16',
      proposedTime: '2:00 PM',
      status: 'pending',
      businessUnit: 'Communications',
      candidateEmail: 'bob.johnson@example.com',
      candidatePhone: '+1-555-0124',
      experience: '4 years',
      education: 'MBA in Marketing',
      proposedBy: 'HR Department',
      proposedDateRequest: '2024-02-11',
      notes: 'Excellent communication skills and marketing experience.'
    },
    {
      id: 'PROP-003',
      candidateName: 'Clara Brown',
      position: 'Research Analyst',
      proposedDate: '2024-02-17',
      proposedTime: '11:00 AM',
      status: 'accepted',
      businessUnit: 'Research Center',
      candidateEmail: 'clara.brown@example.com',
      candidatePhone: '+1-555-0125',
      experience: '3 years',
      education: 'Master in Research Methods',
      proposedBy: 'HR Department',
      proposedDateRequest: '2024-02-12',
      notes: 'Strong analytical skills and research background.'
    }
  ];

  // Mock data for scheduled interviews
  const scheduledInterviews: ScheduledInterview[] = [
    {
      id: 'SCHED-001',
      candidateName: 'David Lee',
      position: 'Senior Software Engineer',
      scheduledDate: '2024-02-20',
      scheduledTime: '10:00 AM',
      status: 'upcoming',
      businessUnit: 'Digital Transformation',
      candidateEmail: 'david.lee@example.com',
      candidatePhone: '+1-555-0126',
      experience: '6 years',
      education: 'Bachelor in Software Engineering',
      interviewType: 'virtual',
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      notes: 'Virtual interview via Google Meet'
    },
    {
      id: 'SCHED-002',
      candidateName: 'Emma Wilson',
      position: 'Marketing Manager',
      scheduledDate: '2024-02-18',
      scheduledTime: '2:00 PM',
      status: 'completed',
      businessUnit: 'Communications',
      candidateEmail: 'emma.wilson@example.com',
      candidatePhone: '+1-555-0127',
      experience: '5 years',
      education: 'MBA in Business Administration',
      interviewType: 'in-person',
      location: 'Conference Room A',
      notes: 'Interview completed successfully. Candidate showed strong leadership skills.'
    }
  ];

  const filterDataByDate = (data: any[]) => {
    if (selectedYear === 'all') return data;
    return data.filter(item => new Date(item.proposedDate || item.scheduledDate).getFullYear() === parseInt(selectedYear));
  };

  const filteredProposedInterviews = filterDataByDate(proposedInterviews).filter(interview =>
    interview.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    interview.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    interview.businessUnit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredScheduledInterviews = filterDataByDate(scheduledInterviews).filter(interview =>
    interview.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    interview.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    interview.businessUnit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingInterviews = filteredProposedInterviews.filter(i => i.status === 'pending').length;
  const acceptedInterviews = filteredProposedInterviews.filter(i => i.status === 'accepted').length;
  const upcomingInterviews = filteredScheduledInterviews.filter(i => i.status === 'upcoming').length;
  const completedInterviews = filteredScheduledInterviews.filter(i => i.status === 'completed').length;

  const kpiCards = [
    { title: 'Pending Interviews', value: pendingInterviews, icon: Clock, description: 'Awaiting your response' },
    { title: 'Accepted Interviews', value: acceptedInterviews, icon: CheckCircle, description: 'Confirmed interviews' },
    { title: 'Upcoming Interviews', value: upcomingInterviews, icon: Calendar, description: 'Scheduled interviews' },
    { title: 'Completed Interviews', value: completedInterviews, icon: AlertCircle, description: 'Finished evaluations' }
  ];

  const getStatusColor = (status: string) => {
    const colorMap: { [key: string]: string } = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'accepted': 'bg-green-100 text-green-800',
      'declined': 'bg-red-100 text-red-800',
      'rescheduled': 'bg-blue-100 text-blue-800',
      'upcoming': 'bg-purple-100 text-purple-800',
      'completed': 'bg-green-100 text-green-800'
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  };

  const handleAcceptInterview = (interviewId: string) => {
    console.log(`Accepting interview ${interviewId}`);
    // Here you would typically make an API call to update the interview status
  };

  const handleDeclineInterview = (interviewId: string) => {
    console.log(`Declining interview ${interviewId}`);
    // Here you would typically make an API call to update the interview status
  };

  const handleRescheduleInterview = (interviewId: string) => {
    console.log(`Requesting reschedule for interview ${interviewId}`);
    // Here you would typically open a reschedule modal or form
  };

  const handleViewCandidate = (candidateId: string) => {
    console.log(`Viewing candidate ${candidateId}`);
    // Here you would typically navigate to candidate profile
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <DashboardHeader
        title="Committee Interviews"
        description="Manage your interview schedule and proposed interviews"
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />

      {/* KPI Cards */}
      <DashboardSection
        title="Interview Overview"
        description="Key metrics for your interview activities"
        icon={Calendar}
      >
        <KPICards cards={kpiCards} />
      </DashboardSection>

      {/* Interviews Management */}
      <DashboardSection
        title="Interview Management"
        description="View and manage proposed and scheduled interviews"
        icon={Calendar}
      >
        {/* Search and Filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search interviews by candidate name, position, or business unit..."
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

        {/* Tabs for different interview types */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="proposed">Proposed Interviews</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled Interviews</TabsTrigger>
          </TabsList>

          <TabsContent value="proposed" className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Candidate</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Business Unit</TableHead>
                      <TableHead>Proposed Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProposedInterviews.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground h-24">
                          No proposed interviews found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredProposedInterviews.map((interview) => (
                        <TableRow key={interview.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{interview.candidateName}</div>
                              <div className="text-sm text-muted-foreground">{interview.candidateEmail}</div>
                            </div>
                          </TableCell>
                          <TableCell>{interview.position}</TableCell>
                          <TableCell>{interview.businessUnit}</TableCell>
                          <TableCell>
                            <div>
                              <div>{format(new Date(interview.proposedDate), 'MMM d, yyyy')}</div>
                              <div className="text-sm text-muted-foreground">{interview.proposedTime}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(interview.status)}>
                              {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewCandidate(interview.id)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              {interview.status === 'pending' && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleAcceptInterview(interview.id)}
                                    className="text-green-600 hover:text-green-700"
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleDeclineInterview(interview.id)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <XCircle className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleRescheduleInterview(interview.id)}
                                  >
                                    <MessageSquare className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scheduled" className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Candidate</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Business Unit</TableHead>
                      <TableHead>Scheduled Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredScheduledInterviews.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center text-muted-foreground h-24">
                          No scheduled interviews found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredScheduledInterviews.map((interview) => (
                        <TableRow key={interview.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{interview.candidateName}</div>
                              <div className="text-sm text-muted-foreground">{interview.candidateEmail}</div>
                            </div>
                          </TableCell>
                          <TableCell>{interview.position}</TableCell>
                          <TableCell>{interview.businessUnit}</TableCell>
                          <TableCell>
                            <div>
                              <div>{format(new Date(interview.scheduledDate), 'MMM d, yyyy')}</div>
                              <div className="text-sm text-muted-foreground">{interview.scheduledTime}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {interview.interviewType}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(interview.status)}>
                              {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewCandidate(interview.id)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              {interview.status === 'upcoming' && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleRescheduleInterview(interview.id)}
                                >
                                  <MessageSquare className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DashboardSection>
    </div>
  );
};

export default CommitteeInterviews; 