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
import RoleBasedDashboard from './RoleBasedDashboard';
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
    <RoleBasedDashboard userRole={userRole} />
  );
};

export default GlobalAnalyticsDashboard;