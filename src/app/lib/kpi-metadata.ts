export const kpiMetadata = {
  onTimeDelivery: {
    label: 'On-Time Delivery',
    source: 'OMS + project milestone tracker',
    owner: 'Director Customer PMO / Delivery PMs',
    forum: 'Weekly delivery review',
    threshold: 'Target >= 90%',
  },
  revenueAtRisk: {
    label: 'Revenue at Risk',
    source: 'OMS + billing + acceptance register',
    owner: 'PMO Director + Finance business partner',
    forum: 'Weekly revenue protection review',
    threshold: 'Escalate above 10M SAR',
  },
  activeOrders: {
    label: 'Active Orders',
    source: 'OMS order ledger',
    owner: 'Order control lead',
    forum: 'Weekly delivery review',
    threshold: 'Tracked against delivery capacity plan',
  },
  acceptedValueMTD: {
    label: 'Accepted Value (MTD)',
    source: 'Acceptance register + billing milestone handoff',
    owner: 'PMO Director + Finance business partner',
    forum: 'Weekly revenue protection review',
    threshold: 'Target >= 60M SAR MTD',
  },
  acceptancePending: {
    label: 'Pending Acceptance',
    source: 'Acceptance tracker + CRM account view',
    owner: 'Account delivery managers',
    forum: 'Daily acceptance recovery call',
    threshold: 'Hold <= 150 items',
  },
  pastDueBacklog: {
    label: 'Past Due Backlog',
    source: 'Milestone tracker + provisioning status',
    owner: 'Regional PMO leads',
    forum: 'Morning intervention huddle',
    threshold: 'Hold <= 50 orders',
  },
  orderToActivateCycle: {
    label: 'Order-to-Activate Cycle',
    source: 'OMS timestamps + activation platform',
    owner: 'Order control lead',
    forum: 'Monthly productivity review',
    threshold: 'Target <= 45 days',
  },
  firstTimeRightDelivery: {
    label: 'First-Time-Right Delivery',
    source: 'Field completion sheets + QA closeout',
    owner: 'Regional delivery managers',
    forum: 'Weekly delivery review',
    threshold: 'Target >= 92%',
  },
  avgDeliveryCycleTime: {
    label: 'Avg Delivery Cycle Time',
    source: 'OMS timestamps + milestone tracker',
    owner: 'Director Customer PMO / Order control lead',
    forum: 'Weekly delivery review',
    threshold: 'Target <= 45 days',
  },
  newOrdersMtd: {
    label: 'New Orders MTD',
    source: 'CRM booking intake + OMS order creation',
    owner: 'Order intake lead',
    forum: 'Weekly booking review',
    threshold: 'Track >= 330 orders vs plan',
  },
  avgBookingToBilling: {
    label: 'Avg Booking to Billing',
    source: 'CRM booking date + billing activation date',
    owner: 'Order control lead + Billing operations',
    forum: 'Weekly booking review',
    threshold: 'Target <= 25 days',
  },
  onTimeFulfillment: {
    label: 'On-Time Fulfillment',
    source: 'OMS committed dates + billing completion',
    owner: 'Fulfillment operations lead',
    forum: 'Weekly booking review',
    threshold: 'Target >= 90%',
  },
  orderFallout: {
    label: 'Order Fallout',
    source: 'OMS fallout codes + provisioning rejects',
    owner: 'Fulfillment quality manager',
    forum: 'Daily fallout review',
    threshold: 'Hold < 4%',
  },
  cancellations: {
    label: 'Cancellations',
    source: 'CRM cancellation ledger',
    owner: 'Order intake lead + Sales operations',
    forum: 'Weekly booking review',
    threshold: 'Hold < 15 MTD',
  },
  openEscalations: {
    label: 'Open Escalations',
    source: 'ITSM escalation queue',
    owner: 'Escalation manager',
    forum: 'Daily service risk escalation review',
    threshold: 'Hold <= 5 open cases',
  },
  criticalEscalations: {
    label: 'Critical Escalations',
    source: 'ITSM escalation queue',
    owner: 'Escalation manager + Service Ops',
    forum: 'Immediate recovery bridge',
    threshold: 'Target = 0 unresolved',
  },
  avgMttr: {
    label: 'Avg MTTR',
    source: 'ITSM resolved-incident history',
    owner: 'Service Ops recovery lead',
    forum: 'Weekly service recovery review',
    threshold: 'Target <= 24h',
  },
  slaBreachRisk: {
    label: 'SLA Breach Risk',
    source: 'ITSM escalations + NOC incident feed',
    owner: 'Escalation manager + Service Ops',
    forum: 'Daily service risk escalation review',
    threshold: 'Target = 0 imminent breaches',
  },
} as const;

export type KpiMetadataKey = keyof typeof kpiMetadata;

export const deploymentKpiAlignmentKeys = [
  'onTimeDelivery',
  'revenueAtRisk',
  'acceptancePending',
  'acceptedValueMTD',
  'pastDueBacklog',
  'firstTimeRightDelivery',
  'slaBreachRisk',
  'orderToActivateCycle',
] as const satisfies readonly KpiMetadataKey[];

export const escalationGovernanceKeys = [
  'avgMttr',
  'slaBreachRisk',
] as const satisfies readonly KpiMetadataKey[];

export const deliveryGovernanceKeys = [
  'firstTimeRightDelivery',
  'avgDeliveryCycleTime',
  'pastDueBacklog',
  'acceptancePending',
] as const satisfies readonly KpiMetadataKey[];

export const bookingGovernanceKeys = [
  'newOrdersMtd',
  'avgBookingToBilling',
  'onTimeFulfillment',
  'orderFallout',
  'cancellations',
] as const satisfies readonly KpiMetadataKey[];

export const leadershipGovernanceKeys = [
  'revenueAtRisk',
  'acceptancePending',
  'pastDueBacklog',
] as const satisfies readonly KpiMetadataKey[];
