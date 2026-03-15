import { dataAsOf } from './dashboard-meta';
import {
  type DecisionPriority,
  type DecisionRegion,
  type FocusDetail,
  type OperatingDecision,
  operatingDecisionById,
  operatingDecisions,
} from './dashboard-core-data';
import { kpiMetadata } from './kpi-metadata';

export const executiveInterventions = operatingDecisions
  .filter((item) => item.homeVisible)
  .sort((a, b) => (a.homeRank ?? 99) - (b.homeRank ?? 99))
  .map((item) => ({
    title: item.title,
    summary: item.summary,
    owner: item.owner,
    region: item.region,
    timing: item.decisionWindow,
    impact: item.impact,
    priority: item.priority,
    href: item.focusHref,
  }));

export type ExecutiveDecisionCard = {
  id: string;
  title: string;
  summary: string;
  decision: string;
  owner: string;
  decisionWindow: string;
  impact: string;
  priority: DecisionPriority;
  region: DecisionRegion;
  domain: OperatingDecision['domain'];
  evidence: readonly string[];
  reviewForum: string;
  nextMilestone: string;
  href: string;
  linkedViewHref?: string;
  linkedViewLabel?: string;
  detail: FocusDetail;
};

const findFactValue = (detail: FocusDetail, label: string) =>
  detail.facts.find((fact) => fact.label === label)?.value ?? '';

export const executiveDecisionQueue: ExecutiveDecisionCard[] = operatingDecisions
  .filter((item) => item.homeVisible)
  .sort((a, b) => (a.homeRank ?? 99) - (b.homeRank ?? 99))
  .map((item) => ({
    id: item.id,
    title: item.title,
    summary: item.summary,
    decision: item.decision,
    owner: item.owner,
    decisionWindow: item.decisionWindow,
    impact: item.impact,
    priority: item.priority,
    region: item.region,
    domain: item.domain,
    evidence: item.detail.metrics
      .slice(0, 3)
      .map((metric) => `${metric.label}: ${metric.value}`),
    reviewForum: findFactValue(item.detail, 'Review forum'),
    nextMilestone: findFactValue(item.detail, 'Next milestone'),
    href: item.focusHref,
    linkedViewHref: item.linkedViewHref,
    linkedViewLabel: item.linkedViewLabel,
    detail: item.detail,
  }));

export type ExecutiveActionStatus = 'ready' | 'mobilizing' | 'tracking';

export type ExecutiveActionRegisterItem = {
  id: string;
  title: string;
  owner: string;
  dueLabel: string;
  status: ExecutiveActionStatus;
  forum: string;
  linkedKpi: string;
  outcome: string;
  action: string;
  evidence: string;
  href: string;
};

