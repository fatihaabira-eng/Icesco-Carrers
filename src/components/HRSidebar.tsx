import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Briefcase, 
  BarChart3, 
  Users, 
  Database, 
  Calendar, 
  FileText, 
  Settings,
  LogOut,
  Bell,
  User,
  Shield,
  Award,
  Building
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import icescoLogo from "@/assets/logo.png";

interface HRSidebarProps {
  onLogout: () => void;
}

const HRSidebar: React.FC<HRSidebarProps> = ({ onLogout }) => {
  const { user } = useAuth();
  const location = useLocation();

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Briefcase,
      description: 'Overview and KPIs',
      path: '/manpower/hr/dashboard'
    },
    {
      id: 'job-offers',
      label: 'Job Offers',
      icon: FileText,
      description: 'Create & manage offers',
      path: '/manpower/hr/job-offers'
    },
    {
      id: 'interviews',
      label: 'Interviews',
      icon: Calendar,
      description: 'Schedule & manage',
    
      subItems: [
        { id: 'schedule', label: 'Schedule Interview', path: '/manpower/hr/interviews/schedule' },
        { id: 'management', label: 'Interview Management', path: '/manpower/hr/interviews/management' },
      ]
    },
    // {
    //   id: 'bu-manpower',
    //   label: 'BU Manpower Management',
    //   icon: Building,
    //   description: 'Manage recruitment across business units',
    //   path: '/manpower/hr'
    // },
    // {
    //   id: 'analytics',
    //   label: 'Analytics',
    //   icon: BarChart3,
    //   description: 'Recruitment metrics',
    //   path: '/manpower/hr/analytics'
    // },
    {
      id: 'candidates',
      label: 'Candidates',
      icon: Users,
      description: 'Manage applications',
      path: '/manpower/hr/candidates',
      subItems: [
        // { id: 'pipeline', label: 'Pipeline View', path: '/manpower/hr/candidates/pipeline' },
        { id: 'matching', label: 'Job Matching Review', path: '/manpower/hr/candidates/matching' },
        {
      id: 'assessment-scores',
      label: 'Assessment Scores',
      icon: Award,
      description: 'Candidate evaluation scores',
      path: '/manpower/hr/assessment-scores'
    },
      ]
    },
    // {
    //   id: 'resume-library',
    //   label: 'Resume Library',
    //   icon: Database,
    //   description: 'CV processing & storage',
    //   path: '/manpower/hr/resume-library'
    // },
    
    
    

  ];

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const isSubActive = (subPath: string) => {
    return location.pathname === subPath;
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center space-x-3">
          <Link to="/manpower" className="flex items-center space-x-3">
            <img 
              src={icescoLogo} 
              alt="ICESCO" 
              className="h-16 w-auto"
            />
          </Link>
          {/* <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">HR Portal</span>
          </div> */}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  {item.subItems ? (
                    <>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive(item.path)}
                        tooltip={item.description}
                        className={`${isActive(item.path) ? 'bg-[#0F7378] text-white !important' : ''} py-6 px-2.5 my-0.5 font-normal`}
                      >
                        <Link to={item.path}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                      <SidebarMenuSub>
                        {item.subItems.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.id}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={isSubActive(subItem.path)}
                            >
                              <Link to={subItem.path}>
                                <span>{subItem.label}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </>
                  ) : (
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.path)}
                      tooltip={item.description}
                      className={`${isActive(item.path) ? 'bg-[#0F7378] text-white !important' : ''} py-6 px-2.5 my-0.5 font-normal`}
                    >
                      <Link to={item.path}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-4">
        <div className="space-y-4">
          {/* User Info */}
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/api/placeholder/32/32" />
              <AvatarFallback>
                {user?.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-foreground truncate">
                {user?.name}
              </div>
              <div className="text-xs text-muted-foreground capitalize">
                {user?.role}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={onLogout}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default HRSidebar; 