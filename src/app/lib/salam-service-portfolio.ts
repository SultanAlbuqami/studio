export type SalamOfficialSource = Readonly<{
  id: string;
  label: string;
  url: string;
  note: string;
}>;

export type SalamServiceCategory = Readonly<{
  name: string;
  summary: string;
  services: readonly string[];
  operationalLens: string;
}>;

export type SalamServiceRoute = Readonly<{
  title: string;
  url: string;
  reason: string;
}>;

export type SalamServiceSegment = Readonly<{
  key: 'consumer' | 'business' | 'wholesale';
  title: string;
  subtitle: string;
  audience: string;
  overview: string;
  controlTowerLens: string;
  categories: readonly SalamServiceCategory[];
  mappedRoutes: readonly SalamServiceRoute[];
  officialSourceIds: readonly SalamOfficialSource['id'][];
}>;

export const salamOfficialSources: readonly SalamOfficialSource[] = [
  {
    id: 'consumer-portal',
    label: 'Salam Consumer Portal',
    url: 'https://dxp.salam.sa/ar/consumer/',
    note:
      'Consumer entry point for mobile and home-internet journeys, self-service, payments, and plan discovery.',
  },
  {
    id: 'consumer-support',
    label: 'Salam Consumer Help & Support',
    url: 'https://dxp.salam.sa/en/consumer/help--support',
    note:
      'Support reference for My Salam, home internet, mobile services, visitor packages, and travel help.',
  },
  {
    id: 'business-site',
    label: 'Salam Business Services',
    url: 'https://salam.sa/ar/business',
    note:
      'Official business-services landing page covering internet, cloud, voice, security, managed services, and data connectivity.',
  },
  {
    id: 'business-portfolio',
    label: 'Salam Business Product Portfolio',
    url: 'https://salam.sa/content/dam/salam/documents/en/business/product-portfolio-en.pdf',
    note:
      'Detailed portfolio guide for enterprise service families and named offers.',
  },
  {
    id: 'wholesale-site',
    label: 'Salam Wholesale',
    url: 'https://salam.sa/ar/business/wholesale',
    note:
      'Wholesale portfolio covering carrier connectivity, transport, interconnect, and infrastructure footprint.',
  },
] as const;

