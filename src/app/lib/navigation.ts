import type { LucideIcon } from 'lucide-react';
import {
  AlertTriangle,
  BookOpen,
  ClipboardList,
  LayoutDashboard,
  Rocket,
  Search,
  Star,
  TowerControl,
  Truck,
  Users,
} from 'lucide-react';

export type AppNavigationItem = Readonly<{
  title: string;
  url: string;
  icon: LucideIcon;
  section: 'Overview' | 'Operations' | 'Reference';
}>;

export const overviewNavigationItems: readonly AppNavigationItem[] = [
  {
    title: 'Executive Overview',
    url: '/',
    icon: LayoutDashboard,
    section: 'Overview',
  },
  {
    title: 'Portfolio Explorer',
    url: '/explorer',
    icon: Search,
    section: 'Overview',
  },
] as const;

export const operationsNavigationItems: readonly AppNavigationItem[] = [
  {
    title: 'Booking & Fulfillment',
    url: '/booking',
    icon: ClipboardList,
    section: 'Operations',
  },
  {
    title: 'Delivery Control Tower',
    url: '/delivery',
    icon: Truck,
    section: 'Operations',
  },
  {
    title: 'Strategic Orders',
    url: '/strategic',
    icon: Star,
    section: 'Operations',
  },
  {
    title: 'B2C Fulfillment',
    url: '/b2c',
    icon: Users,
    section: 'Operations',
  },
  {
    title: 'Escalations & Recovery',
    url: '/escalations',
    icon: AlertTriangle,
    section: 'Operations',
  },
] as const;

export const referenceNavigationItems: readonly AppNavigationItem[] = [
  {
    title: 'Deployment Roadmap',
    url: '/deployment',
    icon: Rocket,
    section: 'Reference',
  },
  {
    title: 'Data Governance',
    url: '/methodology',
    icon: BookOpen,
    section: 'Reference',
  },
] as const;

const allNavigationItems = [
  ...overviewNavigationItems,
  ...operationsNavigationItems,
  ...referenceNavigationItems,
];

export function getNavigationItem(pathname: string): AppNavigationItem {
  return (
    allNavigationItems.find((item) => item.url === pathname) ?? {
      title: 'Control Tower',
      url: pathname || '/',
      icon: TowerControl,
      section: 'Overview',
    }
  );
}
