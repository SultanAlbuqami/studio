import type { DashboardInput } from '@/ai/flows/ai-powered-executive-briefing';
import {
  type DecisionRegion,
  type FocusDetail,
  type OperatingDecision,
  operatingDecisionById,
  operatingDecisions,
} from './dashboard-core-data';
import { executiveInterventions } from './dashboard-executive-data';

export const executionTrendChartData = [
  { week: 'Week 34', deliveries: 125, target: 130 },
  { week: 'Week 35', deliveries: 138, target: 135 },
  { week: 'Week 36', deliveries: 132, target: 140 },
  { week: 'Week 37', deliveries: 145, target: 145 },
  { week: 'Week 38', deliveries: 158, target: 150 },
  { week: 'Week 39', deliveries: 162, target: 155 },
];

export const portfolioDistributionData = [
  { name: 'On Track', value: 72, fill: 'hsl(var(--chart-1))' },
  { name: 'At Risk', value: 18, fill: 'hsl(var(--chart-4))' },
  { name: 'Delayed', value: 10, fill: 'hsl(var(--destructive))' },
];

export const bookingFulfillmentData = {
  newOrdersMTD: 342,
  cancelledOrdersMTD: 12,
  averageBookingToBillingDays: 24.5,
  onTimeFulfillmentRate: 87.6,
  orderFalloutRate: 3.8,
  throughputByRegion: [
    { region: "Central", volume: 145, growth: "+12%" },
    { region: "Western", volume: 98, growth: "+5%" },
    { region: "Eastern", volume: 76, growth: "-2%" },
    { region: "Southern", volume: 23, growth: "+18%" },
  ],
  orderAgeDistribution: [
    { bucket: "0\u20137d", orders: 124 },
    { bucket: "8\u201314d", orders: 87 },
    { bucket: "15\u201330d", orders: 68 },
    { bucket: "31\u201360d", orders: 41 },
    { bucket: "60d+", orders: 22 },
  ],
  fulfillmentFunnel: [
    { stage: "Orders Received", count: 342 },
    { stage: "Validated", count: 329 },
    { stage: "Provisioning", count: 298 },
    { stage: "Activated", count: 261 },
    { stage: "Billed", count: 248 },
  ],
};

export const deliveryMilestones = [
  { stage: "Site Survey", count: 420, status: "completed", avgDays: 3.2, overdue: 0 },
  { stage: "Civil Works", count: 310, status: "in-progress", avgDays: 18.6, overdue: 47 },
  { stage: "Equipment Install", count: 245, status: "pending", avgDays: 12.4, overdue: 31 },
  { stage: "UAT / Acceptance", count: 184, status: "at-risk", avgDays: 8.9, overdue: 28 },
];

export const deliveryKpis = {
  firstTimeRight: 91.3,
  avgCycleTime: 43.1,
  cycleTimeTrend: "-2.4d",
};

export const deliveryExceptions = operatingDecisions
  .filter((item): item is OperatingDecision & { delivery: NonNullable<OperatingDecision['delivery']> } => Boolean(item.delivery))
  .map((item) => ({
    id: item.id,
    title: item.title,
    account: item.delivery.account,
    region: item.region,
    stage: item.delivery.stage,
    status: item.delivery.status,
    owner: item.owner,
    decisionWindow: item.decisionWindow,
    decision: item.decision,
    impact: item.impact,
    drillHref: item.linkedViewHref ?? item.focusHref,
    drillLabel: item.linkedViewLabel ?? item.focusLabel,
    detail: item.detail,
  }));

export const deliveryFieldAlerts = operatingDecisions
  .filter(
    (item): item is OperatingDecision & { delivery: NonNullable<OperatingDecision['delivery']> } =>
      Boolean(item.delivery?.alertRank),
  )
  .sort(
    (a, b) =>
      (a.delivery?.alertRank ?? 99) - (b.delivery?.alertRank ?? 99),
  )
  .map((item) => ({
    id: item.id,
    title: item.delivery.alertTitle,
    detail: item.delivery.alertDetail,
    tone: item.delivery.alertTone,
    href: item.focusHref,
  }));

export const orderToActivateTrend = [
  { month: "Oct", days: 48.2 },
  { month: "Nov", days: 46.5 },
  { month: "Dec", days: 45.8 },
  { month: "Jan", days: 44.3 },
  { month: "Feb", days: 43.7 },
  { month: "Mar", days: 43.1 },
];

export const strategicOrders = [
  { id: "SO-9901", account: "Ministry of Energy", service: "Managed SD-WAN", value: "4.2M", progress: 65, status: "On Track" },
  { id: "SO-9904", account: "Public Investment Fund (PIF)", service: "Data Center Hosting", value: "8.5M", progress: 40, status: "At Risk" },
  { id: "SO-9912", account: "STC Wholesale", service: "International Capacity", value: "12M", progress: 90, status: "On Track" },
  { id: "SO-9918", account: "Saudi Aramco (Exploration)", service: "B2B Fiber Backbone", value: "6.8M", progress: 55, status: "At Risk" },
  { id: "SO-9923", account: "NEOM Tech & Digital", service: "Cloud Infrastructure", value: "9.3M", progress: 72, status: "On Track" },
];

export const strategicDecisionQueue = operatingDecisions
  .filter(
    (item): item is OperatingDecision & { strategic: NonNullable<OperatingDecision['strategic']> } =>
      Boolean(item.strategic),
  )
  .map((item) => ({
    orderId: item.strategic.orderId,
    account: item.strategic.account,
    service: item.strategic.service,
    region: item.region,
    status: item.strategic.status,
    owner: item.owner,
    decisionWindow: item.decisionWindow,
    decision: item.decision,
    impact: item.impact,
    drillHref: item.linkedViewHref ?? item.focusHref,
    drillLabel: item.linkedViewLabel ?? item.focusLabel,
    detail: item.detail,
  }));

export const b2cSnapshotData = {
  activeHomeFiberSubs: 84200,
  pendingInstallations: 3100,
  averageTimeToInstall: 4.2, // days
  customerSatisfactionScore: 4.6, // out of 5
  areaPerformance: [
    { area: "Al-Malqa (Riyadh)", demand: "Very High", status: "Under Control" },
    { area: "Al-Rawdah (Jeddah)", demand: "Medium", status: "Improving" },
    { area: "Al-Faisaliyah (Dammam)", demand: "High", status: "Technician Shortage" },
  ],
};

export const b2cWeeklyTrend = [
  { week: "W1", installs: 680, csat: 4.4 },
  { week: "W2", installs: 710, csat: 4.5 },
  { week: "W3", installs: 745, csat: 4.5 },
  { week: "W4", installs: 690, csat: 4.6 },
  { week: "W5", installs: 762, csat: 4.6 },
  { week: "W6", installs: 813, csat: 4.6 },
];

