import { AiPoweredExecutiveBriefingInput } from '@/ai/flows/ai-powered-executive-briefing';

export const dashboardData: AiPoweredExecutiveBriefingInput = {
  ordersInFlight: 1240,
  onTimeDeliveryPercentage: 92.4,
  acceptedValueMTD: 45200000,
  revenueAtRisk: 8700000,
  acceptancePending: 142,
  pastDueBacklog: 58,
  weeklyExecutionTrendDescription: "Demonstrating a positive trajectory with a 15% increase in weekly delivery throughput and stabilized lead times across major fiber rollouts.",
  portfolioStatusDistributionDescription: "The current portfolio is healthy with 75% on track, 15% at risk requiring monitoring, and 10% delayed needing direct intervention.",
  revenueAtRiskByFamily: [
    { family: "Cloud Infrastructure", revenue: 3200000 },
    { family: "Enterprise Connectivity", revenue: 2100000 },
    { family: "Managed Services", revenue: 1800000 },
    { family: "Security Solutions", revenue: 1600000 },
  ],
  topAtRiskAccounts: [
    { accountName: "STC Solutions (Riyadh Hub)", riskReason: "Technical dependency on 3rd party vendor for specialized hardware", revenueImpact: 2400000 },
    { accountName: "Mobily Business (Jeddah Port)", riskReason: "Regulatory clearance delays for marine fiber deployment", revenueImpact: 1800000 },
    { accountName: "Zain KSA (Dammam Phase 2)", riskReason: "Civil work permitting bottleneck at municipal level", revenueImpact: 1500000 },
    { accountName: "NEOM Logistics", riskReason: "Resource shortage for on-site engineering in Zone B", revenueImpact: 1200000 },
  ],
  immediateInterventionQueue: [
    "Khobar Fiber Expansion: Escalate municipal civil permit delays to Regional Director.",
    "NEOM Site B: Immediate dispatch of specialized radio frequency engineers.",
    "Riyadh Metro Connectivity: Review equipment delivery schedule with procurement lead.",
    "Aramco Smart Campus: Fast-track final testing protocols for Q4 acceptance."
  ],
};

export const executionTrendChartData = [
  { week: 'W32', deliveries: 110, target: 105 },
  { week: 'W33', deliveries: 115, target: 110 },
  { week: 'W34', deliveries: 105, target: 115 },
  { week: 'W35', deliveries: 128, target: 120 },
  { week: 'W36', deliveries: 135, target: 125 },
  { week: 'W37', deliveries: 142, target: 130 },
];

export const portfolioDistributionData = [
  { name: 'On Track', value: 75, fill: 'hsl(var(--chart-1))' },
  { name: 'At Risk', value: 15, fill: 'hsl(var(--chart-2))' },
  { name: 'Delayed', value: 10, fill: 'hsl(var(--destructive))' },
];