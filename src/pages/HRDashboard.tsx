import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText,
  TrendingUp,
  Users,
  Briefcase,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  MessageSquare,
  BarChart3,
  ArrowUpRight,
  CircleDollarSign,
  Globe,
  Share2,
  UserPlus,
  Building,
  Icon,
  Shield,
  MoreHorizontal,
  Target
} from 'lucide-react';

// Mock Data for the KPI Cards
const jobOfferStatusData = {
  sent: 25,
  accepted: 15,
  pending: 5,
  neglected: 2,
  negotiation: 3,
  declined: 5,
};

const declinedReasonsData = [
  { reason: 'Salary', percentage: 55, Icon: CircleDollarSign },
  { reason: 'Relocation', percentage: 20, Icon: Globe },
  { reason: 'Job Position', percentage: 10, Icon: Briefcase },
  { reason: 'Benefits', percentage: 10, Icon: ArrowUpRight },
  { reason: 'Others', percentage: 5, Icon: MoreHorizontal },
];

const icescoVacanciesData = {
  openPositions: 3,
  requestedPositions: 18,
  approvedPositions: 12,
  totalCandidates: 95,
};

const rejectedReasonsData = [
  { reason: 'Language', percentage: 10, Icon: Users },
  { reason: 'Integrity', percentage: 50, Icon: Shield },
  { reason: 'Relevant Experience', percentage: 20, Icon: Briefcase },
  { reason: 'Alignment with ICESCO values', percentage: 20, Icon: Globe },
];

const recruitmentOutreachData = {
  website: 120,
  socialMedia: 250,
  referral: 45,
  internal: 15,
  external: 80,
};

// Mock data for Recruitment Efficiency KPIs
const recruitmentEfficiencyData = {
  overallEfficiency: 88,
  successfulHires: 92,
  probationSuccess: 85,
  oneYearPerformance: 78,
};

