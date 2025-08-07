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
  Settings,
  Flag
} from 'lucide-react';
import { format } from 'date-fns';

// Mock Components for demonstration purposes
const DashboardHeader = ({ title, description, selectedYear, setSelectedYear }) => (
    <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
        <div className="mt-4">
            <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="border rounded px-3 py-2">
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="all">All Years</option>
            </select>
        </div>
    </div>
);

const DashboardSection = ({ title, description, icon: Icon, children }) => (
    <Card>
        <CardHeader>
            <div className="flex items-center gap-4">
                <Icon className="h-6 w-6 text-primary" />
                <div>
                    <CardTitle>{title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
            </div>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
    </Card>
);


// Interfaces
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
  phase: 'applied' | 'shortlisted' | 'interviewed' | 'selected' | 'offer_sent' | 'offer_approved' | 'offer_declined' | 'hired';
  phaseDate: string;
  email: string;
  phone: string;
  nationality: string;
  degree: string;
  university: string;
}

// Data
const allUnits = [
  { name: "Education Sector", type: "sector" },
  { name: "Sector of Strategy and Institutional Excellence", type: "sector" },
  { name: "Culture and Communication Sector", type: "sector" },
  { name: "Center of Foresight and Artificial Intelligence", type: "center" },
  { name: "Civilizational Dialogue Center", type: "center" },
  { name: "Islamic World Heritage Center", type: "center" },
  { name: "Department of Digital Transformation", type: "support" },
  { name: "Department of Human Capital Management", type: "support" },
  { name: "Department of Financial Operations", type: "support" },
];

