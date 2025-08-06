import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Search, 
  Filter,
  Plus,
  Eye,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
  Target,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { format } from 'date-fns';
import DashboardHeader from '@/components/DashboardHeader';
import KPICards from '@/components/KPICards';
import DashboardSection from '@/components/DashboardSection';

interface Interview {
  id: string;
  candidate: string;
  position: string;
  date: string;
  time: string;
  type: 'technical' | 'hr' | 'final' | 'panel';
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  interviewer: string;
  location: string;
  notes: string;
  outcome: 'pending' | 'passed' | 'failed' | 'recommended';
  score: number;
  year: number;
}

const HRInterviews: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2025');
  const [dateRange, setDateRange] = useState('year');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedInterview, setExpandedInterview] = useState<string | null>(null);

  // Mock interview data
  const interviews: Interview[] = [
    {
      id: 'INT-001',
      candidate: 'Ahmed Hassan El-Masri',
      position: 'Senior Software Engineer',
      date: '2025-01-25',
      time: '10:00 AM',
      type: 'technical',
      status: 'scheduled',
      interviewer: 'Dr. Mohammed Al-Rashid',
      location: 'Conference Room A',
      notes: 'Technical assessment focusing on React and Node.js',
      outcome: 'pending',
      score: 0,
      year: 2025
    },
    {
      id: 'INT-002',
      candidate: 'Fatima Al-Zahra Benali',
      position: 'Marketing Manager',
      date: '2024-01-26',
      time: '2:00 PM',
      type: 'final',
      status: 'completed',
      interviewer: 'Ms. Fatima Al-Sayed',
      location: 'Virtual Meeting',
      notes: 'Final interview with presentation on marketing strategy',
      outcome: 'passed',
      score: 92,
      year: 2025
    },
    {
      id: 'INT-003',
      candidate: 'Omar Khalil Al-Rashid',
      position: 'Education Program Manager',
      date: '2024-01-27',
      time: '11:00 AM',
      type: 'hr',
      status: 'completed',
      interviewer: 'Mr. Hassan Al-Mahmoud',
      location: 'HR Office',
      notes: 'HR interview covering cultural fit and expectations',
      outcome: 'recommended',
      score: 88,
      year: 2024
    },
    {
      id: 'INT-004',
      candidate: 'Sarah Johnson',
      position: 'Financial Analyst',
      date: '2024-01-28',
      time: '3:00 PM',
      type: 'panel',
      status: 'scheduled',
      interviewer: 'Panel: Finance Team',
      location: 'Board Room',
      notes: 'Panel interview with finance department heads',
      outcome: 'pending',
      score: 0,
      year: 2024
    }
  ];

  // Filter data based on selected year
  const filterDataByDate = (data: Interview[]) => {
    if (selectedYear === 'all') return data;
    return data.filter(item => item.year === parseInt(selectedYear));
  };

  const filteredInterviews = filterDataByDate(interviews).filter(interview =>
    interview.candidate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    interview.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    interview.interviewer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate KPIs
  const totalInterviews = filteredInterviews.length;
  const scheduledInterviews = filteredInterviews.filter(i => i.status === 'scheduled').length;
  const completedInterviews = filteredInterviews.filter(i => i.status === 'completed').length;
  const successRate = completedInterviews > 0 
    ? Math.round((filteredInterviews.filter(i => i.outcome === 'passed' || i.outcome === 'recommended').length / completedInterviews) * 100)
    : 0;

  const kpiCards = [
    {
      title: 'Total Scheduled Interviews',
      value: totalInterviews,
      icon: Calendar,
      description: 'All scheduled interviews'
    },
    {
      title: 'Interviewed candidates',
      value: scheduledInterviews,
      icon: Clock,
      description: 'Number of candidates interviewed'
    },
    {
      title: 'Total Hours for Interviews',
      value: completedInterviews,
      icon: CheckCircle,
      description: 'Number of completed interviews'
    },
    {
      title: 'Total Selected',
      value: `${successRate}%`,
      icon: Target,
      description: 'Candidates passed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'rescheduled':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'technical':
        return 'bg-purple-100 text-purple-800';
      case 'hr':
        return 'bg-blue-100 text-blue-800';
      case 'final':
        return 'bg-green-100 text-green-800';
      case 'panel':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getOutcomeColor = (outcome: string) => {
    switch (outcome) {
      case 'passed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'recommended':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = (interviewId: string, newStatus: Interview['status']) => {
    // In a real app, this would update the backend
    console.log(`Updating interview ${interviewId} to status ${newStatus}`);
  };

  const toggleExpanded = (interviewId: string) => {
    setExpandedInterview(expandedInterview === interviewId ? null : interviewId);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <DashboardHeader
        title="Interviews"
        description="Manage and track interview scheduling and outcomes"
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        dateRange={dateRange}
        setDateRange={setDateRange}
      >
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Schedule Interview
        </Button>
      </DashboardHeader>

      {/* KPI Cards */}
      <DashboardSection
        title="Interview Overview"
        description="Key metrics for interview management and scheduling"
        icon={Calendar}
      >
        <KPICards cards={kpiCards} />
      </DashboardSection>

      {/* Interview Management */}
      <DashboardSection
        title="Interview Management"
        description="Track interview scheduling, outcomes, and candidate progress"
        icon={Calendar}
      >
        {/* Search and Filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search interviews..."
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

        {/* Interview Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Interviews</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="today">Today</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <InterviewTable 
              interviews={filteredInterviews}
              expandedInterview={expandedInterview}
              toggleExpanded={toggleExpanded}
              handleStatusChange={handleStatusChange}
              getStatusColor={getStatusColor}
              getTypeColor={getTypeColor}
              getOutcomeColor={getOutcomeColor}
            />
          </TabsContent>
          
          <TabsContent value="scheduled" className="mt-6">
            <InterviewTable 
              interviews={filteredInterviews.filter(i => i.status === 'scheduled')}
              expandedInterview={expandedInterview}
              toggleExpanded={toggleExpanded}
              handleStatusChange={handleStatusChange}
              getStatusColor={getStatusColor}
              getTypeColor={getTypeColor}
              getOutcomeColor={getOutcomeColor}
            />
          </TabsContent>
          
          <TabsContent value="completed" className="mt-6">
            <InterviewTable 
              interviews={filteredInterviews.filter(i => i.status === 'completed')}
              expandedInterview={expandedInterview}
              toggleExpanded={toggleExpanded}
              handleStatusChange={handleStatusChange}
              getStatusColor={getStatusColor}
              getTypeColor={getTypeColor}
              getOutcomeColor={getOutcomeColor}
            />
          </TabsContent>
          
          <TabsContent value="today" className="mt-6">
            <InterviewTable 
              interviews={filteredInterviews.filter(i => i.date === format(new Date(), 'yyyy-MM-dd'))}
              expandedInterview={expandedInterview}
              toggleExpanded={toggleExpanded}
              handleStatusChange={handleStatusChange}
              getStatusColor={getStatusColor}
              getTypeColor={getTypeColor}
              getOutcomeColor={getOutcomeColor}
            />
          </TabsContent>
        </Tabs>
      </DashboardSection>
    </div>
  );
};

interface InterviewTableProps {
  interviews: Interview[];
  expandedInterview: string | null;
  toggleExpanded: (id: string) => void;
  handleStatusChange: (id: string, status: Interview['status']) => void;
  getStatusColor: (status: string) => string;
  getTypeColor: (type: string) => string;
  getOutcomeColor: (outcome: string) => string;
}

const InterviewTable: React.FC<InterviewTableProps> = ({
  interviews,
  expandedInterview,
  toggleExpanded,
  handleStatusChange,
  getStatusColor,
  getTypeColor,
  getOutcomeColor
}) => {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Candidate</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Interviewer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Outcome</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {interviews.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center text-muted-foreground">
                  No interviews found.
                </TableCell>
              </TableRow>
            ) : (
              interviews.map((interview) => (
                <React.Fragment key={interview.id}>
                  <TableRow>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpanded(interview.id)}
                        aria-label={expandedInterview === interview.id ? 'Collapse details' : 'Expand details'}
                      >
                        {expandedInterview === interview.id ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium">{interview.candidate}</TableCell>
                    <TableCell>{interview.position}</TableCell>
                    <TableCell>
                      <div>
                        <div>{format(new Date(interview.date), 'PPP')}</div>
                        <div className="text-sm text-muted-foreground">{interview.time}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(interview.type)}>
                        {interview.type.charAt(0).toUpperCase() + interview.type.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{interview.interviewer}</TableCell>
                    <TableCell>
                      <Select
                        value={interview.status}
                        onValueChange={(value) => handleStatusChange(interview.id, value as Interview['status'])}
                      >
                        <SelectTrigger className="w-28">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                          <SelectItem value="rescheduled">Rescheduled</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Badge className={getOutcomeColor(interview.outcome)}>
                        {interview.outcome.charAt(0).toUpperCase() + interview.outcome.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {interview.score > 0 ? `${interview.score}%` : '-'}
                    </TableCell>
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
                  {expandedInterview === interview.id && (
                    <TableRow>
                      <TableCell colSpan={10} className="p-0">
                        <div className="p-4 bg-muted/20">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold mb-2">Interview Details</h4>
                              <div className="space-y-1 text-sm">
                                <div><strong>Location:</strong> {interview.location}</div>
                                <div><strong>Notes:</strong> {interview.notes}</div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Actions</h4>
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline">
                                  Reschedule
                                </Button>
                                <Button size="sm" variant="outline">
                                  Send Reminder
                                </Button>
                                <Button size="sm" variant="outline">
                                  Add Notes
                                </Button>
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
  );
};

export default HRInterviews; 