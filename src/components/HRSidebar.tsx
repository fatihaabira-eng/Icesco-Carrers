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
  SidebarGroupLabel,
  SidebarGroupContent,
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
    {
      id: 'candidates',
      label: 'Candidates',
      icon: Users,
      description: 'Manage applications',
      subItems: [
       
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
  ];

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const isSubActive = (subPath: string) => {
    return location.pathname === subPath;
  };

  return (
    <Sidebar className="bg-background shadow-sm">
      {/* Header with responsive logo */}
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center space-x-3">
          <Link to="/manpower" className="flex items-center space-x-3">
            <img 
              src={icescoLogo} 
              alt="ICESCO" 
              className="h-12 w-auto max-w-[120px] object-contain" // Responsive logo
            />
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground px-4 py-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  {item.subItems ? (
                    <>
                      {/* Main menu item with prominent styling */}
                      <SidebarMenuButton
                        asChild
                        isActive={isActive(item.path)}
                        tooltip={item.description}
                        className={`
                          ${isActive(item.path) ? 'bg-[#0F7378] text-white' : 'text-foreground hover:bg-[#0F7378]/10'}
                          py-3 px-4 my-0.5 font-medium text-sm transition-colors duration-200 rounded-md
                        `}
                      >
                        <Link to={item.path}>
                          <item.icon className="h-5 w-5 mr-2" /> {/* Slightly larger icon */}
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                      <SidebarMenuSub>
                        {item.subItems.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.id}>
                            {/* Submenu item with lighter styling */}
                            <SidebarMenuSubButton
                              asChild
                              isActive={isSubActive(subItem.path)}
                              className={`
                                ${isSubActive(subItem.path) ? 'bg-[#0F7378]/10 text-[#0F7378]' : 'text-muted-foreground hover:bg-[#0F7378]/5'}
                                pl-8 py-2 text-sm font-normal transition-colors duration-200 rounded-md
                              `}
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
                      className={`
                        ${isActive(item.path) ? 'bg-[#0F7378] text-white' : 'text-foreground hover:bg-[#0F7378]/10'}
                        py-3 px-4 my-0.5 font-medium text-sm transition-colors duration-200 rounded-md
                      `}
                    >
                      <Link to={item.path}>
                        <item.icon className="h-5 w-5 mr-2" />
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
        <div className="space-y-3">
          {/* User Info with compact layout */}
          <div className="flex items-center space-x-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/api/placeholder/36/36" />
              <AvatarFallback className="text-xs">
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

          {/* Action Buttons with compact design */}
          <div className="flex items-center space-x-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 hover:bg-[#0F7378]/10"
            >
              <Bell className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 hover:bg-[#0F7378]/10"
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 hover:bg-[#0F7378]/10"
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