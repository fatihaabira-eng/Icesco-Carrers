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
  Building,
  Settings,
  LogOut,
  Bell,
  User,
  Shield
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
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import icescoLogo from "@/assets/logo.png";
import { cn } from '@/lib/utils';

interface HRSidebarProps {
  onLogout: () => void;
}

const HRSidebar: React.FC<HRSidebarProps> = ({ onLogout }) => {
  const { user } = useAuth();
  const location = useLocation();

  const menuItems = [
    
    {
      id: 'bu-manpower-management',
      label: 'BU Manpower Management',
      icon: FileText,
      description: 'Manage BU Manpower',
      path: '/manpower/director/bu-manpower-management'
    },
    // {
    //   id: 'dashboard',
    //   label: 'Dashboard',
    //   icon: Briefcase,
    //   description: 'Overview and KPIs',
    //   path: '/manpower/bu'
    // },
    {
      id: 'interviews',
      label: 'Interviews',
      icon: BarChart3,
      description: 'Recruitment metrics',
      path: '/manpower/director/interviews'
    },
    {
      id: 'candidates',
      label: 'Candidates',
      icon: Users,
      description: 'Manage applications',
      path: '/manpower/director/candidates'
    },
    {
      id: 'offers',
      label: 'Offers',
      icon: FileText,
      description: 'Manage Offers',
      path: '/manpower/director/offers'
    }
  ];

  const isActive = (path: string) => {
    // For exact match on dashboard
    if (path === '/manpower/director') {
      return location.pathname === '/manpower/director';
    }
    // For other paths, check if current path starts with the menu path
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src={icescoLogo} 
              alt="ICESCO" 
              className="h-8 w-auto"
            />
          </Link>
         
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.description}
                    className={cn(
                      "data-[active=true]:bg-[#0f7378] data-[active=true]:text-white",
                      "hover:bg-[#0f7378]/10 hover:text-[#0f7378]",
                      isActive(item.path) && "bg-[#0f7378] text-white"
                    )}
                  >
                    <Link to={item.path}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
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