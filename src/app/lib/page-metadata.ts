import type { Metadata } from 'next';

type PageMetadataConfig = {
  title: string;
  description: string;
  path: string;
};

const pageMetadataByPath: Record<string, PageMetadataConfig> = {
  '/': {
    title: 'Executive Overview',
    description:
      'Executive PMO control tower for delivery posture, revenue exposure, governance, and intervention priority.',
    path: '/',
  },
  '/briefing': {
    title: 'VP Briefing Pack',
    description:
      'Condensed executive briefing pack for sponsor reviews, ownership alignment, and decision windows.',
    path: '/briefing',
  },
  '/explorer': {
    title: 'Portfolio Explorer',
    description:
      'Searchable portfolio explorer for project exposure, delayed value, and focused operational triage.',
    path: '/explorer',
  },
  '/portfolio': {
    title: 'Salam Service Portfolio',
    description:
      'Officially grounded map of Salam service coverage across consumer, business, and wholesale segments.',
    path: '/portfolio',
  },
  '/booking': {
    title: 'Booking & Fulfillment',
    description:
      'Operational view of order intake, fallout, throughput, backlog aging, and fulfillment yield.',
    path: '/booking',
  },
  '/delivery': {
    title: 'Delivery Control Tower',
    description:
      'Field delivery cockpit for milestone aging, exceptions, recovery decisions, and operational governance.',
    path: '/delivery',
  },
  '/strategic': {
    title: 'Strategic Orders',
    description:
      'High-value delivery and acceptance view for strategic accounts, revenue timing, and executive action.',
    path: '/strategic',
  },
  '/b2c': {
    title: 'B2C Fulfillment',
    description:
      'Consumer fulfillment dashboard for install backlog, dispatch recovery, and customer-promise protection.',
    path: '/b2c',
  },
  '/escalations': {
    title: 'Escalations & Recovery',
    description:
      'Recovery management view for escalation severity, MTTR performance, ownership, and SLA-breach risk.',
    path: '/escalations',
  },
  '/deployment': {
    title: 'From Demo to Live Deployment',
    description:
      'Roadmap from executive demo to governed production deployment with semantic modeling and ownership controls.',
    path: '/deployment',
  },
  '/methodology': {
    title: 'Data Governance & Methodology',
    description:
      'KPI dictionary, governance rules, escalation logic, and operating assumptions behind the control tower.',
    path: '/methodology',
  },
};

export function getPageMetadata(pathname: string): PageMetadataConfig {
  return (
    pageMetadataByPath[pathname] ?? {
      title: 'Control Tower',
      description:
        'Executive PMO dashboard for delivery governance, portfolio posture, and recovery decisions.',
      path: pathname,
    }
  );
}

export function buildPageMetadata(pathname: string): Metadata {
  const page = getPageMetadata(pathname);

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: page.path,
    },
    openGraph: {
      title: `${page.title} | Salam PMO Control Tower`,
      description: page.description,
      url: `https://pmo-sultan.vercel.app${page.path}`,
      siteName: 'Salam PMO Control Tower',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${page.title} | Salam PMO Control Tower`,
      description: page.description,
    },
  };
}