const BUManpowerManagement: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2025');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'sectors' | 'centers' | 'support'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);

  // Mock data for candidates with new fields
  const candidates: Candidate[] = [
    {
      id: 'CAND-001',
      name: 'Amara Khan',
      position: 'AI Specialist',
      businessUnit: 'Center of Foresight and Artificial Intelligence',
      unitType: 'center',
      phase: 'hired',
      phaseDate: '2025-02-15',
      email: 'amara.khan@example.com',
      phone: '+92-300-1234567',
      nationality: 'Pakistani',
      degree: 'PhD in Artificial Intelligence',
      university: 'NUST'
    },
    {
      id: 'CAND-002',
      name: 'Fatima Al-Fassi',
      position: 'Cultural Program Coordinator',
      businessUnit: 'Culture and Communication Sector',
      unitType: 'sector',
      phase: 'offer_approved',
      phaseDate: '2025-03-10',
      email: 'fatima.alfassi@example.com',
      phone: '+212-661-123456',
      nationality: 'Moroccan',
      degree: 'MA in Cultural Studies',
      university: 'Al Akhawayn University'
    },
    {
        id: 'CAND-003',
        name: 'Youssef El-Masry',
        position: 'Financial Analyst',
        businessUnit: 'Department of Financial Operations',
        unitType: 'support',
        phase: 'interviewed',
        phaseDate: '2025-03-05',
        email: 'youssef.elmasry@example.com',
        phone: '+20-100-9876543',
        nationality: 'Egyptian',
        degree: 'BSc in Finance',
        university: 'Cairo University'
    },
    {
        id: 'CAND-004',
        name: 'Aisha bint Ahmed',
        position: 'Heritage Specialist',
        businessUnit: 'Islamic World Heritage Center',
        unitType: 'center',
        phase: 'shortlisted',
        phaseDate: '2025-02-28',
        email: 'aisha.ahmed@example.com',
        phone: '+966-50-5551234',
        nationality: 'Saudi Arabian',
        degree: 'MA in Islamic Archaeology',
        university: 'King Saud University'
    },
    {
        id: 'CAND-005',
        name: 'Mehmet Ozdemir',
        position: 'Digital Transformation Consultant',
        businessUnit: 'Department of Digital Transformation',
        unitType: 'support',
        phase: 'hired',
        phaseDate: '2025-01-20',
        email: 'mehmet.ozdemir@example.com',
        phone: '+90-532-1112233',
        nationality: 'Turkish',
        degree: 'MBA',
        university: 'Boğaziçi University'
    },
    {
        id: 'CAND-006',
        name: 'Layla Haddad',
        position: 'Education Policy Analyst',
        businessUnit: 'Education Sector',
        unitType: 'sector',
        phase: 'selected',
        phaseDate: '2025-03-12',
        email: 'layla.haddad@example.com',
        phone: '+961-3-456789',
        nationality: 'Lebanese',
        degree: 'PhD in Education Policy',
        university: 'American University of Beirut'
    },
    {
        id: 'CAND-007',
        name: 'Tariq Al-Jamil',
        position: 'Interfaith Dialogue Facilitator',
        businessUnit: 'Civilizational Dialogue Center',
        unitType: 'center',
        phase: 'applied',
        phaseDate: '2025-03-18',
        email: 'tariq.aljamil@example.com',
        phone: '+962-79-9876543',
        nationality: 'Jordanian',
        degree: 'BA in Religious Studies',
        university: 'University of Jordan'
    },
     {
      id: 'CAND-008',
      name: 'Zainab Ibrahim',
      position: 'HR Business Partner',
      businessUnit: 'Department of Human Capital Management',
      unitType: 'support',
      phase: 'offer_declined',
      phaseDate: '2025-02-25',
      email: 'zainab.ibrahim@example.com',
      phone: '+234-803-1234567',
      nationality: 'Nigerian',
      degree: 'MSc in Human Resources',
      university: 'University of Lagos'
    }
  ];

  const filterDataByDate = (data: any[]) => {
    if (selectedYear === 'all') return data;
    return data.filter(item => new Date(item.requestedDate || item.phaseDate).getFullYear() === parseInt(selectedYear));
  };

  const unitTypeMap = {
    sectors: "sector",
    centers: "center",
    support: "support"
  };
  const currentUnitType = unitTypeMap[selectedFilter] || null;
  const unitsOfCurrentType = selectedFilter !== 'all' ? allUnits.filter(u => u.type === currentUnitType) : [];

  const filterDataByUnitType = (data: any[]) => {
    let filtered = data;
    if (selectedFilter !== 'all') {
        const unitType = unitTypeMap[selectedFilter];
        filtered = data.filter(item => item.unitType === unitType);
    }
    if (selectedUnit) {
        filtered = filtered.filter(item => item.businessUnit === selectedUnit);
    }
    return filtered;
  };

  const filteredCandidates = filterDataByDate(filterDataByUnitType(candidates));

  // Pagination logic
  const filteredCandidatesForTable = filteredCandidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.businessUnit.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.nationality.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.university.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCandidatesForTable.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCandidates = filteredCandidatesForTable.slice(startIndex, endIndex);

  const getPhaseColor = (phase: string) => {
    const colorMap: { [key: string]: string } = {
      'applied': 'bg-blue-100 text-blue-800',
      'shortlisted': 'bg-yellow-100 text-yellow-800',
      'interviewed': 'bg-purple-100 text-purple-800',
      'selected': 'bg-orange-100 text-orange-800',
      'offer_sent': 'bg-indigo-100 text-indigo-800',
      'offer_approved': 'bg-teal-100 text-teal-800',
      'offer_declined': 'bg-red-100 text-red-800',
      'hired': 'bg-green-100 text-green-800'
    };
    return colorMap[phase] || 'bg-gray-100 text-gray-800';
  };

  const getUnitTypeIcon = (unitType: string) => {
    switch (unitType) {
      case 'sector':
        return <Target className="h-4 w-4 text-muted-foreground" />;
      case 'center':
        return <Building className="h-4 w-4 text-muted-foreground" />;
      case 'support':
        return <Settings className="h-4 w-4 text-muted-foreground" />;
      default:
        return <Building className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-8 bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <DashboardHeader
        title="Candidates Overview"
        description="Manage recruitment across all business units, sectors, centers, and support units"
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedFilter === 'all' ? 'default' : 'outline'}
          onClick={() => { setSelectedFilter('all'); setSelectedUnit(null); setCurrentPage(1); }}
          className="flex items-center gap-2"
        >
          <Building className="h-4 w-4" />
          All Units
        </Button>
        <Button
          variant={selectedFilter === 'sectors' ? 'default' : 'outline'}
          onClick={() => { setSelectedFilter('sectors'); setSelectedUnit(null); setCurrentPage(1); }}
          className="flex items-center gap-2"
        >
          <Target className="h-4 w-4" />
          Sectors
        </Button>
        <Button
          variant={selectedFilter === 'centers' ? 'default' : 'outline'}
          onClick={() => { setSelectedFilter('centers'); setSelectedUnit(null); setCurrentPage(1); }}
          className="flex items-center gap-2"
        >
          <Building className="h-4 w-4" />
          Centers
        </Button>
        <Button
          variant={selectedFilter === 'support' ? 'default' : 'outline'}
          onClick={() => { setSelectedFilter('support'); setSelectedUnit(null); setCurrentPage(1); }}
          className="flex items-center gap-2"
        >
          <Settings className="h-4 w-4" />
          Support Units
        </Button>
      </div>
      {/* Unit Selector */}
      {selectedFilter !== 'all' && (
        <div className="flex items-center gap-4 mt-2">
          <span className="font-medium text-gray-700">Filter by {selectedFilter.slice(0, -1)}:</span>
          <select
            className="border rounded-md px-3 py-2 min-w-[250px] bg-white shadow-sm focus:ring-2 focus:ring-primary"
            value={selectedUnit || ''}
            onChange={e => {setSelectedUnit(e.target.value || null); setCurrentPage(1);}}
          >
            <option value="">All {selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)}</option>
            {unitsOfCurrentType.map(unit => (
              <option key={unit.name} value={unit.name}>{unit.name}</option>
            ))}
          </select>
        </div>
      )}

      {/* Candidates Data Table */}
      <DashboardSection
        title="Candidates Data"
        description="Detailed view of all candidates across selected units"
        icon={Users}
      >
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, position, unit, nationality, degree..."
              className="w-full pl-10"
              value={searchTerm}
              onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
        </div>

        {/* Candidates Table */}
        <Card>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Candidate</TableHead>
                          <TableHead>Job Position</TableHead>
                          <TableHead>Business Unit</TableHead>
                          <TableHead>Unit Type</TableHead>
                          <TableHead>Phase</TableHead>
                          <TableHead>Nationality</TableHead>
                          <TableHead>Degree</TableHead>
                          <TableHead>University</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentCandidates.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center text-muted-foreground h-24">
                              No candidates found for the selected filters.
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
                                <Badge className={`${getPhaseColor(candidate.phase)} font-medium`}>
                                  {candidate.phase.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </Badge>
                              </TableCell>
                              <TableCell>{candidate.nationality}</TableCell>
                              <TableCell>{candidate.degree}</TableCell>
                              <TableCell>{candidate.university}</TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                </div>
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
              <span className="text-sm">Page {currentPage} of {totalPages}</span>
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
