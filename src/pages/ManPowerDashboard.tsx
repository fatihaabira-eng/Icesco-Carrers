import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  FileText, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  Plus,
  Eye,
  Filter
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

// Mock data for demonstration
const kpiData = {
  totalPositions: 159,
  totalApplications: 1575,
  totalHires: 94,
  hiringCompleted: 59,
  offeredNotJoined: 12,
  hiredOffered: 106
};

const statusData = [
  { name: 'HR Interview', value: 205, color: '#8884d8' },
  { name: 'Technical Round', value: 208, color: '#82ca9d' },
  { name: 'Managerial', value: 217, color: '#ffc658' },
  { name: 'Negotiation', value: 66, color: '#ff7300' },
  { name: 'Joined', value: 94, color: '#00ff00' },
  { name: 'Rejected', value: 390, color: '#ff0000' },
  { name: 'Declined', value: 139, color: '#8dd1e1' }
];

const timelineData = [
  { week: 'Week 1', applications: 120, hires: 8 },
  { week: 'Week 2', applications: 150, hires: 12 },
  { week: 'Week 3', applications: 180, hires: 15 },
  { week: 'Week 4', applications: 200, hires: 18 },
  { week: 'Week 5', applications: 165, hires: 14 },
  { week: 'Week 6', applications: 140, hires: 11 }
];

const departmentData = [
  { department: 'Risk Advisory', open: 65, hired: 33 },
  { department: 'Consulting', open: 38, hired: 27 },
  { department: 'Financial Advisory', open: 28, hired: 19 },
  { department: 'Technology', open: 18, hired: 10 },
  { department: 'Operations', open: 10, hired: 5 }
];

const openDaysData = [
  { range: '0-30 days', positions: 4, hired: 3 },
  { range: '31-60 days', positions: 21, hired: 18 },
  { range: '61-90 days', positions: 35, hired: 28 },
  { range: '91-180 days', positions: 40, hired: 32 },
  { range: '180+ days', positions: 59, hired: 58 }
];

