import { ComponentType } from 'react';

export interface SidebarData {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  teams: {
    name: string;
    logo: ComponentType<React.SVGProps<SVGSVGElement>>; // Allows any SVG component
    plan: string;
  }[]; 
  navMain: {
    title: string;
    url: string;
    icon?: ComponentType<React.SVGProps<SVGSVGElement>>; // Allows any SVG component for icon
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[]; 
  projects: {
    name: string;
    url: string;
    icon: ComponentType<React.SVGProps<SVGSVGElement>>; // Allows any SVG component for project icons
  }[];
}
