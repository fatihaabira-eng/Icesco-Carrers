import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import ScheduleInterview from '@/pages/ScheduleInterview';
import { 
  Eye, 
  Mail, 
  Calendar, 
  FileText, 
  Video, 
  Brain, 
  CheckCircle, 
  XCircle, 
  Clock,
  User,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  Star,
  MessageSquare,
  Send,
  Award,
  History,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  Download,
  ArrowRight,
  FileText as FileTextIcon
} from 'lucide-react';
import { format } from 'date-fns';

interface CandidateProfileProps {
  candidate: {
    id: string;
    name: string;
    email: string;
    phone: string;
    location: string;
    position: string;
    businessUnit: string;
    status: 'new' | 'under_review' | 'interview' | 'offer' | 'hired' | 'rejected' | 'declined';
    score: number;
    appliedDate: string;
    avatar?: string;
    nationality: string;
    experience: string;
    skills: string[];
    education: string;
    videoUrl?: string;
    aiScreeningScore: number;
    aiRecommendations: string[];
    resumeUrl?: string;
    resumeData?: {
      extractedSkills: string[];
      workExperience: string[];
      education: string[];
      certifications: string[];
      languages: string[];
      parsedDate: string;
    };
  };
  onClose: () => void;
  onStatusChange: (candidateId: string, newStatus: string, reason?: string) => void;
}

