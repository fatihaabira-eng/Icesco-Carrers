import React from 'react';
import CVTechPage from './CVTechPage';

const HRResumeLibrary: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resume Library</h1>
          <p className="text-muted-foreground">
            CV processing, storage, and analysis tools
          </p>
        </div>
      </div>
      
      <CVTechPage />
    </div>
  );
};

export default HRResumeLibrary; 