export const executiveActionRegister: ExecutiveActionRegisterItem[] = [
  {
    id: 'action-jeddah-diversion',
    title: 'Lock municipality escalation for Jeddah diversion',
    owner: operatingDecisionById['jeddah-diversion'].owner,
    dueLabel: operatingDecisionById['jeddah-diversion'].decisionWindow,
    status: 'ready',
    forum: findFactValue(operatingDecisionById['jeddah-diversion'].detail, 'Review forum'),
    linkedKpi: kpiMetadata.pastDueBacklog.label,
    outcome: 'Protect 3.2M SAR milestone release and reopen the Western civil works queue.',
    action: operatingDecisionById['jeddah-diversion'].detail.actions[0],
    evidence: operatingDecisionById['jeddah-diversion'].detail.metrics[0]?.value ?? '3.2M SAR',
    href: operatingDecisionById['jeddah-diversion'].focusHref,
  },
  {
    id: 'action-pif-ups',
    title: 'Approve temporary UPS path for PIF hosting',
    owner: operatingDecisionById['pif-ups'].owner,
    dueLabel: operatingDecisionById['pif-ups'].decisionWindow,
    status: 'ready',
    forum: findFactValue(operatingDecisionById['pif-ups'].detail, 'Review forum'),
    linkedKpi: kpiMetadata.revenueAtRisk.label,
    outcome: 'Protect quarter-end hosting revenue recognition and remove the acceptance reset risk.',
    action: operatingDecisionById['pif-ups'].detail.actions[0],
    evidence: operatingDecisionById['pif-ups'].detail.metrics[0]?.value ?? '8.5M SAR',
    href: operatingDecisionById['pif-ups'].focusHref,
  },
  {
    id: 'action-acceptance-clearance',
    title: 'Run acceptance sign-off workshops for exposed orders',
    owner: operatingDecisionById['acceptance-clearance'].owner,
    dueLabel: operatingDecisionById['acceptance-clearance'].decisionWindow,
    status: 'mobilizing',
    forum: findFactValue(operatingDecisionById['acceptance-clearance'].detail, 'Review forum'),
    linkedKpi: kpiMetadata.acceptancePending.label,
    outcome: 'Reduce overdue acceptance and release billed value before the quarter-end cut-off.',
    action: operatingDecisionById['acceptance-clearance'].detail.actions[1],
    evidence: '184 pending items / 28 overdue',
    href: operatingDecisionById['acceptance-clearance'].focusHref,
  },
  {
    id: 'action-moi-vpn',
    title: 'Authorize immediate reroute for MoI secure VPN',
    owner: operatingDecisionById['moi-vpn-recovery'].detail.facts[0]?.value ?? 'Enterprise Service Operations',
    dueLabel: operatingDecisionById['moi-vpn-recovery'].decisionWindow,
    status: 'ready',
    forum: findFactValue(operatingDecisionById['moi-vpn-recovery'].detail, 'Review forum'),
    linkedKpi: kpiMetadata.slaBreachRisk.label,
    outcome: 'Avoid a live SLA breach and stabilize ministry service continuity before customer attention escalates.',
    action: operatingDecisionById['moi-vpn-recovery'].detail.actions[0],
    evidence: operatingDecisionById['moi-vpn-recovery'].detail.metrics[0]?.value ?? 'Breach imminent',
    href: operatingDecisionById['moi-vpn-recovery'].focusHref,
  },
  {
    id: 'action-dammam-cell',
    title: 'Deploy Dammam backlog recovery cell',
    owner: operatingDecisionById['dammam-backlog'].owner,
    dueLabel: operatingDecisionById['dammam-backlog'].decisionWindow,
    status: 'tracking',
    forum: findFactValue(operatingDecisionById['dammam-backlog'].detail, 'Review forum'),
    linkedKpi: kpiMetadata.onTimeFulfillment.label,
    outcome: 'Restore installation throughput and prevent Eastern-region fallout from becoming a customer trend.',
    action: operatingDecisionById['dammam-backlog'].detail.actions[0],
    evidence: operatingDecisionById['dammam-backlog'].detail.metrics[1]?.value ?? 'Technician shortfall',
    href: operatingDecisionById['dammam-backlog'].focusHref,
  },
];

export const executiveActionSummary = {
  readyNow: executiveActionRegister.filter((item) => item.status === 'ready').length,
  mobilizing: executiveActionRegister.filter((item) => item.status === 'mobilizing').length,
  tracking: executiveActionRegister.filter((item) => item.status === 'tracking').length,
};

export type ExecutiveScenario = {
  id: string;
  title: string;
  summary: string;
  lever: string;
  owner: string;
  decisionWindow: string;
  confidence: 'High confidence' | 'Directional';
  outcome: string;
  effects: readonly {
    label: string;
    unit?: string;
    current: number;
    projected: number;
  }[];
  supportingSignals: readonly string[];
  href: string;
};

