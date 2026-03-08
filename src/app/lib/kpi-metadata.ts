export const kpiMetadata = {
  onTimeDelivery: {
    label: 'On-Time Delivery',
    source: 'OMS + project milestone tracker',
    owner: 'Director Customer PMO and Delivery PMs',
    forum: 'Weekly delivery review',
    threshold: 'Target >= 90%',
  },
  revenueAtRisk: {
    label: 'Revenue at Risk',
    source: 'OMS + billing + acceptance register',
    owner: 'Director Customer PMO and Finance Business Partner',
    forum: 'Weekly revenue protection review',
    threshold: 'Escalate above 10M SAR',
  },
  activeOrders: {
    label: 'Orders in Flight',
    source: 'OMS order ledger',
    owner: 'Order Control Lead',
    forum: 'Weekly delivery review',
    threshold: 'Tracked against delivery capacity plan',
  },
  acceptedValueMTD: {
    label: 'Accepted Value (MTD)',
    source: 'Acceptance register + billing milestone handoff',
    owner: 'Director Customer PMO and Finance Business Partner',
    forum: 'Weekly revenue protection review',
    threshold: 'Target >= 60M SAR MTD',
  },
  acceptancePending: {
    label: 'Pending Acceptance',
    source: 'Acceptance tracker + CRM account view',
    owner: 'Account Delivery Managers',
    forum: 'Daily acceptance recovery call',
    threshold: 'Hold <= 150 items',
  },
  pastDueBacklog: {
    label: 'Past Due Backlog',
    source: 'Milestone tracker + provisioning status',
    owner: 'Regional PMO Leads',
    forum: 'Morning intervention huddle',
    threshold: 'Hold <= 50 orders',
  },
  orderToActivateCycle: {
    label: 'Order-to-Activate Cycle',
    source: 'OMS timestamps + activation platform',
    owner: 'Order Control Lead',
    forum: 'Monthly productivity review',
    threshold: 'Target <= 45 days',
  },
  firstTimeRightDelivery: {
    label: 'First-Time-Right Delivery',
    source: 'Field completion sheets + QA closeout',
    owner: 'Regional Delivery Managers',
    forum: 'Weekly delivery review',
    threshold: 'Target >= 92%',
  },
  avgDeliveryCycleTime: {
    label: 'Avg Delivery Cycle Time',
    source: 'OMS timestamps + milestone tracker',
    owner: 'Director Customer PMO and Order Control Lead',
    forum: 'Weekly delivery review',
    threshold: 'Target <= 45 days',
  },
  newOrdersMtd: {
    label: 'New Orders MTD',
    source: 'CRM booking intake + OMS order creation',
    owner: 'Order Intake Lead',
    forum: 'Weekly booking review',
    threshold: 'Track >= 330 orders vs plan',
  },
  avgBookingToBilling: {
    label: 'Avg Booking to Billing',
    source: 'CRM booking date + billing activation date',
    owner: 'Order Control Lead and Billing Operations',
    forum: 'Weekly booking review',
    threshold: 'Target <= 25 days',
  },
  onTimeFulfillment: {
    label: 'On-Time Fulfillment',
    source: 'OMS committed dates + billing completion',
    owner: 'Fulfillment Operations Lead',
    forum: 'Weekly booking review',
    threshold: 'Target >= 90%',
  },
  orderFallout: {
    label: 'Order Fallout',
    source: 'OMS fallout codes + provisioning rejects',
    owner: 'Fulfillment Quality Manager',
    forum: 'Daily fallout review',
    threshold: 'Hold < 4%',
  },
  cancellations: {
    label: 'Cancellations',
    source: 'CRM cancellation ledger',
    owner: 'Order Intake Lead and Sales Operations',
    forum: 'Weekly booking review',
    threshold: 'Hold < 15 MTD',
  },
  openEscalations: {
    label: 'Open Escalations',
    source: 'ITSM escalation queue',
    owner: 'Escalation Manager',
    forum: 'Daily service risk escalation review',
    threshold: 'Hold <= 5 open cases',
  },
  criticalEscalations: {
    label: 'Critical Escalations',
    source: 'ITSM escalation queue',
    owner: 'Escalation Manager and Service Operations',
    forum: 'Immediate recovery bridge',
    threshold: 'Target = 0 unresolved',
  },
  avgMttr: {
    label: 'Avg MTTR',
    source: 'ITSM resolved-incident history',
    owner: 'Service Operations Recovery Lead',
    forum: 'Weekly service recovery review',
    threshold: 'Target <= 24h',
  },
  slaBreachRisk: {
    label: 'SLA Breach Risk',
    source: 'ITSM escalations + NOC incident feed',
    owner: 'Escalation Manager and Service Operations',
    forum: 'Daily service risk escalation review',
    threshold: 'Target = 0 imminent breaches',
  },
  homeFiberSubs: {
    label: 'Active Home Fiber Base',
    source: 'CRM subscriber base + provisioning platform',
    owner: 'B2C Operations Lead',
    forum: 'Weekly B2C operations review',
    threshold: 'Track against quarterly activation target',
  },
  pendingInstalls: {
    label: 'Install Backlog',
    source: 'Field dispatch + technician scheduling system',
    owner: 'Installation Operations Manager',
    forum: 'Daily dispatch review',
    threshold: 'Hold <= 2,500 pending',
  },
  avgInstallTime: {
    label: 'Avg Install Lead Time',
    source: 'Field completion timestamps + dispatch system',
    owner: 'Installation Operations Manager',
    forum: 'Weekly B2C operations review',
    threshold: 'Target <= 3.5 days',
  },
  b2cCsat: {
    label: 'Post-Install CSAT',
    source: 'Post-install survey + CRM feedback loop',
    owner: 'Customer Experience Lead',
    forum: 'Monthly CX review',
    threshold: 'Target >= 4.5/5',
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

export const b2cGovernanceKeys = [
  'homeFiberSubs',
  'pendingInstalls',
  'avgInstallTime',
  'b2cCsat',
] as const satisfies readonly KpiMetadataKey[];
