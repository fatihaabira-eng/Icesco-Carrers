import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Users, 
  FileText, 
  Calendar, 
  TrendingUp, 
  Clock, 
  Filter,
  Download,
  Eye,
  AlertCircle,
  CheckCircle,
  Search
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const RecruitmentAnalytics = () => {
  const [activeTab, setActiveTab] = useState('interview');
  const [selectedPeriod, setSelectedPeriod] = useState('Nov-19');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedRecruiter, setSelectedRecruiter] = useState('all');

  // Global KPIs
  const kpis = {
    positionsTD: 159,
    applicationsTD: 1575,
    hiresTD: 94,
    hiringCompleted: 59,
    offeredNotJoined: '',
    hiredOfferedTD: 94
  };

  // Timeline data for applications vs hiring
  const timelineData = [
    { week: 'W45', applications: 120, hires: 8 },
    { week: 'W46', applications: 135, hires: 12 },
    { week: 'W47', applications: 142, hires: 15 },
    { week: 'W48', applications: 156, hires: 18 },
    { week: 'W49', applications: 163, hires: 22 },
    { week: 'W50', applications: 175, hires: 19 }
  ];

  // Applications by status data
  const statusData = [
    { status: 'HR Interview', count: 205, color: '#8B5CF6' },
    { status: 'Technical Round', count: 208, color: '#06B6D4' },
    { status: 'Managerial', count: 217, color: '#10B981' },
    { status: 'Negotiation', count: 66, color: '#F59E0B' },
    { status: 'Joined', count: 94, color: '#059669' },
    { status: 'Rejected', count: 390, color: '#DC2626' },
    { status: 'Declined', count: 139, color: '#6B7280' }
  ];

  // Candidate data for interview tab
  const candidateData = [
    {
      reqId: 'Jul19|Enab|Vic|Hyd|1',
      candidateName: 'Ahmed El Mansouri',
      email: 'ahmed.elmansouri@email.com',
      qualifications: 'Master Computer Science',
      totalExp: 5.2,
      avgHireDays: 32,
      firstConnect: '2024-01-15',
      offerDate: '2024-02-10',
      joiningDate: '2024-02-25',
      joined: true,
      lastCTC: 45000,
      ctcOffered: 52000,
      ctcGrowth: 15.5,
      deltaAvgCTC: 2000,
      declineReason: ''
    },
    {
      reqId: 'Aug19|Tech|Mgr|Rab|2',
      candidateName: 'Fatima Zahra Benali',
      email: 'fatima.benali@email.com',
      qualifications: 'PhD Engineering',
      totalExp: 8.1,
      avgHireDays: 28,
      firstConnect: '2024-01-20',
      offerDate: '2024-02-15',
      joiningDate: '',
      joined: false,
      lastCTC: 62000,
      ctcOffered: 68000,
      ctcGrowth: 9.7,
      deltaAvgCTC: -1500,
      declineReason: 'Better offer elsewhere'
    }
  ];

  // Hiring status by business data
  const businessData = [
    { business: 'Risk Advisory', total: 65, filled: 33 },
    { business: 'Consulting', total: 38, filled: 27 },
    { business: 'Enabling Areas', total: 42, filled: 24 },
    { business: 'Financial Advisory', total: 28, filled: 18 },
    { business: 'Technology', total: 35, filled: 22 }
  ];

  // Open days categorization
  const openDaysData = [
    { category: '0-30 days', positions: 4, hired: 3 },
    { category: '31-60 days', positions: 21, hired: 18 },
    { category: '61-90 days', positions: 34, hired: 28 },
    { category: '91-120 days', positions: 41, hired: 32 },
    { category: '121-180 days', positions: 45, hired: 38 },
    { category: '180+ days', positions: 59, hired: 58 }
  ];

  // Position details data
  const positionsData = [
    {
      reqId: 'REQ-2024-001',
      startDate: '2024-01-15',
      openDays: 45,
      positionsTD: 2,
      hiresTD: 2,
      balanceHires: 0,
      kpiStatus: 'filled',
      applicationsTD: 45,
      avgHireDays: 32,
      targetDaysHire: 30,
      offeredNotJoined: 0,
      backed: 8,
      rejected: 35
    },
    {
      reqId: 'REQ-2024-002',
      startDate: '2024-02-01',
      openDays: 28,
      positionsTD: 1,
      hiresTD: 0,
      balanceHires: 1,
      kpiStatus: 'under',
      applicationsTD: 67,
      avgHireDays: 0,
      targetDaysHire: 25,
      offeredNotJoined: 1,
      backed: 5,
      rejected: 58
    },
    {
      reqId: 'REQ-2024-003',
      startDate: '2024-01-20',
      openDays: 38,
      positionsTD: 3,
      hiresTD: 4,
      balanceHires: -1,
      kpiStatus: 'over',
      applicationsTD: 89,
      avgHireDays: 24,
      targetDaysHire: 35,
      offeredNotJoined: 0,
      backed: 12,
      rejected: 73
    }
  ];

  const getKPIIcon = (status: string) => {
    switch (status) {
      case 'filled': return <CheckCircle className="h-4 w-4 text-primary" />;
      case 'over': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'under': return <AlertCircle className="h-4 w-4 text-destructive" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header with Global KPIs */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Recruitment Analysis</h1>
            <p className="text-muted-foreground mt-1">Comprehensive recruitment performance insights</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Global KPIs Header */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-foreground">{kpis.positionsTD}</div>
              <div className="text-sm text-muted-foreground">Positions TD</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-foreground">{kpis.applicationsTD}</div>
              <div className="text-sm text-muted-foreground">Applications TD</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-foreground">{kpis.hiresTD}</div>
              <div className="text-sm text-muted-foreground">Hires TD</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{kpis.hiringCompleted}%</div>
              <div className="text-sm text-muted-foreground">% Hiring Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-foreground">{kpis.offeredNotJoined || '(Blank)'}</div>
              <div className="text-sm text-muted-foreground">Offered Not Joined TD</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-foreground">{kpis.hiredOfferedTD}</div>
              <div className="text-sm text-muted-foreground">Hired + Offered TD</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Analytics Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="interview">INTERVIEW</TabsTrigger>
          <TabsTrigger value="positions">POSITIONS</TabsTrigger>
        </TabsList>

        {/* INTERVIEW Tab */}
        <TabsContent value="interview" className="space-y-6">
          {/* Filters */}
          <div className="flex justify-end space-x-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Nov-19">Nov-19</SelectItem>
                <SelectItem value="Dec-19">Dec-19</SelectItem>
                <SelectItem value="Jan-20">Jan-20</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Level/Band" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="junior">Junior</SelectItem>
                <SelectItem value="senior">Senior</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedRecruiter} onValueChange={setSelectedRecruiter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Recruiter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Recruiters</SelectItem>
                <SelectItem value="hr1">HR Manager 1</SelectItem>
                <SelectItem value="hr2">HR Manager 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Timeline Chart */}
            <Card>
              <CardHeader>
                <CardTitle>From Applications to Hiring - Timeline in Weeks</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={timelineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="applications" 
                      stroke="#8B5CF6" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Applications"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="hires" 
                      stroke="#10B981" 
                      strokeWidth={2}
                      name="Hires"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Status Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Applications by Current Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {statusData.map((item) => (
                    <div key={item.status} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm font-medium">{item.status}</span>
                      </div>
                      <Badge variant="outline">{item.count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Candidate Table */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Candidate Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Req ID</TableHead>
                      <TableHead>Candidate Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Qualifications</TableHead>
                      <TableHead>Total Exp</TableHead>
                      <TableHead>Avg Hire Days</TableHead>
                      <TableHead>1st Connect</TableHead>
                      <TableHead>Offer Date</TableHead>
                      <TableHead>Joining Date</TableHead>
                      <TableHead>✅</TableHead>
                      <TableHead>Last CTC</TableHead>
                      <TableHead>CTC Offered</TableHead>
                      <TableHead>CTC Growth</TableHead>
                      <TableHead>Δ from AvgCTC</TableHead>
                      <TableHead>Decline Reason</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {candidateData.map((candidate) => (
                      <TableRow key={candidate.reqId}>
                        <TableCell className="font-mono text-xs">{candidate.reqId}</TableCell>
                        <TableCell className="font-medium">{candidate.candidateName}</TableCell>
                        <TableCell className="text-xs">{candidate.email}</TableCell>
                        <TableCell className="text-xs">{candidate.qualifications}</TableCell>
                        <TableCell>{candidate.totalExp}</TableCell>
                        <TableCell>{candidate.avgHireDays}</TableCell>
                        <TableCell className="text-xs">{candidate.firstConnect}</TableCell>
                        <TableCell className="text-xs">{candidate.offerDate}</TableCell>
                        <TableCell className="text-xs">{candidate.joiningDate}</TableCell>
                        <TableCell>
                          {candidate.joined ? <CheckCircle className="h-4 w-4 text-green-500" /> : ''}
                        </TableCell>
                        <TableCell>{candidate.lastCTC?.toLocaleString()}</TableCell>
                        <TableCell>{candidate.ctcOffered?.toLocaleString()}</TableCell>
                        <TableCell className="text-green-600">+{candidate.ctcGrowth}%</TableCell>
                        <TableCell className={candidate.deltaAvgCTC > 0 ? 'text-green-600' : 'text-red-600'}>
                          {candidate.deltaAvgCTC > 0 ? '+' : ''}{candidate.deltaAvgCTC}
                        </TableCell>
                        <TableCell className="text-xs">{candidate.declineReason}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* POSITIONS Tab */}
        <TabsContent value="positions" className="space-y-6">
          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Hiring Status by Business */}
            <Card>
              <CardHeader>
                <CardTitle>Hiring Status by Business</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {businessData.map((business) => (
                    <div key={business.business} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{business.business}</span>
                        <span>{business.filled}/{business.total}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${(business.filled / business.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Timeline Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Positions & Hiring Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={timelineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="applications" 
                      stroke="#6B7280" 
                      strokeWidth={2}
                      name="Open Positions"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="hires" 
                      stroke="#10B981" 
                      strokeWidth={2}
                      name="Hires"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Open Days Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Open Days vs Positions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {openDaysData.map((item) => (
                    <div key={item.category} className="flex justify-between items-center">
                      <span className="text-sm">{item.category}</span>
                      <div className="flex space-x-2">
                        <Badge variant="outline">{item.positions}</Badge>
                        <Badge variant="secondary">{item.hired}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Position Details Table */}
          <Card>
            <CardHeader>
              <CardTitle>Position Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Req ID</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>Open Days</TableHead>
                      <TableHead>Positions TD</TableHead>
                      <TableHead>Hires TD</TableHead>
                      <TableHead>Balance Hires TD</TableHead>
                      <TableHead>KPI</TableHead>
                      <TableHead>Applications TD</TableHead>
                      <TableHead>Avg Hire Days</TableHead>
                      <TableHead>Target Days to Hire</TableHead>
                      <TableHead>Offered Not Joined</TableHead>
                      <TableHead>Backed</TableHead>
                      <TableHead>Rejected</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {positionsData.map((position) => (
                      <TableRow key={position.reqId}>
                        <TableCell className="font-mono">{position.reqId}</TableCell>
                        <TableCell>{position.startDate}</TableCell>
                        <TableCell>{position.openDays}</TableCell>
                        <TableCell>{position.positionsTD}</TableCell>
                        <TableCell>{position.hiresTD}</TableCell>
                        <TableCell className={position.balanceHires > 0 ? 'text-red-600' : position.balanceHires < 0 ? 'text-yellow-600' : 'text-green-600'}>
                          {position.balanceHires}
                        </TableCell>
                        <TableCell>{getKPIIcon(position.kpiStatus)}</TableCell>
                        <TableCell>{position.applicationsTD}</TableCell>
                        <TableCell>{position.avgHireDays}</TableCell>
                        <TableCell>{position.targetDaysHire}</TableCell>
                        <TableCell>{position.offeredNotJoined}</TableCell>
                        <TableCell>{position.backed}</TableCell>
                        <TableCell>{position.rejected}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RecruitmentAnalytics;