import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  Video, 
  MapPin, 
  Search,
  Plus,
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const ScheduleInterview: React.FC = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [selectedInterviewers, setSelectedInterviewers] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [interviewMode, setInterviewMode] = useState('');
  const [candidateSearch, setCandidateSearch] = useState('');
  const [interviewerSearch, setInterviewerSearch] = useState('');

  // Mock data for candidates
  const candidates = [
    {
      id: 1,
      name: 'Ahmed Hassan El-Masri',
      position: 'Senior Software Engineer',
      email: 'ahmed.hassan@email.com',
      phone: '+20 123 456 789',
      avatar: '/api/placeholder/40/40',
      status: 'Shortlisted'
    },
    {
      id: 2,
      name: 'Fatima Al-Zahra Benali',
      position: 'Marketing Manager',
      email: 'fatima.benali@email.com',
      phone: '+212 123 456 789',
      avatar: '/api/placeholder/40/40',
      status: 'Technical Round'
    },
    {
      id: 3,
      name: 'Omar Khalil Al-Rashid',
      position: 'Education Specialist',
      email: 'omar.rashid@email.com',
      phone: '+962 123 456 789',
      avatar: '/api/placeholder/40/40',
      status: 'HR Interview'
    }
  ];

  // Mock data for interviewers
  const interviewers = [
    {
      id: 1,
      name: 'Dr. Mohammed Al-Faisal',
      role: 'Technical Lead',
      department: 'Engineering',
      email: 'mohammed.faisal@icesco.org',
      avatar: '/api/placeholder/40/40',
      availability: 'Available'
    },
    {
      id: 2,
      name: 'Ms. Fatima El-Zahra',
      role: 'HR Director',
      department: 'Human Resources',
      email: 'fatima.zahra@icesco.org',
      avatar: '/api/placeholder/40/40',
      availability: 'Busy'
    },
    {
      id: 3,
      name: 'Dr. Youssef Ben Ahmed',
      role: 'Department Head',
      department: 'Education',
      email: 'youssef.ahmed@icesco.org',
      avatar: '/api/placeholder/40/40',
      availability: 'Available'
    },
    {
      id: 4,
      name: 'Ms. Amina Kone',
      role: 'Senior Manager',
      department: 'Finance',
      email: 'amina.kone@icesco.org',
      avatar: '/api/placeholder/40/40',
      availability: 'Available'
    }
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const filteredCandidates = candidates.filter(candidate =>
    candidate.name.toLowerCase().includes(candidateSearch.toLowerCase()) ||
    candidate.position.toLowerCase().includes(candidateSearch.toLowerCase())
  );

  const filteredInterviewers = interviewers.filter(interviewer =>
    interviewer.name.toLowerCase().includes(interviewerSearch.toLowerCase()) ||
    interviewer.department.toLowerCase().includes(interviewerSearch.toLowerCase())
  );

  const handleInterviewerSelect = (interviewer: any) => {
    if (!selectedInterviewers.find(i => i.id === interviewer.id)) {
      setSelectedInterviewers([...selectedInterviewers, interviewer]);
    }
  };

  const removeInterviewer = (interviewerId: number) => {
    setSelectedInterviewers(selectedInterviewers.filter(i => i.id !== interviewerId));
  };

  const handleSchedule = () => {
    // Handle interview scheduling logic
    console.log('Scheduling interview:', {
      candidate: selectedCandidate,
      interviewers: selectedInterviewers,
      date: selectedDate,
      time: selectedTime,
      mode: interviewMode
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Schedule Interview</h1>
          <p className="text-muted-foreground mt-1">
            Coordinate interviews with candidates and committee members
          </p>
        </div>
        <Button onClick={handleSchedule} disabled={!selectedCandidate || !selectedDate || !selectedTime}>
          <Plus className="h-4 w-4 mr-2" />
          Schedule Interview
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Candidate & Interviewers */}
        <div className="space-y-6">
          {/* Candidate Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Select Candidate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search candidates..."
                    value={candidateSearch}
                    onChange={(e) => setCandidateSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {filteredCandidates.map(candidate => (
                    <div
                      key={candidate.id}
                      className={cn(
                        "p-3 border rounded-lg cursor-pointer transition-colors",
                        selectedCandidate?.id === candidate.id 
                          ? "border-primary bg-primary/5" 
                          : "hover:bg-muted/50"
                      )}
                      onClick={() => setSelectedCandidate(candidate)}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={candidate.avatar} />
                          <AvatarFallback>
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{candidate.name}</p>
                          <p className="text-xs text-muted-foreground">{candidate.position}</p>
                          <Badge variant="outline" className="text-xs mt-1">
                            {candidate.status}
                          </Badge>
                        </div>
                        {selectedCandidate?.id === candidate.id && (
                          <CheckCircle className="h-5 w-5 text-primary" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interviewer Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Select Interviewers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Selected Interviewers */}
                {selectedInterviewers.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Selected Interviewers:</Label>
                    <div className="flex flex-wrap gap-2">
                      {selectedInterviewers.map(interviewer => (
                        <div
                          key={interviewer.id}
                          className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                        >
                          <span>{interviewer.name}</span>
                          <button
                            onClick={() => removeInterviewer(interviewer.id)}
                            className="hover:bg-primary/20 rounded-full p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search interviewers..."
                    value={interviewerSearch}
                    onChange={(e) => setInterviewerSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {filteredInterviewers.map(interviewer => (
                    <div
                      key={interviewer.id}
                      className={cn(
                        "p-3 border rounded-lg cursor-pointer transition-colors",
                        selectedInterviewers.find(i => i.id === interviewer.id)
                          ? "border-primary bg-primary/5"
                          : "hover:bg-muted/50",
                        interviewer.availability === 'Busy' && "opacity-50"
                      )}
                      onClick={() => interviewer.availability === 'Available' && handleInterviewerSelect(interviewer)}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={interviewer.avatar} />
                          <AvatarFallback>
                            {interviewer.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{interviewer.name}</p>
                          <p className="text-xs text-muted-foreground">{interviewer.role}</p>
                          <p className="text-xs text-muted-foreground">{interviewer.department}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {interviewer.availability === 'Available' ? (
                            <Badge variant="outline" className="text-green-600 border-green-200">
                              Available
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-red-600 border-red-200">
                              Busy
                            </Badge>
                          )}
                          {selectedInterviewers.find(i => i.id === interviewer.id) && (
                            <CheckCircle className="h-5 w-5 text-primary" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Date, Time & Details */}
        <div className="space-y-6">
          {/* Date & Time Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Date & Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Date Selection */}
                <div className="space-y-2">
                  <Label>Interview Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Time Selection */}
                <div className="space-y-2">
                  <Label>Interview Time</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map(time => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTime(time)}
                        className="text-xs"
                      >
                        <Clock className="h-3 w-3 mr-1" />
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interview Details */}
          <Card>
            <CardHeader>
              <CardTitle>Interview Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Interview Mode */}
                <div className="space-y-2">
                  <Label>Interview Mode</Label>
                  <Select value={interviewMode} onValueChange={setInterviewMode}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select interview mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">
                        <div className="flex items-center gap-2">
                          <Video className="h-4 w-4" />
                          Video Conference
                        </div>
                      </SelectItem>
                      <SelectItem value="in-person">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          In-Person
                        </div>
                      </SelectItem>
                      <SelectItem value="phone">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Phone Call
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Location/Link */}
                {interviewMode === 'in-person' && (
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input placeholder="Enter meeting location" />
                  </div>
                )}

                {interviewMode === 'video' && (
                  <div className="space-y-2">
                    <Label>Video Conference Link</Label>
                    <Input placeholder="Meeting link will be generated automatically" disabled />
                  </div>
                )}

                {/* Additional Notes */}
                <div className="space-y-2">
                  <Label>Additional Notes</Label>
                  <Textarea
                    placeholder="Add any special instructions or notes for the interview..."
                    rows={3}
                  />
                </div>

                {/* Email Notifications */}
                <div className="space-y-3">
                  <Label>Email Notifications</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="notify-candidate" defaultChecked />
                      <Label htmlFor="notify-candidate" className="text-sm">
                        Send invitation to candidate
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="notify-interviewers" defaultChecked />
                      <Label htmlFor="notify-interviewers" className="text-sm">
                        Send calendar invite to interviewers
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="reminder" defaultChecked />
                      <Label htmlFor="reminder" className="text-sm">
                        Send reminder 1 hour before interview
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          {selectedCandidate && selectedDate && selectedTime && (
            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle className="text-lg">Interview Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Candidate:</span>
                    <span className="font-medium">{selectedCandidate.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Position:</span>
                    <span>{selectedCandidate.position}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span>{format(selectedDate, "PPP")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time:</span>
                    <span>{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Interviewers:</span>
                    <span>{selectedInterviewers.length} selected</span>
                  </div>
                  {interviewMode && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Mode:</span>
                      <span className="capitalize">{interviewMode.replace('-', ' ')}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleInterview;