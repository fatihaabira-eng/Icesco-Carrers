import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Calendar,
  Search,
  Eye,
  Check,
  X,
  Clock,
  CheckCircle,
  Award,
  Users,
  Star,
  MessageSquare
} from 'lucide-react';

// Sample data for passed interviews
const passedInterviewsData = [
 {
    id: 1,
    candidate: "Ahmed Hassan El-Masri",
    position: "Senior Frontend Developer",
    dateTime: "2025-01-20 10:00 AM",
    status: "Completed",
    interviewer: "Dr. Mohammed Al-Rashid",
    totalScore: 0,
    evaluation: {
      scores: {
        educational: 0,
        experience: 0,
        technical: 0,
        strategic: 0,
        leadership: 0,
        communication: 0,
        cultural: 0,
        innovation: 0,
        collaboration: 0,
        commitment: 0,
        languages: 0
      },
      notes: {
        educational: "",
        experience: "",
        technical: "",
        strategic: "",
        leadership: "",
        communication: "",
        cultural: "",
        innovation: "",
        collaboration: "",
        commitment: "",
        languages: ""
      },
      recommendation: "Not recommended",
      finalNotes: "Candidate did not meet the minimum requirements for this position."
    }
  },
  {
    id: 2,
    candidate: "Fatima Al-Zahra Benali",
    position: "Product Manager",
    dateTime: "2025-01-18 2:00 PM",
    status: "Completed",
    interviewer: "Ms. Fatima Al-Kindi",
    totalScore: 92,
    evaluation: {
      scores: {
        educational: 7,
        experience: 9,
        technical: 16,
        strategic: 9,
        leadership: 8,
        communication: 9,
        cultural: 5,
        innovation: 8,
        collaboration: 5,
        commitment: 5,
        languages: 9
      },
      notes: {
        educational: "MBA from prestigious business school",
        experience: "10+ years in product management across different industries",
        technical: "Strong technical background with software development experience",
        strategic: "Excellent strategic planning and market analysis skills",
        leadership: "Proven track record of leading product teams",
        communication: "Outstanding presentation and stakeholder management",
        cultural: "Strong cultural awareness and sensitivity",
        innovation: "Creative problem-solving with user-centric approach",
        collaboration: "Excellent at building cross-functional partnerships",
        commitment: "Deeply aligned with organizational values",
        languages: "Trilingual - Arabic, French, English at native level"
      },
      recommendation: "Strongly recommended - top candidate",
      finalNotes: "Outstanding candidate with exceptional strategic thinking and communication skills."
    }
  },
  {
    id: 2,
    candidate: "Fatima Al-Zahra Benali",
    position: "Product Manager",
    dateTime: "2025-01-18 2:00 PM",
    status: "Completed",
    interviewer: "Ms. Fatima Al-Kindi",
    totalScore: 92,
    evaluation: {
      scores: {
        educational: 7,
        experience: 9,
        technical: 16,
        strategic: 9,
        leadership: 8,
        communication: 9,
        cultural: 5,
        innovation: 8,
        collaboration: 5,
        commitment: 5,
        languages: 9
      },
      notes: {
        educational: "MBA from prestigious business school",
        experience: "10+ years in product management across different industries",
        technical: "Strong technical background with software development experience",
        strategic: "Excellent strategic planning and market analysis skills",
        leadership: "Proven track record of leading product teams",
        communication: "Outstanding presentation and stakeholder management",
        cultural: "Strong cultural awareness and sensitivity",
        innovation: "Creative problem-solving with user-centric approach",
        collaboration: "Excellent at building cross-functional partnerships",
        commitment: "Deeply aligned with organizational values",
        languages: "Trilingual - Arabic, French, English at native level"
      },
      recommendation: "Strongly recommended - top candidate",
      finalNotes: "Outstanding candidate with exceptional strategic thinking and communication skills."
    }
  },
  {
    id: 3,
    candidate: "Omar Khalil Al-Rashid",
    position: "UX Designer",
    dateTime: "2025-01-15 11:00 AM",
    status: "Completed",
    interviewer: "Mr. Hassan Al-Mahmoud",
    totalScore: 78,
    evaluation: {
      scores: {
        educational: 5,
        experience: 7,
        technical: 15,
        strategic: 7,
        leadership: 6,
        communication: 7,
        cultural: 4,
        innovation: 8,
        collaboration: 4,
        commitment: 4,
        languages: 6
      },
      notes: {
        educational: "Bachelor's in Design with relevant certifications",
        experience: "5 years in UX design with portfolio of solid projects",
        technical: "Proficient in design tools and user research methods",
        strategic: "Good understanding of design strategy",
        leadership: "Some experience leading design projects",
        communication: "Good presentation skills, clear design rationale",
        cultural: "Adequate cultural understanding",
        innovation: "Creative design solutions and user-centered approach",
        collaboration: "Works well with development teams",
        commitment: "Shows interest in design excellence",
        languages: "Arabic and English proficiency"
      },
      recommendation: "Recommended with reservations",
      finalNotes: "Good candidate but needs development in strategic thinking and leadership."
    }
  }
];

