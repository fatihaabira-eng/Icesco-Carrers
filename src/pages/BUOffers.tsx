import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button'; // Added Button import
import { 
  FileText, 
  Search, 
  Filter,
  Edit,
  Trash2,
  Users,
  CheckCircle,
  Briefcase,
  ChevronDown,
  ChevronUp,
  UserX,
  ListChecks
} from 'lucide-react';
import { format } from 'date-fns';
import DashboardHeader from '@/components/DashboardHeader';
import KPICards from '@/components/KPICards';
import DashboardSection from '@/components/DashboardSection';

// Updated Interfaces
interface JobOffer {
  id: string;
  title: string;
  department: string;
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
  positions: number;
  candidates: Candidate[];
}

interface Candidate {
  id: string;
  name: string;
  jobTitle: string;
  stage: 'new' | 'under_review' | 'interview' | 'offer' | 'hired' | 'rejected';
  stageDate: string;
}

const stages = [
  { id: 'new', title: 'New Applications', color: 'bg-blue-50 text-blue-700' },
  { id: 'under_review', title: 'Under Review', color: 'bg-yellow-50 text-yellow-700' },
  { id: 'interview', title: 'Interview', color: 'bg-purple-50 text-purple-700' },
  { id: 'offer', title: 'Offer', color: 'bg-orange-50 text-orange-700' },
  { id: 'hired', title: 'Hired', color: 'bg-green-50 text-green-700' },
  { id: 'rejected', title: 'Rejected', color: 'bg-red-50 text-red-700' },
] as const;

