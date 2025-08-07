import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  Filter,
  Star,
  Users,
  UserCheck,
  Award,
  X
} from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { format } from 'date-fns';
import DashboardHeader from '@/components/DashboardHeader';
import KPICards from '@/components/KPICards';
import DashboardSection from '@/components/DashboardSection';
import sallyimage from '@/assets/dr-sally-mabrouk.png';
import nidalimage from '@/assets/dr-nidal.jpg';
import albanyanimage from '@/assets/dr-ahmed-albanyan.webp';
import karimovimage from '@/assets/dr-anar.jpg';
import raheelimage from '@/assets/dr-rahel.jpg';

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
  overallScore: number;
  committeeMembers: CommitteeMember[];
  technicalInterviewers: TechnicalInterviewer[];
  assessmentDate: string;
}

const CandidateAssessmentScore: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2025');
  const [dateRange, setDateRange] = useState('year');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAssessment, setSelectedAssessment] = useState<CandidateAssessment | null>(null);

  // Mock data for candidate assessments
  const candidateAssessments: CandidateAssessment[] = [
    {
      id: 'ASSESS-001',
      position: 'Senior Software Engineer',
      candidateName: 'Alice Smith',
      overallScore: 85,
      assessmentDate: '2024-01-15',
      committeeMembers: [
        {
          id: 'CM-1',
          name: 'Dr. Sally Mabrouk',
          position: 'Director of the Office of Director General',
          image: sallyimage ,
          score: 88,
          comments: 'Excellent technical skills and strong problem-solving abilities. Shows great potential for leadership roles.'
        },
        {
          id: 'CM-2',
          name: 'Dr. Nidal Mohammad Zaidan Abuzuhri',
          position: 'Director of the Administrative Affairs Department',
          image: nidalimage,
          score: 82,
          comments: 'Good communication skills and team collaboration. Needs some improvement in system architecture knowledge.'
        },
        {
          id: 'CM-3',
          name: 'Dr. Ahmed Albanyan',
          position: 'Director of the Center of Translation and Publishing',
          image: albanyanimage,
          score: 90,
          comments: 'Outstanding technical expertise and innovative thinking. Highly recommended for the position.'
        },
        {
          id: 'CM-4',
          name: 'Mr. ANAR KARIMOV',
          position: 'Chief of Partnerships and International Cooperation Sector',
          image: karimovimage,
          score: 85,
          comments: 'Strong cultural fit and excellent interpersonal skills. Demonstrates good leadership potential.'
        },
        {
          id: 'CM-5',
          name: 'Prof. Dr. Raheel Qamar',
          position: 'Chief of Sciences and Technologies Sector',
          image: raheelimage,
          score: 87,
          comments: 'Impressive technical background and relevant experience. Good understanding of educational technology.'
        }
      ],
      technicalInterviewers: [
        {
          id: 'TI-1',
          name: 'Eng. Youssef Amrani',
          position: 'Senior Software Architect',
          image: '/src/assets/icesco-team-2.jfif',
          score: 92,
          comments: 'Excellent coding skills and deep understanding of modern frameworks. Strong problem-solving approach.'
        },
        {
          id: 'TI-2',
          name: 'Dr. Amina El-Khattabi',
          position: 'Technical Director',
          image: '/src/assets/icesco-team-3.jfif',
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
      assessmentDate: '2024-01-12',
      committeeMembers: [
        {
          id: 'CM-1',
          name: 'Dr. Sally Mabrouk',
          position: 'Director of the Office of Director General',
          image: '/src/assets/dr-sally-mabrouk.png',
          score: 88,
          comments: 'Excellent technical skills and strong problem-solving abilities. Shows great potential for leadership roles.'
        },
        {
          id: 'CM-2',
          name: 'Dr. Nidal Mohammad Zaidan Abuzuhri',
          position: 'Director of the Administrative Affairs Department',
          image: '/src/assets/dr-nidal.jpg',
          score: 82,
          comments: 'Good communication skills and team collaboration. Needs some improvement in system architecture knowledge.'
        },
        {
          id: 'CM-3',
          name: 'Dr. Ahmed Albanyan',
          position: 'Director of the Center of Translation and Publishing',
          image: '/src/assets/dr-ahmed-albanyan.webp',
          score: 90,
          comments: 'Outstanding technical expertise and innovative thinking. Highly recommended for the position.'
        },
        {
          id: 'CM-4',
          name: 'Mr. ANAR KARIMOV',
          position: 'Chief of Partnerships and International Cooperation Sector',
          image: '/src/assets/dr-anar.jpg',
          score: 85,
          comments: 'Strong cultural fit and excellent interpersonal skills. Demonstrates good leadership potential.'
        },
        {
          id: 'CM-5',
          name: 'Prof. Dr. Raheel Qamar',
          position: 'Chief of Sciences and Technologies Sector',
          image: '/src/assets/dr-rahel.jpg',
          score: 87,
          comments: 'Impressive technical background and relevant experience. Good understanding of educational technology.'
        }
      ],
      technicalInterviewers: [
        {
          id: 'TI-6',
          name: 'Ms. Fatima Zahra',
          position: 'Digital Marketing Specialist',
          image: '/src/assets/icesco-leadership.jfif',
          score: 85,
          comments: 'Excellent digital marketing skills and good understanding of analytics tools.'
        },
        {
          id: 'TI-7',
          name: 'Eng. Karim Alami',
          position: 'Marketing Technology Lead',
          image: '/src/assets/icesco-team.jfif',
          score: 81,
          comments: 'Good technical understanding of marketing platforms and automation tools.'
        },
        {
          id: 'TI-8',
          name: 'Dr. Layla Benjelloun',
          position: 'Content Strategy Director',
          image: '/src/assets/icesco-team-2.jfif',
          score: 83,
          comments: 'Strong content creation skills and good understanding of brand positioning.'
        },
        {
          id: 'TI-9',
          name: 'Mr. Hassan Tazi',
          position: 'Social Media Manager',
          image: '/src/assets/icesco-team-3.jfif',
          score: 79,
          comments: 'Good social media experience but needs improvement in strategic planning.'
        },
        {
          id: 'TI-10',
          name: 'Ms. Zineb Fassi',
          position: 'Marketing Analytics Specialist',
          image: '/src/assets/icesco-leadership.jfif',
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
    { title: 'Average Score', value: `${averageScore}`, icon: Star, description: 'Overall performance' },
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

  const TABLE_COL_COUNT = 5;

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
                <TableRow>
                  <TableHead className="w-[100px]">Actions</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Candidate Name</TableHead>
                  <TableHead>Total Score</TableHead>
                  <TableHead>Interview Details</TableHead>
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
                      <TableCell>
                        <Dialog.Root>
                          <Dialog.Trigger asChild>
                            <Button 
                              className="bg-primary text-primary-foreground hover:bg-primary/90"
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedAssessment(assessment)}
                            >
                              View Scores
                            </Button>
                          </Dialog.Trigger>
                          {selectedAssessment?.id === assessment.id && (
                            <Dialog.Portal>
                              <Dialog.Overlay className="dialog-overlay" />
                              <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto z-[1001]">
                                <div className="space-y-6">
                                  {/* Header Section */}
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h2 className="text-2xl font-bold">{assessment.candidateName}</h2>
                                      <p className="text-muted-foreground">{assessment.position}</p>
                                    </div>
                                    
                                    <Badge className={`${getScoreColor(assessment.overallScore)} text-lg`}>
                                      TOTAL SCORE : {assessment.overallScore} 
                                    </Badge>
                                  </div>

                                  {/* Summary Info */}
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

                                  {/* Committee Score Section */}
                                  <div>
                                    <div className="flex items-start gap-4">
                                      <h3 className="text-lg font-semibold flex items-center gap-2">
                                        <Users className="h-5 w-5" />
                                        Committee Score
                                      </h3>
                                      <Badge className='bg-primary text-primary-foreground'>
                                        {getCommitteeAverage(assessment.committeeMembers)}
                                      </Badge>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                      {assessment.committeeMembers.map((member) => (
                                        <Card key={member.id} className="p-4">
                                          <div className="flex items-start gap-4">
                                            <Avatar className="h-12 w-12">
                                              <AvatarImage src={member.image} alt={member.name} />
                                              <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                              <div className="flex items-center justify-between mb-2">
                                                <div>
                                                  <h5 className="font-semibold">{member.name}</h5>
                                                  <p className="text-sm text-muted-foreground">{member.position}</p>
                                                </div>
                                                <Badge className={`${getScoreColor(member.score)}`}>
                                                  {member.score}
                                                </Badge>
                                              </div>
                                              <h6 className='font-bold text-primary'>Comment</h6>
                                              <p className="text-sm text-muted-foreground">{member.comments}</p>
                                            </div>
                                          </div>
                                        </Card>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Technical Interview Score Section */}
                                  <div>
                                    <div className="flex items-start gap-4">
                                      <h3 className="text-lg font-semibold flex items-center gap-2">
                                        <Award className="h-5 w-5" />
                                        Technical Interview Score
                                      </h3>
                                      <Badge className='bg-primary text-primary-foreground'>
                                        {getTechnicalAverage(assessment.technicalInterviewers)}
                                      </Badge>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                      {assessment.technicalInterviewers.map((interviewer) => (
                                        <Card key={interviewer.id} className="p-4">
                                          <div className="flex items-start gap-4">
                                            <Avatar className="h-12 w-12">
                                              <AvatarImage src={interviewer.image} alt={interviewer.name} />
                                              <AvatarFallback>{interviewer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                              <div className="flex items-center justify-between mb-2">
                                                <div>
                                                  <h5 className="font-semibold">{interviewer.name}</h5>
                                                  <p className="text-sm text-muted-foreground">{interviewer.position}</p>
                                                </div>
                                                <Badge className={`${getScoreColor(interviewer.score)}`}>
                                                  {interviewer.score}
                                                </Badge>
                                              </div>
                                              <h6 className='font-bold text-primary'>Comment</h6>
                                              <p className="text-sm text-muted-foreground">{interviewer.comments}</p>
                                            </div>
                                          </div>
                                        </Card>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <Dialog.Close asChild>
                                  <Button variant="ghost" className="absolute top-4 right-4">
                                    <X className="h-4 w-4" />
                                  </Button>
                                </Dialog.Close>
                              </Dialog.Content>
                            </Dialog.Portal>
                          )}
                        </Dialog.Root>
                      </TableCell>
                      <TableCell className="font-medium">{assessment.position}</TableCell>
                      <TableCell>{assessment.candidateName}</TableCell>
                      <TableCell>
                        <Badge className={`${getScoreColor(assessment.overallScore)}`}>
                          {assessment.overallScore}
                        </Badge>
                      </TableCell>
                      <TableCell>{format(new Date(assessment.assessmentDate), 'MMM d, yyyy')}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </DashboardSection>
    </div>
  );
};

export default CandidateAssessmentScore;