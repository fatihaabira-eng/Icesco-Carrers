import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Users, 
  FileText, 
  Award,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
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
}

interface ScheduledInterview {
  id: string;
  candidateName: string;
  position: string;
  scheduledDate: string;
  scheduledTime: string;
  status: 'upcoming' | 'completed';
  businessUnit: string;
}

interface Position {
  id: string;
  title: string;
  businessUnit: string;
  candidatesCount: number;
  status: 'active' | 'closed';
  assignedDate: string;
}

const CommitteeDashboard: React.FC = () => {
  console.log('CommitteeDashboard component rendering');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [dateRange, setDateRange] = useState('year');

  // Mock data for proposed interviews
  const proposedInterviews: ProposedInterview[] = [
    {
      id: 'PROP-001',
      candidateName: 'Alice Smith',
      position: 'Senior Software Engineer',
      proposedDate: '2024-02-15',
      proposedTime: '10:00 AM',
      status: 'pending',
      businessUnit: 'Digital Transformation'
    },
    {
      id: 'PROP-002',
      candidateName: 'Bob Johnson',
      position: 'Marketing Manager',
      proposedDate: '2024-02-16',
      proposedTime: '2:00 PM',
      status: 'pending',
      businessUnit: 'Communications'
    },
    {
      id: 'PROP-003',
      candidateName: 'Clara Brown',
      position: 'Research Analyst',
      proposedDate: '2024-02-17',
      proposedTime: '11:00 AM',
      status: 'accepted',
      businessUnit: 'Research Center'
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
      businessUnit: 'Digital Transformation'
    },
    {
      id: 'SCHED-002',
      candidateName: 'Emma Wilson',
      position: 'Marketing Manager',
      scheduledDate: '2024-02-18',
      scheduledTime: '2:00 PM',
      status: 'completed',
      businessUnit: 'Communications'
    }
  ];

  // Mock data for assigned positions
  const assignedPositions: Position[] = [
    {
      id: 'POS-001',
      title: 'Senior Software Engineer',
      businessUnit: 'Digital Transformation',
      candidatesCount: 5,
      status: 'active',
      assignedDate: '2024-01-15'
    },
    {
      id: 'POS-002',
      title: 'Marketing Manager',
      businessUnit: 'Communications',
      candidatesCount: 3,
      status: 'active',
      assignedDate: '2024-01-10'
    },
    {
      id: 'POS-003',
      title: 'Research Analyst',
      businessUnit: 'Research Center',
      candidatesCount: 2,
      status: 'active',
      assignedDate: '2024-01-20'
    }
  ];

  const filterDataByDate = (data: any[]) => {
    if (selectedYear === 'all') return data;
    return data.filter(item => new Date(item.proposedDate || item.scheduledDate || item.assignedDate).getFullYear() === parseInt(selectedYear));
  };

  const filteredProposedInterviews = filterDataByDate(proposedInterviews);
  const filteredScheduledInterviews = filterDataByDate(scheduledInterviews);
  const filteredPositions = filterDataByDate(assignedPositions);

  const pendingInterviews = filteredProposedInterviews.filter(i => i.status === 'pending').length;
  const acceptedInterviews = filteredProposedInterviews.filter(i => i.status === 'accepted').length;
  const upcomingInterviews = filteredScheduledInterviews.filter(i => i.status === 'upcoming').length;
  const completedInterviews = filteredScheduledInterviews.filter(i => i.status === 'completed').length;
  const activePositions = filteredPositions.filter(p => p.status === 'active').length;
  const totalCandidates = filteredPositions.reduce((sum, pos) => sum + pos.candidatesCount, 0);

  const kpiCards = [
    { title: 'Pending Interviews', value: pendingInterviews, icon: Clock, description: 'Awaiting your response' },
    { title: 'Accepted Interviews', value: acceptedInterviews, icon: CheckCircle, description: 'Confirmed interviews' },
    { title: 'Upcoming Interviews', value: upcomingInterviews, icon: Calendar, description: 'Scheduled interviews' },
    { title: 'Completed Interviews', value: completedInterviews, icon: Award, description: 'Finished evaluations' },
    { title: 'Active Positions', value: activePositions, icon: FileText, description: 'Assigned positions' },
    { title: 'Total Candidates', value: totalCandidates, icon: Users, description: 'Candidates to review' }
  ];

  const getStatusColor = (status: string) => {
    const colorMap: { [key: string]: string } = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'accepted': 'bg-green-100 text-green-800',
      'declined': 'bg-red-100 text-red-800',
      'rescheduled': 'bg-blue-100 text-blue-800',
      'upcoming': 'bg-purple-100 text-purple-800',
      'completed': 'bg-green-100 text-green-800',
      'active': 'bg-green-100 text-green-800',
      'closed': 'bg-gray-100 text-gray-800'
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <DashboardHeader
        title="Committee Dashboard"
        description="Overview of your committee responsibilities and interview schedule"
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />

      {/* KPI Cards */}
      <DashboardSection
        title="Committee Overview"
        description="Key metrics for your committee activities"
        icon={Award}
      >
        <KPICards cards={kpiCards} />
      </DashboardSection>

      {/* Proposed Interviews */}
      <DashboardSection
        title="Proposed Interviews"
        description="Interviews awaiting your response"
        icon={Clock}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProposedInterviews.map((interview) => (
            <Card key={interview.id} className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{interview.candidateName}</h4>
                  <Badge className={getStatusColor(interview.status)}>
                    {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  <div><strong>Position:</strong> {interview.position}</div>
                  <div><strong>Business Unit:</strong> {interview.businessUnit}</div>
                  <div><strong>Date:</strong> {format(new Date(interview.proposedDate), 'MMM d, yyyy')}</div>
                  <div><strong>Time:</strong> {interview.proposedTime}</div>
                </div>
                {interview.status === 'pending' && (
                  <div className="flex gap-2 pt-2">
                    <button className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700">
                      Accept
                    </button>
                    <button className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700">
                      Decline
                    </button>
                    <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                      Reschedule
                    </button>
                  </div>
                )}
              </div>
            </Card>
          ))}
          {filteredProposedInterviews.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground py-8">
              No proposed interviews at the moment.
            </div>
          )}
        </div>
      </DashboardSection>

      {/* Upcoming Interviews */}
      <DashboardSection
        title="Upcoming Interviews"
        description="Your scheduled interviews"
        icon={Calendar}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredScheduledInterviews.filter(i => i.status === 'upcoming').map((interview) => (
            <Card key={interview.id} className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{interview.candidateName}</h4>
                  <Badge className={getStatusColor(interview.status)}>
                    {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  <div><strong>Position:</strong> {interview.position}</div>
                  <div><strong>Business Unit:</strong> {interview.businessUnit}</div>
                  <div><strong>Date:</strong> {format(new Date(interview.scheduledDate), 'MMM d, yyyy')}</div>
                  <div><strong>Time:</strong> {interview.scheduledTime}</div>
                </div>
                <div className="pt-2">
                  <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                    View Candidate Profile
                  </button>
                </div>
              </div>
            </Card>
          ))}
          {filteredScheduledInterviews.filter(i => i.status === 'upcoming').length === 0 && (
            <div className="col-span-full text-center text-muted-foreground py-8">
              No upcoming interviews scheduled.
            </div>
          )}
        </div>
      </DashboardSection>

      {/* Assigned Positions */}
      <DashboardSection
        title="Assigned Positions"
        description="Positions you are responsible for evaluating"
        icon={FileText}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPositions.map((position) => (
            <Card key={position.id} className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{position.title}</h4>
                  <Badge className={getStatusColor(position.status)}>
                    {position.status.charAt(0).toUpperCase() + position.status.slice(1)}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  <div><strong>Business Unit:</strong> {position.businessUnit}</div>
                  <div><strong>Candidates:</strong> {position.candidatesCount}</div>
                  <div><strong>Assigned:</strong> {format(new Date(position.assignedDate), 'MMM d, yyyy')}</div>
                </div>
                <div className="pt-2">
                  <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                    View Candidates
                  </button>
                </div>
              </div>
            </Card>
          ))}
          {filteredPositions.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground py-8">
              No positions assigned at the moment.
            </div>
          )}
        </div>
      </DashboardSection>
    </div>
  );
};

export default CommitteeDashboard; 