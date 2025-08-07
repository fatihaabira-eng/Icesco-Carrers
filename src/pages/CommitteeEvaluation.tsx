import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { 
  Star, 
  User, 
  FileText, 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Download,
  Play,
  Eye,
  Calendar,
  Send,
  ThumbsUp,
  ThumbsDown,
  Video
} from 'lucide-react';

interface EvaluationCriteria {
  id: string;
  name: string;
  maxPoints: number;
  score: number;
  description: string;
}

const CommitteeEvaluation = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [proposedInterviewDates, setProposedInterviewDates] = useState<any[]>([]);
  const [interviewResponse, setInterviewResponse] = useState<string>('');
  const [evaluationCriteria, setEvaluationCriteria] = useState<EvaluationCriteria[]>([
    { id: '1', name: 'Education', maxPoints: 7, score: 6, description: 'Academic qualifications and credentials' },
    { id: '2', name: 'Professional Experience', maxPoints: 10, score: 8, description: 'Relevant work experience and achievements' },
    { id: '3', name: 'Technical Skills', maxPoints: 20, score: 16, description: 'Job-specific technical competencies' },
    { id: '4', name: 'Management Skills', maxPoints: 10, score: 7, description: 'Job-specific management competencies' },
    { id: '5', name: 'ICESCO Languages', maxPoints: 9, score: 7, description: 'Arabic, English, French proficiency' },
    { id: '8', name: 'Innovation & Problem Solving', maxPoints: 10, score: 7, description: 'Creative thinking and problem-solving abilities' },
    { id: '9', name: 'Collaboration & Networking', maxPoints: 5, score: 4, description: 'Ability to work in teams and build networks' },
    { id: '10', name: 'Alignement with ICESCO Values', maxPoints: 5, score: 5, description: 'Alignment with ICESCO values and mission' },
    
  ]);

  const [publicComments, setPublicComments] = useState('');
  const [privateComments, setPrivateComments] = useState('');
  const [recommendation, setRecommendation] = useState('');

  const candidate = {
    id: 'CAND-001',
    name: 'Dr. Ahmed El Mansouri',
    email: 'ahmed.elmansouri@example.com',
    position: 'Senior Risk Analyst',
    appliedDate: '2024-01-15',
    currentStage: 'Committee Evaluation',
    avatar: '/api/placeholder/80/80',
    introVideo: '/api/placeholder/video.mp4',
    cv: '/api/placeholder/cv.pdf',
    coverLetter: '/api/placeholder/cover.pdf',
    qualifications: 'PhD in Economics, Master in Finance',
    totalExperience: '12 years',
    currentCtc: '85,000 MAD',
    expectedCtc: '120,000 MAD',
    languages: ['Arabic (Native)', 'English (Fluent)', 'French (Intermediate)'],
    keySkills: ['Risk Management', 'Financial Analysis', 'Statistical Modeling', 'Regulatory Compliance'],
    education: [
      { degree: 'PhD in Economics', institution: 'Mohammed V University', year: '2015' },
      { degree: 'Master in Finance', institution: 'INSEA', year: '2012' },
      { degree: 'Bachelor in Economics', institution: 'Hassan II University', year: '2010' }
    ],
    experience: [
      { 
        role: 'Senior Risk Analyst', 
        company: 'Bank Al-Maghrib', 
        duration: '2018-Present', 
        description: 'Led risk assessment initiatives and regulatory compliance projects'
      },
      { 
        role: 'Risk Analyst', 
        company: 'Attijariwafa Bank', 
        duration: '2015-2018', 
        description: 'Developed risk models and conducted financial analysis'
      },
      { 
        role: 'Junior Analyst', 
        company: 'BMCE Bank', 
        duration: '2012-2015', 
        description: 'Supported senior analysts in risk evaluation and reporting'
      }
    ]
  };

  const updateScore = (criteriaId: string, newScore: number) => {
    setEvaluationCriteria(prev => 
      prev.map(criteria => 
        criteria.id === criteriaId 
          ? { ...criteria, score: newScore }
          : criteria
      )
    );
  };

  const calculateTotalScore = () => {
    return evaluationCriteria.reduce((sum, criteria) => sum + criteria.score, 0);
  };

  const calculateMaxScore = () => {
    return evaluationCriteria.reduce((sum, criteria) => sum + criteria.maxPoints, 0);
  };

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-blue-600';
    if (percentage >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const totalScore = calculateTotalScore();
  const maxScore = calculateMaxScore();
  const scorePercentage = Math.round((totalScore / maxScore) * 100);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={candidate.avatar} />
            <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{candidate.name}</h1>
            <p className="text-muted-foreground">{candidate.position}</p>
            <div className="flex items-center space-x-4 mt-2">
              <Badge variant="outline">{candidate.currentStage}</Badge>
              <span className="text-sm text-muted-foreground">Applied: {candidate.appliedDate}</span>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className={`text-3xl font-bold ${getScoreColor(totalScore, maxScore)}`}>
            {totalScore}/{maxScore}
          </div>
          <div className="text-sm text-muted-foreground">({scorePercentage}%)</div>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Candidate Profile</TabsTrigger>
          <TabsTrigger value="evaluation">Evaluation Scorecard</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="comments">Comments & Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Video Introduction */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Play className="h-5 w-5 mr-2" />
                  Introduction Video
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <Button size="lg">
                    <Play className="h-6 w-6 mr-2" />
                    Play Introduction Video
                  </Button>
                </div>
                <div className="mt-4 flex justify-between text-sm text-muted-foreground">
                  <span>Duration: 3:45</span>
                  <span>Uploaded: {candidate.appliedDate}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Email</Label>
                    <p className="font-medium">{candidate.email}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Experience</Label>
                    <p className="font-medium">{candidate.totalExperience}</p>
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
                
                <Separator />
                
                <div>
                  <Label className="text-muted-foreground">Languages</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {candidate.languages.map((lang, index) => (
                      <Badge key={index} variant="outline">{lang}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label className="text-muted-foreground">Key Skills</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {candidate.keySkills.map((skill, index) => (
                      <Badge key={index} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Education & Experience */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {candidate.education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-primary pl-4">
                    <h4 className="font-medium">{edu.degree}</h4>
                    <p className="text-muted-foreground">{edu.institution}</p>
                    <p className="text-sm text-muted-foreground">{edu.year}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Professional Experience</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {candidate.experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-primary pl-4">
                    <h4 className="font-medium">{exp.role}</h4>
                    <p className="text-muted-foreground">{exp.company}</p>
                    <p className="text-sm text-muted-foreground">{exp.duration}</p>
                    <p className="text-sm mt-1">{exp.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="evaluation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Evaluation Scorecard (100 Points Total)</CardTitle>
              <p className="text-muted-foreground">Rate each criterion based on the candidate's profile and interview performance</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {evaluationCriteria.map((criteria) => (
                <div key={criteria.id} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="font-medium text-base">
                        {criteria.name}
                      </Label>
                      <p className="text-sm text-muted-foreground">{criteria.description}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-lg font-bold ${getScoreColor(criteria.score, criteria.maxPoints)}`}>
                        {criteria.score}/{criteria.maxPoints}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Slider
                      value={[criteria.score]}
                      onValueChange={(value) => updateScore(criteria.id, value[0])}
                      max={criteria.maxPoints}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0</span>
                      <span>{Math.floor(criteria.maxPoints / 2)}</span>
                      <span>{criteria.maxPoints}</span>
                    </div>
                  </div>
                </div>
              ))}

              <Separator />

              <div className="bg-muted p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <Label className="text-lg font-semibold">Total Score</Label>
                  <div className={`text-3xl font-bold ${getScoreColor(totalScore, maxScore)}`}>
                    {totalScore}/{maxScore} ({scorePercentage}%)
                  </div>
                </div>
                <div className="w-full bg-background rounded-full h-4 mt-3">
                  <div 
                    className="bg-primary h-4 rounded-full transition-all duration-300" 
                    style={{ width: `${scorePercentage}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Curriculum Vitae
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">CV Document Preview</p>
                  <div className="space-x-2">
                    <Button variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Cover Letter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">Cover Letter Preview</p>
                  <div className="space-x-2">
                    <Button variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Additional Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Diplomas & Certificates.pdf', size: '2.3 MB', type: 'pdf' },
                  { name: 'Professional References.docx', size: '1.1 MB', type: 'docx' },
                  { name: 'Portfolio Samples.zip', size: '15.7 MB', type: 'zip' }
                ].map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">{doc.size}</p>
                      </div>
                    </div>
                    <div className="space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comments" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Public Comments</CardTitle>
                <p className="text-sm text-muted-foreground">Visible to other committee members and HR</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Add your evaluation comments that will be visible to the team..."
                  value={publicComments}
                  onChange={(e) => setPublicComments(e.target.value)}
                  className="min-h-[120px]"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Private Notes</CardTitle>
                <p className="text-sm text-muted-foreground">Only visible to you</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Add your private notes and observations..."
                  value={privateComments}
                  onChange={(e) => setPrivateComments(e.target.value)}
                  className="min-h-[120px]"
                />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Final Recommendation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Provide your final recommendation and next steps..."
                value={recommendation}
                onChange={(e) => setRecommendation(e.target.value)}
                className="min-h-[100px]"
              />
            </CardContent>
          </Card>

          {/* Previous Comments */}
          <Card>
            <CardHeader>
              <CardTitle>Committee Discussion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
               {[
  {
    author: 'Dr Sally MABROUK',
    role: 'Director  of the Office of Director General ',
    time: '2h ago',
    comment: 'Great profile!',
    avatar: '/src/assets/dr-sally-mabrouk.png',
  },
  {
    author: 'Dr. Ahmed Albanyan',
    role: 'Director of the Center of Translation and Publishing',
    time: '3h ago',
    comment: 'Very experienced.',
    avatar: '/src/assets/dr-ahmed-albanyan.webp',
  },
].map((comment, index) => (
  <div key={index} className="flex space-x-3 p-4 bg-muted rounded-lg">
    <Avatar className="h-12 w-12">
      <AvatarImage src={comment.avatar} alt={comment.author} />
      <AvatarFallback>
        {comment.author
          .split(' ')
          .map((n) => n[0])
          .join('')}
      </AvatarFallback>
    </Avatar>
    <div className="flex-1">
      <div className="flex items-center space-x-2 mb-1">
        <span className="font-medium text-sm">{comment.author}</span>
        <Badge variant="outline" className="text-xs">
          {comment.role}
        </Badge>
        <span className="text-xs text-muted-foreground">{comment.time}</span>
      </div>
      <p className="text-sm">{comment.comment}</p>
    </div>
  </div>
))}

              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      {/* <div className="flex justify-between items-center pt-6 border-t">
        <div className="space-x-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Interview
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Send Message to Candidate</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Textarea placeholder="Type your message..." />
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="space-x-2">
          <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
            <ThumbsDown className="h-4 w-4 mr-2" />
            Decline
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            <ThumbsUp className="h-4 w-4 mr-2" />
            Approve
          </Button>
        </div>
      </div> */}

        {/* Proposed Interview Dates Section */}
        {/* <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Proposed Interview Dates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {proposedInterviewDates.length > 0 ? (
                <div className="space-y-3">
                  {proposedInterviewDates.map((interview, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{interview.candidate}</p>
                          <p className="text-sm text-muted-foreground">{interview.position}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {interview.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {interview.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <Video className="h-4 w-4" />
                              {interview.mode}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            onClick={() => setInterviewResponse('accepted')}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Accept
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setInterviewResponse('declined')}
                          >
                            Decline
                          </Button>
                        </div>
                      </div>
                      
                      {interviewResponse && (
                        <div className="mt-4 pt-4 border-t">
                          <Label className="text-sm font-medium">
                            {interviewResponse === 'declined' ? 'Reason for Declining (Optional)' : 'Additional Comments (Optional)'}
                          </Label>
                          <Textarea
                            placeholder={interviewResponse === 'declined' 
                              ? "Please provide a reason for declining..." 
                              : "Any additional comments or special requirements..."
                            }
                            className="mt-2"
                            rows={3}
                          />
                          <div className="flex gap-2 mt-3">
                            <Button size="sm">
                              Submit Response
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => setInterviewResponse('')}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Proposed Interviews</h3>
                  <p className="text-muted-foreground">
                    Interview dates will appear here when HR schedules them
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card> */}
      </div>
    );
  };

export default CommitteeEvaluation;