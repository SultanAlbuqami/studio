export type GuideRouteSummary = Readonly<{
  title: string;
  url: string;
  purpose: string;
  proof: string;
}>;

export const controlTowerGuideName = 'Control Tower Guide';

export const guideRouteSummaries: readonly GuideRouteSummary[] = [
  {
    title: 'Executive Overview',
    url: '/',
    purpose:
      'Starts the story with delivery posture, revenue exposure, intervention demand, and the overall operating signal.',
    proof:
      'Shows that the product opens with decision posture instead of raw reporting.',
  },
  {
    title: 'Delivery Control Tower',
    url: '/delivery',
    purpose:
      'Turns operational slippage into named decisions, accountable owners, and short action windows.',
    proof:
      'Demonstrates execution control and intervention discipline.',
  },
  {
    title: 'Strategic Orders',
    url: '/strategic',
    purpose:
      'Focuses on high-value orders where delivery delays can quickly become revenue timing or confidence issues.',
    proof:
      'Shows commercial awareness, not just service tracking.',
  },
  {
    title: 'Portfolio Explorer',
    url: '/explorer',
    purpose:
      'Lets the audience drill from portfolio level to one project, account, or focus brief with searchable context.',
    proof:
      'Proves the product supports analysis and accountable conversations.',
  },
  {
    title: 'Data Governance',
    url: '/methodology',
    purpose:
      'Explains KPI ownership, thresholds, review forums, and how the numbers stay governable.',
    proof:
      'Answers the credibility question before it is asked.',
  },
  {
    title: 'Deployment Roadmap',
    url: '/deployment',
    purpose:
      'Shows how the demo translates into a production operating model, rollout plan, and enterprise delivery path.',
    proof:
      'Positions the work as an operating platform, not a visual exercise.',
  },
] as const;

const nextRouteByPathname: Record<string, string> = {
  '/': '/delivery',
  '/delivery': '/strategic',
  '/strategic': '/explorer',
  '/explorer': '/methodology',
  '/methodology': '/deployment',
  '/deployment': '/',
};

export function getGuideRouteSummary(pathname: string): GuideRouteSummary {
  return (
    guideRouteSummaries.find((route) => route.url === pathname) ??
    guideRouteSummaries[0]
  );
}

export function getGuideNextRoute(pathname: string): GuideRouteSummary {
  const nextPath = nextRouteByPathname[pathname] ?? '/';
  return getGuideRouteSummary(nextPath);
}

export function buildGuideWelcomeMessages(pathname: string): string[] {
  const currentRoute = getGuideRouteSummary(pathname);

  return [
    `Welcome. I’m the ${controlTowerGuideName}. This product is an executive PMO control tower demo designed to show delivery posture, revenue exposure, accountable interventions, and KPI governance in one operating narrative.`,
    `Fastest way to understand the project:\n1. Executive Overview for portfolio posture\n2. Delivery Control Tower for owner-led intervention\n3. Strategic Orders for revenue protection\n4. Portfolio Explorer for one-project drill-down\n5. Data Governance and Deployment for credibility and rollout\n\nAsk me in English or Arabic if you want a shorter walkthrough.`,
    `You’re currently on ${currentRoute.title}. ${currentRoute.purpose}`,
  ];
}
