import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DashboardHeaderProps {
  title: string;
  description: string;

  children?: React.ReactNode;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  description,

  children
}) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2000 + 1 }, (_, i) => {
    const year = (currentYear - i).toString();
    return { value: year, label: year };
  });
  years.push({ value: 'all', label: 'All Years' });

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
      
       
      </div>
    </div>
  );
};

export default DashboardHeader;