const HRDashboard: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2025');
  const [dateRange, setDateRange] = useState('year');

  const years = [
    { value: '2025', label: '2025' },
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
    { value: 'all', label: 'All Years' }
  ];

  const dateRanges = [
    { value: 'year', label: 'This Year' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'month', label: 'This Month' },
    { value: 'week', label: 'This Week' }
  ];

  return (
    <div className="space-y-8">
      {/* Header with Date Filter */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manpower Management Dashboard</h1>
          <p className="text-muted-foreground">
            Key Performance Indicators for recruitment activities
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Year:</span>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {years.map(year => (
                  <SelectItem key={year.value} value={year.value}>
                    {year.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Range:</span>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {dateRanges.map(range => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* ICESCO Vacancies KPIs Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">ICESCO Vacancies</CardTitle>
              <p className="text-sm text-muted-foreground">
                Overview of open positions and recruitment metrics
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <KpiCard icon={<FileText className="h-6 w-6 text-primary" />} title="Requested Positions" value={icescoVacanciesData.requestedPositions} />
            <KpiCard icon={<CheckCircle className="h-6 w-6 text-primary" />} title="Approved Positions" value={icescoVacanciesData.approvedPositions} />
            <KpiCard icon={<Briefcase className="h-6 w-6 text-primary" />} title="Published Positions" value={icescoVacanciesData.openPositions} />
            <KpiCard icon={<Users className="h-6 w-6 text-primary" />} title="Applied Candidates" value={icescoVacanciesData.totalCandidates} />
          </div>
        </CardContent>
      </Card>
      
      {/* Recruitment Efficiency KPIs Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Recruitment Efficiency</CardTitle>
              <p className="text-sm text-muted-foreground">
                Metrics evaluating the effectiveness of the recruitment process
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <KpiCard icon={<Target className="h-6 w-6 text-primary" />} title="Overall Efficiency" value={`${recruitmentEfficiencyData.overallEfficiency}%`} />
            <KpiCard icon={<UserPlus className="h-6 w-6 text-primary" />} title="Successful Hires" value={`${recruitmentEfficiencyData.successfulHires}%`} />
            <KpiCard icon={<CheckCircle className="h-6 w-6 text-primary" />} title="Probation Success" value={`${recruitmentEfficiencyData.probationSuccess}%`} />
            <KpiCard icon={<TrendingUp className="h-6 w-6 text-primary" />} title="One Year Performance" value={`${recruitmentEfficiencyData.oneYearPerformance}%`} />
          </div>
        </CardContent>
      </Card>

      {/* Job Offers Status KPIs Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Job Offers Status</CardTitle>
              <p className="text-sm text-muted-foreground">
                Track the status of job offers extended to candidates
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            <KpiCard icon={<FileText className="h-6 w-6 text-primary" />} title="Offers Sent" value={jobOfferStatusData.sent} />
            <KpiCard icon={<CheckCircle className="h-6 w-6 text-primary" />} title="Offers Accepted" value={jobOfferStatusData.accepted} />
            <KpiCard icon={<Clock className="h-6 w-6 text-primary" />} title="Offers Pending" value={jobOfferStatusData.pending} />
            <KpiCard icon={<AlertCircle className="h-6 w-6 text-primary" />} title="Offers Neglected" value={jobOfferStatusData.neglected} />
            <KpiCard icon={<MessageSquare className="h-6 w-6 text-primary" />} title="Ongoing Negotiation" value={jobOfferStatusData.negotiation} />
            <KpiCard icon={<XCircle className="h-6 w-6 text-primary" />} title="Offers Declined" value={jobOfferStatusData.declined} />
          </div>
        </CardContent>
      </Card>


      {/* Declined Offers Reasons KPIs Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Declined Offers Reasons</CardTitle>
              <p className="text-sm text-muted-foreground">
                Analysis of reasons why candidates decline job offers
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {declinedReasonsData.map(item => (
              <KpiCard key={item.reason} icon={<item.Icon className="h-6 w-6 text-primary" />} title={item.reason} value={`${item.percentage}%`} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rejected Candidates Reasons KPIs Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Rejected Candidates Reasons</CardTitle>
              <p className="text-sm text-muted-foreground">
                Analysis of reasons for rejecting candidates during the screening process
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {rejectedReasonsData.map(item => (
              <KpiCard key={item.reason} icon={<item.Icon className="h-6 w-6 text-primary" />} title={item.reason} value={`${item.percentage}%`} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recruitment Outreach KPIs Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Recruitment Outreach</CardTitle>
              <p className="text-sm text-muted-foreground">
                Effectiveness of different recruitment channels
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <KpiCard icon={<Globe className="h-6 w-6 text-primary" />} title="Website" value={recruitmentOutreachData.website} />
            <KpiCard icon={<Share2 className="h-6 w-6 text-primary" />} title="Social Media" value={recruitmentOutreachData.socialMedia} />
            <KpiCard icon={<UserPlus className="h-6 w-6 text-primary" />} title="Referral" value={recruitmentOutreachData.referral} />
            <KpiCard icon={<Building className="h-6 w-6 text-primary" />} title="Internal" value={recruitmentOutreachData.internal} />
            <KpiCard icon={<Globe className="h-6 w-6 text-primary" />} title="Member States" value={recruitmentOutreachData.external} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// A reusable component for individual KPI cards to keep the code DRY
interface KpiCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
}

const KpiCard: React.FC<KpiCardProps> = ({ icon, title, value }) => {
  // Format the value to ensure consistency (e.g., add percentage sign if needed)
  const formattedValue = typeof value === 'string' && value.includes('%') 
    ? value 
    : typeof value === 'number' 
      ? value.toString() 
      : value;

  return (
    <Card className="border-0 shadow-none flex-1 min-w-[150px]">
      <CardContent className="p-6 text-center flex flex-col items-center justify-between h-full">
        <div className="flex flex-col items-center space-y-3 flex-1 justify-center">
          <div className="p-3 rounded-lg bg-primary/10">
            {icon}
          </div>
          <div className="w-full">
            <p className="text-lg font-semibold text-muted-foreground truncate" title={title}>{title}</p>
            <p className="text-3xl font-bold text-primary mt-2">{formattedValue}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HRDashboard;