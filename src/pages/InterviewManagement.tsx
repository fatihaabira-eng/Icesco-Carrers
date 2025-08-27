// InterviewData type for modal integration
interface InterviewData {
  date: string;
  time: string;
  type?: string;
  candidate?: string;
  jobPosition?: string;
  location?: string;
  duration?: string;
  businessUnit?: string;
  questions?: any[];
}
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
  ChevronRight,
  CheckCheck,
  CalendarCog
} from 'lucide-react';
import { format, addDays, startOfWeek, addWeeks, isSameDay } from 'date-fns';
import { getInterviews } from '../data/interviewsData';
import Pagination from '@/components/Pagination';
import { candidatesData, Candidate } from '../data/candidatesData';
import { useNavigate } from 'react-router-dom';
import { InterviewModal } from '@/components/interview-shortlisted-modal';

// Define the types for our data structures

const InterviewManagement: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterBusinessUnit, setFilterBusinessUnit] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false);
  const [selectedInterviewCandidate, setSelectedInterviewCandidate] = useState<Candidate | null>(null);
  const [scheduledInterviews, setScheduledInterviews] = useState<{ [ref: string]: InterviewData }>({});
  const [interviews, setInterviews] = useState(getInterviews(addWeeks(startOfWeek(new Date(), { weekStartsOn: 1 }), 0)));
  const [editingInterview, setEditingInterview] = useState<any | null>(null); // Track interview being edited

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // you can make this selectable

  const currentWeek = addWeeks(startOfWeek(new Date(), { weekStartsOn: 1 }), selectedWeek);
  const handleScheduleInterview = (candidateRef: string, interviewData: InterviewData) => {
    setScheduledInterviews(prev => ({ ...prev, [candidateRef]: interviewData }));
    if (editingInterview) {
      // Update existing interview
      setInterviews(prev => prev.map(interview =>
        interview.id === editingInterview.id
          ? {
              ...interview,
              candidate: {
                name: interviewData.candidate || '',
                position: interviewData.jobPosition || '',
                avatar: selectedInterviewCandidate?.avatar || '',
              },
              date: interviewData.date,
              time: interviewData.time,
              duration: interviewData.duration ? parseInt(interviewData.duration) : 60,
              round: interviewData.type || '',
              location: interviewData.location || '',
              businessUnit: interviewData.businessUnit || '',
            }
          : interview
      ));
    } else {
      // Add new interview
      setInterviews(prev => [
        ...prev,
        {
          id: prev.length ? Math.max(...prev.map(i => i.id)) + 1 : 1,
          candidate: {
            name: interviewData.candidate || '',
            position: interviewData.jobPosition || '',
            avatar: selectedInterviewCandidate?.avatar || '',
          },
          date: interviewData.date,
          time: interviewData.time,
          duration: interviewData.duration ? parseInt(interviewData.duration) : 60,
          round: interviewData.type || '',
          mode: 'video',
          location: interviewData.location || '',
          status: 'scheduled',
          businessUnit: interviewData.businessUnit || '',
        }
      ]);
    }
    setIsInterviewModalOpen(false);
    setEditingInterview(null);
  };
  // Week navigation handlers
  const handlePrevWeek = () => setSelectedWeek((prev) => prev - 1);
  const handleNextWeek = () => setSelectedWeek((prev) => prev + 1);

  // Use interviews state variable only

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
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
      case 'completed': return 'bg-green-400';
      case 'rescheduled': return 'bg-orange-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'completed': return <CheckCheck className="h-4 w-4 text-green-800" />;
      case 'cancelled': return <XCircle className="h-4 w-4 text-green-700" />;
      case 'rescheduled': return <CalendarCog className="h-4 w-4 text-orange-800" />;
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
    const matchesRound = filterBusinessUnit === 'all' || interview.round === filterBusinessUnit;
    const interviewDate = new Date(interview.date);
    const matchesWeek = interviewDate >= currentWeek && interviewDate < addDays(currentWeek, 7);

    return matchesSearch && matchesStatus && matchesRound && matchesWeek;
  });

  const getWeeklyStats = () => {
    const weekInterviews = interviews.filter(interview =>
      new Date(interview.date) >= currentWeek && new Date(interview.date) < addDays(currentWeek, 7)
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


  
  // PAGINATION LOGIC
  const totalPages = Math.ceil(filteredInterviews.length / itemsPerPage);
  const paginatedInterviews = filteredInterviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const weeklyStats = getWeeklyStats();

  const daysOfWeek = Array.from({ length: 7 }, (_, i) => addDays(currentWeek, i));

  const navigate = useNavigate();

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
            <Button 
              variant="outline" 
              className="bg-primary text-white border-primary hover:bg-primary-ligh"
              onClick={() => {
                setIsInterviewModalOpen(true);
                setSelectedInterviewCandidate({
                  id: 'new',
                  businessUnit: '',
                  score: 0,
                  ref: 'new',
                  name: '',
                  position: '',
                  nationality: '',
                  flag: '',
                  age: 0,
                  degree: '',
                  university: '',
                  experience: '',
                  matchingScore: 0,
                  skills: [],
                  languages: [],
                  phase: '',
                  decision: 'under_review',
                  avatar: '',
                  hrAction: 'not-reviewed',
                  appliedDate: '',
                  email: '',
                  status: 'new',
                  phone: '',
                  location: '',
                  year: new Date().getFullYear(),
                  videoUrl: '',
                  aiScreeningScore: 0,
                  aiRecommendations: [],
                  resumeData: {
                    extractedSkills: [],
                    workExperience: [],
                    education: [],
                    certifications: [],
                    languages: [],
                    parsedDate: ''
                  },
                  education: '',
                });
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Schedule New
            </Button>
          </div>
        </div>


        {/* Filters and Controls */}
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center mt-4">
              {/* Week Navigation */}
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="border-blue-200 text-blue-800 hover:bg-blue-100" onClick={handlePrevWeek}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium text-center w-48 text-gray-800">
                  {format(currentWeek, 'MMM dd')} - {format(addDays(currentWeek, 6), 'MMM dd, yyyy')}
                </span>
                <Button variant="outline" size="icon" className="border-blue-200 text-blue-800 hover:bg-blue-100" onClick={handleNextWeek}>
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
                      <Filter className="h-4 w-4 mr-2 text-[#0b787f]" />
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
                      <Users className="h-4 w-4 mr-2 text-[#0b787f]" />
                      <SelectValue placeholder="Round" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Rounds</SelectItem>
                      <SelectItem value="HR">HR</SelectItem>
                      <SelectItem value="Technical">Technical</SelectItem>
                      <SelectItem value="Committee">Committee</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>



             {/* Interview Tabs */}
        <Tabs defaultValue="list" className="space-y-6 mt-6">
          <TabsList className="bg-gray-100">
            <TabsTrigger value="list" className="data-[state=active]:bg-[#d5f3f5] data-[state=active]:text-primary">List View</TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-[#d5f3f5] data-[state=active]:text-primary">Calendar View</TabsTrigger>
          </TabsList>

          <TabsContent value="list">
           
             <div className="border rounded-lg overflow-hidden">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow className="bg-gray-50 border-b border-gray-200">
                      <TableHead className="font-semibold text-gray-700 text-xs  tracking-wide py-3">Candidate</TableHead>
                      <TableHead className="font-semibold text-gray-700 text-xs  tracking-wide py-3">Position</TableHead>
                      <TableHead className="font-semibold text-gray-700 text-xs  tracking-wide py-3">Round</TableHead>
                      <TableHead className="font-semibold text-gray-700 text-xs  tracking-wide py-3">Mode</TableHead>
                      <TableHead className="font-semibold text-gray-700 text-xs  tracking-wide py-3">Date & Time</TableHead>
                      <TableHead className="font-semibold text-gray-700 text-xs  tracking-wide py-3">Status</TableHead>
                      <TableHead className="text-center font-semibold text-gray-700 text-xs  tracking-wide py-3">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedInterviews.length > 0 ? paginatedInterviews.map(interview => (
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
                            </div>
                            <Button size="icon" variant="ghost" className="ml-auto text-primary hover:bg-blue-100">
                              <Eye className="h-4 w-4" />
                            </Button>
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
                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-orange-600 hover:bg-orange-100"
                              onClick={() => {
                                setEditingInterview(interview);
                                setIsInterviewModalOpen(true);
                                setSelectedInterviewCandidate({
                                  id: 'edit',
                                  businessUnit: interview.businessUnit || '',
                                  score: 0,
                                  ref: 'edit',
                                  name: interview.candidate.name,
                                  position: interview.candidate.position,
                                  nationality: '',
                                  flag: '',
                                  age: 0,
                                  degree: '',
                                  university: '',
                                  experience: '',
                                  matchingScore: 0,
                                  skills: [],
                                  languages: [],
                                  phase: '',
                                  decision: 'under_review',
                                  avatar: interview.candidate.avatar,
                                  hrAction: 'not-reviewed',
                                  appliedDate: '',
                                  email: '',
                                  status: 'new',
                                  phone: '',
                                  location: interview.location,
                                  year: new Date().getFullYear(),
                                  videoUrl: '',
                                  aiScreeningScore: 0,
                                  aiRecommendations: [],
                                  resumeData: {
                                    extractedSkills: [],
                                    workExperience: [],
                                    education: [],
                                    certifications: [],
                                    languages: [],
                                    parsedDate: ''
                                  },
                                  education: '',
                                });
                              }}
                            >
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
              </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
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
          </CardContent>
        </Card>

       
      </div>

      {isInterviewModalOpen && selectedInterviewCandidate && (
        <InterviewModal
          selectedSlot={editingInterview
            ? {
                date: editingInterview.date,
                time: editingInterview.time,
                type: editingInterview.round || '',
                candidate: editingInterview.candidate.name || '',
                jobPosition: editingInterview.candidate.position || '',
                location: editingInterview.location,
                duration: String(editingInterview.duration),
                businessUnit: editingInterview.businessUnit,
              }
            : (() => {
                const slot = scheduledInterviews[selectedInterviewCandidate.ref];
                if (!slot) return { date: '', time: '' };
                if ('candidate' in slot && typeof slot.candidate === 'object') {
                  return {
                    date: slot.date,
                    time: slot.time,
                    type: (slot as any).round || '',
                    candidate: (slot as any).candidate && typeof (slot as any).candidate === 'object' ? ((slot as any).candidate.name || '') : '',
                    jobPosition: (slot as any).candidate && typeof (slot as any).candidate === 'object' ? ((slot as any).candidate.position || '') : '',
                    location: slot.location,
                    duration: String(slot.duration),
                    businessUnit: slot.businessUnit,
                  };
                }
                return slot;
              })()
          }
          onSchedule={(data) => handleScheduleInterview(selectedInterviewCandidate.ref, data)}
          onClose={() => { setIsInterviewModalOpen(false); setEditingInterview(null); }}
        />
      )}
    </div>
  );
};

export default InterviewManagement;