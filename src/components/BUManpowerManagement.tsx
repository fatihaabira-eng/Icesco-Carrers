import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Search, 
  Filter,
  Users,
  UserCheck,
  UserX,
  Briefcase,
  CheckCircle,
  FileText,
  Award,
  Building,
  Target,
  Settings
} from 'lucide-react';
import { format } from 'date-fns';
import DashboardHeader from '@/components/DashboardHeader';
import KPICards from '@/components/KPICards';
import DashboardSection from '@/components/DashboardSection';

interface Position {
  id: string;
  title: string;
  businessUnit: string;
  unitType: 'sector' | 'center' | 'support';
  status: 'requested' | 'approved' | 'published' | 'closed';
  requestedDate: string;
  approvedDate?: string;
  publishedDate?: string;
  closingDate?: string;
  positions: number;
  appliedCandidates: number;
  shortlistedCandidates: number;
  interviewedCandidates: number;
  selectedCandidates: number;
  offersSent: number;
  approvedOffers: number;
  declinedOffers: number;
  hiredCandidates: number;
}

interface Candidate {
  id: string;
  name: string;
  position: string;
  businessUnit: string;
  unitType: 'sector' | 'center' | 'support';
  stage: 'applied' | 'shortlisted' | 'interviewed' | 'selected' | 'offer_sent' | 'offer_approved' | 'offer_declined' | 'hired';
  stageDate: string;
  email: string;
  phone: string;
  experience: string;
  education: string;
}