const CandidateProfile: React.FC<CandidateProfileProps> = ({
  candidate,
  onClose,
  onStatusChange
}) => {
  const [currentPhase, setCurrentPhase] = useState(candidate.status);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectionDialog, setShowRejectionDialog] = useState(false);
  const [showScheduleInterview, setShowScheduleInterview] = useState(false);

  const phases = [
    { id: 'new', title: 'New', color: 'bg-blue-100 text-blue-800', nextPhase: 'under_review' },
    { id: 'under_review', title: 'Under Review', color: 'bg-yellow-100 text-yellow-800', nextPhase: 'interview' },
    { id: 'interview', title: 'Interview', color: 'bg-purple-100 text-purple-800', nextPhase: 'offer' },
    { id: 'offer', title: 'Offer', color: 'bg-orange-100 text-orange-800', nextPhase: 'hired' },
    { id: 'hired', title: 'Hired', color: 'bg-green-100 text-green-800', nextPhase: null },
  ];

  const currentPhaseData = phases.find(phase => phase.id === currentPhase);
  const nextPhaseData = phases.find(phase => phase.id === currentPhaseData?.nextPhase);

  const actions = [
    { id: 'reject', label: 'Reject', icon: XCircle, variant: 'destructive' as const },
    { id: 'shortlist', label: 'Shortlist', icon: Star, variant: 'default' as const },
    { id: 'schedule_interview', label: 'Schedule Interview', icon: Calendar, variant: 'outline' as const },
  ];

  const rejectionReasons = [
    'Unavailability full time to Morocco',
    'Salary requirements not met',
    'Requires another title/position',
    'Skills mismatch',
    'Experience level not suitable',
    'Other'
  ];

  const history = [
    {
      id: '1',
      action: 'Application Received',
      date: '2024-01-15T10:30:00Z',
      user: 'System',
      details: 'Candidate applied for Senior Software Engineer position',
      phase: 'new'
    },
    {
      id: '2',
      action: 'AI Screening Completed',
      date: '2024-01-15T11:45:00Z',
      user: 'AI System',
      details: 'AI screening score: 92% - Recommended for interview',
      phase: 'new'
    },
    {
      id: '3',
      action: 'Status Updated',
      date: '2024-01-16T09:15:00Z',
      user: 'HR Manager',
      details: 'Status changed from New to Under Review',
      phase: 'under_review'
    },
    {
      id: '4',
      action: 'Interview Scheduled',
      date: '2024-01-17T14:20:00Z',
      user: 'HR Coordinator',
      details: 'Technical interview scheduled for 2024-01-25',
      phase: 'interview'
    },
    {
      id: '5',
      action: 'Interview Completed',
      date: '2024-01-25T16:30:00Z',
      user: 'Technical Interviewer',
      details: 'Technical interview completed successfully',
      phase: 'interview'
    },
    {
      id: '6',
      action: 'Offer Sent',
      date: '2024-01-26T10:00:00Z',
      user: 'HR Manager',
      details: 'Job offer sent to candidate',
      phase: 'offer'
    }
  ];

  const handleAction = (actionId: string) => {
    switch (actionId) {
      case 'reject':
        setShowRejectionDialog(true);
        break;
      case 'shortlist':
        onStatusChange(candidate.id, 'under_review');
        break;
      case 'send_mail':
        // Handle send mail
        console.log('Sending mail to:', candidate.email);
        break;
      case 'schedule_interview':
        setShowScheduleInterview(true);
        break;
      case 'send_offer':
        onStatusChange(candidate.id, 'offer');
        break;
    }
  };

  const handleMoveToNextPhase = () => {
    if (nextPhaseData) {
      onStatusChange(candidate.id, nextPhaseData.id);
    }
  };

  const handleRejectWithReason = () => {
    onStatusChange(candidate.id, 'rejected', rejectionReason);
    setShowRejectionDialog(false);
    setRejectionReason('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'under_review':
        return 'bg-yellow-100 text-yellow-800';
      case 'interview':
        return 'bg-purple-100 text-purple-800';
      case 'offer':
        return 'bg-orange-100 text-orange-800';
      case 'hired':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'declined':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'under_review':
        return 'bg-yellow-100 text-yellow-800';
      case 'interview':
        return 'bg-purple-100 text-purple-800';
      case 'offer':
        return 'bg-orange-100 text-orange-800';
      case 'hired':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-lg w-full max-w-7xl max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={candidate.avatar} />
              <AvatarFallback>
                {candidate.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{candidate.name}</h2>
                              <p className="text-muted-foreground">{candidate.position} • {candidate.businessUnit}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <XCircle className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex h-[calc(95vh-120px)]">
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Candidate Data */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Candidate Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Email</label>
                      <p className="text-sm">{candidate.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Phone</label>
                      <p className="text-sm">{candidate.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Location</label>
                      <p className="text-sm">{candidate.location}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Nationality</label>
                      <p className="text-sm">{candidate.nationality}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Experience</label>
                      <p className="text-sm">{candidate.experience}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Applied Date</label>
                      <p className="text-sm">{format(new Date(candidate.appliedDate), 'PPP')}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">University</label>
                    <p className="text-sm">{candidate.education}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Skills</label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {candidate.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Matching</label>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(candidate.status)}>
                        80%
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Current Phase */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>Current Phase</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Badge className={currentPhaseData?.color}>
                        {currentPhaseData?.title}
                      </Badge>
                      <span className="text-sm text-muted-foreground">Current Phase</span>
                    </div>
                    {nextPhaseData && (
                      <Button
                        onClick={handleMoveToNextPhase}
                        className="flex items-center space-x-2"
                      >
                        <span>Move to {nextPhaseData.title}</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  {/* Phase Options */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Update Phase:</label>
                    <div className="flex flex-wrap gap-2">
                      {phases.map((phase) => (
                        <Button
                          key={phase.id}
                          variant={currentPhase === phase.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => onStatusChange(candidate.id, phase.id)}
                        >
                          {phase.title}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Video Screening Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Video className="h-5 w-5" />
                    <span>Video Screening</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Video Player */}
                  <div className="relative bg-gray-900 rounded-lg overflow-hidden">
                    {candidate.videoUrl ? (
                      <video
                        className="w-full h-48 object-cover"
                        controls
                        src={candidate.videoUrl}
                      >
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <div className="w-full h-48 bg-gray-800 flex items-center justify-center">
                        <div className="text-center text-gray-400">
                          <Video className="h-12 w-12 mx-auto mb-2" />
                          <p>No video available</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* AI Screening Results */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">AI Screening Score</span>
                      <Badge className="bg-purple-100 text-purple-800">
                        {candidate.aiScreeningScore}%
                      </Badge>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium">AI Recommendations</span>
                      <div className="mt-2 space-y-1">
                        {candidate.aiRecommendations.map((rec, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Resume Parsing Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileTextIcon className="h-5 w-5" />
                    <span>Resume Parsing</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {candidate.resumeData ? (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Extracted Skills</label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {candidate.resumeData.extractedSkills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium">Work Experience</label>
                        <div className="space-y-1 mt-1">
                          {candidate.resumeData.workExperience.map((exp, index) => (
                            <div key={index} className="text-sm p-2 bg-muted rounded">
                              {exp}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium">Education</label>
                        <div className="space-y-1 mt-1">
                          {candidate.resumeData.education.map((edu, index) => (
                            <div key={index} className="text-sm p-2 bg-muted rounded">
                              {edu}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium">Certifications</label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {candidate.resumeData.certifications.map((cert, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium">Languages</label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {candidate.resumeData.languages.map((lang, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        Parsed on: {format(new Date(candidate.resumeData.parsedDate), 'PPP')}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground py-8">
                      <FileTextIcon className="h-12 w-12 mx-auto mb-2" />
                      <p>No resume data available</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Send className="h-5 w-5" />
                    <span>Take Actions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-3">
                    {actions.map((action) => (
                      <Button
                        key={action.id}
                        variant={action.variant}
                        className="justify-start"
                        onClick={() => handleAction(action.id)}
                      >
                        <action.icon className="h-4 w-4 mr-2" />
                        {action.label}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Sidebar - History */}
          {/* <div className="w-80 border-l bg-muted/20">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <History className="h-5 w-5" />
                <span>Activity History</span>
              </h3>
              <div className="space-y-4">
                {history.map((item) => (
                  <div key={item.id} className="border-l-2 border-primary pl-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-sm">{item.action}</p>
                          {item.phase && (
                            <Badge className={getPhaseColor(item.phase)}>
                              {phases.find(p => p.id === item.phase)?.title}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{item.details}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {format(new Date(item.date), 'MMM dd, yyyy HH:mm')}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {item.user}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div> */}
        </div>
      </div>

             {/* Rejection Reason Dialog */}
       <Dialog open={showRejectionDialog} onOpenChange={setShowRejectionDialog}>
         <DialogContent>
           <DialogHeader>
             <DialogTitle>Reject Candidate</DialogTitle>
           </DialogHeader>
           <div className="space-y-4">
             <div>
               <Label htmlFor="rejection-reason">Reason for Rejection</Label>
               <select
                 id="rejection-reason"
                 className="w-full mt-1 p-2 border rounded-md"
                 value={rejectionReason}
                 onChange={(e) => setRejectionReason(e.target.value)}
               >
                 <option value="">Select a reason...</option>
                 {rejectionReasons.map((reason) => (
                   <option key={reason} value={reason}>
                     {reason}
                   </option>
                 ))}
               </select>
             </div>
             <div className="flex justify-end space-x-2">
               <Button variant="outline" onClick={() => setShowRejectionDialog(false)}>
                 Cancel
               </Button>
               <Button variant="destructive" onClick={handleRejectWithReason}>
                 Reject Candidate
               </Button>
             </div>
           </div>
         </DialogContent>
       </Dialog>

       {/* Schedule Interview Modal */}
       {showScheduleInterview && (
         <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
           <div className="bg-background rounded-lg shadow-lg w-full max-w-6xl max-h-[95vh] overflow-hidden">
             <div className="flex items-center justify-between p-6 border-b">
               <h2 className="text-xl font-semibold">Schedule Interview for {candidate.name}</h2>
               <Button variant="ghost" size="icon" onClick={() => setShowScheduleInterview(false)}>
                 <XCircle className="h-5 w-5" />
               </Button>
             </div>
             <div className="overflow-y-auto max-h-[calc(95vh-120px)]">
               <ScheduleInterview />
             </div>
           </div>
         </div>
       )}
     </div>
   );
 };

export default CandidateProfile;