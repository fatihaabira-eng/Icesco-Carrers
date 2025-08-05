import React from 'react';
import GlobalAnalyticsDashboard from '@/components/GlobalAnalyticsDashboard';
import JobMatchingModule from '@/components/JobMatchingModule';

const HRDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">HR Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of recruitment activities and candidate pipeline
          </p>
        </div>
      </div>
      
      <GlobalAnalyticsDashboard userRole="hr" />
      <JobMatchingModule />
    </div>
  );
};

export default HRDashboard; 