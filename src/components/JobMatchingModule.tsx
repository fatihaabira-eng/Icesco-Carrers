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
  MessageSquare,
  Target
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import CommitteeEvaluation from '@/pages/CommitteeEvaluation';
import HrEvaluation from './hrEvaluation';

interface Candidate {
  ref: string;
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
  phase: string;
  decision: string;
  avatar: string;
  hrAction: 'shortlist' | 'reject' | 'not-reviewed';
}

const JobMatchingModule: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBusinessUnit, setSelectedBusinessUnit] = useState('all');
  const [sortBy, setSortBy] = useState('score');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isEvaluationOpen, setIsEvaluationOpen] = useState(false);
  

  const candidatesData: Candidate[] = [
    {
      ref: 'SHS25003',
      name: 'Ahmed Hassan El-Masri',
      nationality: 'Egypt',
      flag: 'https://flagcdn.com/w320/eg.png',
      age: 32,
      degree: 'PhD Computer Science',
      university: 'Cairo University',
      experience: '8 years',
      position: 'Senior Software Engineer',
      matchingScore: 95,
      skills: ['React', 'Node.js', 'Python', 'AI/ML'],
      languages: ['Arabic', 'English', 'French'],
      phase: 'Technical Interview',
      decision: 'hired',
      avatar: '/api/placeholder/40/40',
      hrAction: 'not-reviewed'

    },
    {
      ref: 'SHS25004',
      name: 'Fatima Al-Zahra Benali',
      nationality: 'Morocco',
      flag: 'https://flagcdn.com/w40/ma.png',
      age: 29,
      degree: 'Master Marketing',
      university: 'Mohammed V University',
      experience: '6 years',
      position: 'Marketing Manager',
      matchingScore: 92,
      skills: ['Digital Marketing', 'Strategy', 'Analytics'],
      languages: ['Arabic', 'French', 'English'],
      phase: 'Final Interview',
      decision: 'hired',
      avatar: '/api/placeholder/40/40',
      hrAction: 'not-reviewed'

    },
    {
      ref: 'SHS25005',
      name: 'Omar Khalil Al-Rashid',
      nationality: 'Jordan',
      flag: 'https://flagcdn.com/w40/jo.png',
      age: 35,
      degree: 'PhD Education',
      university: 'University of Jordan',
      experience: '10 years',
      position: 'Education Specialist',
      matchingScore: 89,
      skills: ['Curriculum Design', 'Policy Development', 'Research'],
      languages: ['Arabic', 'English'],
      phase: 'HR Interview',
      decision: 'rejected',
      avatar: '/api/placeholder/40/40',
      hrAction: 'not-reviewed'

    },
    {
      ref: 'SHS25006',
      name: 'Amina Kone Diabate',
      nationality: 'Mali',
      flag: 'https://flagcdn.com/w40/ml.png',
      age: 31,
      degree: 'Master Finance',
      university: 'University of Bamako',
      experience: '7 years',
      position: 'Financial Analyst',
      matchingScore: 87,
      skills: ['Financial Analysis', 'Risk Management', 'Budgeting'],
      languages: ['Arabic', 'French', 'English'],
      phase: 'Screening',
      decision: 'rejected',
      avatar: '/api/placeholder/40/40',
      hrAction: 'not-reviewed'

    },
    {
      ref: 'SHS25007',
      name: 'Youssef Ben Mohamed',
      nationality: 'Tunisia',
      flag: 'https://flagcdn.com/w40/tn.png',
      age: 28,
      degree: 'Master Data Science',
      university: 'University of Tunis',
      experience: '5 years',
      position: 'Data Scientist',
      matchingScore: 85,
      skills: ['Python', 'Machine Learning', 'Statistics', 'SQL'],
      languages: ['Arabic', 'French', 'English'],
      phase: 'Portfolio Review',
      decision: 'hired',
      avatar: '/api/placeholder/40/40',
      hrAction: 'not-reviewed'

    }
  ];

  const businessUnits = [
    { value: 'all', label: 'All Business Units' },
    { value: 'digital transformation', label: 'Digital Transformation' },
    { value: 'education', label: 'Education' },
    { value: 'human resources', label: 'Human Resources' },
    { value: 'finance', label: 'Finance' }
  ];

  const getHrActionColor = (action: string | undefined) => {
    switch (action) {
      case 'shortlist':
        return 'bg-green-500 text-white';
      case 'reject':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };
  const getDecisionColor = (decision: string) => {
    switch (decision) {
      case 'hired':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCandidateClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsEvaluationOpen(true);
  };

  const handleHrActionChange = (candidateRef: string, action: 'shortlist' | 'reject' | 'not-reviewed') => {
    candidatesData.map(candidate => 
      candidate.ref === candidateRef ? { ...candidate, hrAction: action } : candidate
    );
  };

  const getScoreColor = (score: number) => {
    if (  score >= 90) return 'text-green-600';
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
      selectedBusinessUnit === 'all' || 
      candidate.position.toLowerCase().includes(selectedBusinessUnit.toLowerCase())
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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Job Matching Review</h1>
        <p className="text-muted-foreground">Find the best candidate matches for your open positions.</p>
      </div>
      <Card className="mt-6">
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
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
              
              {/* Business Unit Filter */}
              <Select value={selectedBusinessUnit} onValueChange={setSelectedBusinessUnit}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {businessUnits.map(businessUnit => (
                    <SelectItem key={businessUnit.value} value={businessUnit.value}>
                      {businessUnit.label}
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
          {/* Candidates Table */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
  <TableHeader>
    <TableRow className="bg-gray-100">
      <TableHead className="w-24 font-semibold text-gray-700 py-3 text-left">Ref</TableHead>
      <TableHead className="font-semibold text-gray-700 py-3 text-left">Job Position</TableHead>
      <TableHead className="font-semibold text-gray-700 py-3 text-left">Candidate</TableHead>
      <TableHead className="font-semibold text-gray-700 py-3 text-center">Nationality</TableHead>
      <TableHead className="font-semibold text-gray-700 py-3 text-center">Years of Experience</TableHead>
      <TableHead className="font-semibold text-gray-700 py-3 text-left">Degree</TableHead>
      <TableHead className="font-semibold text-gray-700 py-3 text-center">Matching</TableHead>
      <TableHead className="font-semibold text-gray-700 py-3 text-left">Action</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {filteredCandidates.map((candidate) => (
      <TableRow key={candidate.ref} className="hover:bg-gray-50 transition-colors border-b border-gray-200">
        <TableCell className="font-medium text-gray-600 py-3 text-left">{candidate.ref}</TableCell>
        <TableCell className="font-medium text-gray-600 py-3 text-left">
          <p className="text-sm">{candidate.position}</p>
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
        <TableCell className="font-medium text-gray-600 py-3 text-left">
          <div className="flex items-center gap-3">
            <div>
              <p className="text-sm">{candidate.name}</p>
            </div>
            <Button size="sm" variant="outline" onClick={() => handleCandidateClick(candidate)}>
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </TableCell>
        <TableCell className="text-center font-medium text-gray-600 py-3">
          <div className="flex items-center justify-center gap-2">
            <img 
              src={candidate.flag} 
              alt={candidate.nationality + " flag"} 
              className="h-5 w-7 object-cover rounded-sm shadow-sm" 
            />
            <span className="text-sm">{candidate.nationality}</span>
          </div>
        </TableCell>
        <TableCell className="text-center font-medium text-gray-600 py-3">
          {candidate.experience}
        </TableCell>
        <TableCell className="font-medium text-gray-600 py-3 text-left">
          <p className="text-sm">{candidate.degree}</p>
        </TableCell>
        <TableCell className="text-center font-medium text-gray-600 py-3">
          <div className="flex items-center justify-center gap-1">
            <Star className={`h-4 w-4 ${getScoreColor(candidate.matchingScore)}`} />
            <span className={`font-semibold ${getScoreColor(candidate.matchingScore)}`}>
              {candidate.matchingScore}
            </span>
          </div>
        </TableCell>
        <TableCell className="font-medium text-gray-600 py-3 text-left">
          <Select 
            value={candidate.hrAction} 
            onValueChange={(value: 'shortlist' | 'reject' | 'not-reviewed') => 
              handleHrActionChange(candidate.ref, value)
            }
          >
            <SelectTrigger className={`w-40 ${getHrActionColor(candidate.hrAction)} text-left p-1`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="shortlist" className="text-green-600">Shortlist</SelectItem>
              <SelectItem value="reject" className="text-red-600">Reject</SelectItem>
              <SelectItem value="not-reviewed" className="text-gray-600">Not Reviewed</SelectItem>
            </SelectContent>
          </Select>
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
              <HrEvaluation candidateId={selectedCandidate.ref} />
            )}
          </DialogContent>
        </Dialog>
      </Card>
    </div>
  );
};

export default JobMatchingModule;