const BUOffers: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2025');
  const [dateRange, setDateRange] = useState('year');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedOffer, setExpandedOffer] = useState<string | null>(null);

  const jobOffers: JobOffer[] = [
    {
      id: 'SHS25001',
      title: 'Senior Software Engineer',
      department: 'DT',
      type: 'Full-time',
      status: 'active',
      applications: 45,
      publishedDate: '2024-01-10',
      closingDate: '2024-02-10',
      description: 'Lead development of educational technology platforms',
      requirements: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS'],
      salary: 'Competitive',
      experience: '5+ years',
      year: 2025,
      positions: 1,
      candidates: [
        { id: 'CAND-1', name: 'Alice Smith', jobTitle: 'Senior Software Engineer', stage: 'interview', stageDate: '2025-01-15' },
        { id: 'CAND-2', name: 'Bob Johnson', jobTitle: 'Senior Software Engineer', stage: 'offer', stageDate: '2025-01-16' },
        { id: 'CAND-3', name: 'Clara Brown', jobTitle: 'Senior Software Engineer', stage: 'hired', stageDate: '2025-01-17' },
        { id: 'CAND-6', name: 'Frank White', jobTitle: 'Senior Software Engineer', stage: 'rejected', stageDate: '2024-01-18' },
      ]
    },
    {
      id: 'SHS25002',
      title: 'Marketing Manager',
      department: 'CCS',
      type: 'Full-time',
      status: 'active',
      applications: 32,
      publishedDate: '2024-01-08',
      closingDate: '2024-02-08',
      description: 'Design and implement innovative marketing strategies',
      requirements: ['Digital Marketing', 'Strategy', 'Analytics', 'Arabic', 'French'],
      salary: 'Competitive',
      experience: '3-5 years',
      year: 2025,
      positions: 1,
      candidates: [
        { id: 'CAND-4', name: 'David Lee', jobTitle: 'Marketing Manager', stage: 'under_review', stageDate: '2024-01-12' },
        { id: 'CAND-5', name: 'Emma Wilson', jobTitle: 'Marketing Manager', stage: 'interview', stageDate: '2024-01-14' },
        { id: 'CAND-7', name: 'Grace Hall', jobTitle: 'Marketing Manager', stage: 'rejected', stageDate: '2024-01-15' },
      ]
    },
    {
      id: 'SHS25003',
      title: 'Education Program Manager',
      department: 'ED',
      type: 'Contract',
      status: 'draft',
      applications: 0,
      publishedDate: null,
      closingDate: null,
      description: 'Design and implement innovative educational programs',
      requirements: ['Program Management', 'Educational Design', 'Stakeholder Management'],
      salary: 'Competitive',
      experience: '3-5 years',
      year: 2025,
      positions: 2,
      candidates: []
    }
  ];

  const abbreviateDepartment = (department: string) => {
    return department
      .split(' ')
      .map(word => word.substring(0, 4) + (word.length > 4 ? '.' : ''))
      .join(' ');
  };

  const filterDataByDate = (data: JobOffer[]) => {
    if (selectedYear === 'all') return data;
    return data.filter(item => item.year === parseInt(selectedYear));
  };

  const filteredJobOffers = filterDataByDate(jobOffers).filter(offer =>
    offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    offer.department.toLowerCase().includes(searchTerm.toLowerCase())
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

  const getShortlistedCount = (candidates: Candidate[]) => 
    candidates.filter(c => ['interview', 'offer', 'hired'].includes(c.stage)).length;

  const getRejectedCount = (candidates: Candidate[]) => 
    candidates.filter(c => c.stage === 'rejected').length;

  const TABLE_COL_COUNT = 10;

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      <DashboardHeader
        title="Job Offers"
        description="Create and manage job postings across all organizational units"
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        dateRange={dateRange}
        setDateRange={setDateRange}
      >
      </DashboardHeader>

      <DashboardSection
        title="Job Offers Management"
        description="Track and manage job postings with candidate pipeline"
        icon={FileText}
      >
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search job offers by title or unit..."
              className="w-full pl-10 rounded-lg border-gray-200 focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="border-gray-200 hover:bg-gray-50">
            <Filter className="h-4 w-4 mr-2 text-gray-600" />
            Filters
          </Button>
        </div>

        <Card className="border-none shadow-lg rounded-xl overflow-hidden">
          <CardContent className="p-0">
            <div className="w-full overflow-x-auto">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="bg-gray-100 border-none">
                    <TableHead className="w-[50px] font-semibold text-xs uppercase tracking-wider py-4"></TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wider py-4">Reference</TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wider py-4">Job Offer</TableHead>
                    <TableHead className="font-semibold text-xs  tracking-wider py-4 text-center">N° Applied</TableHead>
                    <TableHead className="font-semibold text-xs  tracking-wider py-4 text-center">N° Shortlisted</TableHead>
                    <TableHead className="font-semibold text-xs  tracking-wider py-4 text-center">N° Rejected</TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wider py-4">Published Date</TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wider py-4">Closing Date</TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wider py-4">Status</TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wider py-4">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredJobOffers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={TABLE_COL_COUNT} className="text-center text-gray-500 h-24 py-6">
                        No job offers found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredJobOffers.map((offer) => (
                      <React.Fragment key={offer.id}>
                        <TableRow className="hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100">
                          <TableCell className="py-3 sm:py-4">
                            <Button variant="ghost" size="sm" onClick={() => toggleExpanded(offer.id)} className="hover:bg-gray-100">
                              {expandedOffer === offer.id ? <ChevronUp className="h-5 w-5 text-gray-600" /> : <ChevronDown className="h-5 w-5 text-gray-600" />}
                            </Button>
                          </TableCell>
                          <TableCell className="font-mono text-xs text-gray-700 py-3 sm:py-4">{offer.id}</TableCell>
                          <TableCell className="text-gray-800 text-sm font-medium py-3 sm:py-4">{offer.title}</TableCell>
                          <TableCell className="text-gray-700 text-sm py-3 sm:py-4 text-center">
                            <div className="flex items-center justify-center space-x-2">
                              <Users className="h-4 w-4 text-blue-500" />
                              <span>{offer.applications}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-700 text-sm py-3 sm:py-4 text-center">
                            <div className="flex items-center justify-center space-x-2">
                              <ListChecks className="h-4 w-4 text-green-500" />
                              <span>{getShortlistedCount(offer.candidates)}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-700 text-sm py-3 sm:py-4 text-center">
                            <div className="flex items-center justify-center space-x-2">
                              <UserX className="h-4 w-4 text-red-500" />
                              <span>{getRejectedCount(offer.candidates)}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-700 text-sm py-3 sm:py-4">
                            {offer.publishedDate ? format(new Date(offer.publishedDate), 'MMM d, yyyy') : 'N/A'}
                          </TableCell>
                          <TableCell className="text-gray-700 text-sm py-3 sm:py-4">
                            {offer.closingDate ? format(new Date(offer.closingDate), 'MMM d, yyyy') : 'N/A'}
                          </TableCell>
                          <TableCell className="text-gray-700 text-sm py-3 sm:py-4">
                            <Select value={offer.status} onValueChange={(value) => handleStatusChange(offer.id, value as JobOffer['status'])}>
                              <SelectTrigger className="w-28 text-xs rounded-md border-gray-200 focus:ring-2 focus:ring-blue-500">
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
                          <TableCell className="text-gray-700 py-3 sm:py-4">
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-gray-100">
                                <Edit className="h-4 w-4 text-orange-500" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-gray-100">
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        {expandedOffer === offer.id && (
                          <TableRow>
                            <TableCell colSpan={TABLE_COL_COUNT} className="p-0">
                              <div className="p-4 sm:p-6 bg-gray-50">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                  <div>
                                    <h4 className="font-semibold text-lg text-gray-900 mb-4">Job Details</h4>
                                    <div className="space-y-3 text-sm text-gray-600">
                                      <div><strong>Description:</strong> {offer.description}</div>
                                      <div><strong>Salary:</strong> {offer.salary}</div>
                                      <div><strong>Experience:</strong> {offer.experience}</div>
                                      <div><strong>Requirements:</strong></div>
                                      <div className="flex flex-wrap gap-2 mt-2">
                                        {offer.requirements.map((req, index) => (
                                          <Badge key={index} variant="secondary" className="text-xs bg-gray-100 text-gray-700 border border-gray-200">
                                            {req}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-lg text-gray-900 mb-4">Candidate Pipeline</h4>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                                      {stages.map((stage) => (
                                        <div key={stage.id} className="flex flex-col">
                                          <div className={`p-2 rounded-t-lg text-xs font-semibold ${stage.color}`}>
                                            {stage.title} ({offer.candidates.filter(c => c.stage === stage.id).length})
                                          </div>
                                          <div className="space-y-2 p-3 bg-white border border-gray-100 rounded-b-lg min-h-[80px] shadow-sm">
                                            {offer.candidates
                                              .filter((candidate) => candidate.stage === stage.id)
                                              .map((candidate) => (
                                                <div key={candidate.id} className="text-xs p-2 bg-gray-50 rounded-md border border-gray-200 hover:bg-gray-100 transition-colors">
                                                  {candidate.name}
                                                </div>
                                              ))}
                                            {offer.candidates.filter((candidate) => candidate.stage === stage.id).length === 0 && (
                                              <div className="text-xs text-gray-400 text-center pt-3">
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
            </div>
          </CardContent>
        </Card>
      </DashboardSection>
    </div>
  );
};

export default BUOffers;