import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Star, User, FileText, MessageSquare, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

interface CandidateInfo {
  id: string;
  name: string;
  email: string;
  position: string;
  experience: string;
  education: string;
  currentCtc: string;
  expectedCtc: string;
  noticePeriod: string;
  avatar?: string;
}

interface ScoringCriteria {
  id: string;
  name: string;
  weight: number;
  score: number;
  maxScore: number;
}

const CandidateScoring = ({ candidateId }: { candidateId: string }) => {
  const [candidate] = useState<CandidateInfo>({
    id: candidateId,
    name: 'Ahmed El Mansouri',
    email: 'ahmed.elmansouri@example.com',
    position: 'Senior Risk Analyst',
    experience: '8 years',
    education: 'Master in Finance, INSEA',
    currentCtc: '65,000 MAD',
    expectedCtc: '85,000 MAD',
    noticePeriod: '1 month',
  });

  const [scoringCriteria, setScoringCriteria] = useState<ScoringCriteria[]>([
    { id: '1', name: 'Technical Skills', weight: 30, score: 85, maxScore: 100 },
    { id: '2', name: 'Experience Relevance', weight: 25, score: 78, maxScore: 100 },
    { id: '3', name: 'Communication Skills', weight: 20, score: 92, maxScore: 100 },
    { id: '4', name: 'Problem Solving', weight: 15, score: 88, maxScore: 100 },
    { id: '5', name: 'Cultural Fit', weight: 10, score: 95, maxScore: 100 }
  ]);

  const [notes, setNotes] = useState('');
  const [recommendation, setRecommendation] = useState('');

  const updateScore = (criteriaId: string, newScore: number) => {
    setScoringCriteria(prev => 
      prev.map(criteria => 
        criteria.id === criteriaId 
          ? { ...criteria, score: newScore }
          : criteria
      )
    );
  };

  const calculateOverallScore = () => {
    const totalWeightedScore = scoringCriteria.reduce((sum, criteria) => {
      return sum + (criteria.score * criteria.weight / 100);
    }, 0);
    return Math.round(totalWeightedScore);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRecommendationBadge = (score: number) => {
    if (score >= 85) return <Badge className="bg-green-100 text-green-800">Highly Recommended</Badge>;
    if (score >= 70) return <Badge className="bg-blue-100 text-blue-800">Recommended</Badge>;
    if (score >= 60) return <Badge className="bg-yellow-100 text-yellow-800">Consider</Badge>;
    return <Badge className="bg-red-100 text-red-800">Not Recommended</Badge>;
  };

  const overallScore = calculateOverallScore();

  return (
    <div className="space-y-6">
      {/* Candidate Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={candidate.avatar} />
              <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-xl">{candidate.name}</CardTitle>
              <p className="text-muted-foreground">{candidate.position}</p>
              <p className="text-sm text-muted-foreground">{candidate.email}</p>
            </div>
            <div className="text-right">
              <div className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>
                {overallScore}%
              </div>
              {getRecommendationBadge(overallScore)}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <Label className="text-muted-foreground">Experience</Label>
              <p className="font-medium">{candidate.experience}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Education</Label>
              <p className="font-medium">{candidate.education}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Current CTC</Label>
              <p className="font-medium">{candidate.currentCtc}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Expected CTC</Label>
              <p className="font-medium">{candidate.expectedCtc}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="scoring" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="scoring">Scoring</TabsTrigger>
          <TabsTrigger value="notes">Notes & Feedback</TabsTrigger>
          <TabsTrigger value="history">Interview History</TabsTrigger>
        </TabsList>

        <TabsContent value="scoring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Evaluation Criteria</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {scoringCriteria.map((criteria) => (
                <div key={criteria.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="font-medium">
                      {criteria.name} ({criteria.weight}% weight)
                    </Label>
                    <span className={`font-bold ${getScoreColor(criteria.score)}`}>
                      {criteria.score}/{criteria.maxScore}
                    </span>
                  </div>
                  <Slider
                    value={[criteria.score]}
                    onValueChange={(value) => updateScore(criteria.id, value[0])}
                    max={criteria.maxScore}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Poor</span>
                    <span>Average</span>
                    <span>Excellent</span>
                  </div>
                </div>
              ))}

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <Label className="text-lg font-semibold">Overall Score</Label>
                  <div className={`text-2xl font-bold ${getScoreColor(overallScore)}`}>
                    {overallScore}%
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                  <div 
                    className="bg-primary h-3 rounded-full transition-all duration-300" 
                    style={{ width: `${overallScore}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Interview Notes & Feedback</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="notes">Interview Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Add your detailed notes about the candidate's performance, strengths, areas for improvement..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[150px] mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="recommendation">Recommendation</Label>
                <Textarea
                  id="recommendation"
                  placeholder="Provide your recommendation for next steps..."
                  value={recommendation}
                  onChange={(e) => setRecommendation(e.target.value)}
                  className="min-h-[100px] mt-2"
                />
              </div>

              <div className="flex space-x-2">
                <Button>Save Notes</Button>
                <Button variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Share with Team
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Interview Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    stage: 'Application Received',
                    date: '2024-01-15',
                    status: 'completed',
                    notes: 'CV and cover letter reviewed'
                  },
                  {
                    stage: 'HR Screening',
                    date: '2024-01-18',
                    status: 'completed',
                    notes: 'Initial phone screening - candidate meets basic requirements'
                  },
                  {
                    stage: 'Technical Interview',
                    date: '2024-01-22',
                    status: 'completed',
                    notes: 'Strong technical skills, good problem-solving approach'
                  },
                  {
                    stage: 'Managerial Interview',
                    date: '2024-01-25',
                    status: 'in-progress',
                    notes: 'Currently being evaluated'
                  },
                  {
                    stage: 'Final Decision',
                    date: '2024-01-30',
                    status: 'pending',
                    notes: 'Awaiting feedback from all interviewers'
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      item.status === 'completed' ? 'bg-green-100 text-green-600' :
                      item.status === 'in-progress' ? 'bg-blue-100 text-blue-600' :
                      'bg-gray-100 text-gray-400'
                    }`}>
                      {item.status === 'completed' ? <CheckCircle className="h-4 w-4" /> :
                       item.status === 'in-progress' ? <Clock className="h-4 w-4" /> :
                       <AlertTriangle className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{item.stage}</h4>
                        <span className="text-sm text-muted-foreground">{item.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{item.notes}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <div className="space-x-2">
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            View CV
          </Button>
          <Button variant="outline">
            <User className="h-4 w-4 mr-2" />
            Contact Candidate
          </Button>
        </div>
        
        <div className="space-x-2">
          <Button variant="outline">
            Schedule Interview
          </Button>
          <Button>
            Submit Evaluation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CandidateScoring;