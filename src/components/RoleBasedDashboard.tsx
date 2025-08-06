import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  Briefcase, 
  UserCheck, 
  Calendar,
  Search,
  Filter,
  Eye,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
// import { organizationUnits, getUnitsByType } from '@/data/organizationData';
// import CandidateScoring from './CandidateScoring';
import CandidateScoring from './../pages/CommitteeEvaluation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface JobPosition {
  id: string;
  title: string;
  businessUnit: string;
  applied: number;
  shortlist: number;
  status: 'Open' | 'In Progress' | 'Closed';
  recommended: number;
  priority: 'High' | 'Medium' | 'Low';
  type: 'sector' | 'center' | 'support unit';
}

interface Candidate {
  id: string;
  name: string;
  email: string;
  position: string;
  score: number;
  status: string;
  avatar: string;
}

interface Interview {
  id: string;
  candidate: string;
  interviewer: string;
  status: 'Scheduled' | 'Proposed' | 'Completed' | 'Cancelled';
  date: string;
  jobId: string;
}

interface RoleBasedDashboardProps {
  userRole: 'hr' | 'committee' | 'director';
}

const organizationUnits = [
  { name: "Education Sector", type: "sector" },
  { name: "Sector of Strategy and Institutional Excellence", type: "sector" },
  { name: "Sector of Partnerships and International Cooperation", type: "sector" },
  { name: "Science and Environment Sector", type: "sector" },
  { name: "Culture and Communication Sector", type: "sector" },
  { name: "Social and Human Sciences Sector", type: "sector" },
  { name: "Media and Communication Sector", type: "sector" },
  { name: "External Specialized Offices and Centers", type: "center" },
  { name: "Center of Chairs, Scholarships and Prizes", type: "center" },
  { name: "Poetry and Literature Center", type: "center" },
  { name: "Calligraphie and Manuscript Center", type: "center" },
  { name: "Training Center", type: "center" },
  { name: "Center of Foresight and Artificial Intelligence", type: "center" },
  { name: "Civilizational Dialogue Center", type: "center" },
  { name: "Arabic Language Center for Non-Arabic Speakers", type: "center" },
  { name: "Islamic World Heritage Center", type: "center" },
  { name: "Center of Translation and Publishing", type: "center" },
  { name: "Director General Office", type: "support unit" },
  { name: "General Secretariat of National Commissions and Conferences", type: "support unit" },
  { name: "Business Unit of legal affairs and international standards", type: "support unit" },
  { name: "Deputy Director General for Programs", type: "support unit" },
  { name: "Federation of Universities of the Islamic World", type: "support unit" },
  { name: "Business Unit of Administrative Operations", type: "support unit" },
  { name: "Business Unit of Digital Transformation", type: "support unit" },
  { name: "Business Unit of Financial Operations", type: "support unit" },
  { name: "Internal Audit Business Unit", type: "support unit" },
  { name: "Business Unit of Public Relations and Protocol", type: "support unit" },
  { name: "Business Unit of Design and Printing", type: "support unit" },
  { name: "Business Unit of Human Capital Management", type: "support unit" },
];

