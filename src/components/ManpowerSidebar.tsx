import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  BarChart3,
  Database,
  CalendarPlus,
  ClipboardList,
  PlusCircle,
  Users,
  FileText,
  UserCheck,
  Settings,
  LogOut,
  Briefcase,
} from 'lucide-react';

interface ManpowerSidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  onLogout: () => void;
  onCVTechNavigation: () => void;
}

const ManpowerSidebar: React.FC<ManpowerSidebarProps> = ({
  activeView,
  onViewChange,
  onLogout,
  onCVTechNavigation,
}) => {
  const { user } = useAuth();
  const { state } = useSidebar();
  const location = useLocation();
  const currentUserRole = user?.role || 'hr';

  const getMenuItems = () => {
    const baseItems = [
      {
        title: 'Dashboard',
        icon: LayoutDashboard,
        view: 'dashboard',
        roles: ['hr', 'committee', 'director'],
      },
      {
        title: 'Analytics',
        icon: BarChart3,
        view: 'analytics',
        roles: ['hr', 'committee', 'director'],
      },
    ];

    const roleSpecificItems = [];

    if (currentUserRole === 'hr') {
      roleSpecificItems.push(
        {
          title: 'Create Job Offer',
          icon: PlusCircle,
          view: 'create-job',
          roles: ['hr'],
        },
        {
          title: 'CV Tech',
          icon: Database,
          view: 'cvtech',
          roles: ['hr'],
          onClick: onCVTechNavigation,
        },
        {
          title: 'Schedule Interview',
          icon: CalendarPlus,
          view: 'schedule',
          roles: ['hr'],
        },
        {
          title: 'Interview Management',
          icon: ClipboardList,
          view: 'interviews',
          roles: ['hr'],
        }
      );
    }

    if (currentUserRole === 'committee') {
      roleSpecificItems.push(
        {
          title: 'Candidate Evaluations',
          icon: UserCheck,
          view: 'evaluations',
          roles: ['committee'],
        },
        {
          title: 'Interview Management',
          icon: ClipboardList,
          view: 'interviews',
          roles: ['committee'],
        }
      );
    }

    if (currentUserRole === 'director') {
      roleSpecificItems.push(
        {
          title: 'Department Overview',
          icon: Users,
          view: 'department',
          roles: ['director'],
        },
        {
          title: 'Interview Management',
          icon: ClipboardList,
          view: 'interviews',
          roles: ['director'],
        }
      );
    }

    return [...baseItems, ...roleSpecificItems].filter(item =>
      item.roles.includes(currentUserRole)
    );
  };

  const menuItems = getMenuItems();

  const getRoleBadgeIcon = () => {
    switch (currentUserRole) {
      case 'hr':
        return <Briefcase className="h-4 w-4" />;
      case 'committee':
        return <UserCheck className="h-4 w-4" />;
      case 'director':
        return <Users className="h-4 w-4" />;
      default:
        return <Briefcase className="h-4 w-4" />;
    }
  };

  const getRoleTitle = () => {
    switch (currentUserRole) {
      case 'hr':
        return 'HR Portal';
      case 'committee':
        return 'Committee Portal';
      case 'director':
        return 'Director Portal';
      default:
        return 'HR Portal';
    }
  };

  return (
    <Sidebar className="bg-primary border-r-0">
      <SidebarHeader className="p-4 border-b border-primary-light/20">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-white/10 rounded-lg">
            <Briefcase className="h-6 w-6 text-white" />
          </div>
          {state === 'expanded' && (
            <div>
              <h1 className="text-lg font-bold text-white">ICESCO</h1>
              <p className="text-sm text-primary-light">{getRoleTitle()}</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary-light/80 font-semibold text-xs uppercase tracking-wider mb-2">
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.view}>
                  <SidebarMenuButton
                    asChild
                    isActive={activeView === item.view}
                    className="text-white hover:bg-white/10 data-[active=true]:bg-white/20 data-[active=true]:text-white font-semibold"
                  >
                    <button
                      onClick={() => {
                        if (item.onClick) {
                          item.onClick();
                        } else {
                          onViewChange(item.view);
                        }
                      }}
                      className="flex items-center w-full"
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      {state === 'expanded' && <span>{item.title}</span>}
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Profile Section */}
        <div className="mt-auto pt-4 border-t border-primary-light/20">
          <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/api/placeholder/40/40" />
              <AvatarFallback className="bg-white/10 text-white text-xs">
                {user?.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            {state === 'expanded' && (
              <div className="flex-1">
                <div className="text-sm font-medium text-white truncate">
                  {user?.name}
                </div>
                <div className="flex items-center space-x-1 text-xs text-primary-light">
                  {getRoleBadgeIcon()}
                  <span className="capitalize">{user?.role}</span>
                </div>
              </div>
            )}
          </div>

          {/* Settings and Logout */}
          <div className="flex flex-col space-y-1 mt-3">
            <Button
              variant="ghost"
              size="sm"
              className="justify-start text-white hover:bg-white/10 font-semibold"
            >
              <Settings className="h-4 w-4 mr-3" />
              {state === 'expanded' && <span>Settings</span>}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="justify-start text-white hover:bg-white/10 font-semibold"
            >
              <LogOut className="h-4 w-4 mr-3" />
              {state === 'expanded' && <span>Logout</span>}
            </Button>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default ManpowerSidebar;