// Sample data for upcoming interviews
const upcomingInterviewsData = [
  {
    id: 1,
    candidate: "Sarah Al-Mansouri",
    position: "Data Scientist",
    proposedDateTime: "2025-02-25 10:00 AM",
    status: "Pending",
    interviewer: "Dr. Ahmed Al-Rashid",
    candidateEmail: "sarah.almansouri@email.com",
    requestDate: "2025-02-20"
  },
  {
    id: 2,
    candidate: "Mohammed Al-Kindi",
    position: "Software Engineer",
    proposedDateTime: "2025-02-26 2:00 PM",
    status: "Pending",
    interviewer: "Ms. Aisha Al-Zahra",
    candidateEmail: "mohammed.alkindi@email.com",
    requestDate: "2025-02-18"
  },
  {
    id: 3,
    candidate: "Layla Hassan Al-Farisi",
    position: "Marketing Specialist",
    proposedDateTime: "2025-02-27 11:00 AM",
    status: "Pending",
    interviewer: "Mr. Khalil Al-Mahmoud",
    candidateEmail: "layla.alfarisi@email.com",
    requestDate: "2025-02-19"
  },
  {
    id: 4,
    candidate: "Yusuf Al-Rashid",
    position: "Project Manager",
    proposedDateTime: "2025-02-28 3:00 PM",
    status: "Accepted",
    interviewer: "Dr. Fatima Al-Kindi",
    candidateEmail: "yusuf.alrashid@email.com",
    requestDate: "2025-02-21"
  }
];

const evaluationCategories = [
  {
    id: 'educational',
    name: 'Educational Qualification',
    emoji: '🎓',
    maxPoints: 7,
    description: '2 pts masters, 5 pts doctorate, 1 pt per relevant certificate'
  },
  {
    id: 'experience',
    name: 'Professional Experience',
    emoji: '💼',
    maxPoints: 10,
    description: '4 pts for 5+ years, 6 pts leadership, 1 pt per major project'
  },
  {
    id: 'technical',
    name: 'Technical Skills',
    emoji: '🔧',
    maxPoints: 20,
    description: '15 pts deep expertise, 5 pts recent technologies'
  },
  {
    id: 'strategic',
    name: 'Strategic Thinking',
    emoji: '🎯',
    maxPoints: 10,
    description: '5 pts strategic plans, 5 pts vision, 2 pts future challenges'
  },
  {
    id: 'leadership',
    name: 'Leadership Skills',
    emoji: '👑',
    maxPoints: 10,
    description: '5 pts team leadership, 5 pts capacity building'
  },
  {
    id: 'communication',
    name: 'Communication Skills',
    emoji: '🗣️',
    maxPoints: 9,
    description: '8 pts verbal skills, 2 pts ICESCO representation'
  },
  {
    id: 'cultural',
    name: 'Cultural Awareness',
    emoji: '🌍',
    maxPoints: 5,
    description: '5 pts contextual understanding, 2 pts cultural diversity'
  },
  {
    id: 'innovation',
    name: 'Innovation & Problem Solving',
    emoji: '💡',
    maxPoints: 10,
    description: '10 pts innovation capacity, 5 pts problem solving'
  },
  {
    id: 'collaboration',
    name: 'Collaboration & Networking',
    emoji: '🤝',
    maxPoints: 5,
    description: '5 pts network maintenance, 2 pts collaborative initiatives'
  },
  {
    id: 'commitment',
    name: 'Commitment to ICESCO',
    emoji: '🎯',
    maxPoints: 5,
    description: '5 pts knowledge of values, 2 pts passion for domain'
  },
  {
    id: 'languages',
    name: 'ICESCO Languages',
    emoji: '🗣️',
    maxPoints: 9,
    description: '3 pts per ICESCO language (Arabic, French, English)'
  }
];