const BUManpowerManagement: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [dateRange, setDateRange] = useState('year');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'sectors' | 'centers' | 'support'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Mock data for positions
  const positions: Position[] = [
    {
      id: 'POS-001',
      title: 'Senior Software Engineer',
      businessUnit: 'Digital Transformation',
      unitType: 'sector',
      status: 'published',
      requestedDate: '2024-01-10',
      approvedDate: '2024-01-15',
      publishedDate: '2024-01-20',
      closingDate: '2024-02-20',
      positions: 2,
      appliedCandidates: 45,
      shortlistedCandidates: 12,
      interviewedCandidates: 8,
      selectedCandidates: 3,
      offersSent: 3,
      approvedOffers: 2,
      declinedOffers: 1,
      hiredCandidates: 2
    },
    {
      id: 'POS-002',
      title: 'Marketing Manager',
      businessUnit: 'Communications',
      unitType: 'sector',
      status: 'published',
      requestedDate: '2024-01-08',
      approvedDate: '2024-01-12',
      publishedDate: '2024-01-18',
      closingDate: '2024-02-18',
      positions: 1,
      appliedCandidates: 32,
      shortlistedCandidates: 8,
      interviewedCandidates: 5,
      selectedCandidates: 2,
      offersSent: 2,
      approvedOffers: 1,
      declinedOffers: 1,
      hiredCandidates: 1
    },
    {
      id: 'POS-003',
      title: 'Research Analyst',
      businessUnit: 'Research Center',
      unitType: 'center',
      status: 'approved',
      requestedDate: '2024-01-05',
      approvedDate: '2024-01-10',
      positions: 1,
      appliedCandidates: 0,
      shortlistedCandidates: 0,
      interviewedCandidates: 0,
      selectedCandidates: 0,
      offersSent: 0,
      approvedOffers: 0,
      declinedOffers: 0,
      hiredCandidates: 0
    },
    {
      id: 'POS-004',
      title: 'IT Support Specialist',
      businessUnit: 'IT Department',
      unitType: 'support',
      status: 'requested',
      requestedDate: '2024-01-15',
      positions: 1,
      appliedCandidates: 0,
      shortlistedCandidates: 0,
      interviewedCandidates: 0,
      selectedCandidates: 0,
      offersSent: 0,
      approvedOffers: 0,
      declinedOffers: 0,
      hiredCandidates: 0
    }
  ];

  // Mock data for candidates
  const candidates: Candidate[] = [
    {
      id: 'CAND-001',
      name: 'Alice Smith',
      position: 'Senior Software Engineer',
      businessUnit: 'Digital Transformation',
      unitType: 'sector',
      stage: 'hired',
      stageDate: '2024-01-25',
      email: 'alice.smith@example.com',
      phone: '+1-555-0123',
      experience: '5 years',
      education: 'Master in Computer Science'
    },
    {
      id: 'CAND-002',
      name: 'Bob Johnson',
      position: 'Senior Software Engineer',
      businessUnit: 'Digital Transformation',
      unitType: 'sector',
      stage: 'offer_approved',
      stageDate: '2024-01-24',
      email: 'bob.johnson@example.com',
      phone: '+1-555-0124',
      experience: '4 years',
      education: 'Bachelor in Software Engineering'
    },
    {
      id: 'CAND-003',
      name: 'Clara Brown',
      position: 'Marketing Manager',
      businessUnit: 'Communications',
      unitType: 'sector',
      stage: 'hired',
      stageDate: '2024-01-23',
      email: 'clara.brown@example.com',
      phone: '+1-555-0125',
      experience: '6 years',
      education: 'MBA in Marketing'
    },
    {
      id: 'CAND-004',
      name: 'David Lee',
      position: 'Marketing Manager',
      businessUnit: 'Communications',
      unitType: 'sector',
      stage: 'offer_declined',
      stageDate: '2024-01-22',
      email: 'david.lee@example.com',
      phone: '+1-555-0126',
      experience: '3 years',
      education: 'Bachelor in Business Administration'
    },
    {
      id: 'CAND-005',
      name: 'Emma Wilson',
      position: 'Research Analyst',
      businessUnit: 'Research Center',
      unitType: 'center',
      stage: 'interviewed',
      stageDate: '2024-01-20',
      email: 'emma.wilson@example.com',
      phone: '+1-555-0127',
      experience: '2 years',
      education: 'Master in Research Methods'
    }
  ];

  const filterDataByDate = (data: any[]) => {
    if (selectedYear === 'all') return data;
    return data.filter(item => new Date(item.requestedDate || item.stageDate).getFullYear() === parseInt(selectedYear));
  };

  const filterDataByUnitType = (data: any[]) => {
    if (selectedFilter === 'all') return data;
    const unitTypeMap = {
      'sectors': 'sector',
      'centers': 'center',
      'support': 'support'
    };
    return data.filter(item => item.unitType === unitTypeMap[selectedFilter]);
  };

  const filteredPositions = filterDataByDate(filterDataByUnitType(positions));
  const filteredCandidates = filterDataByDate(filterDataByUnitType(candidates));

  // Calculate KPIs based on selected filter
  const calculateKPIs = () => {
    if (selectedFilter === 'all') {
      // All units KPIs
      const totalRequested = filteredPositions.length;
      const totalApproved = filteredPositions.filter(p => p.status === 'approved' || p.status === 'published').length;
      const totalPublished = filteredPositions.filter(p => p.status === 'published').length;
      const totalApplied = filteredCandidates.length;
      const totalShortlisted = filteredCandidates.filter(c => ['shortlisted', 'interviewed', 'selected', 'offer_sent', 'offer_approved', 'offer_declined', 'hired'].includes(c.stage)).length;
      const totalInterviewed = filteredCandidates.filter(c => ['interviewed', 'selected', 'offer_sent', 'offer_approved', 'offer_declined', 'hired'].includes(c.stage)).length;
      const totalSelected = filteredCandidates.filter(c => ['selected', 'offer_sent', 'offer_approved', 'offer_declined', 'hired'].includes(c.stage)).length;
      const totalOffersSent = filteredCandidates.filter(c => ['offer_sent', 'offer_approved', 'offer_declined', 'hired'].includes(c.stage)).length;
      const totalApprovedOffers = filteredCandidates.filter(c => ['offer_approved', 'hired'].includes(c.stage)).length;
      const totalDeclinedOffers = filteredCandidates.filter(c => c.stage === 'offer_declined').length;
      const totalHired = filteredCandidates.filter(c => c.stage === 'hired').length;

      return [
        { title: 'Requested Positions', value: totalRequested, icon: FileText, description: 'Total positions requested' },
        { title: 'Approved Positions', value: totalApproved, icon: CheckCircle, description: 'Positions approved for hiring' },
        { title: 'Published Positions', value: totalPublished, icon: Briefcase, description: 'Positions published publicly' },
        { title: 'Applied Candidates', value: totalApplied, icon: Users, description: 'Total applications received' },
        { title: 'Shortlisted Candidates', value: totalShortlisted, icon: UserCheck, description: 'Candidates shortlisted' },
        { title: 'Interviewed Candidates', value: totalInterviewed, icon: Award, description: 'Candidates interviewed' },
        { title: 'Selected Candidates', value: totalSelected, icon: CheckCircle, description: 'Candidates selected' },
        { title: 'Offers Sent', value: totalOffersSent, icon: FileText, description: 'Job offers sent' },
        { title: 'Approved Offers', value: totalApprovedOffers, icon: UserCheck, description: 'Offers accepted' },
        { title: 'Declined Offers', value: totalDeclinedOffers, icon: UserX, description: 'Offers declined' },
        { title: 'Hired Candidates', value: totalHired, icon: Award, description: 'Successfully hired' }
      ];
    } else {
      // Sector/Center/Support unit KPIs
      const totalApplied = filteredCandidates.length;
      const totalShortlisted = filteredCandidates.filter(c => ['shortlisted', 'interviewed', 'selected', 'offer_sent', 'offer_approved', 'offer_declined', 'hired'].includes(c.stage)).length;
      const totalInterviewed = filteredCandidates.filter(c => ['interviewed', 'selected', 'offer_sent', 'offer_approved', 'offer_declined', 'hired'].includes(c.stage)).length;
      const totalSelected = filteredCandidates.filter(c => ['selected', 'offer_sent', 'offer_approved', 'offer_declined', 'hired'].includes(c.stage)).length;
      const totalOffersSent = filteredCandidates.filter(c => ['offer_sent', 'offer_approved', 'offer_declined', 'hired'].includes(c.stage)).length;
      const totalApprovedOffers = filteredCandidates.filter(c => ['offer_approved', 'hired'].includes(c.stage)).length;
      const totalDeclinedOffers = filteredCandidates.filter(c => c.stage === 'offer_declined').length;
      const totalHired = filteredCandidates.filter(c => c.stage === 'hired').length;

      return [
        { title: 'Applied Candidates', value: totalApplied, icon: Users, description: 'Total applications received' },
        { title: 'Shortlisted Candidates', value: totalShortlisted, icon: UserCheck, description: 'Candidates shortlisted' },
        { title: 'Interviewed Candidates', value: totalInterviewed, icon: Award, description: 'Candidates interviewed' },
        { title: 'Selected Candidates', value: totalSelected, icon: CheckCircle, description: 'Candidates selected' },
        { title: 'Offers Sent', value: totalOffersSent, icon: FileText, description: 'Job offers sent' },
        { title: 'Approved Offers', value: totalApprovedOffers, icon: UserCheck, description: 'Offers accepted' },
        { title: 'Declined Offers', value: totalDeclinedOffers, icon: UserX, description: 'Offers declined' },
        { title: 'Hired Candidates', value: totalHired, icon: Award, description: 'Successfully hired' }
      ];
    }
  };

  const kpiCards = calculateKPIs();

  // Pagination logic
  const filteredCandidatesForTable = filteredCandidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.businessUnit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCandidatesForTable.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCandidates = filteredCandidatesForTable.slice(startIndex, endIndex);

  const getStageColor = (stage: string) => {
    const colorMap: { [key: string]: string } = {
      'applied': 'bg-blue-100 text-blue-800',
      'shortlisted': 'bg-yellow-100 text-yellow-800',
      'interviewed': 'bg-purple-100 text-purple-800',
      'selected': 'bg-orange-100 text-orange-800',
      'offer_sent': 'bg-indigo-100 text-indigo-800',
      'offer_approved': 'bg-green-100 text-green-800',
      'offer_declined': 'bg-red-100 text-red-800',
      'hired': 'bg-green-100 text-green-800'
    };
    return colorMap[stage] || 'bg-gray-100 text-gray-800';
  };

  const getUnitTypeIcon = (unitType: string) => {
    switch (unitType) {
      case 'sector':
        return <Target className="h-4 w-4" />;
      case 'center':
        return <Building className="h-4 w-4" />;
      case 'support':
        return <Settings className="h-4 w-4" />;
      default:
        return <Building className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <DashboardHeader
        title="BU Manpower Management"
        description="Manage recruitment across all business units, sectors, centers, and support units"
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />

      {/* Filter Buttons */}
      <div className="flex gap-2">
        <Button
          variant={selectedFilter === 'all' ? 'default' : 'outline'}
          onClick={() => setSelectedFilter('all')}
          className="flex items-center gap-2"
        >
          <Building className="h-4 w-4" />
          All Units
        </Button>
        <Button
          variant={selectedFilter === 'sectors' ? 'default' : 'outline'}
          onClick={() => setSelectedFilter('sectors')}
          className="flex items-center gap-2"
        >
          <Target className="h-4 w-4" />
          Sectors
        </Button>
        <Button
          variant={selectedFilter === 'centers' ? 'default' : 'outline'}
          onClick={() => setSelectedFilter('centers')}
          className="flex items-center gap-2"
        >
          <Building className="h-4 w-4" />
          Centers
        </Button>
        <Button
          variant={selectedFilter === 'support' ? 'default' : 'outline'}
          onClick={() => setSelectedFilter('support')}
          className="flex items-center gap-2"
        >
          <Settings className="h-4 w-4" />
          Support Units
        </Button>
      </div>

      {/* KPI Cards */}
      <DashboardSection
        title={`${selectedFilter === 'all' ? 'All Units' : selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)} Overview`}
        description={`Key metrics for ${selectedFilter === 'all' ? 'all business units' : selectedFilter}`}
        icon={selectedFilter === 'all' ? Building : selectedFilter === 'sectors' ? Target : selectedFilter === 'centers' ? Building : Settings}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {kpiCards.map((card, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <card.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
                  <p className="text-2xl font-bold">{card.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </DashboardSection>

      {/* Candidates Data Table */}
      <DashboardSection
        title="Candidates Data"
        description="Detailed view of all candidates across selected units"
        icon={Users}
      >
        {/* Search and Filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search candidates by name, position, or business unit..."
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

        {/* Candidates Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Business Unit</TableHead>
                  <TableHead>Unit Type</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Stage Date</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>University</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentCandidates.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center text-muted-foreground h-24">
                      No candidates found.
                    </TableCell>
                  </TableRow>
                ) : (
                  currentCandidates.map((candidate) => (
                    <TableRow key={candidate.id}>
                      <TableCell className="font-medium">{candidate.name}</TableCell>
                      <TableCell>{candidate.position}</TableCell>
                      <TableCell>{candidate.businessUnit}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getUnitTypeIcon(candidate.unitType)}
                          <span className="capitalize">{candidate.unitType}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStageColor(candidate.stage)}>
                          {candidate.stage.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Badge>
                      </TableCell>
                      <TableCell>{format(new Date(candidate.stageDate), 'MMM d, yyyy')}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{candidate.email}</div>
                          <div className="text-muted-foreground">{candidate.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>{candidate.experience}</TableCell>
                      <TableCell>{candidate.education}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredCandidatesForTable.length)} of {filteredCandidatesForTable.length} candidates
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-8 h-8"
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </DashboardSection>
    </div>
  );
};

export default BUManpowerManagement; 