const RoleBasedDashboard: React.FC<RoleBasedDashboardProps> = ({ userRole }) => {
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isEvaluationOpen, setIsEvaluationOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(userRole === 'hr' ? 'sectors' : 'positions');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState('all');
  const [businessUnitFilter, setBusinessUnitFilter] = useState('all');

  // Mock data
  const mockPositions: JobPosition[] = [
    {
      id: 'POS-001',
      title: 'Senior Education Specialist',
      businessUnit: 'Education Sector',
      applied: 45,
      shortlist: 12,
      status: 'Open',
      recommended: 3,
      priority: 'High',
      type: 'sector'
    },
    {
      id: 'POS-002',
      title: 'Digital Transformation Manager',
      businessUnit: 'Business Unit of Digital Transformation',
      applied: 32,
      shortlist: 8,
      status: 'In Progress',
      recommended: 2,
      priority: 'High',
      type: 'support unit'
    },
    {
      id: 'POS-003',
      title: 'Research Coordinator',
      businessUnit: 'Center of Foresight and Artificial Intelligence',
      applied: 28,
      shortlist: 15,
      status: 'Open',
      recommended: 5,
      priority: 'Medium',
      type: 'center'
    }
  ];

  const mockCandidates: Candidate[] = [
    {
      id: 'CAND-001',
      name: 'Ahmed Hassan',
      email: 'ahmed.hassan@email.com',
      position: 'Senior Education Specialist',
      score: 95,
      status: 'Technical Interview',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 'CAND-002',
      name: 'Sarah Khalil',
      email: 'sarah.khalil@email.com',
      position: 'Digital Transformation Manager',
      score: 92,
      status: 'Final Interview',
      avatar: '/api/placeholder/40/40'
    }
  ];

  const mockInterviews: Interview[] = [
    {
      id: 'INT-001',
      candidate: 'Ahmed Hassan',
      interviewer: 'Dr. Mohammed',
      status: 'Scheduled',
      date: '2024-01-20',
      jobId: 'POS-001'
    },
    {
      id: 'INT-002',
      candidate: 'Sarah Khalil',
      interviewer: 'Ms. Fatima',
      status: 'Proposed',
      date: '2024-01-22',
      jobId: 'POS-002'
    }
  ];

  const getKPICards = () => {
    const baseKPIs = {
      openPositions: mockPositions.filter(p => p.status === 'Open').length,
      totalApplications: mockPositions.reduce((sum, p) => sum + p.applied, 0),
      shortlisted: mockPositions.reduce((sum, p) => sum + p.shortlist, 0),
      interviews: mockInterviews.length
    };

    switch (userRole) {
      case 'hr':
        return [
          { title: 'All Open Positions', value: baseKPIs.openPositions, icon: Briefcase, color: 'text-blue-600' },
          { title: 'Total Applications', value: baseKPIs.totalApplications, icon: Users, color: 'text-green-600' },
          { title: 'Shortlisted', value: baseKPIs.shortlisted, icon: UserCheck, color: 'text-purple-600' },
          { title: 'Interviews This Week', value: baseKPIs.interviews, icon: Calendar, color: 'text-orange-600' }
        ];
      case 'director':
        return [
          { title: 'Business Unit Positions', value: 8, icon: Briefcase, color: 'text-blue-600' },
          { title: 'Applications', value: 124, icon: Users, color: 'text-green-600' },
          { title: 'Shortlisted', value: 23, icon: UserCheck, color: 'text-purple-600' },
          { title: 'Interviews Pending', value: 5, icon: Calendar, color: 'text-orange-600' }
        ];
      case 'committee':
        return [
          { title: 'My Positions', value: 4, icon: Briefcase, color: 'text-blue-600' },
          { title: 'Applications', value: 67, icon: Users, color: 'text-green-600' },
          { title: 'Evaluations Pending', value: 12, icon: UserCheck, color: 'text-purple-600' },
          { title: 'Interviews This Week', value: 3, icon: Calendar, color: 'text-orange-600' }
        ];
      default:
        return [];
    }
  };

  const handleJobClick = (job: JobPosition) => {
    setSelectedJob(job);
  };

  const handleCandidateClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsEvaluationOpen(true);
  };

  const handleInterviewAction = (interviewId: string, action: 'accept' | 'decline') => {
    console.log(`Interview ${interviewId} ${action}ed`);
    // Handle interview acceptance/decline logic
  };

  const getBusinessUnitsByType = (type: string) => {
    return organizationUnits
      .filter(unit => unit.type === type)
      .map(unit => unit.name);
  };

  const filteredPositions = mockPositions.filter(position => {
    const matchesSearch = position.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         position.businessUnit.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = userRole === 'hr' ? 
      (filterValue === 'all' || 
       position.priority.toLowerCase() === filterValue.toLowerCase() ||
       position.status.toLowerCase() === filterValue.toLowerCase()) : 
      true;
    
      const matchesBusinessUnit = businessUnitFilter === 'all' ||
    position.businessUnit === businessUnitFilter;
    
    if (userRole === 'hr' && activeTab !== 'positions') {
      return matchesSearch && matchesFilter && matchesBusinessUnit && 
             position.type === activeTab.slice(0, -1) as any;
    }
    
    return matchesSearch && matchesFilter && matchesBusinessUnit;
  });

  const renderPositionsTable = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Input
            placeholder="Search positions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          {userRole === 'hr' && (
            <>
              <Select value={filterValue} onValueChange={setFilterValue}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in progress">In Progress</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={businessUnitFilter} onValueChange={setBusinessUnitFilter}>
                <SelectTrigger className="w-64">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by business unit..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All {activeTab.slice(0, -1)}s</SelectItem>
                  {getBusinessUnitsByType(activeTab.slice(0, -1)).map(businessUnit => (
                    <SelectItem key={businessUnit} value={businessUnit}>
                      {businessUnit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          )}
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Applied</TableHead>
            <TableHead>Shortlist</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Recommended</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPositions.map((position) => (
            <TableRow key={position.id} className="cursor-pointer hover:bg-muted/50">
              <TableCell>{position.id}</TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">{position.title}</p>
                                          <p className="text-sm text-muted-foreground">{position.businessUnit}</p>
                </div>
              </TableCell>
              <TableCell>{position.applied}</TableCell>
              <TableCell>{position.shortlist}</TableCell>
              <TableCell>
                <Badge variant={position.status === 'Open' ? 'default' : position.status === 'In Progress' ? 'secondary' : 'outline'}>
                  {position.status}
                </Badge>
              </TableCell>
              <TableCell>{position.recommended}</TableCell>
              <TableCell>
                <Badge variant={position.priority === 'High' ? 'destructive' : position.priority === 'Medium' ? 'secondary' : 'outline'}>
                  {position.priority}
                </Badge>
              </TableCell>
              <TableCell>
                <Button size="sm" variant="outline" onClick={() => handleJobClick(position)}>
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  const renderJobDetails = () => {
    if (!selectedJob) return null;

    const jobCandidates = mockCandidates.filter(c => c.position === selectedJob.title);
    const jobInterviews = mockInterviews.filter(i => i.jobId === selectedJob.id);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">{selectedJob.title}</h3>
                              <p className="text-muted-foreground">{selectedJob.businessUnit}</p>
          </div>
          <Button variant="outline" onClick={() => setSelectedJob(null)}>
            Back to Positions
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Applied Candidates */}
          <Card>
            <CardHeader>
              <CardTitle>Applied Candidates ({jobCandidates.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {jobCandidates.map((candidate) => (
                  <div key={candidate.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={candidate.avatar} />
                        <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{candidate.name}</p>
                        <p className="text-sm text-muted-foreground">Score: {candidate.score}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleCandidateClick(candidate)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Interviews Section */}
          <Card>
            <CardHeader>
              <CardTitle>Interviews ({jobInterviews.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {jobInterviews.map((interview) => (
                  <div key={interview.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{interview.candidate}</p>
                      <p className="text-sm text-muted-foreground">
                        {interview.interviewer} • {interview.date}
                      </p>
                      <Badge variant={interview.status === 'Scheduled' ? 'default' : interview.status === 'Proposed' ? 'secondary' : 'outline'}>
                        {interview.status}
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      {interview.status === 'Proposed' && userRole !== 'hr' && (
                        <>
                          <Button size="sm" variant="outline" onClick={() => handleInterviewAction(interview.id, 'accept')}>
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleInterviewAction(interview.id, 'decline')}>
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      {userRole === 'hr' && (
                        <Button size="sm" variant="outline">
                          <Calendar className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {getKPICards().map((kpi, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                  <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                </div>
                <kpi.icon className={`h-8 w-8 ${kpi.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      {selectedJob ? (
        renderJobDetails()
      ) : (
        <Card>
          <CardContent className="p-6">
            {userRole === 'hr' ? (
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="sectors">Sectors</TabsTrigger>
                  <TabsTrigger value="centers">Centers</TabsTrigger>
                  <TabsTrigger value="support units">Support Units</TabsTrigger>
                </TabsList>
                <TabsContent value="sectors" className="mt-6">
                  {renderPositionsTable()}
                </TabsContent>
                <TabsContent value="centers" className="mt-6">
                  {renderPositionsTable()}
                </TabsContent>
                <TabsContent value="support units" className="mt-6">
                  {renderPositionsTable()}
                </TabsContent>
              </Tabs>
            ) : (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Vacant Positions</h2>
                {renderPositionsTable()}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Candidate Evaluation Dialog */}
      <Dialog open={isEvaluationOpen} onOpenChange={setIsEvaluationOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Candidate Evaluation</DialogTitle>
          </DialogHeader>
          {selectedCandidate && (
            <CandidateScoring candidateId={selectedCandidate.id} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoleBasedDashboard;