import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, 
  Search, 
  Filter,
  Plus,
  Eye,
  Download,
  Star,
  Users,
  Target,
  TrendingUp,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { format } from 'date-fns';
import DashboardHeader from '@/components/DashboardHeader';
import KPICards from '@/components/KPICards';
import DashboardSection from '@/components/DashboardSection';

interface Resume {
  id: string;
  candidateName: string;
  position: string;
  businessUnit: string;
  uploadDate: string;
  status: 'pending' | 'reviewed' | 'approved' | 'rejected';
  qualityScore: number;
  skills: string[];
  experience: string;
  education: string;
  matchedPositions: string[];
  aiMatchScore: number;
  year: number;
}

const HRResumeLibrary: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [dateRange, setDateRange] = useState('year');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedResume, setExpandedResume] = useState<string | null>(null);

  // Mock resume data
  const resumes: Resume[] = [
    {
      id: 'RES-001',
      candidateName: 'Ahmed Hassan El-Masri',
      position: 'Senior Software Engineer',
      businessUnit: 'Digital Transformation',
      uploadDate: '2024-01-15',
      status: 'approved',
      qualityScore: 95,
      skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS'],
      experience: '8 years',
      education: 'PhD Computer Science',
      matchedPositions: ['Senior Software Engineer', 'Full Stack Developer'],
      aiMatchScore: 92,
      year: 2024
    },
    {
      id: 'RES-002',
      candidateName: 'Fatima Al-Zahra Benali',
      position: 'Marketing Manager',
      businessUnit: 'Communications',
      uploadDate: '2024-01-14',
      status: 'reviewed',
      qualityScore: 88,
      skills: ['Digital Marketing', 'Strategy', 'Analytics', 'Arabic', 'French'],
      experience: '6 years',
      education: 'Master Marketing',
      matchedPositions: ['Marketing Manager', 'Digital Marketing Specialist'],
      aiMatchScore: 87,
      year: 2024
    },
    {
      id: 'RES-003',
      candidateName: 'Omar Khalil Al-Rashid',
      position: 'Education Program Manager',
      businessUnit: 'Education',
      uploadDate: '2024-01-13',
      status: 'pending',
      qualityScore: 82,
      skills: ['Program Management', 'Educational Design', 'Leadership'],
      experience: '10 years',
      education: 'PhD Education',
      matchedPositions: ['Education Program Manager', 'Program Director'],
      aiMatchScore: 85,
      year: 2024
    },
    {
      id: 'RES-004',
      candidateName: 'Sarah Johnson',
      position: 'Financial Analyst',
      department: 'Finance',
      uploadDate: '2024-01-20',
      status: 'approved',
      qualityScore: 91,
      skills: ['Financial Analysis', 'Excel', 'SAP', 'Budgeting'],
      experience: '5 years',
      education: 'MBA Finance',
      matchedPositions: ['Financial Analyst', 'Senior Financial Analyst'],
      aiMatchScore: 89,
      year: 2024
    }
  ];

  // Filter data based on selected year
  const filterDataByDate = (data: Resume[]) => {
    if (selectedYear === 'all') return data;
    return data.filter(item => item.year === parseInt(selectedYear));
  };

  const filteredResumes = filterDataByDate(resumes).filter(resume =>
    resume.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resume.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resume.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate KPIs
  const totalResumes = filteredResumes.length;
  const matchedCandidates = filteredResumes.filter(r => r.matchedPositions.length > 0).length;
  const skillsInventory = [...new Set(filteredResumes.flatMap(r => r.skills))].length;
  const averageQualityScore = Math.round(
    filteredResumes.reduce((sum, resume) => sum + resume.qualityScore, 0) / filteredResumes.length
  );

  const kpiCards = [
    {
      title: 'Total Resumes',
      value: totalResumes,
      icon: FileText,
      description: 'All uploaded resumes'
    },
    {
      title: 'Matched Candidates',
      value: matchedCandidates,
      icon: Target,
      description: 'AI-matched candidates'
    },
    {
      title: 'Skills Inventory',
      value: skillsInventory,
      icon: TrendingUp,
      description: 'Unique skills identified'
    },
    {
      title: 'Avg Quality Score',
      value: `${averageQualityScore}%`,
      icon: Star,
      description: 'Resume quality rating'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getQualityColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 80) return 'bg-blue-100 text-blue-800';
    if (score >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const toggleExpanded = (resumeId: string) => {
    setExpandedResume(expandedResume === resumeId ? null : resumeId);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <DashboardHeader
        title="Resume Library"
        description="Manage and analyze candidate resumes with AI-powered matching"
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        dateRange={dateRange}
        setDateRange={setDateRange}
      >
        
      </DashboardHeader>

      {/* KPI Cards */}
      <DashboardSection
        title="Resume Overview"
        description="Key metrics for resume management and AI matching"
        icon={FileText}
      >
        <KPICards cards={kpiCards} />
      </DashboardSection>

      {/* Resume Management */}
      <DashboardSection
        title="Resume Management"
        description="Track resume quality, AI matching, and candidate skills"
        icon={FileText}
      >
        {/* Search and Filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resumes..."
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

        {/* Resumes Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Quality Score</TableHead>
                  <TableHead>AI Match Score</TableHead>
                  <TableHead>Matched Positions</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredResumes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center text-muted-foreground">
                      No resumes found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredResumes.map((resume) => (
                    <React.Fragment key={resume.id}>
                      <TableRow>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleExpanded(resume.id)}
                            aria-label={expandedResume === resume.id ? 'Collapse details' : 'Expand details'}
                          >
                            {expandedResume === resume.id ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </TableCell>
                        <TableCell className="font-medium">{resume.candidateName}</TableCell>
                        <TableCell>{resume.position}</TableCell>
                        <TableCell>{resume.department}</TableCell>
                        <TableCell>{format(new Date(resume.uploadDate), 'PPP')}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(resume.status)}>
                            {resume.status.charAt(0).toUpperCase() + resume.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getQualityColor(resume.qualityScore)}>
                            {resume.qualityScore}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-purple-100 text-purple-800">
                            {resume.aiMatchScore}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {resume.matchedPositions.slice(0, 2).map((position, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {position}
                              </Badge>
                            ))}
                            {resume.matchedPositions.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{resume.matchedPositions.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Star className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      {expandedResume === resume.id && (
                        <TableRow>
                          <TableCell colSpan={10} className="p-0">
                            <div className="p-4 bg-muted/20">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <h4 className="font-semibold mb-3">Candidate Details</h4>
                                  <div className="space-y-2 text-sm">
                                    <div><strong>Experience:</strong> {resume.experience}</div>
                                    <div><strong>Education:</strong> {resume.education}</div>
                                    <div><strong>Skills:</strong></div>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {resume.skills.map((skill, index) => (
                                        <Badge key={index} variant="secondary" className="text-xs">
                                          {skill}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-3">AI Analysis</h4>
                                  <div className="space-y-2 text-sm">
                                    <div><strong>Match Score:</strong> {resume.aiMatchScore}%</div>
                                    <div><strong>Quality Score:</strong> {resume.qualityScore}%</div>
                                    <div><strong>Matched Positions:</strong></div>
                                    <div className="space-y-1 mt-1">
                                      {resume.matchedPositions.map((position, index) => (
                                        <div key={index} className="text-xs p-1 bg-white rounded border">
                                          {position}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
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

export default HRResumeLibrary; 