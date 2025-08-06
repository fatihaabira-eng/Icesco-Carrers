import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  SidebarProvider, 
  SidebarInset, 
  SidebarTrigger 
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Settings } from 'lucide-react';
import BUSidebar from './BUSidebar';

interface BUPortalLayoutProps {
  children: React.ReactNode;
}

const BUPortalLayout: React.FC<BUPortalLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/manpower/auth');
  };

  if (!user) {
    return null;
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <BUSidebar onLogout={handleLogout} />

      <SidebarInset>
        {/* Minimal Header */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
              <div className="text-sm text-muted-foreground">
                BU Management Portal
              </div>
            </div>

           
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default BUPortalLayout;