export const explorerData = [
  { id: "PRJ-001", name: "SNB Branch Connectivity", region: "National", segment: "Banking", status: "Active", value: "3.2M" },
  { id: "PRJ-002", name: "Yanbu Industrial Expansion", region: "Western", segment: "Industrial", status: "Delayed", value: "1.8M" },
  { id: "PRJ-003", name: "Health Cloud Project", region: "Central", segment: "Government", status: "Active", value: "5.1M" },
  { id: "PRJ-004", name: "Al-Narjis FTTH Coverage", region: "Central", segment: "B2C", status: "Completed", value: "2.4M" },
  { id: "PRJ-005", name: "NEOM South Route Fiber", region: "Northern", segment: "Mega Project", status: "Active", value: "9.3M" },
  { id: "PRJ-006", name: "Aramco Dhahran Campus WAN", region: "Eastern", segment: "Energy", status: "Active", value: "6.8M" },
  { id: "PRJ-007", name: "King Faisal Hospital ICT", region: "Central", segment: "Healthcare", status: "Delayed", value: "4.2M" },
  { id: "PRJ-008", name: "Red Sea Global Resort Network", region: "Western", segment: "Mega Project", status: "Active", value: "2.4M" },
  { id: "PRJ-009", name: "Jubail Port Authority DIA", region: "Eastern", segment: "Industrial", status: "Completed", value: "1.1M" },
  { id: "PRJ-010", name: "MoE School Connectivity", region: "National", segment: "Government", status: "Active", value: "7.5M" },
  { id: "PRJ-011", name: "STC Wholesale Capacity", region: "Central", segment: "Carrier", status: "Active", value: "12.0M" },
  { id: "PRJ-012", name: "Tabuk Military Base ICT", region: "Northern", segment: "Government", status: "Active", value: "3.6M" },
  { id: "PRJ-013", name: "Jeddah Airport Fiber Ring", region: "Western", segment: "Aviation", status: "Delayed", value: "4.8M" },
  { id: "PRJ-014", name: "PIF Headquarters Fit-Out", region: "Central", segment: "Government", status: "Active", value: "8.5M" },
  { id: "PRJ-015", name: "Diriyah Gate SD-WAN", region: "Central", segment: "Mega Project", status: "Active", value: "2.9M" },
  { id: "PRJ-016", name: "MoI Regional Secure VPN", region: "National", segment: "Government", status: "Delayed", value: "3.5M" },
  { id: "PRJ-017", name: "Enterprise Portal Performance Recovery", region: "National", segment: "Enterprise", status: "Active", value: "1.6M" },
];

