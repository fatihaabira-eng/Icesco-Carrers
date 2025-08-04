import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  Filter, 
  Star, 
  Users, 
  MapPin, 
  GraduationCap,
  Award,
  ArrowUpDown,
  Eye,
  MessageSquare
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import CommitteeEvaluation from '@/pages/CommitteeEvaluation';

interface Candidate {
  id: number;
  name: string;
  nationality: string;
  flag: string;
  age: number;
  degree: string;
  university: string;
  experience: string;
  position: string;
  matchingScore: number;
  skills: string[];
  languages: string[];
  priority: string;
  status: string;
  avatar: string;
}


const JobMatchingModule: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [sortBy, setSortBy] = useState('score');
  
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
    
      const [isEvaluationOpen, setIsEvaluationOpen] = useState(false);

  const candidatesData = [
    {
      id: 1,
      name: 'Ahmed Hassan El-Masri',
      nationality: 'Egypt',
      flag: '🇪🇬',
      age: 32,
      degree: 'PhD Computer Science',
      university: 'Cairo University',
      experience: '8 years',
      position: 'Senior Software Engineer',
      matchingScore: 95,
      skills: ['React', 'Node.js', 'Python', 'AI/ML'],
      languages: ['Arabic', 'English', 'French'],
      priority: 'high',
      status: 'Technical Interview',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 2,
      name: 'Fatima Al-Zahra Benali',
      nationality: 'Morocco',
      flag: '🇲🇦',
      age: 29,
      degree: 'Master Marketing',
      university: 'Mohammed V University',
      experience: '6 years',
      position: 'Marketing Manager',
      matchingScore: 92,
      skills: ['Digital Marketing', 'Strategy', 'Analytics'],
      languages: ['Arabic', 'French', 'English'],
      priority: 'high',
      status: 'Final Interview',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 3,
      name: 'Omar Khalil Al-Rashid',
      nationality: 'Jordan',
      flag: '🇯🇴',
      age: 35,
      degree: 'PhD Education',
      university: 'University of Jordan',
      experience: '10 years',
      position: 'Education Specialist',
      matchingScore: 89,
      skills: ['Curriculum Design', 'Policy Development', 'Research'],
      languages: ['Arabic', 'English'],
      priority: 'medium',
      status: 'HR Interview',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 4,
      name: 'Amina Kone Diabate',
      nationality: 'Mali',
      flag: '🇲🇱',
      age: 31,
      degree: 'Master Finance',
      university: 'University of Bamako',
      experience: '7 years',
      position: 'Financial Analyst',
      matchingScore: 87,
      skills: ['Financial Analysis', 'Risk Management', 'Budgeting'],
      languages: ['Arabic', 'French', 'English'],
      priority: 'medium',
      status: 'Screening',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 5,
      name: 'Youssef Ben Mohamed',
      nationality: 'Tunisia',
      flag: '🇹🇳',
      age: 28,
      degree: 'Master Data Science',
      university: 'University of Tunis',
      experience: '5 years',
      position: 'Data Scientist',
      matchingScore: 85,
      skills: ['Python', 'Machine Learning', 'Statistics', 'SQL'],
      languages: ['Arabic', 'French', 'English'],
      priority: 'low',
      status: 'Portfolio Review',
      avatar: '/api/placeholder/40/40'
    }
  ];

  const departments = [
    { value: 'all', label: 'All Departments' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'education', label: 'Education' },
    { value: 'finance', label: 'Finance' },
    { value: 'research', label: 'Research' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleCandidateClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsEvaluationOpen(true);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredCandidates = candidatesData
    .filter(candidate => 
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(candidate => 
      selectedDepartment === 'all' || 
      candidate.position.toLowerCase().includes(selectedDepartment.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'score':
          return b.matchingScore - a.matchingScore;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'age':
          return a.age - b.age;
        default:
          return 0;
      }
    });

  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Job Scoring & Candidate Analytics
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              AI-powered candidate matching based on resume analysis and job relevance
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>
            
            {/* Department Filter */}
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {departments.map(dept => (
                  <SelectItem key={dept.value} value={dept.value}>
                    {dept.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Sort By */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-40">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="score">Match Score</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="age">Age</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Summary Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium">Total Candidates</span>
            </div>
            <p className="text-2xl font-bold text-blue-600 mt-2">{filteredCandidates.length}</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">High Priority</span>
            </div>
            <p className="text-2xl font-bold text-green-600 mt-2">
              {filteredCandidates.filter(c => c.priority === 'high').length}
            </p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium">90+ Score</span>
            </div>
            <p className="text-2xl font-bold text-purple-600 mt-2">
              {filteredCandidates.filter(c => c.matchingScore >= 90).length}
            </p>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-orange-600" />
              <span className="text-sm font-medium">PhD Holders</span>
            </div>
            <p className="text-2xl font-bold text-orange-600 mt-2">
              {filteredCandidates.filter(c => c.degree.includes('PhD')).length}
            </p>
          </div>
        </div>

        {/* Candidates Table */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-12">#</TableHead>
                <TableHead>Candidate</TableHead>
                <TableHead className="text-center">Nationality</TableHead>
                <TableHead className="text-center">Age</TableHead>
                <TableHead>Education</TableHead>
                <TableHead className="text-center">Score</TableHead>
                <TableHead>Position</TableHead>
                <TableHead className="text-center">Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCandidates.map((candidate, index) => (
                <TableRow key={candidate.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={candidate.avatar} />
                        <AvatarFallback>
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{candidate.name}</p>
                        <p className="text-xs text-muted-foreground">{candidate.experience} experience</p>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-lg">{candidate.flag}</span>
                      <span className="text-sm">{candidate.nationality}</span>
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-center font-medium">
                    {candidate.age}
                  </TableCell>
                  
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{candidate.degree}</p>
                      <p className="text-xs text-muted-foreground">{candidate.university}</p>
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Star className={`h-4 w-4 ${getScoreColor(candidate.matchingScore)}`} />
                      <span className={`font-bold ${getScoreColor(candidate.matchingScore)}`}>
                        {candidate.matchingScore}
                      </span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <p className="font-medium text-sm">{candidate.position}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {candidate.skills.slice(0, 2).map(skill => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {candidate.skills.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{candidate.skills.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-center">
                    <Badge className={getPriorityColor(candidate.priority)}>
                      {candidate.priority.toUpperCase()}
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    <Badge variant="outline">
                      {candidate.status}
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleCandidateClick(candidate)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <Dialog open={isEvaluationOpen} onOpenChange={setIsEvaluationOpen}>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Candidate Evaluation</DialogTitle>
                </DialogHeader>
                {selectedCandidate && (
                  <CommitteeEvaluation candidateId={selectedCandidate.id} />
                )}
              </DialogContent>
            </Dialog>
    </Card>
  );
};

export default JobMatchingModule;