import { AiPoweredExecutiveBriefingInput } from '@/ai/flows/ai-powered-executive-briefing';

export const dashboardData: AiPoweredExecutiveBriefingInput = {
  ordersInFlight: 1485,
  onTimeDeliveryPercentage: 89.2,
  acceptedValueMTD: 62400000,
  revenueAtRisk: 12400000,
  acceptancePending: 184,
  pastDueBacklog: 72,
  weeklyExecutionTrendDescription: "Significant improvement in execution speed for B2B Fiber projects, but slowdown observed due to equipment lead times in Managed Security sector.",
  portfolioStatusDistributionDescription: "72% On Track, 18% At Risk (Permits & Supply Chain), 10% Critical Delay.",
  revenueAtRiskByFamily: [
    { family: "Salam B2B Fiber", revenue: 4500000 },
    { family: "Dedicated Internet (DIA)", revenue: 3100000 },
    { family: "Managed VPN/SD-WAN", revenue: 2800000 },
    { family: "Cloud & Data Centers", revenue: 2000000 },
  ],
  topAtRiskAccounts: [
    { accountName: "Ministry of Interior (Regional)", riskReason: "Site access permit hurdles", revenueImpact: 3500000 },
    { accountName: "NEOM Development (Zone C)", riskReason: "Extreme weather affecting civil works", revenueImpact: 2800000 },
    { accountName: "Red Sea Global (Phase 1)", riskReason: "Hardware shipment delays (Cisco units)", revenueImpact: 2400000 },
    { accountName: "Aramco Exploration Project", riskReason: "Resource shortage for final UAT", revenueImpact: 1900000 },
  ],
  immediateInterventionQueue: [
    "Jeddah Metro Fiber Diversion: Escalate municipality dispute to VP Operations.",
    "Riyadh Data Center Expansion: Approval needed for emergency UPS bypass.",
    "NEOM Zone C: Request for mobile satellite unit deployment as interim fix.",
    "B2C Fulfillment (Dammam): Activate task force to reduce backlog."
  ],
};

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

export const deliveryMilestones = [
  { stage: "Site Survey", count: 420, status: "completed" },
  { stage: "Civil Works", count: 310, status: "in-progress" },
  { stage: "Equipment Install", count: 245, status: "pending" },
  { stage: "UAT / Acceptance", count: 184, status: "at-risk" },
];

export const strategicOrders = [
  { id: "SO-9901", account: "Ministry of Energy", service: "Managed SD-WAN", value: "4.2M", progress: 65, status: "On Track" },
  { id: "SO-9904", account: "Public Investment Fund (PIF)", service: "Data Center Hosting", value: "8.5M", progress: 40, status: "At Risk" },
  { id: "SO-9912", account: "STC Wholesale", service: "International Capacity", value: "12M", progress: 90, status: "On Track" },
];

export const b2cSnapshotData = {
  activeHomeFiberSubs: 84200,
  pendingInstallations: 3100,
  averageTimeToInstall: 4.2, // days
  customerSatisfactionScore: 4.6, // out of 5
  areaPerformance: [
    { area: "Al-Malqa (Riyadh)", demand: "Very High", status: "Under Control" },
    { area: "Al-Rawdah (Jeddah)", demand: "Medium", status: "Improving" },
    { area: "Al-Faisaliyah (Dammam)", demand: "High", status: "Technician Shortage" },
  ]
};

export const explorerData = [
  { id: "PRJ-001", name: "SNB Branch Connectivity", region: "National", segment: "Banking", status: "Active" },
  { id: "PRJ-002", name: "Yanbu Industrial Expansion", region: "Western", segment: "Industrial", status: "Delayed" },
  { id: "PRJ-003", name: "Health Cloud Project", region: "Central", segment: "Government", status: "Active" },
  { id: "PRJ-004", name: "Al-Narjis FTTH Coverage", region: "Central", segment: "B2C", status: "Completed" },
];

export const escalationData = [
  { id: "ESC-1024", severity: "High", age: "48 hours", status: "In Progress", subject: "NAT System failure in Central Node" },
  { id: "ESC-1025", severity: "Critical", age: "12 hours", status: "Assigned", subject: "Backbone Fiber cut near NEOM - Repair ongoing" },
  { id: "ESC-1028", severity: "Medium", age: "72 hours", status: "Awaiting Client", subject: "MPLS routing delay for Aramco" },
  { id: "ESC-1030", severity: "High", age: "24 hours", status: "Assigned", subject: "Latency in B2B portal for Enterprise accounts" },
];