export const projectFocusDetails: Record<string, FocusDetail> = {
  'PRJ-005': {
    id: 'PRJ-005',
    eyebrow: 'Project Detail',
    title: 'NEOM South Route Fiber',
    subtitle: 'Mega Project | Northern region',
    summary:
      'This route is the physical dependency behind both the NEOM backbone recovery and the cloud cutover posture. PMO leadership needs one integrated view across field progress, interim coverage, and executive customer communication.',
    metrics: [
      { label: 'Project value', value: '9.3M SAR' },
      { label: 'Primary risk', value: 'Weather and route access', tone: 'warning' },
      { label: 'Dependent orders', value: '2' },
      { label: 'Executive visibility', value: 'High', tone: 'critical' },
    ],
    facts: [
      { label: 'Accountable owner', value: 'Field Engineering Director' },
      { label: 'Next milestone', value: 'Backbone recovery plan approved and crews resequenced' },
      { label: 'Customer commitment', value: 'Integrated update shared with NEOM technology leadership' },
      { label: 'Review forum', value: 'Daily field recovery bridge' },
    ],
    actions: [
      'Approve the interim coverage plan and link it to the customer communication pack.',
      'Re-sequence field works and cloud cutover governance from one dependency view.',
      'Use this project as the single NEOM delivery narrative across PMO and service operations.',
    ],
    relatedOrders: [
      { id: 'SO-9923', account: 'NEOM Tech & Digital', service: 'Cloud Infrastructure', value: '9.3M', progress: 72, status: 'On Track' },
      { id: 'SO-9940', account: 'NEOM Development (Zone C)', service: 'Backbone Fiber', value: '2.8M', progress: 20, status: 'At Risk' },
    ],
  },
  'PRJ-006': {
    id: 'PRJ-006',
    eyebrow: 'Project Detail',
    title: 'Aramco Dhahran Campus WAN',
    subtitle: 'Energy | Eastern region',
    summary:
      'The build is no longer the main risk. Acceptance timing and routing confirmation are. This project needs a PMO-led closeout rhythm rather than more technical waiting.',
    metrics: [
      { label: 'Project value', value: '6.8M SAR', tone: 'critical' },
      { label: 'Primary blocker', value: 'UAT clearance', tone: 'warning' },
      { label: 'Dependent orders', value: '2' },
      { label: 'Customer attention', value: 'Executive', tone: 'critical' },
    ],
    facts: [
      { label: 'Accountable owner', value: 'Director Customer PMO' },
      { label: 'Next milestone', value: 'Customer routing confirmation and UAT slot secured' },
      { label: 'Customer commitment', value: 'Exploration program office updated before the next steering call' },
      { label: 'Review forum', value: 'Weekly revenue protection review' },
    ],
    actions: [
      'Lock the next UAT window and pre-authorize carrier escalation if the dependency stays open.',
      'Use one acceptance recovery plan across PMO, IP team, and the account sponsor.',
      'Keep revenue-release assumptions aligned to the actual sign-off path.',
    ],
    relatedOrders: [
      { id: 'SO-9918', account: 'Saudi Aramco (Exploration)', service: 'B2B Fiber Backbone', value: '6.8M', progress: 55, status: 'At Risk' },
      { id: 'SO-9944', account: 'Aramco Exploration Project', service: 'Field IoT Connectivity', value: '1.9M', progress: 80, status: 'On Track' },
    ],
  },
  'PRJ-008': {
    id: 'PRJ-008',
    eyebrow: 'Project Detail',
    title: 'Red Sea Global (Phase 1)',
    subtitle: 'Mega Project | Western region',
    summary:
      'Hardware readiness is now the gating issue on this account. The PMO decision is whether to keep waiting on replacement Cisco units or actively reallocate Western-region spares so resort network closeout can stay credible.',
    metrics: [
      { label: 'Project value', value: '2.4M SAR', tone: 'warning' },
      { label: 'Primary blocker', value: 'Cisco replacement units', tone: 'warning' },
      { label: 'Installation progress', value: '45%' },
      { label: 'Decision window', value: '72h', tone: 'warning' },
    ],
    facts: [
      { label: 'Accountable owner', value: 'Supply Chain Director' },
      { label: 'Next milestone', value: 'Replacement units delivered and install crew resequenced' },
      { label: 'Customer commitment', value: 'Resort technology office updated on the hardware recovery plan' },
      { label: 'Review forum', value: 'Weekly supply and delivery control review' },
    ],
    actions: [
      'Escalate vendor dispatch and lock a fallback spare-allocation plan.',
      'Reserve the Western-region install crew against the new equipment arrival date.',
      'Keep customer communication tied to the actual hardware recovery path, not optimistic ETA assumptions.',
    ],
    relatedOrders: [
      { id: 'SO-9942', account: 'Red Sea Global (Phase 1)', service: 'Resort Campus Network', value: '2.4M', progress: 45, status: 'At Risk' },
    ],
  },
  'PRJ-011': {
    id: 'PRJ-011',
    eyebrow: 'Project Detail',
    title: 'STC Wholesale Capacity',
    subtitle: 'Carrier | Central region',
    summary:
      'Commercial progress is strong, but the operational recovery path is what matters now. Carrier confidence will move faster than delivery reporting if failover posture remains unstable.',
    metrics: [
      { label: 'Project value', value: '12.0M SAR' },
      { label: 'Order progress', value: '90%', tone: 'positive' },
      { label: 'Service posture', value: 'Watch', tone: 'warning' },
      { label: 'Decision window', value: 'Today', tone: 'critical' },
    ],
    facts: [
      { label: 'Accountable owner', value: 'Network Ops' },
      { label: 'Next milestone', value: 'Patch window approved and failover capacity allocated' },
      { label: 'Customer commitment', value: 'Wholesale customer communication issued before next traffic peak' },
      { label: 'Review forum', value: 'Daily service risk escalation review' },
    ],
    actions: [
      'Approve the after-hours patch window.',
      'Validate failover headroom before the next traffic peak.',
      'Keep the account team and service operations aligned on the same recovery timeline.',
    ],
    relatedOrders: [
      { id: 'SO-9912', account: 'STC Wholesale', service: 'International Capacity', value: '12M', progress: 90, status: 'On Track' },
    ],
  },
  'PRJ-013': {
    id: 'PRJ-013',
    eyebrow: 'Project Detail',
    title: 'Jeddah Airport Fiber Ring',
    subtitle: 'Aviation | Western region',
    summary:
      'This project has become the clearest delivery-control issue in the Western region. Without immediate permit escalation, the route will keep slipping and hold back the dependent field queue.',
    metrics: [
      { label: 'Project value', value: '4.8M SAR', tone: 'critical' },
      { label: 'Status', value: 'Delayed', tone: 'critical' },
      { label: 'Blocked stage', value: 'Civil Works', tone: 'warning' },
      { label: 'Decision window', value: 'Today', tone: 'critical' },
    ],
    facts: [
      { label: 'Accountable owner', value: 'VP Operations' },
      { label: 'Next milestone', value: 'Diversion permit cleared and trenching restart confirmed' },
      { label: 'Customer commitment', value: 'Airport program office updated within 24 hours' },
      { label: 'Review forum', value: 'Morning intervention huddle' },
    ],
    actions: [
      'Escalate municipality approval at director level.',
      'Hold contractor capacity for the next field window once approval lands.',
      'Reset the airport delivery date only after route access is confirmed.',
    ],
    relatedOrders: [
      { id: 'SO-9951', account: 'Jeddah Airport Fiber Ring', service: 'Airport Campus Fiber Ring', value: '4.8M', progress: 62, status: 'At Risk' },
    ],
  },
  'PRJ-014': {
    id: 'PRJ-014',
    eyebrow: 'Project Detail',
    title: 'PIF Headquarters Fit-Out',
    subtitle: 'Government | Central region',
    summary:
      'This is the delivery program wrapper around the PIF hosting order. The management issue is infrastructure readiness and acceptance governance, not demand.',
    metrics: [
      { label: 'Project value', value: '8.5M SAR', tone: 'critical' },
      { label: 'Primary blocker', value: 'UPS / power readiness', tone: 'warning' },
      { label: 'Dependent orders', value: '2' },
      { label: 'Revenue exposure', value: 'Quarter-end', tone: 'critical' },
    ],
    facts: [
      { label: 'Accountable owner', value: 'Infrastructure Director' },
      { label: 'Next milestone', value: 'Temporary UPS path tested and acceptance sequence confirmed' },
      { label: 'Customer commitment', value: 'PIF technology office updated before the next revenue review' },
      { label: 'Review forum', value: 'Weekly revenue protection review' },
    ],
    actions: [
      'Approve the temporary UPS bypass and vendor standby support.',
      'Run one controlled acceptance rehearsal before customer sign-off.',
      'Keep PMO and finance aligned on the revenue-release gate.',
    ],
    relatedOrders: [
      { id: 'SO-9904', account: 'Public Investment Fund (PIF)', service: 'Data Center Hosting', value: '8.5M', progress: 40, status: 'At Risk' },
      { id: 'SO-9958', account: 'Public Investment Fund (PIF)', service: 'Managed Security Overlay', value: '2.2M', progress: 68, status: 'On Track' },
    ],
  },
  'PRJ-016': {
    id: 'PRJ-016',
    eyebrow: 'Customer Detail',
    title: 'MoI Regional Secure VPN',
    subtitle: 'Government | National',
    summary:
      'The immediate priority is service continuity. This account needs a controlled reroute and tighter TAC coordination before the issue becomes a visible ministry-level breach conversation.',
    metrics: [
      { label: 'Account value', value: '3.5M SAR', tone: 'critical' },
      { label: 'Exposure type', value: 'SLA breach risk', tone: 'critical' },
      { label: 'Urgency', value: 'Within 2h', tone: 'critical' },
      { label: 'Review posture', value: 'Immediate recovery bridge', tone: 'warning' },
    ],
    facts: [
      { label: 'Accountable owner', value: 'Enterprise Service Operations' },
      { label: 'Next milestone', value: 'Traffic reroute validated and TAC bridge stable' },
      { label: 'Customer commitment', value: 'Ministry service continuity statement issued through the account team' },
      { label: 'Review forum', value: 'Daily service risk escalation review' },
    ],
    actions: [
      'Authorize the immediate traffic reroute and keep vendor TAC bridge open until stability is confirmed.',
      'Align account leadership and service operations on one external message.',
      'Track SLA clock exposure hourly until the permanent fix is stable.',
    ],
    relatedOrders: [
      { id: 'SO-9935', account: 'Ministry of Interior (Regional)', service: 'Managed VPN', value: '2.1M', progress: 30, status: 'At Risk' },
      { id: 'SO-9936', account: 'Ministry of Interior (Regional)', service: 'DIA Regional', value: '1.4M', progress: 55, status: 'On Track' },
    ],
  },
  'PRJ-017': {
    id: 'PRJ-017',
    eyebrow: 'Customer Detail',
    title: 'Enterprise Portal Performance Recovery',
    subtitle: 'Enterprise | National',
    summary:
      'This issue is less about technical novelty and more about customer noise. Unless the workaround and permanent fix are managed together, repeat escalations will keep surfacing through multiple enterprise accounts.',
    metrics: [
      { label: 'Program value', value: '1.6M SAR' },
      { label: 'Risk type', value: 'Frontline support load', tone: 'warning' },
      { label: 'Urgency', value: '24h', tone: 'warning' },
      { label: 'Customer impact', value: 'Multi-account', tone: 'critical' },
    ],
    facts: [
      { label: 'Accountable owner', value: 'Platform Engineering' },
      { label: 'Next milestone', value: 'Workaround issued and application fix prioritized' },
      { label: 'Customer commitment', value: 'Frontline support script published for affected enterprise accounts' },
      { label: 'Review forum', value: 'Daily service risk escalation review' },
    ],
    actions: [
      'Prioritize the performance fix and publish one controlled workaround.',
      'Track repeat ticket volume by affected enterprise account.',
      'Close the gap between engineering remediation and customer operations messaging.',
    ],
    relatedOrders: [
      { id: 'SO-9962', account: 'Enterprise Shared Services', service: 'B2B Portal Services', value: '1.6M', progress: 83, status: 'On Track' },
    ],
  },
};

