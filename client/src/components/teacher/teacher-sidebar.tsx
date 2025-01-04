'use client';
import { AppSidebar } from '../sidebars/app-sidebar';
// Dynamically import icons to avoid SSR issues
import dynamic from 'next/dynamic';
import { SidebarData } from '@/types/ISidebar';
import useUser from '@/hooks/use-user';
// Dynamically load icons
const SquareTerminalI = dynamic(
  () => import('lucide-react').then((mod) => mod.SquareTerminal),
  { ssr: false }
);
const BotI = dynamic(() => import('lucide-react').then((mod) => mod.Bot), {
  ssr: false,
});
const BookOpenI = dynamic(
  () => import('lucide-react').then((mod) => mod.BookOpen),
  { ssr: false }
);
const CommandI = dynamic(
  () => import('lucide-react').then((mod) => mod.Command),
  { ssr: false }
);
const AudioWaveformI = dynamic(
  () => import('lucide-react').then((mod) => mod.AudioWaveform),
  { ssr: false }
);
const GalleryVerticalEndI = dynamic(
  () => import('lucide-react').then((mod) => mod.GalleryVerticalEnd),
  { ssr: false }
);
const Settings2I = dynamic(
  () => import('lucide-react').then((mod) => mod.Settings2),
  { ssr: false }
);
const FrameI = dynamic(() => import('lucide-react').then((mod) => mod.Frame), {
  ssr: false,
});
const PieChartI = dynamic(
  () => import('lucide-react').then((mod) => mod.PieChart),
  { ssr: false }
);
const MapI = dynamic(() => import('lucide-react').then((mod) => mod.Map), {
  ssr: false,
});

export function TeacherSidebar() {
  const user = useUser(); // Get user data from the custom hook
  // This is sample data.
  const data: SidebarData = {
    user: {
      name: `${user?.firstname} ${user?.lastname}`,
      email: `${user?.email}`,
      avatar: `${user?.avatar}`,
    },
    teams: [
      {
        name: 'EduForm',
        logo: GalleryVerticalEndI,
        plan: 'Plateform',
      },
      {
        name: 'Acme Corp.',
        logo: AudioWaveformI,
        plan: 'Startup',
      },
      {
        name: 'Evil Corp.',
        logo: CommandI,
        plan: 'Free',
      },
    ],
    navMain: [
      {
        title: 'Documents',
        url: '#',
        icon: SquareTerminalI,
        isActive: true,
        items: [
          {
            title: 'Add new Document',
            url: '#',
          },
          {
            title: 'Documents List',
            url: '#',
          },
          {
            title: 'Pricing',
            url: '#',
          },
        ],
      },
      {
        title: 'Models',
        url: '#',
        icon: BotI,
        items: [
          {
            title: 'Genesis',
            url: '#',
          },
          {
            title: 'Explorer',
            url: '#',
          },
          {
            title: 'Quantum',
            url: '#',
          },
        ],
      },
      {
        title: 'Documentation',
        url: '#',
        icon: BookOpenI,
        items: [
          {
            title: 'Introduction',
            url: '#',
          },
          {
            title: 'Get Started',
            url: '#',
          },
          {
            title: 'Tutorials',
            url: '#',
          },
          {
            title: 'Changelog',
            url: '#',
          },
        ],
      },
      {
        title: 'Settings',
        url: '#',
        icon: Settings2I,
        items: [
          {
            title: 'General',
            url: '#',
          },
          {
            title: 'Team',
            url: '#',
          },
          {
            title: 'Billing',
            url: '#',
          },
          {
            title: 'Limits',
            url: '#',
          },
        ],
      },
    ],
    projects: [
      {
        name: 'Design Engineering',
        url: '#',
        icon: FrameI,
      },
      {
        name: 'Sales & Marketing',
        url: '#',
        icon: PieChartI,
      },
      {
        name: 'Travel',
        url: '#',
        icon: MapI,
      },
    ],
  };
  return <AppSidebar data={data} />;
}