const ManpowerDashboard = () => {
  const [selectedRole, setSelectedRole] = useState('HR');
  
  const KPICard = ({ title, value, subtitle, icon: Icon, trend }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        {trend && (
          <div className={`text-xs ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? '+' : ''}{trend}% from last month
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-semibold">ICESCO Manpower Management</h1>
            <Badge variant="secondary">{selectedRole}</Badge>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            {selectedRole !== 'Committee Member' && (
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Request
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-4 p-4">
        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Total Positions"
            value={kpiData.totalPositions}
            subtitle="Open positions"
            icon={FileText}
            trend={5}
          />
          <KPICard
            title="Applications Received"
            value={kpiData.totalApplications}
            subtitle="Total to date"
            icon={Users}
            trend={12}
          />
          <KPICard
            title="Hires Completed"
            value={kpiData.totalHires}
            subtitle={`${kpiData.hiringCompleted}% completion rate`}
            icon={CheckCircle}
            trend={8}
          />
          <KPICard
            title="Pending Offers"
            value={kpiData.offeredNotJoined}
            subtitle="Awaiting response"
            icon={Clock}
            trend={-3}
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="positions">Positions</TabsTrigger>
            <TabsTrigger value="candidates">Candidates</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              {/* Timeline Chart */}
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Applications vs Hiring Timeline</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={timelineData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="applications" 
                        stroke="#8884d8" 
                        strokeDasharray="5 5"
                        name="Applications"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="hires" 
                        stroke="#82ca9d" 
                        name="Hires"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Status Distribution */}
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Applications by Current Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Department Status */}
            <Card>
              <CardHeader>
                <CardTitle>Hiring Status by Department</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={departmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="open" fill="#8884d8" name="Open Positions" />
                    <Bar dataKey="hired" fill="#82ca9d" name="Hired" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="positions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Open Days vs Positions vs Hired</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={openDaysData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="positions" fill="#8884d8" name="Total Positions" />
                    <Bar dataKey="hired" fill="#82ca9d" name="Hired" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Positions Table */}
            <Card>
              <CardHeader>
                <CardTitle>Recruitment Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Req ID</th>
                        <th className="text-left p-2">Position</th>
                        <th className="text-left p-2">Department</th>
                        <th className="text-left p-2">Status</th>
                        <th className="text-left p-2">Open Days</th>
                        <th className="text-left p-2">Applications</th>
                        <th className="text-left p-2">Hires</th>
                        <th className="text-left p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          id: 'Dec24|RA|Sen|Rab|1',
                          position: 'Senior Risk Analyst',
                          department: 'Risk Advisory',
                          status: 'In Review',
                          openDays: 45,
                          applications: 23,
                          hires: 0
                        },
                        {
                          id: 'Dec24|Tech|Dev|Cas|2',
                          position: 'Full Stack Developer',
                          department: 'Technology',
                          status: 'Active',
                          openDays: 12,
                          applications: 67,
                          hires: 1
                        },
                        {
                          id: 'Nov24|HR|Spec|Rab|1',
                          position: 'HR Specialist',
                          department: 'Human Resources',
                          status: 'Closed',
                          openDays: 89,
                          applications: 45,
                          hires: 2
                        }
                      ].map((request) => (
                        <tr key={request.id} className="border-b">
                          <td className="p-2 font-mono text-sm">{request.id}</td>
                          <td className="p-2">{request.position}</td>
                          <td className="p-2">{request.department}</td>
                          <td className="p-2">
                            <Badge 
                              variant={
                                request.status === 'Active' ? 'default' : 
                                request.status === 'Closed' ? 'secondary' : 
                                'outline'
                              }
                            >
                              {request.status}
                            </Badge>
                          </td>
                          <td className="p-2">{request.openDays}</td>
                          <td className="p-2">{request.applications}</td>
                          <td className="p-2">{request.hires}</td>
                          <td className="p-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="candidates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Candidate Pipeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Candidate Name</th>
                        <th className="text-left p-2">Email</th>
                        <th className="text-left p-2">Position</th>
                        <th className="text-left p-2">Experience</th>
                        <th className="text-left p-2">Status</th>
                        <th className="text-left p-2">Score</th>
                        <th className="text-left p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          name: 'Ahmed El Mansouri',
                          email: 'ahmed@example.com',
                          position: 'Senior Risk Analyst',
                          experience: '8 years',
                          status: 'Technical Round',
                          score: 85
                        },
                        {
                          name: 'Fatima Zahra',
                          email: 'fatima@example.com',
                          position: 'Full Stack Developer',
                          experience: '5 years',
                          status: 'HR Interview',
                          score: 78
                        },
                        {
                          name: 'Mohamed Benali',
                          email: 'mohamed@example.com',
                          position: 'HR Specialist',
                          experience: '3 years',
                          status: 'Offer Sent',
                          score: 92
                        }
                      ].map((candidate, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2 font-medium">{candidate.name}</td>
                          <td className="p-2 text-muted-foreground">{candidate.email}</td>
                          <td className="p-2">{candidate.position}</td>
                          <td className="p-2">{candidate.experience}</td>
                          <td className="p-2">
                            <Badge variant="outline">{candidate.status}</Badge>
                          </td>
                          <td className="p-2">
                            <div className="flex items-center space-x-2">
                              <div className="w-12 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full" 
                                  style={{ width: `${candidate.score}%` }}
                                />
                              </div>
                              <span className="text-sm">{candidate.score}%</span>
                            </div>
                          </td>
                          <td className="p-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Time to Hire Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={openDaysData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="range" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="positions" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Budget Utilization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Technology Department</span>
                      <span>75% of budget used</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }} />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span>Risk Advisory</span>
                      <span>60% of budget used</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '60%' }} />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span>Consulting</span>
                      <span className="text-red-600">95% of budget used</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '95%' }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ManpowerDashboard;