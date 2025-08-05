import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Building, 
  Search, 
  Filter,
  Plus,
  Eye,
  Users,
  Briefcase,
  Target,
  TrendingUp,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import DashboardHeader from '@/components/DashboardHeader';
import KPICards from '@/components/KPICards';
import DashboardSection from '@/components/DashboardSection';

interface Department {
  id: string;
  name: string;
  type: 'sector' | 'center' | 'department' | 'support';
  manager: string;
  totalPositions: number;
  openPositions: number;
  filledPositions: number;
  activeRecruitments: number;
  totalEmployees: number;
  budget: string;
  location: string;
  year: number;
  recruitments: Recruitment[];
}

interface Recruitment {
  id: string;
  position: string;
  status: 'active' | 'closed' | 'draft';
  applications: number;
  hired: number;
  startDate: string;
  endDate: string;
}

const HRDepartments: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [dateRange, setDateRange] = useState('year');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedDepartment, setExpandedDepartment] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  // Mock department data
  const departments: Department[] = [
    {
      id: 'DEPT-001',
      name: 'Digital Transformation Sector',
      type: 'sector',
      manager: 'Dr. Ahmed Al-Masri',
      totalPositions: 25,
      openPositions: 3,
      filledPositions: 22,
      activeRecruitments: 2,
      totalEmployees: 22,
      budget: '$2.5M',
      location: 'Rabat, Morocco',
      year: 2024,
      recruitments: [
        {
          id: 'REC-001',
          position: 'Senior Software Engineer',
          status: 'active',
          applications: 45,
          hired: 1,
          startDate: '2024-01-01',
          endDate: '2024-02-01'
        },
        {
          id: 'REC-002',
          position: 'Data Scientist',
          status: 'active',
          applications: 32,
          hired: 0,
          startDate: '2024-01-15',
          endDate: '2024-02-15'
        }
      ]
    },
    {
      id: 'DEPT-002',
      name: 'Education Center',
      type: 'center',
      manager: 'Ms. Fatima Benali',
      totalPositions: 18,
      openPositions: 1,
      filledPositions: 17,
      activeRecruitments: 1,
      totalEmployees: 17,
      budget: '$1.8M',
      location: 'Rabat, Morocco',
      year: 2024,
      recruitments: [
        {
          id: 'REC-003',
          position: 'Education Program Manager',
          status: 'active',
          applications: 18,
          hired: 0,
          startDate: '2024-01-10',
          endDate: '2024-02-10'
        }
      ]
    },
    {
      id: 'DEPT-003',
      name: 'Communications Department',
      type: 'department',
      manager: 'Mr. Omar Khalil',
      totalPositions: 12,
      openPositions: 2,
      filledPositions: 10,
      activeRecruitments: 2,
      totalEmployees: 10,
      budget: '$1.2M',
      location: 'Rabat, Morocco',
      year: 2024,
      recruitments: [
        {
          id: 'REC-004',
          position: 'Marketing Manager',
          status: 'active',
          applications: 32,
          hired: 0,
          startDate: '2024-01-08',
          endDate: '2024-02-08'
        },
        {
          id: 'REC-005',
          position: 'Communications Specialist',
          status: 'active',
          applications: 28,
          hired: 0,
          startDate: '2024-01-12',
          endDate: '2024-02-12'
        }
      ]
    }
  ];

  // Filter data based on selected year
  const filterDataByDate = (data: Department[]) => {
    if (selectedYear === 'all') return data;
    return data.filter(item => item.year === parseInt(selectedYear));
  };

  const filteredDepartments = filterDataByDate(departments).filter(department =>
    department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    department.manager.toLowerCase().includes(searchTerm.toLowerCase()) ||
    department.location.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(department => {
    if (activeFilter === 'all') return true;
    return department.type === activeFilter;
  });

  // Calculate KPIs
  const totalDepartments = filteredDepartments.length;
  const totalPositions = filteredDepartments.reduce((sum, dept) => sum + dept.totalPositions, 0);
  const openPositions = filteredDepartments.reduce((sum, dept) => sum + dept.openPositions, 0);
  const activeRecruitments = filteredDepartments.reduce((sum, dept) => sum + dept.activeRecruitments, 0);

  const kpiCards = [
    {
      title: 'Total Departments',
      value: totalDepartments,
      icon: Building,
      description: 'All organizational units'
    },
    {
      title: 'Total Positions',
      value: totalPositions,
      icon: Briefcase,
      description: 'All budgeted positions'
    },
    {
      title: 'Open Positions',
      value: openPositions,
      icon: Target,
      description: 'Currently vacant positions'
    },
    {
      title: 'Active Recruitments',
      value: activeRecruitments,
      icon: TrendingUp,
      description: 'Ongoing recruitment processes'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'sector':
        return 'bg-blue-100 text-blue-800';
      case 'center':
        return 'bg-green-100 text-green-800';
      case 'department':
        return 'bg-purple-100 text-purple-800';
      case 'support':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleExpanded = (departmentId: string) => {
    setExpandedDepartment(expandedDepartment === departmentId ? null : departmentId);
  };

  const filters = [
    { id: 'all', label: 'All Units' },
    { id: 'sector', label: 'Sectors' },
    { id: 'center', label: 'Centers' },
    { id: 'department', label: 'Departments' },
    { id: 'support', label: 'Support Units' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <DashboardHeader
        title="Departments"
        description="Manage and track department recruitment activities and staffing"
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        dateRange={dateRange}
        setDateRange={setDateRange}
      >
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Department
        </Button>
      </DashboardHeader>

      {/* KPI Cards */}
      <DashboardSection
        title="Department Overview"
        description="Key metrics for department management and recruitment activities"
        icon={Building}
      >
        <KPICards cards={kpiCards} />
      </DashboardSection>

      {/* Department Management */}
      <DashboardSection
        title="Department Management"
        description="Track department recruitment activities and staffing levels"
        icon={Building}
      >
        {/* Search and Filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search departments..."
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

        {/* Department Type Filters */}
        <div className="flex space-x-2 mb-6">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Departments Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Manager</TableHead>
                  <TableHead>Total Positions</TableHead>
                  <TableHead>Open Positions</TableHead>
                  <TableHead>Filled</TableHead>
                  <TableHead>Active Recruitments</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDepartments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={11} className="text-center text-muted-foreground">
                      No departments found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDepartments.map((department) => (
                    <React.Fragment key={department.id}>
                      <TableRow>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleExpanded(department.id)}
                            aria-label={expandedDepartment === department.id ? 'Collapse details' : 'Expand details'}
                          >
                            {expandedDepartment === department.id ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </TableCell>
                        <TableCell className="font-medium">{department.name}</TableCell>
                        <TableCell>
                          <Badge className={getTypeColor(department.type)}>
                            {department.type.charAt(0).toUpperCase() + department.type.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{department.manager}</TableCell>
                        <TableCell>{department.totalPositions}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{department.openPositions}</span>
                            <span className="text-sm text-muted-foreground">
                              ({Math.round((department.openPositions / department.totalPositions) * 100)}%)
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{department.filledPositions}</span>
                            <span className="text-sm text-muted-foreground">
                              ({Math.round((department.filledPositions / department.totalPositions) * 100)}%)
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-blue-100 text-blue-800">
                            {department.activeRecruitments}
                          </Badge>
                        </TableCell>
                        <TableCell>{department.budget}</TableCell>
                        <TableCell>{department.location}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Users className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      {expandedDepartment === department.id && (
                        <TableRow>
                          <TableCell colSpan={11} className="p-0">
                            <div className="p-4 bg-muted/20">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <h4 className="font-semibold mb-3">Department Details</h4>
                                  <div className="space-y-2 text-sm">
                                    <div><strong>Total Employees:</strong> {department.totalEmployees}</div>
                                    <div><strong>Budget:</strong> {department.budget}</div>
                                    <div><strong>Location:</strong> {department.location}</div>
                                    <div><strong>Fill Rate:</strong> {Math.round((department.filledPositions / department.totalPositions) * 100)}%</div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-3">Active Recruitments</h4>
                                  <div className="space-y-2">
                                    {department.recruitments.map((recruitment) => (
                                      <div key={recruitment.id} className="p-3 bg-white rounded border">
                                        <div className="flex justify-between items-start">
                                          <div>
                                            <div className="font-medium">{recruitment.position}</div>
                                            <div className="text-sm text-muted-foreground">
                                              {recruitment.applications} applications • {recruitment.hired} hired
                                            </div>
                                          </div>
                                          <Badge className={getStatusColor(recruitment.status)}>
                                            {recruitment.status.charAt(0).toUpperCase() + recruitment.status.slice(1)}
                                          </Badge>
                                        </div>
                                      </div>
                                    ))}
                                    {department.recruitments.length === 0 && (
                                      <div className="text-sm text-muted-foreground text-center">
                                        No active recruitments
                                      </div>
                                    )}
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

export default HRDepartments; 