export type AccountRiskProfile = {
  focusId: string;
  accountName: string;
  riskReason: string;
  revenueImpact: number;
  region: DecisionRegion;
  owner: string;
  detail: FocusDetail;
};

const aramcoAccountRiskDetail: FocusDetail = {
  id: 'risk-aramco-exploration',
  eyebrow: 'Account Detail',
  title: 'Aramco Exploration Project',
  subtitle: 'Field IoT connectivity closeout | Eastern region',
  summary:
    'The remaining exposure on this account is concentrated in final UAT readiness and the customer routing window. The PMO call is whether to keep waiting for the normal closeout sequence or force one coordinated acceptance push across the field and account teams.',
  metrics: [
    { label: 'Revenue at risk', value: '1.9M SAR', tone: 'warning' },
    { label: 'Primary blocker', value: 'Final UAT resourcing', tone: 'warning' },
    { label: 'Linked major order', value: 'SO-9918' },
    { label: 'Decision window', value: '48h', tone: 'warning' },
  ],
  facts: [
    { label: 'Accountable owner', value: 'Director Customer PMO' },
    { label: 'Next milestone', value: 'Final UAT crew confirmed and customer routing window re-locked' },
    { label: 'Customer commitment', value: 'Exploration account sponsor updated before the next closeout call' },
    { label: 'Review forum', value: 'Weekly revenue protection review' },
  ],
  actions: [
    'Lock one coordinated UAT window with the customer and field teams.',
    'Pre-clear any carrier routing dependency before the acceptance slot opens.',
    'Track the 1.9M SAR exposure separately from the larger backbone order so recovery ownership stays precise.',
  ],
  relatedOrders: [
    { id: 'SO-9944', account: 'Aramco Exploration Project', service: 'Field IoT Connectivity', value: '1.9M', progress: 80, status: 'On Track' },
    { id: 'SO-9918', account: 'Saudi Aramco (Exploration)', service: 'B2B Fiber Backbone', value: '6.8M', progress: 55, status: 'At Risk' },
  ],
};