export const executiveScenarios: ExecutiveScenario[] = [
  {
    id: 'acceptance-sprint',
    title: 'Acceptance sprint on exposed strategic orders',
    summary:
      'Run executive sign-off workshops and punch-list clearance on the most exposed orders before the billing cut-off.',
    lever: 'Acceptance governance + sponsor workshops',
    owner: operatingDecisionById['acceptance-clearance'].owner,
    decisionWindow: 'Next 10 days',
    confidence: 'High confidence',
    outcome:
      'This is the fastest deterministic route to protect quarter-end billed value without waiting for new demand.',
    effects: [
      {
        label: kpiMetadata.revenueAtRisk.label,
        unit: 'M SAR',
        current: 12.4,
        projected: 9.3,
      },
      {
        label: kpiMetadata.acceptancePending.label,
        current: 184,
        projected: 148,
      },
      {
        label: kpiMetadata.acceptedValueMTD.label,
        unit: 'M SAR',
        current: 62.4,
        projected: 66.8,
      },
    ],
    supportingSignals: [
      '28 acceptance items are already overdue.',
      'PIF hosting and Aramco backbone remain the fastest path to billed-value protection.',
      'The required governance model and review forum already exist in the control tower.',
    ],
    href: operatingDecisionById['acceptance-clearance'].focusHref,
  },
  {
    id: 'western-recovery',
    title: 'Western-region civil works recovery push',
    summary:
      'Deploy temporary supervisors, lock permits, and re-sequence blocked jobs to release downstream install throughput.',
    lever: 'Field recovery capacity + permit escalation',
    owner: operatingDecisionById['civil-works-recovery'].owner,
    decisionWindow: 'This week',
    confidence: 'Directional',
    outcome:
      'This scenario improves execution speed and reduces the most visible backlog pressure, but it depends on field capacity staying locked.',
    effects: [
      {
        label: kpiMetadata.onTimeDelivery.label,
        unit: '%',
        current: 89.2,
        projected: 90.6,
      },
      {
        label: kpiMetadata.pastDueBacklog.label,
        current: 72,
        projected: 57,
      },
      {
        label: kpiMetadata.revenueAtRisk.label,
        unit: 'M SAR',
        current: 12.4,
        projected: 10.9,
      },
    ],
    supportingSignals: [
      '47 overdue civil works orders are constraining equipment install throughput.',
      'The Western queue is the clearest operating bottleneck in the live pipeline.',
      'Impact lands fastest if permit and contractor blockers are cleared in one move.',
    ],
    href: operatingDecisionById['civil-works-recovery'].focusHref,
  },
  {
    id: 'service-continuity-shield',
    title: 'Immediate service-continuity shield for exposed escalations',
    summary:
      'Reroute MoI traffic, stabilize the TAC bridge, and approve the STC failover window before the escalation load compounds.',
    lever: 'Service recovery authorization',
    owner: 'Enterprise Service Operations + Network Ops',
    decisionWindow: 'Within 24h',
    confidence: 'High confidence',
    outcome:
      'The main effect is customer-confidence protection and lower SLA exposure rather than a broad shift in portfolio KPIs.',
    effects: [
      {
        label: kpiMetadata.slaBreachRisk.label,
        current: 2,
        projected: 0,
      },
      {
        label: kpiMetadata.criticalEscalations.label,
        current: 2,
        projected: 1,
      },
      {
        label: kpiMetadata.avgMttr.label,
        unit: ' hrs',
        current: 18.4,
        projected: 14.2,
      },
    ],
    supportingSignals: [
      'MoI VPN is within a 2-hour decision window.',
      'STC failover remains a same-day carrier confidence issue.',
      'This scenario protects leadership credibility even when core delivery KPIs do not move immediately.',
    ],
    href: '/escalations',
  },
];

export const executiveScenarioSummary = {
  primaryRecommendation: executiveScenarios[0]?.title ?? '',
  strongestKpiLift: 'Acceptance sprint yields the fastest revenue-risk release.',
};

export const dataConfidenceSummary = {
  score: 95,
  snapshot: dataAsOf,
  governedKpis: Object.keys(kpiMetadata).length,
  sourceDomains: 9,
  reviewCadence: 'Daily to monthly',
};

export const dataConfidenceSignals = [
  {
    label: 'Metric provenance',
    value: '100% of executive KPIs',
    detail: 'Every executive KPI is mapped to a source system, accountable owner, threshold, and review forum.',
  },
  {
    label: 'Refresh posture',
    value: 'Intra-day + daily',
    detail: 'Escalation and intervention signals are designed for intra-day refresh; PMO and acceptance views operate on a daily governed snapshot.',
  },
  {
    label: 'Decision governance',
    value: 'Owner + forum attached',
    detail: 'Decision cards and recommended actions inherit review forums and accountable owners from the shared operating dataset.',
  },
];

export const dataConfidenceLedger = [
  {
    label: 'Snapshot timestamp',
    value: dataAsOf,
  },
  {
    label: 'Source domains represented',
    value: `${dataConfidenceSummary.sourceDomains} operational systems`,
  },
  {
    label: 'Governed KPI count',
    value: `${dataConfidenceSummary.governedKpis} metrics`,
  },
  {
    label: 'Review cadence',
    value: dataConfidenceSummary.reviewCadence,
  },
];

