import React from 'react';
import RecruitmentAnalytics from './RecruitmentAnalytics';

const HRAnalytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Detailed recruitment metrics and performance insights
          </p>
        </div>
      </div>
      
      <RecruitmentAnalytics />
    </div>
  );
};

export default HRAnalytics; 