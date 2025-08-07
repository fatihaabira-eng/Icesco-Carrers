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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
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
  Eye,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { format, addDays, startOfWeek, addWeeks, isSameDay, getDay } from 'date-fns';

// Define the types for our data structures
type Candidate = {
  name: string;
  position: string;
  avatar: string;
};

type Interview = {
  id: number;
  candidate: Candidate;
  date: Date;
  time: string;
  duration: number;
  round: string;
  mode: 'video' | 'in-person' | 'phone';
  location: string;
  status: 'scheduled' | 'confirmed' | 'pending' | 'completed' | 'rescheduled' | 'cancelled';
  businessUnit: string;
};

const InterviewManagement: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterBusinessUnit, setFilterBusinessUnit] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const currentWeek = addWeeks(startOfWeek(new Date(), { weekStartsOn: 1 }), selectedWeek);

  // Mock interview data with real avatars from the internet 🖼️
  const interviews: Interview[] = [
    {
      id: 1,
      candidate: {
        name: 'Ahmed Hassan El-Masri',
        position: 'Senior Software Engineer',
        // --- Updated Avatar URL ---
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      date: addDays(currentWeek, 1),
      time: '10:00',
      duration: 60,
      round: 'Technical',
      mode: 'video',
      location: 'Google Meet',
      status: 'scheduled',
      businessUnit: 'Engineering',
    },
    {
      id: 2,
      candidate: {
        name: 'Fatima Al-Zahra Benali',
        position: 'Marketing Manager',
        // --- Updated Avatar URL ---
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
      },
      date: addDays(currentWeek, 2),
      time: '14:00',
      round: 'HR',
      duration: 45,
      mode: 'in-person',
      location: 'Conference Room A',
      status: 'confirmed',
      businessUnit: 'Marketing',
    },
    {
      id: 3,
      candidate: {
        name: 'Omar Khalil Al-Rashid',
        position: 'Education Specialist',
        // --- Updated Avatar URL ---
        avatar: 'https://randomuser.me/api/portraits/men/35.jpg'
      },
      date: addDays(currentWeek, 3),
      time: '11:30',
      duration: 60,
      round: 'Committee',
      mode: 'video',
      location: 'Zoom Meeting',
      status: 'pending',
      businessUnit: 'Education',
    },
    {
      id: 4,
      candidate: {
        name: 'Amina Kone Diabate',
        position: 'Financial Analyst',
        // --- Updated Avatar URL ---
        avatar: 'https://randomuser.me/api/portraits/women/23.jpg'
      },
      date: addDays(currentWeek, 4),
      time: '15:30',
      duration: 45,
      round: 'Technical',
      mode: 'phone',
      location: 'Phone Call',
      status: 'completed',
      businessUnit: 'Finance',
    },
    {
      id: 5,
      candidate: {
        name: 'Youssef Ben Mohamed',
        position: 'Data Scientist',
        // --- Updated Avatar URL ---
        avatar: 'https://randomuser.me/api/portraits/men/55.jpg'
      },
      date: addDays(currentWeek, 5),
      time: '09:00',
      round: 'HR',
      duration: 90,
      mode: 'in-person',
      location: 'Lab Room B',
      status: 'rescheduled',
      businessUnit: 'Research',
    },
    {
      id: 6,
      candidate: {
        name: 'Layla Ibrahim',
        position: 'UX Designer',
        // --- Updated Avatar URL ---
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
      },
      date: addDays(currentWeek, 1),
      time: '13:00',
      duration: 60,
      round: 'Technical',
      mode: 'video',
      location: 'Microsoft Teams',
      status: 'confirmed',
      businessUnit: 'Engineering',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'rescheduled': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusDotColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-500';
      case 'confirmed': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'completed': return 'bg-gray-500';
      case 'rescheduled': return 'bg-orange-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'cancelled': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <Calendar className="h-4 w-4 text-blue-600" />;
    }
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'video': return <Video className="h-4 w-4 text-blue-600" />;
      case 'in-person': return <MapPin className="h-4 w-4 text-green-600" />;
      case 'phone': return <Clock className="h-4 w-4 text-orange-600" />;
      default: return <Calendar className="h-4 w-4 text-gray-600" />;
    }
  };

  const filteredInterviews = interviews.filter(interview => {
    const matchesSearch = interview.candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.candidate.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || interview.status === filterStatus;
    const matchesBusinessUnit = filterBusinessUnit === 'all' || interview.businessUnit === filterBusinessUnit;

    return matchesSearch && matchesStatus && matchesBusinessUnit;
  });

  const getWeeklyStats = () => {
    const weekInterviews = interviews.filter(interview =>
      interview.date >= currentWeek && interview.date < addDays(currentWeek, 7)
    );

    return {
      total: weekInterviews.length,
      scheduled: weekInterviews.filter(i => i.status === 'scheduled').length,
      confirmed: weekInterviews.filter(i => i.status === 'confirmed').length,
      pending: weekInterviews.filter(i => i.status === 'pending').length,
      completed: weekInterviews.filter(i => i.status === 'completed').length,
      cancelled: weekInterviews.filter(i => i.status === 'cancelled').length
    };
  };

  const weeklyStats = getWeeklyStats();

  const daysOfWeek = Array.from({ length: 7 }, (_, i) => addDays(currentWeek, i));

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-8xl mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Interviews Management</h1>
            <p className="text-gray-600 mt-1">
              Manage and track all interview activities across business units.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-primary text-white border-primary hover:bg-primary-ligh">
              <Plus className="h-4 w-4 mr-2" />
              Schedule New
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        {/* <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="border-blue-200 shadow-sm">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Scheduled Interviews</p>
                <p className="text-2xl font-bold text-blue-800">{weeklyStats.total}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-green-200 shadow-sm">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Confirmed Interviews</p>
                <p className="text-2xl font-bold text-green-800">{weeklyStats.confirmed}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
      _200 shadow-sm">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Interviews</p>
                <p className="text-2xl font-bold text-yellow-800">{weeklyStats.pending}</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed Interviews</p>
                <p className="text-2xl font-bold text-gray-800">{weeklyStats.completed}</p>
              </div>
              <div className="p-2 bg-gray-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-gray-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-red-200 shadow-sm">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cancelled Interviews</p>
                <p className="text-2xl font-bold text-red-800">{weeklyStats.cancelled}</p>
              </div>
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div> */}

        {/* Filters and Controls */}
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
              {/* Week Navigation */}
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="border-blue-200 text-blue-800 hover:bg-blue-100">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium text-center w-48 text-gray-800">
                  {format(currentWeek, 'MMM dd')} - {format(addDays(currentWeek, 6), 'MMM dd, yyyy')}
                </span>
                <Button variant="outline" size="icon" className="border-blue-200 text-blue-800 hover:bg-blue-100">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex-1 flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600" />
                  <Input
                    placeholder="Search candidate or position..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-gray-200"
                  />
                </div>

                {/* Filters */}
                <div className="flex gap-2">
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full md:w-40 border-gray-200 text-gray-800">
                      <Filter className="h-4 w-4 mr-2 text-blue-600" />
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="rescheduled">Rescheduled</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filterBusinessUnit} onValueChange={setFilterBusinessUnit}>
                    <SelectTrigger className="w-full md:w-40 border-gray-200 text-gray-800">
                      <Users className="h-4 w-4 mr-2 text-green-600" />
                      <SelectValue placeholder="Business Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Units</SelectItem>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Research">Research</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interview Tabs */}
        <Tabs defaultValue="list" className="space-y-6">
          <TabsList className="bg-gray-100">
            <TabsTrigger value="list" className="data-[state=active]:bg-[#d5f3f5] data-[state=active]:text-primary">List View</TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-[#d5f3f5] data-[state=active]:text-primary">Calendar View</TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-0">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow className="bg-gray-50 border-b border-gray-200">
                      <TableHead className="font-semibold text-gray-700 text-xs uppercase tracking-wide py-3">Candidate</TableHead>
                      <TableHead className="font-semibold text-gray-700 text-xs uppercase tracking-wide py-3">Position</TableHead>
                      <TableHead className="font-semibold text-gray-700 text-xs uppercase tracking-wide py-3">Round</TableHead>
                      <TableHead className="font-semibold text-gray-700 text-xs uppercase tracking-wide py-3">Mode</TableHead>
                      <TableHead className="font-semibold text-gray-700 text-xs uppercase tracking-wide py-3">Date & Time</TableHead>
                      <TableHead className="font-semibold text-gray-700 text-xs uppercase tracking-wide py-3">Status</TableHead>
                      <TableHead className="text-center font-semibold text-gray-700 text-xs uppercase tracking-wide py-3">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInterviews.length > 0 ? filteredInterviews.map(interview => (
                      <TableRow key={interview.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                        <TableCell className="font-normal text-gray-600 py-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={interview.candidate.avatar} alt={interview.candidate.name} />
                              <AvatarFallback>
                                {interview.candidate.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm text-gray-800">{interview.candidate.name}</p>
                              <p className="text-xs text-gray-600">{interview.businessUnit}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-normal text-gray-600 py-4">
                          <p className="text-sm text-gray-800">{interview.candidate.position}</p>
                        </TableCell>
                        <TableCell className="font-normal text-gray-600 py-4">
                          <p className="text-sm text-gray-800 capitalize">{interview.round}</p>
                        </TableCell>
                        <TableCell className="font-normal text-gray-600 py-4">
                          <div className="flex items-center gap-2">
                            {getModeIcon(interview.mode)}
                            <div>
                              <p className="text-sm text-gray-800 capitalize">{interview.mode.replace('-', ' ')}</p>
                              <p className="text-xs text-gray-600">{interview.location}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-normal text-gray-600 py-4">
                          <div>
                            <p className="text-sm text-gray-800">{format(interview.date, 'E, MMM dd, yyyy')}</p>
                            <p className="text-xs text-gray-600">
                              {interview.time} ({interview.duration} min)
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="font-normal text-gray-600 py-4">
                          <Badge className={`${getStatusColor(interview.status)} hover:${getStatusColor(interview.status)}`}>
                            <div className="flex items-center gap-1.5">
                              {getStatusIcon(interview.status)}
                              <span className="capitalize">{interview.status}</span>
                            </div>
                          </Badge>
                        </TableCell>
                        <TableCell className="font-normal text-gray-600 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <Button size="icon" variant="ghost" className="text-blue-600 hover:bg-blue-100">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="text-orange-600 hover:bg-orange-100">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center font-normal text-gray-600">
                          No interviews found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar">
            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="grid grid-cols-7 border-t border-l border-gray-200">
                  {daysOfWeek.map(day => (
                    <div key={day.toString()} className="border-b border-r border-gray-200 text-center py-2 bg-gray-50">
                      <p className="text-sm font-semibold text-gray-700">{format(day, 'EEE')}</p>
                      <p className="text-2xl font-bold text-gray-800">{format(day, 'd')}</p>
                    </div>
                  ))}
                  {daysOfWeek.map(day => {
                    const dayInterviews = filteredInterviews
                      .filter(interview => isSameDay(interview.date, day))
                      .sort((a, b) => a.time.localeCompare(b.time));

                    return (
                      <div key={day.toString() + '-interviews'} className="h-48 border-r border-gray-200 p-1.5 space-y-2 overflow-y-auto bg-white">
                        {dayInterviews.map(interview => (
                          <TooltipProvider key={interview.id} delayDuration={100}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className={`p-2 rounded-lg cursor-pointer border-l-4 ${getStatusColor(interview.status).replace('bg-', 'border-')} bg-white shadow-sm hover:bg-gray-50`}>
                                  <div className="flex items-start gap-2">
                                    <div className={`w-2 h-2 rounded-full mt-1.5 ${getStatusDotColor(interview.status)}`}></div>
                                    <div className="flex-1">
                                      <p className="text-xs font-semibold text-gray-800 truncate">{interview.candidate.name}</p>
                                      <p className="text-xs text-gray-600">{interview.time}</p>
                                    </div>
                                  </div>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent className="w-64 bg-white border-gray-200">
                                <div className="flex items-start gap-3">
                                  <Avatar className="h-10 w-10 mt-1">
                                    <AvatarImage src={interview.candidate.avatar} />
                                    <AvatarFallback>{interview.candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-bold text-gray-800">{interview.candidate.name}</p>
                                    <p className="text-sm text-gray-600">{interview.candidate.position}</p>
                                    <hr className="my-2 border-gray-200" />
                                    <p className="text-sm text-gray-800"><Clock className="inline h-4 w-4 mr-2 text-blue-600" />{format(interview.date, 'MMM dd, yyyy')} at {interview.time}</p>
                                    <p className="text-sm text-gray-800"><MapPin className="inline h-4 w-4 mr-2 text-green-600" />{interview.location} ({interview.mode})</p>
                                    <div className="mt-2">
                                      <Badge className={`${getStatusColor(interview.status)}`}>{interview.status}</Badge>
                                    </div>
                                  </div>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InterviewManagement;