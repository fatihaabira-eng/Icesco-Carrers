import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Search, Filter, Star, Users, UserCheck, Award, X, Eye } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { format } from 'date-fns';
import DashboardHeader from '@/components/DashboardHeader';
import KPICards from '@/components/KPICards';
import DashboardSection from '@/components/DashboardSection';

interface CommitteeMember {
  id: string;
  name: string;
  position: string;
  image: string;
  score: number;
  comments: string;
}

interface TechnicalInterviewer {
  id: string;
  name: string;
  position: string;
  image: string;
  score: number;
  comments: string;
}

interface CandidateAssessment {
  id: string;
  position: string;
  candidateName: string;
  avatar?: string;
  overallScore: number;
  committeeMembers: CommitteeMember[];
  technicalInterviewers: TechnicalInterviewer[];
  assessmentDate: string;
  duration: string;
}

const CandidateAssessmentScore: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2025');
  const [dateRange, setDateRange] = useState('year');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAssessment, setSelectedAssessment] = useState<CandidateAssessment | null>(null);
  const [dialogType, setDialogType] = useState<'full' | 'committee' | 'technical' | null>(null);

  // Mock data for candidate assessments with added images and duration
  const candidateAssessments: CandidateAssessment[] = [
    {
      id: 'ASSESS-001',
      position: 'Senior Software Engineer',
      candidateName: 'Alice Smith',
      overallScore: 85,
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
      assessmentDate: '2025-01-15',
      duration: '2h 30m',
      committeeMembers: [
        {
          id: 'CM-5',
          name: 'Prof. Dr. Raheel Qamar',
          position: 'Chief of Sciences and Technologies Sector',
          image: 'https://randomuser.me/api/portraits/men/1.jpg',
          score: 87,
          comments: 'Impressive technical background and relevant experience. Good understanding of educational technology.'
        },
        {
          id: 'CM-2',
          name: 'Dr. Nidal Mohammad Zaidan Abuzuhri',
          position: 'Director of the Administrative Affairs Department',
          image: 'https://randomuser.me/api/portraits/men/2.jpg',
          score: 82,
          comments: 'Good communication skills and team collaboration. Needs some improvement in system architecture knowledge.'
        },
        {
          id: 'CM-3',
          name: 'Dr. Ahmed Albanyan',
          position: 'Director of the Center of Translation and Publishing',
          image: 'https://randomuser.me/api/portraits/men/3.jpg',
          score: 90,
          comments: 'Outstanding technical expertise and innovative thinking. Highly recommended for the position.'
        },
        {
          id: 'CM-4',
          name: 'Mr. ANAR KARIMOV',
          position: 'Chief of Partnerships and International Cooperation Sector',
          image: 'https://randomuser.me/api/portraits/men/4.jpg',
          score: 85,
          comments: 'Strong cultural fit and excellent interpersonal skills. Demonstrates good leadership potential.'
        },
        {
          id: 'CM-1',
          name: 'Dr. Sally Mabrouk',
          position: 'Director of the Office of Director General',
          image: 'https://randomuser.me/api/portraits/women/1.jpg',
          score: 88,
          comments: 'Excellent technical skills and strong problem-solving abilities. Shows great potential for leadership roles.'
        },
      ],
      technicalInterviewers: [
        {
          id: 'TI-1',
          name: 'Eng. Youssef Amrani',
          position: 'Senior Software Architect',
          image: 'https://randomuser.me/api/portraits/men/5.jpg',
          score: 92,
          comments: 'Excellent coding skills and deep understanding of modern frameworks. Strong problem-solving approach.'
        },
        {
          id: 'TI-2',
          name: 'Dr. Amina El-Khattabi',
          position: 'Technical Director',
          image: 'https://randomuser.me/api/portraits/women/2.jpg',
          score: 89,
          comments: 'Very good system design skills and architecture knowledge. Shows strong analytical thinking.'
        }
      ]
    },
    {
      id: 'ASSESS-002',
      position: 'Marketing Manager',
      candidateName: 'David Lee',
      overallScore: 78,
      assessmentDate: '2025-01-12',
      avatar: 'https://randomuser.me/api/portraits/women/75.jpg',
      duration: '2h 15m',
      committeeMembers: [
        {
          id: 'CM-5',
          name: 'Prof. Dr. Raheel Qamar',
          position: 'Chief of Sciences and Technologies Sector',
          image: 'https://randomuser.me/api/portraits/men/1.jpg',
          score: 67,
          comments: 'Good understanding of educational technology.'
        },
        {
          id: 'CM-2',
          name: 'Dr. Nidal Mohammad Zaidan Abuzuhri',
          position: 'Director of the Administrative Affairs Department',
          image: 'https://randomuser.me/api/portraits/men/2.jpg',
          score: 72,
          comments: 'Good communication skills and team collaboration. Needs some improvement in system architecture knowledge.'
        },
        {
          id: 'CM-3',
          name: 'Dr. Ahmed Albanyan',
          position: 'Director of the Center of Translation and Publishing',
          image: 'https://randomuser.me/api/portraits/men/3.jpg',
          score: 60,
          comments: 'Lacks technical expertise and innovative thinking. Not recommended for the position.'
        },
        {
          id: 'CM-4',
          name: 'Mr. ANAR KARIMOV',
          position: 'Chief of Partnerships and International Cooperation Sector',
          image: 'https://randomuser.me/api/portraits/men/4.jpg',
          score: 45,
          comments: 'Weak cultural fit and bad interpersonal skills.'
        },
        {
          id: 'CM-1',
          name: 'Dr. Sally Mabrouk',
          position: 'Director of the Office of Director General',
          image: 'https://randomuser.me/api/portraits/women/1.jpg',
          score: 50,
          comments: 'Bad technical skills and problem-solving abilities.'
        }
      ],
      technicalInterviewers: [
        {
          id: 'TI-6',
          name: 'Ms. Fatima Zahra',
          position: 'Digital Marketing Specialist',
          image: 'https://randomuser.me/api/portraits/women/3.jpg',
          score: 85,
          comments: 'Excellent digital marketing skills and good understanding of analytics tools.'
        },
        {
          id: 'TI-7',
          name: 'Eng. Karim Alami',
          position: 'Marketing Technology Lead',
          image: 'https://randomuser.me/api/portraits/men/6.jpg',
          score: 81,
          comments: 'Good technical understanding of marketing platforms and automation tools.'
        },
        {
          id: 'TI-8',
          name: 'Dr. Layla Benjelloun',
          position: 'Content Strategy Director',
          image: 'https://randomuser.me/api/portraits/women/4.jpg',
          score: 83,
          comments: 'Strong content creation skills and good understanding of brand positioning.'
        },
        {
          id: 'TI-9',
          name: 'Mr. Hassan Tazi',
          position: 'Social Media Manager',
          image: 'https://randomuser.me/api/portraits/men/7.jpg',
          score: 79,
          comments: 'Good social media experience but needs improvement in strategic planning.'
        },
        {
          id: 'TI-10',
          name: 'Ms. Zineb Fassi',
          position: 'Marketing Analytics Specialist',
          image: 'https://randomuser.me/api/portraits/women/5.jpg',
          score: 87,
          comments: 'Excellent analytical skills and good understanding of marketing metrics.'
        }
      ]
    }
  ];

  const filterDataByDate = (data: CandidateAssessment[]) => {
    if (selectedYear === 'all') return data;
    return data.filter(item => new Date(item.assessmentDate).getFullYear() === parseInt(selectedYear));
  };

  const filteredAssessments = filterDataByDate(candidateAssessments).filter(assessment =>
    assessment.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assessment.candidateName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAssessments = filteredAssessments.length;
  const averageScore = filteredAssessments.length > 0 
    ? Math.round(filteredAssessments.reduce((sum, assessment) => sum + assessment.overallScore, 0) / filteredAssessments.length)
    : 0;
  const highScores = filteredAssessments.filter(a => a.overallScore >= 85).length;
  const committeeAssessments = filteredAssessments.reduce((sum, assessment) => sum + assessment.committeeMembers.length, 0);

  const kpiCards = [
    { title: 'Total Assessments', value: totalAssessments, icon: Award, description: 'All candidate evaluations' },
    { title: 'High Performers', value: highScores, icon: UserCheck, description: 'Scores ≥ 85' },
    { title: 'Committee Reviews', value: committeeAssessments, icon: Users, description: 'Total evaluations' }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getCommitteeAverage = (members: CommitteeMember[]) => {
    return members.length > 0 
      ? Math.round(members.reduce((sum, member) => sum + member.score, 0) / members.length)
      : 0;
  };

  const getTechnicalAverage = (interviewers: TechnicalInterviewer[]) => {
    return interviewers.length > 0 
      ? Math.round(interviewers.reduce((sum, interviewer) => sum + interviewer.score, 0) / interviewers.length)
      : 0;
  };

  const getFinalDecision = (score: number) => {
    return score >= 80 ? (
      <span className="text-green-600">To be hired</span>
    ) : (
      <span className="text-red-600">Not Recommended</span>
    );
  };

  const getApplicationStatus = (score: number) => {
    return score >= 80 ? 'Interviewed' : 'Rejected';
  };

  const TABLE_COL_COUNT = 7;

  const renderScoreSection = (type: 'committee' | 'technical', assessment: CandidateAssessment) => {
    const isCommittee = type === 'committee';
    const items = isCommittee ? assessment.committeeMembers : assessment.technicalInterviewers;
    const average = isCommittee ? getCommitteeAverage(assessment.committeeMembers) : getTechnicalAverage(assessment.technicalInterviewers);
    const title = isCommittee ? 'Committee Score' : 'Technical Interview Score';
    const Icon = isCommittee ? Users : Award;

    return (
      <div>
        <div className="flex items-start gap-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Icon className="h-5 w-5" />
            {title}
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {items.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={item.image} alt={item.name} />
                  <AvatarFallback>{item.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h5 className="font-semibold">{item.name}</h5>
                      <p className="text-sm text-muted-foreground">{item.position}</p>
                    </div>
                    <Badge className={`${getScoreColor(item.score)}`}>
                      {item.score}
                    </Badge>
                  </div>
                  <h6 className='font-bold text-primary'>Comment</h6>
                  <p className="text-sm text-muted-foreground">{item.comments}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderDialogContent = (assessment: CandidateAssessment, dialogType: 'full' | 'committee' | 'technical') => (
    <div className="space-y-6">
      <div className="flex justify-between items-start pt-8">
        <div>
          <h2 className="text-2xl font-bold">{assessment.candidateName}</h2>
          <p className="text-muted-foreground">{assessment.position}</p>
        </div>
        {(dialogType === 'technical' || dialogType === 'committee')  && (
          <Badge className={`${getScoreColor(assessment.overallScore)} text-lg`}>
            TOTAL SCORE : {assessment.overallScore}
          </Badge>
        )}
      </div>

      {(dialogType === 'technical' || dialogType === 'committee') && (
        <div className="grid grid-cols-3 gap-4 bg-muted/20 p-4 rounded-lg">
          <div>
            <p className="text-sm text-muted-foreground">Final Decision</p>
            <p className="font-semibold">{getFinalDecision(assessment.overallScore)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Application Status</p>
            <p className="font-semibold">{getApplicationStatus(assessment.overallScore)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Score</p>
            <p className="font-semibold">{assessment.overallScore}</p>
          </div>
        </div>
      )}
      
      {(dialogType === 'full' || dialogType === 'committee') && renderScoreSection('committee', assessment)}
      {(dialogType === 'full' || dialogType === 'technical') && renderScoreSection('technical', assessment)}
    </div>
  );

  return (
    <div className="space-y-8">
      <style>
        {`
          .dialog-overlay {
            z-index: 1000;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
          }
        `}
      </style>
      <DashboardHeader
        title="Candidate Assessment Scores"
        description="Track and evaluate candidate performance across different assessment stages"
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />

      <DashboardSection
        title="Assessment Scores"
        description="Detailed view of candidate assessments with committee and technical evaluations"
        icon={Award}
      >
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search assessments by position or candidate name..."
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

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted">
                  <TableHead className="font-bold text-foreground">Job Position</TableHead>
                  <TableHead className="font-bold text-foreground">Candidate Name</TableHead>
                  <TableHead className="font-bold text-foreground">Interview Date</TableHead>
                  <TableHead className="font-bold text-foreground">Duration</TableHead>
                  <TableHead className="font-bold text-foreground">Committee Score</TableHead>
                  <TableHead className="font-bold text-foreground">Technical Score</TableHead>
                  <TableHead className="font-bold text-foreground">Total Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssessments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={TABLE_COL_COUNT} className="text-center text-muted-foreground h-24">
                      No assessments found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAssessments.map((assessment) => (
                    <TableRow key={assessment.id}>
                      <TableCell className="font-medium text-muted-foreground">{assessment.position}</TableCell>
                      <TableCell className="text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={assessment.avatar} alt={assessment.candidateName} />
                            <AvatarFallback>{assessment.candidateName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          {assessment.candidateName}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{format(new Date(assessment.assessmentDate), 'MMM d, yyyy')}</TableCell>
                      <TableCell className="text-muted-foreground">{assessment.duration}</TableCell>
                      <TableCell className="text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Badge className={`${getScoreColor(getCommitteeAverage(assessment.committeeMembers))}`}>
                            {getCommitteeAverage(assessment.committeeMembers)}
                          </Badge>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              setSelectedAssessment(assessment);
                              setDialogType('committee');
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Badge className={`${getScoreColor(getTechnicalAverage(assessment.technicalInterviewers))}`}>
                            {getTechnicalAverage(assessment.technicalInterviewers)}
                          </Badge>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              setSelectedAssessment(assessment);
                              setDialogType('technical');
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        <Badge className={`${getScoreColor(assessment.overallScore)}`}>
                          {assessment.overallScore}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </DashboardSection>

      <Dialog.Root open={!!selectedAssessment && !!dialogType} onOpenChange={(open) => {
        if (!open) {
          setSelectedAssessment(null);
          setDialogType(null);
        }
      }}>
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto z-[1001]">
            {selectedAssessment && dialogType && renderDialogContent(selectedAssessment, dialogType)}
            <Dialog.Close asChild>
              <Button variant="ghost" className="absolute top-4 right-4">
                <X className="h-4 w-4" />
              </Button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default CandidateAssessmentScore;