export const accountRiskProfiles: AccountRiskProfile[] = [
  {
    focusId: 'PRJ-016',
    accountName: 'Ministry of Interior (Regional)',
    riskReason: 'Secure VPN degradation and SLA-credit exposure',
    revenueImpact: 3500000,
    region: 'National',
    owner: 'Enterprise Service Operations',
    detail: projectFocusDetails['PRJ-016'],
  },
  {
    focusId: 'neom-backbone',
    accountName: 'NEOM Development (Zone C)',
    riskReason: 'Backbone recovery and interim coverage dependency',
    revenueImpact: 2800000,
    region: 'Northern',
    owner: 'Field Engineering Director',
    detail: operatingDecisionById['neom-backbone'].detail,
  },
  {
    focusId: 'PRJ-008',
    accountName: 'Red Sea Global (Phase 1)',
    riskReason: 'Cisco hardware replacement delaying resort network closeout',
    revenueImpact: 2400000,
    region: 'Western',
    owner: 'Supply Chain Director',
    detail: projectFocusDetails['PRJ-008'],
  },
  {
    focusId: aramcoAccountRiskDetail.id,
    accountName: 'Aramco Exploration Project',
    riskReason: 'Final UAT resourcing and customer routing window',
    revenueImpact: 1900000,
    region: 'Eastern',
    owner: 'Director Customer PMO',
    detail: aramcoAccountRiskDetail,
  },
];

