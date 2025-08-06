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
  Users,
  CheckCircle,
  Briefcase,
  ChevronDown,
  ChevronUp,
  X,
  UserCheck,
  UserX,
  ListChecks
} from 'lucide-react';
import { format } from 'date-fns';
import DashboardHeader from '@/components/DashboardHeader';
import KPICards from '@/components/KPICards';
import DashboardSection from '@/components/DashboardSection';
import CreateJobOfferForm from '@/components/CreateJobOfferForm';

// Updated Interfaces
interface JobOffer {
  id: string; // Corresponds to 'Reference'
  title: string;
  department: string; // Corresponds to 'Business Unit'
  location: string;
  type: string;
  status: 'active' | 'draft' | 'closed' | 'archived';
  applications: number; // Corresponds to 'N applied candidate'
  publishedDate: string | null;
  closingDate: string | null;
  description: string;
  requirements: string[];
  salary: string;
  experience: string;
  year: number;
  positions: number; // Corresponds to 'n positions'
  candidates: Candidate[];
}

interface Candidate {
  id: string;
  name: string;
  jobTitle: string;
  // Added 'rejected' to the possible stages
  stage: 'new' | 'under_review' | 'interview' | 'offer' | 'hired' | 'rejected';
  stageDate: string;
}

const stages = [
  { id: 'new', title: 'New Applications', color: 'bg-blue-100' },
  { id: 'under_review', title: 'Under Review', color: 'bg-yellow-100' },
  { id: 'interview', title: 'Interview', color: 'bg-purple-100' },
  { id: 'offer', title: 'Offer', color: 'bg-orange-100' },
  { id: 'hired', title: 'Hired', color: 'bg-green-100' },
  { id: 'rejected', title: 'Rejected', color: 'bg-red-100' }, // Added rejected stage
] as const;


