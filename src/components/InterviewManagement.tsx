import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Clock, 
  User, 
  CheckCircle, 
  XCircle, 
  CalendarPlus,
  MessageSquare,
  Eye
} from 'lucide-react';

interface Interview {
  id: string;
  candidate: {
    name: string;
    email: string;
    position: string;
    avatar: string;
  };
  interviewer: {
    name: string;
    role: string;
  };
  date: string;
  time: string;
  status: 'Scheduled' | 'Proposed' | 'Completed' | 'Cancelled';
  type: 'Technical' | 'HR' | 'Final' | 'Committee';
  jobId: string;
  jobTitle: string;
  notes?: string;
}

interface InterviewManagementProps {
  userRole: 'hr' | 'committee' | 'director';
}

const InterviewManagement: React.FC<InterviewManagementProps> = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState('upcoming');

  // Mock data
  const mockInterviews: Interview[] = [
    {
      id: 'INT-001',
      candidate: {
        name: 'Ahmed Hassan',
        email: 'ahmed.hassan@email.com',
        position: 'Senior Education Specialist',
        avatar: '/api/placeholder/40/40'
      },
      interviewer: {
        name: 'Dr. Mohammed Al-Rashid',
        role: 'Committee Member'
      },
      date: '2024-01-22',
      time: '10:00',
      status: 'Scheduled',
      type: 'Technical',
      jobId: 'POS-001',
      jobTitle: 'Senior Education Specialist',
      notes: 'Technical assessment scheduled'
    },
    {
      id: 'INT-002',
      candidate: {
        name: 'Sarah Khalil',
        email: 'sarah.khalil@email.com',
        position: 'Digital Transformation Manager',
        avatar: '/api/placeholder/40/40'
      },
      interviewer: {
        name: 'Ms. Fatima Al-Zahra',
        role: 'Director'
      },
      date: '2024-01-23',
      time: '14:00',
      status: 'Scheduled',
      type: 'Final',
      jobId: 'POS-002',
      jobTitle: 'Digital Transformation Manager'
    },
    {
      id: 'INT-003',
      candidate: {
        name: 'Omar Benali',
        email: 'omar.benali@email.com',
        position: 'Research Coordinator',
        avatar: '/api/placeholder/40/40'
      },
      interviewer: {
        name: 'Prof. Layla Mansouri',
        role: 'Committee Member'
      },
      date: '2024-01-24',
      time: '11:30',
      status: 'Proposed',
      type: 'Committee',
      jobId: 'POS-003',
      jobTitle: 'Research Coordinator',
      notes: 'Awaiting committee member confirmation'
    }
  ];

  const upcomingInterviews = mockInterviews.filter(interview => 
    interview.status === 'Scheduled'
  );

  const proposedInterviews = mockInterviews.filter(interview => 
    interview.status === 'Proposed'
  );

  const handleInterviewAction = (interviewId: string, action: 'accept' | 'decline' | 'reschedule') => {
    console.log(`Interview ${interviewId} ${action}ed`);
    // Handle interview action logic here
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return 'bg-green-100 text-green-800';
      case 'Proposed': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Technical': return 'bg-purple-100 text-purple-800';
      case 'HR': return 'bg-blue-100 text-blue-800';
      case 'Final': return 'bg-green-100 text-green-800';
      case 'Committee': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderInterviewCard = (interview: Interview, showActions: boolean = true) => (
    <Card key={interview.id} className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={interview.candidate.avatar} />
              <AvatarFallback>
                {interview.candidate.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <div>
                <h3 className="text-lg font-semibold">{interview.candidate.name}</h3>
                <p className="text-sm text-muted-foreground">{interview.candidate.email}</p>
                <p className="text-sm font-medium text-primary">{interview.jobTitle}</p>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{interview.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{interview.time}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{interview.interviewer.name}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Badge className={getStatusColor(interview.status)}>
                  {interview.status}
                </Badge>
                <Badge className={getTypeColor(interview.type)}>
                  {interview.type}
                </Badge>
              </div>
              {interview.notes && (
                <p className="text-sm text-muted-foreground italic">{interview.notes}</p>
              )}
            </div>
          </div>
          
          {showActions && (
            <div className="flex space-x-2">
              {interview.status === 'Proposed' && (
                <>
                  {userRole === 'committee' ? (
                    <>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleInterviewAction(interview.id, 'accept')}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Accept
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleInterviewAction(interview.id, 'decline')}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Decline
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleInterviewAction(interview.id, 'accept')}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Accept
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleInterviewAction(interview.id, 'reschedule')}
                      >
                        <CalendarPlus className="h-4 w-4 mr-1" />
                        Propose New Date
                      </Button>
                    </>
                  )}
                </>
              )}
              
              {interview.status === 'Scheduled' && userRole === 'hr' && (
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleInterviewAction(interview.id, 'reschedule')}
                >
                  <CalendarPlus className="h-4 w-4 mr-1" />
                  Reschedule
                </Button>
              )}
              
              <Button size="sm" variant="outline">
                <Eye className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline">
                <MessageSquare className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Interview Management</h1>
          <p className="text-muted-foreground">Manage and track all interview schedules</p>
        </div>
        {userRole === 'hr' && (
          <Button>
            <CalendarPlus className="h-4 w-4 mr-2" />
            Schedule New Interview
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Upcoming</p>
                <p className="text-2xl font-bold">{upcomingInterviews.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Proposed</p>
                <p className="text-2xl font-bold">{proposedInterviews.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Completed This Week</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <XCircle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Cancelled</p>
                <p className="text-2xl font-bold">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interview Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming Interviews</TabsTrigger>
          <TabsTrigger value="proposed">Proposed Interviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Interviews ({upcomingInterviews.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingInterviews.length > 0 ? (
                  upcomingInterviews.map((interview) => renderInterviewCard(interview))
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No upcoming interviews scheduled
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="proposed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Proposed Interviews ({proposedInterviews.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {proposedInterviews.length > 0 ? (
                  proposedInterviews.map((interview) => renderInterviewCard(interview))
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No proposed interviews pending
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InterviewManagement;