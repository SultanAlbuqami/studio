import { dataAsOf } from './dashboard-meta';

/** Synthetic snapshot timestamp — displayed in header to show data freshness */
export { dataAsOf };

export type DecisionPriority = 'critical' | 'high' | 'medium';
type DetailTone = 'default' | 'positive' | 'warning' | 'critical';
export type DecisionRegion =
  | 'National'
  | 'Central'
  | 'Eastern'
  | 'Northern'
  | 'Western';

export type FocusDetailMetric = {
  label: string;
  value: string;
  tone?: DetailTone;
};

export type FocusDetailFact = {
  label: string;
  value: string;
};

export type FocusDetailOrder = {
  id: string;
  account: string;
  service: string;
  value: string;
  progress: number;
  status: string;
};

export type FocusDetail = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  summary: string;
  metrics: readonly FocusDetailMetric[];
  facts: readonly FocusDetailFact[];
  actions: readonly string[];
  relatedOrders?: readonly FocusDetailOrder[];
};

export type OperatingDecision = {
  id: string;
  domain: 'delivery' | 'strategic' | 'booking';
  region: DecisionRegion;
  title: string;
  summary: string;
  decision: string;
  owner: string;
  decisionWindow: string;
  impact: string;
  priority: DecisionPriority;
  focusHref: string;
  focusLabel: string;
  linkedViewHref?: string;
  linkedViewLabel?: string;
  homeVisible?: boolean;
  homeRank?: number;
  delivery?: {
    account: string;
    stage: string;
    status: string;
    alertTitle: string;
    alertDetail: string;
    alertTone: 'critical' | 'warning' | 'positive';
    alertRank?: number;
  };
  strategic?: {
    orderId: string;
    account: string;
    service: string;
    status: string;
  };
  detail: FocusDetail;
};

export const operatingDecisions: OperatingDecision[] = [
  {
    id: 'jeddah-diversion',
    domain: 'delivery',
    region: 'Western',
    title: 'Escalate Jeddah airport diversion',
    summary:
      'Municipality dispute is blocking route clearance for a delivery-critical diversion window on the airport ring.',
    decision:
      'Approve municipality escalation and temporary diversion resources before the next civil works window closes.',
    owner: 'VP Operations',
    decisionWindow: 'Today',
    impact:
      'Protect 3.2M SAR milestone release and recover the Western-region civil works queue.',
    priority: 'critical',
    focusHref: '/delivery?focus=jeddah-diversion#delivery-decisions',
    focusLabel: 'Open Jeddah delivery view',
    linkedViewHref: '/explorer?focus=PRJ-013',
    linkedViewLabel: 'Open Jeddah Airport Fiber Ring',
    homeVisible: true,
    homeRank: 1,
    delivery: {
      account: 'Jeddah Airport Fiber Ring',
      stage: 'Civil Works',
      status: 'Critical path',
      alertTitle: 'Jeddah Diversion',
      alertDetail:
        'Municipality dispute is blocking route clearance and the next trenching window.',
      alertTone: 'critical',
      alertRank: 1,
    },
    detail: {
      id: 'jeddah-diversion',
      eyebrow: 'Delivery Exception',
      title: 'Jeddah Airport Fiber Ring',
      subtitle: 'Civil works diversion approval before the next field window closes',
      summary:
        'The Western-region aviation route is blocked on municipality clearance. Unless the diversion path is approved today, trenching will slip again and equipment install dates will keep moving.',
      metrics: [
        { label: 'Value at stake', value: '3.2M SAR', tone: 'critical' },
        { label: 'Overdue jobs', value: '17' },
        { label: 'Blocked stage', value: 'Civil Works', tone: 'warning' },
        { label: 'Decision window', value: 'Today', tone: 'critical' },
      ],
      facts: [
        { label: 'Accountable owner', value: 'VP Operations' },
        { label: 'Next milestone', value: 'Diversion permit approval and trenching restart' },
        { label: 'Customer commitment', value: 'Updated route clearance shared with the airport program office within 24h' },
        { label: 'Review forum', value: 'Morning intervention huddle and Western-region recovery call' },
      ],
      actions: [
        'Escalate the municipality approval under VP Operations sponsorship.',
        'Lock contractor crew and traffic-management support for the next trenching window.',
        'Issue a revised delivery commitment once the diversion route is confirmed.',
      ],
      relatedOrders: [
        {
          id: 'SO-9951',
          account: 'Jeddah Airport Fiber Ring',
          service: 'Airport Campus Fiber Ring',
          value: '4.8M',
          progress: 62,
          status: 'At Risk',
        },
      ],
    },
  },
  {
    id: 'pif-ups',
    domain: 'strategic',
    region: 'Central',
    title: 'Approve emergency UPS bypass in Riyadh DC',
    summary:
      'Data center hosting cannot move to acceptance until the temporary power path and vendor standby support are signed off.',
    decision:
      'Approve temporary UPS bypass and vendor standby support so hosting acceptance can proceed without another stop-start cycle.',
    owner: 'Infrastructure Director',
    decisionWindow: '24h',
    impact:
      'Protect quarter-end hosting revenue recognition and avoid another acceptance reset.',
    priority: 'critical',
    focusHref: '/strategic?focus=SO-9904#strategic-decisions',
    focusLabel: 'Open PIF order',
    linkedViewHref: '/explorer?focus=PRJ-014',
    linkedViewLabel: 'Open PIF delivery program',
    homeVisible: true,
    homeRank: 2,
    strategic: {
      orderId: 'SO-9904',
      account: 'Public Investment Fund (PIF)',
      service: 'Data Center Hosting',
      status: 'At Risk',
    },
    detail: {
      id: 'SO-9904',
      eyebrow: 'Strategic Order',
      title: 'Public Investment Fund (PIF)',
      subtitle: 'SO-9904 | Data Center Hosting',
      summary:
        'The commercial risk is not customer demand. It is infrastructure readiness. Acceptance will stay blocked until the temporary UPS path and vendor standby arrangement are approved and executed.',
      metrics: [
        { label: 'Order value', value: '8.5M SAR', tone: 'critical' },
        { label: 'Progress', value: '40%' },
        { label: 'Acceptance risk', value: 'Quarter-end', tone: 'warning' },
        { label: 'Decision window', value: '24h', tone: 'critical' },
      ],
      facts: [
        { label: 'Accountable owner', value: 'Infrastructure Director' },
        { label: 'Next milestone', value: 'Temporary UPS bypass tested and signed off' },
        { label: 'Customer commitment', value: 'Hosting acceptance path reconfirmed with the PIF technology office' },
        { label: 'Review forum', value: 'Weekly revenue protection review' },
      ],
      actions: [
        'Approve the temporary power path and lock vendor standby coverage.',
        'Run one controlled acceptance rehearsal before customer sign-off.',
        'Keep finance and PMO aligned on the revised revenue-release date.',
      ],
      relatedOrders: [
        {
          id: 'SO-9904',
          account: 'Public Investment Fund (PIF)',
          service: 'Data Center Hosting',
          value: '8.5M',
          progress: 40,
          status: 'At Risk',
        },
        {
          id: 'SO-9958',
          account: 'Public Investment Fund (PIF)',
          service: 'Managed Security Overlay',
          value: '2.2M',
          progress: 68,
          status: 'On Track',
        },
      ],
    },
  },
  {
    id: 'neom-backbone',
    domain: 'delivery',
    region: 'Northern',
    title: 'Deploy interim coverage for NEOM backbone',
    summary:
      'Weather disruption is delaying backbone readiness and an interim service path is needed to keep the wider cutover plan credible.',
    decision:
      'Lock interim coverage and resequence backbone crews until the next viable weather window opens.',
    owner: 'Field Engineering Director',
    decisionWindow: '48h',
    impact:
      'Contain 2.8M SAR exposure and protect downstream cloud activation milestones.',
    priority: 'high',
    focusHref: '/delivery?focus=neom-backbone#delivery-decisions',
    focusLabel: 'Open NEOM recovery view',
    linkedViewHref: '/explorer?focus=PRJ-005',
    linkedViewLabel: 'Open NEOM South Route',
    homeVisible: true,
    homeRank: 3,
    delivery: {
      account: 'NEOM Development (Zone C)',
      stage: 'Civil Works / Activation',
      status: 'At risk',
      alertTitle: 'NEOM Backbone Recovery',
      alertDetail:
        'Backbone readiness remains weather-constrained and interim coverage must be locked before the next cutover.',
      alertTone: 'warning',
      alertRank: 3,
    },
    detail: {
      id: 'neom-backbone',
      eyebrow: 'Delivery Exception',
      title: 'NEOM Development (Zone C)',
      subtitle: 'Backbone recovery sequence and interim service coverage',
      summary:
        'Backbone readiness is still exposed to weather and route access. The immediate executive call is whether to hold the downstream cutover or protect the account with an interim coverage path while civil works recover.',
      metrics: [
        { label: 'Value at stake', value: '2.8M SAR', tone: 'warning' },
        { label: 'Backbone progress', value: '20%', tone: 'warning' },
        { label: 'Cloud dependency', value: 'High' },
        { label: 'Decision window', value: '48h', tone: 'critical' },
      ],
      facts: [
        { label: 'Accountable owner', value: 'Field Engineering Director' },
        { label: 'Next milestone', value: 'Interim coverage design approved and backbone crews resequenced' },
        { label: 'Customer commitment', value: 'Cutover posture updated with NEOM technology leadership before the weekend' },
        { label: 'Review forum', value: 'Daily field recovery bridge' },
      ],
      actions: [
        'Approve the interim coverage design and secure commercial sign-off if required.',
        'Resequence backbone crews against the next viable weather and access window.',
        'Keep the cloud cutover plan aligned so civil works slippage does not cascade into activation.',
      ],
      relatedOrders: [
        {
          id: 'SO-9940',
          account: 'NEOM Development (Zone C)',
          service: 'Backbone Fiber',
          value: '2.8M',
          progress: 20,
          status: 'At Risk',
        },
        {
          id: 'SO-9923',
          account: 'NEOM Tech & Digital',
          service: 'Cloud Infrastructure',
          value: '9.3M',
          progress: 72,
          status: 'On Track',
        },
      ],
    },
  },
  {
    id: 'dammam-backlog',
    domain: 'booking',
    region: 'Eastern',
    title: 'Activate Dammam backlog recovery cell',
    summary:
      'Technician shortfall is pushing B2C and SME installations beyond target windows in the Eastern region.',
    decision:
      'Approve a temporary technician recovery cell so Eastern-region installations return to target before fallout rises further.',
    owner: 'Regional Operations',
    decisionWindow: '72h',
    impact: 'Restore installation throughput before fallout and cancellation risk rises further.',
    priority: 'high',
    focusHref: '/booking',
    focusLabel: 'Open booking backlog view',
    homeVisible: true,
    homeRank: 4,
    detail: {
      id: 'dammam-backlog',
      eyebrow: 'Booking Recovery',
      title: 'Eastern Region Backlog Cell',
      subtitle: 'B2C and SME installation throughput recovery',
      summary:
        'Installation demand is outrunning technician availability in the Eastern region. The immediate call is whether to deploy a temporary recovery cell before fallout and cancellations begin to trend up.',
      metrics: [
        { label: 'Region', value: 'Eastern' },
        { label: 'Primary risk', value: 'Technician shortfall', tone: 'warning' },
        { label: 'Decision window', value: '72h', tone: 'warning' },
        { label: 'Impact', value: 'Backlog recovery' },
      ],
      facts: [
        { label: 'Accountable owner', value: 'Regional Operations' },
        { label: 'Next milestone', value: 'Temporary recovery cell deployed' },
        { label: 'Customer commitment', value: 'Restore install lead times before fallout moves above threshold' },
        { label: 'Review forum', value: 'Weekly booking review' },
      ],
      actions: [
        'Reallocate technicians into the Eastern region for two weeks.',
        'Separate SME backlog from home fiber demand so triage is cleaner.',
        'Track fallout and cancellation risk daily until the queue normalizes.',
      ],
    },
  },
  {
    id: 'civil-works-recovery',
    domain: 'delivery',
    region: 'Western',
    title: 'Recover Western civil works throughput',
    summary:
      '47 overdue orders in civil works are constraining equipment install throughput and pushing cycle time above target.',
    decision:
      'Approve an expedited backlog-recovery plan for Western civil works before equipment install slips further.',
    owner: 'Regional Delivery Managers',
    decisionWindow: 'This week',
    impact:
      'Release blocked equipment installs and reduce overdue backlog before quarter-end slippage compounds.',
    priority: 'high',
    focusHref: '/delivery?focus=civil-works-recovery#delivery-decisions',
    focusLabel: 'Open civil works recovery view',
    linkedViewHref: '/delivery?focus=civil-works-recovery#delivery-decisions',
    linkedViewLabel: 'Open civil works queue',
    delivery: {
      account: 'Western region delivery portfolio',
      stage: 'Civil Works',
      status: 'Throughput constraint',
      alertTitle: 'Civil Works Bottleneck',
      alertDetail:
        '47 overdue orders at 18.6d average age are constraining equipment install throughput.',
      alertTone: 'critical',
      alertRank: 2,
    },
    detail: {
      id: 'civil-works-recovery',
      eyebrow: 'Delivery Exception',
      title: 'Western Region Civil Works',
      subtitle: 'Backlog recovery plan before equipment install stalls further',
      summary:
        'Civil works is the main throughput constraint in the live delivery pipeline. Unless overdue jobs are resequenced and field capacity is tightened this week, equipment install and acceptance will keep sliding behind them.',
      metrics: [
        { label: 'Overdue orders', value: '47', tone: 'critical' },
        { label: 'Average age', value: '18.6 days', tone: 'warning' },
        { label: 'Blocked next stage', value: 'Equipment Install' },
        { label: 'Decision window', value: 'This week', tone: 'warning' },
      ],
      facts: [
        { label: 'Accountable owner', value: 'Regional Delivery Managers' },
        { label: 'Next milestone', value: 'Recover at least 15 blocked jobs before the weekly PMO review' },
        { label: 'Customer commitment', value: 'Stabilize revised delivery dates for the most exposed Western-region accounts' },
        { label: 'Review forum', value: 'Weekly delivery review' },
      ],
      actions: [
        'Re-sequence the field queue by revenue and customer-visibility impact.',
        'Deploy temporary civil-works supervisors to clear permit and contractor blockers.',
        'Push a focused install recovery plan for the equipment queue that depends on these jobs.',
      ],
    },
  },
  {
    id: 'acceptance-clearance',
    domain: 'delivery',
    region: 'National',
    title: 'Quarter-end acceptance clearance',
    summary:
      'Pending acceptance in PIF hosting and the Aramco backbone remains the fastest route to protect billed value.',
    decision:
      'Run executive sign-off workshops and escalate unresolved punch lists before the billing cut-off.',
    owner: 'Director Customer PMO',
    decisionWindow: 'This week',
    impact:
      'Reduce overdue acceptance and protect quarter-end revenue recognition on strategic orders.',
    priority: 'high',
    focusHref: '/delivery?focus=acceptance-clearance#delivery-decisions',
    focusLabel: 'Open acceptance recovery view',
    linkedViewHref: '/strategic?focus=SO-9904#strategic-decisions',
    linkedViewLabel: 'Open PIF strategic order',
    delivery: {
      account: 'PIF hosting and Aramco backbone',
      stage: 'UAT / Acceptance',
      status: 'Revenue risk',
      alertTitle: 'Acceptance Clearance',
      alertDetail:
        'PIF and Aramco sign-off remain the fastest route to protect quarter-end billed value.',
      alertTone: 'warning',
    },
    detail: {
      id: 'acceptance-clearance',
      eyebrow: 'Delivery Exception',
      title: 'Strategic Acceptance Recovery',
      subtitle: 'PIF hosting and Aramco backbone sign-off',
      summary:
        'Acceptance is still the cleanest point of control for quarter-end revenue. The PMO call is whether to run executive sign-off workshops now or continue absorbing delay through normal customer channels.',
      metrics: [
        { label: 'Pending acceptance', value: '184', tone: 'warning' },
        { label: 'Overdue items', value: '28', tone: 'critical' },
        { label: 'Revenue exposure', value: '12.4M SAR', tone: 'critical' },
        { label: 'Decision window', value: 'This week', tone: 'warning' },
      ],
      facts: [
        { label: 'Accountable owner', value: 'Director Customer PMO' },
        { label: 'Next milestone', value: 'Customer sign-off workshops completed for the most exposed orders' },
        { label: 'Customer commitment', value: 'Reconfirm billing-release dates with PIF and Aramco sponsors' },
        { label: 'Review forum', value: 'Weekly revenue protection review' },
      ],
      actions: [
        'Escalate unresolved punch-list items before the weekly PMO review.',
        'Run executive sign-off workshops with the most exposed accounts.',
        'Publish an acceptance burn-down view tied directly to revenue release.',
      ],
      relatedOrders: [
        {
          id: 'SO-9904',
          account: 'Public Investment Fund (PIF)',
          service: 'Data Center Hosting',
          value: '8.5M',
          progress: 40,
          status: 'At Risk',
        },
        {
          id: 'SO-9918',
          account: 'Saudi Aramco (Exploration)',
          service: 'B2B Fiber Backbone',
          value: '6.8M',
          progress: 55,
          status: 'At Risk',
        },
      ],
    },
  },
  {
    id: 'stc-failover',
    domain: 'strategic',
    region: 'Central',
    title: 'Stabilize STC wholesale failover window',
    summary:
      'Core-node failure response needs after-hours patch approval before carrier latency spreads into more enterprise traffic.',
    decision:
      'Approve failover capacity allocation and the after-hours patch window before carrier latency spreads further.',
    owner: 'Network Ops',
    decisionWindow: 'Today',
    impact:
      'Contain carrier-visible service instability and prevent additional escalation load.',
    priority: 'high',
    focusHref: '/strategic?focus=SO-9912#strategic-decisions',
    focusLabel: 'Open STC Wholesale order',
    linkedViewHref: '/explorer?focus=PRJ-011',
    linkedViewLabel: 'Open STC capacity program',
    strategic: {
      orderId: 'SO-9912',
      account: 'STC Wholesale',
      service: 'International Capacity',
      status: 'Watch',
    },
    detail: {
      id: 'SO-9912',
      eyebrow: 'Strategic Order',
      title: 'STC Wholesale',
      subtitle: 'SO-9912 | International Capacity',
      summary:
        'The commercial order is progressing well, but the operational posture is not. Carrier-facing instability will damage confidence quickly if the patch window and failover capacity are not approved on the same day.',
      metrics: [
        { label: 'Order value', value: '12.0M SAR' },
        { label: 'Progress', value: '90%', tone: 'positive' },
        { label: 'Service posture', value: 'Watch', tone: 'warning' },
        { label: 'Decision window', value: 'Today', tone: 'critical' },
      ],
      facts: [
        { label: 'Accountable owner', value: 'Network Ops' },
        { label: 'Next milestone', value: 'Failover capacity allocation and patch window approval' },
        { label: 'Customer commitment', value: 'Carrier update issued before the next traffic peak' },
        { label: 'Review forum', value: 'Daily service risk escalation review' },
      ],
      actions: [
        'Approve the patch window and lock customer communications for the maintenance event.',
        'Confirm failover headroom before the next high-traffic period.',
        'Keep wholesale leadership aligned on recovery timing and residual risk.',
      ],
      relatedOrders: [
        {
          id: 'SO-9912',
          account: 'STC Wholesale',
          service: 'International Capacity',
          value: '12M',
          progress: 90,
          status: 'On Track',
        },
      ],
    },
  },
  {
    id: 'aramco-uat',
    domain: 'strategic',
    region: 'Eastern',
    title: 'Secure Aramco UAT clearance',
    summary:
      'Routing dependency and customer confirmation still sit on the critical path before sign-off can move.',
    decision:
      'Secure customer routing confirmation and the next UAT slot before sign-off slips again.',
    owner: 'Director Customer PMO',
    decisionWindow: '48h',
    impact: 'Keep energy-sector acceptance and billing handoff on plan.',
    priority: 'high',
    focusHref: '/strategic?focus=SO-9918#strategic-decisions',
    focusLabel: 'Open Aramco order',
    linkedViewHref: '/explorer?focus=PRJ-006',
    linkedViewLabel: 'Open Aramco account view',
    strategic: {
      orderId: 'SO-9918',
      account: 'Saudi Aramco (Exploration)',
      service: 'B2B Fiber Backbone',
      status: 'At Risk',
    },
    detail: {
      id: 'SO-9918',
      eyebrow: 'Strategic Order',
      title: 'Saudi Aramco (Exploration)',
      subtitle: 'SO-9918 | B2B Fiber Backbone',
      summary:
        'The remaining risk is concentrated in UAT and routing confirmation, not core build. Without a sharper PMO-led customer closeout, the order will keep carrying revenue exposure into the next review cycle.',
      metrics: [
        { label: 'Order value', value: '6.8M SAR', tone: 'critical' },
        { label: 'Progress', value: '55%' },
        { label: 'Primary blocker', value: 'UAT clearance', tone: 'warning' },
        { label: 'Decision window', value: '48h', tone: 'warning' },
      ],
      facts: [
        { label: 'Accountable owner', value: 'Director Customer PMO' },
        { label: 'Next milestone', value: 'Customer routing confirmation and final UAT slot secured' },
        { label: 'Customer commitment', value: 'Exploration program office updated before the next executive call' },
        { label: 'Review forum', value: 'Weekly revenue protection review' },
      ],
      actions: [
        'Lock the customer routing confirmation and reserve the next UAT window.',
        'Pre-authorize carrier escalation if the dependency remains open past tomorrow.',
        'Keep finance aligned on the revenue-release gate tied to customer sign-off.',
      ],
      relatedOrders: [
        {
          id: 'SO-9918',
          account: 'Saudi Aramco (Exploration)',
          service: 'B2B Fiber Backbone',
          value: '6.8M',
          progress: 55,
          status: 'At Risk',
        },
        {
          id: 'SO-9944',
          account: 'Aramco Exploration Project',
          service: 'Field IoT Connectivity',
          value: '1.9M',
          progress: 80,
          status: 'On Track',
        },
      ],
    },
  },
  {
    id: 'neom-cloud-cutover',
    domain: 'strategic',
    region: 'Northern',
    title: 'Protect NEOM cloud cutover posture',
    summary:
      'Cloud activation can remain on plan only if the cutover sequence is re-aligned against backbone recovery.',
    decision:
      'Resequence cloud cutover against backbone recovery so the account does not absorb civil-works slippage.',
    owner: 'Field Engineering Director',
    decisionWindow: 'This week',
    impact:
      'Protect executive communications on a flagship account and avoid spillover into the cloud launch.',
    priority: 'medium',
    focusHref: '/strategic?focus=SO-9923#strategic-decisions',
    focusLabel: 'Open NEOM order',
    linkedViewHref: '/explorer?focus=PRJ-005',
    linkedViewLabel: 'Open NEOM delivery program',
    strategic: {
      orderId: 'SO-9923',
      account: 'NEOM Tech & Digital',
      service: 'Cloud Infrastructure',
      status: 'Watch',
    },
    detail: {
      id: 'SO-9923',
      eyebrow: 'Strategic Order',
      title: 'NEOM Tech & Digital',
      subtitle: 'SO-9923 | Cloud Infrastructure',
      summary:
        'The cloud order is commercially healthy, but it is tightly coupled to the backbone recovery path. The PMO decision is whether to hold the cutover or protect the timeline with a resequenced activation plan.',
      metrics: [
        { label: 'Order value', value: '9.3M SAR' },
        { label: 'Progress', value: '72%', tone: 'positive' },
        { label: 'Dependency', value: 'Backbone recovery', tone: 'warning' },
        { label: 'Decision window', value: 'This week', tone: 'warning' },
      ],
      facts: [
        { label: 'Accountable owner', value: 'Field Engineering Director' },
        { label: 'Next milestone', value: 'Cloud cutover plan resequenced against backbone readiness' },
        { label: 'Customer commitment', value: 'Executive update provided before the next flagship program review' },
        { label: 'Review forum', value: 'Weekly PMO control review' },
      ],
      actions: [
        'Freeze the current cutover date until the backbone path is revalidated.',
        'Publish a revised activation sequence with clear dependency gates.',
        'Use one NEOM executive narrative across delivery, cloud, and commercial stakeholders.',
      ],
      relatedOrders: [
        {
          id: 'SO-9923',
          account: 'NEOM Tech & Digital',
          service: 'Cloud Infrastructure',
          value: '9.3M',
          progress: 72,
          status: 'On Track',
        },
        {
          id: 'SO-9940',
          account: 'NEOM Development (Zone C)',
          service: 'Backbone Fiber',
          value: '2.8M',
          progress: 20,
          status: 'At Risk',
        },
      ],
    },
  },
  {
    id: 'moi-vpn-recovery',
    domain: 'delivery' as const,
    region: 'National' as DecisionRegion,
    title: 'Stabilize MoI VPN service continuity',
    summary:
      'VPN degradation is approaching SLA breach territory and needs an immediate traffic reroute plus vendor TAC bridge.',
    decision:
      'Authorize immediate traffic reroute and vendor TAC bridge coverage until the permanent fix is stable.',
    owner: 'Enterprise Svc',
    decisionWindow: 'Within 2h',
    impact:
      'Protect ministry service continuity and avoid a live breach escalation with direct customer attention.',
    priority: 'critical' as DecisionPriority,
    focusHref: '/explorer?focus=PRJ-016',
    focusLabel: 'Open MoI account view',
    homeVisible: false,
    delivery: {
      account: 'Ministry of Interior (Regional)',
      stage: 'Service Recovery',
      status: 'SLA breach imminent',
      alertTitle: 'MoI VPN Recovery',
      alertDetail:
        'VPN degradation approaching SLA breach. Traffic reroute and TAC bridge needed immediately.',
      alertTone: 'critical' as const,
    },
    detail: {
      id: 'moi-vpn-recovery',
      eyebrow: 'Service Recovery',
      title: 'Ministry of Interior (Regional)',
      subtitle: 'Secure VPN degradation and SLA-exposure recovery',
      summary:
        'The ministry VPN degradation is hours from a contractual breach. The executive call is whether to authorize immediate traffic rerouting and vendor support or keep working through normal channels.',
      metrics: [
        { label: 'SLA status', value: 'Breach imminent', tone: 'critical' as const },
        { label: 'Revenue at risk', value: '3.5M SAR', tone: 'critical' as const },
        { label: 'Decision window', value: 'Within 2h', tone: 'critical' as const },
        { label: 'Customer attention', value: 'Direct', tone: 'warning' as const },
      ],
      facts: [
        { label: 'Accountable owner', value: 'Enterprise Service Operations' },
        { label: 'Next milestone', value: 'Traffic reroute validated and TAC bridge stable' },
        { label: 'Customer commitment', value: 'Ministry service continuity statement issued' },
        { label: 'Review forum', value: 'Daily service risk escalation review' },
      ],
      actions: [
        'Authorize the immediate traffic reroute and keep vendor TAC bridge open.',
        'Align account leadership and service operations on one external message.',
        'Track SLA clock exposure hourly until the permanent fix is stable.',
      ],
    },
  },
  {
    id: 'portal-performance',
    domain: 'delivery' as const,
    region: 'National' as DecisionRegion,
    title: 'Resolve B2B portal latency for Enterprise accounts',
    summary:
      'Enterprise portal latency is generating repeat escalations across multiple accounts and needs a controlled workaround plus a permanent fix.',
    decision:
      'Prioritize the application performance fix and publish a controlled workaround to frontline customer operations.',
    owner: 'Platform Eng.',
    decisionWindow: '24h',
    impact:
      'Stabilize the enterprise support experience and reduce repeat escalations from affected accounts.',
    priority: 'high' as DecisionPriority,
    focusHref: '/explorer?focus=PRJ-017',
    focusLabel: 'Open portal recovery view',
    homeVisible: false,
    delivery: {
      account: 'Enterprise portal services',
      stage: 'Performance Recovery',
      status: 'Multi-account impact',
      alertTitle: 'Portal Latency',
      alertDetail:
        'Repeat escalations from enterprise accounts due to B2B portal latency.',
      alertTone: 'warning' as const,
    },
    detail: {
      id: 'portal-performance',
      eyebrow: 'Service Recovery',
      title: 'Enterprise Portal Performance',
      subtitle: 'B2B portal latency affecting multiple enterprise accounts',
      summary:
        'This is less about technical novelty and more about customer noise. Unless the workaround and permanent fix are managed together, repeat escalations will keep surfacing through multiple enterprise accounts.',
      metrics: [
        { label: 'Impact scope', value: 'Multi-account', tone: 'warning' as const },
        { label: 'Risk type', value: 'Frontline support load', tone: 'warning' as const },
        { label: 'Decision window', value: '24h', tone: 'warning' as const },
        { label: 'Program value', value: '1.6M SAR' },
      ],
      facts: [
        { label: 'Accountable owner', value: 'Platform Engineering' },
        { label: 'Next milestone', value: 'Workaround issued and application fix prioritized' },
        { label: 'Customer commitment', value: 'Frontline support script published for affected accounts' },
        { label: 'Review forum', value: 'Daily service risk escalation review' },
      ],
      actions: [
        'Prioritize the performance fix and publish a controlled workaround.',
        'Track repeat ticket volume by affected enterprise account.',
        'Close the gap between engineering remediation and customer operations messaging.',
      ],
    },
  },
];

export const operatingDecisionById = Object.fromEntries(
  operatingDecisions.map((item) => [item.id, item]),
) as Record<string, OperatingDecision>;

