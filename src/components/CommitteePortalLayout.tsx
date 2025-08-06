import React from 'react';
import { Outlet } from 'react-router-dom';
import CommitteeSidebar from './CommitteeSidebar';
import { useAuth } from '@/contexts/AuthContext';

const CommitteePortalLayout: React.FC = () => {
  console.log('CommitteePortalLayout rendering');
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex h-screen bg-background">
      <CommitteeSidebar onLogout={handleLogout} />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div style={{ border: '2px solid red', padding: '20px', backgroundColor: 'yellow' }}>
            <h2>CommitteePortalLayout Content Area</h2>
            <p>If you can see this, the layout is working. The Outlet should render below:</p>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommitteePortalLayout; 