import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DashboardHeaderProps {
  title: string;
  description: string;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  dateRange: string;
  setDateRange: (range: string) => void;
  children?: React.ReactNode;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  description,
  selectedYear,
  setSelectedYear,
  dateRange,
  setDateRange,
  children
}) => {
  const years = [
    { value: '2025', label: '2025' },
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: 'all', label: 'All Years' }
  ];

  const dateRanges = [
    { value: 'year', label: 'This Year' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'month', label: 'This Month' },
    { value: 'week', label: 'This Week' }
  ];

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="flex items-center space-x-4">
        {children}
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
  );
};

export default DashboardHeader; 