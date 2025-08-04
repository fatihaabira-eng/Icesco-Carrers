import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Briefcase, 
  Calendar, 
  TrendingUp,
  UserCheck,
  Clock,
  Target,
  Award,
  Eye
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface GlobalAnalyticsDashboardProps {
  userRole: 'hr' | 'committee' | 'director';
}

const GlobalAnalyticsDashboard: React.FC<GlobalAnalyticsDashboardProps> = ({ userRole }) => {
  const [selectedKPIDetail, setSelectedKPIDetail] = useState<string | null>(null);
  const [isEvaluationOpen, setIsEvaluationOpen] = useState(false);
  // Mock data for analytics
  const weeklyData = [
    { week: 'W1', applications: 45, interviews: 12, hires: 3 },
    { week: 'W2', applications: 38, interviews: 15, hires: 5 },
    { week: 'W3', applications: 52, interviews: 18, hires: 4 },
    { week: 'W4', applications: 41, interviews: 14, hires: 6 },
  ];

  const departmentData = [
    { department: 'Engineering', open: 12, filled: 8 },
    { department: 'Marketing', open: 6, filled: 4 },
    { department: 'HR', open: 3, filled: 2 },
    { department: 'Finance', open: 4, filled: 3 },
  ];

  const statusData = [
    { name: 'Screening', value: 35, color: '#8B5CF6' },
    { name: 'Technical', value: 28, color: '#06B6D4' },
    { name: 'Final', value: 18, color: '#10B981' },
    { name: 'Offer', value: 12, color: '#F59E0B' },
  ];

  const topCandidates = [
    { name: 'Ahmed Ben Ali', position: 'Senior Developer', score: 95, status: 'Final Interview' },
    { name: 'Sarah Khalil', position: 'Marketing Manager', score: 92, status: 'Technical Round' },
    { name: 'Mohamed Nasser', position: 'Data Analyst', score: 89, status: 'HR Interview' },
    { name: 'Fatima Al-Zahra', position: 'Project Manager', score: 87, status: 'Screening' },
    { name: 'Omar Hassan', position: 'UI/UX Designer', score: 85, status: 'Portfolio Review' },
  ];

  const upcomingInterviews = [
    { candidate: 'Ahmed Ben Ali', position: 'Senior Developer', time: '10:00 AM', interviewer: 'Dr. Mohammed' },
    { candidate: 'Sarah Khalil', position: 'Marketing Manager', time: '2:00 PM', interviewer: 'Ms. Fatima' },
    { candidate: 'Mohamed Nasser', position: 'Data Analyst', time: '4:00 PM', interviewer: 'Mr. Hassan' },
  ];

  const getKPICards = () => {
    const baseCards = [
      {
        title: 'Total Candidates',
        value: '1,247',
        change: '+12%',
        icon: Users,
        color: 'text-blue-600'
      },
      {
        title: 'Open Positions',
        value: '25',
        change: '+3',
        icon: Briefcase,
        color: 'text-green-600'
      },
      {
        title: 'Shortlisted',
        value: '89',
        change: '+8%',
        icon: UserCheck,
        color: 'text-purple-600'
      },
      {
        title: 'Interviews This Week',
        value: '18',
        change: '+5',
        icon: Calendar,
        color: 'text-orange-600'
      }
    ];

    if (userRole === 'director') {
      return [
        ...baseCards.slice(0, 2),
        {
          title: 'Approval Pending',
          value: '7',
          change: '+2',
          icon: Clock,
          color: 'text-red-600'
        },
        {
          title: 'Budget Utilization',
          value: '68%',
          change: '+5%',
          icon: Target,
          color: 'text-indigo-600'
        }
      ];
    }

    if (userRole === 'committee') {
      return [
        baseCards[0],
        {
          title: 'Assigned Evaluations',
          value: '12',
          change: '+3',
          icon: Award,
          color: 'text-green-600'
        },
        baseCards[2],
        baseCards[3]
      ];
    }

    return baseCards;
  };

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {getKPICards().map((kpi, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                  <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                  <p className="text-xs text-green-600 mt-1">{kpi.change}</p>
                </div>
                <kpi.icon className={`h-8 w-8 ${kpi.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Weekly Recruitment Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="applications" stroke="#8B5CF6" strokeWidth={2} />
                <Line type="monotone" dataKey="interviews" stroke="#06B6D4" strokeWidth={2} />
                <Line type="monotone" dataKey="hires" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Status */}
        <Card>
          <CardHeader>
            <CardTitle>Hiring Status by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="open" fill="#8B5CF6" name="Open Positions" />
                <Bar dataKey="filled" fill="#10B981" name="Filled Positions" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Role-specific content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Candidate Pipeline Status */}
        <Card>
          <CardHeader>
            <CardTitle>Candidate Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {statusData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Candidates */}
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Candidates by Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topCandidates.map((candidate, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{candidate.name}</p>
                    <p className="text-xs text-muted-foreground">{candidate.position}</p>
                    <Badge variant="outline" className="text-xs mt-1">
                      {candidate.status}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{candidate.score}</p>
                    <p className="text-xs text-muted-foreground">Score</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Interviews */}
        {userRole !== 'director' && (
          <Card>
            <CardHeader>
              <CardTitle>Interviews This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingInterviews.map((interview, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{interview.candidate}</p>
                      <p className="text-xs text-muted-foreground">{interview.position}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">{interview.time}</p>
                      <p className="text-xs text-muted-foreground">{interview.interviewer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Director-specific: Pending Approvals */}
        {userRole === 'director' && (
          <Card>
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { title: 'Senior Developer Position', department: 'Engineering', priority: 'High' },
                  { title: 'Marketing Specialist', department: 'Marketing', priority: 'Medium' },
                  { title: 'Data Analyst', department: 'Analytics', priority: 'High' }
                ].map((request, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{request.title}</p>
                      <p className="text-xs text-muted-foreground">{request.department}</p>
                    </div>
                    <Badge variant={request.priority === 'High' ? 'destructive' : 'secondary'}>
                      {request.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default GlobalAnalyticsDashboard;