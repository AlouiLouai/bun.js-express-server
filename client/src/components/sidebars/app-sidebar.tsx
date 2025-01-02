import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { TeamSwitcher } from './team-switcher';
import { NavMain } from './nav-main';
import { NavProjects } from './nav-projects';
import { NavUser } from './nav-user';
import { SidebarData } from '@/types/sidebar';
import { LucideIcon } from 'lucide-react';

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  data: SidebarData;
}

export function AppSidebar({ data, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        {/* Mapping the icon to LucideIcon */}
        <NavMain
          items={data.navMain.map((item) => ({
            ...item,
            icon: item.icon as LucideIcon, // Explicitly cast to LucideIcon
          }))}
        />
        <NavProjects
          projects={data.projects.map((item) => ({
            ...item,
            icon: item.icon as LucideIcon,
          }))}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
