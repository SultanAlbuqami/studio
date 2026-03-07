import { AiPoweredExecutiveBriefingInput } from '@/ai/flows/ai-powered-executive-briefing';

export const dashboardData: AiPoweredExecutiveBriefingInput = {
  ordersInFlight: 1485,
  onTimeDeliveryPercentage: 89.2,
  acceptedValueMTD: 62400000,
  revenueAtRisk: 12400000,
  acceptancePending: 184,
  pastDueBacklog: 72,
  weeklyExecutionTrendDescription: "Execution velocity showing improvement in B2B Fiber deployments, but slowed by equipment lead times in Managed Security sector.",
  portfolioStatusDistributionDescription: "72% On Track, 18% At Risk (permitting & supply chain), 10% Critical Delay.",
  revenueAtRiskByFamily: [
    { family: "Salam B2B Fiber", revenue: 4500000 },
    { family: "Dedicated Internet Access", revenue: 3100000 },
    { family: "Managed VPN/SD-WAN", revenue: 2800000 },
    { family: "Cloud & Data Center", revenue: 2000000 },
  ],
  topAtRiskAccounts: [
    { accountName: "Ministry of Interior (Regional)", riskReason: "Site access permitting bottleneck", revenueImpact: 3500000 },
    { accountName: "NEOM Development (Zone C)", riskReason: "Severe weather affecting civil works", revenueImpact: 2800000 },
    { accountName: "Red Sea Global (Phase 1)", riskReason: "Hardware shipment delay (Cisco units)", revenueImpact: 2400000 },
    { accountName: "Aramco Upstream Project", riskReason: "Final acceptance testing resource gap", revenueImpact: 1900000 },
  ],
  immediateInterventionQueue: [
    "Jeddah Metro Fiber Diversion: Escalate municipal dispute to VP Operations.",
    "Riyadh Data Center Expansion: Approval needed for emergency UPS bypass.",
    "NEOM Zone C: Request deployment of mobile satellite units as interim fix.",
    "B2C Activations (Dammam): Backlog reduction taskforce activation."
  ],
};

export const executionTrendChartData = [
  { week: 'W34', deliveries: 125, target: 130 },
  { week: 'W35', deliveries: 138, target: 135 },
  { week: 'W36', deliveries: 132, target: 140 },
  { week: 'W37', deliveries: 145, target: 145 },
  { week: 'W38', deliveries: 158, target: 150 },
  { week: 'W39', deliveries: 162, target: 155 },
];

export const portfolioDistributionData = [
  { name: 'On Track', value: 72, fill: 'hsl(var(--chart-1))' },
  { name: 'At Risk', value: 18, fill: 'hsl(var(--chart-2))' },
  { name: 'Delayed', value: 10, fill: 'hsl(var(--destructive))' },
];

export const bookingFulfillmentData = {
  newOrdersMTD: 342,
  cancelledOrdersMTD: 12,
  averageBookingToBillingDays: 24.5,
  throughputByRegion: [
    { region: "Central", volume: 145, growth: "+12%" },
    { region: "Western", volume: 98, growth: "+5%" },
    { region: "Eastern", volume: 76, growth: "-2%" },
    { region: "Southern", volume: 23, growth: "+18%" },
  ]
};

export const b2cSnapshotData = {
  activeHomeFiberSubs: 84200,
  pendingInstallations: 3100,
  averageTimeToInstall: 4.2, // days
  customerSatisfactionScore: 4.6, // out of 5
  topInstallationAreas: [
    { area: "Al Malqa (Riyadh)", status: "High Demand" },
    { area: "Al Rawdah (Jeddah)", status: "Normal" },
    { area: "Dammam North", status: "Network Upgrade" },
  ]
};

export const escalationData = [
  { id: "ESC-1024", severity: "High", age: "48h", status: "In Progress", subject: "Carrier Grade NAT failure in Central Node" },
  { id: "ESC-1025", severity: "Critical", age: "12h", status: "Assigned", subject: "NEOM Backbone Fiber Cut - Repair in progress" },
  { id: "ESC-1028", severity: "Medium", age: "72h", status: "Pending Customer", subject: "Aramco MPLS routing delay" },
  { id: "ESC-1030", severity: "High", age: "24h", status: "Assigned", subject: "B2B Portal latency issues for major accounts" },
];