export const salamServiceSegments: readonly SalamServiceSegment[] = [
  {
    key: 'consumer',
    title: 'Consumer',
    subtitle: 'Residential and personal connectivity',
    audience: 'Households, individuals, and mobile-first users',
    overview:
      'The consumer estate is centered on mobile, home internet, self-service, and fast onboarding journeys rather than enterprise project delivery alone.',
    controlTowerLens:
      'Control requires clean booking, installation capacity, bill-care visibility, digital support readiness, and fast recovery on customer-promise breaches.',
    categories: [
      {
        name: 'Mobile journeys',
        summary:
          'The public portal centers on mobile plan discovery and digital activation flows.',
        services: ['Mobile plans', 'eSIM activation', 'SIM onboarding'],
        operationalLens:
          'Track activation fallout, number-porting friction, and mobile-support demand.',
      },
      {
        name: 'Home connectivity',
        summary:
          'Salam consumer channels prominently feature home internet and fiber-style household connectivity.',
        services: ['Home internet', 'Fiber packages', 'Home WiFi / 5G home access'],
        operationalLens:
          'Track appointment promises, install lead time, and repeat-visit risk.',
      },
      {
        name: 'Billing and recharge',
        summary:
          'The portal emphasizes self-service for bill payment and recharge.',
        services: ['Bill payment', 'Recharge', 'Account self-service'],
        operationalLens:
          'Watch payment success, bill disputes, and digital-care containment.',
      },
      {
        name: 'Travel and visitor support',
        summary:
          'Consumer support references visitor packages and travel-oriented support flows.',
        services: ['Visitor packages', 'Travel with Salam'],
        operationalLens:
          'Monitor seasonal spikes, onboarding speed, and support-script readiness.',
      },
      {
        name: 'Digital care',
        summary:
          'Support channels reference My Salam and guided help content for consumer operations.',
        services: ['My Salam', 'Help & support knowledge base'],
        operationalLens:
          'Measure self-serve deflection, repeat contacts, and app-care stability.',
      },
    ],
    mappedRoutes: [
      {
        title: 'B2C Fulfillment',
        url: '/b2c',
        reason: 'Consumer installation pressure, dispatch ownership, and appointment assurance.',
      },
      {
        title: 'Booking & Fulfillment',
        url: '/booking',
        reason: 'Order capture, backlog aging, and fallout before installs or activations slip.',
      },
      {
        title: 'Escalations & Recovery',
        url: '/escalations',
        reason: 'Complaint spikes, field recovery, and SLA or promise breaches.',
      },
    ],
    officialSourceIds: ['consumer-portal', 'consumer-support'],
  },
  {
    key: 'business',
    title: 'Business',
    subtitle: 'Enterprise, government, and SME services',
    audience: 'Enterprise accounts, strategic programs, public sector, and SME customers',
    overview:
      'Salam Business spans connectivity, voice, cybersecurity, managed services, cloud, and national or international data connectivity across enterprise-scale use cases.',
    controlTowerLens:
      'This is the core PMO operating estate: orders, milestones, acceptance, service assurance, revenue release, and recovery ownership across complex B2B delivery chains.',
    categories: [
      {
        name: 'Internet Services',
        summary:
          'Core enterprise connectivity offers for business internet and bundled access.',
        services: [
          'Business Broadband',
          'Dedicated Internet',
          'IPVPN',
          'Internet Bundle',
          'Business in a Box',
        ],
        operationalLens:
          'Track order capture, provisioning readiness, and delivery lead-time adherence.',
      },
      {
        name: 'Voice Services',
        summary:
          'Enterprise voice and collaboration offers exposed in the official business catalog.',
        services: ['SIP Trunk', 'IP Centrex'],
        operationalLens:
          'Track activation quality, cutover windows, and service continuity risk.',
      },
      {
        name: 'Cyber Security Services',
        summary:
          'Managed security portfolio supporting enterprise protection and monitoring.',
        services: [
          'Managed Firewall',
          'Managed DDoS',
          'Managed IPS',
          'Managed Web Security',
          'Managed Endpoint',
          'Managed SIEM',
          'Managed Email Security',
          'Managed Cloud Security',
        ],
        operationalLens:
          'Track provisioning dependencies, policy onboarding, and SOC handoff quality.',
      },
      {
        name: 'Managed Services',
        summary:
          'Operationally intensive services where Salam carries more of the run-state responsibility.',
        services: [
          'Infrastructure Managed Services',
          'Network Managed Services',
          'Managed Internet',
          'Managed SD-WAN',
        ],
        operationalLens:
          'Track steady-state assurance, incident ownership, and change-window discipline.',
      },
      {
        name: 'Cloud Services',
        summary:
          'Cloud, hosting, backup, and data-center-adjacent services listed in the product portfolio.',
        services: [
          'Data Center Co-location',
          'Infrastructure as a Service',
          'Backup as a Service',
          'Storage as a Service',
          'Disaster Recovery as a Service',
          'Web Hosting',
        ],
        operationalLens:
          'Track infrastructure readiness, acceptance gating, and revenue-recognition timing.',
      },
      {
        name: 'National Data Connectivity',
        summary:
          'Domestic data transport and enterprise connectivity within Saudi Arabia.',
        services: ['National MPLS / IPVPN', 'National Wavelengths', 'Local Transit'],
        operationalLens:
          'Track route readiness, field dependencies, and intra-Kingdom resiliency commitments.',
      },
      {
        name: 'International Data Connectivity',
        summary:
          'Cross-border enterprise and carrier connectivity exposed in the business portfolio.',
        services: ['IPLC', 'IP Transit', 'International MPLS'],
        operationalLens:
          'Track partner dependencies, cross-border cutover windows, and latency-sensitive escalations.',
      },
      {
        name: 'Specialized access',
        summary:
          'Edge and special-access options referenced on the business site.',
        services: ['VSAT'],
        operationalLens:
          'Track remote-site readiness, hardware lead time, and field-service recovery.',
      },
    ],
    mappedRoutes: [
      {
        title: 'Delivery Control Tower',
        url: '/delivery',
        reason: 'Field milestones, acceptance, and delivery exceptions across enterprise orders.',
      },
      {
        title: 'Strategic Orders',
        url: '/strategic',
        reason: 'High-value B2B orders where slippage becomes revenue or confidence risk.',
      },
      {
        title: 'Portfolio Explorer',
        url: '/explorer',
        reason: 'Case-by-case drill-down by account, service, region, and program.',
      },
    ],
    officialSourceIds: ['business-site', 'business-portfolio'],
  },
  {
    key: 'wholesale',
    title: 'Wholesale',
    subtitle: 'Carrier, operator, and infrastructure-grade capacity',
    audience: 'Carriers, operators, hyperscalers, and wholesale partners',
    overview:
      'Salam Wholesale is positioned around carrier-grade transport, global connectivity, interconnect, and infrastructure footprint rather than retail-style service journeys.',
    controlTowerLens:
      'Wholesale governance is about capacity delivery, change windows, failover posture, partner confidence, and contract-grade SLA exposure.',
    categories: [
      {
        name: 'Connectivity and transport',
        summary:
          'The wholesale page highlights carrier and partner transport products for national and international reach.',
        services: [
          'Global Ethernet',
          'IP-VPN',
          'IPLC',
          'IP Transit',
          'DWDM',
          'Dedicated Internet',
        ],
        operationalLens:
          'Track capacity turn-up, failover readiness, and partner-impacting latency or route risk.',
      },
      {
        name: 'Interconnect and voice',
        summary:
          'Wholesale coverage includes interconnect-style solutions and enterprise voice adjacency.',
        services: ['Business SIP Trunk'],
        operationalLens:
          'Track routing stability, maintenance windows, and service-impacting recoveries.',
      },
      {
        name: 'Infrastructure footprint',
        summary:
          'The public wholesale narrative emphasizes physical network depth and access footprint.',
        services: [
          'Colocation',
          'SNFN 19,000 km network footprint',
          'Regional gateways via Jordan, UAE, Qatar, Bahrain, Kuwait, and Iraq',
          'Landing stations in Al Khobar and Jeddah',
        ],
        operationalLens:
          'Track infrastructure resilience, partner dependencies, and network-wide recovery posture.',
      },
    ],
    mappedRoutes: [
      {
        title: 'Strategic Orders',
        url: '/strategic',
        reason: 'Carrier-grade orders and high-value capacity programs.',
      },
      {
        title: 'Escalations & Recovery',
        url: '/escalations',
        reason: 'Latency, failover, and service-stability incidents with wholesale impact.',
      },
      {
        title: 'Deployment Roadmap',
        url: '/deployment',
        reason: 'How a telecom control tower scales into a production-grade operating platform.',
      },
    ],
    officialSourceIds: ['wholesale-site'],
  },
] as const;

export const salamOfficialSourceById = Object.fromEntries(
  salamOfficialSources.map((source) => [source.id, source]),
) as Record<SalamOfficialSource['id'], SalamOfficialSource>;

export const salamServiceCoverageSummary = {
  segments: salamServiceSegments.length,
  categories: salamServiceSegments.reduce(
    (sum, segment) => sum + segment.categories.length,
    0,
  ),
  namedOffers: salamServiceSegments.reduce(
    (sum, segment) =>
      sum +
      segment.categories.reduce(
        (categorySum, category) => categorySum + category.services.length,
        0,
      ),
    0,
  ),
  officialSources: salamOfficialSources.length,
} as const;

export function getOfficialSourcesForSegment(
  segment: SalamServiceSegment,
): SalamOfficialSource[] {
  return segment.officialSourceIds
    .map((sourceId) => salamOfficialSourceById[sourceId])
    .filter(Boolean);
}
