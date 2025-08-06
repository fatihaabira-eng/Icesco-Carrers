import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  Briefcase,
  Calendar,
  Users,
  FileText,
  Settings,
  LogOut,
  Bell,
  Award,
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
  SidebarProvider,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import icescoLogo from '@/assets/logo.png';

// 🧩 Import your actual components
import CommitteeDashboard from '../pages/CommitteeDashboard';
import CommitteeCandidates from '../pages/CommitteeCandidates';
import CommitteeInterviews from '../pages/CommitteeInterviews';
import ProposedInterviews from '../pages/CommitteeInterviews';
import ScheduledInterviews from '../pages/CommitteeInterviews';
import CommitteePositions from '../pages/CommitteeInterviews';
import CompletedInterviews from '../pages/CommitteeInterviews';
import CommitteeEvaluations from '../pages/CommitteeEvaluation';


interface CommitteeSidebarProps {
  onLogout: () => void;
}

const CommitteeSidebar: React.FC<CommitteeSidebarProps> = ({ onLogout }) => {
  const { user } = useAuth();
  const [activeComponent, setActiveComponent] = useState<React.ReactNode>(<CommitteeDashboard />);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Briefcase,
      description: 'Overview and KPIs',
      component: <CommitteeDashboard />
    },
    {
      id: 'interviews',
      label: 'Interviews',
      icon: Calendar,
      description: 'Manage interview schedule',
      component: <CommitteeInterviews />,
      subItems: [
        { id: 'proposed', label: 'Proposed Interviews', component: <ProposedInterviews /> },
        { id: 'scheduled', label: 'Scheduled Interviews', component: <ScheduledInterviews /> },
      ]
    },
    {
      id: 'positions',
      label: 'Positions',
      icon: FileText,
      description: 'View assigned positions',
      component: <CommitteePositions />
    },
    {
      id: 'candidates',
      label: 'Candidates',
      icon: Users,
      description: 'Review candidate profiles',
      component: <CommitteeCandidates />
    },
  ];

  return (
    <SidebarProvider>
      <div className="flex">
        <Sidebar>
          <SidebarHeader className="border-b border-border p-4">
            <div className="flex items-center space-x-3">
              <img src={icescoLogo} alt="ICESCO" className="h-12 w-auto" />
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
                            isActive={false}
                            tooltip={item.description}
                            className="py-6 px-2.5 my-0.5 font-normal"
                            onClick={() => setActiveComponent(item.component)}
                          >
                            <item.icon className="h-4 w-4" />
                            <span>{item.label}</span>
                          </SidebarMenuButton>
                          <SidebarMenuSub>
                            {item.subItems.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.id}>
                                <SidebarMenuSubButton
                                  isActive={false}
                                  onClick={() => setActiveComponent(subItem.component)}
                                >
                                  <span>{subItem.label}</span>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </>
                      ) : (
                        <SidebarMenuButton
                          isActive={false}
                          tooltip={item.description}
                          className="py-6 px-2.5 my-0.5 font-normal"
                          onClick={() => setActiveComponent(item.component)}
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
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
                    Committee Member
                  </div>
                </div>
              </div>
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

        {/* 🔥 Render selected component here */}
        <div className="flex-1 p-6 overflow-auto">
          {activeComponent}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default CommitteeSidebar;
