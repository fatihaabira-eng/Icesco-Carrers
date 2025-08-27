import React, { useState } from 'react';
import IcescoVacanciesKPIs from '@/components/IcescoVacanciesKPIs';
import RecruitmentEfficiencyKPIs from '@/components/RecruitmentEfficiencyKPIs';
import JobOffersStatusKPIs from '@/components/JobOffersStatusKPIs';
import DeclinedOffersReasonsKPIs from '@/components/DeclinedOffersReasonsKPIs';
import RejectedCandidatesReasonsKPIs from '@/components/RejectedCandidatesReasonsKPIs';
import RecruitmentOutreachKPIs from '@/components/RecruitmentOutreachKPIs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import {
  jobOfferStatusData,
  declinedReasonsData,
  icescoVacanciesData,
  rejectedReasonsData,
  recruitmentOutreachData,
  recruitmentEfficiencyData
} from '@/data/hrDashboardData';

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

      <IcescoVacanciesKPIs data={icescoVacanciesData} />
      <RecruitmentEfficiencyKPIs data={recruitmentEfficiencyData} />
      <JobOffersStatusKPIs data={jobOfferStatusData} />
      <DeclinedOffersReasonsKPIs data={declinedReasonsData} />
      <RejectedCandidatesReasonsKPIs data={rejectedReasonsData} />
      <RecruitmentOutreachKPIs data={recruitmentOutreachData} />
    </div>
  );
};

export default HRDashboard;
