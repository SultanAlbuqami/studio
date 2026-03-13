import {
  Activity,
  Clock,
  Layers,
  Sparkles,
} from 'lucide-react';
import { dataAsOf } from '@/app/lib/dashboard-meta';
import { ControlStatusOrb } from '@/components/dashboard/control-status-orb';

type HeaderHighlight = {
  label: string;
  value: string;
};

type HeaderPosture = {
  score: number;
  label: string;
  caption: string;
  tone: 'stable' | 'watch' | 'critical' | 'success';
  primarySignalLabel: string;
  primarySignalValue: string;
  cadenceLabel: string;
  cadenceValue: string;
};

type HeaderContext = {
  description: string;
  highlights?: readonly HeaderHighlight[];
  noteLabel?: string;
  note?: string;
  posture: HeaderPosture;
};

const headerContextByTitle: Record<string, HeaderContext> = {
  'Operations Control Tower': {
    description:
      'Delivery health, service assurance, and revenue exposure across Salam consumer, business, and wholesale operating domains.',
    highlights: [
      { label: 'Focus', value: 'Revenue at risk + milestone drift' },
      { label: 'Cadence', value: 'Daily intervention, weekly PMO review' },
      { label: 'Scope', value: 'Consumer + Business + Wholesale portfolios' },
    ],
    note:
      'Use the operating brief and intervention rail as the executive decision queue. The dashboard is designed to pull attention toward slippage that can still be contained across Salam service lines, not just one delivery queue.',
    posture: {
      score: 89,
      label: 'Stable',
      caption: 'Portfolio posture',
      tone: 'stable',
      primarySignalLabel: 'Primary signal',
      primarySignalValue: 'Revenue timing still hinges on acceptance clearance',
      cadenceLabel: 'Decision tempo',
      cadenceValue: 'Daily PMO bridge + weekly steering',
    },
  },
  'Salam Service Portfolio': {
    description:
      'Official service-coverage view linking Salam consumer, business, and wholesale offerings to the control-tower scope.',
    highlights: [
      { label: 'Source base', value: 'Official Salam public references' },
      { label: 'Focus', value: 'What Salam sells and what the tower governs' },
      { label: 'Best use', value: 'Portfolio grounding before operational deep dives' },
    ],
    note:
      'This page anchors the demo in Salam&apos;s actual public portfolio so the operating model reads like a Salam control tower, not a generic telecom mock-up.',
    posture: {
      score: 94,
      label: 'Aligned',
      caption: 'Portfolio fit',
      tone: 'success',
      primarySignalLabel: 'Primary signal',
      primarySignalValue: 'The control tower now maps directly to official Salam service domains and customer segments',
      cadenceLabel: 'Best use',
      cadenceValue: 'Portfolio framing, executive grounding, and service-coverage alignment',
    },
  },
  'VP Briefing Pack': {
    description:
      'Condensed leadership pack for sponsor reviews, decision windows, and print-ready portfolio posture.',
    highlights: [
      { label: 'Mode', value: 'Meeting-ready briefing view' },
      { label: 'Focus', value: 'Decision ownership and exposed value' },
      { label: 'Best use', value: 'VP review or sponsor steering' },
    ],
    note:
      'This briefing view compresses the dashboard into a short executive pack: portfolio posture, the calls that matter now, and the ownership needed to move them.',
    posture: {
      score: 93,
      label: 'Prepared',
      caption: 'Briefing posture',
      tone: 'success',
      primarySignalLabel: 'Primary signal',
      primarySignalValue: 'Acceptance clearance and infrastructure readiness remain the fastest revenue-protection levers',
      cadenceLabel: 'Best use',
      cadenceValue: 'Leadership review, sponsor call, or print pack',
    },
  },
  'Portfolio Explorer': {
    description:
      'Search the live portfolio by project, customer, region, or segment to isolate exposure and coverage gaps.',
    highlights: [
      { label: 'Mode', value: 'Search, filter, open focused brief' },
      { label: 'Focus', value: 'Delayed exposure and coverage gaps' },
      { label: 'Best use', value: 'Pre-review portfolio triage' },
    ],
    posture: {
      score: 87,
      label: 'Mapped',
      caption: 'Portfolio scan',
      tone: 'stable',
      primarySignalLabel: 'Priority lens',
      primarySignalValue: 'Delayed exposure clusters in government and mega projects',
      cadenceLabel: 'Best use',
      cadenceValue: 'Triage before sponsor reviews',
    },
  },
  'Booking & Fulfillment': {
    description:
      'Order pipeline throughput, fallout rates, and aging to prevent billing delay and avoidable cancellations.',
    highlights: [
      { label: 'Watch', value: '15d+ backlog and fallout pressure' },
      { label: 'Owner', value: 'Order pipeline and fulfillment leads' },
      { label: 'Cadence', value: 'Weekly booking control review' },
    ],
    posture: {
      score: 78,
      label: 'Pressure',
      caption: 'Pipeline stability',
      tone: 'watch',
      primarySignalLabel: 'Primary signal',
      primarySignalValue: 'Backlog aging is the first point of commercial leakage',
      cadenceLabel: 'Decision tempo',
      cadenceValue: 'Weekly booking review + regional interventions',
    },
  },
  'Delivery Control Tower': {
    description:
      'Milestone aging, exception recovery, and field-level delivery decisions to stop slippage from reaching acceptance and billing.',
    highlights: [
      { label: 'Watch', value: 'Civil works, installs, overdue stages' },
      { label: 'Focus', value: 'Exceptions needing sponsor action' },
      { label: 'Cadence', value: 'Daily recovery bridge, weekly review' },
    ],
    posture: {
      score: 82,
      label: 'Focused',
      caption: 'Field recovery',
      tone: 'stable',
      primarySignalLabel: 'Primary signal',
      primarySignalValue: 'Civil works throughput is driving downstream recovery speed',
      cadenceLabel: 'Decision tempo',
      cadenceValue: 'Daily recovery bridge + weekly PMO review',
    },
  },
  'Strategic Orders': {
    description:
      'High-value orders whose delivery or acceptance posture is material to revenue timing or customer confidence.',
    highlights: [
      { label: 'Watch', value: 'Quarter-end revenue risk' },
      { label: 'Focus', value: 'Director calls on strategic blockers' },
      { label: 'Cadence', value: 'Revenue protection and account steering' },
    ],
    posture: {
      score: 81,
      label: 'Watch',
      caption: 'Revenue posture',
      tone: 'watch',
      primarySignalLabel: 'Primary signal',
      primarySignalValue: 'Infrastructure readiness is blocking the cleanest revenue releases',
      cadenceLabel: 'Decision tempo',
      cadenceValue: 'Revenue protection review + sponsor steering',
    },
  },
  'B2C Fulfillment': {
    description:
      'Consumer backlog pressure, dispatch ownership, and appointment quality for commercially credible recovery actions.',
    highlights: [
      { label: 'Watch', value: 'Install backlog, dispatch, CSAT' },
      { label: 'Focus', value: 'Recovery crews vs. customer promise' },
      { label: 'Cadence', value: 'Daily dispatch, weekly B2C ops' },
    ],
    posture: {
      score: 76,
      label: 'Loaded',
      caption: 'Fulfillment queue',
      tone: 'watch',
      primarySignalLabel: 'Primary signal',
      primarySignalValue: 'Backlog and dispatch pressure need capacity moves, not cosmetic smoothing',
      cadenceLabel: 'Decision tempo',
      cadenceValue: 'Daily dispatch review + weekly B2C ops',
    },
  },
  'Escalations & Recovery': {
    description:
      'Escalations requiring coordinated ownership before SLA exposure, customer impact, or recovery cost compounds.',
    highlights: [
      { label: 'Watch', value: 'Critical age, MTTR, breach risk' },
      { label: 'Focus', value: 'Recovery ownership and decision windows' },
      { label: 'Cadence', value: 'Daily risk bridge, escalation review' },
    ],
    posture: {
      score: 72,
      label: 'Escalated',
      caption: 'Recovery load',
      tone: 'critical',
      primarySignalLabel: 'Primary signal',
      primarySignalValue: 'SLA windows are short enough that ownership clarity matters more than volume',
      cadenceLabel: 'Decision tempo',
      cadenceValue: 'Daily risk bridge + immediate recoveries',
    },
  },
  'From Demo to Live Deployment': {
    description:
      'Transition path from demonstration to governed production: source systems, semantic modeling, ownership, and rollout discipline.',
    highlights: [
      { label: 'Goal', value: 'Trusted KPI model for live leadership use' },
      { label: 'Control', value: 'Source, owner, and forum per KPI' },
      { label: 'Approach', value: 'Phased adoption tied to operating pain' },
    ],
    posture: {
      score: 92,
      label: 'Ready',
      caption: 'Deployment posture',
      tone: 'success',
      primarySignalLabel: 'Primary signal',
      primarySignalValue: 'Governance depth is sufficient to move from showcase to controlled rollout',
      cadenceLabel: 'Decision tempo',
      cadenceValue: 'Phased release with owner-aligned checkpoints',
    },
  },
  'Data Governance & Methodology': {
    description:
      'KPI dictionary, escalation logic, and governance rules ensuring every metric reaching the executive view is auditable and decision-ready.',
    highlights: [
      { label: 'Rule', value: 'No KPI without source, owner, threshold' },
      { label: 'Scope', value: 'Delivery, acceptance, backlog, escalation, B2C' },
      { label: 'Purpose', value: 'Decision-ready and auditable views' },
    ],
    posture: {
      score: 95,
      label: 'Governed',
      caption: 'Control integrity',
      tone: 'success',
      primarySignalLabel: 'Primary signal',
      primarySignalValue: 'Every leadership metric is tied to ownership, review forum, and source logic',
      cadenceLabel: 'Decision tempo',
      cadenceValue: 'Monthly governance review + release controls',
    },
  },
};

interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
  hideFilters?: boolean;
  timestamp?: string;
  description?: string;
  highlights?: readonly HeaderHighlight[];
  noteLabel?: string;
  note?: string;
}

export function DashboardHeader({
  title = 'Operations Control Tower',
  subtitle = 'Director Customer PMO',
  hideFilters = false,
  timestamp = dataAsOf,
  description,
  highlights,
  noteLabel,
  note,
}: DashboardHeaderProps) {
  const fallbackContext = headerContextByTitle[title];
  const resolvedDescription = description ?? fallbackContext?.description;
  const resolvedHighlights = highlights ?? fallbackContext?.highlights ?? [];
  const resolvedNoteLabel = noteLabel ?? fallbackContext?.noteLabel ?? 'Decision Lens';
  const resolvedNote = note ?? fallbackContext?.note;
  const posture =
    fallbackContext?.posture ?? {
      score: 86,
      label: 'Stable',
      caption: 'Operating posture',
      tone: 'stable' as const,
      primarySignalLabel: 'Primary signal',
      primarySignalValue: 'Executive view ready for decision support.',
      cadenceLabel: 'Decision tempo',
      cadenceValue: 'Weekly portfolio review',
    };

  const telemetryRows = [
    {
      icon: Layers,
      label: hideFilters ? 'View type' : 'Portfolio scope',
      value: hideFilters ? 'Reference and governance view' : 'All portfolios',
    },
    {
      icon: Clock,
      label: 'Snapshot',
      value: timestamp,
    },
  ];

  return (
    <header className="command-hero">
      <div className="relative z-[1] grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)] xl:items-center">
        <div className="min-w-0 space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="command-pill">
              <Sparkles className="h-3.5 w-3.5" />
              Executive control mode
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground/78">
              <Activity className="h-3.5 w-3.5 text-primary/90" />
              Live
            </span>
          </div>

          <div className="space-y-3">
            <p className="section-label">{subtitle}</p>
            <div className="space-y-3">
              <h1 className="max-w-4xl font-headline text-[2.1rem] font-semibold tracking-[-0.05em] text-balance text-foreground md:text-[2.65rem]">
                {title}
              </h1>
              {resolvedDescription && (
                <p className="max-w-4xl text-sm leading-7 text-muted-foreground/92 md:text-[15px]">
                  {resolvedDescription}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:max-w-4xl xl:grid-cols-3">
            {resolvedHighlights.map((item) => (
              <div
                key={`${item.label}-${item.value}`}
                className="rounded-[1.25rem] border border-white/8 bg-background/28 px-4 py-3.5"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-primary/72">
                  {item.label}
                </p>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-foreground/94">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {resolvedNote && (
            <div className="rounded-[1.35rem] border border-primary/12 bg-primary/[0.05] px-4 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary/78">
                {resolvedNoteLabel}
              </p>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-foreground/88">
                {resolvedNote}
              </p>
            </div>
          )}
        </div>

        <aside className="command-panel p-4 sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary/72">
                Operating posture
              </p>
              <p className="mt-2 font-headline text-lg font-semibold tracking-[-0.04em] text-foreground">
                Executive view
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground/78">
                Calm, decision-led posture for leadership reviews without overcrowding the page.
              </p>
            </div>
            <span className="rounded-full border border-primary/18 bg-primary/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/78">
              Synced
            </span>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
            <ControlStatusOrb
              score={posture.score}
              label={posture.label}
              caption={posture.caption}
              tone={posture.tone}
              size="md"
            />

            <div className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.1rem] border border-white/8 bg-background/28 p-3.5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/72">
                    {posture.primarySignalLabel}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/92">
                    {posture.primarySignalValue}
                  </p>
                </div>
                <div className="rounded-[1.1rem] border border-white/8 bg-background/28 p-3.5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/72">
                    {posture.cadenceLabel}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/92">
                    {posture.cadenceValue}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-2.5">
            {telemetryRows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between gap-3 rounded-[1.1rem] border border-white/8 bg-background/20 px-3.5 py-3"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.95rem] border border-primary/14 bg-primary/8 text-primary">
                    <row.icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/68">
                      {row.label}
                    </p>
                    <p className="mt-1 truncate text-sm font-semibold text-foreground/92">
                      {row.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </header>
  );
}
