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
import HRSidebar from './HRSidebar';

interface HRPortalLayoutProps {
  children: React.ReactNode;
}

const HRPortalLayout: React.FC<HRPortalLayoutProps> = ({ children }) => {
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
      <HRSidebar onLogout={handleLogout} />
      
      <SidebarInset>
        {/* Minimal Header */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
              <div className="text-sm text-muted-foreground">
                Manpower Management Portal
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* <Button variant="ghost" size="icon">
                <Bell className="h-4 w-4" />
              </Button> */}
              
              {/* <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/api/placeholder/32/32" />
                  <AvatarFallback>
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <div className="font-medium text-foreground">{user.name}</div>
                  <div className="text-muted-foreground capitalize">{user.role}</div>
                </div>
              </div>

              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button> */}
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

export default HRPortalLayout; 