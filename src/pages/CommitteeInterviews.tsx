import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
import InterviewEvaluationDialog from '@/components/eva';

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
  evaluation?: {
    scores?: Record<string, number>;
    notes?: Record<string, string>;
    recommendation?: string;
    finalNotes?: string;
  };
}

interface EvaluationCategory {
  id: string;
  name: string;
  emoji: string;
  description: string;
  maxPoints: number;
}

interface Interview extends ScheduledInterview {
  candidate: string;
  totalScore?: number;
}

const evaluationCategories: EvaluationCategory[] = [
  {
    id: 'technical',
    name: 'Technical Skills',
    emoji: '💻',
    description: 'Ability to demonstrate technical expertise relevant to the role',
    maxPoints: 30,
  },
  {
    id: 'communication',
    name: 'Communication',
    emoji: '🗣️',
    description: 'Clarity and effectiveness in verbal and written communication',
    maxPoints: 25,
  },
  {
    id: 'problemSolving',
    name: 'Problem Solving',
    emoji: '🧠',
    description: 'Ability to analyze and solve complex problems',
    maxPoints: 25,
  },
  {
    id: 'culturalFit',
    name: 'Cultural Fit',
    emoji: '🤝',
    description: 'Alignment with company values and team dynamics',
    maxPoints: 20,
  },
];

const CommitteeInterviews: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [dateRange, setDateRange] = useState('year');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('proposed');
  const [showEvaluations, setShowEvaluations] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [evaluationScores, setEvaluationScores] = useState<Record<string, number>>({});
  const [evaluationNotes, setEvaluationNotes] = useState<Record<string, string>>({});
  const [recommendation, setRecommendation] = useState('');
  const [finalNotes, setFinalNotes] = useState('');

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
      notes: 'Candidate has strong technical background and relevant experience.',
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
      notes: 'Excellent communication skills and marketing experience.',
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
      notes: 'Strong analytical skills and research background.',
    },
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
      notes: 'Virtual interview via Google Meet',
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
      notes: 'Interview completed successfully. Candidate showed strong leadership skills.',
      evaluation: {
        scores: {
          technical: 25,
          communication: 20,
          problemSolving: 22,
          culturalFit: 18,
        },
        notes: {
          technical: 'Demonstrated strong coding skills.',
          communication: 'Clear and concise communication.',
          problemSolving: 'Effective problem-solving approach.',
          culturalFit: 'Good alignment with team values.',
        },
        recommendation: 'Hire',
        finalNotes: 'Strong candidate with excellent potential.',
      },
    },
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
    { title: 'Completed Interviews', value: completedInterviews, icon: AlertCircle, description: 'Finished evaluations' },
  ];

  const getStatusColor = (status: string) => {
    const colorMap: { [key: string]: string } = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'accepted': 'bg-green-100 text-green-800',
      'declined': 'bg-red-100 text-red-800',
      'rescheduled': 'bg-blue-100 text-blue-800',
      'upcoming': 'bg-purple-100 text-purple-800',
      'completed': 'bg-green-100 text-green-800',
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

  const handleViewCandidate = (interviewId: string) => {
    const interview = scheduledInterviews.find(i => i.id === interviewId);
    if (interview) {
      setSelectedInterview({
        ...interview,
        candidate: interview.candidateName,
        totalScore: interview.evaluation
          ? Object.values(interview.evaluation.scores || {}).reduce((sum, score) => sum + score, 0)
          : 0,
      });
      setEvaluationScores(interview.evaluation?.scores || {});
      setEvaluationNotes(interview.evaluation?.notes || {});
      setRecommendation(interview.evaluation?.recommendation || '');
      setFinalNotes(interview.evaluation?.finalNotes || '');
      setShowEvaluations(true);
    }
  };

  const getTotalScore = () => {
    return Object.values(evaluationScores).reduce((sum, score) => sum + score, 0);
  };

  const getScorePercentage = (score: number, maxPoints: number) => {
    return (score / maxPoints) * 100;
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 75) return 'bg-green-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const handleScoreChange = (categoryId: string, value: string) => {
    const score = Math.max(0, Math.min(parseInt(value) || 0, evaluationCategories.find(c => c.id === categoryId)?.maxPoints || 100));
    setEvaluationScores(prev => ({ ...prev, [categoryId]: score }));
  };

  const handleNoteChange = (categoryId: string, value: string) => {
    setEvaluationNotes(prev => ({ ...prev, [categoryId]: value }));
  };

  const handleSaveEvaluation = () => {
    console.log('Saving evaluation:', { evaluationScores, evaluationNotes, recommendation, finalNotes });
    setIsEditMode(false);
    setShowEvaluations(false);
    // Here you would typically make an API call to save the evaluation
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

      {showEvaluations && selectedInterview && (
        <Dialog open={showEvaluations} onOpenChange={setShowEvaluations}>
          <InterviewEvaluationDialog
            selectedInterview={selectedInterview}
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
            evaluationCategories={evaluationCategories}
            evaluationScores={evaluationScores}
            evaluationNotes={evaluationNotes}
            recommendation={recommendation}
            finalNotes={finalNotes}
            setRecommendation={setRecommendation}
            setFinalNotes={setFinalNotes}
            handleScoreChange={handleScoreChange}
            handleNoteChange={handleNoteChange}
            handleSaveEvaluation={handleSaveEvaluation}
            getTotalScore={getTotalScore}
            getScorePercentage={getScorePercentage}
            getProgressColor={getProgressColor}
          />
        </Dialog>
      )}
    </div>
  );
};

export default CommitteeInterviews;