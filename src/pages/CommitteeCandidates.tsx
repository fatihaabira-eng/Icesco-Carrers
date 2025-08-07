import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  Filter,
  Users,
  Eye,
  Award,
  Star,
  FileText,
  Calendar,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  MessageSquare,
  User
} from 'lucide-react';
import { format } from 'date-fns';
import DashboardHeader from '@/components/DashboardHeader';
import KPICards from '@/components/KPICards';
import DashboardSection from '@/components/DashboardSection';
import CommitteeEvaluations from './CommitteeEvaluation';

interface Candidate {
  id: string;
  name: string;
  position: string;
  businessUnit: string;
  email: string;
  phone: string;
  experience: string;
  education: string;
  status: 'pending' | 'evaluated' | 'shortlisted' | 'rejected';
  applicationDate: string;
  lastEvaluationDate?: string;
  committeeScore?: number;
  committeeComments?: string;
  resumeUrl?: string;
  videoUrl?: string;
  photoUrl?: string;
  interviewDate?: string;
  interviewType?: 'in-person' | 'virtual';
}

const CommitteeCandidates: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [dateRange, setDateRange] = useState('year');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [showEvaluationDialog, setShowEvaluationDialog] = useState(false);
  const [evaluationScore, setEvaluationScore] = useState('');
  const [evaluationComments, setEvaluationComments] = useState('');
  const [showEvaluations, setShowEvaluations] = useState(false);


  // Mock data for candidates
  const candidates: Candidate[] = [
    {
      id: 'CAND-001',
      name: 'Alice Smith',
      position: 'Senior Software Engineer',
      businessUnit: 'DT',
      email: 'alice.smith@example.com',
      phone: '+1-555-0123',
      experience: '5 years',
      education: 'Master in Computer Science',
      status: 'pending',
      applicationDate: '2024-01-15',
      resumeUrl: '/resumes/alice-smith.pdf',
      videoUrl: '/videos/alice-smith-interview.mp4',
      photoUrl: 'https://images.pexels.com/photos/8353814/pexels-photo-8353814.jpeg'
    },
    {
      id: 'CAND-002',
      name: 'Bob Johnson',
      position: 'Marketing Manager',
      businessUnit: 'COM',
      email: 'bob.johnson@example.com',
      phone: '+1-555-0124',
      experience: '4 years',
      education: 'MBA in Marketing',
      status: 'evaluated',
      applicationDate: '2024-01-10',
      lastEvaluationDate: '2024-01-20',
      committeeScore: 85,
      committeeComments: 'Strong communication skills and relevant experience. Good fit for the position.',
      resumeUrl: '/resumes/bob-johnson.pdf',
      videoUrl: '/videos/bob-johnson-interview.mp4',
      interviewDate: '2024-02-15',
      interviewType: 'virtual',
      photoUrl: 'https://images.pexels.com/photos/6409119/pexels-photo-6409119.jpeg'
      
    },
    {
      id: 'CAND-003',
      name: 'Clara Brown',
      position: 'Research Analyst',
      businessUnit: 'RC',
      email: 'clara.brown@example.com',
      phone: '+1-555-0125',
      experience: '3 years',
      education: 'Master in Research Methods',
      status: 'shortlisted',
      applicationDate: '2024-01-12',
      lastEvaluationDate: '2024-01-25',
      committeeScore: 92,
      committeeComments: 'Excellent analytical skills and research background. Highly recommended.',
      resumeUrl: '/resumes/clara-brown.pdf',
      videoUrl: '/videos/clara-brown-interview.mp4',
      interviewDate: '2024-02-18',
      interviewType: 'in-person',
      photoUrl: 'https://images.pexels.com/photos/13392786/pexels-photo-13392786.png'
    },
    {
      id: 'CAND-004',
      name: 'David Lee',
      position: 'Senior Software Engineer',
      businessUnit: 'DT',
      email: 'david.lee@example.com',
      phone: '+1-555-0126',
      experience: '6 years',
      education: 'Bachelor in Software Engineering',
      status: 'rejected',
      applicationDate: '2024-01-08',
      lastEvaluationDate: '2024-01-18',
      committeeScore: 65,
      committeeComments: 'Technical skills are adequate but lacks the required leadership experience.',
      resumeUrl: '/resumes/david-lee.pdf',
      videoUrl: '/videos/david-lee-interview.mp4',
      photoUrl: 'https://images.pexels.com/photos/7752839/pexels-photo-7752839.jpeg'
    }
  ];

  const filterDataByDate = (data: Candidate[]) => {
    if (selectedYear === 'all') return data;
    return data.filter(item => new Date(item.applicationDate).getFullYear() === parseInt(selectedYear));
  };

  

  const filteredCandidates = filterDataByDate(candidates).filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.businessUnit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingEvaluations = filteredCandidates.filter(c => c.status === 'pending').length;
  const evaluatedCandidates = filteredCandidates.filter(c => c.status === 'evaluated').length;
  const shortlistedCandidates = filteredCandidates.filter(c => c.status === 'shortlisted').length;
  const rejectedCandidates = filteredCandidates.filter(c => c.status === 'rejected').length;
  const averageScore = filteredCandidates
    .filter(c => c.committeeScore)
    .reduce((sum, c) => sum + (c.committeeScore || 0), 0) / 
    filteredCandidates.filter(c => c.committeeScore).length || 0;

  const kpiCards = [
    { title: 'Pending Evaluations', value: pendingEvaluations, icon: Users, description: 'Candidates to evaluate' },
    { title: 'Evaluated Candidates', value: evaluatedCandidates, icon: Award, description: 'Completed evaluations' },
    { title: 'Shortlisted Candidates', value: shortlistedCandidates, icon: Star, description: 'Top candidates' },
    { title: 'Average Score', value: `${Math.round(averageScore)}%`, icon: Award, description: 'Overall performance' }
  ];

  const getStatusColor = (status: string) => {
    const colorMap: { [key: string]: string } = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'evaluated': 'bg-blue-100 text-blue-800',
      'shortlisted': 'bg-green-100 text-green-800',
      'rejected': 'bg-red-100 text-red-800'
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  };

  const handleViewCandidate = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setShowEvaluations(true);
  };

  const handleEvaluateCandidate = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setEvaluationScore(candidate.committeeScore?.toString() || '');
    setEvaluationComments(candidate.committeeComments || '');
    setShowEvaluationDialog(true);
  };

  const handleSubmitEvaluation = () => {
    if (selectedCandidate && evaluationScore && evaluationComments) {
      console.log(`Evaluating candidate ${selectedCandidate.id} with score ${evaluationScore} and comments: ${evaluationComments}`);
      // Here you would typically make an API call to update the candidate evaluation
      setShowEvaluationDialog(false);
      setSelectedCandidate(null);
      setEvaluationScore('');
      setEvaluationComments('');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <DashboardHeader
        title="Committee Candidates"
        description="Review candidate profiles and provide evaluations"
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />

      {/* KPI Cards */}
      <DashboardSection
        title="Candidates Overview"
        description="Key metrics for candidate evaluations"
        icon={Users}
      >
        <KPICards cards={kpiCards} />
      </DashboardSection>

      {/* Candidates Management */}
      <DashboardSection
        title="Candidates Management"
        description="View and evaluate candidate profiles"
        icon={Users}
      >
        {/* Search and Filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search candidates by name, position, or business unit..."
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

        {/* Candidates Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100 text-center">
                  <TableHead className="text-center font-bold">Business Unit</TableHead>
                  <TableHead className="text-center font-bold">Job Position</TableHead>
                  <TableHead className="text-center font-bold">Candidate</TableHead>
                  <TableHead className="text-center font-bold">Application Date</TableHead>
                  <TableHead className="text-center font-bold">Status</TableHead>
                  <TableHead className="text-center font-bold">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCandidates.length === 0 ? (
                   <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground h-24">
                      No candidates found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCandidates.map((candidate) => (
                     <TableRow key={candidate.id} className="text-center font-normal">
          <TableCell className="text-center font-normal">{candidate.businessUnit}</TableCell>
          <TableCell className="text-center font-normal">{candidate.position}</TableCell>
          <TableCell className="text-center font-normal">
            <div className="flex items-center justify-center space-x-3">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleViewCandidate(candidate)}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={candidate.photoUrl}
                  alt={candidate.name}
                />
              </Avatar>
              <div>
                <div className="font-medium">{candidate.name}</div>
              </div>
            </div>
          </TableCell>
          <TableCell className="text-center font-normal">{format(new Date(candidate.applicationDate), 'MMM d, yyyy')}</TableCell>
          <TableCell className="text-center font-normal">
            <Badge className={getStatusColor(candidate.status)}>
              {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
            </Badge>
          </TableCell>
          <TableCell className="text-center font-normal">
            {candidate.committeeScore ? (
              <div className="flex items-center justify-center space-x-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="font-medium">{candidate.committeeScore}%</span>
              </div>
            ) : (
              <span className="text-muted-foreground">Not evaluated</span>
            )}
          </TableCell>
        </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </DashboardSection>

      {/* Candidate Profile Dialog */}
      

      {/* Evaluation Dialog */}
      <Dialog open={showEvaluationDialog} onOpenChange={setShowEvaluationDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Evaluate Candidate - {selectedCandidate?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="score">Score (%)</Label>
              <Input
                id="score"
                type="number"
                min="0"
                max="100"
                value={evaluationScore}
                onChange={(e) => setEvaluationScore(e.target.value)}
                placeholder="Enter score from 0-100"
              />
            </div>
            <div>
              <Label htmlFor="comments">Comments</Label>
              <Textarea
                id="comments"
                value={evaluationComments}
                onChange={(e) => setEvaluationComments(e.target.value)}
                placeholder="Provide detailed comments about the candidate..."
                rows={6}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowEvaluationDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitEvaluation}>
                Submit Evaluation
              </Button>
            </div>
          </div>
        </DialogContent>
        
      </Dialog>
      {showEvaluations && selectedCandidate && (
  <Dialog open={showEvaluations} onOpenChange={setShowEvaluations}>
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Committee Evaluations - {selectedCandidate.name}</DialogTitle>
      </DialogHeader>
      <CommitteeEvaluations/>
    </DialogContent>
  </Dialog>
)}
    </div>
  );
};

export default CommitteeCandidates; 