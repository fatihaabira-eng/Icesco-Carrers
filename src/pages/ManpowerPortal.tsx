import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Users, 
  FileText, 
  Calendar, 
  Settings,
  LogOut,
  Bell,
  Shield,
  UserCheck,
  Briefcase,
  BarChart3,
  CalendarPlus,
  ClipboardList,
  Database
} from 'lucide-react';
import HRControlCenter from './HRControlCenter';
import CommitteeEvaluation from './CommitteeEvaluation';
import DirectorView from './DirectorView';
import RecruitmentAnalytics from './RecruitmentAnalytics';
import GlobalAnalyticsDashboard from '@/components/GlobalAnalyticsDashboard';
import JobMatchingModule from '@/components/JobMatchingModule';
import ScheduleInterview from './ScheduleInterview';
import InterviewManagement from './InterviewManagement';
import icescoLogo from "@/assets/logo.png";
import CVTechPage from './CVTechPage';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import CreateJobOfferForm from '@/components/CreateJobOfferForm';

interface ManpowerPortalProps {
  defaultRole?: 'hr' | 'committee' | 'director';
}

const ManpowerPortal: React.FC<ManpowerPortalProps> = ({ defaultRole }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('dashboard');

  const currentUserRole = defaultRole || user?.role || 'hr';

  useEffect(() => {
    if (!user) {
      navigate('/manpower/auth');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/manpower/auth');
  };

  const handleCVTechNavigation = () => {
    navigate('/manpower/hr/cvtech');
  };

  if (!user) {
    return null;
  }

  const renderUserSpecificInterface = () => {
    switch (currentUserRole) {
      case 'hr':
        return (
          <div className="space-y-6">
            <GlobalAnalyticsDashboard userRole="hr" />
            <JobMatchingModule />
          </div>
        );
      case 'committee':
        return (
          <div className="space-y-6">
            <GlobalAnalyticsDashboard userRole="committee" />
            <JobMatchingModule />
          </div>
        );
      case 'director':
        return (
          <div className="space-y-6">
            <GlobalAnalyticsDashboard userRole="director" />
            <DirectorView />
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <GlobalAnalyticsDashboard userRole="hr" />
            <JobMatchingModule />
          </div>
        );
    }
  };

  const renderAnalytics = () => {
    return <RecruitmentAnalytics />;
  };

  const renderScheduleInterview = () => {
    return <ScheduleInterview />;
  };

  const renderInterviewManagement = () => {
    return <InterviewManagement />;
  };
  const renderCVTech = () => {
    return <CVTechPage />;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-3">
            <img 
              src={icescoLogo} 
              alt="ICESCO" 
              className="h-12 w-auto"
            />
          </Link>

            
            {/* User Role Badge */}
            <div className="flex items-center space-x-2 ml-8">
              <div className="flex items-center space-x-2 px-3 py-1 bg-primary/10 rounded-full">
                {currentUserRole === 'hr' && <Shield className="h-4 w-4 text-primary" />}
                {currentUserRole === 'committee' && <UserCheck className="h-4 w-4 text-primary" />}
                {currentUserRole === 'director' && <Users className="h-4 w-4 text-primary" />}
                <span className="text-sm font-medium text-primary">
                  {currentUserRole === 'hr' && 'ManPower Management Dashboard'}
                  {currentUserRole === 'committee' && 'ManPower Management Dashboard'}
                  {currentUserRole === 'director' && 'ManPower Management Dashboard'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Navigation Tabs */}
            <div className="flex space-x-2">
              <Button 
                variant={activeView === 'dashboard' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setActiveView('dashboard')}
              >
                <Briefcase className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <Button 
                variant={activeView === 'analytics' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setActiveView('analytics')}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
              {currentUserRole === 'hr' && (
                <>
                  <Button 
                    variant={activeView === 'cvtech' ? 'default' : 'ghost'} 
                    size="sm"
                    onClick={() => setActiveView('CVTech')}
                  >
                    <Database className="h-4 w-4 mr-2" />
                    Resume Library
                  </Button>
                  <Button 
                    variant={activeView === 'schedule' ? 'default' : 'ghost'} 
                    size="sm"
                    onClick={() => setActiveView('schedule')}
                  >
                    <CalendarPlus className="h-4 w-4 mr-2" />
                    Schedule
                  </Button>
                  <Button 
                    variant={activeView === 'interviews' ? 'default' : 'ghost'} 
                    size="sm"
                    onClick={() => setActiveView('interviews')}
                  >
                    <ClipboardList className="h-4 w-4 mr-2" />
                    Interviews
                  </Button>
                </>
              )}
            </div>

            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/api/placeholder/40/40" />
                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <div className="font-medium text-foreground">{user.name}</div>
                <div className="text-muted-foreground capitalize">{user.role}</div>
              </div>
            </div>

            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="h-[calc(100vh-80px)] overflow-auto">
        <div className="p-6">
          {activeView === 'dashboard' && renderUserSpecificInterface()}
          {activeView === 'analytics' && renderAnalytics()}
          {activeView === 'schedule' && renderScheduleInterview()}
          {activeView === 'interviews' && renderInterviewManagement()}
          {activeView === 'CVTech' && renderCVTech()}
        </div>
      </main>
    </div>
  );
};

export default ManpowerPortal;