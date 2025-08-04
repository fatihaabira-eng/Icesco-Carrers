import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  FileText, 
  Calendar, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  Bell,
  MoreHorizontal,
  Eye,
  Download,
  MessageSquare,
  Video,
  Mail
} from 'lucide-react';

const HRControlCenter = () => {
  const [activeView, setActiveView] = useState('pipeline');

  // Mock data
  const kpis = {
    openPositions: 24,
    newApplications: 87,
    scheduledInterviews: 12,
    pendingActions: 8
  };

  const pipelineData = [
    {
      stage: 'Request',
      count: 15,
      items: [
        { id: 'REQ-001', title: 'Senior Data Analyst', department: 'IT', priority: 'High', date: '2024-01-15' },
        { id: 'REQ-002', title: 'Marketing Manager', department: 'Marketing', priority: 'Medium', date: '2024-01-14' }
      ]
    },
    {
      stage: 'Published',
      count: 8,
      items: [
        { id: 'REQ-003', title: 'HR Specialist', department: 'HR', priority: 'High', date: '2024-01-10' },
        { id: 'REQ-004', title: 'Finance Officer', department: 'Finance', priority: 'Low', date: '2024-01-08' }
      ]
    },
    {
      stage: 'Evaluation',
      count: 18,
      items: [
        { id: 'REQ-005', title: 'Software Engineer', department: 'IT', priority: 'High', date: '2024-01-05' },
        { id: 'REQ-006', title: 'Project Manager', department: 'Operations', priority: 'Medium', date: '2024-01-03' }
      ]
    },
    {
      stage: 'Closed',
      count: 12,
      items: [
        { id: 'REQ-007', title: 'Content Writer', department: 'Marketing', priority: 'Low', date: '2024-01-01' }
      ]
    }
  ];

  const recentApplications = [
    {
      id: 'APP-001',
      candidate: 'Ahmed El Mansouri',
      position: 'Senior Data Analyst',
      score: 92,
      status: 'CV Review',
      appliedDate: '2024-01-15',
      avatar: '/api/placeholder/32/32'
    },
    {
      id: 'APP-002',
      candidate: 'Fatima Zahra',
      position: 'Marketing Manager',
      score: 87,
      status: 'Interview Scheduled',
      appliedDate: '2024-01-14',
      avatar: '/api/placeholder/32/32'
    },
    {
      id: 'APP-003',
      candidate: 'Mohamed Benali',
      position: 'HR Specialist',
      score: 78,
      status: 'Technical Test',
      appliedDate: '2024-01-13',
      avatar: '/api/placeholder/32/32'
    }
  ];

  const pendingTasks = [
    { id: 1, task: 'Review CV for Senior Data Analyst position', priority: 'High', dueDate: 'Today' },
    { id: 2, task: 'Schedule interview with Ahmed El Mansouri', priority: 'Medium', dueDate: 'Tomorrow' },
    { id: 3, task: 'Send rejection email to 3 candidates', priority: 'Low', dueDate: 'This week' },
    { id: 4, task: 'Update job posting for Marketing Manager', priority: 'High', dueDate: 'Today' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CV Review': return 'bg-blue-100 text-blue-800';
      case 'Interview Scheduled': return 'bg-purple-100 text-purple-800';
      case 'Technical Test': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">HR Control Center</h1>
          <p className="text-muted-foreground mt-1">Manage recruitment pipeline and candidate evaluation</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Notifications ({kpis.pendingActions})
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Open Positions</p>
                <p className="text-2xl font-bold text-foreground">{kpis.openPositions}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">+3 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">New Applications</p>
                <p className="text-2xl font-bold text-foreground">{kpis.newApplications}</p>
              </div>
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">+12 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Scheduled Interviews</p>
                <p className="text-2xl font-bold text-foreground">{kpis.scheduledInterviews}</p>
              </div>
              <Calendar className="h-8 w-8 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Next 7 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Actions</p>
                <p className="text-2xl font-bold text-foreground">{kpis.pendingActions}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pipeline">Recruitment Pipeline</TabsTrigger>
          <TabsTrigger value="applications">Recent Applications</TabsTrigger>
          <TabsTrigger value="tasks">Priority Tasks</TabsTrigger>
          <TabsTrigger value="cv-tech">CV Tech Module</TabsTrigger>
        </TabsList>

        <TabsContent value="pipeline" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Recruitment Pipeline</h2>
            <div className="flex space-x-2">
              <Input placeholder="Search positions..." className="w-64" />
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {pipelineData.map((stage) => (
              <Card key={stage.stage} className="min-h-[400px]">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-sm font-medium">{stage.stage}</CardTitle>
                    <Badge variant="secondary">{stage.count}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {stage.items.map((item) => (
                    <Card key={item.id} className="p-3 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-sm">{item.title}</h4>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">{item.department}</p>
                        <div className="flex justify-between items-center">
                          <Badge className={getPriorityColor(item.priority)} variant="secondary">
                            {item.priority}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{item.date}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="applications" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Recent Applications</h2>
            <Button size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View All Applications
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left p-4 font-medium">Candidate</th>
                      <th className="text-left p-4 font-medium">Position</th>
                      <th className="text-left p-4 font-medium">Score</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Applied Date</th>
                      <th className="text-left p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentApplications.map((app) => (
                      <tr key={app.id} className="border-b hover:bg-muted/50">
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={app.avatar} />
                              <AvatarFallback>{app.candidate.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{app.candidate}</span>
                          </div>
                        </td>
                        <td className="p-4">{app.position}</td>
                        <td className="p-4">
                          <Badge variant="outline" className="font-mono">
                            {app.score}/100
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Badge className={getStatusColor(app.status)} variant="secondary">
                            {app.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-muted-foreground">{app.appliedDate}</td>
                        <td className="p-4">
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Calendar className="h-4 w-4" />
                            </Button>
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

        <TabsContent value="tasks" className="space-y-4">
          <h2 className="text-xl font-semibold">Priority Tasks</h2>
          
          <div className="space-y-3">
            {pendingTasks.map((task) => (
              <Card key={task.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="font-medium">{task.task}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={getPriorityColor(task.priority)} variant="secondary">
                      {task.priority}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{task.dueDate}</span>
                    <Button variant="ghost" size="sm">
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cv-tech" className="space-y-4">
          <h2 className="text-xl font-semibold">CV Tech Module</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Automated CV Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">Drop CV files here or click to upload</p>
                  <Button>Upload CVs</Button>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Recent Analysis</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-muted rounded">
                      <span className="text-sm">Ahmed_CV.pdf</span>
                      <Badge variant="outline">92% Match</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted rounded">
                      <span className="text-sm">Fatima_CV.pdf</span>
                      <Badge variant="outline">87% Match</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Semantic Search</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search by skills, concepts, or keywords..." 
                    className="pl-10"
                  />
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Quick Searches</h4>
                  <div className="flex flex-wrap gap-2">
                    {['React Developer', 'Data Science', 'Project Management', 'Arabic Fluent'].map((tag) => (
                      <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Search Results</h4>
                  <div className="text-sm text-muted-foreground">
                    Found 23 candidates matching "React Developer"
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Interview Scheduling</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Calendar Integration</h4>
                  <p className="text-sm text-muted-foreground mb-3">Sync with Outlook/Google Calendar</p>
                  <Button size="sm" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Connect Calendar
                  </Button>
                </Card>

                <Card className="p-4">
                  <h4 className="font-medium mb-2">Smart Scheduling</h4>
                  <p className="text-sm text-muted-foreground mb-3">AI-powered time slot suggestions</p>
                  <Button size="sm" variant="outline">
                    <Clock className="h-4 w-4 mr-2" />
                    View Suggestions
                  </Button>
                </Card>

                <Card className="p-4">
                  <h4 className="font-medium mb-2">Email Templates</h4>
                  <p className="text-sm text-muted-foreground mb-3">Multi-language templates</p>
                  <Button size="sm" variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Manage Templates
                  </Button>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HRControlCenter;