export const acceptanceControlMetrics = {
  overdueItems:
    deliveryMilestones.find((item) => item.stage === 'UAT / Acceptance')
      ?.overdue ?? 0,
  rejectionRate: 2.4,
};

const acceptanceRecoveryDecision = operatingDecisionById['acceptance-clearance'];

export const acceptanceLeadershipNote = {
  title: acceptanceRecoveryDecision.title,
  summary: acceptanceRecoveryDecision.summary,
  owner: acceptanceRecoveryDecision.owner,
  decisionWindow: acceptanceRecoveryDecision.decisionWindow,
  impact: acceptanceRecoveryDecision.impact,
  action: acceptanceRecoveryDecision.detail.actions[1],
  href: acceptanceRecoveryDecision.focusHref,
};

const decisionDrillLink = (decisionId: OperatingDecision['id']) => {
  const item = operatingDecisionById[decisionId];

  return {
    region: item.region,
    drillHref: item.focusHref,
    drillLabel: item.focusLabel,
  };
};

/** Derive escalation recovery wording from the shared operating-decision dataset */
const escalationFromDecision = (
  decisionId: OperatingDecision['id'],
  overrides?: { subject?: string },
) => {
  const item = operatingDecisionById[decisionId];
  return {
    decision: item.decision,
    impact: item.impact,
    ...decisionDrillLink(decisionId),
    ...(overrides?.subject ? { subject: overrides.subject } : {}),
  };
};

