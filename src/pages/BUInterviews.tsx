import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Calendar,
  Search,
  Eye,
  Download,
  FileText,
  Users,
  Clock,
  TrendingUp,
  UserCheck
} from 'lucide-react';

// Sample data for interviews
const interviewsData = [
  {
    id: 1,
    candidate: "John Smith",
    position: "Senior Frontend Developer",
    dateTime: "2024-02-20 10:00 AM",
    status: "Scheduled",
    interviewer: "Dr. Mohammed",
    evaluation: {
      scores: {
        educational: 5,
        experience: 8,
        technical: 18,
        strategic: 7,
        leadership: 6,
        communication: 8,
        cultural: 4,
        innovation: 9,
        collaboration: 4,
        commitment: 4,
        languages: 6
      },
      notes: {
        educational: "Masters in Computer Science",
        experience: "5+ years in React development",
        technical: "Strong in React, TypeScript, Node.js",
        strategic: "Good understanding of product strategy",
        leadership: "Led small teams effectively",
        communication: "Clear and professional communication",
        cultural: "Good cultural fit",
        innovation: "Innovative problem-solving approach",
        collaboration: "Works well in teams",
        commitment: "Passionate about technology",
        languages: "Fluent in English and French"
      }
    }
  },
  {
    id: 2,
    candidate: "Sarah Johnson",
    position: "Product Manager",
    dateTime: "2024-02-22 2:00 PM",
    status: "Completed",
    interviewer: "Ms. Fatima",
    evaluation: {
      scores: {
        educational: 7,
        experience: 9,
        technical: 15,
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
        educational: "MBA from top university",
        experience: "8+ years in product management",
        technical: "Strong technical background",
        strategic: "Excellent strategic thinking",
        leadership: "Proven leadership experience",
        communication: "Outstanding communication skills",
        cultural: "Strong cultural awareness",
        innovation: "Creative problem solver",
        collaboration: "Excellent team player",
        commitment: "Highly committed to company values",
        languages: "Trilingual - English, French, Arabic"
      }
    }
  },
  {
    id: 3,
    candidate: "Mike Chen",
    position: "UX Designer",
    dateTime: "2024-02-25 11:30 AM",
    status: "Cancelled",
    interviewer: "Mr. Hassan",
    evaluation: null
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
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [evaluationScores, setEvaluationScores] = useState<{ [key: string]: number }>({});
  const [evaluationNotes, setEvaluationNotes] = useState<{ [key: string]: string }>({});

  const filteredInterviews = interviewsData.filter((interview) => {
    const matchesSearch =
      interview.candidate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || interview.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>;
      case 'Completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'Cancelled':
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  const handleEvaluationOpen = (interview: any) => {
    setSelectedInterview(interview);
    if (interview.evaluation) {
      setEvaluationScores(interview.evaluation.scores);
      setEvaluationNotes(interview.evaluation.notes);
    } else {
      const emptyScores: { [key: string]: number } = {};
      const emptyNotes: { [key: string]: string } = {};
      evaluationCategories.forEach(cat => {
        emptyScores[cat.id] = 0;
        emptyNotes[cat.id] = "";
      });
      setEvaluationScores(emptyScores);
      setEvaluationNotes(emptyNotes);
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

  const getTotalScore = () => {
    return Object.values(evaluationScores).reduce((sum: number, score) => sum + (score || 0), 0);
  };

  const getScorePercentage = (score: number, maxScore: number) => {
    return maxScore > 0 ? (score / maxScore) * 100 : 0;
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-8">
      {/* Header with Date Filter */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Interviews</h1>
          <p className="text-muted-foreground">
            Manage and track all interviews
          </p>
        </div>
       
      </div>

     

      {/* Interviews Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">All Interviews</CardTitle>
              <p className="text-sm text-muted-foreground">
                View and manage interview evaluations
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

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Interviews Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold text-center">Candidate</TableHead>
                  <TableHead className="font-semibold text-center">Position</TableHead>
                  <TableHead className="font-semibold text-center">Date & Time</TableHead>
                  <TableHead className="font-semibold text-center">Interviewer</TableHead>
                  <TableHead className="font-semibold text-center">Status</TableHead>
                  <TableHead className="font-semibold text-center">Evaluation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInterviews.map((interview) => (
                  <TableRow key={interview.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium text-center">{interview.candidate}</TableCell>
                    <TableCell className="text-center">{interview.position}</TableCell>
                    <TableCell className="text-center">{interview.dateTime}</TableCell>
                    <TableCell className="text-center">{interview.interviewer}</TableCell>
                    <TableCell className="text-center">{getStatusBadge(interview.status)}</TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEvaluationOpen(interview)}
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

          {filteredInterviews.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
              <p>No interviews found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Evaluation Modal */}
      <Dialog open={isEvaluationModalOpen} onOpenChange={setIsEvaluationModalOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
          <DialogHeader className="border-b pb-4">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold">
                Interview Evaluation - {selectedInterview?.candidate}
              </DialogTitle>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-lg font-bold text-primary">
                    Total Score: {getTotalScore()}/100
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {((getTotalScore() / 100) * 100).toFixed(1)}%
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
                const score = evaluationScores[category.id] || 0;
                const percentage = getScorePercentage(score, category.maxPoints);
                return (
                  <div key={category.id} className="bg-muted/50 rounded-lg p-4 border">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{category.emoji}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">
                            {category.name}
                          </h3>
                          <div className="text-right">
                            <span className="text-sm font-medium">
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
                            <textarea
                              value={evaluationNotes[category.id] || ""}
                              onChange={(e) => handleNoteChange(category.id, e.target.value)}
                              placeholder="Add notes..."
                              className="flex-1 p-2 border border-gray-300 rounded text-sm resize-none"
                              rows={2}
                            />
                          </div>
                        ) : (
                          evaluationNotes[category.id] && (
                            <p className="text-sm bg-background p-2 rounded border">
                              {evaluationNotes[category.id]}
                            </p>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {isEditMode && (
              <div className="mt-6 flex justify-end gap-4">
                <Button
                  variant="outline"
                  onClick={() => setIsEditMode(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    console.log("Saving evaluation:", {
                      scores: evaluationScores,
                      notes: evaluationNotes
                    });
                    setIsEditMode(false);
                  }}
                >
                  Save Evaluation
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BUInterviews;