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
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Calendar,
  Search,
  Eye,
  Check,
  X,
  Clock,
  CheckCircle,
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
    status: "rejected",
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
    },
      photoUrl: 'https://images.pexels.com/photos/8353814/pexels-photo-8353814.jpeg'
  },
  {
    id: 2,
    candidate: "Fatima Al-Zahra Benali",
    position: "Product Manager",
    dateTime: "2025-01-18 2:00 PM",
    status: "Accepted",
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
    },
      photoUrl: 'https://images.pexels.com/photos/6409119/pexels-photo-6409119.jpeg'
  },
  {
    id: 3,
    candidate: "Omar Khalil Al-Rashid",
    position: "UX Designer",
    dateTime: "2025-01-15 11:00 AM",
    status: "Recommended for an other position",
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
    },
      photoUrl: 'https://images.pexels.com/photos/13392786/pexels-photo-13392786.png'
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
    requestDate: "2025-02-20",
    photoUrl: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg"
  },
  {
    id: 2,
    candidate: "Mohammed Al-Kindi",
    position: "Software Engineer",
    proposedDateTime: "2025-02-26 2:00 PM",
    status: "Pending",
    interviewer: "Ms. Aisha Al-Zahra",
    candidateEmail: "mohammed.alkindi@email.com",
    requestDate: "2025-02-18",
    photoUrl: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
  },
  {
    id: 3,
    candidate: "Layla Hassan Al-Farisi",
    position: "Marketing Specialist",
    proposedDateTime: "2025-02-27 11:00 AM",
    status: "Pending",
    interviewer: "Mr. Khalil Al-Mahmoud",
    candidateEmail: "layla.alfarisi@email.com",
    requestDate: "2025-02-19",
    photoUrl: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg"
  },
  {
    id: 4,
    candidate: "Yusuf Al-Rashid",
    position: "Project Manager",
    proposedDateTime: "2025-02-28 3:00 PM",
    status: "Accepted",
    interviewer: "Dr. Fatima Al-Kindi",
    candidateEmail: "yusuf.alrashid@email.com",
    requestDate: "2025-02-21",
    photoUrl: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg"
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
      case 'Accepted':
        return <Badge className="bg-green-100 text-green-700 font-medium px-3 py-1 rounded-full">Accepted</Badge>;

      case 'rejected':
        return <Badge className="bg-red-100 text-red-700 font-medium px-3 py-1 rounded-full">Rejected</Badge>;
      case 'Recommended for an other position':
        return <Badge className="bg-orange-100 text-orange-700 font-medium px-3 py-1 rounded-full">Recommended for an other position</Badge>;

    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-[#0f7378]";
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
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Header with Date Filter */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Interviews Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and track all interview sessions
          </p>
        </div>
      </div>

      {/* Passed Interviews Table */}
      <Card className="shadow-sm border-0 rounded-xl">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-[#0f7378]/10">
              <CheckCircle className="h-6 w-6 text-[#0f7378]" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold text-gray-900">Candidates Assessments</CardTitle>
              <p className="text-sm text-gray-500">
                Evaluation Scores For Interviewed Candidates
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search interviews..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-200 focus:ring-2 focus:ring-[#0f7378]/20 rounded-lg"
                />
              </div>

              <Select value={positionFilter} onValueChange={setPositionFilter}>
                <SelectTrigger className="w-full sm:w-48 border-gray-200 rounded-lg">
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
                <TableRow className="bg-[#f3f4f6]">
                  <TableHead className="font-bold text-gray-900 text-base py-4 text-left">Candidate</TableHead>
                  <TableHead className="font-bold text-gray-900 text-base py-4 text-center">Position</TableHead>
                  <TableHead className="font-bold text-gray-900 text-base py-4 text-center">Score</TableHead>
                  <TableHead className="font-bold text-gray-900 text-base py-4 text-center">Date & Time</TableHead>
                  <TableHead className="font-bold text-gray-900 text-base py-4 text-center">Status</TableHead>
                  <TableHead className="font-bold text-gray-900 text-base py-4 text-center">Evaluation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPassedInterviews.map((interview) => (
                  <TableRow key={interview.id} className="hover:bg-[#f3f4f6] transition-colors">
                    <TableCell className="text-gray-600 text-sm text-center py-3">
                      <div className="flex items-center justify-left space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={interview.photoUrl}
                            alt={interview.candidate}
                          />
                        </Avatar>
                        <span>{interview.candidate}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600 text-sm text-center py-3">{interview.position}</TableCell>
                     <TableCell className="text-gray-600 text-sm text-center py-3">
                      <div className="flex items-center justify-center space-x-2">
                        <Star className={`h-4 w-4 ${getScoreColor(interview.totalScore)}`} />
                        <span className={`font-medium ${getScoreColor(interview.totalScore)}`}>
                          {interview.totalScore}/100
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600 text-sm text-center py-3">{interview.dateTime}</TableCell>
                   
                    <TableCell className="text-center py-3">{getStatusBadge(interview.status)}</TableCell>
                    <TableCell className="text-center py-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEvaluationView(interview)}
                        className="text-[#0f7378] hover:text-[#0f7378]/80 border-[#0f7378]/20 hover:border-[#0f7378]/40 rounded-lg"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Evaluate
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredPassedInterviews.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No completed interviews found</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upcoming Interviews Table */}
      <Card className="shadow-sm border-0 rounded-xl">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-[#0f7378]/10">
              <Clock className="h-6 w-6 text-[#0f7378]" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold text-gray-900">Proposed Interviews</CardTitle>
              <p className="text-sm text-gray-500">
                Pending interview requests requiring action
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search proposed interviews..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-200 focus:ring-2 focus:ring-[#0f7378]/20 rounded-lg"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40 border-gray-200 rounded-lg">
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
                <SelectTrigger className="w-full sm:w-48 border-gray-200 rounded-lg">
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
                <TableRow className="bg-[#f3f4f6]">
                  <TableHead className="font-bold text-gray-900 text-base py-4 text-left">Candidate</TableHead>
                  <TableHead className="font-bold text-gray-900 text-base py-4 text-center">Position</TableHead>
                  <TableHead className="font-bold text-gray-900 text-base py-4 text-center">Proposed Interview Date & Time</TableHead>
                  <TableHead className="font-bold text-gray-900 text-base py-4 text-center">Status</TableHead>
                  <TableHead className="font-bold text-gray-900 text-base py-4 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUpcomingInterviews.map((interview) => (
                  <TableRow key={interview.id} className="hover:bg-[#f3f4f6] transition-colors">
                    <TableCell className="text-gray-600 text-sm text-left py-3">
                      <div className="flex items-center justify-left space-x-3">
                       <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={interview.photoUrl}
                            alt={interview.candidate}
                          />
                        </Avatar>
                        <span>{interview.candidate}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600 text-sm text-center py-3">{interview.position}</TableCell>
                    <TableCell className="text-gray-600 text-sm text-center py-3">{interview.proposedDateTime}</TableCell>
                    <TableCell className="text-center py-3">{getStatusBadge(interview.status)}</TableCell>
                    <TableCell className="text-center py-3">
                      {interview.status === 'Pending' ? (
                        <div className="flex items-center justify-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAcceptInterview(interview.id)}
                            className="text-green-600 hover:text-green-700 border-green-200 hover:border-green-300 rounded-lg"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Accept
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleProposeDate(interview)}
                            className="text-orange-600 hover:text-orange-700 border-orange-200 hover:border-orange-300 rounded-lg"
                          >
                            <Calendar className="h-4 w-4 mr-1" />
                            Propose Date
                          </Button>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">No action needed</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredUpcomingInterviews.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No upcoming interviews found</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Evaluation Modal */}
      <Dialog open={isEvaluationModalOpen} onOpenChange={setIsEvaluationModalOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col rounded-xl">
          <DialogHeader className="border-b border-gray-200 pb-4 flex-shrink-0 bg-white">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold text-gray-900">
                Interview Evaluation - {selectedInterview?.candidate}
              </DialogTitle>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-lg font-bold text-[#0f7378]">
                    Total Score: {isEditMode ? getTotalScore() : selectedInterview?.totalScore || 0}/100
                  </p>
                  <p className="text-sm text-gray-500">
                    {((isEditMode ? getTotalScore() : selectedInterview?.totalScore || 0) / 100 * 100).toFixed(1)}%
                  </p>
                </div>
                <Button
                  variant={isEditMode ? "outline" : "default"}
                  size="sm"
                  onClick={() => setIsEditMode(!isEditMode)}
                  className={isEditMode ? "border-gray-200 text-gray-600 hover:text-gray-700 hover:border-gray-300 rounded-lg" : "bg-[#0f7378] hover:bg-[#0f7378]/80 text-white rounded-lg"}
                >
                  {isEditMode ? "Cancel Edit" : "Edit Evaluation"}
                </Button>
              </div>
            </div>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto p-6 bg-[#f3f4f6]">
            <div className="space-y-4">
              {evaluationCategories.map((category) => {
                const score = isEditMode ? (evaluationScores[category.id] || 0) : (selectedInterview?.evaluation?.scores?.[category.id] || 0);
                const percentage = getScorePercentage(score, category.maxPoints);
                const note = isEditMode ? (evaluationNotes[category.id] || "") : (selectedInterview?.evaluation?.notes?.[category.id] || "");
                
                return (
                  <div key={category.id} className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{category.emoji}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">
                            {category.name}
                          </h3>
                          <div className="text-right">
                            <span className="text-sm font-medium text-gray-700">
                              {score}/{category.maxPoints} pts
                            </span>
                            <span className="text-sm text-gray-500 ml-2">
                              ({percentage.toFixed(0)}%)
                            </span>
                          </div>
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3">
                          <div
                            className={`h-2.5 rounded-full transition-all duration-300 ${getProgressColor(percentage)}`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>

                        <p className="text-xs text-gray-500 mb-3">
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
                              className="w-24 border-gray-200 rounded-lg"
                              placeholder="Score"
                            />
                            <Textarea
                              value={note}
                              onChange={(e) => handleNoteChange(category.id, e.target.value)}
                              placeholder="Add notes..."
                              className="flex-1 resize-none border-gray-200 rounded-lg"
                              rows={2}
                            />
                          </div>
                        ) : (
                          note && (
                            <p className="text-sm text-gray-700 bg-white p-3 rounded border border-gray-200">
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
              <div className="bg-[#0f7378]/10 rounded-lg p-4 border border-[#0f7378]/20">
                <h3 className="font-semibold text-[#0f7378] mb-2">Final Recommendation</h3>
                {isEditMode ? (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="recommendation" className="text-gray-700">Recommendation</Label>
                      <Input
                        id="recommendation"
                        value={recommendation}
                        onChange={(e) => setRecommendation(e.target.value)}
                        placeholder="Enter recommendation..."
                        className="border-gray-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <Label htmlFor="final-notes" className="text-gray-700">Final Notes</Label>
                      <Textarea
                        id="final-notes"
                        value={finalNotes}
                        onChange={(e) => setFinalNotes(e.target.value)}
                        placeholder="Add final notes..."
                        className="border-gray-200 rounded-lg"
                        rows={3}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    {selectedInterview?.evaluation?.recommendation && (
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>Recommendation:</strong> {selectedInterview.evaluation.recommendation}
                      </p>
                    )}
                    {selectedInterview?.evaluation?.finalNotes && (
                      <p className="text-sm text-gray-700">
                        <strong>Notes:</strong> {selectedInterview.evaluation.finalNotes}
                      </p>
                    )}
                  </>
                )}
              </div>
              
              {isEditMode && (
                <div className="mt-6 flex justify-end gap-4 sticky bottom-0 bg-white p-4 border-t border-gray-200">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditMode(false)}
                    className="border-gray-200 text-gray-600 hover:text-gray-700 hover:border-gray-300 rounded-lg"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSaveEvaluation} className="bg-[#0f7378] hover:bg-[#0f7378]/80 text-white rounded-lg">
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
        <DialogContent className="max-w-md rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">Propose Alternative Date</DialogTitle>
            <p className="text-sm text-gray-500">
              Suggest a new date and time for {selectedInterview?.candidate}
            </p>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="proposed-date" className="text-gray-700">Proposed Date</Label>
                <Input
                  id="proposed-date"
                  type="date"
                  value={proposedDate}
                  onChange={(e) => setProposedDate(e.target.value)}
                  className="border-gray-200 rounded-lg"
                />
              </div>
              <div>
                <Label htmlFor="proposed-time" className="text-gray-700">Proposed Time</Label>
                <Input
                  id="proposed-time"
                  type="time"
                  value={proposedTime}
                  onChange={(e) => setProposedTime(e.target.value)}
                  className="border-gray-200 rounded-lg"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="message" className="text-gray-700">Message (Optional)</Label>
              <Textarea
                id="message"
                placeholder="Add a message explaining the reason for rescheduling..."
                value={proposeMessage}
                onChange={(e) => setProposeMessage(e.target.value)}
                className="border-gray-200 rounded-lg"
                rows={3}
              />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsProposeDateModalOpen(false)}
                className="border-gray-200 text-gray-600 hover:text-gray-700 hover:border-gray-300 rounded-lg"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSubmitProposal}
                className="bg-[#0f7378] hover:bg-[#0f7378]/80 text-white rounded-lg"
              >
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