import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  TrendingUp, 
  Users, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  Eye,
  MessageSquare,
  Filter,
  Search,
  Calendar,
  BarChart3,
  PieChart,
  Target
} from 'lucide-react';

const DirectorView = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Mock data
  const kpis = {
    totalRequests: 32,
    pendingApproval: 8,
    inProgress: 15,
    completed: 9,
    successRate: 78
  };

  const jobRequests = [
    {
      id: 'REQ-001',
      title: 'Senior Data Analyst',
      department: 'IT',
      requestedBy: 'Ahmed Hassan',
      requestDate: '2024-01-15',
      status: 'Pending Approval',
      priority: 'High',
      justification: 'Replacement for departing senior analyst. Critical for ongoing data projects.',
      budget: '120,000 - 150,000 MAD',
      startDate: '2024-02-15'
    },
    {
      id: 'REQ-002',
      title: 'Marketing Manager',
      department: 'Marketing',
      requestedBy: 'Fatima El Fassi',
      requestDate: '2024-01-14',
      status: 'Approved',
      priority: 'Medium',
      justification: 'New position to support digital marketing expansion.',
      budget: '90,000 - 110,000 MAD',
      startDate: '2024-03-01'
    },
    {
      id: 'REQ-003',
      title: 'Financial Controller',
      department: 'Finance',
      requestedBy: 'Omar Benali',
      requestDate: '2024-01-12',
      status: 'In Review',
      priority: 'High',
      justification: 'Enhanced financial oversight and compliance requirements.',
      budget: '140,000 - 170,000 MAD',
      startDate: '2024-02-01'
    }
  ];

  const candidatePipeline = [
    {
      stage: 'Applications',
      count: 156,
      positions: [
        { title: 'Senior Data Analyst', count: 23 },
        { title: 'Marketing Manager', count: 18 },
        { title: 'Financial Controller', count: 15 }
      ]
    },
    {
      stage: 'Shortlisted',
      count: 45,
      positions: [
        { title: 'Senior Data Analyst', count: 8 },
        { title: 'Marketing Manager', count: 6 },
        { title: 'Financial Controller', count: 5 }
      ]
    },
    {
      stage: 'Interview',
      count: 12,
      positions: [
        { title: 'Senior Data Analyst', count: 3 },
        { title: 'Marketing Manager', count: 2 },
        { title: 'Financial Controller', count: 2 }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending Approval': return 'bg-yellow-100 text-yellow-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'In Review': return 'bg-blue-100 text-blue-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Director Dashboard</h1>
          <p className="text-muted-foreground mt-1">Strategic oversight of recruitment and workforce planning</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics Report
          </Button>
          <Button size="sm">
            <Target className="h-4 w-4 mr-2" />
            Set Goals
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Requests</p>
                <p className="text-2xl font-bold text-foreground">{kpis.totalRequests}</p>
              </div>
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">This quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Approval</p>
                <p className="text-2xl font-bold text-foreground">{kpis.pendingApproval}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-foreground">{kpis.inProgress}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Active recruitment</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-foreground">{kpis.completed}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Positions filled</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold text-foreground">{kpis.successRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Above target</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard Overview</TabsTrigger>
          <TabsTrigger value="requests">Job Requests</TabsTrigger>
          <TabsTrigger value="pipeline">Candidate Pipeline</TabsTrigger>
          <TabsTrigger value="analytics">Analytics & Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Requests */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Job Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobRequests.slice(0, 3).map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{request.title}</h4>
                        <p className="text-sm text-muted-foreground">{request.department} • {request.requestedBy}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getPriorityColor(request.priority)} variant="secondary">
                          {request.priority}
                        </Badge>
                        <Badge className={getStatusColor(request.status)} variant="secondary">
                          {request.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Requests
                </Button>
              </CardContent>
            </Card>

            {/* Pipeline Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Recruitment Pipeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {candidatePipeline.map((stage, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <span className="font-medium">{stage.stage}</span>
                      </div>
                      <Badge variant="outline" className="font-mono">
                        {stage.count}
                      </Badge>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Conversion Rate</span>
                    <span>28.8%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '28.8%' }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex-col">
                  <FileText className="h-6 w-6 mb-2" />
                  Review Requests
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Users className="h-6 w-6 mb-2" />
                  View Candidates
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <BarChart3 className="h-6 w-6 mb-2" />
                  Generate Report
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <MessageSquare className="h-6 w-6 mb-2" />
                  Team Updates
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Job Request Validation</h2>
            <div className="flex space-x-2">
              <Input placeholder="Search requests..." className="w-64" />
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left p-4 font-medium">Request ID</th>
                      <th className="text-left p-4 font-medium">Position</th>
                      <th className="text-left p-4 font-medium">Department</th>
                      <th className="text-left p-4 font-medium">Requested By</th>
                      <th className="text-left p-4 font-medium">Priority</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobRequests.map((request) => (
                      <tr key={request.id} className="border-b hover:bg-muted/50">
                        <td className="p-4 font-mono text-sm">{request.id}</td>
                        <td className="p-4 font-medium">{request.title}</td>
                        <td className="p-4">{request.department}</td>
                        <td className="p-4">{request.requestedBy}</td>
                        <td className="p-4">
                          <Badge className={getPriorityColor(request.priority)} variant="secondary">
                            {request.priority}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Badge className={getStatusColor(request.status)} variant="secondary">
                            {request.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex space-x-1">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Request Details: {request.title}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label>Department</Label>
                                      <p className="font-medium">{request.department}</p>
                                    </div>
                                    <div>
                                      <Label>Requested By</Label>
                                      <p className="font-medium">{request.requestedBy}</p>
                                    </div>
                                    <div>
                                      <Label>Request Date</Label>
                                      <p className="font-medium">{request.requestDate}</p>
                                    </div>
                                    <div>
                                      <Label>Desired Start Date</Label>
                                      <p className="font-medium">{request.startDate}</p>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <Label>Justification</Label>
                                    <p className="text-sm mt-1">{request.justification}</p>
                                  </div>
                                  
                                  <div>
                                    <Label>Budget Range</Label>
                                    <p className="font-medium">{request.budget}</p>
                                  </div>

                                  <div>
                                    <Label>Comments</Label>
                                    <Textarea placeholder="Add your comments..." className="mt-2" />
                                  </div>

                                  <div className="flex justify-end space-x-2">
                                    <Button variant="outline">
                                      <XCircle className="h-4 w-4 mr-2" />
                                      Reject
                                    </Button>
                                    <Button>
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Approve
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            
                            {request.status === 'Pending Approval' && (
                              <>
                                <Button variant="ghost" size="sm" className="text-green-600">
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="text-red-600">
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pipeline" className="space-y-4">
          <h2 className="text-xl font-semibold">Candidate Pipeline Overview</h2>
          
          <div className="grid grid-cols-3 gap-6">
            {candidatePipeline.map((stage, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{stage.stage}</CardTitle>
                    <Badge variant="outline" className="text-lg font-mono">
                      {stage.count}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {stage.positions.map((position, posIndex) => (
                      <div key={posIndex} className="flex justify-between items-center p-2 bg-muted rounded">
                        <span className="text-sm">{position.title}</span>
                        <Badge variant="secondary">{position.count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Pipeline Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-2xl font-bold text-primary">156</p>
                  <p className="text-sm text-muted-foreground">Total Applications</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">28.8%</p>
                  <p className="text-sm text-muted-foreground">Conversion Rate</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-2xl font-bold text-green-600">18</p>
                  <p className="text-sm text-muted-foreground">Avg. Days to Hire</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">85%</p>
                  <p className="text-sm text-muted-foreground">Quality Score</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <h2 className="text-xl font-semibold">Analytics & Reports</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Hiring Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted rounded flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Hiring trends chart would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted rounded flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Department distribution chart would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Key Performance Indicators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-sm text-muted-foreground">Time to Fill</h4>
                  <p className="text-2xl font-bold">22 days</p>
                  <p className="text-xs text-green-600">↓ 12% from last quarter</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-sm text-muted-foreground">Number of active Offers</h4>
                  <p className="text-2xl font-bold">10</p>
                  <p className="text-xs text-green-600">↑ 5% from last quarter</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-sm text-muted-foreground">Offer Acceptance</h4>
                  <p className="text-2xl font-bold">87%</p>
                  <p className="text-xs text-green-600">↑ 3% from last quarter</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-sm text-muted-foreground">Quality of Hire</h4>
                  <p className="text-2xl font-bold">4.2/5</p>
                  <p className="text-xs text-green-600">↑ 0.2 from last quarter</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DirectorView;