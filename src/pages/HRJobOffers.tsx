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
  Edit,
  Trash2,
  Calendar,
  Users,
  Briefcase,
  CheckCircle,
  Clock,
  Target,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { format } from 'date-fns';
import DashboardHeader from '@/components/DashboardHeader';
import KPICards from '@/components/KPICards';
import DashboardSection from '@/components/DashboardSection';

interface JobOffer {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  status: 'active' | 'draft' | 'closed' | 'archived';
  applications: number;
  publishedDate: string | null;
  closingDate: string | null;
  description: string;
  requirements: string[];
  salary: string;
  experience: string;
  year: number;
  candidates: Candidate[];
}

interface Candidate {
  id: string;
  name: string;
  jobTitle: string;
  stage: 'new' | 'under_review' | 'interview' | 'offer' | 'hired';
  stageDate: string;
}

const stages = [
  { id: 'new', title: 'New Applications', color: 'bg-blue-100' },
  { id: 'under_review', title: 'Under Review', color: 'bg-yellow-100' },
  { id: 'interview', title: 'Interview', color: 'bg-purple-100' },
  { id: 'offer', title: 'Offer', color: 'bg-orange-100' },
  { id: 'hired', title: 'Hired', color: 'bg-green-100' },
] as const;

const HRJobOffers: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [dateRange, setDateRange] = useState('year');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedOffer, setExpandedOffer] = useState<string | null>(null);

  // Mock job offers data
  const jobOffers: JobOffer[] = [
    {
      id: 'OFFER-001',
      title: 'Senior Software Engineer',
      department: 'Digital Transformation',
      location: 'Rabat, Morocco',
      type: 'Full-time',
      status: 'active',
      applications: 45,
      publishedDate: '2024-01-10',
      closingDate: '2024-02-10',
      description: 'Lead development of educational technology platforms',
      requirements: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS'],
      salary: 'Competitive',
      experience: '5+ years',
      year: 2024,
      candidates: [
        { id: 'CAND-1', name: 'Alice Smith', jobTitle: 'Senior Software Engineer', stage: 'interview', stageDate: '2024-01-15' },
        { id: 'CAND-2', name: 'Bob Johnson', jobTitle: 'Senior Software Engineer', stage: 'offer', stageDate: '2024-01-16' },
        { id: 'CAND-3', name: 'Clara Brown', jobTitle: 'Senior Software Engineer', stage: 'hired', stageDate: '2024-01-17' },
      ]
    },
    {
      id: 'OFFER-002',
      title: 'Marketing Manager',
      department: 'Communications',
      location: 'Remote',
      type: 'Full-time',
      status: 'active',
      applications: 32,
      publishedDate: '2024-01-08',
      closingDate: '2024-02-08',
      description: 'Design and implement innovative marketing strategies',
      requirements: ['Digital Marketing', 'Strategy', 'Analytics', 'Arabic', 'French'],
      salary: 'Competitive',
      experience: '3-5 years',
      year: 2024,
      candidates: [
        { id: 'CAND-4', name: 'David Lee', jobTitle: 'Marketing Manager', stage: 'under_review', stageDate: '2024-01-12' },
        { id: 'CAND-5', name: 'Emma Wilson', jobTitle: 'Marketing Manager', stage: 'interview', stageDate: '2024-01-14' },
      ]
    },
    {
      id: 'OFFER-003',
      title: 'Education Program Manager',
      department: 'Education',
      location: 'Rabat, Morocco',
      type: 'Contract',
      status: 'draft',
      applications: 0,
      publishedDate: null,
      closingDate: null,
      description: 'Design and implement innovative educational programs',
      requirements: ['Program Management', 'Educational Design', 'Stakeholder Management'],
      salary: 'Competitive',
      experience: '3-5 years',
      year: 2024,
      candidates: []
    }
  ];

  // Filter data based on selected year
  const filterDataByDate = (data: JobOffer[]) => {
    if (selectedYear === 'all') return data;
    return data.filter(item => item.year === parseInt(selectedYear));
  };

  const filteredJobOffers = filterDataByDate(jobOffers).filter(offer =>
    offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    offer.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    offer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate KPIs
  const totalOffers = filteredJobOffers.length;
  const activeOffers = filteredJobOffers.filter(o => o.status === 'active').length;
  const applicationsReceived = filteredJobOffers.reduce((sum, offer) => sum + offer.applications, 0);
  const positionsFilled = filteredJobOffers.reduce((sum, offer) => 
    sum + offer.candidates.filter(c => c.stage === 'hired').length, 0
  );

  const kpiCards = [
    {
      title: 'Total Offers',
      value: totalOffers,
      icon: FileText,
      description: 'All job postings'
    },
    {
      title: 'Active Offers',
      value: activeOffers,
      icon: Briefcase,
      description: 'Currently open positions'
    },
    {
      title: 'Applications Received',
      value: applicationsReceived,
      icon: Users,
      description: 'Total applications'
    },
    {
      title: 'Positions Filled',
      value: positionsFilled,
      icon: CheckCircle,
      description: 'Successfully hired'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      case 'archived':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = (offerId: string, newStatus: JobOffer['status']) => {
    // In a real app, this would update the backend
    console.log(`Updating offer ${offerId} to status ${newStatus}`);
  };

  const toggleExpanded = (offerId: string) => {
    setExpandedOffer(expandedOffer === offerId ? null : offerId);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <DashboardHeader
        title="Job Offers"
        description="Create and manage job postings across all organizational units"
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        dateRange={dateRange}
        setDateRange={setDateRange}
      >
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Job Offer
        </Button>
      </DashboardHeader>

      {/* KPI Cards */}
      <DashboardSection
        title="Job Offers Overview"
        description="Key metrics for job offer management and recruitment pipeline"
        icon={FileText}
      >
        <KPICards cards={kpiCards} />
      </DashboardSection>

      {/* Job Offers Management */}
      <DashboardSection
        title="Job Offers Management"
        description="Track and manage job postings with candidate pipeline"
        icon={FileText}
      >
        {/* Search and Filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search job offers..."
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

        {/* Job Offers Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Applications</TableHead>
                  <TableHead>Published Date</TableHead>
                  <TableHead>Closing Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobOffers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center text-muted-foreground">
                      No job offers found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredJobOffers.map((offer) => (
                    <React.Fragment key={offer.id}>
                      <TableRow>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleExpanded(offer.id)}
                            aria-label={expandedOffer === offer.id ? 'Collapse details' : 'Expand details'}
                          >
                            {expandedOffer === offer.id ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </TableCell>
                        <TableCell className="font-medium">{offer.title}</TableCell>
                        <TableCell>{offer.department}</TableCell>
                        <TableCell>{offer.location}</TableCell>
                        <TableCell>{offer.type}</TableCell>
                        <TableCell>
                          <Select
                            value={offer.status}
                            onValueChange={(value) => handleStatusChange(offer.id, value as JobOffer['status'])}
                          >
                            <SelectTrigger className="w-24">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="closed">Closed</SelectItem>
                              <SelectItem value="archived">Archived</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{offer.applications}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {offer.publishedDate ? format(new Date(offer.publishedDate), 'PPP') : 'Not published'}
                        </TableCell>
                        <TableCell>
                          {offer.closingDate ? format(new Date(offer.closingDate), 'PPP') : 'Not set'}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      {expandedOffer === offer.id && (
                        <TableRow>
                          <TableCell colSpan={10} className="p-0">
                            <div className="p-4 bg-muted/20">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <h4 className="font-semibold mb-3">Job Details</h4>
                                  <div className="space-y-2 text-sm">
                                    <div><strong>Description:</strong> {offer.description}</div>
                                    <div><strong>Salary:</strong> {offer.salary}</div>
                                    <div><strong>Experience:</strong> {offer.experience}</div>
                                    <div><strong>Requirements:</strong></div>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {offer.requirements.map((req, index) => (
                                        <Badge key={index} variant="secondary" className="text-xs">
                                          {req}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-3">Candidate Pipeline</h4>
                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
                                    {stages.map((stage) => (
                                      <div key={stage.id} className="flex flex-col">
                                        <div className={`p-2 rounded-t-md text-xs font-semibold ${stage.color}`}>
                                          {stage.title}
                                        </div>
                                        <div className="space-y-1 p-2">
                                          {offer.candidates
                                            .filter((candidate) => candidate.stage === stage.id)
                                            .map((candidate) => (
                                              <div key={candidate.id} className="text-xs p-1 bg-white rounded border">
                                                {candidate.name}
                                              </div>
                                            ))}
                                          {offer.candidates.filter((candidate) => candidate.stage === stage.id).length === 0 && (
                                            <div className="text-xs text-muted-foreground text-center">
                                              No candidates
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    ))}
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

export default HRJobOffers; 