import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Calendar, 
  Clock, 
  Users, 
  Video, 
  MapPin, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  Search,
  Filter,
  Plus,
  Eye
} from 'lucide-react';
import { format, addDays, startOfWeek, addWeeks } from 'date-fns';

const InterviewManagement: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const currentWeek = addWeeks(startOfWeek(new Date()), selectedWeek);

  // Mock interview data
  const interviews = [
    {
      id: 1,
      candidate: {
        name: 'Ahmed Hassan El-Masri',
        email: 'ahmed.hassan@email.com',
        position: 'Senior Software Engineer',
        avatar: '/api/placeholder/40/40'
      },
      interviewers: [
        { name: 'Dr. Mohammed Al-Faisal', role: 'Technical Lead' },
        { name: 'Ms. Fatima El-Zahra', role: 'HR Director' }
      ],
      date: addDays(currentWeek, 1),
      time: '10:00',
      duration: 60,
      mode: 'video',
      location: 'Google Meet',
      status: 'scheduled',
      department: 'Engineering',
      round: 'Technical Interview'
    },
    {
      id: 2,
      candidate: {
        name: 'Fatima Al-Zahra Benali',
        email: 'fatima.benali@email.com',
        position: 'Marketing Manager',
        avatar: '/api/placeholder/40/40'
      },
      interviewers: [
        { name: 'Dr. Youssef Ben Ahmed', role: 'Department Head' }
      ],
      date: addDays(currentWeek, 2),
      time: '14:00',
      duration: 45,
      mode: 'in-person',
      location: 'Conference Room A',
      status: 'confirmed',
      department: 'Marketing',
      round: 'Final Interview'
    },
    {
      id: 3,
      candidate: {
        name: 'Omar Khalil Al-Rashid',
        email: 'omar.rashid@email.com',
        position: 'Education Specialist',
        avatar: '/api/placeholder/40/40'
      },
      interviewers: [
        { name: 'Ms. Amina Kone', role: 'Senior Manager' },
        { name: 'Dr. Mohammed Al-Faisal', role: 'Technical Lead' }
      ],
      date: addDays(currentWeek, 3),
      time: '11:30',
      duration: 60,
      mode: 'video',
      location: 'Zoom Meeting',
      status: 'pending',
      department: 'Education',
      round: 'HR Interview'
    },
    {
      id: 4,
      candidate: {
        name: 'Amina Kone Diabate',
        email: 'amina.kone@email.com',
        position: 'Financial Analyst',
        avatar: '/api/placeholder/40/40'
      },
      interviewers: [
        { name: 'Ms. Fatima El-Zahra', role: 'HR Director' }
      ],
      date: addDays(currentWeek, 4),
      time: '15:30',
      duration: 45,
      mode: 'phone',
      location: 'Phone Call',
      status: 'completed',
      department: 'Finance',
      round: 'Screening Call'
    },
    {
      id: 5,
      candidate: {
        name: 'Youssef Ben Mohamed',
        email: 'youssef.ben@email.com',
        position: 'Data Scientist',
        avatar: '/api/placeholder/40/40'
      },
      interviewers: [
        { name: 'Dr. Youssef Ben Ahmed', role: 'Department Head' }
      ],
      date: addDays(currentWeek, 5),
      time: '09:00',
      duration: 90,
      mode: 'in-person',
      location: 'Lab Room B',
      status: 'rescheduled',
      department: 'Research',
      round: 'Technical Assessment'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'rescheduled': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <AlertCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'in-person': return <MapPin className="h-4 w-4" />;
      case 'phone': return <Clock className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const filteredInterviews = interviews.filter(interview => {
    const matchesSearch = interview.candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         interview.candidate.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || interview.status === filterStatus;
    const matchesDepartment = filterDepartment === 'all' || interview.department === filterDepartment;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const getWeeklyStats = () => {
    const weekInterviews = filteredInterviews.filter(interview => 
      interview.date >= currentWeek && interview.date < addDays(currentWeek, 7)
    );
    
    return {
      total: weekInterviews.length,
      scheduled: weekInterviews.filter(i => i.status === 'scheduled').length,
      confirmed: weekInterviews.filter(i => i.status === 'confirmed').length,
      pending: weekInterviews.filter(i => i.status === 'pending').length,
      completed: weekInterviews.filter(i => i.status === 'completed').length
    };
  };

  const weeklyStats = getWeeklyStats();

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Interview Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track all interview activities across departments
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Schedule New
          </Button>
          <Button>
            <Calendar className="h-4 w-4 mr-2" />
            Calendar View
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total This Week</p>
                <p className="text-2xl font-bold text-foreground">{weeklyStats.total}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Confirmed</p>
                <p className="text-2xl font-bold text-green-600">{weeklyStats.confirmed}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{weeklyStats.pending}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-gray-600">{weeklyStats.completed}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Scheduled</p>
                <p className="text-2xl font-bold text-blue-600">{weeklyStats.scheduled}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Week Navigation */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedWeek(selectedWeek - 1)}
              >
                ← Previous
              </Button>
              <span className="text-sm font-medium px-3">
                Week of {format(currentWeek, 'MMM dd, yyyy')}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedWeek(selectedWeek + 1)}
              >
                Next →
              </Button>
            </div>

            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search interviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="rescheduled">Rescheduled</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                <SelectTrigger className="w-40">
                  <Users className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Research">Research</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interview Tabs */}
      <Tabs defaultValue="list" className="space-y-6">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="department">By Department</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Interview Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidate</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Interviewers</TableHead>
                    <TableHead>Mode</TableHead>
                    <TableHead>Round</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInterviews.map(interview => (
                    <TableRow key={interview.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={interview.candidate.avatar} />
                            <AvatarFallback>
                              {interview.candidate.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{interview.candidate.name}</p>
                            <p className="text-xs text-muted-foreground">{interview.candidate.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">{interview.candidate.position}</p>
                          <p className="text-xs text-muted-foreground">{interview.department}</p>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">{format(interview.date, 'MMM dd, yyyy')}</p>
                          <p className="text-xs text-muted-foreground">
                            {interview.time} ({interview.duration} min)
                          </p>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="space-y-1">
                          {interview.interviewers.map((interviewer, index) => (
                            <div key={index} className="text-sm">
                              <p className="font-medium">{interviewer.name}</p>
                              <p className="text-xs text-muted-foreground">{interviewer.role}</p>
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getModeIcon(interview.mode)}
                          <div>
                            <p className="text-sm capitalize">{interview.mode.replace('-', ' ')}</p>
                            <p className="text-xs text-muted-foreground">{interview.location}</p>
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <Badge variant="outline">{interview.round}</Badge>
                      </TableCell>
                      
                      <TableCell>
                        <Badge className={getStatusColor(interview.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(interview.status)}
                            <span className="capitalize">{interview.status}</span>
                          </div>
                        </Badge>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Calendar View</h3>
                <p className="text-muted-foreground">
                  Interactive calendar view will be implemented here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="department">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {['Engineering', 'Marketing', 'Education', 'Finance'].map(dept => {
              const deptInterviews = filteredInterviews.filter(i => i.department === dept);
              return (
                <Card key={dept}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{dept}</span>
                      <Badge variant="outline">{deptInterviews.length} interviews</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {deptInterviews.slice(0, 3).map(interview => (
                        <div key={interview.id} className="flex items-center gap-3 p-3 border rounded-lg">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={interview.candidate.avatar} />
                            <AvatarFallback>
                              {interview.candidate.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{interview.candidate.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {format(interview.date, 'MMM dd')} at {interview.time}
                            </p>
                          </div>
                          <Badge className={getStatusColor(interview.status)}>
                            {interview.status}
                          </Badge>
                        </div>
                      ))}
                      {deptInterviews.length > 3 && (
                        <p className="text-sm text-muted-foreground text-center">
                          +{deptInterviews.length - 3} more interviews
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InterviewManagement;