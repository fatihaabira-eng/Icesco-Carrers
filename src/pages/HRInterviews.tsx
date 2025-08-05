import React from 'react';
import ScheduleInterview from './ScheduleInterview';
import InterviewManagement from './InterviewManagement';

const HRInterviews: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Interviews</h1>
          <p className="text-muted-foreground">
            Schedule and manage candidate interviews
          </p>
        </div>
      </div>
      
      <div className="grid gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Schedule Interview</h2>
          <ScheduleInterview />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Interview Management</h2>
          <InterviewManagement />
        </div>
      </div>
    </div>
  );
};

export default HRInterviews; 