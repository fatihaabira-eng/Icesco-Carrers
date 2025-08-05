import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  TrendingUp, 
  Users, 
  Clock,
  DollarSign,
  Target,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import DashboardHeader from '@/components/DashboardHeader';
import KPICards from '@/components/KPICards';
import DashboardSection from '@/components/DashboardSection';

interface AnalyticsData {
  recruitmentEfficiency: number;
  timeToHire: number;
  costPerHire: number;
  qualityOfHire: number;
  sourceEffectiveness: {
    source: string;
    applications: number;
    hires: number;
    conversionRate: number;
  }[];
  departmentPerformance: {
    department: string;
    positions: number;
    filled: number;
    timeToFill: number;
    costPerHire: number;
  }[];
  monthlyTrends: {
    month: string;
    applications: number;
    interviews: number;
    hires: number;
  }[];
}

const HRAnalytics: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [dateRange, setDateRange] = useState('year');
  const [selectedMetric, setSelectedMetric] = useState('overview');

  // Mock analytics data
  const analyticsData: AnalyticsData = {
    recruitmentEfficiency: 85,
    timeToHire: 28,
    costPerHire: 4500,
    qualityOfHire: 92,
    sourceEffectiveness: [
      { source: 'LinkedIn', applications: 150, hires: 12, conversionRate: 8.0 },
      { source: 'Indeed', applications: 200, hires: 15, conversionRate: 7.5 },
      { source: 'Company Website', applications: 80, hires: 8, conversionRate: 10.0 },
      { source: 'Referrals', applications: 45, hires: 6, conversionRate: 13.3 },
      { source: 'Job Boards', applications: 120, hires: 9, conversionRate: 7.5 }
    ],
    departmentPerformance: [
      { department: 'Digital Transformation', positions: 8, filled: 6, timeToFill: 25, costPerHire: 5200 },
      { department: 'Communications', positions: 5, filled: 4, timeToFill: 22, costPerHire: 4100 },
      { department: 'Education', positions: 6, filled: 5, timeToFill: 30, costPerHire: 3800 },
      { department: 'Finance', positions: 4, filled: 3, timeToFill: 28, costPerHire: 4500 }
    ],
    monthlyTrends: [
      { month: 'Jan', applications: 45, interviews: 12, hires: 3 },
      { month: 'Feb', applications: 52, interviews: 15, hires: 4 },
      { month: 'Mar', applications: 38, interviews: 10, hires: 2 },
      { month: 'Apr', applications: 61, interviews: 18, hires: 5 },
      { month: 'May', applications: 48, interviews: 14, hires: 3 },
      { month: 'Jun', applications: 55, interviews: 16, hires: 4 }
    ]
  };

  const kpiCards = [
    {
      title: 'Recruitment Efficiency',
      value: `${analyticsData.recruitmentEfficiency}%`,
      icon: TrendingUp,
      description: 'Overall recruitment success rate',
      trend: { value: 5, isPositive: true }
    },
    {
      title: 'Time to Hire',
      value: `${analyticsData.timeToHire} days`,
      icon: Clock,
      description: 'Average time to fill positions',
      trend: { value: -3, isPositive: true }
    },
    {
      title: 'Cost per Hire',
      value: `$${analyticsData.costPerHire.toLocaleString()}`,
      icon: DollarSign,
      description: 'Average cost per successful hire',
      trend: { value: -8, isPositive: true }
    },
    {
      title: 'Quality of Hire',
      value: `${analyticsData.qualityOfHire}%`,
      icon: Target,
      description: 'Performance rating of new hires',
      trend: { value: 3, isPositive: true }
    }
  ];

  const getConversionColor = (rate: number) => {
    if (rate >= 10) return 'bg-green-100 text-green-800';
    if (rate >= 7) return 'bg-blue-100 text-blue-800';
    if (rate >= 5) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getPerformanceColor = (fillRate: number) => {
    if (fillRate >= 80) return 'bg-green-100 text-green-800';
    if (fillRate >= 60) return 'bg-blue-100 text-blue-800';
    if (fillRate >= 40) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <DashboardHeader
        title="HR Analytics"
        description="Comprehensive recruitment analytics and performance metrics"
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        dateRange={dateRange}
        setDateRange={setDateRange}
      >
        <Select value={selectedMetric} onValueChange={setSelectedMetric}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="overview">Overview</SelectItem>
            <SelectItem value="sources">Source Analysis</SelectItem>
            <SelectItem value="departments">Department Performance</SelectItem>
            <SelectItem value="trends">Monthly Trends</SelectItem>
          </SelectContent>
        </Select>
      </DashboardHeader>

      {/* KPI Cards */}
      <DashboardSection
        title="Recruitment Analytics Overview"
        description="Key performance indicators for recruitment efficiency and quality"
        icon={BarChart3}
      >
        <KPICards cards={kpiCards} />
      </DashboardSection>

      {/* Source Effectiveness */}
      <DashboardSection
        title="Source Effectiveness Analysis"
        description="Track recruitment source performance and conversion rates"
        icon={PieChart}
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {analyticsData.sourceEffectiveness.map((source, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{source.source}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Applications</span>
                    <span className="font-semibold">{source.applications}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Hires</span>
                    <span className="font-semibold">{source.hires}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Conversion Rate</span>
                    <Badge className={getConversionColor(source.conversionRate)}>
                      {source.conversionRate}%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DashboardSection>

      {/* Department Performance */}
      <DashboardSection
        title="Department Performance"
        description="Recruitment performance metrics by department"
        icon={Activity}
      >
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium">Department</th>
                    <th className="text-left p-4 font-medium">Positions</th>
                    <th className="text-left p-4 font-medium">Filled</th>
                    <th className="text-left p-4 font-medium">Fill Rate</th>
                    <th className="text-left p-4 font-medium">Time to Fill</th>
                    <th className="text-left p-4 font-medium">Cost per Hire</th>
                  </tr>
                </thead>
                <tbody>
                  {analyticsData.departmentPerformance.map((dept, index) => {
                    const fillRate = Math.round((dept.filled / dept.positions) * 100);
                    return (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="p-4 font-medium">{dept.department}</td>
                        <td className="p-4">{dept.positions}</td>
                        <td className="p-4">{dept.filled}</td>
                        <td className="p-4">
                          <Badge className={getPerformanceColor(fillRate)}>
                            {fillRate}%
                          </Badge>
                        </td>
                        <td className="p-4">{dept.timeToFill} days</td>
                        <td className="p-4">${dept.costPerHire.toLocaleString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </DashboardSection>

      {/* Monthly Trends */}
      <DashboardSection
        title="Monthly Recruitment Trends"
        description="Track recruitment activity trends over time"
        icon={TrendingUp}
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {analyticsData.monthlyTrends.map((month, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{month.month}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Applications</span>
                    <span className="font-semibold">{month.applications}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Interviews</span>
                    <span className="font-semibold">{month.interviews}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Hires</span>
                    <span className="font-semibold text-green-600">{month.hires}</span>
                  </div>
                  <div className="pt-2">
                    <div className="text-xs text-muted-foreground">
                      Conversion Rate: {Math.round((month.hires / month.applications) * 100)}%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DashboardSection>

      {/* Additional Analytics */}
      <DashboardSection
        title="Predictive Analytics"
        description="AI-powered recruitment insights and predictions"
        icon={Target}
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Predicted Hiring Needs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Next 3 months</span>
                  <Badge className="bg-blue-100 text-blue-800">12 positions</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Critical roles</span>
                  <Badge className="bg-red-100 text-red-800">3 positions</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Expected applications</span>
                  <Badge className="bg-green-100 text-green-800">180+</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Performance Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Best performing source</span>
                  <Badge className="bg-green-100 text-green-800">Referrals</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Fastest hiring dept</span>
                  <Badge className="bg-blue-100 text-blue-800">Communications</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Quality improvement</span>
                  <Badge className="bg-green-100 text-green-800">+5%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardSection>
    </div>
  );
};

export default HRAnalytics; 