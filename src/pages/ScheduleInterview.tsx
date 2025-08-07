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
  Briefcase
} from 'lucide-react';
import { addDays, format, startOfWeek } from 'date-fns';
import { cn } from '@/lib/utils';

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
];

const fixedInterviews = [
  { day: 0, time: '09:00', candidate: 'Ahmed Hassan' },
  { day: 1, time: '10:30', candidate: 'Fatima Benali' },
  { day: 2, time: '14:00', candidate: 'Omar Khalil' },
];
const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 }); // Monday
const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));


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
      name: 'Digital Transformation Team',
      role: 'Technical Lead',
      businessUnit: 'Engineering',
      email: 'mohammed.faisal@icesco.org',
      avatar: '/api/placeholder/40/40',
      availability: 'Available'
    },
    {
      id: 2,
      name: 'Education',
      role: 'HR Director',
      businessUnit: 'Human Resources',
      email: 'fatima.zahra@icesco.org',
      avatar: '/api/placeholder/40/40',
      availability: 'Available'
    },
    {
      id: 3,
      name: 'Finance',
      role: 'Business Unit Head',
      businessUnit: 'Education',
      email: 'youssef.ahmed@icesco.org',
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
    interviewer.businessUnit.toLowerCase().includes(interviewerSearch.toLowerCase())
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
    <div className="w-full max-w-full mx-auto p-6 space-y-6">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {/* Left Column - Position & Candidate */}
        <div className="space-y-6 col-span-1">
          {/* Position Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-6 w-6 text-primary" />
                Select Position
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select job position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pos1">Senior Education Specialist</SelectItem>
                    <SelectItem value="pos2">Digital Transformation Manager</SelectItem>
                    <SelectItem value="pos3">Research Coordinator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6 col-span-1">
          {/* Interviewer Selection */}
       <Card>
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <Users className="h-6 w-6 text-primary" />
      Select Business Unit
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
      {/* Only show suggestions if user has typed something */}
      {interviewerSearch.trim().length > 0 && (
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
              onClick={() => {
                if (interviewer.availability === 'Available' && !selectedInterviewers.find(i => i.id === interviewer.id)) {
                  handleInterviewerSelect(interviewer);
                  setInterviewerSearch(''); // Clear input after selection
                }
              }}
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
                  <p className="text-xs text-muted-foreground">{interviewer.businessUnit}</p>
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
          {filteredInterviewers.length === 0 && (
            <div className="text-center text-muted-foreground text-sm py-2">No business units found.</div>
          )}
        </div>
      )}
    </div>
  </CardContent>
</Card>
        </div>

     <Card>
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <Users className="h-6 w-6 text-primary" />
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
      {/* Only show suggestions if user has typed something */}
      {candidateSearch.trim().length > 0 && (
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
              onClick={() => {
                setSelectedCandidate(candidate);
                setCandidateSearch(''); // Clear input after selection
              }}
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
          {filteredCandidates.length === 0 && (
            <div className="text-center text-muted-foreground text-sm py-2">No candidates found.</div>
          )}
        </div>
      )}

      {/* Display the selected candidate */}
      {selectedCandidate && (
        <div className="mt-4 flex items-center gap-3 border rounded-lg p-3 bg-primary/5">
          <Avatar className="h-10 w-10">
            <AvatarImage src={selectedCandidate.avatar} />
            <AvatarFallback>
              {selectedCandidate.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">{selectedCandidate.name}</div>
            <div className="text-xs text-muted-foreground">{selectedCandidate.position}</div>
            <Badge variant="outline" className="text-xs mt-1">
              {selectedCandidate.status}
            </Badge>
          </div>
        </div>
      )}
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
        </div>

        {/* Middle Column - Interviewers */}
        

        {/* Right Column - Date, Time & Details */}
        <div className="space-y-6 col-span-1">
          {/* Date & Time Selection */}
        <Card>
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <CalendarIcon className="h-6 w-6 text-primary" />
      Date & Time
    </CardTitle>
  </CardHeader>
  <CardContent>
    {/* Date & Time Picker */}
    <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
      <div className="flex items-center gap-2">
        <Label>Date</Label>
        <Input
          type="date"
          value={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''}
          onChange={e => {
            const val = e.target.value;
            setSelectedDate(val ? new Date(val) : undefined);
          }}
        />
      </div>
      <div className="flex items-center gap-2">
        <Label>Time</Label>
        <Input
          type="time"
          value={selectedTime}
          onChange={e => setSelectedTime(e.target.value)}
        />
      </div>
      <Button
        type="button"
        onClick={() => {
          if (selectedDate && selectedTime) {
            // Find the day index in the week
            const dayIdx = days.findIndex(
              d => format(d, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
            );
            if (dayIdx !== -1) {
              // Optionally, you can add logic to add a new interview to fixedInterviews here
              // For now, just scroll to the selected cell or highlight it
              // (No-op, as the calendar will reflect the selection)
            }
          }
        }}
        disabled={!selectedDate || !selectedTime}
        className="ml-2"
      >
        Set in Calendar
      </Button>
    </div>
    {/* Calendar Table */}
    <div className="overflow-x-auto">
      <table className="min-w-full border-separate border-spacing-0 rounded-lg shadow-sm bg-white">
        <thead>
          <tr>
            <th className="sticky left-0 z-10 bg-white border-b border-r p-3 font-semibold text-gray-700 text-left w-32">
              Day / Time
            </th>
            {timeSlots.map(time => (
              <th
                key={time}
                className="border-b p-3 font-semibold text-gray-700 bg-gray-50 text-center"
                style={{ minWidth: 80 }}
              >
                {time}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((day, dayIdx) => (
            <tr key={day.toISOString()} className="hover:bg-blue-50 transition">
              <td className="sticky left-0 z-10 bg-white border-r p-3 font-medium text-gray-800 text-left">
                <div>
                  <span className="block text-base">{format(day, 'EEE')}</span>
                  <span className="block text-xs text-gray-500">{format(day, 'dd/MM')}</span>
                </div>
              </td>
              {timeSlots.map(time => {
                const interview = fixedInterviews.find(
                  i => i.day === dayIdx && i.time === time
                );
                const isSelected =
                  selectedDate &&
                  selectedTime &&
                  format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd') &&
                  selectedTime === time;
                return (
                  <td
                    key={time}
                    className={cn(
                      "border-b border-r p-2 align-middle text-center transition",
                      interview
                        ? "bg-teal-100 border-teal-200"
                        : isSelected
                        ? "bg-blue-200 border-blue-400"
                        : "bg-white hover:bg-teal-50"
                    )}
                    style={{ minWidth: 80, height: 48 }}
                  >
                    {interview ? (
                      <div className="flex flex-col items-center justify-center">
                        <span className="bg-teal-500 text-white rounded px-2 py-1 text-xs font-semibold shadow">
                          {interview.candidate}
                        </span>
                      </div>
                    ) : isSelected ? (
                      <span className="text-blue-700 font-bold text-lg">✓</span>
                    ) : (
                      <span className="text-gray-300 text-lg">•</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
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