const HRJobOffers: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [dateRange, setDateRange] = useState('year');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedOffer, setExpandedOffer] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Updated mock job offers data
  const jobOffers: JobOffer[] = [
    {
      id: 'SHS25001',
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
      positions: 1, // New field
      candidates: [
        { id: 'CAND-1', name: 'Alice Smith', jobTitle: 'Senior Software Engineer', stage: 'interview', stageDate: '2024-01-15' },
        { id: 'CAND-2', name: 'Bob Johnson', jobTitle: 'Senior Software Engineer', stage: 'offer', stageDate: '2024-01-16' },
        { id: 'CAND-3', name: 'Clara Brown', jobTitle: 'Senior Software Engineer', stage: 'hired', stageDate: '2024-01-17' },
        { id: 'CAND-6', name: 'Frank White', jobTitle: 'Senior Software Engineer', stage: 'rejected', stageDate: '2024-01-18' },
      ]
    },
    {
      id: 'SHS25002',
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
      positions: 1, // New field
      candidates: [
        { id: 'CAND-4', name: 'David Lee', jobTitle: 'Marketing Manager', stage: 'under_review', stageDate: '2024-01-12' },
        { id: 'CAND-5', name: 'Emma Wilson', jobTitle: 'Marketing Manager', stage: 'interview', stageDate: '2024-01-14' },
        { id: 'CAND-7', name: 'Grace Hall', jobTitle: 'Marketing Manager', stage: 'rejected', stageDate: '2024-01-15' },
      ]
    },
    {
      id: 'SHS25003',
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
      positions: 2, // New field
      candidates: []
    }
  ];

  const filterDataByDate = (data: JobOffer[]) => {
    if (selectedYear === 'all') return data;
    return data.filter(item => item.year === parseInt(selectedYear));
  };

  const filteredJobOffers = filterDataByDate(jobOffers).filter(offer =>
    offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    offer.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    offer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalOffers = filteredJobOffers.length;
  const activeOffers = filteredJobOffers.filter(o => o.status === 'active').length;
  const applicationsReceived = filteredJobOffers.reduce((sum, offer) => sum + offer.applications, 0);
  const positionsFilled = filteredJobOffers.reduce((sum, offer) => 
    sum + offer.candidates.filter(c => c.stage === 'hired').length, 0
  );

  const kpiCards = [
    { title: 'Total Offers', value: totalOffers, icon: FileText, description: 'All job postings' },
    { title: 'Active Offers', value: activeOffers, icon: Briefcase, description: 'Currently open positions' },
    { title: 'Applications Received', value: applicationsReceived, icon: Users, description: 'Total applications' },
    { title: 'Positions Filled', value: positionsFilled, icon: CheckCircle, description: 'Successfully hired' }
  ];

  const handleStatusChange = (offerId: string, newStatus: JobOffer['status']) => {
    console.log(`Updating offer ${offerId} to status ${newStatus}`);
  };

  const toggleExpanded = (offerId: string) => {
    setExpandedOffer(expandedOffer === offerId ? null : offerId);
  };

  const handleCreateJobOffer = () => setShowCreateForm(true);
  const handleCloseCreateForm = () => setShowCreateForm(false);

  // New calculation functions for table cells
  const getShortlistedCount = (candidates: Candidate[]) => 
    candidates.filter(c => ['interview', 'offer', 'hired'].includes(c.stage)).length;

  const getHiredCount = (candidates: Candidate[]) => 
    candidates.filter(c => c.stage === 'hired').length;
  
  const getRejectedCount = (candidates: Candidate[]) => 
    candidates.filter(c => c.stage === 'rejected').length;


  // The number of columns in the table, used for colSpan
  const TABLE_COL_COUNT = 14;

  return (
    <div className="space-y-8">
      {/* Create Job Offer Form Overlay */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg shadow-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-background border-b p-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Create New Job Offer</h2>
              <Button variant="ghost" size="icon" onClick={handleCloseCreateForm} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-4">
              <CreateJobOfferForm onClose={handleCloseCreateForm} />
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <DashboardHeader
        title="Job Offers"
        description="Create and manage job postings across all organizational units"
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        dateRange={dateRange}
        setDateRange={setDateRange}
      >
        <Button onClick={handleCreateJobOffer}>
          <Plus className="h-4 w-4 mr-2" />
          Create Job Offer
        </Button>
      </DashboardHeader>

      {/* KPI Cards */}
      {/* <DashboardSection
        title="Job Offers Overview"
        description="Key metrics for job offer management and recruitment pipeline"
        icon={FileText}
      >
        <KPICards cards={kpiCards} />
      </DashboardSection> */}

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
              placeholder="Search job offers by title, unit, or location..."
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

        {/* --- MODIFIED JOB OFFERS TABLE --- */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Business Unit</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>N° Positions</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>N° Applied</TableHead>
                  <TableHead>N° Shortlisted</TableHead>
                  <TableHead>N° Hired</TableHead>
                  <TableHead>N° Rejected</TableHead>
                  <TableHead>Published Date</TableHead>
                  <TableHead>Closing Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobOffers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={TABLE_COL_COUNT} className="text-center text-muted-foreground h-24">
                      No job offers found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredJobOffers.map((offer) => (
                    <React.Fragment key={offer.id}>
                      <TableRow>
                        <TableCell>
                          <Button variant="ghost" size="sm" onClick={() => toggleExpanded(offer.id)}>
                            {expandedOffer === offer.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          </Button>
                        </TableCell>
                        <TableCell className="font-mono text-xs">{offer.id}</TableCell>
                        <TableCell className="font-medium">{offer.title}</TableCell>
                        <TableCell>{offer.department}</TableCell>
                        <TableCell>{offer.location}</TableCell>
                        <TableCell className="text-center">{offer.positions}</TableCell>
                        <TableCell>
                          <Select value={offer.status} onValueChange={(value) => handleStatusChange(offer.id, value as JobOffer['status'])}>
                            <SelectTrigger className="w-28 text-xs">
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
                          <div className="flex items-center space-x-2 justify-center">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{offer.applications}</span>
                          </div>
                        </TableCell>
                         <TableCell>
                          <div className="flex items-center space-x-2 justify-center">
                            <ListChecks className="h-4 w-4 text-muted-foreground" />
                            <span>{getShortlistedCount(offer.candidates)}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2 justify-center">
                            <UserCheck className="h-4 w-4 text-muted-foreground" />
                            <span>{getHiredCount(offer.candidates)}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2 justify-center">
                            <UserX className="h-4 w-4 text-muted-foreground" />
                            <span>{getRejectedCount(offer.candidates)}</span>
                          </div>
                        </TableCell>
                        <TableCell>{offer.publishedDate ? format(new Date(offer.publishedDate), 'MMM d, yyyy') : 'N/A'}</TableCell>
                        <TableCell>{offer.closingDate ? format(new Date(offer.closingDate), 'MMM d, yyyy') : 'N/A'}</TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8"><Trash2 className="h-4 w-4" /></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      {expandedOffer === offer.id && (
                        <TableRow>
                          <TableCell colSpan={TABLE_COL_COUNT} className="p-0">
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
                                        <Badge key={index} variant="secondary" className="text-xs">{req}</Badge>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-3">Candidate Pipeline</h4>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                                    {stages.map((stage) => (
                                      <div key={stage.id} className="flex flex-col">
                                        <div className={`p-2 rounded-t-md text-xs font-semibold ${stage.color}`}>
                                          {stage.title} ({offer.candidates.filter(c => c.stage === stage.id).length})
                                        </div>
                                        <div className="space-y-1 p-2 bg-slate-50 border rounded-b-md min-h-[50px]">
                                          {offer.candidates
                                            .filter((candidate) => candidate.stage === stage.id)
                                            .map((candidate) => (
                                              <div key={candidate.id} className="text-xs p-1.5 bg-white rounded border shadow-sm">
                                                {candidate.name}
                                              </div>
                                            ))}
                                          {offer.candidates.filter((candidate) => candidate.stage === stage.id).length === 0 && (
                                            <div className="text-xs text-muted-foreground text-center pt-2">
                                              Empty
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