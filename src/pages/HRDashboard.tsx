// ...existing code...
import React, { useState } from 'react';
import IcescoVacanciesKPIs from '@/components/IcescoVacanciesKPIs';
import RecruitmentEfficiencyKPIs from '@/components/RecruitmentEfficiencyKPIs';
import JobOffersStatusKPIs from '@/components/JobOffersStatusKPIs';
import DeclinedOffersReasonsKPIs from '@/components/DeclinedOffersReasonsKPIs';
import RejectedCandidatesReasonsKPIs from '@/components/RejectedCandidatesReasonsKPIs';
import RecruitmentOutreachKPIs from '@/components/RecruitmentOutreachKPIs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Users,
  Briefcase,
  ArrowUpRight,
  CircleDollarSign,
  Globe,
  Shield,
  MoreHorizontal,
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
          <IcescoVacanciesKPIs data={icescoVacanciesData} />
      
        {/* Recruitment Efficiency KPIs Section */}
        <RecruitmentEfficiencyKPIs data={recruitmentEfficiencyData} />

        {/* Job Offers Status KPIs Section */}
        <JobOffersStatusKPIs data={jobOfferStatusData} />


        {/* Declined Offers Reasons KPIs Section */}
        <DeclinedOffersReasonsKPIs data={declinedReasonsData} />

        {/* Rejected Candidates Reasons KPIs Section */}
        <RejectedCandidatesReasonsKPIs data={rejectedReasonsData} />

        {/* Recruitment Outreach KPIs Section */}
        <RecruitmentOutreachKPIs data={recruitmentOutreachData} />
  </div>
  );
};





export default HRDashboard;