const BUInterviews: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [positionFilter, setPositionFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState(false);
  const [isProposeDateModalOpen, setIsProposeDateModalOpen] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<any>(null);
  const [proposedDate, setProposedDate] = useState("");
  const [proposedTime, setProposedTime] = useState("");
  const [proposeMessage, setProposeMessage] = useState("");
  
  // Edit evaluation states
  const [isEditMode, setIsEditMode] = useState(false);
  const [evaluationScores, setEvaluationScores] = useState<{ [key: string]: number }>({});
  const [evaluationNotes, setEvaluationNotes] = useState<{ [key: string]: string }>({});
  const [recommendation, setRecommendation] = useState("");
  const [finalNotes, setFinalNotes] = useState("");

  // Add state for upcoming interviews to make them dynamic
  const [upcomingInterviews, setUpcomingInterviews] = useState(upcomingInterviewsData);

  const filteredPassedInterviews = passedInterviewsData.filter((interview) => {
    const matchesSearch =
      interview.candidate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = positionFilter === "all" || interview.position.toLowerCase().includes(positionFilter.toLowerCase());

    return matchesSearch && matchesPosition;
  });

  const filteredUpcomingInterviews = upcomingInterviews.filter((interview) => {
    const matchesSearch =
      interview.candidate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || interview.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesPosition = positionFilter === "all" || interview.position.toLowerCase().includes(positionFilter.toLowerCase());

    return matchesSearch && matchesStatus && matchesPosition;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'Pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'Accepted':
        return <Badge className="bg-blue-100 text-blue-800">Accepted</Badge>;
      case 'Rescheduled':
        return <Badge className="bg-orange-100 text-orange-800">Rescheduled</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getScorePercentage = (score: number, maxScore: number) => {
    return maxScore > 0 ? (score / maxScore) * 100 : 0;
  };

  const getTotalScore = () => {
    return Object.values(evaluationScores).reduce((sum: number, score) => sum + (score || 0), 0);
  };

  const handleEvaluationView = (interview: any) => {
    setSelectedInterview(interview);
    if (interview.evaluation) {
      setEvaluationScores(interview.evaluation.scores);
      setEvaluationNotes(interview.evaluation.notes);
      setRecommendation(interview.evaluation.recommendation || "");
      setFinalNotes(interview.evaluation.finalNotes || "");
    } else {
      const emptyScores: { [key: string]: number } = {};
      const emptyNotes: { [key: string]: string } = {};
      evaluationCategories.forEach(cat => {
        emptyScores[cat.id] = 0;
        emptyNotes[cat.id] = "";
      });
      setEvaluationScores(emptyScores);
      setEvaluationNotes(emptyNotes);
      setRecommendation("");
      setFinalNotes("");
    }
    setIsEvaluationModalOpen(true);
    setIsEditMode(false);
  };

  const handleScoreChange = (categoryId: string, value: string) => {
    const category = evaluationCategories.find(cat => cat.id === categoryId);
    if (category) {
      const numValue = Math.max(0, Math.min(parseInt(value) || 0, category.maxPoints));
      setEvaluationScores(prev => ({ ...prev, [categoryId]: numValue }));
    }
  };

  const handleNoteChange = (categoryId: string, value: string) => {
    setEvaluationNotes(prev => ({ ...prev, [categoryId]: value }));
  };

  const handleSaveEvaluation = () => {
    console.log("Saving evaluation:", {
      scores: evaluationScores,
      notes: evaluationNotes,
      recommendation,
      finalNotes
    });
    setIsEditMode(false);
  };

  const handleAcceptInterview = (interviewId: number) => {
    // Update the status of the interview to "Accepted"
    setUpcomingInterviews(prevInterviews =>
      prevInterviews.map(interview =>
        interview.id === interviewId
          ? { ...interview, status: "Accepted" }
          : interview
      )
    );
    
    console.log("Interview accepted:", interviewId);
  };

  const handleProposeDate = (interview: any) => {
    setSelectedInterview(interview);
    setIsProposeDateModalOpen(true);
  };

  const handleSubmitProposal = () => {
    // Update the status of the interview to "Rescheduled" and handle proposal
    if (selectedInterview) {
      setUpcomingInterviews(prevInterviews =>
        prevInterviews.map(interview =>
          interview.id === selectedInterview.id
            ? { 
                ...interview, 
                status: "Rescheduled",
                proposedDateTime: `${proposedDate} ${proposedTime}`,
                proposalMessage: proposeMessage
              }
            : interview
        )
      );
    }
    
    console.log("Proposing new date:", {
      interview: selectedInterview,
      date: proposedDate,
      time: proposedTime,
      message: proposeMessage
    });
    
    setIsProposeDateModalOpen(false);
    setProposedDate("");
    setProposedTime("");
    setProposeMessage("");
  };

  return (
    <div className="space-y-8">
      {/* Header with Date Filter */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Interviews</h1>
          <p className="text-muted-foreground">
            Manage and track all interview sessions
          </p>
        </div>
      
      </div>


      {/* Passed Interviews Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Completed Interviews</CardTitle>
              <p className="text-sm text-muted-foreground">
                Past interviews with evaluations and scores
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search interviews..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>

              <Select value={positionFilter} onValueChange={setPositionFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Positions</SelectItem>
                  <SelectItem value="frontend">Frontend Developer</SelectItem>
                  <SelectItem value="product">Product Manager</SelectItem>
                  <SelectItem value="ux">UX Designer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Passed Interviews Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold text-center">Candidate</TableHead>
                  <TableHead className="font-semibold text-center">Position</TableHead>
                  <TableHead className="font-semibold text-center">Date & Time</TableHead>
                  <TableHead className="font-semibold text-center">Interviewer</TableHead>
                  <TableHead className="font-semibold text-center">Score</TableHead>
                  <TableHead className="font-semibold text-center">Status</TableHead>
                  <TableHead className="font-semibold text-center">Evaluation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPassedInterviews.map((interview) => (
                  <TableRow key={interview.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium text-center">
                      <div className="flex items-center justify-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">
                            {interview.candidate.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span>{interview.candidate}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{interview.position}</TableCell>
                    <TableCell className="text-center">{interview.dateTime}</TableCell>
                    <TableCell className="text-center">{interview.interviewer}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <Star className={`h-4 w-4 ${getScoreColor(interview.totalScore)}`} />
                        <span className={`font-bold ${getScoreColor(interview.totalScore)}`}>
                          {interview.totalScore}/100
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{getStatusBadge(interview.status)}</TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEvaluationView(interview)}
                        className="text-primary hover:text-primary"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Evaluation
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredPassedInterviews.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
              <p>No completed interviews found</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upcoming Interviews Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Upcoming Interviews</CardTitle>
              <p className="text-sm text-muted-foreground">
                Pending interview requests requiring action
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search upcoming interviews..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="rescheduled">Rescheduled</SelectItem>
                </SelectContent>
              </Select>

              <Select value={positionFilter} onValueChange={setPositionFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Positions</SelectItem>
                  <SelectItem value="data">Data Scientist</SelectItem>
                  <SelectItem value="software">Software Engineer</SelectItem>
                  <SelectItem value="marketing">Marketing Specialist</SelectItem>
                  <SelectItem value="project">Project Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Upcoming Interviews Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold text-center">Candidate</TableHead>
                  <TableHead className="font-semibold text-center">Position</TableHead>
                  <TableHead className="font-semibold text-center">Proposed Date & Time</TableHead>
                  <TableHead className="font-semibold text-center">Interviewer</TableHead>
                  <TableHead className="font-semibold text-center">Request Date</TableHead>
                  <TableHead className="font-semibold text-center">Status</TableHead>
                  <TableHead className="font-semibold text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUpcomingInterviews.map((interview) => (
                  <TableRow key={interview.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium text-center">
                      <div className="flex items-center justify-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">
                            {interview.candidate.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span>{interview.candidate}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{interview.position}</TableCell>
                    <TableCell className="text-center">{interview.proposedDateTime}</TableCell>
                    <TableCell className="text-center">{interview.interviewer}</TableCell>
                    <TableCell className="text-center">{interview.requestDate}</TableCell>
                    <TableCell className="text-center">{getStatusBadge(interview.status)}</TableCell>
                    <TableCell className="text-center">
                      {interview.status === 'Pending' ? (
                        <div className="flex items-center justify-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAcceptInterview(interview.id)}
                            className="text-green-600 hover:text-green-700 border-green-200 hover:border-green-300"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Accept
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleProposeDate(interview)}
                            className="text-orange-600 hover:text-orange-700 border-orange-200 hover:border-orange-300"
                          >
                            <Calendar className="h-4 w-4 mr-1" />
                            Propose Date
                          </Button>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">No action needed</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredUpcomingInterviews.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
              <p>No upcoming interviews found</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Evaluation Modal */}
      <Dialog open={isEvaluationModalOpen} onOpenChange={setIsEvaluationModalOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="border-b pb-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold">
                Interview Evaluation - {selectedInterview?.candidate}
              </DialogTitle>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-lg font-bold text-primary">
                    Total Score: {isEditMode ? getTotalScore() : selectedInterview?.totalScore || 0}/100
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {((isEditMode ? getTotalScore() : selectedInterview?.totalScore || 0) / 100 * 100).toFixed(1)}%
                  </p>
                </div>
                <Button
                  variant={isEditMode ? "outline" : "default"}
                  size="sm"
                  onClick={() => setIsEditMode(!isEditMode)}
                >
                  {isEditMode ? "Cancel Edit" : "Edit Evaluation"}
                </Button>
              </div>
            </div>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {evaluationCategories.map((category) => {
                const score = isEditMode ? (evaluationScores[category.id] || 0) : (selectedInterview?.evaluation?.scores?.[category.id] || 0);
                const percentage = getScorePercentage(score, category.maxPoints);
                const note = isEditMode ? (evaluationNotes[category.id] || "") : (selectedInterview?.evaluation?.notes?.[category.id] || "");
                
                return (
                  <div key={category.id} className="bg-muted/50 rounded-lg p-4 border">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{category.emoji}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-foreground">
                            {category.name}
                          </h3>
                          <div className="text-right">
                            <span className="text-sm font-medium text-foreground">
                              {score}/{category.maxPoints} pts
                            </span>
                            <span className="text-sm text-muted-foreground ml-2">
                              ({percentage.toFixed(0)}%)
                            </span>
                          </div>
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(percentage)}`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>

                        <p className="text-xs text-muted-foreground mb-3">
                          {category.description}
                        </p>

                        {isEditMode ? (
                          <div className="flex gap-4">
                            <Input
                              type="number"
                              min="0"
                              max={category.maxPoints}
                              value={score}
                              onChange={(e) => handleScoreChange(category.id, e.target.value)}
                              className="w-24"
                              placeholder="Score"
                            />
                            <Textarea
                              value={note}
                              onChange={(e) => handleNoteChange(category.id, e.target.value)}
                              placeholder="Add notes..."
                              className="flex-1 resize-none"
                              rows={2}
                            />
                          </div>
                        ) : (
                          note && (
                            <p className="text-sm text-foreground bg-background p-3 rounded border">
                              {note}
                            </p>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {/* Final Recommendation */}
              <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                <h3 className="font-semibold text-primary mb-2">Final Recommendation</h3>
                {isEditMode ? (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="recommendation">Recommendation</Label>
                      <Input
                        id="recommendation"
                        value={recommendation}
                        onChange={(e) => setRecommendation(e.target.value)}
                        placeholder="Enter recommendation..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="final-notes">Final Notes</Label>
                      <Textarea
                        id="final-notes"
                        value={finalNotes}
                        onChange={(e) => setFinalNotes(e.target.value)}
                        placeholder="Add final notes..."
                        rows={3}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    {selectedInterview?.evaluation?.recommendation && (
                      <p className="text-sm text-foreground mb-2">
                        <strong>Recommendation:</strong> {selectedInterview.evaluation.recommendation}
                      </p>
                    )}
                    {selectedInterview?.evaluation?.finalNotes && (
                      <p className="text-sm text-foreground">
                        <strong>Notes:</strong> {selectedInterview.evaluation.finalNotes}
                      </p>
                    )}
                  </>
                )}
              </div>
              
              {isEditMode && (
                <div className="mt-6 flex justify-end gap-4 sticky bottom-0 bg-background p-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditMode(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSaveEvaluation}>
                    Save Evaluation
                  </Button>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Propose Date Modal */}
      <Dialog open={isProposeDateModalOpen} onOpenChange={setIsProposeDateModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Propose Alternative Date</DialogTitle>
            <p className="text-sm text-muted-foreground">
              Suggest a new date and time for {selectedInterview?.candidate}
            </p>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="proposed-date">Proposed Date</Label>
                <Input
                  id="proposed-date"
                  type="date"
                  value={proposedDate}
                  onChange={(e) => setProposedDate(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="proposed-time">Proposed Time</Label>
                <Input
                  id="proposed-time"
                  type="time"
                  value={proposedTime}
                  onChange={(e) => setProposedTime(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="message">Message (Optional)</Label>
              <Textarea
                id="message"
                placeholder="Add a message explaining the reason for rescheduling..."
                value={proposeMessage}
                onChange={(e) => setProposeMessage(e.target.value)}
                rows={3}
              />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsProposeDateModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitProposal}>
                Send Proposal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BUInterviews;