export const escalationData = [
  {
    id: "ESC-1024",
    severity: "High",
    age: "48 hours",
    status: "In Progress",
    subject: "NAT System failure in Central Node",
    owner: "Network Operations",
    decisionWindow: "Today",
    ...escalationFromDecision('stc-failover', {
      subject: "NAT System failure in Central Node",
    }),
  },
  {
    id: "ESC-1025",
    severity: "Critical",
    age: "12 hours",
    status: "Assigned",
    subject: "Backbone Fiber cut near NEOM — Repair ongoing",
    owner: "Field Engineering Director",
    decisionWindow: "Within 4h",
    ...escalationFromDecision('neom-backbone', {
      subject: "Backbone Fiber cut near NEOM — Repair ongoing",
    }),
  },
  {
    id: "ESC-1026",
    severity: "High",
    age: "36 hours",
    status: "In Progress",
    subject: "PIF Data Center UPS capacity breach risk",
    owner: "Data Center Operations",
    decisionWindow: "Today",
    ...escalationFromDecision('pif-ups', {
      subject: "PIF Data Center UPS capacity breach risk",
    }),
  },
  {
    id: "ESC-1028",
    severity: "Medium",
    age: "72 hours",
    status: "Awaiting Client",
    subject: "MPLS routing delay for Aramco",
    owner: "IP Engineering",
    decisionWindow: "48h",
    ...escalationFromDecision('aramco-uat', {
      subject: "MPLS routing delay for Aramco",
    }),
  },
  {
    id: "ESC-1029",
    severity: "Critical",
    age: "6 hours",
    status: "Assigned",
    subject: "SLA breach imminent — MoI VPN degradation",
    owner: "Enterprise Service Operations",
    decisionWindow: "Within 2h",
    ...escalationFromDecision('moi-vpn-recovery', {
      subject: "SLA breach imminent — MoI VPN degradation",
    }),
  },
  {
    id: "ESC-1030",
    severity: "High",
    age: "24 hours",
    status: "Assigned",
    subject: "Latency in B2B portal for Enterprise accounts",
    owner: "Platform Engineering",
    decisionWindow: "24h",
    ...escalationFromDecision('portal-performance', {
      subject: "Latency in B2B portal for Enterprise accounts",
    }),
  },
  {
    id: "ESC-1031",
    severity: "Medium",
    age: "96 hours",
    status: "Awaiting Vendor",
    subject: "Cisco switch replacement pending for Jeddah POP",
    owner: "Supply Chain Director",
    decisionWindow: "72h",
    ...escalationFromDecision('jeddah-diversion', {
      subject: "Cisco switch replacement pending for Jeddah POP",
    }),
  },
];

export const escalationSummary = {
  openEscalations: 7,
  criticalCount: 2,
  avgMttr: "18.4 hrs",
  slaBreachRisk: 2,
  weekOverWeekTrend: "+3",
  trendDirection: "up" as const,
};

export const mttrBySeverity = [
  { severity: "Critical", target: 4, actual: 3.2, label: "3.2 hrs" },
  { severity: "High", target: 24, actual: 18.4, label: "18.4 hrs" },
  { severity: "Medium", target: 72, actual: 52.0, label: "52 hrs" },
];

export const dashboardData: DashboardInput = {
  ordersInFlight: 1485,
  onTimeDeliveryPercentage: 89.2,
  acceptedValueMTD: 62400000,
  revenueAtRisk: 12400000,
  acceptancePending: 184,
  pastDueBacklog: 72,
  weeklyExecutionTrendDescription:
    'Execution is improving across Internet Services and Cloud Services, but provisioning pace is slowing in Managed Services and Cyber Security handovers.',
  portfolioStatusDistributionDescription:
    '72% On Track, 18% At Risk (Permits & Supply Chain), 10% Critical Delay.',
  revenueAtRiskByFamily: [
    { family: 'Internet Services', revenue: 4500000 },
    { family: 'Cyber Security Services', revenue: 3100000 },
    { family: 'Managed Services', revenue: 2800000 },
    { family: 'Cloud Services', revenue: 2000000 },
  ],
  topAtRiskAccounts: accountRiskProfiles.map((item) => ({
    accountName: item.accountName,
    riskReason: item.riskReason,
    revenueImpact: item.revenueImpact,
  })),
  immediateInterventionQueue: executiveInterventions.map(
    (item) => `${item.title}: ${item.summary}`,
  ),
  activeEscalations: escalationData.map((item) => ({
    id: item.id,
    severity: item.severity,
    subject: item.subject,
    impact: item.impact,
  })),
};
