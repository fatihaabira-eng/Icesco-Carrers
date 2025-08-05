import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Star, 
  BookOpen, 
  Briefcase,
  MapPin,
  Calendar,
  FileText,
  Upload,
  RefreshCw,
  Check
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const CVTechPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [sortBy, setSortBy] = useState('score');
  const [shortlisted, setShortlisted] = useState({});

  const mockCandidates = [
    {
      id: 1,
      name: 'Ahmed Hassan',
      email: 'ahmed.hassan@email.com',
      position: 'Senior Software Engineer',
      score: 95,
      experience: '8 years',
      education: 'MSc Computer Science',
      skills: ['React', 'Node.js', 'Python', 'AWS'],
      location: 'Cairo, Egypt',
      applicationDate: '2024-01-15',
      status: 'Under Review',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 2,
      name: 'Fatima Al-Zahra',
      email: 'fatima.alzahra@email.com',
      position: 'Data Scientist',
      score: 92,
      experience: '6 years',
      education: 'PhD Statistics',
      skills: ['Python', 'R', 'Machine Learning', 'SQL'],
      location: 'Rabat, Morocco',
      applicationDate: '2024-01-14',
      status: 'Shortlisted',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 3,
      name: 'Omar Benali',
      email: 'omar.benali@email.com',
      position: 'UI/UX Designer',
      score: 89,
      experience: '5 years',
      education: 'BA Design',
      skills: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research'],
      location: 'Tunis, Tunisia',
      applicationDate: '2024-01-13',
      status: 'Interview Scheduled',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 4,
      name: 'Layla Mansouri',
      email: 'layla.mansouri@email.com',
      position: 'Project Manager',
      score: 87,
      experience: '7 years',
      education: 'MBA',
      skills: ['Project Management', 'Scrum', 'Leadership', 'Risk Management'],
      location: 'Dubai, UAE',
      applicationDate: '2024-01-12',
      status: 'Under Review',
      avatar: '/api/placeholder/40/40'
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 80) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Shortlisted': return 'bg-green-100 text-green-800';
      case 'Interview Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleShortlist = (candidateId) => {
    setShortlisted(prev => ({
      ...prev,
      [candidateId]: true
    }));
  };

  const filteredCandidates = mockCandidates
    .filter(candidate => 
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'score': return b.score - a.score;
        case 'name': return a.name.localeCompare(b.name);
        case 'date': return new Date(b.applicationDate).getTime() - new Date(a.applicationDate).getTime();
        default: return 0;
      }
    });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Resumes Library</h1>
          <p className="text-muted-foreground">Advanced resume analysis and candidate management</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Bulk Upload
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total CVs</p>
                <p className="text-2xl font-bold">1,247</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">High Score (90+)</p>
                <p className="text-2xl font-bold">156</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Briefcase className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Active Positions</p>
                <p className="text-2xl font-bold">23</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <RefreshCw className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Processing</p>
                <p className="text-2xl font-bold">34</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by name, position, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Business Units</SelectItem>
                <SelectItem value="it">Digital Transformation</SelectItem>
                <SelectItem value="hr">Human Resources</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="marketing">Education</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="score">Matching Score</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="date">Application Date</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Candidates List */}
      <div className="grid gap-4">
        {filteredCandidates.map((candidate) => (
          <Card key={candidate.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={candidate.avatar} />
                    <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{candidate.name}</h3>
                      <p className="text-muted-foreground">{candidate.email}</p>
                      <p className="text-sm font-medium text-primary">{candidate.position}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Briefcase className="h-4 w-4 mr-1" />
                        {candidate.experience}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <BookOpen className="h-4 w-4 mr-1" />
                        {candidate.education}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        {candidate.location}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        {candidate.applicationDate}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {candidate.skills.slice(0, 4).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {candidate.skills.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{candidate.skills.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={getStatusColor(candidate.status)}>
                    {candidate.status}
                  </Badge>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    {shortlisted[candidate.id] ? (
                      <Button variant="outline" size="sm" disabled className="text-green-600">
                        <Check className="h-4 w-4 mr-1" />
                        Shortlisted
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleShortlist(candidate.id)}
                      >
                        Shortlist
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CVTechPage;